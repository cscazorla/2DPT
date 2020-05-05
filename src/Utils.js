let Utils = {
    toRad: function(deg) {
        return deg*Math.PI/180
    },
    toDeg: function(rad) {
        return rad*180/Math.PI
    },
}

export { Utils as default }