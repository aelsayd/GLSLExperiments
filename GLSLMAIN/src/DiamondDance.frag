#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_random;
uniform float u_time;
uniform float PI = 3.141592653589;

mat2 rotate2d(float angle){
    return mat2(cos(angle), -sin(angle),
    sin(angle), cos(angle));
}

vec3 rgb(float a, float b, float c){
    return vec3(a/255, b/255, c/255);
}

float rect(vec2 st, vec2 pos, vec2 size){
    st -= pos -0.5;
    size = (1-size)/2;
    vec2 uv = smoothstep(size, size+0.001, st) * smoothstep(st, st+0.001,1-size);
    return uv.x*uv.y;
}

float cross(vec2 st, vec2 pos, vec2 size){
    return clamp(0,1, rect(st, pos, size) + rect(st, pos, vec2(size.y, size.x)));
}

float circle(vec2 st, vec2 pos, float radius){
    st -= pos;
    float color = smoothstep(length(st),length(st)+0.005, radius);
    return color;
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution-0.5;
    st = rotate2d(PI/4)*st;
    vec2 yt = fract(st*(cos(u_time)+2)*1.75);
    //float color = cross(yt, vec2(0.5,0.5), vec2(1.01,0.2));
    vec3 color = rect(yt, vec2(0.25*sin(u_time)), vec2(0.301)) * rgb(145,82,156);
    color += rect(yt, vec2(0.75), vec2(0.501,0.501)) * rgb(127,131,131);

    if(color == vec3(0))
        color = vec3(255);

    gl_FragColor = vec4(color, 1);
}
