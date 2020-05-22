const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const board = [
    ['N', 'N', 'N'],
    ['N', 'N', 'N'],
    ['N', 'N', 'N']
]


let currentPlayer = 'X';

readInput = () => {
    return new Promise((resolve, reject) => {
        rl.question(`${currentPlayer}'s move: `, (answer) => {
            resolve(answer);
        });
    });
}

printBoard = () => {
    // Print the board
    for(let row of board) {
      console.log(row);
    }
}


playGame = async () => {
    printBoard();
    const coords = await readInput();
    const [i, j] = coords.split(',');
    board[i][j] = currentPlayer;
    if(checkIfTherIsWinner()){
      return currentPlayer;
    }
    else{
      currentPlayer = getPlayer(currentPlayer);
      return null;
    }
    
    // Write your code that lets two people play tic tac toe 
    // you might need to implement your own functions  
}
checkForEmptyCells = () => {
  for(let row of board){
    for(let val of row) {
      if(val === 'N') return true;
    }
  }

  return false;
}
checkForConsecutiveChar = (arr) => {
  const char = arr[0];
  if(char  === 'N') return false;
  for(let val of arr) {
    if(val !== char) return false;
  }
  return true;
}

checkIfTherIsWinner = () => {
  const leftCol = [board[0][0], board[1][0], board[2][0]];
  const rightCol = [board[0][2], board[1][2], board[2][2]];
  const diagonalLeft = [board[0][0], board[1][1], board[2][2]];
  const diagonalRight = [board[0][2], board[1][1], board[2][0]];
  const allPossibleArr = [leftCol, rightCol, diagonalLeft, diagonalRight, board[0], board[2]];

  for(let arr of allPossibleArr){
    const res = checkForConsecutiveChar(arr);
    if(res) return true; 
  }
  
  return false;
}

getPlayer = (curr) => {
  if(curr === 'X') return 'O';
  return 'X';
}

let results = 'DRAW';

(async () => {
  while(checkForEmptyCells()) {
    const res = await playGame();
    if(res){
      console.log(`${currentPlayer} Wins`);
      results = 'WIN';
      break;
    }
  }
  
  console.log(results);
})();
