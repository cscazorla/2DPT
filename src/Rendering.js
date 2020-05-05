import Vector2 from './Vector2.js'

let Rendering = {
    point: function (ctx, point, color) {
        point.radius = 1
        this.circle(ctx, point, color)
    },
    circle: function (ctx, circle, color, is_stroke) {
        ctx.beginPath()
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true)
        if (is_stroke) {
            ctx.strokeStyle = color
            ctx.stroke()
        } else {
            ctx.fillStyle = color
            ctx.fill()
        }
    },
    rectangle: function (ctx, rectangle, color, is_stroke) {
        ctx.beginPath()
        if (is_stroke) {
            ctx.strokeStyle = color
            ctx.strokeRect(
                rectangle.x,
                rectangle.y,
                rectangle.width,
                rectangle.height
            )
            ctx.stroke()
        } else {
            ctx.fillStyle = color
            ctx.fillRect(
                rectangle.x,
                rectangle.y,
                rectangle.width,
                rectangle.height
            )
            ctx.fill()
        }
    },
    line: function (ctx, line, color, width) {
        ctx.beginPath()
        ctx.moveTo(line[0].x, line[0].y)
        ctx.lineTo(line[1].x, line[1].y)
        ctx.strokeStyle = color
        if (width) ctx.lineWidth = width
        ctx.stroke()
    },
    polygon: function (ctx, polygon, color, is_stroke) {
        ctx.beginPath()
        ctx.moveTo(polygon[0].x, polygon[0].y)
        for (let i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y)
        }
        if (is_stroke) {
            ctx.strokeStyle = color
            ctx.stroke()
        } else {
            ctx.fillStyle = color
            ctx.fill()
        }
    },
    triangle: function (ctx, triangle, color, is_stroke) {
        this.polygon(ctx, triangle, color, is_stroke)
    },

    /**
     * Draw a Vector2 element
     * @method vector
     * @param  {CanvasRenderingContext2D} ctx
     * @param  {Vector2} vector
     * @param  {Vector2} origin
     * @param  {String} color
     * @param  {Number} width
     */
    vector: function (ctx, vector, origin, color, width) {
        if (!origin) origin = Vector2.createZero()
        let target = vector.clone()
        target = target.add(origin)

        // Line
        ctx.beginPath()
        ctx.moveTo(origin.x, origin.y)
        ctx.lineTo(target.x, target.y)
        ctx.strokeStyle = color ? color : 'black'
        if (width) ctx.lineWidth = width
        ctx.stroke()

        // Arrow
        let angle = vector.angleRad
        const headlen = 8
        ctx.beginPath()
        ctx.fillStyle = color ? color : 'black'
        if (width) ctx.lineWidth = width
        ctx.moveTo(
            headlen * Math.cos(angle) + target.x,
            headlen * Math.sin(angle) + target.y
        )
        angle += (1.0 / 3.0) * (2 * Math.PI)
        ctx.lineTo(
            headlen * Math.cos(angle) + target.x,
            headlen * Math.sin(angle) + target.y
        )
        angle += (1.0 / 3.0) * (2 * Math.PI)
        ctx.lineTo(
            headlen * Math.cos(angle) + target.x,
            headlen * Math.sin(angle) + target.y
        )
        ctx.fill()
    },
}

export { Rendering as default }
