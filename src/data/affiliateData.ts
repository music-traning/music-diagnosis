import { Instrument } from "@/types/quiz";

export type AffiliateItem = {
  title: string;
  description: string;
  url: string;
  image: string;
};

export const affiliateData: Record<Instrument, AffiliateItem[]> = {
  Gt: [
    {
      title: "Elixir コーティング弦",
      description:
        "音作りにこだわる求道者のあなたへ。まずは弦のサビというノイズから解放されましょう。",
      url: "#",
      image: "https://via.placeholder.com/150?text=Elixir",
    },
    {
      title: "KORG Pitchblack X",
      description:
        "1セントの狂いも許せないあなたに。ボードの先頭に置くだけで『分かってる感』が出ます。",
      url: "#",
      image: "https://via.placeholder.com/150?text=Tuner",
    },
    {
      title: "YAMAHA THR10II",
      description:
        "真空管の呪いから解放される時が来ました。これでもう、一生部屋から出られません。",
      url: "#",
      image: "https://via.placeholder.com/150?text=THR10II",
    },
  ],
  Ba: [
    {
      title: "VOX amPlug 3 (Bass)",
      description:
        "深夜の部屋で、誰にも気づかれずに己のグルーヴと向き合う孤独な作業に最適です。",
      url: "#",
      image: "https://via.placeholder.com/150?text=amPlug",
    },
    {
      title: "ベース教則本",
      description:
        "裏拍の軍師たるもの、メトロノームとの対話は義務です。この本で一生遊べます。",
      url: "#",
      image: "https://via.placeholder.com/150?text=Book",
    },
    {
      title: "EBS MultiComp",
      description:
        "通すだけで音が太くなる魔法の箱。バンドメンバーに『今日なんか音良くない？』と言わせるための必須アイテム。",
      url: "#",
      image: "https://via.placeholder.com/150?text=MultiComp",
    },
  ],
  Dr: [
    {
      title: "Vic Firth 5A スティック",
      description:
        "メトロノームの奴隷に捧ぐ、最も消費が激しい武器。何ペアあっても困りません。",
      url: "#",
      image: "https://via.placeholder.com/150?text=5A",
    },
    {
      title: "TAMA Rhythm Watch",
      description:
        "物理ボタンとダイヤルでBPMを操作する快感。これであなたも歩くクリック音です。",
      url: "#",
      image: "https://via.placeholder.com/150?text=RhythmWatch",
    },
    {
      title: "YAMAHA TS01S",
      description:
        "叩き心地、跳ね返り、全てがリアル。ひたすらルーディメンツを叩き続けられます。",
      url: "#",
      image: "https://via.placeholder.com/150?text=TS01S",
    },
  ],
  DTM: [
    {
      title: "ミックス教則本",
      description:
        "プラグイン沼に沈む前に先人の知恵を。EQのQ幅で徹夜するあなたを救う一冊です。",
      url: "#",
      image: "https://via.placeholder.com/150?text=Book",
    },
    {
      title: "KORG nanoKEY2",
      description:
        "マウスでのポチポチ入力に限界を感じていませんか？ベロシティの呪縛から解放されます。",
      url: "#",
      image: "https://via.placeholder.com/150?text=nanoKEY2",
    },
    {
      title: "iZotope Ozone",
      description:
        "自分の耳すら信じられなくなった孤高の創造神へ、最後の審判（音圧爆上げ）を。",
      url: "#",
      image: "https://via.placeholder.com/150?text=Ozone",
    },
  ],
  Vo: [
    {
      title: "マヌカハニー ＆ 龍角散",
      description:
        "自己肯定感モンスターの最強の武器は『喉』。まずは魔法の粉と蜜で物理的なケアを。",
      url: "#",
      image: "https://via.placeholder.com/150?text=Care",
    },
    {
      title: "SHURE SM58",
      description:
        "マイ・ゴッパーを持つことこそが、ボーカリストとしての最初の自己主張です。",
      url: "#",
      image: "https://via.placeholder.com/150?text=SM58",
    },
    {
      title: "Roland VT-4",
      description:
        "ピッチ補正からケロケロボイスまで。自分の声すらエフェクティブに拡張したいバケモノへ。",
      url: "#",
      image: "https://via.placeholder.com/150?text=VT-4",
    },
  ],
};
