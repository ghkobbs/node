
//const p = Promise.resolve({id: 1});

/* const p = Promise.reject(new Error('The reason for rejection'));

p.catch(error => console.log(error)); */

//Running Parallel Promises
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1....');
        resolve(1);
    }, 2000);
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2....');
        resolve(2);
    }, 2000);
})

//Promise.all([p1,p2]) // Get final results of all promises
Promise.race([p1,p2])// Get result after one is resolved.
    .then(result => console.log('Result', result));

