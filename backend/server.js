const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json());

app.use("/api/users", require("./api/users"));
app.use("/api/recordings", require("./api/recordings"));
app.use("/api/library", require("./api/libraries"));
app.use("/api/activity", require("./api/activities"));
app.use("/api/categories", require("./api/categories"));


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`)); 
 