//dependencies
const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

//get route for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes:['username'],
                },
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route for login page
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route for signup page
router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route for comments & commenting form for a single post - finds the clicked post by pk and then includes the associated comments (and the comments' associated user data) and the user data for the user who owns the post
router.get('/postComments/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'content',
                        'date_created',
                        'user_id',
                    ],
                    include: [{
                        model: User,
                        attributes: [
                            'username'
                        ]
                    }]
                },
                {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            ]
        });
        const post = postData.get({ plain: true });
        res.render('postComments', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route for dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route for new post form
router.get('/newPost', async (req, res) => {
    try {
        res.render('newPost');
    } catch (err) {
        res.status(500).json(err);
    }
});

//get route for update post form
router.get('/updateBlogPost', async (req, res) => {
    try {
        res.render('updateBlogPost');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;