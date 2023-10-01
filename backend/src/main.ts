import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const todos = [
  {
    id: uuidv4(),
    text: "Study Clean Architecture",
    isCompleted: false,
  },
];

app.use(cors());

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.listen(3000);
