export const runtime = 'edge';

import type { Metadata } from "next";
import Link from "next/link";
import { Instrument, InstrumentPoints } from "@/types/quiz";
import { calculateResult } from "@/data/questions";
import { AffiliateSection } from "@/components/result/AffiliateSection";
import { Sparkles, Trophy, ArrowRight } from "lucide-react";

type SearchParams = {
  title?: string;
  main?: string;
  mainPercent?: string;
  sub?: string;
  subPercent?: string;
  vo?: string;
  gt?: string;
  ba?: string;
  dr?: string;
  dtm?: string;
};

type Props = {
  searchParams: SearchParams;
};

const VALID_INSTRUMENTS: Instrument[] = ["Vo", "Gt", "Ba", "Dr", "DTM"];

function toInstrument(val: string | undefined, fallback: Instrument): Instrument {
  if (val && VALID_INSTRUMENTS.includes(val as Instrument)) {
    return val as Instrument;
  }
  return fallback;
}

/**
 * URLクエリパラメータから動的にOGPメタデータ（og:image / twitter:image）を生成
 * ステートレス方式・Cloudflare Pages (Edge Runtime) 完全対応
 */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const title = searchParams.title || "【名もなき音楽家】";
  const main = searchParams.main || "Gt";
  const mainPercent = searchParams.mainPercent || "0";
  const sub = searchParams.sub || "DTM";
  const subPercent = searchParams.subPercent || "0";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const ogParams = new URLSearchParams({
    title,
    main,
    mainPercent,
    sub,
    subPercent,
  });

  const ogImageUrl = `${siteUrl}/api/og?${ogParams.toString()}`;
  const pageTitle = `${title} | 音楽家適性・楽器診断`;
  const description = `音楽家適性診断の結果：メイン適性 ${main} (${mainPercent}%) ／ サブ適性 ${sub} (${subPercent}%)。あなたの音楽的本性と天職のパートを診断しよう！`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * シェアURL（/result?...）から訪れたユーザー向けの結果表示＆診断誘導ページ
 */
export default function SharedResultPage({ searchParams }: Props) {
  const mainInstrument = toInstrument(searchParams.main, "Gt");
  const subInstrument = toInstrument(searchParams.sub, "DTM");
  const mainPercent = Number(searchParams.mainPercent) || 40;
  const subPercent = Number(searchParams.subPercent) || 25;

  // クエリパラメータからポイント復元（指定がない場合はmain/subから推定）
  const points: InstrumentPoints = {
    Vo: Number(searchParams.vo) || (mainInstrument === "Vo" ? mainPercent : subInstrument === "Vo" ? subPercent : 10),
    Gt: Number(searchParams.gt) || (mainInstrument === "Gt" ? mainPercent : subInstrument === "Gt" ? subPercent : 10),
    Ba: Number(searchParams.ba) || (mainInstrument === "Ba" ? mainPercent : subInstrument === "Ba" ? subPercent : 10),
    Dr: Number(searchParams.dr) || (mainInstrument === "Dr" ? mainPercent : subInstrument === "Dr" ? subPercent : 10),
    DTM: Number(searchParams.dtm) || (mainInstrument === "DTM" ? mainPercent : subInstrument === "DTM" ? subPercent : 10),
  };

  const calculated = calculateResult(points);
  const displayTitle = searchParams.title || calculated.resultData.title;
  const displayDescription = calculated.resultData.description;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-slide-in-right">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-indigo-950/40 border border-indigo-500/30 shadow-2xl space-y-8">
        {/* シェア閲覧用ヘッダー */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            シェアされた診断結果
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>
              1位適性: <strong className="text-white">{mainInstrument} ({mainPercent}%)</strong>
            </span>
            <span>／</span>
            <span>
              2位適性: <strong className="text-zinc-200">{subInstrument} ({subPercent}%)</strong>
            </span>
          </div>
        </div>

        {/* 称号カード */}
        <div className="text-center space-y-3 py-6 px-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/90">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Trophy className="w-4 h-4" />
            Musician Title
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
            {displayTitle}
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto pt-1">
            {displayDescription}
          </p>
        </div>

        {/* 自分も診断してみるCTAボタン（バイラル拡散の着地導線） */}
        <Link
          href="/"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 text-white font-extrabold text-base transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        >
          <span>自分も「音楽家適性・楽器診断」を受ける</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* 1位適性に応じたアフィリエイト枠 */}
        <AffiliateSection mainInstrument={mainInstrument} />
      </div>
    </div>
  );
}
