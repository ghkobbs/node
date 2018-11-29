const express = require('express');
const router = express.Router();
const Joi = require("joi");


const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];


// courses route
router.get('/', (req, res) => {
    res.send(courses);
})

// Retrieve single course route
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('The course with the given ID was not found.');

    res.send(course);
})

//Add new course route
router.post('/', (req, res) => {
    const {
        error
    } = validateCourse(req.body); //Object destructuring

    // If invalid, return 404 - Bad request
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
})

//Update a course
router.put('/:id', (req, res) => {
    //Lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    //if not exisitng, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    //Validate
    //const result = validateCourse(req.body);

    const {
        error
    } = validateCourse(req.body); //Object destructuring

    // If invalid, return 404 - Bad request
    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    course.name = req.body.name;

    // Return the update the course.
    res.send(course);
})

//Delete a course
router.delete('/:id', (req, res) => {
    //Lookup the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    //if not exisitng, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    //find index of course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);

}

/* //Get parameters 
router.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
})

//Get Query string parameters 
router.get('/api/posts/:year', (req, res) => {
    res.send(req.query);
}) */

module.exports = router;