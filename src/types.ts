export interface IPage {
  id: number;
  date: string;
  page: number;
  contents: IContent[];
}

export interface IContent {
  // image
  id: number;
  src?: string;
  width: number;
  height: number;
  rotate: number;
  x: number;
  y: number;
  // text
  text?: string;
  color?: string;
  fontSize?: string | number;
  fontFamily?: string;
  fontWeight?: string | number;
}
