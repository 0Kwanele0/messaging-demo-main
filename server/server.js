const express = require("express");
const mongo = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const auth = require("./middleware/auth");
const feedRoutes = require("./routes/Feed");
const userRoute = require("./routes/User");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

(async () => {
  mongo
    .connect(process.env.MONGO_KEY, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((done) => {
      if (done) {
        console.log("Connect to database");
      }
    })
    .catch((error) => {
      console.log(error);
    });
})();

app.all("/api/*", auth);
app.use("/api/data", feedRoutes);
app.use("/api/user", userRoute);
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server is running...");
});
