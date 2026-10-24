// src/data/questions.ts
// ※選択肢の並び順をランダムにシャッフルした完全版

export type Instrument = 'Vo' | 'Gt' | 'Ba' | 'Dr' | 'DTM';

export type InstrumentPoints = {
  Vo: number; Gt: number; Ba: number; Dr: number; DTM: number;
};

export type Option = {
  text: string;
  points: InstrumentPoints;
};

export type Question = {
  id: number;
  level: 1 | 2 | 3;
  text: string;
  options: Option[];
};

export type ResultData = {
  title: string;
  description: string;
};

// ==========================================
// 1. 質問データ（全36問・シャッフル済）
// ==========================================
export const questions: Question[] = [
  // --- 🟢 普通診断（1〜12問） ---
  {
    id: 1, level: 1, text: "音楽を聴いている時、無意識に耳が追ってしまうのは？",
    options: [
      { text: "華やかなソロや、裏で鳴っているオカズのフレーズ", points: { Vo: 0, Gt: 3, Ba: 0, Dr: 0, DTM: 1 } },
      { text: "全体の音圧、空間の広がり、各トラックの帯域の棲み分け", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 3 } },
      { text: "歌声の表現力や歌詞の意味", points: { Vo: 3, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "低音のうねりや、キックとの絡み", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 2, DTM: 0 } }
    ]
  },
  {
    id: 2, level: 1, text: "何かトラブルが起きた！グループでのあなたの立ち回りは？",
    options: [
      { text: "黙々と土台を支え、周囲のアイコンタクトで状況を立て直す", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 3, DTM: 0 } },
      { text: "自分が矢面に立って、場を盛り上げたりその場を凌ぐ", points: { Vo: 3, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "人と合わせるより、一人で全てを構築し直した方が早いと思う", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "隙を見て、ここぞという時に気の利いた一発を放つ", points: { Vo: 0, Gt: 3, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 3, level: 1, text: "自分のこだわりをとことん追求するなら、次のどれ？",
    options: [
      { text: "EQのQ幅やコンプのスレッショルドを0.1単位で調整し続けること", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 3 } },
      { text: "何時間でも同じフレーズを正確に反復し続けること", points: { Vo: 0, Gt: 1, Ba: 2, Dr: 3, DTM: 0 } },
      { text: "エフェクターの接続順や、歪みの微細なニュアンス", points: { Vo: 0, Gt: 3, Ba: 1, Dr: 0, DTM: 1 } },
      { text: "自分の声質やコンディション管理", points: { Vo: 3, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 4, level: 1, text: "ライブや作品公開の後、一番言われて嬉しい感想は？",
    options: [
      { text: "「あのソロの入り、鳥肌立ちました！」「音作りエグいですね！」", points: { Vo: 0, Gt: 3, Ba: 1, Dr: 0, DTM: 1 } },
      { text: "「感動して泣いちゃいました！」「世界観が好きです！」", points: { Vo: 3, Gt: 0, Ba: 0, Dr: 0, DTM: 1 } },
      { text: "「今日のグルーヴ最高でした」「安定感がやばい」", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 3, DTM: 0 } },
      { text: "「各トラックの帯域の棲み分け、どうやってるんですか？」", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } }
    ]
  },
  {
    id: 5, level: 1, text: "突然10万円の臨時収入！音楽のために何に使う？",
    options: [
      { text: "スネア、ペダル、または堅牢なハードウェア一式", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 4, DTM: 0 } },
      { text: "迷わずWavesかiZotopeのバンドル、または大容量SSD", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "喉のケアグッズ、またはアー写（宣材写真）の撮影代", points: { Vo: 3, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "気になっていた歪みペダル3個か、ハイエンドなシールド", points: { Vo: 0, Gt: 3, Ba: 1, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 6, level: 1, text: "初対面のメンバーとのセッション。最初のアプローチは？",
    options: [
      { text: "そもそも生身の人間と合わせたくない。BPMとパラデータをくれ", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "周りのキーを探りつつ、隙あらば自分が目立つフレーズを放つ", points: { Vo: 1, Gt: 3, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "まずはキックとベースの同期に全集中し、土台を作る", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 3, DTM: 0 } },
      { text: "理論はさておき、とりあえずパッションで叫ぶ/弾きまくる", points: { Vo: 3, Gt: 2, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 7, level: 1, text: "打ち上げ（飲み会）でのあなたのポジションは？",
    options: [
      { text: "端っこで自分の興味ある機材の話題だけ急に早口で語る", points: { Vo: 0, Gt: 3, Ba: 1, Dr: 0, DTM: 3 } },
      { text: "幹事として店を予約し、きっちり1円単位で割り勘の計算をする", points: { Vo: 0, Gt: 0, Ba: 1, Dr: 3, DTM: 2 } },
      { text: "常に話題の中心。一番喋るか、一番最初に酔い潰れる", points: { Vo: 3, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "空いたグラスを静かに回収し、サラダを取り分けるバランサー", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 2, DTM: 0 } }
    ]
  },
  {
    id: 8, level: 1, text: "練習・制作していて一番「イラッ」とする瞬間は？",
    options: [
      { text: "他のパートのリズムが走ったりモタったりして、自分にしわ寄せが来る時", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 3, DTM: 0 } },
      { text: "自分の今日のコンディションが悪く、イメージ通りに表現できない時", points: { Vo: 3, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "DAWが突然クラッシュして、未保存の作業データが虚空に消えた時", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "昨日は完璧だった「最高のトーン」が、今日はなぜか出ない時", points: { Vo: 0, Gt: 3, Ba: 1, Dr: 0, DTM: 1 } }
    ]
  },
  {
    id: 9, level: 1, text: "あなたが音楽をやる究極の目的は？",
    options: [
      { text: "自分の脳内にある完璧な宇宙（楽曲）を、ノイズなしで具現化したいから", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "音と音がカチッと噛み合う、あの言葉にできない一体感が欲しいから", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 4, DTM: 0 } },
      { text: "誰も思いつかないような、最高にカッコいいフレーズと音色を残したいから", points: { Vo: 0, Gt: 4, Ba: 1, Dr: 0, DTM: 1 } },
      { text: "自分の存在を世界に証明し、スポットライトを浴びたいから", points: { Vo: 4, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 10, level: 1, text: "ライブ中、盛大にミスをした！どうごまかす？",
    options: [
      { text: "ジャズのアウトフレーズ（アレンジ）だったかのような顔をして弾き続ける", points: { Vo: 0, Gt: 4, Ba: 2, Dr: 0, DTM: 0 } },
      { text: "笑顔で客席を煽り、パッションで押し切る", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "ミスには触れず、ひたすらリズムキープに徹して立て直す", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 4, DTM: 0 } },
      { text: "バッキングトラックの停止ボタンを押す（そもそもライブをしない）", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } }
    ]
  },
  {
    id: 11, level: 1, text: "音楽をやる上での「見た目（ビジュアル）」の優先度は？",
    options: [
      { text: "汗と筋肉。実用性と無骨さこそが至高", points: { Vo: 0, Gt: 0, Ba: 1, Dr: 4, DTM: 0 } },
      { text: "デュアルモニターとLEDが光るキーボードが最高のインテリア", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "絶対条件。顔、髪型、ファッションが伴ってこその表現", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "楽器の塗装やフォルムがカッコよければ、人間はどうでもいい", points: { Vo: 0, Gt: 3, Ba: 2, Dr: 0, DTM: 1 } }
    ]
  },
  {
    id: 12, level: 1, text: "初めて行くライブハウスやスタジオ、まず何を見る？",
    options: [
      { text: "Wi-Fiの速度と電源タップの数", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "常設されているアンプの型番と状態", points: { Vo: 0, Gt: 4, Ba: 2, Dr: 0, DTM: 0 } },
      { text: "搬入口の広さと、ステージまでの階段の数", points: { Vo: 0, Gt: 0, Ba: 1, Dr: 4, DTM: 0 } },
      { text: "鏡の有無と、照明の当たり具合", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },

  // --- 🟡 濃い診断（13〜24問） ---
  {
    id: 13, level: 2, text: "機材の配線（ケーブル）についてどう考える？",
    options: [
      { text: "BELDENやCANAREなどの定番ブランドを長さ指定で買う", points: { Vo: 0, Gt: 2, Ba: 2, Dr: 0, DTM: 0 } },
      { text: "アナログ結線はノイズの元。可能な限りPC内で完結させる", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "楽器屋の店員に勧められた完成品を買う", points: { Vo: 3, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "Mogamiの切り売りとNeutrikを買い、自分でハンダ付けして自作する", points: { Vo: 0, Gt: 3, Ba: 3, Dr: 0, DTM: 2 } }
    ]
  },
  {
    id: 14, level: 2, text: "最高の練習環境はどれ？",
    options: [
      { text: "スマホの電源を切り、個人練で入った深夜のレンタルスタジオ", points: { Vo: 0, Gt: 0, Ba: 2, Dr: 4, DTM: 0 } },
      { text: "カラオケボックスか、お風呂場", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "淹れたてのコーヒーと、マルチモニターが並ぶデスク", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "アンプの電源だけを入れた薄暗い自室", points: { Vo: 0, Gt: 4, Ba: 1, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 15, level: 2, text: "「音楽理論」に対するあなたのスタンスは？",
    options: [
      { text: "周波数帯域の衝突を防ぎ、完璧なミックスを作るための設計図", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "リズムと音価（長さ）を数学的に割り出すためのツール", points: { Vo: 0, Gt: 0, Ba: 2, Dr: 4, DTM: 2 } },
      { text: "スケールやコード進行は、カッコいいソロを弾くための武器", points: { Vo: 0, Gt: 4, Ba: 1, Dr: 0, DTM: 1 } },
      { text: "感覚とエモーションが全て。理論はパッションの邪魔", points: { Vo: 4, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 16, level: 2, text: "メンバーが「オリジナル曲やろうぜ」と言い出した。あなたの反応は？",
    options: [
      { text: "「オレのソロの尺、8小節じゃ足りないから倍にして」", points: { Vo: 0, Gt: 4, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "「じゃあ歌詞は私が書くね！」", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "「とりあえずBPMとリフ教えて。キックのパターン考えるわ」", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 4, DTM: 0 } },
      { text: "「明日までにパラデータ（Stem）全部送るから家で録音して」", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } }
    ]
  },
  {
    id: 17, level: 2, text: "ライブが終わった後の撤収作業。あなたの様子は？",
    options: [
      { text: "滝のように汗を流しながら、鉄の塊（スタンド類）をケースに詰めている", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 4, DTM: 0 } },
      { text: "そもそもライブをしない（PCの電源を落として完了）", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "ファンや友達と話し込んでいて、気づけば撤収が終わっている", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "自分のエフェクターボードのケーブルを神経質に巻き直している", points: { Vo: 0, Gt: 3, Ba: 2, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 18, level: 2, text: "あなたにとって「理想のバンドメンバー」とは？",
    options: [
      { text: "初音ミク、またはVOCALOID", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "自分のソロの裏で、邪魔しないバッキングを弾いてくれる人", points: { Vo: 0, Gt: 4, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "絶対に走ったりモタったりしない、メトロノームのような人", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 4, DTM: 0 } },
      { text: "自分を引き立てる、最高の曲を書いてくれる人", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 19, level: 2, text: "流行りのポップスを聴いて、最初に出る感想は？",
    options: [
      { text: "「裏で鳴ってるカッティングのトーン、どこのアンプだろ」", points: { Vo: 0, Gt: 4, Ba: 1, Dr: 0, DTM: 0 } },
      { text: "「ボーカルのピッチ補正の跡が不自然で気になる」", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "「サビのメロディ、めっちゃ歌いやすい！」", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "「サブベースの処理がエグい。キックとの分離感がすごい」", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 3, DTM: 2 } }
    ]
  },
  {
    id: 20, level: 2, text: "「ヴィンテージ機材（オールド）」に対する思い入れは？",
    options: [
      { text: "重いしメンテが面倒。頑丈な現行品が一番", points: { Vo: 0, Gt: 0, Ba: 1, Dr: 4, DTM: 0 } },
      { text: "音が出ればなんでもいい。古いのは壊れそう", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "プラグインのエミュレーションで99%再現できるから実機は不要", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "60〜70年代の木材や配線には、現代の科学では作れない魔法がある", points: { Vo: 0, Gt: 4, Ba: 2, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 21, level: 2, text: "究極の問い。「音作り」の真髄はどこにある？",
    options: [
      { text: "ポストプロダクション（EQとコンプレッサーの処理）", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "楽器の材質と、それを鳴らし切るフィジカル（筋力）", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 4, DTM: 0 } },
      { text: "指先のニュアンスとピッキングの角度", points: { Vo: 0, Gt: 4, Ba: 2, Dr: 0, DTM: 0 } },
      { text: "ハートと人生経験", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 22, level: 2, text: "SNSにアップしがちなコンテンツは？",
    options: [
      { text: "新しく買った機材や、エフェクターボードの接写", points: { Vo: 0, Gt: 4, Ba: 2, Dr: 0, DTM: 0 } },
      { text: "自分の顔がバッチリ映った自撮りやライブ写真", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "メトロノームに合わせて延々と8ビートを刻む地味な練習動画", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 4, DTM: 0 } },
      { text: "誰もクリックしないSoundCloudやYouTubeのリンク", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } }
    ]
  },
  {
    id: 23, level: 2, text: "リハーサルスタジオでのサウンドチェック、最も気にするのは？",
    options: [
      { text: "「中低域が回ってるんで、ベースのアンプ少し下げてもらっていいですか」", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 3, DTM: 2 } },
      { text: "「同期（オケ）とクリックのバランス、パンニングはこれで大丈夫ですか？」", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "「自分の声、ちゃんと返ってきてますか？」", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "「アンプのマイキング、スピーカーのエッジから何センチずらしてます？」", points: { Vo: 0, Gt: 4, Ba: 0, Dr: 0, DTM: 1 } }
    ]
  },
  {
    id: 24, level: 2, text: "「カバー曲をやろう」と言われた時の反応は？",
    options: [
      { text: "「ステムデータ抜き出してEDM風にリミックスしていいならやる」", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "「原曲にはないけど、間奏で速弾きアレンジ入れていい？」", points: { Vo: 0, Gt: 4, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "「原曲のあの独特のレイドバック感（タメ）、完全再現しようぜ」", points: { Vo: 0, Gt: 0, Ba: 3, Dr: 4, DTM: 0 } },
      { text: "「私に合うキーに±3くらい変更して！」", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },

  // --- 🔴 特濃診断（25〜36問） ---
  {
    id: 25, level: 3, text: "BPM60のクリック音（メトロノーム）に対するあなたのスタンスは？",
    options: [
      { text: "クリックをあえて「裏拍」で鳴らし、自分の中に強靭なグルーヴを作る", points: { Vo: 0, Gt: 1, Ba: 4, Dr: 4, DTM: 0 } },
      { text: "クリックの音色自体のトランジェント（アタック成分）が耳障りでEQ処理したくなる", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "リズムキープの目安として、とりあえず鳴らしながら弾く・歌う", points: { Vo: 2, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "表拍のクリック音と発音タイミングを完全に同化させ、クリック音を「消す」ことに命を懸ける", points: { Vo: 0, Gt: 4, Ba: 3, Dr: 4, DTM: 0 } }
    ]
  },
  {
    id: 26, level: 3, text: "EQ（イコライザー）に対する哲学は？",
    options: [
      { text: "ベースのルート音とキックのアタック帯域が被らないよう、細かくカットする", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 3, DTM: 2 } },
      { text: "とりあえずドンシャリ（低音と高音を強調）にすれば派手でカッコいい", points: { Vo: 3, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "ダイナミックEQとマルチバンドコンプを併用し、特定の帯域が暴れた時だけ外科手術のように抑え込む", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "ギターの美味しい中音域（ミドル）をブーストして抜けを良くする", points: { Vo: 0, Gt: 4, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 27, level: 3, text: "音楽における「休符（無音）」の解釈は？",
    options: [
      { text: "フェードアウト後の完全な無音。すなわち -inf dB", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "音を鳴らしている時と同等の緊張感を持つ、グルーヴの一部", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 4, DTM: 0 } },
      { text: "空間系エフェクト（ディレイやリバーブ）の残響音を楽しむ時間", points: { Vo: 0, Gt: 4, Ba: 0, Dr: 0, DTM: 2 } },
      { text: "次に自分が目立つための待機時間", points: { Vo: 4, Gt: 2, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 28, level: 3, text: "「レイテンシー（音声の遅延）」についてどう思う？",
    options: [
      { text: "3ms（ミリ秒）を超えるとピッキングのニュアンスが狂うので耐えられない", points: { Vo: 0, Gt: 4, Ba: 4, Dr: 0, DTM: 1 } },
      { text: "レイテンシーって何？普通に音出てるけど", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "機材の遅延分を見越して、常に数ミリ秒「前ノリ」でプレイしている", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 4, DTM: 0 } },
      { text: "バッファサイズを極限まで下げつつ、CPU負荷でプチノイズが出ないギリギリの数値を常に探っている", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } }
    ]
  },
  {
    id: 29, level: 3, text: "あなたの「チューニング」に対する狂気度は？",
    options: [
      { text: "曲のキーに合わせて、スネアやタムのピッチ（倍音）までチューニングキーで厳密に合わせる", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 4, DTM: 0 } },
      { text: "MelodyneやAuto-Tuneで波形単位で修正するから録音時は大体でいい", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "クリップチューナーで緑のランプが点けばそれでOK", points: { Vo: 3, Gt: 1, Ba: 1, Dr: 0, DTM: 0 } },
      { text: "フレットの押弦テンションによる数セントのシャープすら許せず、ストロボチューナーを愛用する", points: { Vo: 0, Gt: 4, Ba: 3, Dr: 0, DTM: 1 } }
    ]
  },
  {
    id: 30, level: 3, text: "音楽における「最大の罪（最も許せないこと）」は？",
    options: [
      { text: "複数のマイクで録音した際の位相のズレ（フェイズキャンセル）による音痩せ", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "コードトーンを無視した、理論的に完全にアウトな音遣い", points: { Vo: 0, Gt: 4, Ba: 2, Dr: 0, DTM: 1 } },
      { text: "バンド全体のリズムがモタったり、BPMが一定でないこと", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 4, DTM: 0 } },
      { text: "感情がこもっていない、棒読みのような演奏や歌唱", points: { Vo: 4, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 31, level: 3, text: "コンプレッサー（Comp）の主な役割は何だと思う？",
    options: [
      { text: "カッティングやスラップのアタック感を揃え、粒立ちを良くするもの", points: { Vo: 0, Gt: 3, Ba: 4, Dr: 0, DTM: 1 } },
      { text: "キックをトリガーにしてベースをダッキングさせる（サイドチェイン）ためのツール", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "音をデカくして、オケに埋もれないようにする魔法の箱", points: { Vo: 3, Gt: 2, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "ドラムのアンビエンス（空気感）を持ち上げ、部屋の鳴りを強調するもの", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 4, DTM: 2 } }
    ]
  },
  {
    id: 32, level: 3, text: "「睡眠」と「音楽」のバランスは？",
    options: [
      { text: "スタジオ練習とバイトの往復で、移動中の車内が唯一のベッド", points: { Vo: 0, Gt: 0, Ba: 1, Dr: 4, DTM: 0 } },
      { text: "喉のコンディションと美容のために絶対に8時間は寝る", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "楽曲の書き出し（レンダリング）中が唯一の睡眠時間", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "練習中に寝落ちして、起きたら楽器を抱きしめていることがある", points: { Vo: 0, Gt: 4, Ba: 3, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 33, level: 3, text: "過去の自分の録音やミックスを聴き返した時、どう思う？",
    options: [
      { text: "「なぜ8kHzをこんなにブーストしたのか。今すぐ全トラックのEQをやり直したい」", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "「めっちゃ走ってる。グルーヴがゴミすぎて聴いていられない」", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 4, DTM: 0 } },
      { text: "「なんでこんなに歪ませてるの？トーンが汚すぎて死にたい」", points: { Vo: 0, Gt: 4, Ba: 2, Dr: 0, DTM: 1 } },
      { text: "「声が若くて、これはこれで味があるな」", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  },
  {
    id: 34, level: 3, text: "「ハードウェア（実機）」と「ソフトウェア」の争いについて",
    options: [
      { text: "真空管（チューブ）の温かみとアナログ回路こそが至高", points: { Vo: 0, Gt: 4, Ba: 3, Dr: 0, DTM: 0 } },
      { text: "マイクはハードウェアしか存在しないので争いにならない", points: { Vo: 4, Gt: 0, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "重い木材や金属のシェルが鳴る物理現象には、どんなソフトも勝てない", points: { Vo: 0, Gt: 0, Ba: 1, Dr: 4, DTM: 0 } },
      { text: "In the Box（PC内完結）こそが神。リコール（設定復元）できない実機など不要", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } }
    ]
  },
  {
    id: 35, level: 3, text: "あなたが最も愛する「和音（コード）」は？",
    options: [
      { text: "コードなんてどうでもいい。重要なのはルート音だけ", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 3, DTM: 0 } },
      { text: "オーケストレーションされ、全帯域を隙間なく埋め尽くす分厚いクラスター", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "パワーコード。細かいことはいい、歪ませて弾け", points: { Vo: 2, Gt: 3, Ba: 0, Dr: 0, DTM: 0 } },
      { text: "maj7(13) や m7(b5) などの複雑なテンションコードの響き", points: { Vo: 0, Gt: 4, Ba: 1, Dr: 0, DTM: 1 } }
    ]
  },
  {
    id: 36, level: 3, text: "最終問題。あなたにとって「音楽」を定義するなら？",
    options: [
      { text: "構築。周波数と時間を数学的に並べ替え、美しい仮想空間を設計する作業", points: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 4 } },
      { text: "探求。一生かけても辿り着けない「たった一つの完璧なトーン」を探す旅", points: { Vo: 0, Gt: 4, Ba: 1, Dr: 0, DTM: 1 } },
      { text: "鼓動。人間が生まれ持つ原始的なリズムと一体化する行為", points: { Vo: 0, Gt: 0, Ba: 4, Dr: 4, DTM: 0 } },
      { text: "自己表現。自分の魂の叫びを世界に届ける手段", points: { Vo: 4, Gt: 1, Ba: 0, Dr: 0, DTM: 0 } }
    ]
  }
];

// 後方互換用エイリアス
export const QUESTIONS = questions;

// ==========================================
// 2. 診断ロジック（パーセンテージと称号の算出）
// ==========================================

export function calculateResult(rawPoints: InstrumentPoints): { 
  percentages: InstrumentPoints; 
  resultData: ResultData 
} {
  // ポイントの総和を計算
  const total = rawPoints.Vo + rawPoints.Gt + rawPoints.Ba + rawPoints.Dr + rawPoints.DTM;
  
  // 0除算防止（全問未回答時など）
  if (total === 0) {
    return {
      percentages: { Vo: 0, Gt: 0, Ba: 0, Dr: 0, DTM: 0 },
      resultData: { title: "【名もなき観客】", description: "まずは何か音を鳴らしてみましょう。" }
    };
  }

  // パーセンテージ（正規化）
  const percentages = {
    Vo: Math.round((rawPoints.Vo / total) * 100),
    Gt: Math.round((rawPoints.Gt / total) * 100),
    Ba: Math.round((rawPoints.Ba / total) * 100),
    Dr: Math.round((rawPoints.Dr / total) * 100),
    DTM: Math.round((rawPoints.DTM / total) * 100),
  };

  // 割合順に並び替え
  const sorted = Object.entries(percentages).sort(([, a], [, b]) => b - a);
  const main = sorted[0][0] as Instrument;
  const sub = sorted[1][0] as Instrument;
  const mainPercent = sorted[0][1];

  let resultData: ResultData = { title: "", description: "" };

  // 全体が平坦（20%前後）の場合
  if (mainPercent < 25) {
    resultData = {
      title: "【器用貧乏マルチプレイヤー】",
      description: "何でもそこそこ出来るがゆえに、バンド内で欠けたパートを押し付けられがちな便利屋。あるいは、全てを一人でこなすシンガーソングライターの素質あり。"
    };
    return { percentages, resultData };
  }

  // 称号の判定ロジック
  if (main === 'Gt') {
    if (sub === 'DTM') {
      resultData = { title: "【孤高の自宅録音ギタリスト】", description: "人間と合わせるのを諦め、アンプシミュレーターの沼に足を踏み入れた現代の侍。" };
    } else if (sub === 'Vo') {
      resultData = { title: "【目立ちたがり屋の速弾きマシーン】", description: "ボーカルより自分が目立ちたいという欲求を、超絶技巧のタッピングに変換して発散するタイプ。" };
    } else {
      resultData = { title: "【音作りで一生を終える孤独な求道者】", description: "エフェクターの接続順や1ミリの弦高にこだわるあまり、肝心の曲が全く完成しない病気にかかりやすいタイプ。「最高のトーン」が出た瞬間に満足して録音ボタンを押し忘れるあなたには、ギターが天職です。" };
    }
  } 
  else if (main === 'Ba') {
    if (sub === 'Dr') {
      resultData = { title: "【絶対的グルーヴの番人】", description: "キックとベースが噛み合った瞬間にしか得られない脳内麻薬に完全に依存しています。" };
    } else if (mainPercent > 40) {
      resultData = { title: "【裏拍の軍師】", description: "全ての物事を裏拍（アップビート）で捉え、周囲の走るリズムを冷徹に引き戻す職人。" };
    } else {
      resultData = { title: "【低音域の影の支配者】", description: "「目立つ気はない」と涼しい顔をしながら、自分の刻むルート弾きでバンド全体のリズムを牛耳ることに密かな優越感を抱くタイプ。" };
    }
  }
  else if (main === 'Dr') {
    if (sub === 'Ba') {
      resultData = { title: "【歩くメトロノーム（重労働可）】", description: "機材運搬という過酷な肉体労働を笑顔でこなせる体力と、ミリ秒単位のズレを許さない狂気を併せ持つ存在。" };
    } else {
      resultData = { title: "【メトロノームの奴隷にして支配者】", description: "表拍のクリック音を鳴らしてリズムが崩壊する己の未熟さに絶望しつつ、それでも「ジャスト」を狙い続けるストイックな精神を持っています。" };
    }
  }
  else if (main === 'DTM') {
    if (mainPercent > 40) {
      resultData = { title: "【音響の魔術師（あるいは変態）】", description: "音楽を「感情」ではなく「周波数帯域のパズル」として処理する、もはやエンジニアの領域に達した狂人。" };
    } else {
      resultData = { title: "【プラグイン沼に沈む孤高の創造神】", description: "他人との摩擦を極端に嫌い、「全部自分でコントロールした方が早い」と考える究極の個人主義者。EQのQ幅を0.1単位でいじり続け、気づけば朝。" };
    }
  }
  else if (main === 'Vo') {
    resultData = { title: "【圧倒的自己肯定感モンスター】", description: "複雑な音楽理論よりも、「自分の声」という武器とパッションだけで全てをねじ伏せるカリスマ性の持ち主。「結局、私が主役」と息を吐くように思えるなら天職です。" };
  }

  return { percentages, resultData };
}
