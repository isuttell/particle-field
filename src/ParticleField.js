import Vector from './Vector';
import Particle from './Particle';
import { result } from './util';

export default class Animator {
  constructor(options) {
    // Set some defaults and extend them
    this.options = Object.assign({
        emitPerSecond: 10,
        maxParticles: 1000,
        color: '255, 255, 255',
        speed: 2,
        width: function(){
          return window.innerWidth;
        },
        height: function() {
          return window.innerHeight;
        },
        size: 2,
        ghostTrails: false
    }, options);

    this.el = this.options.el;
    this.ctx = this.el.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.loop = this.loop.bind(this);

    this.mount();
    this.handleResize();
    this.start();
  }

  mount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseMove(event) {
    this.mouse = new Vector(event.clientX * this.dpr, event.clientY * this.dpr);
  }

  handleMouseLeave() {
    this.mouse = void 0;
  }

  start() {
    this.particles = this.particles || [];
    this.shouldEmit = true;
    this.loop();
  }

  stopEmitting() {
    this.shouldEmit = false;
  }

  get running() {
    return !!this.requestId;
  }

  cancel() {
    this.particles = [];
    window.cancelAnimationFrame(this.requestId);
    this.clear();
  }

  emit() {
    let delay = Math.max(1000 / this.options.emitPerSecond, 1);
    if (this.shouldEmit && this.particles.length < this.options.maxParticles && (!this._lastEmit || Date.now() - this._lastEmit > delay)){
        this.addParticle();
        this._lastEmit = Date.now();
    } else if (!this.shouldEmit && this.particles.length === 0) {
      // Wait until all the particles are cleared then clean up
      this.cancel();
    }
  }

  loop() {
    // Generate new particles
    this.emit();

    // Throttle the rendering
    if (!this._lastRender || Date.now() - this._lastRender > 16) {
      // Calculate new positions
      this.update();

      // Clear Screen
      this.clear();

      // Render it to canvas
      this.render();

      // Save the last render time
      this._lastRender = Date.now();
    }

    // Loop
    this.requestId = window.requestAnimationFrame(this.loop);
  }

  addParticle() {
    let particle = new Particle({
      ...this.options,
      x: Math.random() * this.width * 1.1,
      y: this.options.size * -2,
      seed: Math.random() * 100
    });

    this.particles.push(particle);
  }

  clear() {
    if (!this.options.ghostTrails) {
      this.ctx.clearRect(0, 0 , this.width, this.height);
    } else {
      this.ctx.globalCompositeOperation = 'multiply';
      this.ctx.rect(0, 0 , this.width, this.height);
      this.ctx.fillStyle = 'rgba(33, 33, 33)';
      this.ctx.fill();
    }
  }

  unmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  handleResize() {
    this.width = this.el.width = result(this.options, 'width') * this.dpr;
    this.height = this.el.height = result(this.options, 'height') * this.dpr;
    this.el.style.width = result(this.options, 'width') + 'px';
    this.el.style.height = result(this.options, 'height') + 'px';
  }

  update() {
    var index = -1;
    var length = this.particles.length;
    while (++index < length) {
      var point = this.particles[index];
      if (!point) {
        continue;
      }
      point.update(this.mouse);

      if (point.position.y > (this.height + this.options.size)) {
        this.particles.splice(index, 1);
      }
    }
  }

  render() {
    let index = -1;
    let length = this.particles.length;
    this.ctx.globalCompositeOperation = 'lighten';
    while (++index < length) {
      let point = this.particles[index];
      let opacity = point.size / this.options.size;
      this.ctx.fillStyle = `rgba(${this.options.color}, ${opacity * 0.3})`;
      this.ctx.beginPath();
      this.ctx.arc(point.position.x, point.position.y, point.size * this.dpr, Math.PI * 2, 0, false);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(point.position.x, point.position.y, point.size * 0.6 * this.dpr, Math.PI * 2, 0, false);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }
}
