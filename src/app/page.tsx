"use client";

import { useQuizState } from "@/hooks/useQuizState";
import { CourseSelector } from "@/components/quiz/CourseSelector";
import { QuestionView } from "@/components/quiz/QuestionView";
import { ResultScreen } from "@/components/result/ResultScreen";

export default function HomePage() {
  const {
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
  } = useQuizState();

  // ハイドレーション完了前はちらつき防止のローディング表示
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  // 1. コース未選択時：コース選択画面を表示（中断データがあれば復帰バナー表示）
  if (!state.course) {
    return (
      <CourseSelector
        savedSession={savedSession}
        onSelectCourse={startCourse}
        onResumeSession={resumeSavedSession}
        onDiscardSession={resetQuiz}
      />
    );
  }

  // 2. 全問解答完了時：calculateResult() の算出結果を ResultScreen に渡して直ちに表示
  if (state.isCompleted) {
    return (
      <ResultScreen
        course={state.course}
        rawPoints={state.accumulatedPoints}
        percentages={diagnosisResult.percentages}
        resultData={diagnosisResult.resultData}
        onReset={resetQuiz}
      />
    );
  }

  // 3. 質問解答中：コース別にフィルタリングされた問題リストから出題
  const currentQuestion =
    filteredQuestions[state.currentIndex] ?? filteredQuestions[0];

  return (
    <QuestionView
      question={currentQuestion}
      currentIndex={state.currentIndex}
      totalQuestions={state.course}
      onSelectOption={answerQuestion}
      onGoBack={goBackQuestion}
      onReset={resetQuiz}
    />
  );
}
