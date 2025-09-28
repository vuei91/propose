"use client";
import { getPages } from "@/API";
import { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Controller from "../components/Controller";
import DnD from "../components/DnD";
import { useModeState, usePageState } from "../store";
import Buttons from "./Buttons";
import Page from "./Page";

export default function Main() {
  const { mode } = useModeState();
  const { pages, setPages } = usePageState();
  const flipRef = useRef(null);

  useEffect(() => {
    getPages().then((res) => setPages(res));
  }, []);

  const onNext = () => {
    if (flipRef.current && mode === "VIEW") {
      // @ts-ignore
      flipRef.current.pageFlip().flipNext();
    }
  };
  const onPrev = () => {
    if (flipRef.current && mode === "VIEW") {
      // @ts-ignore
      flipRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <>
      <Buttons />
      <Controller />
      <Container ref={flipRef}>
        {pages.map((page, i) => (
          <Page key={page.id} date={page.date} index={page.page} onNext={onNext} onPrev={onPrev}>
            {page.contents.map((content) => (
              <DnD key={content.id} content={content} />
            ))}
          </Page>
        ))}
      </Container>
    </>
  );
}

const Container = (props: any) => {
  return (
    <>
      <HTMLFlipBook {...props} width={600} height={700} useMouseEvents={false} />
    </>
  );
};
