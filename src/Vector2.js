import Utils from './Utils.js'

export default class Vector2 {
    constructor(x, y) {
        this.coords = [x, y]
    }

    get x() {
        return this.coords[0]
    }

    set x(x) {
        this.coords[0] = x
    }

    get y() {
        return this.coords[1]
    }

    set y(y) {
        this.coords[1] = y
    }

    get magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    /**
     * Returns the angle of the vector in Radians
     * @method angleRad
     * @return {Number} angle
     */
    get angleRad() {
        return Math.atan2(this.coords[1], this.coords[0])
    }

    /**
     * Returns the angle of the vector in Degrees
     * @method angleDeg
     * @return {Number} angle
     */
    get angleDeg() {
        return Utils.toDeg(this.angleRad)
    }

    toString() {
        return (
            '(' +
            this.coords[0].toFixed(2) +
            ',' +
            this.coords[1].toFixed(2) +
            ')'
        )
    }

    negate() {
        return new Vector2(-this.x, -this.y)
    }

    perpendicular() {
        return new Vector2(-this.y, this.x)
    }

    perpendicularR() {
        return new Vector2(this.y, -this.x)
    }

    normalize() {
        let magnitude = this.magnitude
        let x = this.x / magnitude
        let y = this.y / magnitude
        return new Vector2(x, y)
    }

    scale(number) {
        return new Vector2(this.x * number, this.y * number)
    }

    // Returns the vector projection of onto other_vector.
    projection(other_vector) {}

    clone() {
        return new Vector2(this.coords[0], this.coords[1])
    }

    rotateRad(angle) {
        const c = Math.cos(angle)
        const s = Math.sin(angle)
        const temp = c * this.coords[1] + s * this.coords[0]
        return new Vector2(c * this.coords[0] - s * this.coords[1], temp)
    }

    rotateDeg(angle) {
        return this.rotateRad(Utils.toRad(angle))
    }

    /**
     * Adds a vector
     * @method add
     * @param {Vector2} vector The vector to add
     */
    add(v) {
        let out = []
        out[0] = this.coords[0] + v.x
        out[1] = this.coords[1] + v.y
        return new Vector2(out[0], out[1])
    }

    /**
     * Subtracts a vector
     * @method add
     * @param {Vector2} vector The vector to add
     */
    subtract(v) {
        let out = []
        out[0] = this.coords[0] - v.x
        out[1] = this.coords[1] - v.y
        return new Vector2(out[0], out[1])
    }

    distance(v) {
        const x = this.coords[0] - v.x
        const y = this.coords[1] - v.y
        return Math.sqrt(x*x + y*y)
    }

    squaredDistance(v) {
        const x = this.coords[0] - v.x
        const y = this.coords[1] - v.y
        return (x*x + y*y)
    }

    // Linearly interpolate between a and b.
    // t goes from 0 to 1
    static lerp(v1, v2, t) {
        t = t < 0 ? 0 : t
        t = t > 1 ? 1 : t
        let out = []
        out[0] = v1.x + (v2.x - v1.x) * t
        out[1] = v1.y + (v2.y - v1.y) * t

        return new Vector2(out[0], out[1])
    }

    static createFromPolarRadians(length, radians) {
        let x = length * Math.cos(radians)
        let y = length * Math.sin(radians)
        return new this(x, y)
    }

    static createFromPolarDegrees(length, degrees) {
        return this.createFromPolarRadians(length, (degrees * Math.PI) / 180)
    }

    static createZero() {
        return new this(0, 0)
    }

    
}
