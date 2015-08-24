(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	new NeonShooter();
};
Math.__name__ = true;
var NeonShooter = function() {
	this.bricks = new List();
	this.dt = 0;
	this.last = 0;
	this.time = 0;
	this.canvas = js_Boot.__cast(window.document.getElementById("canvas") , HTMLCanvasElement);
	this.canvas.style.position = "absolute";
	this.canvas.style.background = "black";
	this.canvas.style.border = "thick solid lightGrey";
	this.canvas.style.left = window.innerWidth / 2 - this.canvas.width / 2 + "px";
	this.canvas.style.top = window.innerHeight / 2 - this.canvas.height / 2 + "px";
	var _this = window.document;
	this.buffer = _this.createElement("canvas");
	this.buffer.width = 50;
	this.buffer.height = 50;
	this.buffer.style.position = "absolute";
	this.buffer.style.background = "black";
	this.buffer.style.left = this.buffer.style.top = "0px";
	this.ctx = this.canvas.getContext("2d",null);
	this.ctx.imageSmoothingEnabled = false;
	this.ctx.globalCompositeOperation = "lighter";
	this.bufferCtx = this.buffer.getContext("2d",null);
	this.bufferCtx.imageSmoothingEnabled = false;
	this.bufferCtx.globalCompositeOperation = "lighter";
	this.bufferCtx.shadowColor = "red";
	this.bufferCtx.shadowBlur = 6;
	this.bufferCtx.globalAlpha = 0.5;
	this.bufferCtx.strokeStyle = "white";
	this.bufferCtx.lineWidth = 5;
	this.bufferCtx.strokeRect(8,8,34,34);
	this.bufferCtx.globalAlpha = 0.8;
	this.bufferCtx.strokeStyle = "blue";
	this.bufferCtx.lineWidth = 8;
	this.bufferCtx.strokeRect(8,8,34,34);
	this.squareImg = new Image();
	this.squareImg.src = this.buffer.toDataURL();
	this.bufferCtx.clearRect(0,0,this.buffer.width,this.buffer.height);
	this.player = new _$NeonShooter_Player(new _$NeonShooter_Vector2(this.canvas.width / 2,this.canvas.height - 100),new _$NeonShooter_Vector2(400,400),10);
	this.bricks.add(new _$NeonShooter_Brick(new _$NeonShooter_Vector2(this.canvas.width / 2 - 30,50),new _$NeonShooter_Vector2(0,25),60,30,"blue",10));
	this.setupListeners();
	this.tick(0);
};
NeonShooter.__name__ = true;
NeonShooter.prototype = {
	tick: function(hrt) {
		window.requestAnimationFrame($bind(this,this.tick));
		this.dt = (hrt - this.last) / 1000;
		this.last = hrt;
		this.player.update(this.dt);
		var _g_head = this.bricks.h;
		var _g_val = null;
		while(_g_head != null) {
			var brick;
			brick = (function($this) {
				var $r;
				_g_val = _g_head[0];
				_g_head = _g_head[1];
				$r = _g_val;
				return $r;
			}(this));
			brick.update(this.dt);
		}
		var _g_head1 = NeonShooter.bullets.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var bullet;
			bullet = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			bullet.update(this.dt);
		}
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.shadowColor = "red";
		this.ctx.shadowBlur = 6;
		this.player.draw(this.ctx);
		var _g_head2 = this.bricks.h;
		var _g_val2 = null;
		while(_g_head2 != null) {
			var brick1;
			brick1 = (function($this) {
				var $r;
				_g_val2 = _g_head2[0];
				_g_head2 = _g_head2[1];
				$r = _g_val2;
				return $r;
			}(this));
			brick1.draw(this.ctx);
		}
		var _g_head3 = NeonShooter.bullets.h;
		var _g_val3 = null;
		while(_g_head3 != null) {
			var bullet1;
			bullet1 = (function($this) {
				var $r;
				_g_val3 = _g_head3[0];
				_g_head3 = _g_head3[1];
				$r = _g_val3;
				return $r;
			}(this));
			bullet1.draw(this.ctx);
		}
	}
	,setupListeners: function() {
		window.addEventListener("keydown",$bind(this,this.onKeyDown),false);
		window.addEventListener("keyup",$bind(this,this.onKeyUp),false);
	}
	,onKeyDown: function(e) {
		var _g = e.keyCode;
		switch(_g) {
		case 37:
			NeonShooter.controls.left = true;
			break;
		case 38:
			NeonShooter.controls.up = true;
			break;
		case 39:
			NeonShooter.controls.right = true;
			break;
		case 40:
			NeonShooter.controls.down = true;
			break;
		}
	}
	,onKeyUp: function(e) {
		var _g = e.keyCode;
		switch(_g) {
		case 37:
			NeonShooter.controls.left = false;
			break;
		case 38:
			NeonShooter.controls.up = false;
			break;
		case 39:
			NeonShooter.controls.right = false;
			break;
		case 40:
			NeonShooter.controls.down = false;
			break;
		}
	}
	,__class__: NeonShooter
};
var _$NeonShooter_Player = function(position,velocity,hp) {
	this.angle = -90;
	this.shotTimerMax = 0.2;
	this.shotTimer = 0.2;
	this.position = position;
	this.velocity = velocity;
	this.hp = hp;
};
_$NeonShooter_Player.__name__ = true;
_$NeonShooter_Player.prototype = {
	update: function(dt) {
		if(NeonShooter.controls.left) this.position.x -= this.velocity.x * dt;
		if(NeonShooter.controls.right) this.position.x += this.velocity.x * dt;
		if(NeonShooter.controls.up) this.position.y -= this.velocity.y * dt;
		if(NeonShooter.controls.down) this.position.y += this.velocity.y * dt;
		this.angle += 2 * dt;
		this.shotTimer -= dt;
		if(this.shotTimer <= 0) {
			this.shotTimer = this.shotTimerMax;
			NeonShooter.bullets.add(new _$NeonShooter_Bullet(new _$NeonShooter_Vector2(this.position.x - 32,this.position.y),new _$NeonShooter_Vector2(0,-650),"red",2));
			NeonShooter.bullets.add(new _$NeonShooter_Bullet(new _$NeonShooter_Vector2(this.position.x + 32,this.position.y),new _$NeonShooter_Vector2(0,-650),"red",2));
		}
	}
	,draw: function(context) {
		context.globalAlpha = 0.5;
		context.strokeStyle = "white";
		context.lineWidth = 3;
		context.beginPath();
		context.arc(this.position.x,this.position.y,18,0,Math.PI * 2,true);
		context.stroke();
		context.beginPath();
		context.arc(this.position.x - 32,this.position.y,6,0,Math.PI * 2,true);
		context.stroke();
		context.beginPath();
		context.arc(this.position.x + 32,this.position.y,6,0,Math.PI * 2,true);
		context.stroke();
		context.globalAlpha = 0.8;
		context.strokeStyle = "green";
		context.lineWidth = 8;
		context.beginPath();
		context.arc(this.position.x,this.position.y,18,0,Math.PI * 2,true);
		context.stroke();
		context.strokeStyle = "green";
		context.lineWidth = 8;
		context.beginPath();
		context.arc(this.position.x - 32,this.position.y,6,0,Math.PI * 2,true);
		context.stroke();
		context.beginPath();
		context.arc(this.position.x + 32,this.position.y,6,0,Math.PI * 2,true);
		context.stroke();
		context.strokeStyle = "teal";
		context.save();
		context.lineWidth = 3;
		context.beginPath();
		context.arc(this.position.x,this.position.y,22,this.angle - 135 * Math.PI / 180,this.angle - 45 * Math.PI / 180,false);
		context.stroke();
		context.strokeStyle = "lightBlue";
		context.lineWidth = 3;
		context.beginPath();
		context.arc(this.position.x,this.position.y,22,this.angle - 135 * Math.PI / 180,this.angle - 45 * Math.PI / 180,false);
		context.stroke();
		context.restore();
	}
	,__class__: _$NeonShooter_Player
};
var _$NeonShooter_Brick = function(position,velocity,width,height,color,hp) {
	this.position = position;
	this.velocity = velocity;
	this.width = width;
	this.height = height;
	this.color = color;
	this.hp = hp;
};
_$NeonShooter_Brick.__name__ = true;
_$NeonShooter_Brick.prototype = {
	right: function() {
		return this.position.x + this.width;
	}
	,bottom: function() {
		return this.position.y + this.height;
	}
	,isOutOfBounds: function(canvas) {
		if(this.right() <= 0 || this.position.x >= canvas.width || this.bottom() <= 0 || this.position.y >= canvas.height) return true;
		return false;
	}
	,update: function(dt) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}
	,draw: function(context) {
		context.globalAlpha = 0.5;
		context.strokeStyle = "white";
		context.lineWidth = 3;
		context.strokeRect(this.position.x,this.position.y,this.width,this.height);
		context.globalAlpha = 0.8;
		context.strokeStyle = this.color;
		context.lineWidth = 8;
		context.strokeRect(this.position.x,this.position.y,this.width,this.height);
	}
	,__class__: _$NeonShooter_Brick
};
var _$NeonShooter_Bullet = function(position,velocity,color,damage) {
	this.position = position;
	this.velocity = velocity;
	this.color = color;
	this.damage = damage;
};
_$NeonShooter_Bullet.__name__ = true;
_$NeonShooter_Bullet.prototype = {
	update: function(dt) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
	}
	,draw: function(context) {
		context.globalAlpha = 0.5;
		context.strokeStyle = "white";
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(this.position.x,this.position.y);
		context.lineTo(this.position.x,this.position.y - 15);
		context.closePath();
		context.stroke();
		context.globalAlpha = 0.8;
		context.strokeStyle = "red";
		context.lineWidth = 5;
		context.beginPath();
		context.moveTo(this.position.x,this.position.y);
		context.lineTo(this.position.x,this.position.y - 15);
		context.closePath();
		context.stroke();
	}
	,__class__: _$NeonShooter_Bullet
};
var _$NeonShooter_Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
_$NeonShooter_Vector2.__name__ = true;
_$NeonShooter_Vector2.prototype = {
	__class__: _$NeonShooter_Vector2
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
NeonShooter.bullets = new List();
NeonShooter.controls = { left : false, right : false, up : false, down : false};
js_Boot.__toStr = {}.toString;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=NeonShooter.js.map