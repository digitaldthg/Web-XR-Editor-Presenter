import {
	Vector3,
	Matrix4
} from 'three'

const motionBlurVertexShader = `
	varying vec2 vUv;

	void main() {

		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		vUv = uv;

	}`

const motionBlurFragmentShader = `
	varying vec2 vUv;

	uniform sampler2D tDepth;
	uniform sampler2D tColor;

	uniform mat4 clipToWorldMatrix;
	uniform mat4 previousWorldToClipMatrix;

	uniform vec3 cameraMove;

	uniform float velocityFactor;
	uniform float delta;

	void main() {

		float zOverW = texture2D(tDepth, vUv).x;

		// clipPosition is the viewport position at this pixel in the range -1 to 1.
		vec4 clipPosition = vec4(vUv.x * 2. - 1., vUv.y * 2. - 1., zOverW * 2. - 1., 1.);

		vec4 worldPosition = clipToWorldMatrix * clipPosition;
		worldPosition /= worldPosition.w;

		vec4 previousClipPosition = worldPosition;

		// Reduce motion blur due to camera translation especially at the screen center.
		previousClipPosition.xyz -= cameraMove * (
			1. - smoothstep(.3, 1., clamp(length(clipPosition.xy), 0., 1.))
		);

		previousClipPosition = previousWorldToClipMatrix * previousClipPosition;
		previousClipPosition /= previousClipPosition.w;

		vec2 velocity = velocityFactor * (clipPosition - previousClipPosition).xy / delta * 16.67;

		vec4 finalColor = vec4(0.);
		vec2 offset = vec2(0.);
		float weight = 0.;
		const int samples = 20;
		for(int i = 0; i < samples; i++) {
    			offset = velocity * (float(i) / (float(samples) - 1.) - .5);
    			vec4 c = texture2D(tColor, vUv + offset);
			finalColor += c;
		}
		finalColor /= float(samples);
		gl_FragColor = vec4(finalColor.rgb, 1.);

		// debug: view velocity values
		// gl_FragColor = vec4(abs(velocity), 0., 1.);

		// debug: view depth buffer
		// gl_FragColor = vec4(vec3(zOverW), 1.);
	}`

export const motionBlurShader = {

  uniforms: {
    tDepth: { type: 't', value: null },
    tColor: { type: 't', value: null },

    velocityFactor: { type: 'f', value: 1 },
    delta: { type: 'f', value: 16.67 },

    clipToWorldMatrix: { type: 'm4', value: new Matrix4() },
    previousWorldToClipMatrix: { type: 'm4', value: new Matrix4() },

    cameraMove: { type: 'v3', value: new Vector3() }
  },

  vertexShader: motionBlurVertexShader,
  fragmentShader: motionBlurFragmentShader
}