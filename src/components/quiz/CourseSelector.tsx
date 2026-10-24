"use client";

import { COURSES, CourseType, QuizStoredState } from "@/types/quiz";
import { Music, Sparkles, Clock, RotateCcw, Trash2, ChevronRight } from "lucide-react";

type CourseSelectorProps = {
  savedSession: QuizStoredState | null;
  onSelectCourse: (course: CourseType) => void;
  onResumeSession: () => void;
  onDiscardSession: () => void;
};

export function CourseSelector({
  savedSession,
  onSelectCourse,
  onResumeSession,
  onDiscardSession,
}: CourseSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-slide-in-right">
      {/* ヒーローヘッダー */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Musician Aptitude &amp; Instrument EQ
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
          音楽家適性・楽器診断
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          あなたの音楽的志向・性格・深層心理から、
          <span className="text-zinc-200 font-medium"> Vo / Gt / Ba / Dr / DTM </span>
          の5大適性パラメーターと「二つ名（称号）」を精密診断します。
        </p>
      </div>

      {/* 前回の中断データがある場合の復帰バナー */}
      {savedSession && savedSession.course && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-500/30 shadow-lg shadow-amber-950/20 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                <RotateCcw className="w-4 h-4" />
                前回の診断が途中から再開できます
              </div>
              <p className="text-xs text-zinc-300">
                選択コース: <span className="font-semibold text-white">{savedSession.course}問コース</span> ／ 進行度:{" "}
                <span className="font-semibold text-amber-300">
                  {savedSession.currentIndex} / {savedSession.course} 問完了
                </span>
              </p>
            </div>
            <button
              onClick={onDiscardSession}
              className="text-zinc-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-zinc-800/60"
              title="保存データを破棄"
              aria-label="保存データを破棄"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={onResumeSession}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            第 {savedSession.currentIndex + 1} 問から診断を再開する
          </button>
        </div>
      )}

      {/* コース選択カード一覧 */}
      <div className="space-y-3.5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 px-1">
          Select Diagnosis Course — 診断コースを選択
        </h2>
        <div className="grid gap-4">
          {COURSES.map((course) => {
            const isDeep = course.count === 36;
            const isStandard = course.count === 24;

            return (
              <button
                key={course.count}
                onClick={() => onSelectCourse(course.count)}
                className={`group relative w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                  isDeep
                    ? "bg-gradient-to-br from-zinc-900/90 via-indigo-950/30 to-purple-950/30 border-indigo-500/40 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10"
                    : isStandard
                    ? "bg-zinc-900/80 border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-900"
                    : "bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/90"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2.5 py-0.5 text-xs font-bold rounded-md ${
                          isDeep
                            ? "bg-indigo-500 text-white"
                            : isStandard
                            ? "bg-zinc-800 text-indigo-300 border border-indigo-500/30"
                            : "bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        {course.badge}
                      </span>
                      <span className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors">
                        {course.label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      {course.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>所要時間目安: {course.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-zinc-800/80 group-hover:bg-indigo-500/20 border border-zinc-700/60 group-hover:border-indigo-500/40 flex items-center justify-center transition-all shrink-0">
                    <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-indigo-300 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* フッター補足 */}
      <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-2">
        <Music className="w-3.5 h-3.5" />
        <span>解答データはブラウザに自動保存され、いつでも途中から再開可能です</span>
      </div>
    </div>
  );
}
