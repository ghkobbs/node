const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.error('Could not connot to mongodb...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /^adfff/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'networking', 'frontend', 'backend'],
        lowercase: true
        // uppercase: true,
        // trim: true
    },
    author: String,
    //tags: [ String ],
    /* tags: {
        type: Array,
        validate: { //Custom validation with error message
            validator: function(v){
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    }, */
    // Async Validator logic
    tags: {
        type: Array,
        validate: { //Custom validation with error message
            isAsync: true, // Asyn
            validator: function(v, callback){
                setTimeout(() => {
                   const result = v && v.length > 0;
                   callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag'
        }
    },
    date: {type: Date, default: Date.now },
    isPublished: Boolean,
    Price: {
        type: Number,
        required: function(){ return this.isPublished; }, // Only set this field to required when isPublished is true.
        min: 10, // Can also be used to validate dates
        max: 200, // Can also be used to validate dates
        get: v => Math.round(v),
        set: v => Math.round(v) //round the value of price
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Maxwell Morrison',
        tags: ['frontend'],
        isPublished: true,
        Price: 15.8
    });

    try {
        const result = await course.save()
        console.log(result);
    }
    catch(ex){
        //console.log('Error', ex.message);
        for(field in ex.errors){
            console.log(ex.errors[field].message);
        }
    }
}

// async function getCourses() {
//     const courses = await Course
//         //.find({ price: { $gt: 10 } }) //Syntax for comparison operators
//         //.find({ price: { $in: [10, 15, 20] } }) //Syntax for comparison operators to
//         //.find()
//         //.or([ { author: 'Maxwell Morrison' }, { isPublished: true } ])
//         //.and([ { author: 'Maxwell Morrison' }, { isPublished: true } ])

//         //Starts with Maxwell
//         //.find({ author: /^Maxwell/ })

//         //Ends with Morrison Case Sensitive
//         //.find({ author: /Morrison$/ })

//         //Ends with Morrison Case Insensitive
//         //.find({ author: /Morrison$/i })

//         //Contains Maxwell
//         //.find({ author: /.*Maxwell.*/ })

//         //Skip is used to implement pagination
//         //const pageNumber = 2;
//         //const pageSize = 10;
//         //.skip( (pageNumber - 1) * pageSize )
//         //limit(pageSize)

//         .find({author: 'Maxwell Morrison', isPublished: true})
//         .limit(10)
//         .sort({ name: 1 })
//         .countDocuments();//Returns number of documents
//         //.select({ name: 1, tags: 1 });
//     console.log(courses);
// }
createCourse();