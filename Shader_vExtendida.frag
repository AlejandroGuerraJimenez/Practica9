#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

void main(){
  // Normalizamos coordenadas y corregimos aspecto
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st = st*2.0 - 1.0;
  st.x *= u_resolution.x / u_resolution.y;

  // coordenadas polares
  float a = atan(st.y, st.x);
  float r = length(st);

  // parámetros
  float N = 7.0;                // nº de pétalos/sectores
  float speed = 0.8;            // velocidad rotación/animación
  float wobble = 0.5;           // amplitud de deformación radial

  // mapear ángulo a sector y crear patrón radial tipo "pétalo"
  float sector = 2.0 * PI / N;
  float ma = mod(a + u_time*speed, sector); // ángulo dentro de cada sector
  float petals = cos(ma * (N * 0.5) + u_time*1.2); // oscilador por sector

  // deformación radial dependiente del ángulo (genera curvatura petalos)
  float radial = 0.45 + wobble * petals * (1.0 - smoothstep(0.0,0.8, r));

  // máscara suavizada del petalo
  float mask = 1.0 - smoothstep(radial-0.02, radial+0.02, r);

  // color base y mezcla
  vec3 bg = vec3(0.05, 0.07, 0.18);
  vec3 colA = vec3(0.94, 0.56, 0.24);
  vec3 colB = vec3(0.15, 0.65, 0.95);

  // variación de color por sector y radio
  float hueMix = 0.5 + 0.5 * sin(ma*6.0 + u_time*0.7);
  vec3 petalColor = mix(colA, colB, hueMix) * (0.6 + 0.6*(1.0 - r));

  vec3 color = mix(bg, petalColor, mask);

  // pequeño brillo central
  color += 0.15 * pow(max(0.0, 1.0 - r*2.0), 2.0);

  gl_FragColor = vec4(color, 1.0);
}
