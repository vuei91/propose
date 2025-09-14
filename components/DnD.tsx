import { useRef } from "react";
import { Rnd } from "react-rnd";
import { useModeState, useResizeState } from "../store";

const DnD = () => {
  const rndRef = useRef<Rnd>(null);
  const { mode } = useModeState();
  const { width, height, rotate } = useResizeState();
  return (
    <>
      <Rnd
        ref={rndRef}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        bounds="parent"
        enableResizing={false}
        disableDragging={mode === "VIEW"}
        className=" flex justify-center items-center"
      >
        <div style={{ width, height }} className="bg-yellow-500"></div>
      </Rnd>
    </>
  );
};

export default DnD;
