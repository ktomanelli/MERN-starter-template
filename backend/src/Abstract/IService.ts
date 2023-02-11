export interface IService<IModel>{
    find(userId:string): IModel[];
    findOne(id:string): IModel;
}
