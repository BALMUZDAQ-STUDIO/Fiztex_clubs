const express = require("express");
const path = require("path");
const config = require("./config.json");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res, err) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/clubs", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "clubs.html"));
});

app.listen(config.PORT, () =>
    console.log(`Server started on port ${config.PORT}`)
);
