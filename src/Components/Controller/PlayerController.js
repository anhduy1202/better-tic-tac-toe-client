import firebase from "../../util/firebase";

//Win mechanic
const firstMove = (element) => {
    return element == "";
}
export const removeUsername = (username, rooms) => {
    const roomRef = firebase.database().ref(`allRooms/${rooms}`);
    roomRef.orderByChild('nickname').equalTo(`${username}`).once('value', (snapshot) => {
        let updates = {};
        snapshot.forEach((userSnapshot) => {
            updates[userSnapshot.key] = null;
        })
        roomRef.update(updates);
    })

}
export const getWinner = (currMove, startPos, lastPlayer, newBoard, BoardSize, tileSize) => {
    if (!newBoard || newBoard.length == 0 || newBoard.every(firstMove)) {
        return "load";
    }
    else if (newBoard.length > 0) {
        let lastMove = getCurrentColumn(currMove, tileSize, BoardSize);
        let leftToRight = 0;
        let rightToLeft = tileSize - 1;
        //Horizontal check
        if (isHorizontalWin(currMove, startPos, lastPlayer, newBoard, BoardSize, tileSize) === true) {
            return lastPlayer;
        }
        //Vertical check
        if (isVerticalWin(currMove, lastMove, lastPlayer, newBoard, BoardSize, tileSize)) {
            return lastPlayer;
        }
        //Diagonal check left to right
        if (leftToRightCheckNeeded(currMove, tileSize) && isLeftToRight(currMove, leftToRight, lastPlayer, newBoard, BoardSize, tileSize)) {
            return lastPlayer;
        }
        if (rightToLeftCheckNeeded(currMove, tileSize) && isRightToLeft(currMove, rightToLeft, lastPlayer, newBoard, BoardSize, tileSize)) {
            return lastPlayer;
        }
    }
    return "";
}
const getCurrentColumn = (currMove, tileSize) => {
    while (currMove >= tileSize) {
        currMove -= tileSize;
    }
    return currMove;
}
const isHorizontalWin = (currMove, startPos, lastPlayer, newBoard, BoardSize, tileSize) => {

    //Start at the first tile of the row if user didnt choose tile from the last column
    if (currMove < BoardSize && ((currMove + 1) % tileSize != 0)) {
        for (let i = startPos; i <= (startPos + 3); i++) {
            if (newBoard[i] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }
    else if (currMove != startPos && currMove < BoardSize && ((currMove) % tileSize != 0)) {
        //Start at the tile next to the first tile of the row if user choose tile from the last column
        for (let i2 = (startPos + 1); i2 <= (startPos + 4); i2++) {
            if (newBoard[i2] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }
}
const isVerticalWin = (currMove, lastMove, lastPlayer, newBoard, BoardSize, tileSize) => {
    //Start at first tile of the column if user didn't choose tile larger than boardsize-tilesize
    if (currMove < BoardSize && currMove < (BoardSize - tileSize)) {
        for (let j = lastMove; j <= (lastMove + 15); j += tileSize) {   //Loop through the tile under the chosen column

            if (newBoard[j] != (lastPlayer)) {
                return false;                     //if the column isn't filled by X/O, return false
            }
        }
        return true;
    }
    else if (currMove != lastMove && currMove < BoardSize && ((currMove) >= (BoardSize - tileSize))) {
        //Start at the second tile of the column
        for (let j2 = lastMove + tileSize; j2 <= ((lastMove + tileSize) + 15); j2 += tileSize) {   //Loop through the tile under the chosen column
            if (newBoard[j2] != (lastPlayer)) {
                return false;                     //if the column isn't filled by X/O, return false
            }
        }
        return true;
    }
}
const leftToRightCheckNeeded = (currMove, tileSize) => {
    if (currMove % 6 == 0 || ((currMove + 5) % 6 == 0) || ((currMove - 5) % 6 == 0)) {
        return true;

        
    }
    else {
        return false;
    }
}

//WE'll have 4 diagonal cases for left to right
const isLeftToRight = (currMove, leftToRight, lastPlayer, newBoard, BoardSize, tileSize) => {

    //If user choose tile belong to the center diagonal 
    if (currMove == 0 || ((currMove % (tileSize + 1) == 0) && (currMove != 24))) {

        //Loop until tile 18
        for (let k = leftToRight; k <= 18; k += (tileSize + 1)) {
            if (newBoard[k] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }
    //Start at tile 6
     if (currMove != 0 && ((currMove % 6) === 0)) {
        for (let k2 = 6; k2 <= 24; k2 += (tileSize + 1)) {
            if (newBoard[k2] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }

    //If user choose tile belong to the diagonal below the center diagonal
     if (currMove != 0 && (currMove + 1) % 6 == 0) {
        //Start at tile 5 
        for (let k3 = 5; k3 <= 23; k3 += (tileSize + 1)) {
            if (newBoard[k3] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }

    //If user choose tile belong to the diagonal above the central diag
     if (currMove != 0 && ((currMove + tileSize) % 6 == 0)) {
        //Start at tile 1
        for (let k4 = 1; k4 <= 19; k4 += (tileSize + 1)) {
            if (newBoard[k4] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }
}
const rightToLeftCheckNeeded = (currMove, tileSize) => {
    if ((currMove % 4 == 0) || ((currMove - 5) % 4 == 0) || ((currMove + 5) % 4 == 0)) {
        return true;
    }
    else {
        return false;
    }
}
const isRightToLeft = (currMove, rightToLeft, lastPlayer, newBoard, BoardSize, tileSize) => {

    //If user choose tile belong to the central diagonal
    if (currMove == 4 || ((currMove % (tileSize - 1) == 0) && (currMove != 20))) {
        //Loop until tile 16
        //Start at tile 4
        for (let l = rightToLeft; l <= 16; l += (tileSize - 1)) {
            if (newBoard[l] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }
     if (currMove != 4 && (currMove % (tileSize - 1) == 0)) {
        //Start at tile 8
        //Loop until tile 20
        for (let l2 = 8; l2 <= 20; l2 += (tileSize - 1)) {
            if (newBoard[l2] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }
    //User choose tile from the diag below the central diag
     if (currMove != 4 && ((currMove - tileSize) % 4 == 0)) {

        //Start at tile 9
        //Loop until tile 21
        for (let l3 = 9; l3 <= (BoardSize - 4); l3 += (tileSize - 1)) {
            if (newBoard[l3] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }

    //User choose tile from the diag above the central diag
     if (currMove != 4 && ((currMove + 1) % 4 == 0)) {

        //Start at tile 3
        //Loop until tile 15
        for (let l4 = 3; l4 <= 15; l4 += (tileSize - 1)) {
            if (newBoard[l4] != (lastPlayer)) {
                return false;
            }
        }
        return true;
    }

}


