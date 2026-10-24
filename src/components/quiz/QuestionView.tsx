"use client";

import { useState } from "react";
import { CourseType, Points, Question } from "@/types/quiz";
import { ArrowLeft, RotateCcw } from "lucide-react";

type QuestionViewProps = {
  question: Question;
  currentIndex: number;
  totalQuestions: CourseType;
  onSelectOption: (points: Points) => void;
  onGoBack: () => void;
  onReset: () => void;
};

export function QuestionView({
  question,
  currentIndex,
  totalQuestions,
  onSelectOption,
  onGoBack,
  onReset,
}: QuestionViewProps) {
  // スワイプアニメーション制御用ステート
  const [animState, setAnimState] = useState<"idle" | "exiting" | "entering">("idle");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleOptionClick = (points: Points, idx: number) => {
    if (animState !== "idle") return; // 二重タップ防止

    setSelectedIdx(idx);
    setAnimState("exiting");

    // スワイプアウト完了後にデータ更新＆次問スワイプイン
    setTimeout(() => {
      onSelectOption(points);
      setSelectedIdx(null);
      setAnimState("entering");

      setTimeout(() => {
        setAnimState("idle");
      }, 280);
    }, 200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* 上部ナビゲーション＆プログレスバー */}
      <div className="space-y-3 bg-zinc-900/70 backdrop-blur-md p-4 rounded-2xl border border-zinc-800/80">
        <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
              {totalQuestions}問コース
            </span>
            <span>
              Question{" "}
              <strong className="text-white text-sm">{currentIndex + 1}</strong> /{" "}
              {totalQuestions}
            </span>
          </div>
          <span className="text-indigo-400 font-bold">{progressPercentage}%</span>
        </div>

        {/* プログレスバー */}
        <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 質問＆選択肢カード（スワイプアニメーション対象領域） */}
      <div className="overflow-hidden py-1">
        <div
          className={`p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6 transition-all ${
            animState === "exiting"
              ? "animate-slide-out-left pointer-events-none"
              : animState === "entering"
              ? "animate-slide-in-right"
              : ""
          }`}
        >
          {/* 質問文 */}
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">
              Q.{currentIndex + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 leading-snug">
              {question.text}
            </h2>
          </div>

          {/* 選択肢リスト */}
          <div className="grid gap-3.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedIdx === idx;
              const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option.points, idx)}
                  disabled={animState !== "idle"}
                  className={`group w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 flex items-start gap-4 ${
                    isSelected
                      ? "bg-indigo-600/25 border-indigo-400 text-white scale-[0.99]"
                      : "bg-zinc-950/60 border-zinc-800/90 hover:border-indigo-500/50 hover:bg-zinc-800/60 text-zinc-200 active:scale-[0.99]"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "bg-indigo-500 text-white"
                        : "bg-zinc-800 text-zinc-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300"
                    }`}
                  >
                    {optionLabel}
                  </span>
                  <span className="text-sm sm:text-base font-medium leading-relaxed">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 下部コントロール（1問戻る・コース選択へ戻る） */}
      <div className="flex items-center justify-between px-2 text-xs text-zinc-400">
        <button
          onClick={onGoBack}
          disabled={currentIndex === 0 || animState !== "idle"}
          className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-zinc-800/70 hover:text-zinc-200 disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          前の質問に戻る
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg hover:bg-zinc-800/70 hover:text-rose-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          コース選択からやり直す
        </button>
      </div>
    </div>
  );
}
