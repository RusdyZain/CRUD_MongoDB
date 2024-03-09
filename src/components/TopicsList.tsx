import React, { useEffect, useState } from "react";
import Remove from "@/components/button/Remove";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

interface Topic {
  _id: string;
  title: string;
  description: string;
}

const TopicsList = () => {
  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    fetch("http://localhost:3000/api/topics")
      .then((res) => res.json())
      .then((data) => {
        const topicsArray = data.topics;
        setTopics(topicsArray);
      })
      .catch((error) => console.error("Error fetching topics:", error));
  }, []);

  if (!topics) return <p>Loading Data ...</p>;

  return (
    <>
      {topics.map((topic) => (
        <div
          key={topic._id} // Gunakan key yang unik untuk setiap topik
          className="p-4 border border-state-300 my-3 flex justify-between gap-5 items-center"
        >
          <div>
            <h2 className="font-bold text-2xl">{topic.title}</h2>
            <div>{topic.description}</div>
          </div>
          <div className="flex gap-2">
            <Remove />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
