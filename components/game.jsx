import React from 'react';
const POSITIONS = [[0,0],[-1,0],[1,0],[0,-1],[0,1]];

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

  setupBoard() { //creates a 2d array of random true/false elements
    let newBoard = [];
    for (let row = 0; row < this.boardSize; row++) {
      let newRow = [];
      for (let col = 0; col < this.boardSize; col++) {
        let lit = Math.random() >= 0.5 ? true : false; //lit true or false randomly assigned
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


  toggleLights(row,col) {
    let newBoard = this.state.board;

    let that = this;
    POSITIONS.forEach(position => {
      let currentCell = [row + position[0], col + position[1]];
      if (that.validCell(currentCell)) {
        let r = currentCell[0];
        let c = currentCell[1];
        newBoard[r][c] = !newBoard[r][c]; //toggles light on/off
      }
    });
    this.setState({board: newBoard});
    if (this.checkVictory()) {
      setTimeout(this.victory, 1500); //timeout used to allow time for CSS transition to lights off
    }
  }

  getDisplayRows() {
    let cellClassName;
    let that = this;
    return this.state.board.map((row, rowIdx) => {
        return row.map((lit, colIdx) => {
          if (lit) {
            cellClassName = "square on";
          } else {
            cellClassName = "square off";
          }
          return (
            <div className={cellClassName}
                  data-row={rowIdx}
                  data-col={colIdx}
                  onClick={this.toggleLights.bind(that,rowIdx,colIdx)}/>
          );
        });
      }
    );
  }

  checkVictory() {
    for (let rowIdx = 0; rowIdx < this.boardSize; rowIdx++) {
      if (this.state.board[rowIdx].includes(true)) {
          return false;
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
