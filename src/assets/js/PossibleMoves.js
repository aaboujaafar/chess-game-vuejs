export var pawnPossibleMoves = [
    {
        x : [-1,1],
        y : [0,0],
        constraint: (x, y, team = null) =>{
            if(team == "white"){
                return x > 0 ;
            }
            return x < 0 ;
        }
    }
]

export var rookPossibleMoves = [
    {
        x: [-7, 7],
        y: [-7, 7],
        constraint: (x,y, team = null) => {
            return x == 0 || y == 0;
        }
    }
]

export var bishopPossibleMoves = [
    {
        x : [-7, 7],
        y : [-7, 7],
        constraint : (x, y, team = null) => {
            return Math.abs(x) == Math.abs(y);
        }
    }
]

export var queenPossibleMoves = [
    {
        x : [-7, 7],
        y : [-7, 7],
        constraint : (x, y, team = null) => {
            return Math.abs(x) == Math.abs(y) || x == 0 || y == 0;
        }
    }
]

export var knightPossibleMoves = [
    {
        x : [-2,2],
        y : [-2,2],
        constraint : (x, y, team = null) => {
            return Math.abs(x) + Math.abs(y) == 3;
        }
    }
]

export var kingPossibleMoves = [
    {
        x : [-1,1],
        y : [-1,1],
        constraint : (x, y, team = null) => {
            return true
        }
    }
]