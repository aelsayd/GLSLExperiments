import processing.core.PApplet;
import processing.opengl.PShader;

public class Main extends PApplet {
    public static void main(String[] args){
        PApplet.main("Main", args);
    }

    PShader shader;

    public void settings(){
        size(500,500, P2D);
    }

    public void setup(){
        shader = loadShader("radar.frag");
    }

    public void draw(){
        shader.set("u_resolution", (float) width, (float) height);
        shader.set("u_mouse", (float) mouseX, (float) mouseY);
        shader.set("u_time", millis()/1000f);
        shader.set("u_random", random(1));
        shader(shader);
        rect(0,0,width,height);
    }
}
