// Использую IIFFE, чтобы не засорять глоб
(function()
{
	let canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d'),
	w = canvas.width = innerWidth,
	h = canvas.height = innerHeight,
	particles = [],
	properties = {
		bgColor: 'rgba(17,17,19,1)',
		particleColor: `rgba(255,40,40,1)`,
		particleRadius: 3,
		particleCount : 90,
		particleMaxVelocity: 1,
		lineLength : 150
	};
	document.querySelector('body').appendChild(canvas);
	// при резайзе ширина канваса подстроиться под body 
	window.onresize = function()
	{
		w = canvas.width = innerWidth
		h = canvas.height = innerHeight
	}
	class Particle{
		constructor()
		{
			this.x = Math.random() * w; // this.x < w
			this.y = Math.random() * h; // this.y < h
			this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
			this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
		}
		position()
		{
			if(this.x > w || this.x < 0)
				this.velocityX*=-1;
			if(this.y > h || this.y < 0)
				this.velocityY*=-1;
			this.x+=this.velocityX;
			this.y+=this.velocityY;
		}
		reDraw() // перерисовывает частичку
		{
			ctx.beginPath();
			ctx.arc(this.x,this.y,properties.particleRadius,0,Math.PI * 2);
			ctx.fillStyle = properties.particleColor; // установка цвета 
			ctx.fill(); // залив
			ctx.closePath();
		}
	}
	

	function drawLines()
	{
		let x1,y1,x2,y2,length,opacity;
		for(let i in particles)
		{
			for(let j in particles){
				x1 = particles[i].x;
				y1 = particles[i].y;
				x2 = particles[j].x;
				y2 = particles[j].y;
				length = Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2 - y1,2))
				if(length < properties.lineLength)
				{
					if(length < properties.lineLength)
				{
					if (100000/(length*length*length) > 1){
						ctx.lineWidth = 1;
					}else{
					ctx.lineWidth = 100000/(length*length*length);
				}
					ctx.strokeStyle ='rgba(255,40,40,1)';
					ctx.beginPath();
					ctx.moveTo(x1,y1);
					ctx.lineTo(x2,y2);
					ctx.stroke()
					ctx.closePath();
				}
				

			}
		}
	}

	function reDrawParticles() // перерисовка всех частиц
	{
		for(let i in particles)
		{
			particles[i].position();
			particles[i].reDraw();
		}
	}

	function reDrawBackground()
	{
		ctx.fillStyle = properties.bgColor;
		ctx.fillRect(0,0,w,h)
	}

	function loop(){ // рекурсивная функция отрисовки всех объектов канваса 
		reDrawBackground();
		reDrawParticles();
		drawLines()
		requestAnimationFrame(loop) // умная отрисовка
	}

	function init() // вызывается единожды, затем - контроль перерисовок функцией loop
	{
		for(let i = 0; i < properties.particleCount;i++)
		{
			particles.push(new Particle)
		}
		loop(); // 
	}


	init();

})()


