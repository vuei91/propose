"use client";

import HTMLFlipBook from "react-pageflip";
import DnD from "../../components/DnD";
import Page from "../../components/Page";
import { useModeState } from "../../store";

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

  return mode === "VIEW" ? (
    <HTMLFlipBook {...props} />
  ) : (
    <HTMLFlipBook useMouseEvents={false} {...props} />
  );
};
