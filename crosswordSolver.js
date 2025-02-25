function CheckWords(word){
    const regex=/[^a-z]/g
  //  console.log((Array.isArray(word) || words instanceof Set));
    
    if(!(Array.isArray(word) || word instanceof Set)||word.length==0|| word.size === 0){
        console.log(word);
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

    let wordlen=wordArray.join("").length
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

// Check if the solution is complete (no more numbers)
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
function placeHorizontal(matrix, word, r, c) {
    const newMatrix = cloneMatrix(matrix);
    
    // Check if word fits horizontally
    if (c + word.length > matrix[r].length) {
        return null;
    }
    
    // Check if there's space right after the word
    if (c + word.length < matrix[r].length && matrix[r][c + word.length] !== '.') {
        return null;
    }
    
    // Check if there's space right before the word (for marker 1)
    if (matrix[r][c] === '1' && c > 0 && matrix[r][c-1] !== '.') {
        return null;
    }
    
    // Try to place the word
    for (let i = 0; i < word.length; i++) {
        const currentChar = matrix[r][c + i];
        if (currentChar === '.') {
            return null; // Can't place on empty cells
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            return null; // Can't place if conflicting letter
        }
        newMatrix[r][c + i] = word[i];
    }
    
    return newMatrix;
}

// Try to place a word vertically
function placeVertical(matrix, word, r, c) {
    const newMatrix = cloneMatrix(matrix);
    
    // Check if word fits vertically
    if (r + word.length > matrix.length) {
        return null;
    }
    
    // Check if there's space right after the word
    if (r + word.length < matrix.length && matrix[r + word.length][c] !== '.') {
        return null;
    }
    
    // Check if there's space right before the word (for marker 1)
    if (matrix[r][c] === '1' && r > 0 && matrix[r-1][c] !== '.') {
        return null;
    }
    
    // Try to place the word
    for (let i = 0; i < word.length; i++) {
        const currentChar = matrix[r + i][c];
        if (currentChar === '.') {
            return null; // Can't place on empty cells
        } else if (currentChar !== '0' && currentChar !== '1' && currentChar !== '2' && currentChar !== word[i]) {
            return null; // Can't place if conflicting letter
        }
        newMatrix[r + i][c] = word[i];
    }
    
    return newMatrix;
}

// Recursive solving function
function solveCrossword(puzzle, current, words, index) {
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
    for (let r = 0; r < puzzle.length; r++) {
        for (let c = 0; c < puzzle[r].length; c++) {
            // Only try positions marked with 1 or 2
            if (puzzle[r][c] !== '1' && puzzle[r][c] !== '2') {
                continue;
            }
            
            // Try horizontal placement
            const horizontal = placeHorizontal(current, word, r, c);
            if (horizontal) {
                solveCrossword(puzzle, horizontal, words, index + 1);
            }
            
            // Try vertical placement
            const vertical = placeVertical(current, word, r, c);
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
        // Print the solution
        console.log(solution.map(row => row.join('')).join('\n'));
    }
}

// const puzzle=14

const puzzle = `2001
0..0
1000
0..0`
const words = ["casa", 'alan', 'ciao',"anta"]
// const puzzle = '2001\n0..0\n2000\n0..0'
// const puzzle = `...1...........
// ..1000001000...
// ...0....0......
// .1......0...1..
// .0....100000000
// 100000..0...0..
// .0.....1001000.
// .0.1....0.0....
// .10000000.0....
// .0.0......0....
// .0.0.....100...
// ...0......0....
// ..........0....`
// const words = [
//   'sun',
//   'sunglasses',
//   'suncream',
//   'swimming',
//   'bikini',
//   'beach',
//   'icecream',
//   'tan',
//   'deckchair',
//   'sand',
//   'seaside',
//   'sandals',
// ].reverse()
//const words=["","hhh"]
//crosswordSolver(puzzle, words)
crosswordSolver(puzzle, new Set(words))


/* output:
`casa
i..l
anta
*/