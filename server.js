import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running packworkx...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
