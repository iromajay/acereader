
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
var reader = document.getElementById("reader");
var test = (text,wpm,noWords,lines) => {
    // console.log("test="+text+","+wpm+","+noWords);
    
    // reader1 = documefreadernt.getElementById("reader1");
    let i=0;
    let testArr = text.replace(/\n/g,' ').replace(/\s{2,}/g,' ').trim().split(" ");
    console.log(testArr);
    let nw =  parseInt(noWords);
    // console.log(isPause);
    
    	aceReader = setInterval(()=> {
        if(!isPause) {
            let str = "";
            //dn + (a-d): (lines)*nw +(i-)
            if(!lines)
            	lines = 1;
            //let limit = nw * lines +(i-lines);
            // let limit =nw;
            let wc = nw;

            
            // for(let j = i;j<=limit*nw;j++) {
            	
            // 	if(testArr[j]!=null)
            //         if(!wc) {
            //     	   str = str+" " + "<div>"+testArr[j]+"</div>"; 
                       
            //            wc = nw; 
            //         }
            //         else {
            //             if(str==""){
            //                 str = "<div>"+str + " " +testArr[j]+"</div>";     
            //             }
            //             else {
            //                 str = str + "<span>" +" " +testArr[j] + "</span>";
            //             }
            //             wc--; 
                                                    
            //         }
            // }    
            let newStr = "";
            for(let j=i;j<i+(lines*nw);j=j+nw) {                
                for(let w=j;w<j+nw;w++) {
                    if(testArr[w]!=null)
                        newStr += " " + testArr[w];
                }
                if(newStr!==""){
                    str +="<div>"+ newStr +"</div>"; 
                    newStr = "";
                }
            }

            reader.innerHTML ="";
            reader.innerHTML =str;
            // reader1.innerHTML ="";
            // reader1.innerHTML ="<h1>"+str+"</h1>";
            i+=lines*nw;
            if(i>=testArr.length)
                i=0;
            
        }
    },60000/wpm);           
}

document.getElementById("btnPause").addEventListener("click",()=>{
    event.preventDefault();
    isPause = !isPause;
    if(isPause)
    	document.getElementById("btnPause").innerHTML = "Continue";
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
    reader.innerHTML = "";
    str= "";
    clearInterval(aceReader);

    test(text,wpm,noWords,lines);
});
document.getElementById("btnNewtext").addEventListener("click",()=>{
    //event.preventDefault();
    document.getElementById("display").className+=" hide";
    document.getElementById("read").classList.remove("hide");
    reader.value = "";
});

$('#myModal').on('show.bs.modal', function () {	
    $("#wpm").val(localStorage.getItem("wpm"));
    $("#noWords").val(localStorage.getItem("noWords"));    
    $("#lines").val(localStorage.getItem("lines"));    
 })
