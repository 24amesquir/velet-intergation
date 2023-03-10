// different utiles i guess
function to(v, type) {
    return type(v);
}

function CIVector() {
    return new civ.Vector();
}

function sign(v) {
    return v < 0.0 ? -1.0 : 1.0;
}

function toString(v) {
    return v.toString();
}

function toVector2f(v) {
    let result = {x: 0, y: 0};
    result.x = v.x;
    result.y = v.y;
    return result;
}