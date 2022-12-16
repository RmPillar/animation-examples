precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;


float circle(in vec2 _st, in float _radius, in vec2 _centre){
  vec2 dist = _st-vec2(_centre);

	return 1.0 - smoothstep(_radius-(_radius * 0.01), _radius+(_radius * 0.01), dot(dist, dist) * 4.0);
}

void main()
{
    // float strength = step(0.25, distance(vUv, vec2(0.5)));
    vec4 textureColor = texture2D(uTexture, vUv);
    // gl_FragColor = textureColor * strength;

    vec2 st = gl_FragCoord.xy/uResolution.xx;

	vec3 color = 1.0 - vec3(circle(st, 0.1,uMouse));

	gl_FragColor = vec4( color, 1.0 ) * textureColor;
}