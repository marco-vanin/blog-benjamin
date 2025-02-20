"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const CreatePostButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/editor");
  };

  return <Button onClick={handleClick}>Créer un post</Button>;
};

export default CreatePostButton;
