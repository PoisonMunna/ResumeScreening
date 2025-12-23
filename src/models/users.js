const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  degree: String,
  major: String,
  university: String,
  grad_year: Number,
  gpa: Number,
  company: String,
  job_title: String,
  duration: Number,
  responsibilities: String,
  programming_languages: String,
  frameworks: String,
  tools: String,
  databases: String,
  score: { type: Number, default: 0 }
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
