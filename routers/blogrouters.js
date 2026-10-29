const express = require('express');

const router = express.Router();
const blogController = require('../controller/blogController');

router.get("/", blogController.getblog);
router.get("/:id", blogController.getSingleblog);
router.post("/", blogController.createBlog);
router.delete("/:id", blogController.deleteBlog);
router.patch("/:id", blogController.updateBlog)
module.exports = router;