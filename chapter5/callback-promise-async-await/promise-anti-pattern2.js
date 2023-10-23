function myWork(work){
    return new Promise((resolve, reject) => {
        resolve(work.toUpperCase())
    })
}

function playGame(work){
    return new Promise((resolve, reject) => {
        if (work === 'DONE'){
            resolve('GO PLAY GAME');
        } else {
            reject(new Error("DON'T"));
        }
    })
}

// Use overlap the promise
myWork('done')
    .then(function (result){
        playGame(result).then(function (val){
            console.log(val);
        });
    })

// Pass the result to then
myWork('done')
.then(playGame)
.then(console.log)