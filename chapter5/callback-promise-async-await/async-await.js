// async function myName(){
//     return "Andy";
// }

// async function showName(){
//     const name = await myName();
//     console.log(name);
// }

// console.log(showName());

function waitOneSecond(msg){
    return new Promise((resolve, _) => {
        setTimeout(() => resolve(`${msg}`), 1000);
    });
}

async function countOneToTen(){
    for (let x of [...Array(10).keys()]){
        let result = await waitOneSecond(`Count ${x + 1} second(s) ...`);
        console.log(result);
    }
    console.log("Done.");
}

countOneToTen();