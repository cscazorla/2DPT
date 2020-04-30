let CollisionDetector = {
    /**
     * @param {{x: number, y: number}} point1
     * @param {{x: number, y: number}} point2
     */
    pointPoint: function (point1, point2) {
        if (point1.x == point2.x && point1.y == point2.y) return true
        else return false
    },
    /**
     * @param {{x: number, y: number}} point
     * @param {{x: number, y: number, radius: number}} circle
     */
    pointCircle: function (point, circle) {
        const dx = point.x - circle.x
        const dy = point.y - circle.y
        const squaredDist = dx * dx + dy * dy

        return squaredDist <= circle.radius * circle.radius ? true : false
    },
    /**
     * @param {{x: number, y: number, radius: number}} circle1
     * @param {{x: number, y: number, radius: number}} circle2
     */
    circleCircle: function (circle1, circle2) {
        const dx = circle1.x - circle2.x
        const dy = circle1.y - circle2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        return dist <= circle1.radius + circle2.radius ? true : false
    },

    /**
     * @param {{x: number, y: number}} point
     * @param {{x: number, y: number, width: number, height: number}} rectangle
     */
    pointRectangle: function (point, rectangle) {
        if (
            point.x >= rectangle.x &&
            point.x <= rectangle.x + rectangle.width &&
            point.y >= rectangle.y &&
            point.y <= rectangle.y + rectangle.height
        ) {
            return true
        } else {
            return false
        }
    },

    /**
     * @param {{x: number, y: number, width: number, height: number}} rect1
     * @param {{x: number, y: number, width: number, height: number}} rect2
     */
    rectangleRectangle: function (rect1, rect2) {
        if (
            rect1.x + rect1.width >= rect2.x &&
            rect1.x <= rect2.x + rect2.width &&
            rect1.y + rect1.height >= rect2.y &&
            rect1.y <= rect2.y + rect2.height
        ) {
            return true
        } else {
            return false
        }
    },

    /**
     * @param {{x: number, y: number, radius: number}} circle
     * @param {{x: number, y: number, width: number, height: number}} rect
     */
    circleRectangle: function (circle, rect) {
        const cx = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width))
        const cy = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height))

        const dx = circle.x - cx
        const dy = circle.y - cy
        const squaredDist = dx * dx + dy * dy
        return squaredDist < circle.radius * circle.radius ? true : false
    },

    /**
     * @param [{x: number, y: number}, {x: number, y: number}] line
     * @param {{x: number, y: number}} point
     */
    linePoint: function (line, point) {
        const buffer = 0.1
        const AB = {
            x: line[1].x - line[0].x,
            y: line[1].y - line[0].y,
        }
        const AC = {
            x: point.x - line[0].x,
            y: point.y - line[0].y,
        }
        const BC = {
            x: point.x - line[1].x,
            y: point.y - line[1].y,
        }

        const ABLen = Math.sqrt(AB.x * AB.x + AB.y * AB.y)
        const ACLen = Math.sqrt(AC.x * AC.x + AC.y * AC.y)
        const BCLen = Math.sqrt(BC.x * BC.x + BC.y * BC.y)

        if (ACLen + BCLen >= ABLen - buffer && ACLen + BCLen <= ABLen + buffer)
            return true
        else return false
    },

    /**
     * @param {{x: number, y: number, radius: number}} circle
     * @param [{x: number, y: number}, {x: number, y: number}] line
     */
    circleLine: function (circle, line) {
        // If either of the ends of the line are inside the circle return true
        if (
            this.pointCircle(line[0], circle) ||
            this.pointCircle(line[1], circle)
        )
            return true

        const AB = {
            x: line[1].x - line[0].x,
            y: line[1].y - line[0].y,
        }
        const ABmagnitude = Math.sqrt(AB.x * AB.x + AB.y * AB.y)
        const normalizedAB = {
            x: AB.x / ABmagnitude,
            y: AB.y / ABmagnitude,
        }

        const AC = {
            x: circle.x - line[0].x,
            y: circle.y - line[0].y,
        }

        let distance = AC.x * normalizedAB.x + AC.y * normalizedAB.y

        if (distance < 0) distance = 0
        if (distance > ABmagnitude) distance = ABmagnitude

        const projection = {
            x: normalizedAB.x * distance + line[0].x,
            y: normalizedAB.y * distance + line[0].y,
        }

        return this.pointCircle(projection, circle)
    },

    /**
     * @param [{x: number, y: number}, {x: number, y: number}] line1
     * @param [{x: number, y: number}, {x: number, y: number}] line2
     */
    lineLine: function (line1, line2) {
        // calculate the distance to intersection point
        const uA =
            ((line2[1].x - line2[0].x) * (line1[0].y - line2[0].y) -
                (line2[1].y - line2[0].y) * (line1[0].x - line2[0].x)) /
            ((line2[1].y - line2[0].y) * (line1[1].x - line1[0].x) -
                (line2[1].x - line2[0].x) * (line1[1].y - line1[0].y))
        const uB =
            ((line1[1].x - line1[0].x) * (line1[0].y - line2[0].y) -
                (line1[1].y - line1[0].y) * (line1[0].x - line2[0].x)) /
            ((line2[1].y - line2[0].y) * (line1[1].x - line1[0].x) -
                (line2[1].x - line2[0].x) * (line1[1].y - line1[0].y))

        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            return true
        } else {
            return false
        }
    },
}

export { CollisionDetector as default }
