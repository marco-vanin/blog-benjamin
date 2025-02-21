"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateText } from "@/lib/utils";

interface Props {
  post: Post;
}

const AdminPostCard = ({ post }: Props) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/editor?id=${post.id}`);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{truncateText(post.content, 20)}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default">Voir</Button>
        <Button variant="outline" onClick={handleEdit}>
          Modifier
        </Button>
        <Button variant="destructive">Supprimer</Button>
      </CardFooter>
    </Card>
  );
};

export default AdminPostCard;
