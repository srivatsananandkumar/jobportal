import express from 'express';
import { intern } from '../models/intern.js';

export const router1 = express.Router();

router1.get("/",async(req,res)=>{
    try {
        const data = await intern.find();
        res.status(200).json(data);
      } catch (error) {
        res.status(400).send(error);
      }
});

router1.get("/:id",async(req,res)=>{
    try {
        const data = await intern.findById(req.params.id);
        res.status(200).json(data);
      } catch (error) {
        res.status(400).send(error);
      }
    
});

router1.post("/",async(req,res)=>{
    try {
        const new_data = await new intern(req.body);
        new_data.save();
        res.status(201).json(new_data);
      } catch (error) {
        res.status(400).send(error);
      }
});

router1.put("/:id",async(req,res)=>{
    try {
        const data = await intern.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json(data);
      } catch (error) {
        res.status(400).send(error);
      }
});

router1.delete("/:id",async(req,res)=>{
    try {
        const data = await intern.findByIdAndDelete(req.params.id);
        res.status(200).json("id deleted");
      } catch (error) {
        res.status(400).send(error);
      }
});

