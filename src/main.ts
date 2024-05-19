import './style.css'
import { SVG } from '@svgdotjs/svg.js'

// from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function cyrb128(str: string) {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function sfc32(a: any, b:any, c:any, d:any) {
  return function() {
    a |= 0; b |= 0; c |= 0; d |= 0;
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}

function generateSVG(vtubeText: string, colorFill: string, colorStroke: string, colorShadow: string, vtubeContainer: HTMLDivElement) {
  // Set Seed for Random
  // call rand() to random a number between 0 and 1
  let seed = cyrb128(vtubeText);
  let rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

  while (vtubeContainer.hasChildNodes()) {
    vtubeContainer.removeChild(vtubeContainer.lastChild as Node);
  }
  let draw = SVG().addTo(vtubeContainer).size('100%', '100%');
  draw.viewbox(0, 0, vtubeContainer.clientWidth, vtubeContainer.clientHeight);

  let outline = draw.text((add) => {
    for (let i = 0; i < vtubeText.length; i++) {
      add.tspan(vtubeText[i])
      .attr({
        'letter-spacing': '1.5rem',
        'dx': (rand()*2 - 1) * 30,
        'dy': (rand()*2 - 1) * 30,
        'rotate': (rand() * 2 - 1) * 10,
      })
    }
  }).attr({
    'font-family': 'YurukaSTD,JKBaitoey,sans-serif',
    'font-size': '7rem',
    'fill': colorStroke,
    'stroke': colorStroke,
    'stroke-width': '5rem',
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round',
    'paint-order': 'stroke',
  }).move(0, 0).center(vtubeContainer.clientWidth / 2, vtubeContainer.clientHeight / 2);

  //let outline2 = outline.clone().fill(colorFill).stroke(colorFill).scale(0.8);
  let shadow = outline.clone().fill(colorShadow).stroke(colorShadow).dx(10).dy(10);
  let text = outline.clone().fill(colorFill)
    .attr({
      'stroke': colorStroke,
      'stroke-width': '1rem',
      'paint-order': 'stroke',
      'style': '0 0 0 rgba(0, 0, 0, 0)'
  });
  shadow.addTo(draw).back();
  text.addTo(draw);
}

let vtubeText = document.getElementById('vtube-text') as HTMLInputElement;
let vtubeColorFill = document.getElementById('vtube-color-fill') as HTMLInputElement;
let vtubeColorStroke = document.getElementById('vtube-color-stroke') as HTMLInputElement;
let vtubeColorShadow = document.getElementById('vtube-color-shadow') as HTMLInputElement;
//let downloadButton = document.getElementById('download-button') as HTMLButtonElement;

vtubeText.value = 'FL Chan';
vtubeColorFill.value =   '#000000';
vtubeColorStroke.value = '#ffffff';
vtubeColorShadow.value = '#1f1f1f';

let vtubeContainer = document.getElementById('vtube-container') as HTMLDivElement;
generateSVG(vtubeText.value, vtubeColorFill.value, vtubeColorStroke.value, vtubeColorShadow.value, vtubeContainer);

vtubeText.addEventListener('input', () => {
  generateSVG(vtubeText.value, vtubeColorFill.value, vtubeColorStroke.value, vtubeColorShadow.value, vtubeContainer);
});
vtubeColorFill.addEventListener('input', () => {
  generateSVG(vtubeText.value, vtubeColorFill.value, vtubeColorStroke.value, vtubeColorShadow.value, vtubeContainer);
});
vtubeColorStroke.addEventListener('input', () => {
  generateSVG(vtubeText.value, vtubeColorFill.value, vtubeColorStroke.value, vtubeColorShadow.value, vtubeContainer);
});
vtubeColorShadow.addEventListener('input', () => {
  generateSVG(vtubeText.value, vtubeColorFill.value, vtubeColorStroke.value, vtubeColorShadow.value, vtubeContainer);
});
