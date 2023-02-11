import { IModel } from "../Abstract/IModel";
import { IService } from "../Abstract/IService";

export class MongooseService implements IService<IModel>{
    private model:IModel;
    constructor(model:IModel){
        this.model = model
    }
    find(userId: string): IModel[] {
        return this.model.find({user_id:userId});
    }
    findOne(id: string): IModel {
        return this.model.findById(id);
    }
}