//dependencies
const router = require('express').Router();
const { User } = require('../../models');

//post route to signup a new user & add to db
router.post('/', async (req, res) => {
    try {
        //create new user
        const userData = await User.create(req.body);
        //create new session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});




