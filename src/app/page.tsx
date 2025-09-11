"use client";

import HTMLFlipBook from "react-pageflip";
import DnD from "../../components/DnD";
import Page from "../../components/Page";

export default function MyBook() {
  return (
    <Container width={600} height={700}>
      <Page date="20250907" number="1">
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
  );
}

const Container = (props: any) => <HTMLFlipBook {...props} />;
