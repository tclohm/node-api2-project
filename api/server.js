const express = require("express");
const postsRouter = require("../posts/postsRouter");

const server = express();

server.get("/", (request, response) => {
	response.send(`<h2>Posts API</h2>
				   <p>Welcome to the API</p>`);
});

server.use("/api/posts", postsRouter)

module.exports = server;