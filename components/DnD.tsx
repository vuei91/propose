import { Rnd } from "react-rnd";
import { useModeState, useResizeState } from "../store";

const DnD = ({ id }: { id: number }) => {
  const { mode } = useModeState();
  const { getContent, currentContent, setCurrentContent, setXY } =
    useResizeState();
  return (
    <Rnd
      default={{
        x: getContent(id)?.x ?? 0,
        y: getContent(id)?.y ?? 0,
        width: 320,
        height: 200,
      }}
      bounds="parent"
      enableResizing={false}
      onDragStop={(_, d) => {
        setXY(id, d.x, d.y);
      }}
      className=" flex justify-center items-center"
      disableDragging={mode === "VIEW"}
      onDragStart={() => {
        if (currentContent?.id !== id) {
          setCurrentContent(id);
        }
      }}
      onDrag={() => {
        setCurrentContent(id);
      }}
      onMouseDown={() => {
        if (mode === "VIEW") {
          setCurrentContent(null);
          return;
        }
        if (id !== currentContent?.id) {
          setCurrentContent(id);
        } else {
          setCurrentContent(null);
        }
      }}
    >
      <div
        style={{
          width: getContent(id)?.width ?? 320,
          height: getContent(id)?.height ?? 200,
          transform: `rotate(${getContent(id)?.rotate ?? 0}deg)`,
          border: currentContent?.id === id ? "3px solid black" : "none",
        }}
        className="bg-yellow-500"
      >
        {id}
      </div>
    </Rnd>
  );
};

export default DnD;
