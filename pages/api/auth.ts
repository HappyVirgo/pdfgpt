import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type RespinseDateType = {
  data: {
    tokens: {
      access_token: string;
      expires_in: number;
    };
    data: {
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
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RespinseDateType>) {
  const { tokens } = req.body;
  const { data } = await axios.post(`${process.env.BACKEND_API_BASEURL}/auth/login`, { tokens });
  res.status(200).json({ data });
}