const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "welcome to Contact keeper app" });
});
// define routes

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contact"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`port is listening on ${PORT}`));
