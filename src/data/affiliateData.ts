import { Instrument } from "@/types/quiz";

export type AffiliateItem = {
  title: string;
  description: string;
  url: string;
  image: string;
};

// AmazonアソシエイトIDをお持ちの場合は .env.local 等に NEXT_PUBLIC_AMAZON_TAG=xxxx-22 を設定すると自動付与されます
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "";

function buildAmazonUrl(keyword: string): string {
  const params = new URLSearchParams({ k: keyword });
  if (AMAZON_TAG) {
    params.set("tag", AMAZON_TAG);
  }
  return `https://www.amazon.co.jp/s?${params.toString()}`;
}

export const affiliateData: Record<Instrument, AffiliateItem[]> = {
  Gt: [
    {
      title: "Elixir コーティング弦",
      description:
        "音作りにこだわる求道者のあなたへ。まずは弦のサビというノイズから解放されましょう。",
      url: buildAmazonUrl("Elixir エリクサー エレキギター弦"),
      image: "https://placehold.co/300x200/18181b/f59e0b?text=Elixir+Strings",
    },
    {
      title: "KORG Pitchblack X",
      description:
        "1セントの狂いも許せないあなたに。ボードの先頭に置くだけで『分かってる感』が出ます。",
      url: buildAmazonUrl("KORG Pitchblack X チューナー"),
      image: "https://placehold.co/300x200/18181b/f59e0b?text=KORG+Pitchblack+X",
    },
    {
      title: "YAMAHA THR10II",
      description:
        "真空管の呪いから解放される時が来ました。これでもう、一生部屋から出られません。",
      url: buildAmazonUrl("YAMAHA THR10II ギターアンプ"),
      image: "https://placehold.co/300x200/18181b/f59e0b?text=YAMAHA+THR10II",
    },
  ],
  Ba: [
    {
      title: "VOX amPlug 3 (Bass)",
      description:
        "深夜の部屋で、誰にも気づかれずに己のグルーヴと向き合う孤独な作業に最適です。",
      url: buildAmazonUrl("VOX amPlug 3 Bass"),
      image: "https://placehold.co/300x200/18181b/10b981?text=VOX+amPlug+3+Bass",
    },
    {
      title: "ベース教則本",
      description:
        "裏拍の軍師たるもの、メトロノームとの対話は義務です。この本で一生遊べます。",
      url: buildAmazonUrl("エレキベース 教則本 リズム トレーニング"),
      image: "https://placehold.co/300x200/18181b/10b981?text=Bass+Method+Book",
    },
    {
      title: "EBS MultiComp",
      description:
        "通すだけで音が太くなる魔法の箱。バンドメンバーに『今日なんか音良くない？』と言わせるための必須アイテム。",
      url: buildAmazonUrl("EBS MultiComp ベース コンプレッサー"),
      image: "https://placehold.co/300x200/18181b/10b981?text=EBS+MultiComp",
    },
  ],
  Dr: [
    {
      title: "Vic Firth 5A スティック",
      description:
        "メトロノームの奴隷に捧ぐ、最も消費が激しい武器。何ペアあっても困りません。",
      url: buildAmazonUrl("Vic Firth 5A ドラムスティック"),
      image: "https://placehold.co/300x200/18181b/38bdf8?text=Vic+Firth+5A",
    },
    {
      title: "TAMA Rhythm Watch",
      description:
        "物理ボタンとダイヤルでBPMを操作する快感。これであなたも歩くクリック音です。",
      url: buildAmazonUrl("TAMA Rhythm Watch RW200"),
      image: "https://placehold.co/300x200/18181b/38bdf8?text=TAMA+Rhythm+Watch",
    },
    {
      title: "YAMAHA TS01S",
      description:
        "叩き心地、跳ね返り、全てがリアル。ひたすらルーディメンツを叩き続けられます。",
      url: buildAmazonUrl("YAMAHA TS01S トレーニングパッド"),
      image: "https://placehold.co/300x200/18181b/38bdf8?text=YAMAHA+TS01S",
    },
  ],
  DTM: [
    {
      title: "ミックス教則本",
      description:
        "プラグイン沼に沈む前に先人の知恵を。EQのQ幅で徹夜するあなたを救う一冊です。",
      url: buildAmazonUrl("DTM ミックス マスタリング 教則本"),
      image: "https://placehold.co/300x200/18181b/818cf8?text=Mixing+Guide+Book",
    },
    {
      title: "KORG nanoKEY2",
      description:
        "マウスでのポチポチ入力に限界を感じていませんか？ベロシティの呪縛から解放されます。",
      url: buildAmazonUrl("KORG nanoKEY2 MIDIキーボード"),
      image: "https://placehold.co/300x200/18181b/818cf8?text=KORG+nanoKEY2",
    },
    {
      title: "iZotope Ozone",
      description:
        "自分の耳すら信じられなくなった孤高の創造神へ、最後の審判（音圧爆上げ）を。",
      url: buildAmazonUrl("iZotope Ozone マスタリング"),
      image: "https://placehold.co/300x200/18181b/818cf8?text=iZotope+Ozone",
    },
  ],
  Vo: [
    {
      title: "マヌカハニー ＆ 龍角散",
      description:
        "自己肯定感モンスターの最強の武器は『喉』。まずは魔法の粉と蜜で物理的なケアを。",
      url: buildAmazonUrl("マヌカハニー 龍角散 のど飴"),
      image: "https://placehold.co/300x200/18181b/fb7185?text=Throat+Care",
    },
    {
      title: "SHURE SM58",
      description:
        "マイ・ゴッパーを持つことこそが、ボーカリストとしての最初の自己主張です。",
      url: buildAmazonUrl("SHURE SM58 ダイナミックマイク"),
      image: "https://placehold.co/300x200/18181b/fb7185?text=SHURE+SM58",
    },
    {
      title: "Roland VT-4",
      description:
        "ピッチ補正からケロケロボイスまで。自分の声すらエフェクティブに拡張したいバケモノへ。",
      url: buildAmazonUrl("Roland VT-4 ボイストランスフォーマー"),
      image: "https://placehold.co/300x200/18181b/fb7185?text=Roland+VT-4",
    },
  ],
};
