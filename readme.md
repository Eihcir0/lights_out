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
All of the key features (from the requirements above) are contained in the Game component.

`setupBoard()`

This function creates a new 2d array where each element contains either a `-1` (indicating light off) or `1` (indicating light on) and is randomly determined.  The numbers `-1` and `1` were chosen as markers as they are easy to toggle by simple multiplication with -1.

The `board` portion of the state of the Game component is then set to this new array.

```js
setupBoard() {
  let newBoard = [];
  for (var row = 0; row < this.boardSize; row++) {
    let newRow = [];
    for (var col = 0; col < this.boardSize; col++) {
      let lit = Math.random() >= 0.5 ? 1 : -1;// -1 light out, 1 light on
      newRow.push(lit);
    }
    newBoard.push(newRow);
  }
  this.setState({board: newBoard});
}

```


`toggleLight()`  

Each cell from the board is assigned an onClick callback to the `toggleLight()` function with the position of the cell passed using the `bind` function.
```js
return (
  <div className={cellClassName}
        data-row={rowIdx}
        data-col={colIdx}
        onClick={this.toggleLight.bind(this,rowIdx,colIdx)}/>
);
```
The `toggleLight()` function iterates through each of the 5 possible directions (up, down, left, right and self) which were previously defined in a constant and checks if they are valid position on the board through a helper function `validCell()`.  If valid, the value of that cell is toggled by multiplying by -1.  Finally, the `board` portion of the state of the `game` component is updated with the new board values.  


```js
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

```
Upon re-render, the CSS class name for each cell is based on the value of each element stored in the array in Game's state.

```js
if (lit === -1) {
  cellClassName = "square off";
} else {
  cellClassName = "square on";
}

```

`checkVictory()`

At the end of the `toggleLight()` function, the `checkVictory()` function is called to determine if the game has been won.  This function iterates through all elements, immediately returning false if it finds a `1` indicating a light still on.  If none are found, it returns true.

```js
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
```

## Testing

This demo was tested with [Jest](https://github.com/facebook/jest).  Because of the limited scope of the demo, there weren't a lot of tests to be run.  However, the skeleton is now in place for adding additional tests after future implementations.


```
PASS  __tests__/game.test.js
 ✓ Game renders correctly (17ms)
 ✓ validCell detects cell out of bounds (1ms)
 ✓ validCell detects cell in bounds (1ms)
 ✓ detects Winner
 ✓ detects non-Winner
 ✓ handles toggle (5ms)

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

Additionally, a possible feature to implement in the future would be a **"SOLVE ME"** button which would then calculate the winning move for the current board using the [Chase the Lights](http://www.logicgamesonline.com/lightsout/tutorial.html) method.  The solution would be shown to the user using some data visualization animation.
