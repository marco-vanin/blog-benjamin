import { getAllCategories } from "@/actions/categoryAction";
import QuillEditor from "@/components/QuillEditor";

const EditorPage = async () => {
  const categories = await getAllCategories();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <QuillEditor categories={categories} />
    </div>
  );
};

export default EditorPage;
