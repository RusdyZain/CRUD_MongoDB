import { useRouter } from "next/router";
import EditTopicForm from "@/components/EditTopicForm";
import React, { useEffect, useState } from "react";

interface Topic {
  _id: string;
  title: string;
  description: string;
}

export default function EditTopic(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/topics")
      .then((res) => res.json())
      .then((data) => {
        const topicsArray = data.topics;
        setTopics(topicsArray);
      })
      .catch((error) => console.error("Error fetching topics:", error));
  }, []);

  const topic = topics.find((topic) => topic._id === id);

  if (!topic) {
    return <p>Loading...</p>;
  }

  return (
    <EditTopicForm
      id={id as string}
      title={topic.title}
      description={topic.description}
    />
  );
}
