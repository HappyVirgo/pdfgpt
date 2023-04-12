import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseDateType = {
//   user: {
//     id: string;
//     email: string;
//     google_id: string;
//     name: string;
//     picture: string;
//     current_plan_id: number;
//     subscription_id: number;
//     stripe_customer_id: string;
//     role: string;
//   };
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body.newData);
  try {
    const { data } = await axios.post(`${process.env.BACKEND_API_BASEURL}/subscription/customer`, req.body.newData, {
      headers: {
        Authorization: `Bearer ${req.body.token}`,
      },
    });
    res.status(200).json({ ...data });
  } catch (error: any) {
    return res.status(500).json(error?.response?.data);
  }
}
