export default class Vector {
  constructor() {
    let x = 0;
    let y = 0;
    if (arguments[0] instanceof Vector) {
      x = arguments[0].x;
      y = arguments[0].y;
    } else {
      x = arguments[0];
      y = arguments[1];
    }
    this.x = x || 0;
    this.y = y || 0;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  distanceTo(vector, abs) {
    var distance = Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
    return (abs || false) ? Math.abs(distance) : distance;
  }
}
