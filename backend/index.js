import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

// importing database connection function
import connectDB from "./utils/dbConnectio.js";

// import routers 
import userRoute from "./routes/userRoute.js"
import blogRoute from "./routes/blogRoute.js"
import reactionROute from "./routes/reactionRoute.js"
import commentRoute from "./routes/commentRoute.js"

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5173"];

      if (!origin || origin.includes(allowedOrigins)) {
        return callback(null,true);
      } else {
        return callback(new Error("Not Allowed By Cors"),false);
      }
    },
    methods:["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    credentials : true
  })
);
app.use(express.json());
configDotenv();
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

await connectDB();

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "something went wrong !";
  return res.status(errStatus).json({
    success: "false",
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });
});

// api middleware
app.use("/api/user",userRoute)

// blog middleware
app.use("/api/blog",blogRoute)

// reaction middleware
app.use("/api/reaction",reactionROute)

// comment middleware
app.use("/api/comment",commentRoute)



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
