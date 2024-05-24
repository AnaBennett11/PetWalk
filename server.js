require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.GOOGLE_MAPS_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api-key", (req, res) => {
  res.json({ apiKey: apiKey });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
