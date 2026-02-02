const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();

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

async function run() {
  try {
    await client.connect();
    
    const db = client.db("careerCode");
    const jobsCollection = db.collection('jobs');
    const jobApplicationCollection = db.collection('job_applications');

    // --- JOBS ---
    app.get('/jobs', async (req, res) => {
      const result = await jobsCollection.find().toArray();
      res.send(result);
    });

    app.get('/jobs/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    // --- JOB APPLICATIONS ---

    // Get applications (Filtered by email)
    app.get('/job-applications', async (req, res) => {
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { applicant_email: email };
      }
      const result = await jobApplicationCollection.find(query).toArray();
      res.send(result);
    });

    // Post application
    app.post('/job-applications', async (req, res) => {
      const application = req.body;
      const result = await jobApplicationCollection.insertOne(application);
      res.send(result);
    });

    // Delete application
    app.delete('/job-applications/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobApplicationCollection.deleteOne(query);
      res.send(result);
    });

    console.log("Connected to MongoDB successfully!");
  } finally { }
}
run().catch(console.dir);

app.get('/', (req, res) => res.send("Career Code server is cooking"));
app.listen(port, () => console.log(`Server running on port: ${port}`));