import { useModeState, useResizeState } from "../store";

const Controller = () => {
  const { mode, toggleMode } = useModeState();
  const { width, height, setWidth, setHeight } = useResizeState();
  return (
    <ul className="fixed right-0 bg-base-200 text-base-content w-80 p-4 h-full">
      <div className="flex justify-between items-center">
        <h6 className="font-bold">{mode} Mode</h6>
        <button className="btn btn-secondary" onClick={toggleMode}>
          {mode === "EDIT" ? "VIEW" : "EDIT"}
        </button>
      </div>
      <div className="divider"></div>
      <li>
        <div className="mb-1">{"Width"}</div>
        <input
          type="range"
          min={100}
          max={1000}
          value={width}
          className="range range-neutral"
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </li>
      <div className="divider"></div>
      <li>
        <div className="mb-1">{"Height"}</div>
        <input
          type="range"
          min={100}
          max={1000}
          value={height}
          className="range range-primary"
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </li>
      <div className="divider"></div>
      <li>
        <div className="mb-1">{"Rotate"}</div>
        <input
          type="range"
          min={0}
          max="100"
          className="range range-secondary "
        />
      </li>
    </ul>
  );
};

export default Controller;
