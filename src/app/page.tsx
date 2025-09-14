"use client";

import HTMLFlipBook from "react-pageflip";
import DnD from "../../components/DnD";
import Page from "../../components/Page";
import { useModeState } from "../../store";
import { useEffect, useRef } from "react";

export default function MyBook() {
  const { mode, toggleMode } = useModeState();
  return (
    <>
      <button
        className="btn btn-soft btn-error fixed top-4 right-4 z-10"
        onClick={toggleMode}
      >
        {mode === "EDIT" ? "VIEW" : "EDIT"}
      </button>
      <Container width={600} height={700}>
        <Page date="20250907" number="2">
          <DnD />
        </Page>
        <Page date="20250907" number="2">
          Container text
        </Page>
        <Page date="20250907" number="3">
          Container text
        </Page>
        <Page date="20250907" number="4">
          Container text
        </Page>
      </Container>
    </>
  );
}

const Container = (props: any) => {
  const { mode } = useModeState();
  const ref = useRef(null);

  const onClick = () => {
    if (ref.current) {
      // @ts-ignore
      ref.current.pageFlip().flipNext();
    }
  };
  const onClickPrev = () => {
    if (ref.current) {
      // @ts-ignore
      ref.current.pageFlip().flipPrev();
    }
  };

  return mode === "VIEW" ? (
    <>
      <HTMLFlipBook {...props} ref={ref} />
      <br />
      <br />
      <button
        style={{ margin: 20, border: "1px solid", background: "red" }}
        onClick={onClick}
      >
        next
      </button>
      <button
        style={{ margin: 20, border: "1px solid", background: "red" }}
        onClick={onClickPrev}
      >
        prev
      </button>
    </>
  ) : (
    <>
      <HTMLFlipBook useMouseEvents={false} {...props} />
      <br />
      <br />
      <button style={{ margin: 20 }} onClick={onClick}>
        d
      </button>
    </>
  );
};
