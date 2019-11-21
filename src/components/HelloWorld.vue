<template>
<div>
  <table>
    <tbody :key="refresh">
        <tr v-for=" (row, index) in board" :key="index">
            <td v-for=" (elmt, index1) in row" :key="index1" @click="getAllPossiblePositions(index, index1)"><v-icon>{{elmt}}</v-icon></td>
        </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import Piece from "@/assets/js/Piece"

import {bishopPossibleMoves, rookPossibleMoves, pawnPossibleMoves, knightPossibleMoves} from "@/assets/js/PossibleMoves"

export default {
  name: 'HelloWorld',
  data() {
    return{
      possibleMoves : null,
      board : Array(8),
      piece : new Piece("Bishop 1", {x : 3, y : 3}, 1, "Black", knightPossibleMoves, "mdi-chess-knight"),
      refresh : false
    }
  },
  created(){
    this.refreshBoard()
    /* this.board[3][3] = "B1i"
    var bishop = new Piece("Bishop 1", {x : 3, y : 3}, 1, "Black", bishopPossibleMoves);
    this.possibleMoves = bishop.getPossiblePositions()
    this.possibleMoves.forEach(position => {
        this.board[position.x][position.y] = "B1"
    });
    this.board[0][0] = "Ri"
    var rook = new Piece("Rook 1", {x : 0, y : 0}, 1, "Black", rookPossibleMoves);
    this.possibleMoves = rook.getPossiblePositions()
    this.possibleMoves.forEach(position => {
        this.board[position.x][position.y] = "R"
    }); */
  },
  methods:{
      getAllPossiblePositions(x,y){
        this.refreshBoard()
        this.board[x][y] = this.piece.icon
        this.piece.position = { x , y }
        this.possibleMoves = this.piece.getPossiblePositions()
        this.possibleMoves.forEach(position => {
            this.board[position.x][position.y] = "B1"
        });
        this.refresh = !this.refresh
      },
      refreshBoard(){
        for(var i=0; i < this.board.length; i++){
            this.board[i] = Array(8).fill("-")
        }   
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
