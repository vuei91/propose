import { useModeState, useResizeState } from "../store";

const Controller = () => {
  const { mode, toggleMode } = useModeState();
  const { currentContent, setWidth, setHeight, setRotate } = useResizeState();
  return (
    <ul className="fixed right-0 bg-base-200 text-base-content w-80 p-4 h-full z-10">
      <div className="flex justify-between items-center">
        <h6 className="font-bold">{mode} Mode</h6>
        <button className="btn btn-secondary" onClick={toggleMode}>
          {mode === "EDIT" ? "VIEW" : "EDIT"}
        </button>
      </div>
      {currentContent && (
        <>
          <div className="divider"></div>
          <li>
            <div className="mb-1">
              {"Width(" + currentContent?.width + "px)"}
            </div>
            <input
              type="range"
              min={100}
              max={1000}
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
              min={100}
              max={1000}
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
        </>
      )}
    </ul>
  );
};

export default Controller;
