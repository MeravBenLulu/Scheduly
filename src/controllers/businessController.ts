import { Request, Response } from 'express';

// import mongoose from 'mongoose';
// import Bussines from '../models/bussines';


export default {
  get: async (req:Request, res:Response):Promise<void> => {
    res.status(200).send( "hello from get bussines" )
  },

  getByEmail: async (req:Request, res:Response):Promise<void> => {
    res.status(200).send("hello from get bussines by email");
  },

  post: async (req:Request, res:Response):Promise<void> => {
      const { name }:{name?:string }= req.body;
      if (!name) {
        res.status(404);
        res.send("יש לשלוח נתונים תואמים");
        return;
      }
        res.status(200).send(name);  
  },

  put: async (req:Request, res:Response):Promise<void> => {
   res.send('update successful'); 
  },

  delete: async (req:Request, res:Response):Promise<void> => {
   res.send('delete successful'); 
  }
}