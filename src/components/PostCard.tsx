"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateText } from "@/lib/utils";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <Card className="w-[350px]" onClick={handleClick}>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{truncateText(post.content, 20)}</CardDescription>
      </CardHeader>
      <CardContent>
        card content a remplir avec quelque chose quelque part un jour
      </CardContent>
    </Card>
  );
};

export default PostCard;
