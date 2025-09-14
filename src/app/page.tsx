"use client";

import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Controller from "../../components/Controller";
import DnD from "../../components/DnD";
import Page from "../../components/Page";
import { useModeState } from "../../store";

export default function MyBook() {
  const { mode, toggleMode } = useModeState();
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
      <Container width={600} height={700} ref={flipRef} useMouseEvents={false}>
        <Page date="20250907" index={1} onNext={onNext} onPrev={onPrev}>
          <DnD />
        </Page>
        <Page date="20250907" index={2} onNext={onNext} onPrev={onPrev}>
          Container text
        </Page>
        <Page date="20250907" index={3} onNext={onNext} onPrev={onPrev}>
          Container text
        </Page>
        <Page date="20250907" index={4} onNext={onNext} onPrev={onPrev}>
          Container text
        </Page>
      </Container>
    </>
  );
}

const Container = (props: any) => {
  return (
    <>
      <HTMLFlipBook {...props} />
    </>
  );
};
