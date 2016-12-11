/**
 * Created by filipv on 04/12/16.
 */

var maxWidth = 600,
    maxHeight = 600,
    canvasWidth,
    canvasHeight,
    segment = 20,
    gameEnded = false

var numberOfColumns = 0,
    numberOfRows = 0

var snake,
    food

function setup() {
    canvasWidth = windowWidth < maxWidth ? windowWidth : maxWidth
    canvasHeight = windowHeight < maxHeight ? windowHeight - 100 : maxHeight - 100

    numberOfColumns = Math.floor(canvasWidth / segment)
    numberOfRows = Math.floor(canvasHeight / segment)

    frameRate(16)
    createCanvas(numberOfColumns * segment, numberOfRows * segment)

    snake = new Snake()

    food = pickFoodLocation()
}

function pickFoodLocation() {
    var pickY = Math.floor(random(numberOfRows)),
        pickX = Math.floor(random(numberOfColumns))

    return createVector(pickX, pickY).mult(segment)
}

function draw() {
    background(51)

    if (snake.isDead()) {
        !gameEnded && window.navigator && window.navigator.vibrate(200)
        gameEnded = true
    } else {
        if (snake.eat(food)) {
            food = pickFoodLocation()
        }
        snake.move()
    }

    snake.show()

    fill(255, 0, 100)
    rect(food.x, food.y, segment, segment)
}

function mousePressed() {
    // snake.total++
    if (snake.isDead()) {
        snake.reset()
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.direction(0, -1)
    } else if (keyCode === DOWN_ARROW) {
        snake.direction(0, 1)
    } else if (keyCode === RIGHT_ARROW) {
        snake.direction(1, 0)
    } else if (keyCode === LEFT_ARROW) {
        snake.direction(-1, 0)
    }
}

function windowResized() {
    canvasWidth = windowWidth < maxWidth ? windowWidth : maxWidth
    canvasHeight = windowHeight < maxHeight ? windowHeight - 100 : maxHeight - 100

    numberOfColumns = Math.floor(canvasWidth / segment)
    numberOfRows = Math.floor(canvasHeight / segment)

    resizeCanvas(numberOfColumns * segment, numberOfRows * segment)

    food = pickFoodLocation()
    snake.reset()
}

var xPosition, yPosition;

document.addEventListener('touchstart', function(e){
    xPosition = parseInt(e.changedTouches[0].clientX) // get x coord of touch point
    yPosition = parseInt(e.changedTouches[0].clientY) // get x coord of touch point

    e.preventDefault();
}, false)


document.addEventListener('touchend', function onFirstTouch(e) {
    var x = parseInt(e.changedTouches[0].clientX) - xPosition // calculate dist traveled by touch point
    var y = parseInt(e.changedTouches[0].clientY) - yPosition // calculate dist traveled by touch point

    var offset = 10

    if (Math.abs(x) > offset || Math.abs(y) > offset) {
        if (Math.abs(x) > Math.abs(y)) {
            // moved horizontally
            snake.direction(x / Math.abs(x), 0)
        } else {
            // moved vertically
            snake.direction(0, y / Math.abs(y))
        }
    }

    e.preventDefault()

    // window.removeEventListener('touchmove', onFirstTouch, false);
}, false);

window.onload = function () {
    // register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', {scope: '/'})
    }
}
