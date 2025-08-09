const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const dotenv = require("dotenv");

dotenv.config();

const zod = require("zod");
const app = express();

app.use(cors());
app.use("/api/v1", router);
app.use((req, res) => {
  res.send("Server Live");
});
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
