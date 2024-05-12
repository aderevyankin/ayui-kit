import React from "react";
import ReactDOM from "react-dom";

// украдено подчистую

const portalRoot = document.getElementById("modals-root")!;

export function Portal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, portalRoot);
}
