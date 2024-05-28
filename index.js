import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/app.routes";
import cors from "cors";

const app = express();
const PORT = 3000;

try {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost/RemoveAlistdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

const db = mongoose.connection;
db.once("open", (_) => {
  console.log("Database connected on port 27017");
});

db.on("error", (err) => {
  console.log(`Connection error: ${err}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

routes(app);

app.get("/", (req, res) => {
  res.send(`Node and express server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
