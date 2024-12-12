import express from "express";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

const port = 3001;
const url = `mongodb+srv://mayanktamrkar2001:mt9589274762@cluster0.4uei7no.mongodb.net/`;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
connectDB()

async function connectToMongoDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();

    console.log('Connected to MongoDB');
    const db = client.db('sample_restaurants');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}


connectToMongoDB();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  res.send({ data: 100 });
});

// get data from collection
app.get('/data', async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = await db.collection('restaurants');
    const data = await collection.findOne({ _id: new ObjectId('5eb3d668b31de5d588f4294e') }); // Adjust query for your data
    res.send(data);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
