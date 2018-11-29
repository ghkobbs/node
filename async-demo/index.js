console.log("Before");

// Callback Hell
/* getUser(1, (user) => {    
    console.log('User', user);
    getRepositories(user.gitHubUsername, (repos) => {
        console.log('Repos', repos);
        getCommits(repo, (commits) => {

        })
    })
}); */
//Promise-based Approach
/* getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message)); */

// Async and Await Approach
async function displayCommits() {
    try{
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err){
        console.log('Error', err.message);
    }
}

displayCommits();

console.log("After");
/* 
// Callback Hell Solution
function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
} */

// Patterns to deal with Asynchronos Code
// Callbacks
// Promises
// Async / Await

//Callback
//function getUser(id, callback){

//Promise
function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from the database');
            resolve({
                id: id,
                gitHubUsername: 'ghkobbs'
            });
        }, 2000);
    })
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github APi........');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    })
}

function getCommits(commits){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting commits........');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    })
}