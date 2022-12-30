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


void main() {
    vec2 st = gl_FragCoord.st/u_resolution-0.5;
    st = rotate2d(PI/4)*st;
    st *= 4;

    st += vec2((sin(u_time)+1)*step(1, mod(2*st.y-0.5, 2)), 0);
    st += vec2(0, (sin(u_time)+1)*step(1, mod(2*st.x-0.5, 2)));

//    st += vec2(-u_time*step(1, mod(2*st.y-0.5, 2)), 0);
//    st += vec2(0, (-u_time)*step(1, mod(2*st.y-0.5, 2)));

    st.x = step(1, mod(st.x,2));
    st.y = step(1,mod(st.y, 2));

    //st = fract(st);
    //vec2 yt = fract(st*(cos(u_time)+2)*1.75);

    float color = (1-st.x*st.y)*(st.x+st.y);

    gl_FragColor = vec4(vec3(color)+rgb(51,51,61), 1);
}
