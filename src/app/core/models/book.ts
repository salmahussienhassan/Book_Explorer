export interface BaseBook{
    title:string, 
    author:string, 
    price:number, 
    category?:string,
    description?:string
}
export interface Book extends BaseBook {
    _id: string;
  }
  
  export interface NewBook extends BaseBook {}