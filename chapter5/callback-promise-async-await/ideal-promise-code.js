function goodPromise(val){
    return new Promise((resolve, reject) => {
        resolve(val);
    });
}


goodPromise("Oh")
    .then((val) => {
        return val + " There are";
    })
    .then((val) => {
        return val + " no codes"
    })
    .then((val) => {
        return val + " like this."
    })
    .then((val) => {
        console.log(val);
    })
    .catch((err) => {
        console.log(err);
    })