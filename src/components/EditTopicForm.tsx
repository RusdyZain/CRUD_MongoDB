import Layout from "@/pages/layout/Layout";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function EditTopicForm({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
  }, [title, description]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(data);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Title"
        />
        <input
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Description"
        />

        <button
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
          type="submit"
        >
          Edit Topic
        </button>
      </form>
    </Layout>
  );
}
