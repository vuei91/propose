import { IContent } from "@/types";
import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { useCurrentContentState, useModeState, usePageState } from "../store";

const DnD = ({ content }: { content: IContent }) => {
  const { mode } = useModeState();
  const { currentContent, setCurrentContent } = useCurrentContentState();
  const { modifyContent } = usePageState();
  const dndRef = useRef<Rnd>(null);
  useEffect(() => {
    if (mode === "VIEW") {
      setCurrentContent(null);
    }
  }, [mode]);

  useEffect(() => {
    dndRef.current?.updatePosition({ x: content?.x, y: content?.y });
  }, [content]);

  return (
    <Rnd
      bounds={"parent"}
      enableResizing={false}
      disableDragging={mode === "VIEW"}
      key={content?.id}
      ref={dndRef}
      onDragStart={(e, d) => {
        if (mode === "VIEW") return;
        if (currentContent?.id !== content.id) {
          setCurrentContent({ ...content, x: d.x, y: d.y });
        } else {
          setCurrentContent(null);
        }
      }}
      onDrag={() => {
        setCurrentContent(content);
      }}
      onDragStop={(e, d) => {
        if (currentContent?.id === content.id) {
          setCurrentContent({ ...content, x: d.x, y: d.y });
        } else {
          setCurrentContent(null);
        }
        modifyContent(content.id, { x: d.x, y: d.y });
      }}
    >
      {content?.src && (
        <img
          style={{
            width: content?.width ?? 100,
            height: content?.height ?? 100,
            transform: `rotate(${content?.rotate ?? 0}deg)`,
            border: currentContent?.id === content.id ? "3px solid black" : "none",
            overflow: "auto",
          }}
          draggable={false}
          src={content?.src}
          key={content?.id}
        />
      )}
      {content?.text && (
        <div
          style={{
            width: content?.width ?? 100,
            height: content?.height ?? 100,
            transform: `rotate(${content?.rotate ?? 0}deg)`,
            border: currentContent?.id === content.id ? "3px solid black" : "none",
            fontWeight: currentContent?.fontWeight ?? content?.fontWeight,
            color: currentContent?.color ?? content?.color,
            fontSize: `${currentContent?.fontSize ?? content?.fontSize}px`,
            overflow: "auto",
          }}
        >
          {currentContent?.text ?? content?.text}
        </div>
      )}
    </Rnd>
  );
};

export default DnD;
