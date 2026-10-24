"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  COURSE_NAME_MAP,
  CourseType,
  GASAverages,
  Instrument,
  InstrumentPoints,
  ResultData,
} from "@/types/quiz";
import { AffiliateSection } from "@/components/result/AffiliateSection";
import {
  Award,
  BarChart3,
  Loader2,
  RotateCcw,
  Share2,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

type ResultScreenProps = {
  course: CourseType;
  rawPoints: InstrumentPoints;
  percentages: InstrumentPoints;
  resultData: ResultData;
  onReset: () => void;
};

// GAS未設定時や通信エラー時のフォールバック平均値（アプリがクラッシュしないための安全策）
const FALLBACK_AVERAGES: GASAverages = {
  vo: 20,
  gt: 20,
  ba: 20,
  dr: 20,
  dtm: 20,
};

const INSTRUMENT_META: Record<
  Instrument,
  { name: string; colorClass: string; badgeClass: string }
> = {
  Vo: {
    name: "Vocal (ボーカル)",
    colorClass: "from-rose-500 to-pink-500",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
  Gt: {
    name: "Guitar (ギター)",
    colorClass: "from-amber-500 to-orange-500",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  Ba: {
    name: "Bass (ベース)",
    colorClass: "from-emerald-500 to-teal-500",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  Dr: {
    name: "Drums (ドラム)",
    colorClass: "from-sky-500 to-blue-500",
    badgeClass: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  DTM: {
    name: "DTM / TrackMaker",
    colorClass: "from-indigo-500 to-purple-500",
    badgeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  },
};

export function ResultScreen({
  course,
  rawPoints,
  percentages,
  resultData,
  onReset,
}: ResultScreenProps) {
  const [averages, setAverages] = useState<GASAverages>(FALLBACK_AVERAGES);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // StrictMode等での二重POST送信を防ぐガードRef
  const hasSubmittedRef = useRef<boolean>(false);

  // 初回マウント時に一度だけGASへPOSTリクエストを送信（CORS対策：text/plain;charset=utf-8）
  useEffect(() => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const submitToGAS = async () => {
      const gasUrl = process.env.NEXT_PUBLIC_GAS_URL;
      if (!gasUrl) {
        console.warn(
          "NEXT_PUBLIC_GAS_URL が未設定のため、デフォルト平均値を使用します。"
        );
        setSyncNotice("※デモ表示中（GAS環境変数未設定のため基準平均値と比較）");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(gasUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            course: COURSE_NAME_MAP[course], // "普通" | "濃い" | "特濃"
            title: resultData.title,
            vo: percentages.Vo,
            gt: percentages.Gt,
            ba: percentages.Ba,
            dr: percentages.Dr,
            dtm: percentages.DTM,
          }),
        });

        const data = await response.json();
        if (data.status === "success" && data.averages) {
          setAverages({
            vo: Number(data.averages.vo) || 0,
            gt: Number(data.averages.gt) || 0,
            ba: Number(data.averages.ba) || 0,
            dr: Number(data.averages.dr) || 0,
            dtm: Number(data.averages.dtm) || 0,
          });
        }
      } catch (error) {
        console.error("GAS送信エラー:", error);
        setSyncNotice("※オフライン統計（通信エラーのため基準平均値と比較）");
      } finally {
        setLoading(false);
      }
    };

    submitToGAS();
  }, [course, percentages, resultData.title]);

  // Recharts <RadarChart> 用のデータ整形
  const chartData = useMemo(
    () => [
      { subject: "ボーカル", user: percentages.Vo, average: averages?.vo || 0 },
      { subject: "ギター", user: percentages.Gt, average: averages?.gt || 0 },
      { subject: "ベース", user: percentages.Ba, average: averages?.ba || 0 },
      { subject: "ドラム", user: percentages.Dr, average: averages?.dr || 0 },
      { subject: "DTM", user: percentages.DTM, average: averages?.dtm || 0 },
    ],
    [percentages, averages]
  );

  // パーセンテージの高い順にソートして表示
  const sortedInstruments = useMemo(
    () =>
      (Object.entries(percentages) as [Instrument, number][]).sort(
        ([, a], [, b]) => b - a
      ),
    [percentages]
  );

  const mainInstrument = sortedInstruments[0][0];
  const subInstrument = sortedInstruments[1][0];

  // チャートの最大目盛りをデータに合わせて見やすく調整（最低50〜最大100）
  const maxChartDomain = useMemo(() => {
    const maxVal = Math.max(
      ...chartData.map((d) => Math.max(d.user, d.average)),
      50
    );
    return Math.min(100, Math.ceil(maxVal / 10) * 10 + 10);
  }, [chartData]);

  // X（Twitter）Web Intent シェア処理（動的OGP用クエリパラメータ付き）
  const handleShare = () => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined"
        ? window.location.origin
        : "https://[デプロイ予定のドメイン]");

    // OGP生成用のクエリパラメータを付与したURL
    const appUrl = `${baseUrl}/result?title=${encodeURIComponent(
      resultData.title
    )}&main=${mainInstrument}&mainPercent=${
      percentages[mainInstrument]
    }&sub=${subInstrument}&subPercent=${percentages[subInstrument]}`;

    const text = `音楽家診断の結果、私の適性は【${resultData.title}】でした。\n\n#音楽家適性診断 #DTMerと繋がりたい #バンドマンあるある\n`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      appUrl
    )}&text=${encodeURIComponent(text)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-slide-in-right">
      {/* メイン結果カード */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-indigo-950/40 border border-indigo-500/30 shadow-2xl space-y-8">
        {/* 完了バッジ */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            {COURSE_NAME_MAP[course]}コース（{course}問）診断完了
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>
              1位適性: <strong className="text-white">{mainInstrument}</strong>
            </span>
            <span>／</span>
            <span>
              2位適性:{" "}
              <strong className="text-zinc-200">{subInstrument}</strong>
            </span>
          </div>
        </div>

        {/* 称号（二つ名） */}
        <div className="text-center space-y-3 py-5 px-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Trophy className="w-4 h-4" />
            Your Musician Title
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            {resultData.title}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto pt-1">
            {resultData.description}
          </p>
        </div>

        {/* X（Twitter）シェアボタン */}
        <button
          onClick={handleShare}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:via-indigo-400 hover:to-purple-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 active:scale-[0.99]"
        >
          <Share2 className="w-5 h-5" />
          Xでシェアする
        </button>

        {/* レーダーチャート領域（ユーザー適性 vs 全ユーザー平均値） */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Aptitude Radar — 全ユーザー平均との比較
            </h2>
            {syncNotice && (
              <span className="text-[11px] text-zinc-500">{syncNotice}</span>
            )}
          </div>

          <div className="bg-zinc-950/70 rounded-2xl border border-zinc-800/80 p-4 sm:p-6">
            {loading ? (
              <div className="h-[300px] flex flex-col items-center justify-center gap-3 text-zinc-400">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                <p className="text-xs sm:text-sm font-medium">
                  診断データを集計し、全ユーザーの平均値と比較しています...
                </p>
              </div>
            ) : (
              <div className="w-full h-[300px] sm:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="72%"
                    data={chartData}
                  >
                    <PolarGrid stroke="#3f3f46" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{
                        fill: "#e4e4e7",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, maxChartDomain]}
                      tick={{ fill: "#71717a", fontSize: 10 }}
                      axisLine={false}
                    />
                    {/* 全体の平均値（薄いグレー） */}
                    <Radar
                      name="全体の平均値"
                      dataKey="average"
                      stroke="#a1a1aa"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fill="#71717a"
                      fillOpacity={0.25}
                    />
                    {/* ユーザーの適性（鮮やかなシアン〜インディゴ系アクセント） */}
                    <Radar
                      name="あなたの適性"
                      dataKey="user"
                      stroke="#38bdf8"
                      strokeWidth={2.5}
                      fill="#6366f1"
                      fillOpacity={0.5}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#09090b",
                        borderColor: "#27272a",
                        borderRadius: "12px",
                        color: "#f4f4f5",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value}%`, undefined]}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        paddingTop: "12px",
                        color: "#d4d4d8",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        {/* 各楽器の適性パーセンテージ＆平均比較バー */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-400" />
              Instrument Breakdown — 楽器別適性スコア詳細
            </h2>
            <span className="text-xs text-zinc-500">正規化パーセンテージ</span>
          </div>

          <div className="space-y-3.5 bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80">
            {sortedInstruments.map(([inst, percent], index) => {
              const meta = INSTRUMENT_META[inst];
              const isTop = index === 0;
              const avgKey = inst.toLowerCase() as keyof GASAverages;
              const avgValue = averages[avgKey] ?? 0;

              return (
                <div key={inst} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold border ${meta.badgeClass}`}
                      >
                        {inst}
                      </span>
                      <span
                        className={`font-semibold ${
                          isTop ? "text-white" : "text-zinc-300"
                        }`}
                      >
                        {meta.name}
                      </span>
                      {isTop && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          BEST MATCH
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2">
                      {!loading && (
                        <span className="text-[11px] text-zinc-400">
                          全体平均: {avgValue}%
                        </span>
                      )}
                      <span
                        className={`text-base sm:text-lg font-extrabold ${
                          isTop ? "text-amber-300" : "text-zinc-100"
                        }`}
                      >
                        {percent}%
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        ({rawPoints[inst]} pt)
                      </span>
                    </div>
                  </div>

                  {/* パーセンテージバー */}
                  <div className="w-full h-2.5 bg-zinc-800/90 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${meta.colorClass} rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 1位適性に応じたアフィリエイトリンク出し分けセクション */}
        <AffiliateSection mainInstrument={mainInstrument} />

        {/* 再診断ボタン */}
        <button
          onClick={onReset}
          className="w-full py-4 px-5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 border border-zinc-700"
        >
          <RotateCcw className="w-4 h-4" />
          もう一度診断する（コース選択へ戻る）
        </button>
      </div>
    </div>
  );
}
