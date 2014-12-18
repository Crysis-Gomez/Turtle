
$(document).ready(function(){
    var canvas = document.getElementById('myCanvas');
	var context= canvas.getContext('2d');
	var tree = new Tree(context);

	var canvas = document.getElementById('myCanvas2');
	var context= canvas.getContext('2d');
    var triangle = new Triangle(context);
});


var Triangle = function(context){

	var turtle = new Turtle(context);
	turtle.init(150,500);
	turtle.setPenColor("#000000");
	turtle.right(90);
	drawTriangle(330, 8, 60);
	

	function drawTriangle(length,depth,angle){
		drawLine(length, depth,angle);
	}

	function drawLine(length,depth,angle){
		if (depth <=0){
			turtle.forward(length,2,null);
		}else{
			drawLine(length / 2, depth - 1, -angle);
			turtle.right( +angle);
			drawLine(length / 2, depth - 1, +angle);
			turtle.right( +angle);
			drawLine(length / 2, depth - 1, -angle);

		}	
	}
}

var Tree = function(context){

	turtle = new Turtle(context);
	turtle.init(350,550);
	turtle.setPenColor("#24120a",15);

	drawTree(120,10,30,15);
	drawLeaf();

	function drawLeaf(){

 		for (var i = 0; i < turtle.savePositions.length; i++) {
 			 var p = turtle.savePositions[i];
 			 var x = p[0];
 			 var y = p[1];

 			context.beginPath();

 			context.moveTo(x,y);
 			context.lineWidth = 2;
 			context.quadraticCurveTo(x+5, y-5, x+10, y);
			context.quadraticCurveTo(x+5, y+5, x, y);
			context.moveTo(x,y);
			context.quadraticCurveTo(x-5, y-5, x-10, y);
			context.quadraticCurveTo(x-5, y+5, x, y);

			context.moveTo(x,y);
			context.quadraticCurveTo(x+5, y-5, x, y-10);
			context.quadraticCurveTo(x-5, y-5, x, y);

			context.moveTo(x,y);
			context.quadraticCurveTo(x+5, y+5, x, y+10);
			context.quadraticCurveTo(x-5, y+5, x, y);
	

		 	context.strokeStyle ="#0e341a";
	        context.fillStyle = 'green';
	        context.fill();
	        context.stroke();
	        context.closePath();
	       
 		};

	}

	function drawTree(length,depth,angle,thinkness){

		if(depth <=0)return;
		turtle.forward(length,thinkness,depth);
		
		turtle.right(angle);
		drawTree(length/1.3,depth-1,angle,thinkness-2);
		turtle.left(2* angle);
		drawTree(length/1.3,depth-1,angle,thinkness-2);
		turtle.right(angle);
		turtle.forward(-length,thinkness,depth);
	}
}





var Turtle = function(context){
	this.context = context;
	this.x = 0;
	this.y = 0;
	this.cos = 0.0;
	this.sin = 0.0;
	this.angle=0.0;
	this.thinkness = 2;
	this.savePositions = new Array();
	
	this.init = function(x,y){
		this.x = x;
		this.y = y;
		this.setAngle(-90);
		this.context.moveTo(this.x,this.y);
	}

	this.back = function(x){
		this.x -= this.cos * x;
		this.y -= this.sin * x;		
		this.moveTurtle();
	}

	this.bk = function(num){
		this.back(num);
	}

	this.setAngle = function(a){
		this.angle = a;
		var a = this.angle * (Math.PI /180);
		this.cos = Math.cos(a);
		this.sin = Math.sin(a);
	}

	this.right = function(a){
		this.setAngle(this.angle+a);
	}
	this.left = function(a){
		this.setAngle(this.angle-a);
	}

	this.setPenColor= function(color,thinkness){
		this.strokeStyle = color;
		this.thinkness = thinkness;

	}	

	this.forward = function(x,thinkness,depth){
		this.x += this.cos *x;
		this.y += this.sin *x;
		this.thinkness = thinkness;
		if(depth < 2)this.savePositions.push([this.x,this.y]);
		this.moveTurtle();
	}

	this.closeTurtle = function(){
		this.context.beginPath();
		this.context.moveTo(this.x,this.y);
	}

	this.moveTurtle = function(){
		this.context.strokeStyle =this.strokeStyle;
		this.context.lineWidth = this.thinkness;
		this.context.lineTo(this.x,this.y);
		this.context.stroke();
		this.context.closePath();
		this.closeTurtle();
	}
}