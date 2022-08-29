async function DPI(){
    let a=await DPI();
    console.log(a);
}
let u,n;
n=prompt('No. of patients:');
for(var i=0;i<n;i++){
    const names=[];
    u=prompt('Patient Name:');
    names.push(u);
    let random=Math.floor(Math.random()*10000);
    let p=new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log(`Patient Name: ${names}, Time spent: `+random+' ms.')},random)
        });
}