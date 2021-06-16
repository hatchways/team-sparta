const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const Redis = require('ioredis');
const redisClient = new Redis();
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/uploadimg");
const notificationRouter = require("./routes/notification");
const emailRouter = require("./routes/sendEmail");
const randomID = require("./utils/crypto");
const contestRouter = require("./routes/contest");
const submissionRouter = require("./routes/submission");
const messageRouter = require('./routes/message');
const conversationRouter = require('./routes/conversation');

const { json, urlencoded } = express;

const User = require("./models/User");

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    //Finds User with matching sessionID
    const session = await User.findOne({ sessionID });
    //pairs socket with session details
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  //creating new session
  const userName = socket.handshake.auth.loggedInUser;
  if (!userName) {
    return next(new Error("invalid user"));
  }
  let existingUser = await User.findById({ _id: userName.id });
  
  if (existingUser) {
    console.log(existingUser.id);
    const tempSessionID = randomID();
    socket.sessionID = tempSessionID;
    socket.userID = existingUser.id;
    socket.username = userName.username;

    existingUser.sessionID = tempSessionID;

    const updatedUser = await User.findByIdAndUpdate(userName.id, {
      sessionId: tempSessionID,
    }, {new: true});
    console.log("updated user is ", updatedUser);
    next();
  }
});

io.on("connection", (socket) => {
  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });
  console.log(socket.userID);
  console.log(socket.sessionID);
  console.log("connected");

  socket.join(socket.userID);

  const users = [];
  // for (let [id, socket] of io.of("/").sockets) {
  //   users.push({
  //     userID: id,
  //     username: socket.username.username,
  //     userOB: socket.username,
  //   });
  // }
  // socket.emit("users", users);

  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/email", emailRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/upload", uploadRouter);
app.use("/contest", contestRouter);
app.use("/notifications", notificationRouter);
app.use("/submission", submissionRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
