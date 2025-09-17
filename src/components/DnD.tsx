import { Rnd } from "react-rnd";
import { useCurrentContentState, useModeState, usePageState } from "../store";
import { IContent } from "@/types";
import { useEffect } from "react";

const DnD = ({ content }: { content: IContent }) => {
  const { mode } = useModeState();
  const { currentContent, setCurrentContent } = useCurrentContentState();
  const { modifyContent } = usePageState();
  useEffect(() => {
    if (mode === "VIEW") {
      setCurrentContent(null);
    }
  }, [mode]);
  return (
    <Rnd
      default={{
        x: content?.x ?? 0,
        y: content?.y ?? 0,
        width: content?.width ?? 100,
        height: content?.height ?? 100,
      }}
      position={{ x: content?.x ?? 0, y: content?.y ?? 0 }}
      bounds="parent"
      enableResizing={false}
      disableDragging={mode === "VIEW"}
      onDragStart={() => {
        if (mode === "VIEW") return;
        if (currentContent?.id !== content.id) {
          setCurrentContent(content);
        } else {
          setCurrentContent(null);
        }
      }}
      onDrag={(e, d) => {
        modifyContent(content.id, { x: d.x, y: d.y });
        setCurrentContent({ ...content, x: d.x, y: d.y });
      }}
      onDragStop={(e, d) => {
        if (currentContent?.id === content.id) {
          setCurrentContent(content);
        } else {
          setCurrentContent(null);
        }
      }}
    >
      <div
        style={{
          width: content?.width ?? 100,
          height: content?.height ?? 100,
          transform: `rotate(${content?.rotate ?? 0}deg)`,
          border: currentContent?.id === content.id ? "3px solid black" : "none",
          overflow: "auto",
        }}
        className="bg-yellow-500"
      >
        {content.id}
      </div>
    </Rnd>
  );
};

export default DnD;
