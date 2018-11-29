
//Create a promise
const p = new Promise((resolve, reject) => {
    //Kick off async work
    //...
    setTimeout(() => {
        //resolve(1);
        reject(new Error('message'));
    }, 2000);

});

// Consume promise
p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));