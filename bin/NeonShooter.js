// Generated by Haxe 4.1.4
(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	new NeonShooter();
};
Math.__name__ = true;
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,__class__: haxe_ds_List
};
var NeonShooter = function() {
	this.bricks = new haxe_ds_List();
	this.dt = 0;
	this.last = 0;
	this.canvas = js_Boot.__cast(window.document.getElementById("canvas") , HTMLCanvasElement);
	this.canvas.style.position = "absolute";
	this.canvas.style.background = "black";
	this.canvas.style.border = "thick solid lightGrey";
	var tmp = window.innerWidth / 2;
	this.canvas.style.left = tmp - this.canvas.width / 2 + "px";
	var tmp = window.innerHeight / 2;
	this.canvas.style.top = tmp - this.canvas.height / 2 + "px";
	this.buffer = window.document.createElement("canvas");
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
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			var brick = val;
			brick.update(this.dt);
		}
		var _g1_head = NeonShooter.bullets.h;
		while(_g1_head != null) {
			var val = _g1_head.item;
			_g1_head = _g1_head.next;
			var bullet = val;
			bullet.update(this.dt);
		}
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.shadowColor = "red";
		this.ctx.shadowBlur = 6;
		this.player.draw(this.ctx);
		var _g2_head = this.bricks.h;
		while(_g2_head != null) {
			var val = _g2_head.item;
			_g2_head = _g2_head.next;
			var brick = val;
			brick.draw(this.ctx);
		}
		var _g3_head = NeonShooter.bullets.h;
		while(_g3_head != null) {
			var val = _g3_head.item;
			_g3_head = _g3_head.next;
			var bullet = val;
			bullet.draw(this.ctx);
		}
	}
	,setupListeners: function() {
		window.addEventListener("keydown",$bind(this,this.onKeyDown),false);
		window.addEventListener("keyup",$bind(this,this.onKeyUp),false);
	}
	,onKeyDown: function(e) {
		switch(e.keyCode) {
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
		switch(e.keyCode) {
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
		if(NeonShooter.controls.left) {
			this.position.x -= this.velocity.x * dt;
		}
		if(NeonShooter.controls.right) {
			this.position.x += this.velocity.x * dt;
		}
		if(NeonShooter.controls.up) {
			this.position.y -= this.velocity.y * dt;
		}
		if(NeonShooter.controls.down) {
			this.position.y += this.velocity.y * dt;
		}
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
	update: function(dt) {
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
	if(y == null) {
		y = 0;
	}
	if(x == null) {
		x = 0;
	}
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
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
haxe_ds__$List_ListNode.prototype = {
	__class__: haxe_ds__$List_ListNode
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
NeonShooter.bullets = new haxe_ds_List();
NeonShooter.controls = { left : false, right : false, up : false, down : false};
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
