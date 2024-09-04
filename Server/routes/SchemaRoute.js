import express from 'express';
import { job } from '../models/job.js';

export const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const data = await job.find();
        res.status(200).json(data);
      } catch (error) {
        res.status(400).send(error);
      }
});

router.get("/:id",async(req,res)=>{
    try {
        const data = await job.findById(req.params.id);
        res.status(200).json(data);
      } catch (error) {
        res.status(400).send(error);
      }
    
});

router.post("/",async(req,res)=>{
    try {
        const new_data = await new job(req.body);
        new_data.save();
        res.status(201).json(new_data);
      } catch (error) {
        res.status(400).send(error);
      }
});

router.put("/:id",async(req,res)=>{
    try {
        const data = await job.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.status(200).json(data);
      } catch (error) {
        res.status(400).send(error);
      }
});

router.delete("/:id",async(req,res)=>{
    try {
        const data = await job.findByIdAndDelete(req.params.id);
        res.status(200).json("id deleted");
      } catch (error) {
        res.status(400).send(error);
      }
});

