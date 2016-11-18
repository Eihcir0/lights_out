import renderer from 'react-test-renderer';
import React from 'react';
import Game from './../components/game.jsx';

test('Game renders correctly', () => {
  const tree = renderer.create(
    <Game />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('validCell detects cell out of bounds', () => {
  const a = new Game();
  expect(a.validCell([-1,1])).toEqual(false);
});

test('validCell detects cell in bounds', () => {
  const a = new Game();
  expect(a.validCell([1,1])).toEqual(true);
});


test('detects Winner', () => {
  const a = new Game();
  a.state = ({board:
    [
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1]
    ]
  });
  expect(a.checkVictory()).toEqual(true);
});

test('detects non-Winner', () => {
  const a = new Game();
  a.state = ({board:
    [
      [1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1]
    ]
  });
  expect(a.checkVictory()).toEqual(false);
});

test('handles toggle', () => {
  const a = new Game();
  a.state = ({board:
    [
      [1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1]
    ]
  });
  a.toggleLight(0,0);

  expect(a.state).toEqual(
    {board:
      [
        [-1,1,-1,-1,-1],
        [1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1]
      ]
    }
  );
});
