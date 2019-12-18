
var text = `To get started, just copy and paste text that you would like to read in this text box. AccelaReader will help you read faster by flashing words at you using what is called a Rapid Serial Visual Presentation.
In the settings menu, you can determine how fast you would like to read (words per minute). You can also choose how many words you would like to be flashed at a time (chunk size), text size, and much more.
Once you have saved your settings, press the 'Read' button on the application's toolbar to start reading.
You can also add AccelaReader to your browser by clicking on the Bookmarklet tab on the top menu.` 
document.getElementById("txtInput").value = text;
localStorage.setItem("wpm",60);
localStorage.setItem("noWords",1);
localStorage.setItem("lines",0);

var isPause = false;
var aceReader;
var test = (text,wpm,noWords,lines) => {
    // console.log("test="+text+","+wpm+","+noWords);
    reader = document.getElementById("reader");
    // reader1 = document.getElementById("reader1");
    let i=0;
    let testArr = text.replace(/\s{2,}/g,' ').trim().split(" ");
    let nw =  parseInt(noWords);
    // console.log(isPause);
    
    	aceReader = setInterval(()=> {
        if(!isPause) {
            let str = "";
            //dn + (a-d): (lines)*nw +(i-)
            if(!lines)
            	lines = 1;
            let limit = lines*nw +(i-lines);
            for(let j = i;j<=limit ;j=j+lines) {
            	
            	if(testArr[j]!=null)
                	str = str+" " + testArr[j];                               
            }
            //str="
            //str = testArr[i++]; 
            reader.value ="";
            reader.value =str;
            // reader1.innerHTML ="";
            // reader1.innerHTML ="<h1>"+str+"</h1>";
            i=i+ nw+lines;
            if(i>=testArr.length)
                i=0;
            
        }
    },60000/wpm);           
}

document.getElementById("btnPause").addEventListener("click",()=>{
    event.preventDefault();
    isPause = !isPause;
    if(isPause)
    	document.getElementById("btnPause").innerHTML = "Read";
    else
    	document.getElementById("btnPause").innerHTML = "Pause";
});

localStorage.setItem("text",document.getElementById("txtInput").value);    
document.getElementById("btnReset").addEventListener("click",()=>{
    //event.preventDefault();
    localStorage.setItem("wpm" ,document.getElementById("wpm").value);
    localStorage.setItem("noWords",document.getElementById("noWords").value);
    localStorage.setItem("text",document.getElementById("txtInput").value); 
    localStorage.setItem("lines",document.getElementById("lines").value);    
    // console.log(text+","+wpm+","+noWords);
    // test(text,wpm,noWords);
});

document.getElementById("btnBegin").addEventListener("click",()=>{
    //event.preventDefault();
    let wpm = localStorage.getItem("wpm");
    let noWords = localStorage.getItem("noWords");
    let lines = parseInt(localStorage.getItem("lines"));
    document.getElementById("display").classList.remove("hide");
    document.getElementById("read").className+=" hide";
    localStorage.removeItem("text");
    localStorage.setItem("text",document.getElementById("txtInput").value);       
    let text = localStorage.getItem("text");
    console.log(text+","+wpm+","+noWords+",lines="+lines);
    clearInterval(aceReader);
    test(text,wpm,noWords,lines);
});
document.getElementById("btnNewtext").addEventListener("click",()=>{
    //event.preventDefault();
    document.getElementById("display").className+=" hide";
    document.getElementById("read").classList.remove("hide");
});

$('#myModal').on('show.bs.modal', function () {	
    $("#wpm").val(localStorage.getItem("wpm"));
    $("#noWords").val(localStorage.getItem("noWords"));    
    $("#lines").val(localStorage.getItem("lines"));    
 })
// test(text,30,4);