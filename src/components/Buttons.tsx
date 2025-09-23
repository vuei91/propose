import { savePages } from "@/API";
import { useCurrentContentState, useModeState, usePageState } from "@/store";
import { IContent, IPage } from "@/types";
import FileController from "./FileController";

const Buttons = () => {
  const { mode, toggleMode } = useModeState();
  const { pages, addContent, removeContent, addPage, removePage, modfityPage } = usePageState();
  const { currentContent } = useCurrentContentState();

  const onAddText = () => {
    const page = prompt("페이지 번호를 입력하세요");
    if (!page) return;
    if (isNaN(Number(page))) return alert("숫자만 입력 가능합니다");
    const newContent: IContent = {
      id: Date.now(),
      text: "텍스트를 입력하세요",
      width: 100,
      height: 100,
      rotate: 0,
      x: 0,
      y: 0,
    };
    addContent(newContent, Number(page));
  };
  const onRemove = () => {
    if (!currentContent) return alert("삭제할 컨텐츠를 선택해주세요");
    removeContent(currentContent?.id!);
  };
  const onAddPage = () => {
    const date = prompt("페이지 날짜를 입력하세요");
    if (!date) {
      alert("날짜를 입력해주세요");
      return;
    }
    const newPage = {
      id: Date.now(),
      date: date,
      page: pages[pages.length - 1]?.page + 1 || 1,
      contents: [],
    } as IPage;
    addPage(newPage);
  };

  const onSave = () => {
    savePages(pages).then(() => alert("저장되었습니다"));
  };
  const onRemovePage = () => {
    removePage(pages[pages.length - 1]?.page!);
  };
  const onModifyPage = () => {
    const pageNumber = prompt("수정할 페이지 번호를 입력하세요");
    const date = prompt("페이지 날짜를 입력하세요");
    if (!pageNumber || !date) {
      alert("페이지 번호와 날짜를 입력해주세요");
      return;
    }
    if (isNaN(Number(pageNumber))) return alert("숫자만 입력 가능합니다");
    const page = pages.find((p) => p.page === Number(pageNumber));
    if (!page) return alert("해당 페이지가 없습니다");
    modfityPage(Number(pageNumber), { date });
  };
  return (
    <>
      <div className="fixed top-4 left-4 z-10 flex gap-2 flex-col">
        <div>Total {pages.length} Page</div>
        {mode === "EDIT" && (
          <button className="btn btn-primary" onClick={onSave}>
            저장
          </button>
        )}
      </div>
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-10">
        <button className="btn btn-primary" onClick={toggleMode}>
          {mode === "VIEW" ? "편집" : "뷰"}
        </button>
        {mode === "EDIT" && (
          <>
            <button className="btn btn-error btn-soft" onClick={onAddPage}>
              페이지 추가
            </button>
            <button className="btn btn-error btn-soft break-keep" onClick={onRemovePage}>
              마지막 페이지 삭제
            </button>
            <button className="btn btn-error btn-soft break-keep" onClick={onModifyPage}>
              페이지 날짜 수정
            </button>
            <button className="btn btn-secondary" onClick={onAddText}>
              텍스트 추가
            </button>
            <FileController />
            <button className="btn btn-secondary" onClick={onRemove}>
              컨텐츠 삭제
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Buttons;
