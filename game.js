/*
Add your code for Game here
 */


//  export default class Game {
    class Game {
    rows = 0;
    moveHandler;
    loseHandler;
    winHandler;
    score = 0;
    gameOver = false;
    gameWin = false;
    currentBoard;
    constructor(dimensions) {
        this.rows = dimensions;
        this.setUpNewGame()
    }

    //Methods

    toString() {
        var result = "";
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.rows; j++) {
                result = result + `[ ${this.gameBoard[i][j]} ]`
            }
            result = result + "\n";
        }

        return result
    }

    makeNewTile() {
        var probabilityArray = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
        var index = Math.floor(Math.random() * probabilityArray.length)
        return probabilityArray[index];
    }

    loadGameState(gameState) {
        this.score = gameState.score
        var size = Math.sqrt(gameState.board.length)
        this.gameBoard = new Array(size).fill(0).map(() => new Array(size).fill(0))
        var index = 0;
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                this.gameBoard[i][j] = gameState.board[index]
                index++
            }
        }
    }

    setUpNewGame() { //setup
        this.gameBoard = new Array(this.rows).fill(0).map(() => new Array(this.rows).fill(0)) // need dimensions?

        let min = 0;
        let max = this.rows - 1;
        var tileOneRow = Math.floor(Math.random() * (max - min + 1) + min)
        var tileOneColumn = Math.floor(Math.random() * (max - min + 1) + min)
        this.gameBoard[tileOneRow][tileOneColumn] = this.makeNewTile();

        do {
            var tileTwoRow = Math.floor(Math.random() * (max - min + 1) + min)
            var tileTwoColumn = Math.floor(Math.random() * (max - min + 1) + min)

        } while (tileOneRow == tileTwoRow && tileOneColumn == tileTwoColumn)

        this.gameBoard[tileTwoRow][tileTwoColumn] = this.makeNewTile();

    }

    move(direction) {
        if (this.gameOver) {
            return;
        }

        switch (direction) {
            case "right":

                for (var i = 0; i < this.rows; i++) { // loop through and merge for every row; i = row #
                    var holder = new Array;
                    var rightIndex = (this.rows - 1); // gets rightmost index of each row

                    for (var j = rightIndex; j >= 0; j--) { //index within each row
                        if (this.gameBoard[i][j] != 0) {
                            holder.push(this.gameBoard[i][j]); // if the value is not zero, push into holder array
                        }
                    }
                    var updatedRow = new Array(4).fill(0) //makes a new array that will have updated values for a given row/column

                    for (var k = 0; k < holder.length; k++) { //loop through holder array to compare and merge tiles
                        if (k == holder.length - 1) { //edge case for last index of holder
                            updatedRow[rightIndex] = holder[k]
                        } else if (holder[k] == holder[k + 1]) { //if two tiles are the same and adjacent then merge
                            updatedRow[rightIndex] = holder[k] + holder[k + 1];
                            this.score += (holder[k] + holder[k+1]);
                            holder[k] = 0;  // assign two merged tiles values of zero in holder array so they cant be merged again
                            holder[k + 1] = 0;
                            rightIndex--;
                        } else {
                            if (holder[k] != 0) {
                                updatedRow[rightIndex] = holder[k]; //for tiles that arent merged and are just moved in direction
                                rightIndex--;
                            }
                        }
                    }

                    for (var l = 0; l < this.rows; l++) {  //replace row i with updated gameboard array
                        this.gameBoard[i][l] = updatedRow[l];
                    }
                }
                do { //make a new tile in occupied space after every move
                    let min = 0;
                    let max = this.rows - 1;
                    var tileRow = Math.floor(Math.random() * (max - min + 1) + min)
                    var tileColumn = Math.floor(Math.random() * (max - min + 1) + min)
                } while (this.gameBoard[tileRow][tileColumn] != 0);
                this.gameBoard[tileRow][tileColumn] = this.makeNewTile();

                break;

            case "left":
                for (var i = 0; i < this.rows; i++) { // loop through and merge for every row; i = row #
                    var holder = new Array;
                    var leftIndex = 0; // gets leftmost index of each row

                    for (var j = leftIndex; j < this.rows; j++) { //index within each row
                        if (this.gameBoard[i][j] != 0) {
                            holder.push(this.gameBoard[i][j]); // if the value is not zero, push into holder array
                        }
                    }
                    var updatedRow = new Array(4).fill(0) //makes a new array that will have updated values for a given row/column

                    for (var k = 0; k < holder.length; k++) { //loop through holder array to compare and merge tiles
                        if (k == holder.length - 1) { //edge case for last index of holder
                            updatedRow[leftIndex] = holder[k]
                        } else if (holder[k] == holder[k + 1]) { //if two tiles are the same and adjacent then merge
                            updatedRow[leftIndex] = holder[k] + holder[k + 1];
                            this.score += (holder[k] + holder[k+1]);
                            holder[k] = 0;  // assign two merged tiles values of zero in holder array so they cant be merged again
                            holder[k + 1] = 0;
                            leftIndex++;
                        } else {
                            if (holder[k] != 0) {
                                updatedRow[leftIndex] = holder[k]; //for tiles that arent merged and are just moved in direction
                                leftIndex++;
                            }
                        }
                    }

                    for (var l = 0; l < this.rows; l++) {  //replace row i with updated gameboard array
                        this.gameBoard[i][l] = updatedRow[l];
                    }
                }
                do { //make a new tile in occupied space after every move
                    let min = 0;
                    let max = this.rows - 1;
                    var tileRow = Math.floor(Math.random() * (max - min + 1) + min)
                    var tileColumn = Math.floor(Math.random() * (max - min + 1) + min)
                } while (this.gameBoard[tileRow][tileColumn] != 0);
                this.gameBoard[tileRow][tileColumn] = this.makeNewTile();

                break;

            case "up":
                for (var i = 0; i < this.rows; i++) { // loop through and merge for every row; i = row #
                    var holder = new Array;
                    var upperIndex = 0; // gets upper index of each row

                    for (var j = upperIndex; j < this.rows; j++) { //index within each row
                        if (this.gameBoard[j][i] != 0) {
                            holder.push(this.gameBoard[j][i]); // if the value is not zero, push into holder array
                        }
                    }
                    var updatedRow = new Array(4).fill(0) //makes a new array that will have updated values for a given row/column

                    for (var k = 0; k < holder.length; k++) { //loop through holder array to compare and merge tiles
                        if (k == holder.length - 1) { //edge case for last index of holder
                            updatedRow[upperIndex] = holder[k]
                        } else if (holder[k] == holder[k + 1]) { //if two tiles are the same and adjacent then merge
                            updatedRow[upperIndex] = holder[k] + holder[k + 1];
                            this.score += (holder[k] + holder[k+1]);
                            holder[k] = 0;  // assign two merged tiles values of zero in holder array so they cant be merged again
                            holder[k + 1] = 0;
                            upperIndex++;
                        } else {
                            if (holder[k] != 0) {
                                updatedRow[upperIndex] = holder[k]; //for tiles that arent merged and are just moved in direction
                                upperIndex++;
                            }
                        }
                    }

                    for (var l = 0; l < this.rows; l++) {  //replace row i with updated gameboard array
                        this.gameBoard[l][i] = updatedRow[l];
                    }
                }
                do { //make a new tile in occupied space after every move
                    let min = 0;
                    let max = this.rows - 1;
                    var tileRow = Math.floor(Math.random() * (max - min + 1) + min)
                    var tileColumn = Math.floor(Math.random() * (max - min + 1) + min)
                } while (this.gameBoard[tileRow][tileColumn] != 0);
                this.gameBoard[tileRow][tileColumn] = this.makeNewTile();

                break;

            case "down":
                for (var i = 0; i < this.rows; i++) { // loop through and merge for every row; i = row #
                    var holder = new Array;
                    var lowerIndex = this.rows - 1; // gets lower index of each row

                    for (var j = lowerIndex; j >= 0; j--) { //index within each row
                        if (this.gameBoard[j][i] != 0) {
                            holder.push(this.gameBoard[j][i]); // if the value is not zero, push into holder array
                        }
                    }
                    var updatedRow = new Array(4).fill(0) //makes a new array that will have updated values for a given row/column

                    for (var k = 0; k < holder.length; k++) { //loop through holder array to compare and merge tiles
                        if (k == holder.length - 1) { //edge case for last index of holder
                            updatedRow[lowerIndex] = holder[k]
                        } else if (holder[k] == holder[k + 1]) { //if two tiles are the same and adjacent then merge
                            updatedRow[lowerIndex] = holder[k] + holder[k + 1];
                            this.score += (holder[k] + holder[k+1]);
                            holder[k] = 0;  // assign two merged tiles values of zero in holder array so they cant be merged again
                            holder[k + 1] = 0;
                            lowerIndex--;
                        } else {
                            if (holder[k] != 0) {
                                updatedRow[lowerIndex] = holder[k]; //for tiles that arent merged and are just moved in direction
                                lowerIndex--;
                            }
                        }
                    }

                    for (var l = 0; l < this.rows; l++) {  //replace row i with updated gameboard array
                        this.gameBoard[l][i] = updatedRow[l];
                    }
                }
                do { //make a new tile in occupied space after every move
                    let min = 0;
                    let max = this.rows - 1;
                    var tileRow = Math.floor(Math.random() * (max - min + 1) + min)
                    var tileColumn = Math.floor(Math.random() * (max - min + 1) + min)
                } while (this.gameBoard[tileRow][tileColumn] != 0);
                this.gameBoard[tileRow][tileColumn] = this.makeNewTile();

                break;
                
            default:
                console.log("Enter valid directional input")

        }//end of switch
        var overBoolean = true; // check if game over
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.rows; j++) {
                if (this.gameBoard[i][j] == 0)
                overBoolean = false;
            }
        }
        if (overBoolean == true) {
            if (this.loseCallback != null) {
                this.gameOver = true
            this.loseCallback(this.getGameState())
            }
            
        }

        if (this.moveCallback != null) {
            this.moveCallback(this.getGameState())
        }




    }

    getGameState() {
        var result = {
            board: new Array(this.rows * this.rows).fill(0),
            score: this.score,
            over: this.gameOver,
            won: this.gameWin
        }

        result.board = Array.prototype.concat.apply([], this.gameBoard);;
        return result;
    }

    onMove(moveCallback) {
        this.moveCallback = moveCallback;
    }

    onLose(loseCallback) {
        this.loseCallback = loseCallback;
    }

    onWin(winCallback) {
        this.winCallback = winCallback
    }

}



