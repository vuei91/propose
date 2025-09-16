"use client";

import { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Controller from "../components/Controller";
import DnD from "../components/DnD";
import Page from "../components/Page";
import { useModeState, useResizeState } from "../store";
import { getContents } from "@/API";

export default function Main() {
  const { mode } = useModeState();
  const { contents, setContents } = useResizeState();
  const flipRef = useRef(null);

  useEffect(() => {
    getContents().then((res) => setContents(res));
  }, []);

  console.log("contents", contents);

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
        {contents.map((d, i) => (
          <Page
            key={d.id}
            date={d.date}
            index={i + 1}
            onNext={onNext}
            onPrev={onPrev}
          >
            {d.page === i + 1 && <DnD id={d.id} />}
          </Page>
        ))}
      </Container>
    </>
  );
}

const Container = (props: any) => {
  return (
    <>
      <HTMLFlipBook
        {...props}
        width={600}
        height={700}
        useMouseEvents={false}
      />
    </>
  );
};

const Buttons = () => {
  const { mode, toggleMode } = useModeState();
  return (
    <>
      <div className="fixed top-4 left-4">
        <button className="btn" onClick={toggleMode}>
          {mode === "VIEW" ? "Edit" : "View"}
        </button>
      </div>
      <div className="fixed top-4 right-4">
        <button className="btn" onClick={toggleMode}>
          Save
        </button>
      </div>
    </>
  );
};
