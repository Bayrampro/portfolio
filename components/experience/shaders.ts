// Vertex deformation and CoverUV copied from supahfunk/webgl-carousel.
// Only the content fade is added. License: licenses/webgl-carousel-MIT.txt.

export const vertexShader = /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.;
          float wave = cos(angle);
          float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
          pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);

          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
        }
      `;

export const fragmentShader = /* glsl */ `
      uniform sampler2D uTex;
      uniform float uContent;
      uniform float uOpacity;
      uniform vec3 uSurface;
      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;

      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }

      varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          vec3 tex = texture2D(uTex, uv).rgb;
          gl_FragColor = vec4( mix(tex, uSurface, uContent), uOpacity * (1.0 - uContent) );
          #include <colorspace_fragment>
        }
      `;
