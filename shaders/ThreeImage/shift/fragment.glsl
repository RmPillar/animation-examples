

uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSize;

uniform sampler2D uImage;

varying vec2 vUv;

        float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
          uv -= disc_center;
          uv*=uResolution;
          float dist = sqrt(dot(uv, uv));
          return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        }


void main() {
  vec2 newUv = vUv;

  vec2 res = uResolution * PR;
  vec2 st = (gl_FragCoord.xy/res.xy) - vec2(0.5);
  st.y *= uResolution.y/uResolution.x; // maintain aspect ratio

  vec2 mouse = uMouse * 0.5; // invert mouse
  mouse.y *= uResolution.y/uResolution.x; // maintain aspect ratio
  mouse *= -1.0;

  vec2 circlePos = st + mouse;
  float c = circle(vUv, mouse, 0.0, 0.2);

float r = texture2D(uImage, newUv.xy += c * (0.1 * .5)).x;
            float g = texture2D(uImage, newUv.xy += c * (0.1 * .525)).y;
            float b = texture2D(uImage, newUv.xy += c * (0.1 * .55)).z;

      vec4 color = vec4(r, g, b, 1.);
            gl_FragColor = color;
}