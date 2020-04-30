# Introduction
2D Physics Tools (2DPT) is a collection of tools written in Javascript to help you implement 2D physics in your videogames and simulations.

![screenshot](/img/screenshot.png)

# Components
* Game Loop: A scaffolding of a game loop using HTML and JS requestanimframe. 
* Collissions:
    - Detection: A set of libraries to help you detect the collision between a circle and a line, a line and a rectangle, etc.
    - Resolution: What happens after the collision is detected? Which are the new velocities of each object?
* Math: Some helpers and objects to help you deal with Vectors, transformation from Deg to Rad
* Numerical Integration: Implementation of the Runge-Kutta, Verlet, etc. methods for solving systems of differential equations
* Rendering: Some helpers to draw in the Canvas

# Usage

## Collision Circle - Rectangle
```
import CollisionDetector from '../../src/CollisionDetector.js'
import Rendering from '../../src/Rendering.js'

let canvas = null
let ctx = null

let circle = {
    x: 200,
    y: 200,
    radius: 50
}

let rectangle = {
    x: 200,
    y: 200,
    width: 200,
    height: 200
}

window.onload = function () {
    canvas = document.getElementById('canvas')
    canvas.width = 800
    canvas.height = 800

    ctx = canvas.getContext('2d')

    window.addEventListener('mousemove', function (e) {
        circle.x = e.offsetX
        circle.y = e.offsetY
    })

    update()
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Rectancle
    if(CollisionDetector.circleRectangle(circle, rectangle)) {
        Rendering.rectangle(ctx, rectangle, 'red')
    } else {
        Rendering.rectangle(ctx, rectangle, 'green')
    }

    // Circle
    Rendering.circle(ctx, circle, 'blue')

    window.requestAnimationFrame(update)
}
```

# Examples
Checkout the examples folder for examples with collisions, math, etc.

# To Do
* Everything

# License
Released under the [MIT License](http://www.opensource.org/licenses/mit-license.
php).