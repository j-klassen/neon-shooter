package;
import haxe.ds.Vector;
import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Image;

/**
 * ...
 * @author Jake Klassen
 */
class NeonShooter {
	var canvas:CanvasElement;
	var buffer:CanvasElement;
	var ctx:CanvasRenderingContext2D;
	var bufferCtx:CanvasRenderingContext2D;
	var squareImg:Image;

	var time:Float = 0;
	var last:Float = 0;
	var dt:Float = 0;

	var player:Player;
	var bricks:List<Brick> = new List<Brick>();
	public static var bullets:List<Bullet> = new List<Bullet>();

	public function new() {
		canvas = cast(Browser.document.getElementById('canvas'), CanvasElement);
		canvas.style.position = 'absolute';
		canvas.style.background = 'black';
		canvas.style.border = 'thick solid lightGrey';
		canvas.style.left = Browser.window.innerWidth / 2 - canvas.width / 2 + 'px';
		canvas.style.top = Browser.window.innerHeight / 2 - canvas.height / 2 + 'px';

		buffer = Browser.document.createCanvasElement();
		buffer.width = 50;
		buffer.height = 50;
		buffer.style.position = 'absolute';
		buffer.style.background = 'black';
		buffer.style.left = buffer.style.top = '0px';

		ctx = canvas.getContext2d();
		ctx.imageSmoothingEnabled = false;
		ctx.globalCompositeOperation = 'lighter';

		bufferCtx = buffer.getContext2d();
		bufferCtx.imageSmoothingEnabled = false;
		bufferCtx.globalCompositeOperation = 'lighter';
		bufferCtx.shadowColor = 'red';
		bufferCtx.shadowBlur = 6;

		// Prepare images

		// Square
		bufferCtx.globalAlpha = 0.5;
		bufferCtx.strokeStyle = 'white';
		bufferCtx.lineWidth = 5;
		bufferCtx.strokeRect(8, 8, 34, 34);

		// Overlay
		bufferCtx.globalAlpha = 0.8;
		bufferCtx.strokeStyle = 'blue';
		bufferCtx.lineWidth = 8;
		bufferCtx.strokeRect(8, 8, 34, 34);

		squareImg = new Image();
		squareImg.src = buffer.toDataURL();

		bufferCtx.clearRect(0, 0, buffer.width, buffer.height);

		player = new Player(new Vector2(canvas.width / 2, canvas.height - 100), new Vector2(400, 400), 10);
		bricks.add(new Brick(
			new Vector2(canvas.width / 2 - 30, 50),
			new Vector2(0, 25),
			60, 30,
			'blue',
			10
		));

		tick(0);
	}

	function tick(hrt:Float):Void {
		Browser.window.requestAnimationFrame(tick);

		dt = (hrt - last) / 1000;
		last = hrt;

		player.update(dt);

		for (brick in bricks) {
			brick.update(dt);
		}

		for (bullet in bullets) {
			bullet.update(dt);
		}

		// Clear
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.shadowColor = 'red';
		ctx.shadowBlur = 6;
		player.draw(ctx);

		for (brick in bricks) {
			brick.draw(ctx);
		}

		for (bullet in bullets) {
			bullet.draw(ctx);
		}
	}
}

private class Player {
	var position:Vector2;
	var velocity:Vector2;
	var hp:Int;

	private var shotTimer:Float = 0.2;
	private var shotTimerMax:Float = 0.2;

	private var angle:Float = -90;

	public function new(position:Vector2, velocity:Vector2, hp:Int) {
		this.position = position;
		this.velocity = velocity;
		this.hp = hp;
	}

	public function update(dt:Float):Void {
		this.angle += 2 * dt;

		shotTimer -= dt;
		if (shotTimer <= 0) {
			shotTimer = shotTimerMax;

			NeonShooter.bullets.add(new Bullet(
				new Vector2(this.position.x - 32, this.position.y),
				new Vector2(0, -650),
				'red',
				2
			));

			NeonShooter.bullets.add(new Bullet(
				new Vector2(this.position.x + 32, this.position.y),
				new Vector2(0, -650),
				'red',
				2
			));
		}
	}

	public function draw(context:CanvasRenderingContext2D):Void {
		// Ship
		context.globalAlpha = 0.5;
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		context.beginPath();
		context.arc(this.position.x, this.position.y, 18, 0, Math.PI * 2, true);
		context.stroke();

		// Orbs
		context.beginPath();
		context.arc(this.position.x - 32, this.position.y, 6, 0, Math.PI * 2, true);
		context.stroke();
		context.beginPath();
		context.arc(this.position.x + 32, this.position.y, 6, 0, Math.PI * 2, true);
		context.stroke();

		// Ship
		context.globalAlpha = 0.8;
		context.strokeStyle = 'green';
		context.lineWidth = 8;
		context.beginPath();
		context.arc(this.position.x, this.position.y, 18, 0, Math.PI * 2, true);
		context.stroke();

		// Orbs
		context.strokeStyle = 'green';
		context.lineWidth = 8;
		context.beginPath();
		context.arc(this.position.x - 32, this.position.y, 6, 0, Math.PI * 2, true);
		context.stroke();
		context.beginPath();
		context.arc(this.position.x + 32, this.position.y, 6, 0, Math.PI * 2, true);
		context.stroke();

		// Barrier ?
		context.strokeStyle = 'teal';
		context.save();
		context.lineWidth = 3;
		context.beginPath();
		context.arc(this.position.x, this.position.y, 22,  angle - 135 * Math.PI / 180, angle - 45 * Math.PI / 180, false);
		context.stroke();

		// Barrier ?
		context.strokeStyle = 'lightBlue';
		context.lineWidth = 3;
		context.beginPath();
		context.arc(this.position.x, this.position.y, 22, angle - 135 * Math.PI / 180, angle - 45 * Math.PI / 180, false);
		context.stroke();
		context.restore();
	}
}

private class Brick {
	var position:Vector2;
	var velocity:Vector2;
	var width:Int;
	var height:Int;
	var color:String;
	var hp:Int;

	public function new(position:Vector2, velocity:Vector2, width:Int, height:Int, color:String, hp:Int) {
		this.position = position;
		this.velocity = velocity;
		this.width = width;
		this.height = height;
		this.color = color;
		this.hp = hp;
	}

	public function right():Float {
		return this.position.x + this.width;
	}

	public function bottom():Float {
		return this.position.y + this.height;
	}

	public function isOutOfBounds(canvas:CanvasElement):Bool {
		if (this.right() <= 0 || this.position.x >= canvas.width ||
			this.bottom() <= 0 || this.position.y >= canvas.height) {
			return true;
		}

		return false;
	}

	public function update(dt:Float):Void {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}

	public function draw(context:CanvasRenderingContext2D):Void {
		context.globalAlpha = 0.5;
		context.strokeStyle = 'white';
		context.lineWidth = 3;
		context.strokeRect(this.position.x, this.position.y, this.width, this.height);

		context.globalAlpha = 0.8;
		context.strokeStyle = this.color;
		context.lineWidth = 8;
		context.strokeRect(this.position.x, this.position.y, this.width, this.height);
	}
}

private class Bullet {
	var position:Vector2;
	var velocity:Vector2;
	var color:String;
	var damage:Int;

	public function new(position:Vector2, velocity:Vector2, color:String, damage:Int) {
		this.position = position;
		this.velocity = velocity;
		this.color = color;
		this.damage = damage;
	}

	public function update(dt:Float) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}

	public function draw(context:CanvasRenderingContext2D) {
		// Bullet
		context.globalAlpha = 0.5;
		context.strokeStyle = 'white';
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(this.position.x, this.position.y);
		context.lineTo(this.position.x, this.position.y - 15);
		context.closePath();
		context.stroke();

		// Bullet overlay
		context.globalAlpha = 0.8;
		context.strokeStyle = 'red';
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(this.position.x, this.position.y);
		context.lineTo(this.position.x, this.position.y - 15);
		context.closePath();
		context.stroke();
	}
}

private class Vector2 {
	public var x:Float;
	public var y:Float;

	public function new(x:Float = 0, y:Float = 0) {
		this.x = x;
		this.y = y;
	}
}
