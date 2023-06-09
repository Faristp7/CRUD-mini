import express from "express";
import { engine } from "express-handlebars";
import "dotenv/config";
import path from "path";
import connectDB from "./config/dbConnect.js";
import UserRouter from "./routes/UserRouter.js";
import AdminRouter from "./routes/AdminRouter.js";
import session from "express-session";

const app = express();
connectDB();
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

const __dirname = path.resolve();

app.use(function (req, res, next) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", UserRouter);
app.use("/admin", AdminRouter);

app.get("/check/", (req, res) => {
  res.send(req.query);
});

app.listen(3000, () => {
  console.log("Server Running on http://localhost:3000/");
});
