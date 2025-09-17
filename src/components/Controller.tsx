import { useCurrentContentState, usePageState } from "../store";

const Controller = () => {
  const { modifyContent } = usePageState();
  const { currentContent, setCurrentContent } = useCurrentContentState();
  const setWidth = (id: number, width: number) => {
    modifyContent(id, { width });
    setCurrentContent({ ...currentContent!, width });
  };
  const setHeight = (id: number, height: number) => {
    modifyContent(id, { height });
    setCurrentContent({ ...currentContent!, height });
  };
  const setRotate = (id: number, rotate: number) => {
    modifyContent(id, { rotate });
    setCurrentContent({ ...currentContent!, rotate });
  };
  return (
    currentContent && (
      <ul className="fixed right-0 bg-base-200 text-base-content p-4 bottom-0 z-10">
        <div>
          x: {currentContent.x} y: {currentContent.y}
        </div>
        <li>
          <div className="mb-1">{"Width(" + currentContent?.width + "px)"}</div>
          <input type="range" min={0} max={500} value={currentContent?.width} className="range range-neutral" onChange={(e) => setWidth(currentContent?.id!, Number(e.target.value))} />
        </li>
        <div className="divider"></div>
        <li>
          <div className="mb-1">{"Height(" + currentContent?.height + "px)"}</div>
          <input type="range" min={0} max={500} value={currentContent?.height} className="range range-primary" onChange={(e) => setHeight(currentContent?.id!, Number(e.target.value))} />
        </li>
        <div className="divider"></div>
        <li>
          <div className="mb-1">{"Rotate" + `(${currentContent?.rotate}deg)`}</div>
          <input type="range" min={-180} max={180} value={currentContent?.rotate} onChange={(e) => setRotate(currentContent?.id!, Number(e.target.value))} className="range range-secondary " />
        </li>
      </ul>
    )
  );
};

export default Controller;
