export interface IPage {
  id: number;
  date: string;
  page: number;
  contents: IContent[];
}

export interface IContent {
  id: number;
  type: "text" | "image";
  width: number;
  height: number;
  rotate: number;
  x: number;
  y: number;
}
