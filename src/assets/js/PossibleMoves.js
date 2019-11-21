export var pawnPossibleMoves = [
    {
        x : [0,0],
        y : [0,1],
        constraint: (x, y) =>{
            return true
        }
    }
]

export var rookPossibleMoves = [
    {
        x: [-7, 7],
        y: [-7, 7],
        constraint: (x,y) => {
            return x == 0 || y == 0;
        }
    }
]

export var bishopPossibleMoves = [
    {
        x : [-7, 7],
        y : [-7, 7],
        constraint : (x, y) => {
            return Math.abs(x) == Math.abs(y);
        }
    }
]

export var queenPossibleMoves = [
    {
        x : [-7, 7],
        y : [-7, 7],
        constraint : (x, y) => {
            return Math.abs(x) == Math.abs(y) || x == 0 || y == 0;
        }
    }
]

export var knightPossibleMoves = [
    {
        x : [-2,2],
        y : [-2,2],
        constraint : (x, y) => {
            return Math.abs(x) + Math.abs(y) == 3;
        }
    }
]

export var kingPossibleMoves = [
    {
        x : [-1,1],
        y : [-1,1],
        constraint : (x, y) => {
            return true
        }
    }
]