import { NextApiResponse,  NextApiRequest} from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.json({ message: 'Hello Welcome'})
}