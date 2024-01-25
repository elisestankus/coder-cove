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

//put route to update blog post by id
router.put('/:id', async (req, res) => {
    try {
        const postData = await BlogPost.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete route to delete blog post by id
router.delete('/:id', async (req, res) => {
    try {
       const postData = await BlogPost.destroy({
        where: {
            id: req.params.id,
        },
       });
       if (!postData) {
        res.status(404).json({message: 'No post found with this id!'});
        return;
       } 
       res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;