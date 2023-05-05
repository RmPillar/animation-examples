uniform vec2 uResolution;

uniform float uTime;
uniform float uRatio;
uniform float uHoverProgress;

uniform sampler2D uImage;

varying vec2 vUv;

void main() {
  // Adjust uv coordinates to match image aspect ratio and not stretch image
  vec2 uv = vUv;
  uv.y *= uRatio;
  uv.y -= (0.5 - (1. / uRatio) * 0.5) * uRatio;

  float mask = 1.0 - step(uHoverProgress, ((vUv.x + (vUv.y / 1.2)) / 2.0));

  vec4 imageTexture = texture2D(uImage, uv);

  vec4 finalImage = mix(imageTexture, vec4(0.0), mask);

  gl_FragColor =  finalImage;
}
