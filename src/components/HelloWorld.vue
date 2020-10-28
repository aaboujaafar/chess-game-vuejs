<template>
<div>
  <table>
    <tbody :key="refresh">
        <tr v-for=" (row, index) in board" :key="index">
            <td v-for=" (elmt, index1) in row" :key="index1" @click="getAllPossiblePositions(elmt)"><v-icon>{{elmt.hoverIcon || elmt.icon || ""}}</v-icon></td>
        </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import Piece from "@/assets/js/Piece"

import {bishopPossibleMoves, rookPossibleMoves, pawnPossibleMoves, knightPossibleMoves, kingPossibleMoves, queenPossibleMoves} from "@/assets/js/PossibleMoves"

export default {
  name: 'HelloWorld',
  data() {
    return{
      possibleMoves : null,
      board : Array(8),
      refresh : false,
      whiteTeam : [],
      blackTeam : [],
      selectedPiece: null
    }
  },
  created(){
    this.refreshBoard()
    this.whiteTeam = [
        new Piece("Rook 1", {x : 0, y : 0}, 1, "white", rookPossibleMoves, "mdi-chess-rook"),
        new Piece("Knight 1", {x : 0, y : 1}, 1, "white", knightPossibleMoves, "mdi-chess-knight"),
        new Piece("Bishop 1", {x : 0, y : 2}, 1, "white", bishopPossibleMoves, "mdi-chess-bishop"),
        new Piece("Queen", {x : 0, y : 3}, 1, "white", queenPossibleMoves, "mdi-chess-queen"),
        new Piece("King", {x : 0, y : 4}, 1, "white", kingPossibleMoves, "mdi-chess-king"),
        new Piece("Bishop 2", {x : 3, y : 5}, 1, "white", bishopPossibleMoves, "mdi-chess-bishop"),
        new Piece("Knight 2", {x : 0, y : 6}, 1, "white", knightPossibleMoves, "mdi-chess-knight"),
        new Piece("Rook 2", {x : 0, y : 7}, 1, "white", rookPossibleMoves, "mdi-chess-rook")
    ];

    this.blackTeam = [
        new Piece("Rook 1", {x : 7, y : 0}, 1, "black", rookPossibleMoves, "mdi-chess-rook"),
        new Piece("Knight 1", {x : 7, y : 1}, 1, "black", knightPossibleMoves, "mdi-chess-knight"),
        new Piece("Bishop 1", {x : 7, y : 2}, 1, "black", bishopPossibleMoves, "mdi-chess-bishop"),
        new Piece("King", {x : 7, y : 3}, 1, "black", kingPossibleMoves, "mdi-chess-king"),
        new Piece("Queen", {x : 7, y : 4}, 1, "black", queenPossibleMoves, "mdi-chess-queen"),
        new Piece("Bishop 2", {x : 7, y : 5}, 1, "black", bishopPossibleMoves, "mdi-chess-bishop"),
        new Piece("Knight 2", {x : 7, y : 6}, 1, "black", knightPossibleMoves, "mdi-chess-knight"),
        new Piece("Rook 2", {x : 7, y : 7}, 1, "black", rookPossibleMoves, "mdi-chess-rook")
    ];

    for(var i = 0; i < 8 ; i++){
        this.whiteTeam.push(new Piece("Pawn", {x : 1, y : i}, 1, "white", pawnPossibleMoves, "mdi-chess-pawn"))
        this.blackTeam.push(new Piece("Pawn", {x : 5, y : i}, 1, "black", pawnPossibleMoves, "mdi-chess-pawn"))
    }

    this.whiteTeam.forEach(piece => this.board[piece.position.x][piece.position.y] = piece)
    this.blackTeam.forEach(piece => this.board[piece.position.x][piece.position.y] = piece)

  },
  methods:{
      getAllPossiblePositions(piece){
          this.refreshBoard()
          if(piece instanceof Piece && piece !== this.selectedPiece){ 
            this.selectedPiece = piece
            this.possibleMoves = piece.getPossiblePositions()
            let piecesArround = this.getPiecesArroundSpecificPiece(piece)
            let impossiblePositions = []
            /* piecesArround.forEach(pieceArround => {
                let pieceArroundVect = {x : (pieceArround.x - piece.position.x), y : (pieceArround.y - piece.position.y)}
                this.possibleMoves.forEach((possibleMove, i) => {
                    let possibleMoveVect = {x : (possibleMove.x - piece.position.x), y : (possibleMove.y - piece.position.y)}
                    let scalarProduct = (possibleMoveVect.x * pieceArroundVect.y) - (pieceArroundVect.x * possibleMoveVect.y)
                    if(scalarProduct == 0 && ((possibleMoveVect.x / pieceArroundVect.x) >= 0 || (possibleMoveVect.y / pieceArroundVect.y) >= 0) ){
                        if((possibleMoveVect.x / pieceArroundVect.x) >= 0 || (possibleMoveVect.y / pieceArroundVect.y) >= 0){
                            let pieceAtThisPosition = this.board[possibleMove.x][possibleMove.y]
                            if(pieceAtThisPosition.team == piece.team){
                                impossiblePositions.push(possibleMove)
                            }
                        }else{
                            impossiblePositions.push(possibleMove)
                        }
                    }
                });
                
            }) */ 
            let possibleMoveBoardVect = null
            this.possibleMoves.forEach(possibleMove => {
                let boardPiece = this.board[possibleMove.x][possibleMove.y]
                if(boardPiece instanceof Piece){
                    possibleMoveBoardVect = {x : (possibleMove.x - boardPiece.position.x), y : (possibleMove.y - boardPiece.position.y)}
                    let dist = this.selectedPiece.getDistanceFromAEmptyCase(boardPiece.position)
                    console.log(dist)
                }
            })
            console.log(impossiblePositions)
            this.possibleMoves = this.possibleMoves.filter(move => {
                if(impossiblePositions.filter(impoMove => {return move.x == impoMove.x && move.y == impoMove.y} ).length > 0){
                    return false
                }
                return true
            })
            this.possibleMoves.forEach(position => {
                this.board[position.x][position.y]["hoverIcon"] = "mdi-circle"
            });
          }
          console.log()
          this.refresh = !this.refresh
      },
      refreshBoard(){
          console.log("Refreshing board")
        for(var x=0; x < this.board.length; x++){
            if(this.board[x]){
                for (let y = 0; y < this.board.length; y++) {
                    this.board[x][y]["hoverIcon"] = null
                    if(!(this.board[x][y] instanceof Piece)){
                        this.board[x][y] = {icon : ""}
                    }
                }
            }else{
                this.board[x] = Array(8).fill({icon : ""})
            }
        }   
        this.whiteTeam.forEach(piece => this.board[piece.position.x][piece.position.y] = piece)
        this.blackTeam.forEach(piece => this.board[piece.position.x][piece.position.y] = piece)
      },
      getPiecesArroundSpecificPiece(piece){
          let arroundPositions = piece.getAroundPositions()
          return arroundPositions.filter(position => this.board[position.x][position.y] instanceof Piece) 
      }
  },
  watch:{
      board:{
          handler(){
              console.info('tag', this.board)
          },
          deep: true
          
      }
  }
};
</script>
<style>
    td{
        width: 48px;
        height: 48px;
        border: 1px solid;
        text-align: center;
    }
</style>
