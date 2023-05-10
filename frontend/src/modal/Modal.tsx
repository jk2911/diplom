import styled from "styled-components";
import "./modal.css";

interface IModal {
  active: boolean;
  setActive: any;
  children:any;
}

export function Modal({ active, setActive, children }: IModal) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className={active ? "modal_content active" : "modal_content"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
