let i,names=[],n,u;
n=Number(prompt('No. of patients:'));
for(i=0;i<n;i++){
    u=prompt('Patient Name:');
    names.push(u);
}
for(i=0;i<n;i++){
    var p=new Promise((res,rej)=>{
        let random=Math.floor(Math.random()*5000);
        setTimeout(()=>{
            res(`Patient Name: ${names[i]}, Time spent: `+random+'ms\n')
            },random)
        })
    async function DPI(){
        let a=await p;
        console.log(a);
    }
    await DPI();
}