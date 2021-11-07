<script>
	import { currentLanguage } from '$lib/stores.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	onMount(async () => {
		drawCanvas();
    	window.addEventListener("resize", displayWindowSize);
    });

	function displayWindowSize(){
		var c = document.getElementById('canvas');

		c.style.width = document.documentElement.clientWidth.toString() + "px";
		c.style.height = document.documentElement.clientHeight.toString() + "px";
	}

	function drawCanvas()
	{
	var c = document.getElementById('canvas'),
	ctx = c.getContext('2d'),
	cw = c.width = window.innerWidth,
	ch = c.height = window.innerHeight,
	points = [],
	tick = 0,
	opt = {
	count: 5,
	range: {
		x: 20,
		y: 40
	},
	duration: {
		min: 20,
		max: 40
	},
	thickness: 5,
	strokeColor: '#444',
	level: .50,
	curved: true
	},
	rand = function(min, max){
		return Math.floor( (Math.random() * (max - min + 1) ) + min);
	},
	ease = function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	};

	ctx.lineJoin = 'round';
	ctx.lineWidth = opt.thickness;
	ctx.strokeStyle = opt.strokeColor;

	var Point = function(config){
	this.anchorX = config.x;
	this.anchorY = config.y;
	this.x = config.x;
	this.y = config.y;
	this.setTarget();  
	};

	Point.prototype.setTarget = function(){
	this.initialX = this.x;
	this.initialY = this.y;
	this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
	this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
	this.tick = 0;
	this.duration = rand(opt.duration.min, opt.duration.max);
	}

	Point.prototype.update = function(){
	var dx = this.targetX - this.x;
	var dy = this.targetY - this.y;
	var dist = Math.sqrt(dx * dx + dy * dy);

	if(Math.abs(dist) <= 0){
	this.setTarget();
	} else {       
	var t = this.tick;
	var b = this.initialY;
	var c = this.targetY - this.initialY;
	var d = this.duration;
	this.y = ease(t, b, c, d);

	b = this.initialX;
	c = this.targetX - this.initialX;
	d = this.duration;
	this.x = ease(t, b, c, d);

	this.tick++;
	}
	};

	Point.prototype.render = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
	ctx.fillStyle = '#000';
	ctx.fill();
	};

	var updatePoints = function(){
	var i = points.length;
	while(i--){
	points[i].update();
	}
	};

	var renderPoints = function(){
	var i = points.length;
	while(i--){
	points[i].render();
	}
	};

	var renderShape = function(){
	ctx.beginPath();
	var pointCount = points.length;
	ctx.moveTo(points[0].x, points[0].y);	  
	var i;
	for (i = 0; i < pointCount - 1; i++) {
	var c = (points[i].x + points[i + 1].x) / 2;
	var d = (points[i].y + points[i + 1].y) / 2;
	ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
	}
	ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
	ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
	ctx.closePath();   
	ctx.fillStyle = '#EF8320';
	ctx.fill();  
	ctx.stroke();
	};

	var clear = function(){
	ctx.clearRect(0, 0, cw, ch);
	};

	var loop = function(){
	window.requestAnimFrame(loop, c);
	tick++;
	clear();
	updatePoints();
	renderShape();
	//renderPoints();
	};

	var i = opt.count + 2;
	var spacing = (cw + (opt.range.x * 2)) / (opt.count-1);
	while(i--){
	points.push(new Point({
	x: (spacing * (i - 1)) - opt.range.x,
	y: ch - (ch * opt.level)
	}));
	}

	window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

	loop();
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<canvas id="canvas" style="position: absolute; overflow-x: hidden; z-index: -1;">
</canvas>
<div class="home-banner">
	<h1>Stan</h1><h1 class="h1-p2">tastic</h1>
	{#if $currentLanguage == 'en'}
		<p class="subtitle" in:fade={{duration: 250}} >
			Tailor-made websites
		</p>
	{:else if $currentLanguage == 'nl'}
		<p class="subtitle" in:fade={{duration: 250}} >
			Op maat gemaakte websites
		</p>
	{/if}
	<i class="fa-solid fa-circle-arrow-down"></i>
</div>

<style>
	.home-banner{
		margin-top: 3em;
		height: 2000px;
	}

	p, h1{
		font-family: 'Titillium Web', sans-serif;
	}

    h1{
		display: inline;
        color: #4A4A55;
		font-size: 80px;
    }

	.h1-p2{
		color: #EF8320;
	}

	.subtitle{
		font-size: 18px;
		margin-top: 0px;
	}

	.fa-circle-arrow-down{
		margin-top: 4%;
		font-size: 40px;
		color: #4A4A55;
		transition-duration: 100ms;
	}

	.fa-circle-arrow-down:hover{
		cursor: pointer;
		color: #EF8320;
	}
</style>