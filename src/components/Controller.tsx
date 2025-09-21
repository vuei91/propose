import { IContent } from "@/types";
import { useCurrentContentState, usePageState } from "../store";
import { SketchPicker } from "react-color";

const Controller = () => {
  const { currentContent } = useCurrentContentState();
  if (!!currentContent?.src) return <ImageController />;
  if (!!currentContent?.text) return <TextContoller />;
};

const ImageController = () => {
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
    <ul className="fixed right-0 bg-base-200 text-base-content p-4 bottom-0 z-10">
      <div>
        x: {currentContent?.x ?? 0} y: {currentContent?.y ?? 0}
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
  );
};

const TextContoller = () => {
  const { currentContent, setCurrentContent } = useCurrentContentState();
  return (
    <div className="fixed right-0 bg-base-200 text-base-content p-4 bottom-0 z-10">
      <div className="flex flex-col">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Font Weight</legend>
          <input type="number" className="input" placeholder="My awesome page" onChange={(e) => setCurrentContent({ ...currentContent, fontWeight: e.target.value } as IContent)} />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Font Size</legend>
          <input type="number" className="input" placeholder="My awesome page" onChange={(e) => setCurrentContent({ ...currentContent, fontSize: e.target.value } as IContent)} />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Font Color</legend>
          <SketchPicker color={currentContent?.color} onChangeComplete={(color) => setCurrentContent({ ...currentContent, color: color.hex } as IContent)} />
        </fieldset>
        <textarea
          name=""
          rows={5}
          id=""
          onChange={(e) => {
            setCurrentContent({ ...currentContent, text: e.target.value } as IContent);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default Controller;
