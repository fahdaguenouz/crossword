function CheckWords(word){
    const regex=/[^a-z]/gi
    
    if(!Array.isArray(word)||word.length==0){
        return true 
    }
    for(let i=0;i<word.length;i++){
        if(word[i].length<2||typeof word[i]!="string"){
            return true
        }

        for(let k=i+1;k<word[i].length;k++){
            if(word[k]==word[i]){
                return true 
            }
        }
        
        for(let j=0;j<word[i].length;j++){
            //console.log(word[i][j]);
            if(word[i][j].match(regex)!=null){
                return true
            }
        }

    }
    return false 
}

function CheckPuzzel(puzzl){
    const regex=/[^0-2|.]/g
    if(typeof puzzl!="string"){
        return true 
    }
    let res = puzzl.split("\n").join("")
    if(res.match(regex)!=null)
    {
        return true
    }
    return false
}

function CheckWordInPuzzel(puzzel,words){
    let wordlen=words.join("").length
    // console.log(wordlen);
    let puzz = puzzel.split("\n").join("")
    puzz=puzz.split(".").join("")
    let c=0
    for(let i=0;i<puzz.length;i++){
        c+=parseInt(puzz[i])+1
    }
    if(c!=wordlen){
        return true 
    }
   return false

  }


function crosswordSolver(puzzleMap,words){
    let error =false
     if(CheckWords(words)||CheckPuzzel(puzzleMap)|| CheckWordInPuzzel(puzzleMap,words)){
        return console.log("Error");
     }
    
    
        return console.log("succ");
    
}

// const puzzle=14

// const puzzle = `2001
// 0..0
// 1000
// 0..0`
// const words = ["casa", 'alan', 'ciao',"anta"]
// const puzzle = '2001\n0..0\n2000\n0..0'
const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
].reverse()
//const words=["","hhh"]
crosswordSolver(puzzle, words)

/* output:
`casa
i..l
anta
*/