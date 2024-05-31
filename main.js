const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
// const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray) {
    this.field = fieldArray;
    this.playerPosition = { x: 0, y: 0 };
    this.updateField();
  }

  print() {
    let fieldString = '';
    for (let row of this.field) {
      fieldString += row.join('') + '\n';
    }
    console.log(fieldString);
  }

  updateField() {
    if (this.playerPosition.y < 0) {
      this.playerPosition.y = this.field.length - 1;
    } else if (this.playerPosition.y >= this.field.length) {
      this.playerPosition.y = 0;
    }

    if (this.playerPosition.x < 0) {
      this.playerPosition.x = this.field[0].length - 1;
    } else if (this.playerPosition.x >= this.field[0].length) {
      this.playerPosition.x = 0;
    }

    this.field[this.playerPosition.y][this.playerPosition.x] = pathCharacter;
  }

  playGame() {
    while (true) {
      this.print();
      let move = prompt('Which direction? (w = up, s = down, a = left, d = right): ');

      const newPosition = { ...this.playerPosition };

      switch (move) {
        case 'w':
          newPosition.y -= 1;
          break;
        case 's':
          newPosition.y += 1;
          break;
        case 'a':
          newPosition.x -= 1;
          break;
        case 'd':
          newPosition.x += 1;
          break;
        default:
          console.log('Enter a valid move!');
          continue;
      }

      if (newPosition.y < 0) {
        newPosition.y = this.field.length - 1;
      } else if (newPosition.y >= this.field.length) {
        newPosition.y = 0;
      }

      if (newPosition.x < 0) {
        newPosition.x = this.field[0].length - 1;
      } else if (newPosition.x >= this.field[0].length) {
        newPosition.x = 0;
      }

      if (this.isHole(newPosition)) {
        console.log('You fell into a hole. Game Over!');
        break;
      }

      if (this.isHat(newPosition)) {
        console.log('You found the hat! Congratulations, you won!');
        break;
      }

      this.playerPosition = newPosition;
      this.updateField();
    }
  }

  isHole(newPosition) {
    return this.field[newPosition.y][newPosition.x] === hole;
  }

  isHat(newPosition) {
    return this.field[newPosition.y][newPosition.x] === hat;
  }
}

const myField = new Field([
  ['*', 'O', '░'],
  ['░', 'O', '░'],
  ['░', '░', '^']
]);

myField.playGame();
