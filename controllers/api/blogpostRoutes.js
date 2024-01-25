//dependencies
const router = require('express').Router();
const { BlogPost } = require('../../models');

//post route to create new blog post
router.post('/', async (req, res) => {
    try {
        const postData = await BlogPost.create({
            user_id: req.session.user_id,
            title: req.body.title,
            content: req.body.content,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err)
    }
});

//put route to update blog post


//delete route to delete blog post