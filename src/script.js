const board = document.getElementById('game-board')

let snake = [{ x: 10, y: 10 }]
const gridSize = 20
let food = generateFood()
let direction = 'right'
let interval = 200
let gameInterval
let gameStarted = false
const instructionText = document.getElementById('instruction-text')
const logo = document.getElementById('logo')

function draw() {
  board.innerHTML = ''
  drawSnake()
  drawFood()
}

function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake')
    setPosition(snakeElement, segment)
    board.appendChild(snakeElement)
  })
}

function createGameElement(tag, className) {
  const element = document.createElement(tag)
  element.className = className
  return element
}

function setPosition(element, position) {
  element.style.gridColumn = position.x
  element.style.gridRow = position.y
}

function drawFood() {
  const foodElement = createGameElement('div', 'food')
  setPosition(foodElement, food)
  board.appendChild(foodElement)
}

function generateFood() {
  const x = Math.floor(Math.random() * gridSize + 1)
  const y = Math.floor(Math.random() * gridSize + 1)
  return { x, y }
}

function move() {
  const head = { ...snake[0] }
  switch (direction) {
    case 'up':
      head.y--
      break
    case 'down':
      head.y++
      break
    case 'left':
      head.x--
      break
    case 'right':
      head.x++
      break
  }

  snake.unshift(head)

  if (head.x === food.x && head.y === food.y) {
    food = generateFood()
    increaseSpeed()
    clearInterval(gameInterval)
    gameInterval = setInterval(() => {
      move()
      checkCollision()
      draw()
    }, interval)
  } else {
    snake.pop()
  }
}

// setInterval(() => {
//   move()
//   draw()
// }, interval)

function startGame() {
  gameStarted = true
  instructionText.style.display = 'none'
  logo.style.display = 'none'
  gameInterval = setInterval(() => {
    move()
    checkCollision()
    draw()
  }, interval)
}

function handleKeyPress(event) {
  if ((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === ' ')) {
    startGame()
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up'
        break
      case 'ArrowDown':
        direction = 'down'
        break
      case 'ArrowLeft':
        direction = 'left'
        break
      case 'ArrowRight':
        direction = 'right'
        break
    }
  }
}

document.addEventListener('keydown', handleKeyPress)

function increaseSpeed() {
  if (interval > 150) {
    interval -= 5
  } else if (interval > 100) {
    interval -= 3
  } else if (interval > 50) {
    interval -= 2
  } else if (interval > 25) {
    interval -= 1
  }
}

function checkCollision() {
  const head = snake[0]

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame()
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x || head.y === snake[i].y) {
      resetGame()
    }
  }
}

function resetGame() {
  snake = [{ x: 10, y: 10 }]
  food = generateFood()
  direction = 'right'
  interval = 200
}
