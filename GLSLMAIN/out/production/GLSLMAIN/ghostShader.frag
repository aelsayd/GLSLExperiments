#ifdef GL_ES
precision mediump float;
#endif

#define PROCESSING_COLOR_SHADER

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_random;
uniform float u_time;

float circle(vec2 st, float radius, vec2 pos){
    st -= 0.5 + pos;
    float color = smoothstep(length(st), 0, radius/2);
    return color;
}

vec3 rgb(float a, float b, float c){
    return vec3(a/255, b/255, c/255);
}

void main() {
    vec2 st = gl_FragCoord.st/u_resolution;
    float color = circle(st, 0.4, vec2(0,0));

    // Large sinoids
    color += circle(st, 0.07, vec2(cos(u_time*2)/4, sin(u_time*4)/4));
    color *= circle(st, 0.03, vec2(-cos(u_time*3)/4, -sin(u_time*4)/4));
    color *= circle(st, 0.05, vec2(-cos(u_time*6)/4, -sin(u_time*4)/4));
    color *= circle(st, 0.02, vec2(sin(u_time*4)/4, -0.2));

    //small orbitals
//    color /= circle(st, 0.01, vec2(-cos(u_time*4)/10, -sin(u_time*4)/10));
//    color /= circle(st, 0.01, vec2(cos(u_time*4)/10, sin(u_time*4)/10));
    color /= circle(st, 0.008, vec2(-0.07, 0.08));
    color /= circle(st, 0.008, vec2(0.07, 0.08));
    color /= circle(st, 0.02, vec2(0, -0.08));

    //core
    //color /= circle(st, 0.01, vec2(0,0));

    if(color < 1)
        gl_FragColor = vec4(vec3(1,1,1), 1);
    else
        gl_FragColor = vec4(rgb(133, 178, 209), 0.1);
}