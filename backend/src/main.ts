import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/todos", async (req, res) => {
  const todos = [
    {
      id: Date.now(),
      text: "Study JS",
      isCompleted: false,
    },
  ];

  res.json(todos);
});

app.listen(3000);
