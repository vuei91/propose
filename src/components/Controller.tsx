import { useResizeState } from "../store";

const Controller = () => {
  const { currentContent, setWidth, setHeight, setRotate } = useResizeState();
  return (
    currentContent && (
      <ul className="fixed right-0 bg-base-200 text-base-content p-4 bottom-0 z-10">
        <li>
          <div className="mb-1">{"Width(" + currentContent?.width + "px)"}</div>
          <input
            type="range"
            min={0}
            max={500}
            value={currentContent?.width}
            className="range range-neutral"
            onChange={(e) =>
              setWidth(currentContent?.id!, Number(e.target.value))
            }
          />
        </li>
        <div className="divider"></div>
        <li>
          <div className="mb-1">
            {"Height(" + currentContent?.height + "px)"}
          </div>
          <input
            type="range"
            min={0}
            max={500}
            value={currentContent?.height}
            className="range range-primary"
            onChange={(e) =>
              setHeight(currentContent?.id!, Number(e.target.value))
            }
          />
        </li>
        <div className="divider"></div>
        <li>
          <div className="mb-1">
            {"Rotate" + `(${currentContent?.rotate}deg)`}
          </div>
          <input
            type="range"
            min={-180}
            max={180}
            value={currentContent?.rotate}
            onChange={(e) =>
              setRotate(currentContent?.id!, Number(e.target.value))
            }
            className="range range-secondary "
          />
        </li>
      </ul>
    )
  );
};

export default Controller;
