const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercise', {useNewUrlParser: true});


const courseSchema = new mongoose.Schema({
    _id: Object,
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now },
    isPublished: Boolean,
    Price: Number
});

const Course = mongoose.model('Course', courseSchema);

//Retriving courses where isPublished is true and has tags of backend
/* async function getCourses(){
    const course = await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1})
        .select({ name: 1, author: 1 });

    console.log(course);
}
 */
//Retriving courses where isPublished is true and has tags of backend or frontend
/* async function getCourses(){
    const course = await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend']} })
        .sort({ price: -1})
        .select({ name: 1, author: 1, price: 1 });

    console.log(course);
} */

//Retriving courses where isPublshed is true; price is greater than or equal to 15 and contains by in the name
//Sort by price descending; 
// async function getCourses(){
//     const course = await Course
// .find({ isPublished: true })
//     .or([ { price: { $gte: 15 } }, { name: /.*by.*/i } ])
//     .sort({ price: -1})
//     .select({ name: 1, author: 1, price: 1 });

//     console.log(course);
// }

//Updating a course
// async function updateCourseFirst(id) {

//     const course = await Course.findById(id);

//     if(!course) return console.log('error');

//     course.isPublished = true;
//     course.author = 'Another Author';

//     /* course.set({
//         isPublished: true,
//         author: 'Another Author'
//     }) */

//     const result = await course.save();
//     console.log(result);
// }

//Updating a course
// async function updateCourseSecond(id) {

//     const course = await Course.findOneAndUpdate(id, {
//         $set: {
//             author: 'Maxwell Morrison',
//             isPublished: true
//         }
//     }, { new: true });
//     console.log(course);

// }

//Removing Document 
/* async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
} */

createCourse();