"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "@/styles/quill.css";
import { createPost, updatePost, getPostById } from "@/actions/postAction";
import CategorySelect from "./CategorySelect";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { TOOLBAR_OPTIONS } from "../../constants/quill.constants";

interface Props {
  categories: { id: string; name: string }[];
}

const QuillEditor: React.FC<Props> = ({ categories }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const router = useRouter();
  const { toast } = useToast();

  const handleCancel = useCallback(() => {
    toast({
      title: postId ? "Modification annulée" : "Création annulée",
      description: postId
        ? "Aucune modification n'a été apportée."
        : "Le post n'a pas été créé.",
    });
    router.push("/admin");
  }, [postId, router, toast]);

  // Initialisation de l'éditeur Quill (monté une seule fois)
  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;
    const editorDiv = document.createElement("div");
    editorRef.current.appendChild(editorDiv);
    quillRef.current = new Quill(editorDiv, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    quillRef.current.on("text-change", () =>
      setContent(quillRef.current?.root.innerHTML || "")
    );

    return () => {
      // Nettoyage lors du démontage du composant
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    };
  }, []);

  // Chargement du contenu du post si postId est présent
  useEffect(() => {
    if (!postId || !quillRef.current) return;
    (async () => {
      const post = await getPostById(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.categoryId);
        quillRef.current!.clipboard.dangerouslyPasteHTML(post.content);
      }
    })();
  }, [postId]);

  const handleSave = async () => {
    if (!categoryId) {
      toast({ title: "Erreur", description: "La catégorie est requise." });
      return;
    }

    try {
      if (postId) {
        await updatePost(postId, { title, content, categoryId });
        toast({
          title: "Post modifié",
          description: "Le post a été modifié avec succès.",
        });
      } else {
        await createPost({ title, content, categoryId });
        toast({
          title: "Post créé",
          description: "Le post a été créé avec succès.",
        });
      }
      router.push("/admin");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Titre du post"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <CategorySelect
        categories={categories}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
      />

      <div ref={editorRef} className="quill-editor mb-4" />

      <div className="flex gap-2">
        <Button onClick={handleSave}>Sauvegarder</Button>
        <Button onClick={handleCancel} variant="outline">
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default QuillEditor;
