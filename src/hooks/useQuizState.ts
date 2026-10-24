"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { CourseType, InstrumentPoints, QuizStoredState } from "@/types/quiz";
import { questions, calculateResult, Question, ResultData } from "@/data/questions";

const STORAGE_KEY = "music_eq_quiz_state_v1";

const INITIAL_POINTS: InstrumentPoints = {
  Vo: 0,
  Gt: 0,
  Ba: 0,
  Dr: 0,
  DTM: 0,
};

const INITIAL_STATE: QuizStoredState = {
  course: null,
  currentIndex: 0,
  pointsHistory: [],
  accumulatedPoints: { ...INITIAL_POINTS },
  isCompleted: false,
  updatedAt: 0,
};

/**
 * 選択コースに応じて出題する問題をフィルタリング
 * - 普通（12問）: level === 1
 * - 濃い（24問）: level === 1 || level === 2
 * - 特濃（36問）: 全問題（level 1, 2, 3）
 */
export function getQuestionsByCourse(course: CourseType | null): Question[] {
  if (!course) return [];
  if (course === 12) {
    return questions.filter((q) => q.level === 1);
  }
  if (course === 24) {
    return questions.filter((q) => q.level === 1 || q.level === 2);
  }
  return questions; // 36問（level 1, 2, 3 すべて）
}

export function useQuizState() {
  const [state, setState] = useState<QuizStoredState>(INITIAL_STATE);
  const [savedSession, setSavedSession] = useState<QuizStoredState | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // 初回マウント時にLocalStorageから未完了セッションをチェック
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as QuizStoredState;
        if (
          parsed &&
          parsed.course &&
          !parsed.isCompleted &&
          parsed.currentIndex > 0 &&
          parsed.currentIndex < parsed.course
        ) {
          setSavedSession(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to read quiz state from LocalStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // LocalStorageへ状態を保存するヘルパー
  const persistState = useCallback((nextState: QuizStoredState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch (error) {
      console.error("Failed to save quiz state to LocalStorage:", error);
    }
  }, []);

  // 現在のコースに対応するフィルタ済み問題配列
  const filteredQuestions = useMemo(
    () => getQuestionsByCourse(state.course),
    [state.course]
  );

  // 新規コース開始
  const startCourse = useCallback(
    (course: CourseType) => {
      const nextState: QuizStoredState = {
        course,
        currentIndex: 0,
        pointsHistory: [],
        accumulatedPoints: { ...INITIAL_POINTS },
        isCompleted: false,
        updatedAt: Date.now(),
      };
      setState(nextState);
      setSavedSession(null);
      persistState(nextState);
    },
    [persistState]
  );

  // 中断していたセッションから復帰
  const resumeSavedSession = useCallback(() => {
    if (!savedSession) return;
    setState(savedSession);
    setSavedSession(null);
  }, [savedSession]);

  // 解答を記録して各楽器のポイント（Vo, Gt, Ba, Dr, DTM）を加算・保存
  const answerQuestion = useCallback(
    (optionPoints: InstrumentPoints) => {
      setState((prev) => {
        if (!prev.course) return prev;

        const targetQuestions = getQuestionsByCourse(prev.course);
        const totalCount = targetQuestions.length || prev.course;

        const nextHistory = [...prev.pointsHistory, optionPoints];
        const nextAccumulated: InstrumentPoints = {
          Vo: prev.accumulatedPoints.Vo + optionPoints.Vo,
          Gt: prev.accumulatedPoints.Gt + optionPoints.Gt,
          Ba: prev.accumulatedPoints.Ba + optionPoints.Ba,
          Dr: prev.accumulatedPoints.Dr + optionPoints.Dr,
          DTM: prev.accumulatedPoints.DTM + optionPoints.DTM,
        };

        const nextIndex = prev.currentIndex + 1;
        const isCompleted = nextIndex >= totalCount;

        const nextState: QuizStoredState = {
          ...prev,
          currentIndex: nextIndex,
          pointsHistory: nextHistory,
          accumulatedPoints: nextAccumulated,
          isCompleted,
          updatedAt: Date.now(),
        };

        persistState(nextState);
        return nextState;
      });
    },
    [persistState]
  );

  // 1問前に戻る
  const goBackQuestion = useCallback(() => {
    setState((prev) => {
      if (!prev.course || prev.currentIndex <= 0) return prev;

      const nextHistory = prev.pointsHistory.slice(0, -1);
      const nextAccumulated = nextHistory.reduce<InstrumentPoints>(
        (acc, pts) => ({
          Vo: acc.Vo + pts.Vo,
          Gt: acc.Gt + pts.Gt,
          Ba: acc.Ba + pts.Ba,
          Dr: acc.Dr + pts.Dr,
          DTM: acc.DTM + pts.DTM,
        }),
        { ...INITIAL_POINTS }
      );

      const nextState: QuizStoredState = {
        ...prev,
        currentIndex: prev.currentIndex - 1,
        pointsHistory: nextHistory,
        accumulatedPoints: nextAccumulated,
        isCompleted: false,
        updatedAt: Date.now(),
      };

      persistState(nextState);
      return nextState;
    });
  }, [persistState]);

  // 診断状態を完全リセット（最初に戻る / 保存データ破棄）
  const resetQuiz = useCallback(() => {
    setState(INITIAL_STATE);
    setSavedSession(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove quiz state from LocalStorage:", error);
    }
  }, []);

  // calculateResult() による称号・パーセンテージ算出
  const diagnosisResult = useMemo((): {
    percentages: InstrumentPoints;
    resultData: ResultData;
  } => {
    return calculateResult(state.accumulatedPoints);
  }, [state.accumulatedPoints]);

  return {
    state,
    savedSession,
    isHydrated,
    filteredQuestions,
    diagnosisResult,
    startCourse,
    resumeSavedSession,
    answerQuestion,
    goBackQuestion,
    resetQuiz,
  };
}
