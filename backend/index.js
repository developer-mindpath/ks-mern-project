import express from "express";
import mongoose from "mongoose";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

const port = 3001;
const url = `mongodb+srv://mayanktamrkar2001:mt9589274762@cluster0.4uei7no.mongodb.net/`;

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
});
const Book = mongoose.model("Book", bookSchema);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
connectDB();

async function connectToMongoDB() {
  try {
    const client = new MongoClient(url);
    await client.connect();

    console.log("Connected to MongoDB");
    const db = client.db("sample_restaurants");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
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
app.get("/data", async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const collection = await db.collection("restaurants");
    const data = await collection.findOne({
      _id: new ObjectId("5eb3d668b31de5d588f4294e"),
    }); // Adjust query for your data
    res.send(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const books = [
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
  },
];

app.post("/insertData", async (req, res) => {
  console.log("post");

  await connectToMongoDB();

  const newBook = new Book({
    title: "NEw book",
    author: "wertyuio",
    year: 1951,
  });

  const test = await newBook.save();

  // Book.insertMany(books)
  //   .then(() => {
  //     console.log("Books inserted successfully");
  //     mongoose.connection.close(); // Close the connection after insertion
  //   })
  //   .catch((err) => {
  //     console.error("Error inserting books:", err);
  //     mongoose.connection.close(); // Close the connection on error
  //   });

  res.send(test);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
