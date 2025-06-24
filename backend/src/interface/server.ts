import express from "express";
import cors from "cors";
import morgan from "morgan";
import equipmentRoutes from "./routes/equipmentRoutes";
import equipmentTypeRoutes from "./routes/equipmentTypeRoutes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", equipmentRoutes);
app.use("/api", equipmentTypeRoutes)

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});