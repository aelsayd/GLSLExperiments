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

float rand (vec2 st) {
    return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))*
    53758.5453123);
}

float noise(float st){
    float si = floor(st);
    float sf = fract(st);

    return mix(rand(vec2(si)),rand(vec2(si+1)), smoothstep(0,1,sf));
}

vec3 rgb(float a, float b, float c){
    return vec3(a/255, b/255, c/255);
}

float metacircle(vec2 st, vec2 pos, float radius){
    st -= pos;
    float color = smoothstep(length(st),length(st)+0.05, radius);
    return color;
}


void main() {
    vec2 st = gl_FragCoord.st/u_resolution-.15;
    st.x-=0.15;

    // cool organic growth noise
    st*=2;
    //float color = metacircle(st,vec2(noise(st.x*u_time/2), noise(st.y*u_time/2)), 0.4);
    //gl_FragColor = vec4(vec3(step(0.1, color)), 1);

    //cellular noise

    vec2 points[7];
    points[0] = vec2(0.1, 0.1);
    points[1] = vec2(0.6, 0.2);
    points[2] = vec2(0.1, 0.7);
    points[3] = vec2(0.23, 0.34553);
    points[4] = vec2(0.5234, 0.43);
    points[5] = vec2(0.123, 0.5443);
    points[6] = vec2(u_mouse.x/u_resolution.x, 0.85 - u_mouse.y/u_resolution.y);

    for(int i = 0; i < 6; i++){
        points[i].x += cos(noise(points[i].x*u_time+i)*PI)/2;
        points[i].y += sin(noise(points[i].y*u_time+i)*PI)/2;
    }

    float color = 1;
    for(int i = 0; i < 7; i++){
        color = min(color, distance(st,points[i]));
    }

    color += step(0.99, 1 - color);

    gl_FragColor = vec4(vec3(2.2*smoothstep(0.5, 1.5,1-color)), 1);
    gl_FragColor = vec4(.3*vec3(color/2, color, color*1.5), 1);

}
