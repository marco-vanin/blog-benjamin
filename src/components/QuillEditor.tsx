"use client";

import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "@/styles/quill.css";
import { createPost } from "@/actions/postAction";
import CategorySelect from "./CategorySelect";

interface Props {
  categories: { id: string; name: string }[];
}

const QuillEditor = ({ categories }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

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
      const quill = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });

      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });
    }

    return () => {
      if (currentEditorRef) {
        currentEditorRef.innerHTML = "";
      }
    };
  }, []);

  const handleSave = async () => {
    try {
      if (!categoryId) throw new Error("Category is required");

      const result = await createPost({ title, content, categoryId });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <CategorySelect
        categories={categories}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

      <div ref={editorRef} className="quill-editor mb-4"></div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Post
      </button>
    </div>
  );
};

export default QuillEditor;
