const N = 4;

function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

let dataBase = [];

let array = [];

for(let i=0;i<N*N;i++) {
    array.push(i);
}

// A function to count inversions 

function getInvCount(arr) {
    let inv_count = 0;
    for (let i = 0; i < N * N - 1; i++){   
        if(arr[i]!= 0){
            for (let j = i + 1; j < N * N; j++){
            // count pairs(arr[i], arr[j]) such that
            // i < j but arr[i] > arr[j]
                if (arr[j] && arr[i] && arr[i] > arr[j]){
                    inv_count++;
                }
            }
        }
    }
    return inv_count;
}

// find Position of blank from bottom
function findXPosition(puzzle){

// start from bottom-right corner of matrix
for (let i = N - 1; i >= 0; i--){
    for (let j = N - 1; j >= 0; j--){
    if (puzzle[i][j] == 0)
        return N - i;
    }
}
}

// This function returns true if given
// instance of N*N - 1 puzzle is solvable
function isSolvable(puzzle){

// Count inversions in given puzzle
let invCount = getInvCount(puzzle);

// If grid is odd, return true if inversion
// count is even.
    if (N & 1)
        return !(invCount & 1);

    else {   // grid is even
        let pos = findXPosition(puzzle);
        if (pos & 1)
            return !(invCount & 1);
        else
            return invCount & 1;
    }
}

/* Driver program to test above functions */

let i = 0;
while (true) {
    let dataElement = shuffleArray(array);
    // dataElement = [1,2,3,4,5,6,7,8,9,10,15,11,13,14,0,12];

    if (isSolvable(dataElement)) {
        dataBase.push(dataElement);
        break;
    }
}