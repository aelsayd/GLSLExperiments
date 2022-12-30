#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_random;
uniform float u_time;
uniform float PI = 3.141592653589;

float rand (vec2 st) {
    return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))*
    43758.5453123);
}

vec3 rgb(float a, float b, float c){
    return vec3(a/255, b/255, c/255);
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    st.y*=5;
    st.x*=30;

    float vx = step(1, mod(st.y, 2));
    if(vx == 0) vx=-1;
    float vy = step(1, mod(st.x, 2));
    if(vy == 0) vy=-1;

    float color = 1-step(0.8, rand(vec2(floor(st.x+15*u_time*vx), floor(st.y+0.1*sin(u_time)*vy))));

    gl_FragColor = vec4(vec3(color)+rgb(51,51,61), 1);
}
