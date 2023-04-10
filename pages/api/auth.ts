import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseDateType = {
  tokens: {
    accessToken: string;
    refreshToken: string;
    expires_in: number;
  };
  user: {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseDateType>) {
  const { tokens } = req.body;
  try {
    const { data } = await axios.post(`${process.env.BACKEND_API_BASEURL}/auth/login`, { tokens });
    console.log("data: ", data);
    res.status(200).json({ ...data });
  } catch (error: any) {
    return res.status(error?.response?.status).json(error.response.data);
  }
}
