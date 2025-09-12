import { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import Rotate from "./Rotate";

const DnD = () => {
  const [rotation, setRotation] = useState(0);
  const rndRef = useRef<Rnd>(null);

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
      disableDragging
    >
      <Rotate />
    </Rnd>
  );
};

export default DnD;
