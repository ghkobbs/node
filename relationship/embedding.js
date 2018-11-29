const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true } )
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  /* author: {
    type: authorSchema,
    required: true
  } */
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
  //const course = await Course.findById(courseId);
  const course = await Course.updateOne({ _id: courseId }, {
    /* $set: {
      'author.name': 'John Smith'
    } */
    $unset: {
      'author': '' //Remove entire author subdocument
    }
  });
  // course.author.name = 'Maxwell Morrison';
  // await course.save();
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author)
  await course.save();
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  await course.save();
}

/* createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'Maxwell' }),
]); */
// updateAuthor('5ba3e63cdaa97661a4a54f1d');

// addAuthor('5ba3eb0fd35b6a70589a0577', new Author({ name: 'Amy' }))
removeAuthor('5ba3eb0fd35b6a70589a0577', '5ba3ec21a4e1227bf43a7c96')