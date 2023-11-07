import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

const createPurpose = (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    handleHttp(res, "ERROR_CREATE_PURPOSE");
  }
};

const getPurposes = (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    handleHttp(res, "ERROR_GET_PURPOSES");
  }
};

const getOnePurpose = (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    handleHttp(res, "ERROR_GET_ONE_PURPOSE");
  }
};

const updatePurpose = (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    handleHttp(res, "ERROR_UPDATE_PURPOSE");
  }
};

const deletePurpose = (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    handleHttp(res, "ERROR_DELETE_PURPOSE");
  }
};

export {
  createPurpose,
  getPurposes,
  getOnePurpose,
  updatePurpose,
  deletePurpose
};
