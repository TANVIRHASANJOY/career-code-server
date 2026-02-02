const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gdayzte.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// কালেকশনগুলো গ্লোবাল লেভেলে ডিক্লেয়ার করুন
let jobsCollection;
let jobApplicationCollection;

async function connectDB() {
    try {
        // Vercel এ সরাসরি কানেক্ট করার দরকার নেই, কুয়েরি করার সময় অটো কানেক্ট হবে
        const db = client.db("careerCode");
        jobsCollection = db.collection('jobs');
        jobApplicationCollection = db.collection('job_applications');
        console.log("MongoDB Collections Initialized!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
connectDB();

// --- API ROUTES (run ফাংশনের বাইরে থাকতে হবে) ---

app.get('/', (req, res) => {
    res.send("Career Code server is cooking and ready!");
});

// Get all jobs
app.get('/jobs', async (req, res) => {
    try {
        const result = await jobsCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Get single job by ID
app.get('/jobs/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await jobsCollection.findOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Invalid Job ID" });
    }
});

// Get applications by email
app.get('/job-applications', async (req, res) => {
    try {
        const email = req.query.email;
        let query = {};
        if (email) {
            query = { applicant_email: email };
        }
        const result = await jobApplicationCollection.find(query).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Error fetching applications" });
    }
});

// Post an application
app.post('/job-applications', async (req, res) => {
    try {
        const application = req.body;
        const result = await jobApplicationCollection.insertOne(application);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to post application" });
    }
});

// Delete an application
app.delete('/job-applications/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await jobApplicationCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Failed to delete" });
    }
});

// Vercel এর জন্য এক্সপোর্ট
module.exports = app;

// লোকাল পিসিতে চালানোর জন্য
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}