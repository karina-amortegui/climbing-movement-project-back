const app = require("./app.js");
const dbConnect = require("./config/db.connect.js");

const PORT = 8787;

dbConnect()
  .then(() => {
    console.log("starting server after db connection");
    const server = app.listen(PORT, function () {
      console.log("Server is running on PORT:", PORT);
    });

    server.on("SIGINT", () => {
      console.log("SIGINT received. Closing server...");
      server.close(() => {
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
