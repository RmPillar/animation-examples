#define OCTAVES 6

uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSize;
uniform float uNoise;
uniform float uNoiseSpeed;
uniform float uBlur;
uniform float uRatio;
uniform float uSmokiness;
uniform int uOctaves;

uniform sampler2D uImage;
uniform sampler2D uImageHover;

varying vec2 vUv;

float circle(in vec2 _st, in float _radius, in float blurriness){
	vec2 dist = _st;
	return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist,dist)*4.0);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}


float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm (in vec2 st) {
  // Initial values
  float value = 0.0;
  float amplitude = .5;
  float frequency = 0.;

  // Loop of octaves
  for (int i = 0; i < uOctaves; i++) {
    value += amplitude * noise(st);
    st *= 2.;
    amplitude *= .5;
  }

  return value;
}

void main() {
  vec2 res = uResolution * PR;
  vec2 st = (gl_FragCoord.xy/res.xy) - vec2(0.5);
  st.y *= uResolution.y/uResolution.x; // maintain aspect ratio

  vec2 mouse = uMouse * 0.5; // invert mouse
  mouse.y *= uResolution.y/uResolution.x; // maintain aspect ratio
  mouse *= -1.0;

  vec2 circlePos = st + mouse;
  float c = circle(circlePos, uSize, 1.0) * 2.5;
  float cInner = circle(circlePos, uSize - 0.01, 1.0) * 2.5;

  // Adjust uv coordinates to match image aspect ratio and not stretch image
  vec2 uv = vUv;
  uv.y *= uRatio;
  uv.y -= (0.5 - (1. / uRatio) * 0.5) * uRatio;

  float offX = uv.x + sin(uv.y + uTime * uNoiseSpeed);
  float offY = uv.y - (uTime * uNoiseSpeed) - (cos(uTime * (uNoiseSpeed / 100.0)) * 0.1);

  float n = fbm(vec2(offX, offY) * uNoise) - 1.0;
  // float n = snoise3(vec3(offX, offY, uTime * uNoiseSpeed) * uNoise) - 1.0;


  float finalMask = smoothstep(0.5 - uBlur, 1.0, (n + c) * uSmokiness);

  vec4 image = texture2D(uImage, uv);
  vec4 imageHover = texture2D(uImageHover, uv);

  vec4 finalImage = mix(image, imageHover, finalMask);
  vec4 finalFinalImage = mix(image, imageHover, finalMask);

  gl_FragColor = finalImage;

}