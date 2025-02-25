function CheckWords(word){
    const regex=/[^a-z]/g
  //  console.log((Array.isArray(word) || words instanceof Set));
    
    if(!(Array.isArray(word) || word instanceof Set)||word.length==0|| word.size === 0){
      //  console.log(word);
        return true 
    }
    let wordArray = Array.isArray(word) ? word : Array.from(word);

    for(let i=0;i<wordArray.length;i++){
        if(wordArray[i].length<2||typeof wordArray[i]!="string"){
            return true
        }

        for(let k=i+1;k<wordArray[i].length;k++){
            if(wordArray[k]==wordArray[i]){
                return true 
            }
        }
        
        for(let j=0;j<wordArray[i].length;j++){
            //console.log(wordArray[i][j]);
            if(wordArray[i][j].match(regex)!=null){
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
    let wordArray = Array.isArray(words) ? words : Array.from(words);
    const reg = /[\n|\.]/g
    let wordlen=wordArray.join("").length
    // console.log(wordlen);
    let puzz = puzzel.replace(reg, reg => reg = "");
    let c=0   
    for (item of puzz) {
        c += parseInt(item) + 1;
    }
   // console.log(c);
    return c !== wordlen;
  }

//   function CheckPalces(puzzel,words){
//     let matrix=[]
//     let puzz=[]
//     let pu = puzzel.split("\n")
//     words.map((e)=>{
//        matrix.push(e.split())

//     })
//     pu.map((e)=>{
//         puzz.push([...e])
//     })
//     //console.log(puzz);
//     //console.log(puzz.length);
//   }
// 

function cloneMatrix(matrix) {
    return matrix.map(row => [...row]);
}

// check if theres no number lft in matrix 
function isComplete(matrix) {
    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            if (['0', '1', '2'].includes(matrix[r][c])) {
                return false;
            }
        }
    }
    return true;
}

// Try to place a word horizontally
function placeHorizontal(matrix, word, y, x) {
    const newMatrix = cloneMatrix(matrix);

    console.log("place horisental");
    console.log(matrix);
    console.log(word);
    console.log("x",x);
    console.log("y",y);

    // chek if the word fit in the path of the x ->
    if (x + word.length > matrix[y].length) {
        return null;
    }
    
    // Check if there's space right after the word 
    // means the word short for the place 
    if (x + word.length < matrix[y].length && matrix[y][x + word.length] !== '.') {
   
        return null;
    }
    
    // Try to place the word
    for (let i = 0; i < word.length; i++) {
        const currentChar = matrix[y][x + i];
        if (currentChar === '.') {
            return null; // Can't place on empty cells
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            // console.log("current ",currentChar);
            // console.log("word",word[i]);
            // console.log(word);
            // console.log(matrix[y]);
            // console.log(newMatrix);
            return null; // Can't place if conflicting letter
        }
        newMatrix[y][x + i] = word[i];
    }
    
    return newMatrix;
}

// Try to place a word vertically
function placeVertical(matrix, word, y, x) {
    const newMatrix = cloneMatrix(matrix);
    console.log("place vertical");

    console.log(matrix);
    console.log(word);
    console.log("x",x);
    console.log("y",y);
    // Check if word fits vertically
    if (y + word.length > matrix.length) {
        return null;
    }
    
    // Check if there's space right after the word
    if (y + word.length < matrix.length && matrix[y + word.length][x] !== '.') {
        return null;
    }
    
    
    // Try to place the word
    for (let i = 0; i < word.length; i++) {
        const currentChar = matrix[y + i][x];
        if (currentChar === '.') {
            return null; // Can't place on empty cells
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            return null; // Can't place if conflicting letter
        }
        newMatrix[y + i][x] = word[i];
    }
    
    return newMatrix;
}

// Recursive solving function
function solveCrossword(puzzle, current, words, index) {
   // console.log(current);//log the complete important 
    //console.log("s",solutions);
    
    
    
    // If we've placed all words, check if the solution is complete
    if (index === words.length) {
        if (isComplete(current)) {
            solutions.push(current);
        }
        return;
    }
    
    // Get the current word
    const word = words[index];
    
    // Try placing at every possible position
    for (let y = 0; y < puzzle.length; y++) {
        for (let x = 0; x < puzzle[y].length; x++) {
            // Only try positions marked with 1 or 2
            if (puzzle[y][x] !== '1' && puzzle[y][x] !== '2') {
                continue;
            }
            
            // Try horizontal placement
            const horizontal = placeHorizontal(current, word, y, x);
            if (horizontal) {
                solveCrossword(puzzle, horizontal, words, index + 1);
            }
            
            // Try vertical placement
            const vertical = placeVertical(current, word, y, x);
            if (vertical) {
                solveCrossword(puzzle, vertical, words, index + 1);
            }
        }
    }
}

function CheckPalces(puzzel, words) {
    let puzz = [];
    let pu = puzzel.split("\n");
    pu.forEach(line => {
        puzz.push([...line]);
    });
    // const croosroad={
    //     startx:x,
    //     starty:y,
    //     ishorisnetal:false,
    //     isvertical:false,
    //     horisentalPath:[x+1,x+2,x+3,x+4],
    //     verticalPath:[y+1,y+2,y+3,y+4],

    // }
    // const coordinates = [];
    // for (let r = 0; r < puzz.length; r++) {
    //     for (let c = 0; c < puzz[r].length; c++) {
    //         coordinates.push({
    //             character: puzz[r][c],
    //             position: [r, c]
    //         });
    //     }
    // }
    //console.log(coordinates); 
    
    // Reset solutions array
    solutions = [];
    
    // Start the recursive solving
    solveCrossword(puzz, cloneMatrix(puzz), words, 0);
    // Check if there's exactly one solution
    if (solutions.length !== 1) {
        return null; 
    }
    
    return solutions[0];
}

function crosswordSolver(puzzleMap, words) {
    if (CheckWords(words) || CheckPuzzel(puzzleMap) || CheckWordInPuzzel(puzzleMap, words)) {
        return console.log("Error");
    }
    let wordArray = Array.isArray(words) ? words : Array.from(words);
    let solution = CheckPalces(puzzleMap, wordArray);
    
    if (solution === null) {
        console.log("Error");
    } else {

        console.log(solution.map(row => row.join('')).join('\n'));
    }
}

// const puzzle=14
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
crosswordSolver(puzzle, words)


/* output:
`casa
i..l
anta
*/

// function recursive(c){
//     if(c>10){
//         return ;
//     }
    
    
//     recursive(c+1)
//     console.log(c);
// }

// recursive(0)