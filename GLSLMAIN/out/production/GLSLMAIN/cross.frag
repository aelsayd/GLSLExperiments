#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_random;
uniform float u_time;

float circle(vec2 st, vec2 pos, float radius){
    st -= pos;
    float color = smoothstep(length(st),length(st)+0.005, radius);
    return color;
}

float rect(vec2 st, vec2 pos, vec2 size){
    st -= pos -0.5;
    size = (1-size)/2;
    vec2 uv = step(size, st) * step(st, 1-size);
    return uv.x*uv.y;
}

vec3 rgb(float a, float b, float c){
    return vec3(a/255, b/255, c/255);
}

float cross(vec2 st, vec2 pos, vec2 size){
    return rect(st, vec2(pos.x, pos.y-size.x/3.5), size) + rect(st, pos, vec2(size.y, size.x*1.5));
    //vanilla cross
    //return rect(st, pos, size) + rect(st, pos, vec2(size.y, size.x));
}

mat2 rotate2d(float angle){
    return mat2(cos(angle), -sin(angle),
    sin(angle), cos(angle));
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution-vec2(0.5, 0.6);
    st-=vec2(0, 0.1);
    st = rotate2d(sin(u_time*1.5)*0.5)*st;
    st += vec2(0.5,0.6);

//    float color = 1-cross(st, vec2(u_mouse.x/u_resolution.x, 1-u_mouse.y/u_resolution.y), vec2(0.3, 0.1));
    float color = 1-(cross(st, vec2(0.5,0.4), vec2(0.35, 0.1)) + circle(st, vec2(0.5,0.07), 0.05));
    gl_FragColor = vec4(vec3(color, color, color), 0.4);
}
