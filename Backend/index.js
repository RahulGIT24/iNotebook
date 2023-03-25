const connectToMongo = require("./db"); // Importing database file to connect
const express = require("express"); // Importing express
var cors = require("cors");

connectToMongo(); // Connecting to mongo

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Listening to port
app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
