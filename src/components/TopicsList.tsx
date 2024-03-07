import React, { useEffect, useState } from "react";
import Remove from "@/components/button/Remove";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/topics";

interface Topic {
  _id: string;
  title: string;
  description: string;
}

export default function TopicsList() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <>
      {topics.length === 0 && <p>Loading topics...</p>}
      {topics.length > 0 && (
        <>
          {topics.map((topic) => (
            <div
              key={topic._id}
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
      )}
    </>
  );
}
