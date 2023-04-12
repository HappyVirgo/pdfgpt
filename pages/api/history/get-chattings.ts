import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;
  try {
    const { data } = await axios.get(`${process.env.BACKEND_API_BASEURL}/history/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json({ data });
  } catch (error: any) {
    return res.status(500).json(error?.response?.data);
  }
}
