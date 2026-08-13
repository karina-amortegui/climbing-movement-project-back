const Movement = require("./models/movement.model.js");

// Load the express library
const express = require("express");

const cors = require("cors");

const User = require("./models/user.model.js");

// ----------- MOCK DB --------------------------- START
const adminCreds = {
  username: "admin",
  password: "123456s*",
};

// ----------- MOCK DB---------------------------- START

const exercises = [];
const ExerciseModel = (
  exerciseName,
  exerciseSummary,
  exerciseDescription,
  exerciseDifficulty,
  exerciseStatus,
  exerciseWhenToUse,
  exerciseHowToPerform,
  exerciseCommonMistakes,
  exerciseTags,
  exerciseResearchNotes,
  exerciseExtraNotes,
) => ({
  _id: exercises.length + 1, //maybe name it exerciseId to be more specific?
  exerciseName,
  exerciseSummary,
  exerciseDescription,
  exerciseDifficulty,
  exerciseStatus,
  exerciseWhenToUse,
  exerciseHowToPerform,
  exerciseCommonMistakes,
  exerciseTags,
  exerciseResearchNotes,
  exerciseExtraNotes: exercisesExtraNotes || "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

// ----------- MOCK DB---------------------------- END

// 1. create instance of express
// creates express application (the app is your server)
// everytime you see app.something you're adding another capability to your server
const app = express();

// middlewares
// If someone asks for HTML, CSS, JS, or images inside the public folder, send them automatically
// why browser can load index.html and Tailwind CSS w/o writing a route for each
app.use(express.static("public"));
// Express automatically converts JSON into a JS object
// Allows you to write req.body.name instead of raw text
app.use(express.json());
app.use(cors({
  // Put your deployed Vite frontend URL here. 
  // You can also use process.env.FRONTEND_URL to avoid hardcoding it!
  origin: ['https://climbing-movement-project-front.vercel.app/', 'http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// 2. add ping endpoint
//GET -> give me some information
app.get("/ping", function (req, res) {
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

// POST -> create something (save)
app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username !== adminCreds.username || password !== adminCreds.password) {
    return res.status(401).send({
      message: "invalid credentials",
    });
  }

  res.redirect("/home.html");
});

// creates a climbing movement
app.post("/movements", async function (req, res) {
  console.log("POST /movements body =", req.body);
  const {
    movementName,
    movementSummary,
    movementDescription,
    movementExecution,
    movementDemand,
    movementTerrain,
    movementStatus,
    movementWhenToUse,
    movementHowToPerform,
    movementCommonMistakes,
    movementTags,
    movementResearchNotes,
    movementExtraNotes,
  } = req.body;

  // create movement in database
  // creating the movement object
  const newMovement = new Movement({
    movementName,
    movementSummary,
    movementDescription,
    movementExecution,
    movementDemand,
    movementTerrain,
    movementStatus,
    movementWhenToUse,
    movementHowToPerform,
    movementCommonMistakes,
    movementTags,
    movementResearchNotes,
    movementExtraNotes,
});
  // adding movement to MongoDB
  await newMovement.save();

  console.log("doing the request in the backend/movements endpoint");

  // http status codes (ex: 201, 200)
  res.status(201).json({
    message: "movement created successfully",
    data: newMovement,
  });
});

// returns all climbing movements
app.get("/movements", async function (req, res) {
  // for GET route to store DB results in movementsFromDB
  const movementsFromDB = await Movement.find();
  res.status(200).json({
    message: "movements fetched successfully",
    data: movementsFromDB,
    total: movementsFromDB.length,
  });
});

app.post("/exercises", function (req, res) {
  const {
    exerciseName,
    exerciseSummary,
    exerciseDescription,
    exerciseDifficulty,
    exerciseStatus,
    exerciseWhenToUse,
    exerciseHowToPerform,
    exerciseCommonMistakes,
    exerciseTags,
    exerciseResearchNotes,
    exerciseExtraNotes,
  } = req.body;

  const newExercise = ExerciseModel(
    exerciseName,
    exerciseSummary,
    exerciseDescription,
    exerciseDifficulty,
    exerciseStatus,
    exerciseWhenToUse,
    exerciseHowToPerform,
    exerciseCommonMistakes,
    exerciseTags,
    exerciseResearchNotes,
    exerciseExtraNotes,
  );
  exercises.push(newExercise);

  res.status(201).json({
    message: "exercise created successfully",
    data: newExercise,
  });
});

app.get("/exercises", function (req, res) {
  res.status(200).json({
    message: "exercises fetched successfully",
    data: exercises,
    total: exercises.length,
  });
});

app.get("/", (req, res) => res.send("Server working"));

// 3. module.exports = app;
// app.listen(8787, function () {
//   console.log("Server is running on port 8787");
// });

// ------- move to users.controller.js --------------
app.post("/users", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  const savedUser = await newUser.save();
  res.status(201).json({
    message: "Creation successful",
    data: savedUser,
  });
});

app.get("/users", async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    message: "List successful",
    data: users,
    total: users.length,
  });
});

module.exports = app;
