precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
void main(){
 vec2 p=gl_FragCoord.xy/u_resolution,s=p*2.-1.;
 s.x*=u_resolution.x/u_resolution.y;
 float a=atan(s.y,s.x),d=length(s),t=u_time,n=7.;
 float m=mod(a+t*.7,6.28/n),q=cos(m*n*.5+t);
 float e=.45+.45*q*(1.-smoothstep(0.,.8,d));
 float k=1.-smoothstep(e-.02,e+.02,d);
 float h=.5+.5*sin(m*6.+t*.5);
 vec3 A=vec3(.9,.5,.2),B=vec3(.1,.6,.9);
 vec3 c=(A+(B-A)*h)*(1.-d*.6);
 gl_FragColor=vec4(c*k+.1*(1.-d),1.);
}
