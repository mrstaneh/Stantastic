<script>
	import { currentLanguage } from '$lib/stores.js';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let currentY;

	onMount(async () => {
		drawCanvas();
    	window.addEventListener("resize", displayWindowSize);
    });

	function displayWindowSize(){
		try{
			var c = document.getElementById('canvas');

			c.style.width = document.documentElement.clientWidth.toString() + "px";
			c.style.height = document.documentElement.clientHeight.toString() + "px";
		}catch{}
	}

	const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

	function drawCanvas()
	{
		let maxRange = map(window.innerWidth, 0, 1920, 5, 25);
		let levelRange = map(window.innerWidth, 0, 1920, .4, .5);

		var c = document.getElementById('canvas'),
		ctx = c.getContext('2d'),
		cw = c.width = window.innerWidth,
		ch = c.height = window.innerHeight - 60, // subtract nav height
		points = [],
		opt = {
		count: 5,
		range: {
			x: 20,
			y: maxRange
		},
		duration: {
			min: 60,
			max: 120
		},
		thickness: 3,
		strokeColor: '#4A4A55',
		level: levelRange,
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
			ctx.imageSmoothingEnabled = true;
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

		window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/30)}}();

		loop();
	}

	function clickDownButton(){
		var elementToView = document.getElementById('stop-1');
		elementToView.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	function goTop(){
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Home - Stan Jaworski</title>
</svelte:head>

<svelte:window bind:scrollY={currentY}/>

<canvas id="canvas" style="position: absolute; overflow-x: hidden; z-index: -1;">
</canvas>
<div class="home-banner">
	<h1>Stan</h1><h1 class="h1-p2">Jaworski</h1>
	{#if $currentLanguage == 'en'}
		<p class="subtitle" in:fade={{duration: 250}} >
			Tailor-made software
		</p>
	{:else if $currentLanguage == 'nl'}
		<p class="subtitle" in:fade={{duration: 250}} >
			Op maat gemaakte software
		</p>
	{/if}
	<!--<i class="fa-solid fa-circle-arrow-down stop-0" on:click={clickDownButton}></i>-->
</div>
<!--<div class="underwater">
	<div class="first-stop">
		{#if $currentLanguage == 'en'}
			<h1>Hello there</h1>
			<p>There will be some information here...</p>
			<p id="stop-1">And then you can click onwards</p>
		{:else if $currentLanguage == 'nl'}
			<h1>Hey daar</h1>
			<p>Hier komt wat informatie...</p>
			<p id="stop-1">En dan kan je weer doorklikken</p>
		{/if}
		<i class="fa-solid fa-circle-arrow-down stop-1"></i>
	</div>
</div>
{#if currentY > window.innerHeight / 2}
<button in:fly='{{ x: 50, duration: 400 }}' out:fly='{{ x: 50, duration: 400 }}' id="top-button" on:click={goTop}><i class="fa-solid fa-angles-up"></i></button>
{/if}
-->
<style>
	#top-button{
		cursor: pointer;
		position: fixed;
		bottom: 20px;
		right: 0px;
		z-index: 1;
		border: none;
		outline: none;
		background-color: #4A4A55;
		color: #4A4A55;
		padding: 15px;
		padding-right: 15px;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
		-webkit-tap-highlight-color: transparent;
	}

	.fa-angles-up{
		font-size: 24px;
		color: #EF8320;
	}

	.underwater{
		position: absolute;
		width: 100%;
		height: 200%;
		margin-top: calc(100vh - 60px);
		background-color: #EF8320;
	}

	.first-stop{
		margin-top: 10em;
	}

	.home-banner{
		margin-top: 3em;
		container-name: titletext
	}

	p, h1{
		font-family: 'Titillium Web', sans-serif;
		color: #4A4A55;
	}

	h1 {
		display: inline;
		font-size:  70px;
	}

	.h1-p2{
		color: #EF8320;
	}

	@container titletext (max-width: 440px) {
		.h1 {
			font-size: 50px;
		}
	}

	.subtitle{
		font-size: 18px;
		margin-top: 0px;
	}

	.fa-circle-arrow-down{
		color: #4A4A55;
		font-size: 40px;
	}

	.fa-circle-arrow-down:hover{
		cursor: pointer;
	}

	.stop-0{
		margin-top: 4%;
		font-size: 40px;
		transition-duration: 100ms;
	}

	.stop-0:hover{
		color: #EF8320;
	}

	.stop-1{
		margin-top: 1%;
	}

	.stop-1:hover{
		color: #555561;
	}
</style>