import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, token } = req.body;
  try {
    const { data: response } = await axios.delete(`${process.env.BACKEND_API_BASEURL}/subscription/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.status(200).json({ data: response });
  } catch (error: any) {
    return res.status(500).json(error?.response?.data);
  }
}
