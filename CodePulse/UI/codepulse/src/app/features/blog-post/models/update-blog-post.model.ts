import { Category } from "../../caregory/models/category.model";

export interface UpdateBlogPost {
    
    title:string;
    shortDescription:string;
    content:string;
    featuredImageUrl:string;
    urlHandle:string;
    publishedDate: Date;
    author:string;
    isVisible:boolean;
    categories: string[];
}