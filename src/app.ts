import { Request, Response } from "express";

// Load the express library
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const Admin = require("./models/admin.model");
const movementRouter = require("./routes/movement.routes");

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://climbing-movement-project-front.vercel.app/",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);
app.use("/static", express.static(path.join(__dirname, "public")));

// routes
app.use("/movements", movementRouter);

app.get("/ping", function (req: Request, res: Response) {
  console.log("req =", req.ip);
  res.send({
    data: [
      {
        name: "test",
        difficulty: 1,
        description: "testing",
        extraNotes: "test",
      },

      {
        name: "test2",
        difficulty: 1,
        description: "testing",
        extraNotes: "test",
      },
    ],
  });
});

app.post("/login", async function (req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;

  const admin = await Admin.findOne({ username: username });

  if (admin === null) {
    return res.status(401).send({
      message: "invalid credentials",
    });
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

  if (passwordMatches === false) {
    return res.status(401).send({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      adminId: admin._id,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.status(200).json({
    token: token,
  });
});

app.get("/", (req: Request, res: Response) => res.send("Server working"));

module.exports = app;
