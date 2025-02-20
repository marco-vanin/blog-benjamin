"use client";

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "@/styles/quill.css";

const QuillEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = document.createElement("div");
    const currentEditorRef = editorRef.current;
    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ];

    if (currentEditorRef) {
      currentEditorRef.appendChild(editor);
      new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
    }

    return () => {
      if (currentEditorRef) {
        currentEditorRef.innerHTML = "";
      }
    };
  }, []);

  return <div ref={editorRef} className="quill-editor"></div>;
};

export default QuillEditor;
