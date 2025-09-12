"use client";

import { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import DnD from "../../components/DnD";
import Input from "../../components/Input";
import Page from "../../components/Page";

export default function MyBook() {
  const [value, setValue] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
  return (
    <>
      <Container width={600} height={700} useMouseEvents={false}>
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
      <div className="inputs fixed bottom-[0] left-[0] m-4">
        <Input value={x} set={setX}>
          x
        </Input>
        <Input value={y} set={setY}>
          y
        </Input>
        <Input value={rotate} set={setRotate} min={-180} max={180}>
          rotate
        </Input>
      </div>
    </>
  );
}

const Container = (props: any) => <HTMLFlipBook {...props} />;
