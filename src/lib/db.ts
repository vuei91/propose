// lib/db.ts
import { IPage } from "@/types";
import { JSONFilePreset } from "lowdb/node";

type Data = {
  pages: IPage[];
};

const defaultData: Data = { pages: [] };

// data.json 파일과 연결된 DB 객체
export const db = await JSONFilePreset<Data>("data.json", defaultData);
