const express = require("express");
const app = express();
const PORT = 8080;

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});