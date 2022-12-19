uniform vec2 uResolution;

uniform float uTime;
uniform float uRatio;
uniform float uGlitchColorOffset;
uniform float uGlitchPower;
uniform float uGlitchRate;
uniform float uGlitchSpeed;
uniform float uGlitchBlockSize;
uniform float uGlitchXOffset;
uniform float uGlitchYOffset;
uniform float uEnableGlitch;

uniform sampler2D uImage;

varying vec2 vUv;


float random(float seed) {
	return fract(543.2543 * sin(dot(vec2(seed, seed), vec2(3525.46, -54.3415))));
}

void main() {
  // Adjust uv coordinates to match image aspect ratio and not stretch image
  vec2 uv = vUv;
  uv.y *= uRatio;
  uv.y -= (0.5 - (1. / uRatio) * 0.5) * uRatio;

  // Adjust uv coordinates to seperate into glitch blocks and offset x and y coordinates
	uv.x += ((random((trunc(uv.y * uGlitchBlockSize) / uGlitchBlockSize) +	uTime) - 0.5)) * uGlitchPower * uEnableGlitch * uGlitchXOffset;
	uv.y += (random((trunc(uv.y * uGlitchBlockSize) / uGlitchBlockSize) +	uTime) - 0.5) * uGlitchPower * uEnableGlitch * uGlitchYOffset;

  // Offset red and blue color channels
  vec4 pixelColor = texture2D(uImage, uv);
	pixelColor.r = mix(pixelColor.r, texture2D(uImage, uv + vec2(uGlitchColorOffset * random(uTime), 0.0)).r ,	uEnableGlitch);
	pixelColor.b = mix(pixelColor.b, texture2D(uImage, uv + vec2(-uGlitchColorOffset * random(uTime), 0.0 )).b ,	uEnableGlitch);

  gl_FragColor =  pixelColor;
}
