function wheelOfFortune(selector) {
    const node = document.querySelector(selector);
    if (!node) return;
  
    const spin = node.querySelector('button');
    const wheel = node.querySelector('ul');
    let animation;
    let previousEndDegree = 0;
  
    spin.addEventListener('click', () => {
      if (animation) {
        animation.cancel(); 
      }
  
      const randomAdditionalDegrees = Math.random() * 360 + 1800;
      const newEndDegree = previousEndDegree + randomAdditionalDegrees;
  
      animation = wheel.animate([
        { transform: `rotate(${previousEndDegree}deg)` },
        { transform: `rotate(${newEndDegree}deg)` }
      ], {
        duration: 4000,
        direction: 'normal',
        easing: 'cubic-bezier(0.440, -0.205, 0.000, 1.130)',
        fill: 'forwards',
        iterations: 1
      });
  
      previousEndDegree = newEndDegree;
    });
  }
  
wheelOfFortune('.ui-wheel-of-fortune');

let i = 1;
function changeColor(){
    document.getElementById('color').classList.toggle('colored');
    
    i = 1 - i;
    document.querySelectorAll('li').forEach((item)=>{
        item.style.filter = `grayscale(${i})`;
    });
}