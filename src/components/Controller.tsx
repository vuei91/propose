import { IContent } from "@/types";
import { ChangeEvent } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { useCurrentContentState, usePageState } from "../store";

const Controller = () => {
  const { currentContent } = useCurrentContentState();
  return (
    currentContent && (
      <ul className="fixed right-0 bg-base-200 text-base-content p-4 bottom-0 z-10">
        <ImageController />
        <TextContoller />
      </ul>
    )
  );
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
    <ul className="fixed left-0 bg-base-200 text-base-content p-4 bottom-0 z-10">
      <div>
        x: {currentContent?.x ?? 0} y: {currentContent?.y ?? 0}
      </div>
      <li>
        <div className="mb-1">{"Width(" + currentContent?.width + "px)"}</div>
        <input type="range" min={0} max={500} value={currentContent?.width ?? 0} className="range range-neutral" onChange={(e) => setWidth(currentContent?.id!, Number(e.target.value))} disabled={!!currentContent?.text} />
      </li>
      <div className="divider"></div>
      <li>
        <div className="mb-1">{"Height(" + currentContent?.height + "px)"}</div>
        <input type="range" min={0} max={500} value={currentContent?.height ?? 0} className="range range-primary" onChange={(e) => setHeight(currentContent?.id!, Number(e.target.value))} disabled={!!currentContent?.text} />
      </li>
      <div className="divider"></div>
      <li>
        <div className="mb-1">{"Rotate"}</div>
        <input type="number" className="input w-[100px]" value={currentContent?.rotate} onChange={(e) => setRotate(currentContent?.id!, Number(e.target.value))} />
        {" deg"}
        <input type="range" min={-180} max={180} value={currentContent?.rotate ?? 0} onChange={(e) => setRotate(currentContent?.id!, Number(e.target.value))} className="range range-secondary " />
      </li>
    </ul>
  );
};

const TextContoller = () => {
  const { modifyContent } = usePageState();
  const { currentContent, setCurrentContent } = useCurrentContentState();
  const onChangeBold = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentContent({ ...currentContent, fontWeight: e.target.checked ? "700" : "500" } as IContent);
    modifyContent(currentContent?.id!, { fontWeight: e.target.checked ? "700" : "500" });
  };
  const onChangeFontSize = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentContent({ ...currentContent, fontSize: e.target.value } as IContent);
    modifyContent(currentContent?.id!, { fontSize: e.target.value });
  };
  const onChangeColor = (color: ColorResult) => {
    setCurrentContent({ ...currentContent, color: color.hex } as IContent);
    modifyContent(currentContent?.id!, { color: color.hex });
  };
  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent({ ...currentContent, text: e.target.value } as IContent);
    modifyContent(currentContent?.id!, { text: e.target.value });
  };
  return (
    currentContent?.type === "text" && (
      <div className="fixed right-0 bg-base-200 p-4 bottom-0 z-10">
        <div className="flex flex-col">
          <fieldset className="fieldset">
            <div className="fieldset-legend">Bold</div>
            <input type="checkbox" defaultChecked={currentContent?.fontWeight === "700"} className="toggle toggle-error" onChange={onChangeBold} />
          </fieldset>
          <textarea className="textarea resize" rows={5} cols={5} value={currentContent?.text} placeholder="Text" onChange={onChangeText}></textarea>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Font Size</legend>
            <input type="number" className="input" placeholder="Font Size" value={currentContent?.fontSize ?? "14"} onChange={onChangeFontSize} />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Font Color</legend>
            <SketchPicker color={currentContent?.color} onChangeComplete={onChangeColor} />
          </fieldset>
        </div>
      </div>
    )
  );
};

export default Controller;
