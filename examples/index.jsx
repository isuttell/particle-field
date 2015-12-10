import ParticleField from '../src/ParticleField';

(function() {
  let canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.zIndex = '1000000000';
  canvas.style.pointerEvents = 'none';
  let snow = new ParticleField({
    color: '230, 230, 230',
    el: canvas
  });

  document.getElementById('start').addEventListener('click', function() {
    snow.start();
  });
  document.getElementById('stop').addEventListener('click', function(){
    snow.stopEmitting();
  });
  document.getElementById('halt').addEventListener('click', function(){
    snow.cancel();
  });

})();
