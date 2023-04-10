import { NextApiRequest, NextApiResponse } from "next";

const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await delay(5000);
  res.status(200).json("ok");
};

export default handler;
