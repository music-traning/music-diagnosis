export type {
  Instrument,
  InstrumentPoints,
  Option,
  Question,
  ResultData,
} from "@/data/questions";

import type { InstrumentPoints } from "@/data/questions";

// 互換用エイリアス
export type Points = InstrumentPoints;

export type CourseType = 12 | 24 | 36;

export type CourseName = "普通" | "濃い" | "特濃";

export const COURSE_NAME_MAP: Record<CourseType, CourseName> = {
  12: "普通",
  24: "濃い",
  36: "特濃",
};

// GASから返却される全体の平均値データ構造（小文字キー）
export type GASAverages = {
  vo: number;
  gt: number;
  ba: number;
  dr: number;
  dtm: number;
};

export type CourseInfo = {
  count: CourseType;
  maxLevel: 1 | 2 | 3;
  label: string;
  subtitle: string;
  estimatedTime: string;
  badge: string;
};

export const COURSES: CourseInfo[] = [
  {
    count: 12,
    maxLevel: 1,
    label: "普通（ライト）",
    subtitle: "サクッと自分の楽器適性を知りたい方へ（Level 1）",
    estimatedTime: "約1〜2分",
    badge: "12問",
  },
  {
    count: 24,
    maxLevel: 2,
    label: "濃い（スタンダード）",
    subtitle: "音楽へのこだわりと深層心理まで分析（Level 1〜2）",
    estimatedTime: "約3〜4分",
    badge: "24問",
  },
  {
    count: 36,
    maxLevel: 3,
    label: "特濃（ディープ）",
    subtitle: "真の音楽的本性と隠れた才能を完全解剖（Level 1〜3 全問）",
    estimatedTime: "約5〜6分",
    badge: "36問",
  },
];

export type QuizStoredState = {
  course: CourseType | null;
  currentIndex: number;
  pointsHistory: InstrumentPoints[];
  accumulatedPoints: InstrumentPoints;
  isCompleted: boolean;
  updatedAt: number;
};
