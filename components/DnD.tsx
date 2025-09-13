import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import Rotate from "./Rotate";
import { useModeState } from "../store";

const DnD = () => {
  const [rotation, setRotation] = useState(0);
  const rndRef = useRef<Rnd>(null);
  const { mode } = useModeState();
  return (
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
      className="bg-yellow-500 flex justify-center items-center"
    >
      Hello
    </Rnd>
  );
};

export default DnD;
