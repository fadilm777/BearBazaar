const { WebSocketServer } = require("ws");
const { createServer } = require("node:http");
const express = require('express');
const cors = require('cors');
const Session = require("./models/session");
const { listen } = require('./services/notify');

const port = 3000;

const authRouter = require('./routes/auth');
const listingsRouter = require('./routes/listings');
const chatRouter = require('./routes/chat');
const userRoutes = require("./routes/user");

const app = express();
const wsServer = new WebSocketServer({ noServer: true });
const server = createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/listings', listingsRouter);
app.use('/chat', chatRouter);
app.use("/user", userRoutes);

wsServer.on("connection", (socket) => {
  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    try {
      const session = Session.validateToken(data.token);
      listen(session.userId, (message) => {
        socket.send(JSON.stringify({ message }));
      });
    } catch {
      socket.close(1008, "Invalid token");
    }
  });
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
