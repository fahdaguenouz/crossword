function CheckWords(word){
    const regex=/[a-z]/g
    
    if(!Array.isArray(word)||word.length==0){
        return true 
    }
    for(let i=0;i<word.length;i++){
        if(word[i].length==0||typeof word[i]!="string"){
            return true
        }
        for(let k=i+1;k<word[i].length;k++){
            if(word[k]==word[i]){
                return true 
            }
        }
        for(let j=0;j<word[i].length;j++){
            if(!word[i][j].match(regex)){
                return true
            }
        }

    }
    return false 
}

function CheckPuzzel(puzzl){
    const regex=/[0|2|1|.]/g
    if(typeof puzzl!="string"){
        return true 
    }
    console.log(puzzl);
 for(let i=0;i<puzzl.length;i++){

     if(!puzzl[i].match(regex)){
         return true
     }
 }

}

function crosswordSolver(puzzleMap,words){
    let error =false
    error = CheckWords(words)
    error = CheckPuzzel(puzzleMap)
    if(error){
        return console.log("Error");
        
    }else{
        return console.log("succ");
    }
}

// const emptyPuzzle=14

const emptyPuzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao',"anta"]
//const words=["","hhh"]
crosswordSolver(emptyPuzzle, words)

/* output:
`casa
i..l
anta
*/