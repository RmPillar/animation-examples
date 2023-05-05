uniform float uSize;
uniform float uHoverProgress;

void main()
{


  float distanceFromBottomLeft =  distance(position.x, 0.0);

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // float readyToMove = step(position.x, uHoverProgress);

  // float relativeProgress = uHoverProgress - 0.5;

  modelPosition.x += position.x - (position.x - );
  // modelPosition.y += ((distanceFromBottomLeft)) * uHoverProgress;

  modelPosition.x *= 1.0 - uHoverProgress;

  vec4 viewPosition = modelViewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = uSize;
}