const board = document.getElementById('game-board')

let snake = [{ x: 10, y: 10 }]

const draw = () => {
  board.innerHTML = ''
  drawSnake()
}

const drawSnake = () => {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake')
    setPosition(snakeElement, segment)
    board.appendChild(snakeElement)
  })
}

const createGameElement = (tag, className) => {
  const element = document.createElement(tag)
  element.className = className
  return element
}

const setPosition = (element, position) => {
  element.style.gridColumn = position.x
  element.style.gridRow = position.y
}
