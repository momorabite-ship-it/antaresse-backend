const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/songs", require("./routes/songs"));

app.listen(PORT, () => {
  console.log(`ANTARESSE backend is running on port ${PORT}`);
});

