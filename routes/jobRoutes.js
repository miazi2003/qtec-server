import express from "express";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getSingleJob);
router.post("/", createJob);      
router.delete("/:id", deleteJob); 

export default router;