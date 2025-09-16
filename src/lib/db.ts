// lib/db.ts
import { JSONFilePreset } from "lowdb/node";

// Content 타입 정의
export type Content = {
  id: number;
  date: string;
  type: "text" | "image";
  width: number;
  height: number;
  rotate: number;
  page: number;
  x: number;
  y: number;
};

type Data = {
  contents: Content[];
};

const defaultData: Data = { contents: [] };

// data.json 파일과 연결된 DB 객체
export const db = await JSONFilePreset<Data>("data.json", defaultData);
