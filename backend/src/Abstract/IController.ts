import { Request, Response } from "express";

export interface IController{
    getAll(req:Request, res:Response): Promise<void>;
    get(req:Request, res:Response): Promise<void>;
    create(req:Request, res:Response): Promise<void>;
}