/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//width and length of rectangles (chosen for vertices to be on unit circle)
var w=1;
var l=Math.sqrt(3);

//First Rectangle
var a1=[-l/2,w/2,0];
var b1=[l/2,w/2,0];
var c1=[-l/2,-w/2,0];
var d1=[l/2,-w/2,0];


//Second Rectangle
var a2=[-w/2,0,l/2];
var b2=[w/2,0,l/2];
var c2=[-w/2,0,-l/2];
var d2=[w/2,0,-l/2];


//Third Rectangle
var a3=[0,-l/2,w/2];
var b3=[0,l/2,w/2];
var c3=[0,-l/2,-w/2];
var d3=[0,l/2,-w/2];

//ARRAYS for manipulation
var vertices=[];
var colors=[];

//Arrays for WEBGL
var myVertices;
var myColor;

//container for triangles

var myTriangles;

 
function refineTriangle(a,b,c){
    
    //Find Midpoint for each side
    var m1=findMidPoint(a,b);
    var m2=findMidPoint(a,c);
    var m3=findMidPoint(b,c);
       
       
    //Normalize points to get them on the Unit Sphere
    m1=normalizePoint(m1);
    m2=normalizePoint(m2);
    m3=normalizePoint(m3);
   
   
   //Create 4 new triangles and add colors to buffer
    var arr=m1.concat(m2,m3);
    addTriangleColor();
    
    arr=arr.concat(a,m1,m2);
    addTriangleColor();
    
    arr=arr.concat(m1,b,m3);
    addTriangleColor();
    
    arr=arr.concat(m2,m3,c);
    addTriangleColor();
   
    return arr;
    
           
}

function findMidPoint(a,b){
    
    
    return [(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2];
}

function normalizePoint(a){
    
    var r=Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
    
    return [a[0]/r,a[1]/r,a[2]/r];
    
}



function addTriangleColor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    
    colors.push(r,g,b,r,g,b,r,g,b);
    
}

function triangle(a,b,c){
    
    this.a=a;
    this.b=b;
    this.c=c;
    this.addToBuffer=function(flag){
        vertices=vertices.concat(this.a,this.b,this.c);
        addTriangleColor(flag);
    };
    
}




function refineTriangleArray(){
    
    var newTriangles=[];
    
    for(var j=0;j<myTriangles.length;j++){
        
       var r1=refineTriangle(myTriangles[j].a,myTriangles[j].b,myTriangles[j].c);
       
       
       for (var i=0;i<r1.length;i++)
       vertices.push(r1[i]);
       
       var a=[r1[0],r1[1],r1[2]];
       var b=[r1[3],r1[4],r1[5]];
       var c=[r1[6],r1[7],r1[8]];
       newTriangles.push(new triangle(a,b,c));
       
       var a=[r1[9],r1[10],r1[11]];
       var b=[r1[12],r1[13],r1[14]];
       var c=[r1[15],r1[16],r1[17]];
       newTriangles.push(new triangle(a,b,c));
       
       var a=[r1[18],r1[19],r1[20]];
       var b=[r1[21],r1[22],r1[23]];
       var c=[r1[24],r1[25],r1[26]];
       newTriangles.push(new triangle(a,b,c));
       
       var a=[r1[27],r1[28],r1[29]];
       var b=[r1[30],r1[31],r1[32]];
       var c=[r1[33],r1[34],r1[35]];
       newTriangles.push(new triangle(a,b,c));
            
    }
    
    myTriangles=[];
    myTriangles = newTriangles.slice();
   
       
}



function createInitialGeometry(){
    
    vertices=[];
    colors=[];
    
    vertices=a1.concat(b1,c1,c1,b1,d1);
    vertices=vertices.concat(a2,b2,c2,c2,b2,d2);
    vertices=vertices.concat(a3,b3,c3,c3,b3,d3);
    
    //colors for rectangles
    colors=[
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,
                
        0  ,  0,  255,
        0  ,  0,  255,
        0  ,  0,  255,
        0  ,  0,  255,
        0  ,  0,  255,
        0  ,  0,  255,
    
        0  , 255, 0,
        0  , 255, 0,
        0  , 255, 0,
        0  , 255, 0,
        0  , 255, 0,
        0  , 255, 0
        ];
               
    createOriginalTriangles();      
    refineTriangleArray();
    refineTriangleArray();
    refineTriangleArray();
    refineTriangleArray();
   
        
     myVertices=new Float32Array(vertices);
     myColor=new Uint8Array(colors);

}

function createFinalGeometry(){
    //empty arrays
    vertices=[];
    colors=[];
    createOriginalTriangles();
    refineTriangleArray();
    refineTriangleArray();
    refineTriangleArray();

    alert(vertices.length);
    alert(colors.length);
    
    
     myVertices=new Float32Array(vertices);
     myColor=new Uint8Array(colors);
    
}

function createOriginalTriangles(){
      //Here comes 20 Triangles!!
       myTriangles=[];
       myTriangles.push(new triangle(a2,a1,c1));
       myTriangles.push(new triangle(a2,c1,a3));
       myTriangles.push(new triangle(a2,a1,b3));
       myTriangles.push(new triangle(a2,b2,b3));
       myTriangles.push(new triangle(a2,b2,a3));

       myTriangles.push(new triangle(c3,a3,c1));
       myTriangles.push(new triangle(c3,a3,d1));
       myTriangles.push(new triangle(c3,c2,c1));
       myTriangles.push(new triangle(c3,d2,d1));
       myTriangles.push(new triangle(c3,d2,c2));

       myTriangles.push(new triangle(d3,b1,b3));
       myTriangles.push(new triangle(d3,b3,a1));
       myTriangles.push(new triangle(d3,d2,b1));
       myTriangles.push(new triangle(d3,d2,c2));
       myTriangles.push(new triangle(d3,a1,c2));

       myTriangles.push(new triangle(a1,c2,c1));
       myTriangles.push(new triangle(d2,b1,d1));
       myTriangles.push(new triangle(b2,a3,d1));
       myTriangles.push(new triangle(b2,d1,b1));
       myTriangles.push(new triangle(b2,b3,b1));
       
       for(var i=0;i<myTriangles.length;i++)
           myTriangles[i].addToBuffer();
    
    
    
}