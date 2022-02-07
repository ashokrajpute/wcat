//wcat
const fs=require('fs');
const path=require('path');

//input
let inparr=process.argv.slice(2);

if(inparr[0]!='wcat'){
    console.log(' No such command');
    
}
else if(inparr.length==1){console.log(' Please enter somecommand or file ');}
else{
    
var ar=['n'];
let n =false,b=false,s=false;let nf=0;let trfile=false;
for(let i=1;i<inparr.length;i++)
{if(inparr[i]=='-n'){n=true;}
else if(inparr[i]=='-b'){b=true;}
else if(inparr[i]=='-s'){s=true;}
else if(inparr[i]=='>'){trfile=true;}
else{ 
    ar[nf]=inparr[i];
    nf++; 
}
}
if(n==true&&b==true)
{
  console.log(' Both b and n command cannot be executed together!SORRY ')  
}
else if(nf==0){'Please enter a file to execute the command '}
else{
if(trfile==true){
    console.log('==tf=  '+ nf);
    tr_file(ar,nf,n,b,s);
}
else if(s==true){ console.log('==s==  '+ nf);print_console_s(ar,nf,n,b);}
else if(b==true){console.log('==b=='); print_console_b(ar,nf);}
else if(n==true){ console.log('==n==');print_console_n(ar,nf);}
else{console.log('==simple==');
    print_console(ar,nf);
}
}



}
function print_console(arr,ct)
{
for(let i=0;i<ct;i++) 
{let isfile=fs.lstatSync(arr[i]).isFile();
if(isfile==false){console.log('================NOT A FILE===========');break;}
let filedata=fs.readFileSync(arr[i]);
console.log(""+filedata)
}
}



function print_console_b(arr,ct)
{
let cnt=1;
   for(let i=0;i<ct;i++){
    let isfile=fs.lstatSync(arr[i]).isFile();
    if(isfile==false){console.log('================NOT A FILE===========');break;}
  let g= fs.readFileSync(arr[i], 'utf-8').split('\n');
  for(let j=0;j<g.length;j++)
  {if(g[j].length>1){console.log(cnt+" "+g[j]);cnt++;}
  else{ console.log(g[j])}
   }
}




}
function print_console_n(arr,ct)
{
let cnt=1;
   for(let i=0;i<ct;i++){
    let isfile=fs.lstatSync(arr[i]).isFile();
    if(isfile==false){console.log('================NOT A FILE===========');break;}
  let g= fs.readFileSync(arr[i],'utf-8').split('\n');
  for(let j=0;j<g.length;j++)
  {console.log(cnt+"  "+g[j]);cnt++;
   }
}
}

function print_console_s(arr,ct,n,b)
{if(n==true){
    let cnt=1;
 for(let i=0;i<ct;i++){let bo=true;
let isfile=fs.lstatSync(arr[i]).isFile();
if(isfile==false){console.log('================NOT A FILE===========');break;}
let g= fs.readFileSync(arr[i],'utf-8').split('\n');
for(let j=0;j<g.length;j++)
{if(g[j].length>1){console.log(cnt+"  "+g[j]);cnt++;}
 else if(bo==true){console.log(cnt+"  "+g[j]);cnt++;bo=false;}  
}
 }}

else if(b==true){
    let cnt=1;
    for(let i=0;i<ct;i++){let bo=true;
        let isfile=fs.lstatSync(arr[i]).isFile();
        if(isfile==false){console.log('================NOT A FILE===========');break;}
        let g= fs.readFileSync(arr[i],'utf-8').split('\n');
        for(let j=0;j<g.length;j++)
        {if(g[j].length>1){console.log(cnt+"  "+g[j]);cnt++;}
        else if(bo==true){console.log(g[j]);bo=false;}  
  
        }
    }
}
else{
    for(let i=0;i<ct;i++){let bo=true;
        let isfile=fs.lstatSync(arr[i]).isFile();
        if(isfile==false){console.log('================NOT A FILE===========');break;}
        let g= fs.readFileSync(arr[i],'utf-8').split('\n');
        for(let j=0;j<g.length;j++)
        {if(g[j].length>1){console.log("  "+g[j]);}
        else if(bo==true){console.log(g[j]);bo=false;}  
  
        }
    }



}


}


function tr_file(arr ,nf,n,b,s)
{if(nf<2){console.log('======  Did not gave the destination to transfer the file=====');return;}
 if(s==true)
{let contentArr=[];let content=[];
for(let i=0;i<arr.length-1;i++)
{content=fs.readFileSync(arr[i],'utf-8').split('\n');
//console.log(content);
contentArr=contentArr.concat(content);
}
//console.log(contentArr);
let ans=[ ];
for(let i=0;i<contentArr.length;)
{if(contentArr[i].length>1){ans.push(""+contentArr[i]);i++;}
  else{ans.push(contentArr[i]);i++;
  while(contentArr[i].length==1){i++;}
}
}
//console.log(ans);
if(n==true){
// let ct=1;let g=arr.length;
// for(let i=0;i<g;i++)
//    { ans=ct+" "+arr[i];ct++;}
console.log('n---');
ans=tr_file_n(ans);
//console.log(ans);
}
if(b==true){
    // let ct=1;let g=arr.length;
    // for(let i=0;i<g;i++)
    //    { if(arr[i].length>1){ans=ct+" "+arr[i];}
    // }
    ans=tr_file_b(ans);
}
let exists=fs.existsSync(arr[nf-1]);
//ans=ans.join('/n');
ans=ans.join('\n');
if(exists==true){
 fs.writeFileSync(arr[nf-1],ans);   
}
else{fs.writeFileSync(arr[nf-1],ans)};

}

     

else{
    




}

}

function tr_file_n(ans)
{
    let ct=1;let g=ans.length;
   // console.log(ans);
for(let i=0;i<g;i++)
   { ans[i]=ct+" "+ans[i];ct++;}
return ans;
}
function tr_file_b(ans)
{
    let ct=1;let g=ans.length;
    let ret=[];
    //console.log(ans);
    for(let i=0;i<g;i++)
       { if(ans[i].length>1){ret[i]=ct+" "+ans[i];ct++;}
       else{ret[i]=ans[i];}
    }
    return ret;
}