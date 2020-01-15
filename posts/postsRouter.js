const express = require("express");
const Posts = require("../data/db");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
	Posts.find(req.query)
		 .then(posts => {
		 	res.status(200)
		 	   .json(posts)
		 })
		 .catch(err => {
		 	res.status(500)
		 	   .json({ errorMessage: "Error retrieving the posts" })
		 });
});

router.get("/:id", (req, res) => {
	Posts.findById(req.params.id)
		 .then(post => {
		 	if (post) {
		 		res.status(200)
		 	       .json(post)
		 	} else {
		 		res.status(404)
		 		   .json({ errorMessage: "The post doesn't exist" })
		 	}
		 })
		 .catch(err => {
		 	res.status(500)
		 	   .json({ errorMessage: "The post could not be retrieved" })
		 });
});


router.get("/:id/comments", (req, res) => {
	Posts.findPostComments(req.params.id)
		 .then(comments => {
		 	if (comments) {
		 		res.status(200)
		 		   .json(comments)
		 	} else {
		 		res.status(404)
		 		   .json({ errorMessage: "The post doesn't exist" })
		 	}
		 })
		 .catch(err => {
		 	res.status(500)
		 	   .json({ errorMessage: "The comment could not be retrieved" })
		 });
});

router.post("/", (req, res) => {
	Posts.insert(req.body)
	  	 .then(post => {
	  	if (post) {
	  		res.status(201)
	  	       .json(post)
	  	} else {
	  		res.status(400)
	  		   .json({ errorMessage: "Provide title and contents" })
	  	}
	  })
	  .catch(err => {
	  	res.status(500)
	  	   .json({ errorMessage: "There was an error saving the post to the DB" })
	  })
})

router.post("/:id/comments", (req, res) => {
	const { text } = req.body
	console.log(text)
	if (text) {
		Posts.insertComment(req.body)
			 .then(comment => {
			 	if (comment) {
			 		res.status(201)
			 		   .json(comment)
			 	} else {
			 		res.status(404)
			 		   .json({ errorMessage: "The post with the ID does not exist" })
			 	}
			 })
			 .catch(err => {
			 	res.status(500)
			 	   .json({ errorMessage: "Error posting new comment" })
			 })
	} else {
		res.status(400)
		   .json({ errorMessage: "Please provide text for the comment" })
	}
});

router.put("/:id", (req, res) => {
	const changes = req.body;
	const { title, contents } = req.body;
	if (title, contents) {
		Posts.update(req.params.id, changes)
		     .then(post => {
		     	if (post) {
		     		res.status(200)
		     		   .json(post)
		     	} else {
		     		res.status(404)
		     		   .json({ errorMessage: "The post with the ID does not exist" })
		     	}
		     })
		     .catch(err => {
		     	res.status(500)
		     	   .json({ errorMessage: "The post information could not be modified" })
		     })
	} else {
		res.status(400)
		   .json({ errorMessage: "Please provide title and contetnts for the post" })
	}
})

router.delete("/:id", (req, res) => {
	Posts.remove(req.params.id)
	     .then(num => {
	     	if (num > 0) {
	     		res.status(200)
	     		   .json({ message: "The post has been removed" })
	     	} else {
	     		res.status(404)
	     		   .json({ errorMessage: "The post with ID does not exist" })
	     	}
	     })
	     .catch(err => {
	     	res.status(500)
	     	   .json({ errorMessage: "The post could not be deleted" })
	     })
});

module.exports = router;