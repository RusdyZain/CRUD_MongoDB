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
  await ConnectMongoDB();

  console.log("Received id:", req.query);

  if (req.method === "PUT") {
    try {
      if (req.query !== null) {
        const { id } = req.query;
        const { newTitle: title, newDescription: description } = req.body;

        const result = await Topic.findByIdAndUpdate(id, {
          title,
          description,
        });
        res.status(200).json({ message: "Topic updated successfully" });
      } else {
        res.status(404).json({ message: "Not Found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating topic" });
    }
  } else {
    res.status(500).json({ message: "Cannot updating topic" });
  }
}
