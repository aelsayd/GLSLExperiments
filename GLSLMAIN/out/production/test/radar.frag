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

vec3 emptyCircle(vec2 st, vec2 pos, float radius){
    st -= pos;
    float color = smoothstep(length(st),radius, radius+0.001)*
        smoothstep(length(st), radius, radius-0.001);
    //color += smoothstep(length(1-st),radius, radius+0.001);
    color = 1- color;
    return vec3(color/2, color, color*1.5);
}

vec3 emptyCircle2(vec2 st, vec2 pos, float radius){
    return emptyCircle(st,pos,radius)*0.2;
}

vec3 emptyCircle3(vec2 st, vec2 pos, float radius){
    st -= pos;
    float color = smoothstep(length(st),radius, radius+0.0008);
    //color += smoothstep(length(1-st),radius, radius+0.001);
    color = 1- color;
    return 0.2*vec3(color/2, color, color*1.5);
}

float rect(vec2 st, vec2 pos, vec2 size){
    st -= pos -0.5;
    size = (1-size)/2;
    vec2 uv = smoothstep(size, size+0.001, st) * smoothstep(st, st+0.001,1-size);
    return uv.x*uv.y;
}

vec3 rgb(float a, float b, float c){
    return vec3(a/255, b/255, c/255);
}

float cross(vec2 st, vec2 pos, vec2 size){
    return step(0.5, rect(st, pos, size) + rect(st, pos, vec2(size.y, size.x)));
}

float yezuzCross(vec2 st, vec2 pos, vec2 size){
    return step(0.1,rect(st, vec2(pos.x, pos.y+size.x/3.5), size) +
    rect(st, pos, vec2(size.y, size.x*1.5)));
}

mat2 rotate2d(float angle){
    return mat2(cos(angle), -sin(angle),
    sin(angle), cos(angle));
}

void main(){
    vec2 st = gl_FragCoord.st/u_resolution;

    vec3 color = vec3(0.01,0.04,0.08);

    //background
    color += emptyCircle(st, vec2(0.5), 0.125);
    color += emptyCircle(st, vec2(0.32,0.32), 0.1);
    color += cross(st, vec2(0.32,0.32), vec2(0.1, 0.01))/2;
    color += emptyCircle(st, vec2(0.5), 0.4);
    color += emptyCircle(st, vec2(0.5), 0.45);

    //color += vec3(cross(rotate2d(u_time)*st, vec2(0.5), vec2(0.1, 0.01)));
    color +=  emptyCircle(st, vec2(0.5), 0.05);
    //color += vec3(cross(rotate2d(0.78)*(st-0.5), vec2(0), vec2(2, 0.05))/4);

    //rotating line
    float line = rect(rotate2d(-u_time)*(st-0.5), vec2(0.225,0), vec2(0.45, 0.01));
    line += rect(rotate2d(100+u_time/-50)*(st-0.5), vec2(0.235,0), vec2(0.373, 0.02))/2;
    line += rect(rotate2d(2000+u_time/-200)*(st-0.5), vec2(0.225,0), vec2(0.35, 0.035))/2;
    color += vec3(line*0.25, line*0.55, 0.75*line);

    //float c = cross(rotate2d(3.14/4)*(st-0.5), vec2(0), vec2(0.4, 0.01))/8;
    float c = cross(rotate2d(sin(u_time)*3.14)*(st-0.5), vec2(0), vec2(0.4, 0.01))/8;
    color += vec3(0,c*0.5,c);
    color += emptyCircle2(st, vec2(0.5), 0.01);
    color += 2*emptyCircle2(st, vec2(0.5), 0.3 + sin(u_time)/10);
//    color += 2*emptyCircle2(st, vec2(0.5), 0.2);
//    color += emptyCircle2(st, vec2(0.5), 0.3);
    color += emptyCircle2(st, vec2(0.5), 0.42);

    //floaticles
    color += vec3(circle(st-0.5, vec2(cos(u_time*0.2), sin(u_time*0.1))/3, 0.01));
    color += vec3(circle(st-0.45, vec2(cos(u_time*0.05), sin(u_time*0.1))/3, 0.01));
    color += vec3(circle(st-0.3, vec2(cos(u_time*0.1), sin(u_time*0.1))/3, 0.01));

    gl_FragColor = vec4(color,0.4);
}
