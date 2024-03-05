import React from "react";
import Remove from "@/components/button/Remove";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export default function TopicsList() {
  return (
    <>
      <div className="p-4 border border-state-300 my-3 flex justify-between gap-5 items-center">
        <div>
          <h2 className="font-bold text-2xl">Topic Title</h2>
          <div>Topic Description</div>
        </div>
        <div className="flex gap-2">
          <Remove />
          <Link href="/editTopic/id">
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </>
  );
}
