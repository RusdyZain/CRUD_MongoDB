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

  switch (req.method) {
    case "PUT":
      console.log("Received id:", req.query);
      try {
        const { id } = req.query;
        const { newTitle: title, newDescription: description } = req.body;

        const updateTopic = await Topic.findByIdAndUpdate(id, {
          title,
          description,
        });
        if (!updateTopic) {
          res.status(404).json({ message: "Topic Not Found" });
        }
        res.status(200).json({ updateTopic });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating topic" });
      }
    case "GET":
      console.log("Received id:", req.query);
      const { id } = req.query;
      const topic = await Topic.find({ _id: id });
      res.status(200).json({ topic });
  }
}
