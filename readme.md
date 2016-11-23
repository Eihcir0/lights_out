# Lights Out Demo
This demo was created for a coding challenge from [Little Weaver Web Collective](https://littleweaverweb.com/).


## [CLICK HERE FOR LIVE DEMO](https://eihcir0.github.io/lights_out/)


![EXAMPLE](/Screen Shot 2016-11-17 at 11.31.05 PM.png)


## Requirements


Your task today is to implement a simple 5x5 version of
this game. We've provided the HTML and styles for it.
You will need to write javascript that will:
1. Toggle the appropriate 3 to 5 lights. (Change their class
 from `off` to `on`.)
2. Check if all the lights are off. If they are, call
 `victory();`
3. Set up the board with a random arrangement of lights.

```
Guidelines:
- Feel free to use jQuery or just vanilla javascript.
- Don't worry about browser compatibility. We'll check
your work in any modern browser of your choice.
- Feel free to use javascript documentation; just don't
reference other implementations of Lights Out.
```

## Lights Out Game Rules
 [Lights Out](https://en.wikipedia.org/wiki/Lights_Out_%28game%29) is a classic puzzle game.  The rules are as follows:

  1. Player is presented with a board with a random
    arrangement of on and off lights.
  2. Each time player presses a light, it toggles that
    light's state as well as the state of the lights
    immediately above, below, left, and right of it.
  3. When the player successfully turns off all the lights
    they win.

## Tech Stack

- [React.js](https://github.com/facebook/react) used for easy management of state and fast re-render via its virtual DOM.

- [Webpack](https://github.com/webpack) module bundler is used to generate static assets for module dependencies.  

- [Babel](https://github.com/babel/babel) transpiler is used for cross-browser support as the codebase was written using JavaScript ES6 syntax.

- [Jest](https://github.com/facebook/jest) testing framework was used to write tests for React / JavaScript.

- [AirBNB Style Guide](https://github.com/airbnb/javascript) (adapted) was used throughout the project.

## Directory Structure
```
lights_out
│
├─__tests__
├── stylesheets
└── components
```

## React Components
- **index.jsx** is found in the root directory and is the entry component which renders the **Game** component to the DOM.
- **game.jsx** is the component containing the game logic and rendering.


## Key features
All of the key features (from the requirements listed above) are contained in the Game component.

`setupBoard()`

This function creates a new 2d array where each element contains a randomly generated boolean -- `true = light on, false = light off`.  

The `board` portion of the state of the Game component is then set to this new array.

```js
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
```


`toggleLights()`  

Each cell from the board is assigned an onClick callback to the `toggleLights()` function with the position of the cell passed using the `bind` function.
```js
return (
  <div className={cellClassName}
        data-row={rowIdx}
        data-col={colIdx}
        onClick={this.toggleLights.bind(this,rowIdx,colIdx)}/>
);
```
The `toggleLights()` function iterates through each of the 5 possible positions (up, down, left, right and self) and checks if they are on the board through a helper function `validCell()`.  If valid, the value of that cell is toggled and the state is updated with the new board values.  


```js
const POSITIONS = [[0,0],[-1,0],[1,0],[0,-1],[0,1]];
..
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
    setTimeout(this.victory, 1500); //timeout used to allow time for CSS transition to show all lights off on board
  }
}

```
Upon re-render, the CSS class name for each cell is based on the value of each element stored in the array in Game's state.

```js
if (lit) {
  cellClassName = "square on";
} else {
  cellClassName = "square off";
}

```

`checkVictory()`

At the end of the `toggleLights()` function, the `checkVictory()` function is called to determine if the game has been won.  This function iterates through all rows in board and immediately returns false if any of the rows include a `true` (for light on).  If none are found, the function returns true because all the lights are off and the game is won.

```js
checkVictory() {
  for (let rowIdx = 0; rowIdx < this.boardSize; rowIdx++) {
    if (this.state.board[rowIdx].includes(true)) {
        return false;
    }
  }
  return true;
}
```

## Testing

This demo was tested with [Jest](https://github.com/facebook/jest).  Because of the limited scope of the demo, there weren't a lot of tests to be run.  However, the skeleton is now in place for additional testing in the future.


```

PASS  __tests__/game.test.js
 ✓ Game renders correctly (17ms)
 ✓ validCell() detects cell out of bounds (1ms)
 ✓ validCell() detects cell in bounds (1ms)
 ✓ checkVictory() detects Winner
 ✓ checkVictory() detects non-Winner
 ✓ toggleLights() handles toggle (5ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   1 passed, 1 total
Time:        4.929s
Ran all test suites.
```
Additionally, this demo was QA'd on the following screens:
  - MacBook Air 13"

And the following browsers:
  - Chrome ver 54.0.2840.71
  - Safari ver 9.1.2


## Future Direction

Due to the limited scope of this demo, little or no attention was given to the following areas:

- responsiveness
- cross-browser compatibility
- search engine optimization
- sound fx

One feature to add would be to only allow the initial board to be setup in a configuration that is solvable.  This would be achieved by using the [Chase the Lights](http://www.logicgamesonline.com/lightsout/tutorial.html) and checking if the bottom row matched one of the 7 winnable patterns.

Another possible feature to implement would be a **"SOLVE ME"** button which would then calculate the winning move for the current board.  The solution would be shown to the user using some data visualization animation.
