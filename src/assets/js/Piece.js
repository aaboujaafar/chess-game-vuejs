export default class Piece {
    constructor(name, postion, points, team, possibleMoves, icon = "mdi-chess-pawn") {
        this.name = name;
        this.position = postion;
        this.points = points;
        this.team = team;
        this.possibleMoves = possibleMoves;
        this.icon = icon
    }
    move(x, y){
        this.position.x = x;
        this.postion.y = y;
    }
    
    getPossiblePositions(){
        let possiblePostions = []
        this.possibleMoves.forEach(possibleMove => {
            for( var x = possibleMove.x[0]; x <= possibleMove.x[1]; x++ ){
                for(var y = possibleMove.y[0]; y <= possibleMove.y[1]; y++){
                    if(possibleMove.constraint(x,y, this.team)){
                        let newX = this.position.x + x;
                        let newY = this.position.y + y;
                        if(this.stillOnBoard(newX, newY) && !(x == y && y == 0) ){
                            possiblePostions.push({
                                x : newX,
                                y : newY
                            })
                        }
                        
                    }
                }
            }
        });
        return possiblePostions;
    }

    getAroundPositions(){
        let possibleXYInterval = [-1, 1]
        let arroundPositions = []
        for (let x = possibleXYInterval[0]; x <= possibleXYInterval[1]; x++){
            for(let y = possibleXYInterval[0]; y <= possibleXYInterval[1]; y++){
                let newX = this.position.x + x;
                let newY = this.position.y + y;
                if(this.stillOnBoard(newX, newY) && !(x == y && y == 0) ){
                    arroundPositions.push({
                        x : newX,
                        y : newY
                    })
                }
            }
        }
        return arroundPositions;
    }

    stillOnBoard(x, y){
        if( x > 7 || x < 0 || y > 7 || y < 0){
            return false
        }
        return true;
    }

    getDistanceFromAEmptyCaseOrPiece(emptyCase, isPiece = false){
        let dist = Math.sqrt( Math.pow((emptyCase.x - this.position.x), 2) + Math.pow((emptyCase.y - this.position.y), 2) )
        if(isPiece){
            this.
        }
        return 
    }

    
    
}

