interface Post {
  id: string;
  title: string;
  content: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

interface PostParams {
  title: string;
  content: string;
  categoryId: string;
}

interface CategorieParams {
  name: string;
}
