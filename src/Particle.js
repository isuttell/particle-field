import Vector from './Vector';

export default class Particle {
  constructor(options) {
    this.options = Object.assign({
      seed: 0
    }, options);

    this.position = new Vector(this.options.x, this.options.y);
    this.vector = new Vector(
      (Math.random() * this.options.speed * 2) - this.options.speed / 2,
      1 + Math.random() * this.options.speed
    );
    this.rotation = this.options.rotation || 0;

    // Size
    this.options.size = this.options.size || 7;
    this.size = 1 + Math.random() * this.options.size;
    this.targetSize = this.options.targetSize || this.options.size;

    this.orbit = this.options.radius * 0.5 + (this.options.radius * 0.5 * Math.random());
  }

  update() {
    let timeIndex = Date.now() / 1000 + this.options.seed;

    let vector = new Vector(this.vector);

    // Add wiggle
    vector.x += (Math.sin(timeIndex) / 2);

    this.position.add(vector);
  }
}
