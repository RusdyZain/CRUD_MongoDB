import ConnectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  topics?: {
    id: string;
    title: string;
    description: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ConnectMongoDB();

  switch (req.method) {
    case "POST":
      try {
        const { title, description } = await req.body;

        const createdTopic = await Topic.create({ title, description });
        res
          .status(201)
          .json({ message: "Topic created successfully", topic: createdTopic });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating topic" });
      }
      break;
    case "GET":
      try {
        const topics = await Topic.find();
        res.status(200).json({ message: "Get topics successfully", topics });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting topics" });
      }
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        await Topic.findByIdAndDelete(id);
        res.status(200).json({ message: "Topic deleted successfully", id });
      } catch (error) {
        res.status(500).json({ message: "Error deleting topic" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
