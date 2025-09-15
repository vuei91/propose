"use client";

import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Controller from "../../components/Controller";
import DnD from "../../components/DnD";
import Page from "../../components/Page";
import { useModeState, useResizeState } from "../../store";

export default function MyBook() {
  const { mode } = useModeState();
  const { contents } = useResizeState();
  const flipRef = useRef(null);

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
