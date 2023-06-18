const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const qustionContainElement = document.getElementById('qusetion-container')
const qustionElement = document.getElementById('question')
const answerButtonsElment =document.getElementById('answer-buttons')
let myQustion = []
import * as fs  from 'node:fs';
const wrongQ = new Array()
let mS
let shuffleQustions , currentQuestionIndex 
//import file from './file-saver.min.js'
//import { file } from './fileSaver.min.js';
//import { file } from './fileSaver.min.js';
//import {saveAs} from './FileSaver.js';
/*creating new class */
/*import read from "/r.wCsv.js";*/

fetch("./jTest.json").then(function(resp){
    return resp.json();
})
.then(function(data){
    myQustion = data
   
}).catch(function(error){
    console.error("somting went wring");
    console.error(error);
})


startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
startButton.classList.add('hide')
/*give number between 1 and 0 */
shuffleQustions= questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
qustionContainElement.classList.remove('hide')
setNextQuestion()
 
}

function setNextQuestion(){
    resetState()
 showQuetion(shuffleQustions[currentQuestionIndex])
   
}



function showQuetion(question)
{
    let   mShuffleQustions
    mShuffleQustions= myQustion.sort(() => Math.random() - .5)
     mS = mShuffleQustions[0]
    qustionElement.innerText = mS.qustion
   
    for(let i = 1; i<= 4; i++){
        
       
        const button = document.createElement('button')
        button.innerText = mS["answer"+i]
        button.classList.add('btn')
        button.addEventListener('click', selectAnswer)
        answerButtonsElment.appendChild(button)
        console.log(mS.correctA + "answer"+i)
        if ( "answer"+i==mS.correctA){
            button.dataset.correct = mS.correctA
           
         }
         
    }
    
   
}

function resetState(){
   
    clearStatuseClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElment.firstChild){
        answerButtonsElment.removeChild
        (answerButtonsElment.firstChild)
    }
}

function selectAnswer(e){
 const selectedButton = e.target
 const correct =selectedButton.dataset.correct
 setStatusClass(document.body,correct)
 if(correct!=mS.correctA){
    console.log("wrong " + mS.qId);
    wrongQ .push(mS.qId);
}
 Array.from(answerButtonsElment.children).forEach(button => {
    setStatusClass(button,button.dataset.correct)
    /*if it wrong  answer. add the qId to array */
    
 })
    /* cheking if there is qustions in the array*/
 if (shuffleQustions.length > currentQuestionIndex + 1){
    /*show the next button*/
    nextButton.classList.remove('hide')
   
 }
 
 else{
    startButton.innerText = 'restart'
    startButton.classList.remove('hide')
    writeJson(wrongQ)
 }
 
}
function setStatusClass(element,correct){
    clearStatuseClass(element)
    
   if (correct){
    element.classList.add('correct')
    
   } 
   else{
    element.classList.add('wrong')
   }
}
/*remove class evry time when clike btoon to reset the body coler */
function clearStatuseClass(element){
    element.classList.remove('Correct')
    element.classList.remove('wrong')
            
}
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
       myFunction(this);
   }
};
xhttp.open("GET", "data.xml", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("title")[0].childNodes[0];
    x.insertData(0,"Cooking: ");
    document.getElementById("demo").innerHTML =
    x.data;
}

/*get info from csv*/ 
  function writeJson(wQA){
    let json = JSON.stringify(wQA)
    fs.writeFile("message.json",json,(err)=> {
        if(err) throw err;
        console.log("the file has been saved")
    });
   /* var data_string = JSON.stringify(wQA)
    var file = new Blob([data_string],{type:"text"});
    var anchor =document.createElement("a");
    anchor.href =URL.createObjectURL(file);
    anchor.download ="wrongQ.txt";
    anchor.click();
    wQA.length = 0;
    console.log("empty arry"+wQA);
    */
    

   /* fetch("./data.xml").then(function(resp){
        return resp.text;
    })
    .then(function(data){
      
       const parser = new DOMParser();
       const doc = parser.parseFromString(data, 'text/xml');
       console.log(doc);
       
    }).catch(function(error){
        console.error("somting went wring");
        console.error(error);
    })
   const xmlStr = '<q id="a">'+wQA+'<span id="b">hey!</span></q>';
const parser = new DOMParser();
const doc = parser.parseFromString(xmlStr, "application/xml");
// print the name of the root element or error message
const errorNode = doc.querySelector("parsererror");
if (errorNode) {
  console.log("error while parsing");
} else {
  console.log(doc.documentElement.nodeName);
}
 */

//const serializer = new XMLSerializer();
//const xmlStr = serializer.serializeToString(doc);
/*var bolb = new Blob([wQA],{type: "text/plain;charset=utf-8"});
const saveFile = async (blob,my) => {
    try {
        console.log(wQA)
      const handle = await window.showSaveFilePicker({
        types: [{
          accept: {
            // Omitted
            
          },
        }],
      });
      
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return handle;
    } catch (err) {
      console.error(err.name, err.message);
    }
  };
  */
    //var bolb = new Blob([wQA],{type: "text/plain;charset=utf-8"});
    
      /* 
      )*/
     /* var bolb = new Blob(
        [(new XMLSerializer).serializeToString(wQA)]
      , {type: "text/plain;charset=utf-8" + document.characterSet}
      )*/
    
  // saveAs(blob,"wrongQustions.txt")
  /* const jsonString = JSON.stringify(wQA);
    console.log("json String "+jsonString)
    fetch("./myQ.json",jsonString).then(function(resp){
        return resp.json();
    })
    .then(function(data){
      
        console.log(data);
       
    }).catch(function(error){
        console.error("somting went wring");
        console.error(error);
    })*/
    
    
    
}
/* list of qustions*/
const questions =[ {
    question: "what is 2+2",
    answers:[
        {text : "4", correct: true},
        {text: "22", correct:false }
    ]
},
{
    question: "what is 2+4",
    answers:[
        {text : "6", correct: true},
        {text: "22", correct:false },
        {text: "8", correct:false },
        {text: "12", correct:false }
    ]
}
]