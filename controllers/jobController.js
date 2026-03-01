import Job from "../models/Job.js";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single job by job_id
export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findOne({ job_id: req.params.job_id });

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    // Generate job_id automatically
    const lastJob = await Job.findOne().sort({ createdAt: -1 });
    let newId = "JOB-001";

    if (lastJob && lastJob.job_id) {
      const lastNumber = parseInt(lastJob.job_id.split("-")[1]);
      const nextNumber = lastNumber + 1;
      newId = `JOB-${nextNumber.toString().padStart(3, "0")}`;
    }

    const newJob = new Job({ ...req.body, job_id: newId });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};