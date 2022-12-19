uniform float uBlur;
uniform float uTime;
uniform float uHoverProgress;
uniform float uRatio;

uniform vec2 uMouse;
uniform vec2 uResolution;

uniform sampler2D uImage;
uniform sampler2D uImageHover;
uniform sampler2D uImageShape;

varying vec2 vUv;


void main() {
  // Adjust uv coordinates to match image aspect ratio and not stretch image
  vec2 uv = vUv;
  uv.y *= uRatio;
  uv.y -= (0.5 - (1. / uRatio) * 0.5) * uRatio;

  vec2 res = uResolution * PR;
  vec2 st = (gl_FragCoord.xy/res.xy) - vec2(0.5);
  st.y *= uResolution.y/uResolution.x; // maintain aspect ratio

  // Invert mouse direction and maintain aspect ratio
  vec2 mouse = uMouse * -0.5;
  mouse.y *= uResolution.y / uResolution.x;

  // Create shape mask
  vec2 shapeUv = (st + mouse) * 8.0;
  shapeUv *= 1.5 * 0.8;
  shapeUv /= 1.0;
  shapeUv += vec2(0.5);

  vec4 shape = texture2D(uImageShape, shapeUv);

  float s = (shape.r) * 3.0;

  vec4 image = texture2D(uImage, uv);  
  vec4 imageHover = texture2D(uImageHover, uv);

  float pct = smoothstep(.99, 1.0, clamp(s, 0.0, 1.0));

  vec4 finalImage = mix(image, imageHover, pct);

  gl_FragColor = finalImage;
}