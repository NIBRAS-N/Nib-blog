import conf from "../conf/conf";
import {Client , Account , ID } from "appwrite";


export class AuthService{

    client = new Client();
    account;
    
    constructor(){
        
        this.client
            .setEndpoint(conf.appwriteUrl) 
            .setProject(conf.appwriteProjectId);  
            
        this.account = new Account(this.client);
        
    }

    async createAccount({email,password,name}){
        // console.log(email,password,name);
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            
            if(userAccount){
                // direct login koray dibo
                return this.login({email,password});
            }else{
                return userAccount;
            }

        }catch(error){
            console.log("appwrite :: auth :: createAccount :: error ", error)
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);
        }catch(error){
            console.log("appwrite :: auth :: Login :: error ", error)
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            // throw error
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }

        // extra safety         
        return null;
    }

    async logout(){
        try{    
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }


}


const authService  = new AuthService();

export default authService;
