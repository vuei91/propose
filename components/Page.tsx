import { forwardRef, ReactNode, Ref } from "react";

const Page = forwardRef(
  (
    {
      children,
      date,
      number,
    }: { children: ReactNode; date: string; number: string },
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className="relative bg-white border-[1px] rounded-lg !p-4">
        <div className="absolute right-4 top-4 z-10">{date}</div>
        {children}
        <div
          className={`absolute bottom-4  ${
            Number(number) % 2 === 0 ? "right-4" : "left-4"
          }`}
        >
          {number}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

export default Page;
