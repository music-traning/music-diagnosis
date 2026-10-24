"use client";

import { Instrument } from "@/types/quiz";
import { affiliateData } from "@/data/affiliateData";
import { ExternalLink, ShoppingBag } from "lucide-react";

type AffiliateSectionProps = {
  mainInstrument: Instrument;
};

const INSTRUMENT_LABEL_MAP: Record<Instrument, string> = {
  Vo: "ボーカリスト",
  Gt: "ギタリスト",
  Ba: "ベーシスト",
  Dr: "ドラマー",
  DTM: "DTMer / トラックメイカー",
};

export function AffiliateSection({ mainInstrument }: AffiliateSectionProps) {
  const items = affiliateData[mainInstrument] ?? affiliateData.Gt;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          Recommended Gear — {INSTRUMENT_LABEL_MAP[mainInstrument]}適性のあなたへ捧ぐ三種の神器
        </h2>
        <span className="text-[11px] text-zinc-500">PR / おすすめ機材</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl bg-zinc-950/70 border border-zinc-800/90 hover:border-indigo-500/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-950/20"
          >
            <div className="space-y-3">
              {/* 商品サムネイル */}
              <div className="relative w-full h-32 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
                />
              </div>

              {/* 商品タイトル＆解説 */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors flex items-center justify-between gap-1">
                  <span>{item.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>詳細・レビューを見る</span>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
