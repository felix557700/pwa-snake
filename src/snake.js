/**
 * Created by filipv on 04/12/16.
 */

function Snake() {
    this.x = 0
    this.y = 0
    this.xspeed = 1
    this.yspeed = 0
    this.total = 0
    this.tail = []

    this.direction = function (x, y) {
        if (this.xspeed === -x || this.yspeed === -y) {
            return
        }
        this.xspeed = x
        this.yspeed = y
    }

    this.move = function () {

        // food is eaten
        if (this.tail.length === this.total) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1]
            }
        }

        //todo: fix this when total=0 => total-1=0
        this.tail[this.total - 1] = createVector(this.x, this.y)

        this.x = this.x + this.xspeed * segment
        this.y = this.y + this.yspeed * segment

        if (this.x >= numberOfColumns * segment) this.x = 0
        if (this.x < 0) this.x = numberOfColumns * segment

        if (this.y >= numberOfRows * segment) this.y = 0
        if (this.y < 0) this.y = numberOfRows * segment
    }

    this.show = function () {
        fill(255)
        _.forEach(this.tail, bodyPart => rect(bodyPart.x, bodyPart.y, segment, segment))

        rect(this.x, this.y, segment, segment)
    }

    this.isDead = function () {
        let isDead = _.some(this.tail, part => dist(this.x, this.y, part.x, part.y) < 1)

        return isDead
    }

    this.reset = function () {
        this.x = 0
        this.y = 0
        this.xspeed = 1
        this.yspeed = 0
        this.total = 0
        this.tail = []
    }

    this.eat = function (food) {
        var distanceBetweenFood = dist(this.x, this.y, food.x, food.y)

        if (distanceBetweenFood < 1) {
            this.total++
            return true
        } else {
            return false
        }
    }
}

