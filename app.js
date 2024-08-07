const consonants = "bcdfghjklmnpqrstvwxyz".split("");
const vowels = "aeiou".split("");
const symbols = "!$%@&*+-".split("");

var goButton = document.getElementById("goButton");           //Button that says "Go!"
var lengthBar = document.getElementById("length");            //Range bar to select length
var resultList = document.getElementById("resultList");
var result = resultList.getElementsByClassName("result");     //each element in resultList

////////////////////////////display chosen length next to length bar
lengthBar.oninput = function(){
    document.getElementById("lengthDisplay").innerHTML = lengthBar.value;
 }

////////////////////////////what happens when you click "Go"?
goButton.onclick = function(){

    let numN = Number(document.querySelector('input[name="numbers"]:checked').value);  // numbers needed
    let upN = Number(document.querySelector('input[name="upper"]:checked').value);     // uppercase needed
    let symN = Number(document.querySelector('input[name="symbols"]:checked').value);  // symbols needed
    let pwLength = Number(lengthBar.value);

    //check for appropriate length
    if (pwLength<numN+upN+symN){
        alert ("Number of numbers, uppercase letters, and symbols exceed the length of the password.");

    } else{
        
        //change text inside button
        if (goButton.innerHTML=="GO!" || goButton.innerHTML =="Try Again?"){
        goButton.innerHTML = "Try Again?";
        }else{
            goButton.innerHTML = "다시하기";
        }

        //display results
        resultList.style.display = "block";

        //generate passwords for each 'result' element
        for (j = 0; j<result.length; j++){
            result[j].innerHTML = setPassword(pwLength, numN,upN,symN);
    
        }
    }
}

function setPassword (pwN, numN, upN, symN){
    var pw = "";                                        //empty string to store password
    alphN = pwN-numN-symN;                              //length of alphabetical string
    
    //select indices to be uppercase
    var upperIndex = [];
    while (upperIndex.length<upN){
        newEl = Math.floor(Math.random()*alphN);         //randomly generate new integer
        if (upperIndex.includes(newEl)==false){          //make sure there are no repeated values
            upperIndex.push(newEl);
        }
    }
    
    // generate alphabetical part: alternate between consonants and vowels. capitalize indices in upperIndex
    // 'index' = index in list of consonants/vowels. 'i' = index in the password
    for ( i = 0; i<alphN; i++){
        if (i%2 ==0){
            index = Math.floor(Math.random() * consonants.length)
            if (upperIndex.includes(i)){
                pw = pw+consonants[index].toUpperCase();
            }else{
            pw = pw+consonants[index];
            }
        }
        else {
            index = Math.floor(Math.random() * vowels.length)
            if (upperIndex.includes(i)){
                pw = pw+vowels[index].toUpperCase();
            }else{
            pw = pw+vowels[index];
            }
        }
    }

    // numerical part
    for (i = 0; i<numN; i++){
        pw = pw+Math.floor(Math.random()*10);
    }

    //symbol part
    //'index' = index in listof symbols.
    for ( i=0; i<symN; i++){
        index = Math.floor(Math.random()*symbols.length);
        pw = pw+symbols[index];
    }
    
    return pw;
}