import ConnectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  topic?: {
    id: string;
    title: string;
    description: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, description } = await req.body;

    const createdTopic = await Topic.create({ title, description });
    res
      .status(201)
      .json({ message: "Topic created successfully", topic: createdTopic });
  } else {
    res.status(405).json({ message: "POST not allowed" });
  }
  if (req.method === "GET") {
  } else {
    res.status(405).json({ message: "GET not allowed" });
  }
}
