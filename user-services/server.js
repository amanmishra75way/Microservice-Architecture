import express from "express";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// middlewears
app.use(express.json());

// API Endpoint
app.get("/", (req, res) => {
  res.send("Api is working");
});
const users = [
  {
    name: "Aman",
    email: "amanmishra.5272@gmail.com",
  },
  {
    name: "Rahul",
    email: "rahul1234@gmail.com",
  },
  {
    name: "Pawan",
    email: "pawansingh@gmail.com",
  },
  {
    name: "Harsh",
    email: "harsh@gmail.com",
  },
];
app.get("/users", (req, res) => {
  res.json({ sucess: true, userData: users });
});
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name && !email) {
    res.json({ sucess: false, message: "name and email are required" });
  }
  const newuser = {
    name: name,
    email: email,
  };
  const response = users.push(newuser);
  res.json({ sucess: true, response: "USER SAVED SUCESSFULLY" });
});

app.listen(port, () => {
  console.log("listning on PORT :" + port);
});
