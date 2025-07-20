require("dotenv").config();

const cors     = require("cors");
const express  = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let screenshotRoutes = require("./routes/screenshot");

app.use('/',screenshotRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
