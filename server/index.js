require("dotenv").config();

const cors     = require("cors");
const express  = require("express");
const path     = require("path");
const app      = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API routes
let screenshotRoutes = require("./routes/screenshot");
app.use('/api', screenshotRoutes);

app.get('/api/health',(req,res) => {
  return res.status(200).json({
    status: true,
    message:"Working fine babe!"
  });
})

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to React for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server port
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
