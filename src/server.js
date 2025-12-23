const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const app = express();

console.log(process.env);

// === Middleware ===
app.use(cors());
app.use(express.json()); // Handles JSON bodies

// === Serve static files ===
app.use(express.static(path.join(__dirname, "public")));

// === Mongoose model ===
const JobApplication = require("./models/users");

// === MongoDB Connection ===
mongoose.connect("mongodb://localhost:27017/Forms", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// === POST route to handle form submissions ===
app.post("/submit", async (req, res) => {
  try {
    const formData = req.body;
    console.log("✅ Received form data:", formData);

    // Optional: Basic required fields check
    if (!formData.full_name || !formData.email || !formData.phone) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Calculate 'score' (you can adjust this logic as needed)
    const score = calculateScore(formData); // Custom function to calculate score
    formData.score = score;  // Add calculated score to the form data

    const newApplication = new JobApplication(formData);
    await newApplication.save();

    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("❌ Error saving application:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/applications", async (req, res) => {
    try {
      const applications = await JobApplication.find().sort({ score: -1 });
      res.status(200).json(applications);
    } catch (err) {
      console.error("❌ Error fetching applications:", err.message);
      res.status(500).json({ message: "Internal server error." });
    }
  });

// Example function to calculate score based on form data (adjust logic as needed)
function calculateScore(formData) {
  let score = 0;

  // Example scoring logic:
  if (formData.degree === "Ph.D."){ score += 50;}
  else if (formData.degree === "Postgraduate"){ score += 30;}
  else if (formData.degree === "Undergraduate"){ score += 20;}
  else if (formData.degree === "Other"){ score += 10;}

  if(formData.major === "Data Scientist" ||formData.major === "Data Engineer" ){ score += 100;}
  else if (formData.major === "AI/ML" ||formData.major === "Software Engineer" ){ score += 60;}
  else if (formData.major === "Cyber Security" || formData.degree === "Web Development"){ score += 25;}
  else if(formData.degree === "Other"){score += 10;} 
  
  if (formData.gpa && formData.gpa >= 9) score += 5;
  else if (formData.gpa && formData.gpa >= 8) score += 3;

  if (formData.duration && formData.duration >= 20) score += 100;
 else if (formData.duration && formData.duration >= 15) score += 50;
 else if (formData.duration && formData.duration >= 10) score += 35;
 else if (formData.duration && formData.duration >= 5) score += 25;
 else if (formData.duration && formData.duration >= 3) score += 10;

 if (formData.programming_languages === "JavaScript"){ score += 50;}
 else if (formData.programming_languages === "Python"){ score += 40;}
 else if (formData.programming_languages === "Java"){ score += 30;}
 else if (formData.programming_languages === "C++"){ score += 20;}
 else if (formData.programming_languages === "Other"){ score += 10;}

 if (formData.frameworks === "React"){ score += 50;}
 else if (formData.frameworks === "Node.js"){ score += 40;}
 else if (formData.frameworks === "Django"){ score += 30;}
 else if (formData.frameworks === "Spring"){ score += 20;}
 else if (formData.frameworks === "Other"){ score += 10;}

 if (formData.tools === "Git"){ score += 50;}
 else if (formData.tools === "Docker"){ score += 40;}
 else if (formData.tools === "AWS"){ score += 30;}
 else if (formData.tools === "Kubernetes"){ score += 20;}
 else if (formData.tools === "Other"){ score += 10;}

 if (formData.databases === "MySQL"){ score += 50;}
 else if (formData.databases === "MongoDB"){ score += 40;}
 else if (formData.databases === "PostgreSQL"){ score += 30;}
 else if (formData.databases === "Redis"){ score += 20;}
 else if (formData.databases === "Other"){ score += 10;}
  // Add more logic as needed based on form fields
  
  return score;
}

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
