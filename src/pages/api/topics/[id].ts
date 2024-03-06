import ConnectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import type { NextApiRequest, NextApiResponse } from "next";

type Params = {
  id: string;
};

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
  res: NextApiResponse,
  { params }: NextApiRequest & { params?: Params }
) {
  await ConnectMongoDB();

  if (req.method === "PUT") {
    try {
      if (params?.id) {
        const { id } = params;
        const { newTitle: title, newDescription: description } = req.body;

        await Topic.findByIdAndUpdate(id, { title, description });
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
