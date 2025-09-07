"use client";
import HTMLFlipBook from "react-pageflip";
import Page from "../../components/Page";

export default function MyBook() {
  return (
    // @ts-ignore
    <HTMLFlipBook width={600} height={700}>
      <Page date="20250907" number="1">
        <div className="w-full">Hello world</div>
      </Page>
      <Page date="20250907" number="2">
        Page text
      </Page>
      <Page date="20250907" number="3">
        Page text
      </Page>
      <Page date="20250907" number="4">
        Page text
      </Page>
    </HTMLFlipBook>
  );
}
