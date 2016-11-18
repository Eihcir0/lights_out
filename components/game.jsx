import React from 'react';
const DIRS = [[0,0],[-1,0],[1,0],[0,-1],[0,1]];

class Game extends React.Component {
  constructor() {
    super();
    this.boardSize = 5;//assume 5x5 grid
    this.getDisplayRows = this.getDisplayRows.bind(this);
    this.validCell = this.validCell.bind(this);
    this.setupBoard = this.setupBoard.bind(this);
    this.checkVictory = this.checkVictory.bind(this);
    this.victory = this.victory.bind(this);
    this.state = {board: [[]]};
  }

  componentDidMount() {
    this.setupBoard();
  }

  setupBoard() {
    let newBoard = [];
    for (var row = 0; row < this.boardSize; row++) {
      let newRow = [];
      for (var col = 0; col < this.boardSize; col++) {
        let lit = Math.random() > 0.5 ? 1 : -1;// -1 light out, 1 light on
        newRow.push(lit);
      }
      newBoard.push(newRow);
    }
    this.setState({board: newBoard});
  }

  validCell(currentCell) {
    let row = currentCell[0];
    let col = currentCell[1];
    return (row >= 0 &&
            row < this.boardSize &&
            col >= 0 &&
            col < this.boardSize);

  }

  toggleLight(row,col) {
    let newBoard = this.state.board;

    var that = this;
    DIRS.forEach(dir => {
      let currentCell = [row + dir[0], col + dir[1]];
      if (that.validCell(currentCell)) {
        newBoard[currentCell[0]][currentCell[1]] *= -1;
      }
    });
    this.setState({board: newBoard});
    if (this.checkVictory()) {
      this.victory();
    }
  }

  getDisplayRows() {
    let cellClassName;
    var that = this;
    return this.state.board.map((row, rowIdx) => {
        return row.map((lit, colIdx) => {
          if (lit === -1) {
            cellClassName = "square off";
          } else {
            cellClassName = "square on";
          }
          return (
            <div className={cellClassName}
                  data-row={rowIdx}
                  data-col={colIdx}
                  onClick={this.toggleLight.bind(that,rowIdx,colIdx)}/>
          );
        });
      }
    );
  }

  checkVictory() {
    for (var rowIdx = 0; rowIdx < this.boardSize; rowIdx++) {
      for (var colIdx = 0; colIdx < this.boardSize; colIdx++) {
        if (this.state.board[rowIdx][colIdx] === 1) {
          return false;
        }
      }
    }
    return true;
  }

  victory() {
    alert("Victory!");
    this.setupBoard();
  }


  render() {
    let rows = this.getDisplayRows();

      return (
        <div id="lightsout">
            { rows }
        </div>
      );
    }

} // end component

export default Game;
