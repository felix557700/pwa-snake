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

    this.update = function () {

        // food is eaten
        if (this.tail.length === this.total) {
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1]
            }
        }

        this.tail[this.total - 1] = createVector(this.x, this.y)

        this.x = this.x + this.xspeed * segment
        this.y = this.y + this.yspeed * segment

        this.x = constrain(this.x, 0, (numberOfColumns - 1) * segment)
        this.y = constrain(this.y, 0, (numberOfRows - 1) * segment)
    }

    this.show = function () {
        fill(255)
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, segment, segment)
        }
        rect(this.x, this.y, segment, segment)
    }

    this.isDead = function () {
        var isDead = _.some(this.tail, part => dist(this.x, this.y, part.x, part.y) < 1)

        return isDead;
    }

    this.spawn = function () {
        this.total = 0
        this.tail = []
    }

    this.eat = function (food) {
        var d = dist(this.x, this.y, food.x, food.y)

        if (d < 1) {
            this.total++;
            return true
        } else {
            return false
        }
    }
}

