import { Request, Response } from "express";
import { IController } from "../Abstract/IController";
import { IModel } from "../Abstract/IModel";
import { IService } from "../Abstract/IService";

export class MongooseController implements IController{
    private service: IService<IModel>
    constructor(service:IService<IModel>){
        this.service = service
    }

    public async getAll(req:Request, res:Response){
        const items = [];
        const userId = req.currentUser.id;
        const existingItems = await this.service.find(userId)
        if(existingItems.length){
            items.push(...existingItems)
        }

        res.status(200).json(items);
    }
    public async get(req:Request, res:Response){
        const {id} = req.params;
        const item = await this.service.findOne(id);
        if(item){
            res.status(200).json(item)
        }else{
            res.status(404).json({success:false})
        }
    }

    public async create(req:Request, res:Response){
        const {id} = req.currentUser;
    }
}