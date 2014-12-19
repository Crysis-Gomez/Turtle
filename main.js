var that;

$(document).ready(function(){
    var canvas = document.getElementById('myCanvas');
	var context= canvas.getContext('2d');
	var tree = new Tree(canvas,context);
	that = tree;
	
	var canvas = document.getElementById('myCanvas2');
	var context= canvas.getContext('2d');
    var triangle = new Triangle(canvas,context);

    var canvas = document.getElementById('myCanvas3');
	var context= canvas.getContext('2d');
    var snowflake = new Snowflake(canvas,context);


    function changeTree(event, ui){
    	if (event.originalEvent) {
        	tree.redraw(ui.value);
        }
        else {
            //programmatic change
            console.log("change22");
        }
    }

    function changeTriangle(event,ui){
    	if (event.originalEvent) {
        	triangle.redraw(ui.value);
        }
        else {
            //programmatic change
            console.log("change22");
        }
    }

    function changeSnowFlake(event,ui){
    	if (event.originalEvent) {
        	snowflake.redraw(ui.value);
        }
        else {
            //programmatic change
            console.log("change22");
        }
    }

   $('#tree_slider').slider({
   	  range: "max",
      min: 2,
      max: 10,
      value: 2,
	  change: changeTree
	 
	});

   $('#triangle_slider').slider({
   	  range: "max",
      min: 2,
      max: 8,
      value: 2,
	  change: changeTriangle
	 
	});

   $('#snowflake_slider').slider({
   	  range: "max",
      min: 1,
      max: 8,
      value: 2,
	  change: changeSnowFlake
	 
	});

});


var Triangle = function(canvas,context){
	this.canvas = canvas;
	this.context = context;
	this.turtle = new Turtle(context);
	this.turtle.init(200,500);
	this.turtle.setPenColor("#000000");
	this.turtle.right(90);
		
	this.drawTriangle = function(length,depth,angle){
		this.drawLine(length, depth,angle);
	}

	this.drawLine= function(length,depth,angle){
		if (depth <=0){
			this.turtle.forward(length,2,null);
		}else{
			this.drawLine(length / 2, depth - 1, -angle);
			this.turtle.right( +angle);
			this.drawLine(length / 2, depth - 1, +angle);
			this.turtle.right( +angle);
			this.drawLine(length / 2, depth - 1, -angle);
		}	
	}

	this.redraw = function(value){

		this.turtle.init(200,550);
		
		if(value % 2==0){
			this.turtle.right(90);
		}else{
			this.turtle.left(-30);
		}

		this.turtle.setPenColor("#24120a",15);
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.drawTriangle(200, value, 60);
	}

	this.drawTriangle(200, 2, 60);
}






var Tree = function(canvas,context){
	this.canvas = canvas;
	this.context = context;
	this.turtle = new Turtle(context);
	this.turtle.init(350,550);
	this.turtle.setPenColor("#24120a",15);

	this.redraw = function (value){

		this.turtle.init(350,550);
		this.turtle.setPenColor("#24120a",15);
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.drawTree(120,value,30,15);
		this.drawLeaf();
	}

	this.drawLeaf = function(){

 		for (var i = 0; i < this.turtle.savePositions.length; i++) {
 			 var p = this.turtle.savePositions[i];
 			 var x = p[0];
 			 var y = p[1];

 			this.context.beginPath();
 			this.context.strokeStyle ="#0e341a";
	        this.context.fillStyle = 'green';

 		 	this.context.moveTo(x,y);
 		 	this.context.lineWidth = 2;

 			this.context.quadraticCurveTo(x+5, y-5, x+10, y);
			this.context.quadraticCurveTo(x+5, y+5, x, y);
			this.context.moveTo(x,y);
			this.context.quadraticCurveTo(x-5, y-5, x-10, y);
			this.context.quadraticCurveTo(x-5, y+5, x, y);
			this.context.moveTo(x,y);
			this.context.quadraticCurveTo(x+5, y-5, x, y-10);
			this.context.quadraticCurveTo(x-5, y-5, x, y);
			this.context.moveTo(x,y);
			this.context.quadraticCurveTo(x+5, y+5, x, y+10);
			this.context.quadraticCurveTo(x-5, y+5, x, y);
	
		 	this.context.strokeStyle ="#0e341a";
	        this.context.fillStyle = 'green';
	        this.context.fill();
	        this.context.stroke();
	        this.context.closePath();
	        	       
 		};
	}

	this.drawTree = function(length,depth,angle,thinkness){

		if(depth <=0)return;
		this.turtle.forward(length,thinkness,depth);
		
		this.turtle.right(angle);
		this.drawTree(length/1.3,depth-1,angle,thinkness-2);
		this.turtle.left(2* angle);
		this.drawTree(length/1.3,depth-1,angle,thinkness-2);
		this.turtle.right(angle);
		this.turtle.forward(-length,thinkness,depth);
	}

	this.drawTree(120,2,30,15);
	this.drawLeaf();	
}


var Snowflake = function(canvas,context){
	this.canvas = canvas;
	this.context = context;
	this.turtle = new Turtle(context);
	this.turtle.init(200,300);
	this.turtle.right(90);

	this.turtle.setPenColor('#00ff00');

		
	this.drawSnowflake = function(length,depth){
		this.drawFlake(length, depth);
		this.turtle.right(120);
		this.drawFlake(length, depth);
		this.turtle.right(120);
		this.drawFlake(length, depth);
		this.turtle.right(120);
	}

	this.drawFlake = function(length,depth){
		if (depth <= 0) {
			this.turtle.forward(length);
		}
		else {
			this.drawFlake(length / 3, depth - 1);
			this.turtle.left(60);
			this.drawFlake(length / 3, depth - 1);
			this.turtle.right(120);
			this.drawFlake(length / 3, depth - 1);
			this.turtle.left(60);
			this.drawFlake(length / 3, depth - 1);
		}
	}

	this.redraw = function(value){

		this.turtle.init(200,300);
		this.turtle.right(90);
		this.turtle.setPenColor("#00ff00",15);
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.drawSnowflake(200, value);
	}

	this.drawSnowflake(200, 1);
}

var Turtle = function(context){
	this.context = context;
	this.x = 0;
	this.y = 0;
	this.cos = 0.0;
	this.sin = 0.0;
	this.angle=0.0;
	this.thinkness = 2;
	this.savePositions;
	
	this.init = function(x,y){
	
		this.savePositions = new Array();
		this.x = x;
		this.y = y;
		this.setAngle(-90);
		this.closeTurtle();
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