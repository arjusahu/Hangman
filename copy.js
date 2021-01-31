
let space_words=document.getElementById("space_words");
let line=document.getElementsByClassName("show");
let words = ['application', 'programming', 'interface', 'wizard', 'frizar'];
let currectWords=[];
let wrongWords=[];
let c=0,rand=0;
let gameStatus=true;
document.getElementById("reset").addEventListener("click",resetGame);
function inputPart()
{
 rand=Math.floor(Math.random()*4)+1;
// console.log(rand);
currectWords=words[rand].split('');
 console.log(currectWords);
for (let i=0;i<words[rand].length;i++)
{
    let newDiv=document.createElement("input");
    newDiv.setAttribute("type","text");
     newDiv.setAttribute("class","inputBox");
     newDiv.setAttribute("maxlength","1");
     newDiv.disabled=true;
     space_words.appendChild(newDiv);
     window.addEventListener("keydown",handleKeydown);

}

}
function handleKeydown(event)
{

    if(gameStatus && ((event.keyCode>=65 && event.keyCode<=90)||(event.keyCode>=97 && event.keyCode<=122)))
    {
    //    let char=event.target.value.toLowerCase();
       let char=(String.fromCharCode(event.keyCode)).toLowerCase();
       event.target.value="";
       if (currectWords.includes(char))
       {
           
           found(char);
       }
       else {
           if (wrongWords.includes(char))
           {
               alert("This word you have guessed and is not correct,guess another word");
               return;
           }
           wrongWords.push(char);
           notFound(char);
       }
    }
}
function found(char)
{
    let i=0;
Array.from(document.getElementsByClassName("inputBox")).forEach(ele=>{
if (currectWords[i++]==char)
{
    ele.value=char;
    ele.disabled=true;
}
})
winningCondition();
}

function winningCondition()
{
    let counter=0;
Array.from(document.getElementsByClassName("inputBox")).forEach(ele=>
    {
     if (ele.value!="")
     {
         counter++;
     }
    });
    if (counter==currectWords.length)
    {
        console.log("won");
        disableInput();
        won();
    }
}

function notFound()
{

document.getElementById("words").innerHTML=wrongWords;
// console.log(line[c]);
line[c].style.display="block";
c++;
if (c==7)
{
    gameOver();
}

}
function gameOver()
{
    c=0;
 console.log("gameover");
 gameStatus=false;
 disableInput();
 lost();
}
function disableInput()
{
    window.removeEventListener("keydown",handleKeydown);
    Array.from(document.getElementsByClassName("inputBox")).forEach(ele=>
        ele.disabled=true);
}
function resetGame()
{
    gameStatus=true;
    currectWords=[];
     wrongWords=[];
     c=0;
     document.getElementById("words").innerHTML="";
     Array.from(line).forEach(ele=>
        {
            ele.style.display="none";
        })
    Array.from(document.getElementsByClassName("inputBox")).forEach(ele=>
        {
            ele.disabled=false;
            ele.value="";
           document.getElementById("space_words").removeChild(ele);
        })
        document.getElementById("result").innerHTML="";
         document.getElementById("result").style.backgroundColor="transparent";
         document.getElementById("result").style.boxShadow="none";
         inputPart();
}
function won()
{
let wonMsg=document.createElement("div");
wonMsg.innerHTML=`You Won <br/>The word is " ${words[rand]} "`;
document.getElementById("result").appendChild(wonMsg);
document.getElementById("result").style.backgroundColor="#f2f77f";
document.getElementById("result").style.boxShadow=".4rem .4rem 1rem black";
}

function lost()
{
    let wonMsg=document.createElement("div");
wonMsg.innerHTML=`You Lost <br/>The word is " ${words[rand]} "`;
document.getElementById("result").appendChild(wonMsg);
document.getElementById("result").style.backgroundColor="#f2f77f";
document.getElementById("result").style.boxShadow=".4rem .4rem 1rem black"
}
inputPart();