//menu.js by srifqi [Muhammad Rifqi Priyo Susanto]
var MENU = MENU || {};

MENU.Container = function(children){
	this.id = "MENU" + Date.now() + Math.floor(Math.random()*10000);
	this.children = children || [];
	this.theme = {
		container: {
			background: "white"
		},
		a: {
			padding: "0 4px"
		},
		level1: {
			margin: 0,
			padding: 0,
			background: "white"
		},
		level2: {
			width: "128px",
			background: "white"
		},
		hover: {
			background: "#ddd"
		}
	};
};

MENU.Container.prototype = {
	draw: function(){
		function draw_segment(list_item){
			var text = "";
			var children = list_item;
			for(var i=0,text="";i<children.length;i++){
				var childi = children[i];
				if(childi.children.length === 0){
					text+="<li><a href=\""+childi.url+"\">"+childi.text+"</a></li>";
				}else if(childi.children.length > 0){
					text+="<li>"+
						"<a href=\""+childi.url+"\">"+childi.text+"</a>";
					text+=draw_segment(childi.children);
					text+="</li>";
				}
			}
			return "<ul>" + text + "</ul>";
		}
		
		function get_style(styles){
			var text = "";
			for(var i in styles){
				if(i !== "position" && i !== "float"){
					text += i + ":" + styles[i] + ";";
				}
			}
			return text;
		}
		
		return "<style>"+
			"nav#"+this.id+" {"+get_style(this.theme.container)+"}"+
			"nav#"+this.id+" ul{list-style:none;position:relative;float:left;margin:0;padding:0;}"+
			"nav#"+this.id+" ul a{display:block;"+get_style(this.theme.a)+"}"+
			"nav#"+this.id+" ul li{position:relative;float:left;"+get_style(this.theme.level1)+"}"+
			"nav#"+this.id+" ul ul{display:none;position:absolute;top:100%;left:0;padding:0}"+
			"nav#"+this.id+" ul ul li{float:none;"+get_style(this.theme.level2)+"}"+
			"nav#"+this.id+" ul ul ul{top:0;left:100%;}"+
			"nav#"+this.id+" ul li:hover{"+get_style(this.theme.hover)+"}"+
			"nav#"+this.id+" ul li:hover > ul{display:block;}"+
			"</style><nav id=\""+this.id+"\">" + draw_segment(this.children) + "</nav>";
	}
};

MENU.Item = function(text, url, children){
	this.text = text || "";
	this.url = url || "";
	this.children = children || [];
};
