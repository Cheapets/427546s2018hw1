var drawCanvas = document.getElementById("DrawingSpace");
var ctx = drawCanvas.getContext("2d");
ctx.fillStyle = "#e6e6e6";
ctx.fillRect(0,0,500,500);

var polygonPairs = new Array();
var pairs = 0;

function drawRect(){
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;
	
	var x1 = +document.getElementById("xRect").value;
	var y1 = +document.getElementById("yRect").value;
	var width = +document.getElementById("widthRect").value;
	var height = +document.getElementById("heightRect").value;
	var x,y;
	for(x = x1; x < x1 + width;x++){
		drawPoint(x,y1,1,1);
	}
	for(x = x1; x < x1 + height;x++){
		drawPoint(x,y1+width);
	}
	for(y = y1; y < y1 + width;y++){
		drawPoint(x1,y);
	}
	for(y = y1; y < y1 + height;y++){
		drawPoint(x1+height,y,1,1);
	}

	document.getElementById("demo").innerHTML = "RECTANGLE HAS BEEN DRAWN";
}
            
function drawLine(){
	console.log("Drawline Function hit")
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;
	var x1 = +document.getElementById("x1Line").value;
	var y1 = +document.getElementById("y1Line").value;
	var x2 = +document.getElementById("x2Line").value;
	var y2 = +document.getElementById("y2Line").value;
	
	var dx,dy,d,dd;
	var x,y,sx,sy = 0;
	dx = Math.abs(x2 - x1);
	dy = Math.abs(y2 - y1);
	var sx = (x1 < x2) ? 1 : -1;
	var sy = (y1 < y2) ? 1 : -1;
	y = y1;
	x = x1;
	
	d = dx - dy;
	
	var line_draw = true;

	while(line_draw){
		drawPoint(x, y);
		if (x === x2 && y === y2){
			line_draw = false;
		}
		dd = 2 * d;
		if (dd > -1 * dy)
		{
			d = d - dy;
			x = x + sx;
		}
		if (dd < dx)
		{
			d = d + dx;
			y = y + sy;
		}
   }
	
	document.getElementById("demo").innerHTML = "LINE HAS BEEN DRAWN";
}
            
function drawPoint(x, y){
	console.log("Draw Point hit");
  var thick = +document.getElementById("thickness").value;
  ctx.beginPath();
  var dcolor = document.getElementById("dcolor").value;
  ctx.fillStyle = dcolor;

  ctx.fillRect(x,y,1,1);
  ctx.closePath();

  ctx.fill();
}
            
function drawCircle(){
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;

	var xOrigin = +document.getElementById("xCircle").value;
	var yOrigin = +document.getElementById("yCircle").value;
	var radius  = +document.getElementById("radiusCircle").value;
	
	var x = radius;
	var y = 0;
	var err = 0;
	
	while(x >= y)
	{
		drawPoint(xOrigin + x, yOrigin + y);
		drawPoint(xOrigin + y, yOrigin + x);
		drawPoint(xOrigin - y, yOrigin + x);
		drawPoint(xOrigin - x, yOrigin + y);
		drawPoint(xOrigin - x, yOrigin - y);
		drawPoint(xOrigin - y, yOrigin - x);
		drawPoint(xOrigin + y, yOrigin - x);
		drawPoint(xOrigin + x, yOrigin - y);
		
		ctx.fill();
		
		if (err <= 0)
		{
			y += 1;
			err += 2*y + 1;
		}
		if (err > 0)
		{
			x -= 1;
			err -= 2*x + 1;
		}
	}
	
	document.getElementById("demo").innerHTML = "CIRCLE HAS BEEN DRAWN";
}

function drawEllipse(){ 
	
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;
	
	var xOrigin = + document.getElementById("xEllipse").value;
	var yOrigin = + document.getElementById("yEllipse").value;
	var radiusx = + document.getElementById("radiusx").value;
	var radiusy = + document.getElementById("radiusy").value;
	

	var rxsq = radiusx * radiusx;
	var rysq = radiusy * radiusy;
	var x = 0;
	var y = radiusy;
	var px = 0;
	var py = 2 * rxsq * y;
	
	var p = rysq - (rxsq * radiusy) + (0.25 * rxsq);
	
	while(px < py)
	{
		x = x + 1;
		px = px + 2 * rysq;
		if (p < 0)
		{
			p = p + rysq + px;
			
		}
		else
		{
			y = y - 1;
			py = py - 2 * rxsq;
			p = p + rysq + px - py;
		}
		drawEllipsePoint(xOrigin,yOrigin,x,y);
	}
	p = rysq * (x + 0.5) * (x + 0.5) + rxsq * (y - 1) * (y - 1) - rxsq * rysq;
	while (y > 0)
	{
		y = y - 1;
		py = py - 2 * rxsq;
		if (p > 0)
		{
			p = p + rxsq - py;
		}
		else
		{
			x = x + 1;
			px = px + 2 * rysq;
			p = p + rxsq - py + px;
		}
		drawEllipsePoint(xOrigin,yOrigin,x,y);
	}
	document.getElementById("demo").innerHTML = "ELLISPE HAS BEEN DRAWN";
}

function drawEllipsePoint(x, y, rx, ry){
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;

	drawPoint(x + rx,y + ry);
	drawPoint(x - rx,y + ry);
	drawPoint(x + rx,y - ry);
	drawPoint(x - rx,y - ry);
}

function buildPolygon()
{
	
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;
	
	var x = 0;
	var y = 0;
	
	var x = +document.getElementById("x").value;
	var y = +document.getElementById("y").value;
	//var polygonPairs = new Array();
	//var pairs = 0;
	
	
	if (pairs < 1){
		polygonPairs[0] = x;
		polygonPairs[1] = y;
	}
	else{
		polygonPairs[pairs*2] = x;
		polygonPairs[pairs*2 + 1] = y;                
	}
	document.getElementById("demo").innerHTML = "Added point to list:"
			+ polygonPairs[0] + " , " +polygonPairs[1];

	pairs++;
}

function drawPolygon()
{
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;

	var i = 0;
	if(pairs >=2){
		prevx = polygonPairs[0];
		prevy = polygonPairs[1];
		
		for(var i = 1;i < pairs;i++){
		   drawLines(prevx,
		   prevy,
		   polygonPairs[2*i],
		   polygonPairs[2*i+1]);
		   
		   prevx = polygonPairs[2*i];
		   prevy = polygonPairs[2*i + 1];
		}
		drawLines(prevx,
		prevy,
		polygonPairs[0],
		polygonPairs[1]);
	}
	document.getElementById("demo").innerHTML = "POLYGON HAS BEEN DRAWN";                
}

function resetPolygon()
{
	while(polygonPairs.length > 0) {
		polygonPairs.pop();
	}
	pairs = 0;
}

function drawOpenPolygon()
{
 var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;

	var i = 0;
	if(pairs >=2){
		prevx = polygonPairs[0];
		prevy = polygonPairs[1];
		
		for(var i = 1;i < pairs;i++){
		   drawLines(prevx,
		   prevy,
		   polygonPairs[2*i],
		   polygonPairs[2*i+1]);
		   
		   prevx = polygonPairs[2*i];
		   prevy = polygonPairs[2*i + 1];
		}
	}
	document.getElementById("demo").innerHTML = "OPEN POLYGON HAS BEEN DRAWN";                
}

function drawLines(x1,y1,x2,y2){
	var dcolor = document.getElementById("dcolor").value;
	ctx.fillStyle = dcolor;
   
	var dx,dy,d,dd;
	var x,y,sx,sy = 0;
	dx = Math.abs(x2 - x1);
	dy = Math.abs(y2 - y1);
	var sx = (x1 < x2) ? 1 : -1;
	var sy = (y1 < y2) ? 1 : -1;
	y = y1;
	x = x1;
	
	d = dx - dy;
	
	var line_draw = true;

	while(line_draw){
		drawPoint(x, y);
		if (x === x2 && y === y2){
			line_draw = false;
		}
		dd = 2 * d;
		if (dd > -1 * dy)
		{
			d = d - dy;
			x = x + sx;
		}
		if (dd < dx)
		{
			d = d + dx;
			y = y + sy;
		}
   }
	
	document.getElementById("demo").innerHTML = "LINE HAS BEEN DRAWN";
}

function cleanCanvas(){
	var drawCanvas = document.getElementById("DrawingSpace");
	var ctx = drawCanvas.getContext("2d");
	ctx.beginPath();
	ctx.fillStyle = "#e6e6e6";
	ctx.fillRect(0,0,500,500);
	ctx.fill();
	document.getElementById("demo").innerHTML = "Cleaned Canvas";
	document.body.appendChild(buttonClean);             
}