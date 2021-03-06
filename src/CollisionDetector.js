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
     * https://demoman.net/?a=circle-vs-box
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
     * http://jeffreythompson.org/collision-detection/line-point.php
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
     * https://demoman.net/?a=circle-vs-line
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
     * http://jeffreythompson.org/collision-detection/line-line.php
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

    /**
     * http://jeffreythompson.org/collision-detection/line-rect.php
     * @param [{x: number, y: number}, {x: number, y: number}] line
     * @param {{x: number, y: number, width: number, height: number}} rect
     */
    lineRectangle: function (line, rect) {
        let left_line = [
            { x: rect.x, y: rect.y },
            { x: rect.x, y: rect.y + rect.height },
        ]
        let right_line = [
            { x: rect.x + rect.width, y: rect.y },
            { x: rect.x + rect.width, y: rect.y + rect.height },
        ]
        let top_line = [
            { x: rect.x, y: rect.y },
            { x: rect.x + rect.width, y: rect.y },
        ]
        let bottom_line = [
            { x: rect.x, y: rect.y + rect.height },
            { x: rect.x + rect.width, y: rect.y + rect.height },
        ]
        if (
            this.lineLine(line, left_line) ||
            this.lineLine(line, right_line) ||
            this.lineLine(line, top_line) ||
            this.lineLine(line, bottom_line)
        )
            return true
        else return false
    },

    /**
     * http://jeffreythompson.org/collision-detection/poly-point.php
     * @param {[point, point, point, ...]} polygon
     * @param {{x: number, y: number}} point
     */
    polygonPoint: function (polygon, point) {
        let collision = false
        let next = 0
        for (let current = 0; current < polygon.length; current++) {
            next = current + 1
            if (next == polygon.length) next = 0

            let vc = polygon[current]
            let vn = polygon[next]

            if (
                vc.y > point.y != vn.y > point.y &&
                point.x <
                    ((vn.x - vc.x) * (point.y - vc.y)) / (vn.y - vc.y) + vc.x
            ) {
                collision = !collision
            }
        }

        return collision
    },

    /**
     * http://jeffreythompson.org/collision-detection/poly-circle.php
     * @param {[point, point, point, ...]} polygon
     * @param {{x: number, y: number, radius: number}} circle
     */
    polygonCircle: function (polygon, circle) {
        let next = 0
        for (let current = 0; current < polygon.length; current++) {
            next = current + 1
            if (next == polygon.length) next = 0

            const vc = polygon[current]
            const vn = polygon[next]
            const line = [vc, vn]

            if (this.circleLine(circle, line)) return true
        }

        if (this.polygonPoint(polygon, circle)) return true

        return false
    },

    /**
     * http://jeffreythompson.org/collision-detection/poly-rect.php
     * @param {[point, point, point, ...]} polygon
     * @param {{x: number, y: number, width: number, height: number}} rect
     */
    polygonRectangle: function (polygon, rect) {
        let next = 0
        for (let current = 0; current < polygon.length; current++) {
            next = current + 1
            if (next == polygon.length) next = 0

            const vc = polygon[current]
            const vn = polygon[next]
            const line = [vc, vn]

            if (this.lineRectangle(line, rect)) return true
        }

        if (this.polygonPoint(polygon, rect)) return true

        return false
    },

    /**
     * http://jeffreythompson.org/collision-detection/poly-line.php
     * @param {[point, point, point, ...]} polygon
     * @param [{x: number, y: number}, {x: number, y: number}] line
     */
    polygonLine: function (polygon, line) {
        let next = 0
        for (let current = 0; current < polygon.length; current++) {
            next = current + 1
            if (next == polygon.length) next = 0

            const vc = polygon[current]
            const vn = polygon[next]
            const line2 = [vc, vn]

            if (this.lineLine(line, line2)) return true
        }

        return false
    },

    /**
     * http://jeffreythompson.org/collision-detection/poly-poly.php
     * @param {[point, point, point, ...]} polygon
     * @param {[point, point, point, ...]} polygon
     */
    polygonPolygon: function (polygon1, polygon2) {
        let next = 0
        for (let current = 0; current < polygon1.length; current++) {
            next = current + 1
            if (next == polygon1.length) next = 0

            const vc = polygon1[current]
            const vn = polygon1[next]
            const line = [vc, vn]

            if (this.polygonLine(polygon2, line)) return true

            if (this.polygonPoint(polygon1, polygon2[0])) return true
        }

        return false
    },

    /**
     * http://jeffreythompson.org/collision-detection/tri-point.php
     * @param {[point, point, point]} triangle
     * @param {{x: number, y: number}} point
     */
    trianglePoint: function (triangle, point) {
        const areaOrig = Math.abs(
            (triangle[1].x - triangle[0].x) * (triangle[2].y - triangle[0].y) -
                (triangle[2].x - triangle[0].x) *
                    (triangle[1].y - triangle[0].y)
        )

        const area1 = Math.abs(
            (triangle[0].x - point.x) * (triangle[1].y - point.y) -
                (triangle[1].x - point.x) * (triangle[0].y - point.y)
        )
        const area2 = Math.abs(
            (triangle[1].x - point.x) * (triangle[2].y - point.y) -
                (triangle[2].x - point.x) * (triangle[1].y - point.y)
        )
        const area3 = Math.abs(
            (triangle[2].x - point.x) * (triangle[0].y - point.y) -
                (triangle[0].x - point.x) * (triangle[2].y - point.y)
        )

        if (area1 + area2 + area3 == areaOrig) {
            return true
        }
        return false
    },
}

export { CollisionDetector as default }
