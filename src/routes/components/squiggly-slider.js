const template = document.createElement('template');
template.innerHTML = `
<style>
.container {
  position: relative;
}
input[type="range"] {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 16px;
}
input[type="range"]::-webkit-slider-thumb {background: transparent; opacity: 0; border: none;}
input[type="range"]::-moz-range-thumb {background: transparent; opacity: 0; border: none;}
input[type="range"]::-ms-thumb {background: transparent; opacity: 0; border: none;}
input:focus-visible {
  outline: 2px solid var(--md-sys-color-outline);
}
</style>
<div class="container">
</div>
`

export class SquigglySlider extends HTMLElement {
  animationDuration = 1000;
  actualCircleRadius = 8;
  rendering = false;
  aniamtionRequest;
  handleInput;

  constructor() {
    super();

    // build shadowDOM
    this.attachShadow({ mode: 'open' });
    
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const container = this.shadowRoot.querySelector('.container');
    container.appendChild(this.canvas);
    this.canvas.ariaHidden = 'true';

    const rangeSlider = document.createElement('input');
    rangeSlider.type = 'range';
    
    rangeSlider.min = 0;
    rangeSlider.max = Math.floor(Math.random() * 21 + 7);
    rangeSlider.value = 1 + Math.floor(Math.random() * (rangeSlider.max - 2));
    
    if (this.getAttribute('title') != null) rangeSlider.title = this.getAttribute('title');
    if (this.getAttribute('min') != null) rangeSlider.min = this.getAttribute('min');
    if (this.getAttribute('max') != null) rangeSlider.max = this.getAttribute('max');
    if (this.getAttribute('step') != null) rangeSlider.step = this.getAttribute('step');
    if (this.getAttribute('value') != null) rangeSlider.value = this.getAttribute('value');
    if (this.getAttribute('aria-label') != null) rangeSlider.ariaLabel = this.getAttribute('aria-label');

    container.appendChild(rangeSlider);

    // define the slider canvas properties
    // [this.canvas.width, this.canvas.height, this.ctx.width, this.ctx.height, this.ctx.lineWidth] = [this.offsetWidth, 50, this.offsetWidth, 50, 4];
    [this.canvas.width, this.canvas.height, this.ctx.width, this.ctx.height, this.length, this.ctx.lineWidth] = [300, 50, 300, 50, 300, 4];
    // setTimeout(() => {
      // [this.canvas.width, this.canvas.height, this.ctx.width, this.ctx.height, this.length, this.ctx.lineWidth] = [this.offsetWidth, 50, this.offsetWidth, 50, this.offsetWidth, 4];
    // }, 250);
    // if (window.innerWidth < 800) {
    //   [this.canvas.width, this.canvas.height, this.ctx.width, this.ctx.height, this.ctx.lineWidth] = [300, 50, 300, 50, 4];
    // }
    this.startingTime = new Date().getTime();
    // this.length = this.ctx.width;
    this.circleRadius = 0;
    this.animatedLength = 0;
    this.ctx.lineCap = 'round';
    this.progress = rangeSlider.value / rangeSlider.max;
    this.fill = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-surface');
    this.activeStroke = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-primary');
    this.passiveStroke = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-on-surface');
    setTimeout(() => {
      this.fill = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-surface');
      this.activeStroke = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-primary');
      this.passiveStroke = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-on-surface');
    }, 500);

    // show slider
    // if (this.getAttribute('show')) {
    // }
    this.show();

    this.handleInput = () => {
      const value = rangeSlider.value;
      const startTime = new Date().getTime();
      const duration = 500;
      const startValue = this.progress;
      const endValue = value / rangeSlider.max;

      const expoOut = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const animateProgress = (timestamp) => {
        const currentTime = new Date().getTime();
        const elapsed = currentTime - startTime;
  
        if (elapsed < duration) {
          const easedProgress = startValue + (endValue - startValue) * expoOut(elapsed / duration);
          this.progress = easedProgress;
          requestAnimationFrame(animateProgress);
        } else {
          this.progress = endValue;
          return
        }
      };
      
      animateProgress();
    };

    this.inputListener = rangeSlider.addEventListener('input', this.handleInput);
  }

  connectedCallback() {
    const raf = (time) => {
      this.animationRequest = requestAnimationFrame(raf);

      if (!this.rendering) return;

      let currentTime = new Date().getTime() - this.startingTime;
      
      // this.ctx.fillStyle = this.fill;
      // this.ctx.rect(0, 0, this.ctx.width, this.ctx.height); 
      // this.ctx.fill();

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.lineCap = 'round';
      this.fill = this.fill;
      this.activeStroke = this.activeStroke;
      this.passiveStroke = this.passiveStroke;
    
      this.ctx.beginPath();
      for (let i = this.circleRadius; i <= this.animatedLength * this.progress - this.circleRadius / 2; i++) {
        this.ctx.strokeStyle = this.activeStroke;
        this.ctx.lineTo(i, 4 * Math.sin(i / 6 + currentTime / 90) + this.ctx.height / 2);
      }
      this.ctx.stroke();
      this.ctx.beginPath();
      for (let j = this.animatedLength * this.progress; j < this.animatedLength - this.circleRadius; j++) {
        this.ctx.strokeStyle = this.passiveStroke;
        this.ctx.lineTo(j, 2 * Math.sin(j / 6 + currentTime / 180) + this.ctx.height / 2);
      }
      this.ctx.stroke();
  
      this.ctx.beginPath();
      this.ctx.fillStyle = this.activeStroke;
      this.ctx.ellipse(
        Math.max(Math.min(this.animatedLength * this.progress, this.length - this.circleRadius), this.circleRadius), 
        this.ctx.height / 2, 
        this.circleRadius, 
        this.circleRadius, 
        0, 0, Math.PI * 2)
      this.ctx.fill();
    }

    this.animationRequest = requestAnimationFrame(raf);
  }

  pause() {this.rendering = false;}
  resume() {this.rendering = true;}

  show() {
    const startTime = new Date().getTime();
    const duration = this.animationDuration;
    const startValue = this.animatedLength;
    const endValue = this.length;
    const endRadius = this.actualCircleRadius;

    const expoOut = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animateProgress = (timestamp) => {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const easedProgress = startValue + (endValue - startValue) * expoOut(elapsed / duration);
        this.animatedLength = easedProgress;
        this.circleRadius = endRadius * expoOut(elapsed * 2 / duration);
        this.resume();
        requestAnimationFrame(animateProgress);
      } else {
        this.animatedLength = endValue;
        this.circleRadius = endRadius;
        return
      }
    };

    animateProgress();
  }

  hide() {
    const startTime = new Date().getTime();
    const duration = this.animationDuration;
    const startValue = this.animatedLength;
    const endValue = 0;
    const endRadius = 0;
    
    const expoOut = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animateProgress = (timestamp) => {
      const currentTime = new Date().getTime();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const x = elapsed / duration;
        const easedProgress = startValue + (endValue - startValue) * expoOut(elapsed / duration);
        this.animatedLength = easedProgress;
        this.circleRadius = this.actualCircleRadius - this.actualCircleRadius * (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
        requestAnimationFrame(animateProgress);
      } else {
        this.animatedLength = endValue;
        this.circleRadius = endRadius;
        this.pause();
        return
      }
    };

    animateProgress();
  }

  changeColors(options) {
    if (options.fill) {
      this.fill = options.fill;
    }
    if (options.activeStroke) {
      this.activeStroke = options.activeStroke;
    }
    if (options.passiveStroke) {
      this.passiveStroke = options.passiveStroke;
    }
  }

  getValue() {return this.shadowRoot.querySelector('input[type="range"]').value}
  setValue(value) {
    this.shadowRoot.querySelector('input[type="range"]').value = value;
    this.handleInput();
  }

  disconnectedCallback() {
    cancelAnimationFrame(this.animationRequest);
    this.shadowRoot.querySelector('input').removeEventListener('input', this.handleInput);
  }
}

// window.customElements.define('squiggly-slider', SquigglySlider);

export function resetSliderTheme() {
  document.querySelectorAll('squiggly-slider').forEach(slider => {
    slider.fill = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-surface');
    slider.activeStroke = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-primary');
    slider.passiveStroke = getComputedStyle(document.documentElement).getPropertyValue('--md-sys-color-on-surface');
  })
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',({ matches }) => {
  resetSliderTheme();
})
