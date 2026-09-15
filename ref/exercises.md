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
  exerciseExtraNotes: exerciseExtraNotes || "",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

// ----------- MOCK DB---------------------------- END

ENDPOINTS

app.post("/exercises", function (req: Request, res: Response) {
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

app.get("/exercises", function (req: Request, res: Response) {
  res.status(200).json({
    message: "exercises fetched successfully",
    data: exercises,
    total: exercises.length,
  });
});