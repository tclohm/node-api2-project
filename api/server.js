const express = require("express");
const cors = require("cors");
const postsRouter = require("../posts/postsRouter");

const server = express();

server.get("/", (request, response) => {
	response.send(`<h2>Posts API</h2>
				   <p>Welcome to the API</p>`);
});

server.use(cors({
	origin: "http://localhost:3000"
}));
server.use("/api/posts", postsRouter)


module.exports = server;