import { Response } from "express";

const handleHttp = (res: Response, error: unknown) => {
  res.status(500).send(error);
};

export { handleHttp };