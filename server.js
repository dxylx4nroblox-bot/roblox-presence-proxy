import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Your Roblox API Key is stored as an environment variable on Render
const API_KEY = process.env.ROBLOX_API_KEY;

// Proxy route
app.post("/presence", async (req, res) => {
  try {
    const response = await fetch("https://presence.roblox.com/v1/presence/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify({ userIds: req.body.userIds })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// Health check
app.get("/", (req, res) => {
  res.send("Roblox Presence Proxy is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
