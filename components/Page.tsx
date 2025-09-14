import { forwardRef, ReactNode, Ref } from "react";

const Page = forwardRef(
  (
    {
      children,
      date,
      index,
      onNext,
      onPrev,
    }: {
      children: ReactNode;
      date: string;
      index: number;
      onNext?: () => void;
      onPrev?: () => void;
    },
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className="relative bg-white border-[1px] rounded-lg !p-4"
        onClick={index % 2 === 1 ? onPrev : onNext}
      >
        <div className="absolute right-4 top-4 z-10">{date}</div>
        {children}
        <div
          className={`absolute bottom-4  ${
            index % 2 === 0 ? "right-4" : "left-4"
          }`}
        >
          {index}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

export default Page;
