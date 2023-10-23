function myWork(work){
    return new Promise((resolve, reject) => {
        if (work === 'done'){
            resolve('Continue');
        } else {
            reject(new Error("Game Over"));
        }
    })
}

myWork('done').then(function (value) { console.log(value) }, function (err){
    console.error(err) });

myWork('doing')
    .then(function (value) { console.log(value) })
    .catch(function (err) { console.error(err) });
