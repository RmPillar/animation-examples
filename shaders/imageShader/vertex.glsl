#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 aPosition;
in vec2 aUv;

// Used to pass in the resolution of the canvas
uniform vec2 uResolution;

// Used to pass the texture coordinates to the fragment shader
out vec2 vUv;

// all shaders have a main function
void main() {

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = aPosition / uResolution;

  // convert from 0->1 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToOne * 2.0 - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

  // pass the uv to the fragment shader
  // The GPU will interpolate this value between points.
  vUv = aUv;
}