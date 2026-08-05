// Load the express library
const express = require("express");

const cors = require("cors");

// ----------- MOCK DB --------------------------- START
const adminCreds = {
  username: "admin",
  password: "123456s*",
};

// This array temporarily acts like your database.
// Keep in mind because this is an in memory array. Everything disappears when the server restarts.
const movements = [];
const MovementModel = (
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
) => ({
  _id: movements.length + 1,
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
  movementExtraNotes: movementExtraNotes || "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

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
app.use(cors());

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
app.post("/movements", function (req, res) {
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

  // fake create movement in database
  // creating the movement object
  const newMovement = MovementModel(
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
  );
  // adding it to the array of movements
  movements.push(newMovement);

  console.log("doing the request in the backend/movements endpoint");

  // http status codes (ex: 201, 200)
  res.status(201).json({
    message: "movement created successfully",
    data: newMovement,
  });
});

// returns all climbing movements
app.get("/movements", function (req, res) {
  res.status(200).json({
    message: "movements fetched successfully",
    data: movements,
    total: movements.length,
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

// const submitMovment = () => {
//   const movementData = {
//     movementName: document.getElementById("name").value,
//     movementSummary: document.getElementById("summary").value,
//     movementDescription: document.getElementById("description").value,
//     movementExecution: document.getElementById("execution").value,
//     movementDemand: document.getElementById("demand").value,
//     movementTerrain: document.getElementById("terrain").value,
//     movementStatus: document.getElementById("status").value,
//     movementWhenToUse: document.getElementById("when-to-use").value,
//     movmentHowToPerform: document.getElementById("how-to-perform").value,
//     movmentCommonMistakes: document.getElementById("common-mistakes").value,
//     movmentTags: document.getElementById("tags").value,
//     movementResearchNotes: document.getElementById("research-notes").value,
//     movementExtraNotes: document.getElementById("extra-notes").value
//   }

//   const exerciseData = {
//    exerciseName: document.getElementById("name").value,
//    exerciseSummary: document.getElementById("summary").value,
//    exerciseDescription: document.getElementById("description").value,
//    exerciseDifficulty: document.getElementById("difficulty").value,
//    exerciseStatus: document.getElementById("status").value,
//    exerciseWhenToUse: document.getElementById("when-to-use").value,
//    exerciseHowToPerform: document.getElementById("how-to-perform").value,
//    exerciseCommonMistakes: document.getElementById("common-mistakes").value,
//    exerciseTags: document.getElementById("tags").value,
//    exerciseResearchNotes: document.getElementById("research-notes").value,
//    exerciseExtraNotes: document.getElementById("extra-notes").value,
//   };
//   return (

//   )
// }å

// 3. module.exports = app;
// app.listen(8787, function () {
//   console.log("Server is running on port 8787");
// });
module.exports = app;
