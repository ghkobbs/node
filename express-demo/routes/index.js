const express = require('express');
const router = express.Router();


// Index route
router.get('/', (req, res) => {
    res.render('index', {"title":"My Express App", "message":"All Courses"});    
})

module.exports = router;