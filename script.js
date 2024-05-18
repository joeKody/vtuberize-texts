// FL-Chan eepy

/*

IF YOU ARE READING THIS SHIT.
PLEASE.
DO NOT GO ANY FURTHER.
THIS ABOMINATION CANNOT EVEN BE CALLED A CODE.
I WARNED YOU.

*/

let body = document.body;

// from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function cyrb128(str) {
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

function sfc32(a, b, c, d) {
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

// https://stackoverflow.com/questions/36532307/rem-px-in-javascript
function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function generateSVG(text="FL Chan", vtubeContainer, color="#000000", stroke="#ffffff"){
    // Set Seed for Random
    // call rand() to random a number between 0 and 1
    let seed = cyrb128(text);
    let rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

    // Generate SVG
    // Clear SVG
    vtubeContainer.textContent = "";
let svgns = "http://www.w3.org/2000/svg";
let vtubeSVG = document.createElementNS(svgns, "svg");
vtubeSVG.setAttributeNS(null, "width", "100%")
vtubeSVG.setAttributeNS(null, "height", "100%")
vtubeSVG.setAttribute("xmlns", svgns);
vtubeSVG.setAttribute("overflow", "scroll");
vtubeSVG.innerHTML =
`
blud's browser doesn't even support SVG
<defs>
<filter id="white-outline">
    <feOffset in="SourceGraphic" transform="scale(2)"/>
</filter>
</defs>
`;
let vtubeText = document.createElementNS(svgns, "text");
vtubeText.id = "vtubeText";
vtubeText.setAttributeNS(null, "fill", color);
vtubeText.setAttributeNS(null, "font-size", "7rem");
vtubeText.setAttributeNS(null, "font-family", "Yuruka");
vtubeText.setAttributeNS(null, "letter-spacing", "1rem");
vtubeText.setAttributeNS(null, "stroke", stroke);
vtubeText.setAttributeNS(null, "stroke-width", "2rem");
vtubeText.setAttributeNS(null, "paint-order", "stroke");
vtubeText.setAttributeNS(null, "stroke-linecap", "round");
vtubeText.setAttributeNS(null, "stroke-linejoin", "miter");
// current window size
let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
vtubeText.setAttributeNS(null, "x", `${windowWidth/2 - text.length*convertRemToPixels(7)/2}`);
vtubeText.setAttributeNS(null, "y", `${windowHeight/2 - text.length*convertRemToPixels(1)/2}`);
vtubeSVG.appendChild(vtubeText);
    for (let i = 0; i < text.length; i++){
        let char = text[i];
        //if (char === " "){char = "&nbsp;";}
        let charSpan = document.createElementNS(svgns, "tspan");
        charSpan.textContent = char;
        charSpan.setAttributeNS(null, "dx", `${(rand()*2-1)*20}`);
        charSpan.setAttributeNS(null, "dy", `${(rand()*2-1)*20}`);
        charSpan.setAttributeNS(null, "rotate", `${(rand()*2-1)*10}`);
        vtubeText.appendChild(charSpan);
    }
    
    /*
    let vtubeOutline = document.createElementNS(svgns, "use");
    vtubeOutline.setAttributeNS(null, "href", "#vtubeText");
    vtubeOutline.setAttributeNS(null, "stroke", "white");
    vtubeOutline.setAttributeNS(null, "stroke-width", "4rem");
    vtubeOutline.setAttributeNS(null, "paint-order", "stroke");
    vtubeOutline.setAttributeNS(null, "stroke-linecap", "round");
    vtubeOutline.setAttributeNS(null, "stroke-linejoin", "miter");
    vtubeOutline.setAttributeNS(null, "transform", "scale(2)")
    vtubeSVG.appendChild(vtubeOutline);
    */

    vtubeContainer.appendChild(vtubeSVG);
}


// input setup
let inputContainer = document.createElement("div");
let colorInput = document.createElement("input");
let colorInputStroke = document.createElement("input");
colorInput.setAttribute("type", "color");
colorInputStroke.setAttribute("type", "color");
colorInput.value = "#000000";
colorInputStroke.value = "#ffffff";
let textBoy = document.createElement("input");
textBoy.setAttribute("type", "text");
textBoy.setAttribute("maxLength", "25")
textBoy.setRangeText("FL Chan");
textBoy.style.fontSize = "1.5rem";
textBoy.style.margin = "1rem";


let container = document.createElement("div");
let vtubeContainer = document.createElement("div");
vtubeContainer.classList.add("grow");
vtubeContainer.style.position = "relative";

textBoy.addEventListener("input", () => {
    generateSVG(textBoy.value, vtubeContainer, colorInput.value, colorInputStroke.value);
});
colorInput.addEventListener("input", () => {
    generateSVG(textBoy.value, vtubeContainer, colorInput.value, colorInputStroke.value);
});
colorInputStroke.addEventListener("input", () => {
    generateSVG(textBoy.value, vtubeContainer, colorInput.value, colorInputStroke.value);
});

inputContainer.appendChild(colorInput);
inputContainer.appendChild(colorInputStroke);
inputContainer.appendChild(textBoy);


// DOM SHIT AGAIN
body.appendChild(inputContainer);
body.appendChild(vtubeContainer);
generateSVG("FL Chan", vtubeContainer);