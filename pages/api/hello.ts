import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromContext } from '../../utility/serverUser';

export  const createContext = async(req: NextApiRequest, res: NextApiResponse) => {
  // const user = await getUserFromContext(ctx);

  // do anything you want with it
};
