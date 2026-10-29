const blogs = require('../blogdata/data');

const getblog = (req, res) => {
    try {
        res.status(200).json({
            message: `Blog fetched successfully`,
            data: blogs,
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: `Something went wrong from server side`,
            success: false,
            error: err.message
        })
    }
}

//get single blog
const getSingleblog = (req, res) => {
    try {
        let blogid = req.params.id;
        let blog = blogs.find(ele => ele.id === blogid)
        if (!blog) {
            return res.status(404).json({
                message: `Blog not found`,
                success: false,
            })
        }
        res.status(200).json({
            message: `Single blog fetched successfully`,
            success: true,
            data: blog
        })
    }
    catch (error) {
        res.status(500).json({
            message: `Something went wrong from server side`,
            success: false,
            error: err.message
        })
    }
}

//createBlog
const createBlog = (req, res) => {
    try {
        let body = req.body;
        if (!body.title || !body.content) {
            return res.status(401).json({
                message: `Title and content are not found`,
                success: false
            })
        }
        let blog_obj = {
            title: body.title,
            content: body.content,
            author: body.author | "anonymous",
            category: body.category,
            isPublished: body.isPublished ? true : false,
            id: Date.now().toString()
        }
        blogs.unshift(blog_obj);
        res.status(201).json({
            message: `blog created successfully`,
            success: true,
            data: blog_obj
        })
    }
    catch (error) {
        res.status(500).json({
            message: `Something went wrong from server side`,
            success: false,
            error: err.message
        })
    }
}


//DELETE
const deleteBlog = (req, res) => {
    try {
        let remove_id = req.params.id;
        let getIndex = blogs.findIndex(blog => blog.id === remove_id);
        if (getIndex === -1) {
            return res.status(404).json({
                message: `Blog data is not found`,
                success: false
            })
        }
        let remove_blog = blogs.splice(getIndex, 1);
        res.status(200).json({
            message: `Blog with ${remove_id} is removed successfully`,
            success: true,
            data: remove_blog[0]
        })
    }
    catch (error) {
        res.status(500).json({
            message: `Something went wrong from server side`,
            success: false,
            error: err.message
        })
    }
}

const updateBlog = (req, res) => {
    try {
        let update_id = req.params.id;
        let getIndex = blogs.findIndex(blog => blog.id === update_id);
        if (getIndex === -1) {
            return res.status(404).json({
                message: `Blog data is not found`,
                success: false
            })
        }
        let update_obj = {
            ...blogs[getIndex],
            ...req.body,
            id: update_id
        }
        blogs[getIndex] = update_obj;
        res.status(200).json({
            message: `Blog with ${update_id} is updated successfully`,
            success: true,
            data: update_obj
        })
    }
    catch (error) {
        res.status(500).json({
            message: `Something went wrong from server side`,
            success: false,
            error: err.message
        })
    }
}
module.exports = {
    getblog,
    getSingleblog,
    createBlog,
    deleteBlog,
    updateBlog
}
