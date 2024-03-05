import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
        <Link href="/" className="text-white font-bold">
          ZainCoding.
        </Link>
        <Link href="/addTopic" className="bg-white p-2">
          Add Topic
        </Link>
      </nav>
    </div>
  );
}
