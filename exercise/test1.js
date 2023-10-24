function a() { return "OK"}

async function b(){
    const result = await a();
    console.log(result);
}
b();