#Practica 9 -Shader Generativo “Pétalos Radiales”

**Autor:** Alejandro Guerra Jimenez\

------------------------------------------------------------------------

## 1. Motivación

Este shader nació como un ejercicio de síntesis: crear un efecto visual
dinámico y estéticamente llamativo utilizando el mínimo código GLSL
posible.\
La intención principal fue:

-   Explorar transformaciones en coordenadas normalizadas.
-   Generar un patrón radial basado en ángulos y distancias polares.
-   Integrar suavizados (`smoothstep`) para bordes limpios y
    transiciones naturales.
-   Animar parámetros angulares mediante tiempo (`u_time`).

El resultado es un shader compacto que produce un efecto tipo **florradial \ pulsante**, combinando funciones trigonométricas, mezcla de colores y dinámica temporal.

------------------------------------------------------------------------

## 2. Código original del shader

[**Codigo version Tiny**](/Shader_vTiny.frag)
[**Codigo version Extendida**](/Shader_vExtendida.frag)

------------------------------------------------------------------------

## 3. Desarrollo y explicación detallada

### 3.1 Normalización de coordenadas

El shader comienza normalizando las coordenadas del fragmento:

``` glsl
vec2 p = gl_FragCoord.xy / u_resolution;
vec2 s = p * 2.0 - 1.0;
s.x *= u_resolution.x / u_resolution.y;
```

### 3.2 Conversión a coordenadas polares

``` glsl
float a = atan(s.y, s.x);
float d = length(s);
```

### 3.3 Animación por sectores angulares

``` glsl
float m = mod(a + t * 0.7, 6.28 / n);
float q = cos(m * n * 0.5 + t);
```

### 3.4 Definición del radio animado

``` glsl
float e = .45 + .45 * q * (1. - smoothstep(0., .8, d));
```

### 3.5 Máscara del borde

``` glsl
float k = 1. - smoothstep(e - .02, e + .02, d);
```

### 3.6 Oscilación del color

``` glsl
float h = .5 + .5 * sin(m * 6. + t * .5);
vec3 A = vec3(.9,.5,.2);
vec3 B = vec3(.1,.6,.9);
vec3 c = (A + (B - A) * h) * (1. - d * .6);
```

### 3.7 Color final

``` glsl
gl_FragColor = vec4(c * k + .1 * (1. - d), 1.);
```

------------------------------------------------------------------------

## 4. Resultado visual

El shader crea un patrón radial animado con pulsación, suavizado con
`smoothstep`, gradiente cromático interpolado y un brillo central.

https://github.com/user-attachments/assets/d053d294-613a-4b84-b8ad-01e64487b847

------------------------------------------------------------------------

## 5. Mejoras potenciales

-   Exponer parámetros adicionales como uniforms.
-   Añadir ruido procedural.
-   Modificar funciones para generar espirales u otros patrones.
-   Usar `dFdx/dFdy` para antialiasing avanzado.

------------------------------------------------------------------------

### 6. Fuentes utilizadas
  - [Modesto Castrillón Santana] [Github otsedom](https://github.com/otsedom/otsedom.github.io/tree/main/IG/S9)
  - [Patricio Gonzalez Vivo and Jen Lowe] [The Book of Shaders](https://thebookofshaders.com)

## 7. Autoría

**Alejandro Guerra Jimenez**\
Desarrollador y documentador del shader y de este README.
