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
      <div ref={ref}>
        <h1>{date}</h1>
        {children}
        <p>{number}</p>
      </div>
    );
  }
);

export default Page;
