/**
 * The fourth order Runge-Kutta integration method
 *
 * @param derives Array of differential equations which needed to integrate
 * @param {Number}   tStart  Initial value problem: t0
 * @param {Array}    yStart  Initial value problem: y0
 */
var RungeKutta4 = function (derives, tStart, yStart) {
    this.derives = derives
    this.t = tStart
    this.y = yStart || []
    this.dimension = this.y.length

    // cache the k1, k2, k3, k4 of each step
    this._k1
    this._k2
    this._k3
    this._k4
}

RungeKutta4.prototype = {
    /**
     * Calculate each step according to step-size h
     * 
     * @param  {Number} dt Time step
     * @return {Array} calculated result at this.t
     */
    step: function (dt) {
        var derives = this.derives,
            t = this.t,
            dimension = this.dimension

        var i,
            _y = []

        // Alias: f() <=> this.derives()
        //        tn  <=> this.t
        //        Yn  <=> this.y
        //        K1  <=> this._k1

        // calculate _k1: K1 = f(tn, Yn)
        this._k1 = derives(t, this.y)

        // calculate _k2: K2 = f(tn + 0.5 * dt, Yn + 0.5 * dt * K1)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y[i] + dt * 0.5 * this._k1[i]
        }
        this._k2 = derives(t + dt * 0.5, _y)

        // calculate _k3: K3 = f(tn + 0.5 * dt, Yn + 0.5 * dt * K2)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y[i] + dt * 0.5 * this._k2[i]
        }
        this._k3 = derives(t + dt * 0.5, _y)

        // calculate _k4: K4 = f(tn + dt, Yn + dt * K3)
        for (i = 0; i < dimension; i++) {
            _y[i] = this.y[i] + dt * this._k3[i]
        }
        this._k4 = derives(t + dt, _y)

        // calculate yNett: Y(n + 1) = Yn + dt / 6 * (K1 + 2 * K2 + 2 * K3 + K4)
        for (i = 0; i < dimension; i++) {
            this.y[i] +=
                (dt / 6) *
                (this._k1[i] + 2 * this._k2[i] + 2 * this._k3[i] + this._k4[i])
        }

        // calculate tNett: t(n + 1) = tn + dt
        this.t += dt

        return { y: this.y, t: this.t }
    }
}

export {RungeKutta4 as default}