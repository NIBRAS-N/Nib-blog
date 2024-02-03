import conf from '../conf/conf';

import { Client,Databases,ID,Storage,Query } from 'appwrite'

export class Service{

    client = new Client();
    databses;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProjectId);  
            
        
        this.databases =  new Databases(this.client);

        this.bucket = new Storage(this.client)

        
        
    }

    async createPost({title,slug,content , featuredImage , status , userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId
                }
            )
        }catch(error){
            console.log("appwrite sevice :: config.js :: createPost :: error" , error)
        }
    }

    async updatePost(slug,{title,content , featuredImage , status }){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
                //documentation e halka vul ache,, ey object ta dewa nay
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(error){
            console.log("appwrite service :: config :: updatePost :: error " , error)
        }
    }


    
    async deletPost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug
            )
            return true;
        }catch(error){
            console.log("appwrite service :: config :: deletePost error " , error)
            return false;
        }
    }



    
    async getPost(slug){
        try{
            
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug
            )


        }catch( error ){
            console.log("appwrite service :: config :: getPost error" , error)

            return false;
        }
    }


    async getPosts(queries = [Query.equal("status","active")]){
        try{

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                queries 
            );


        }catch(error){
            console.log("appwrite service :: config :: getPosts error" , error)
            return false;
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        }catch(error){
            console.log("Appwrite Service :: config :: uploadFile error",error);
            return false;
        }
    }


    async deleteFile(fileId){
        try{    
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        }catch(error){
            console.log("Appwrite Service :: config :: deleteFile error",error);
            return false;
        }
    }

    getFilePreview(fileId){
            
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
            
        
    }


}


const   service = new Service();

export default service;



