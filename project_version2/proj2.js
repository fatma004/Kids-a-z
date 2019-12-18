var list=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var list_imgs=["a.jpg","b.jpeg","c.jpeg","d.jpeg","e.jpeg","f.jpeg","g.png","h.jpeg","i.jpeg","j.jpeg","k.jpeg","l.jpeg","m.jpeg","n.jpeg","o.jpeg","p.jpeg","q.jpeg","r.jpeg","s.jpeg","t.jpeg","u.jpg","v.jpg","w.jpg","x.jpg","y.jpg","z.jpg"];
var arr=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var $arr1=[]; // for load
var $arr2=[]; // for unload
var $arr3=[]; // for generate
var $arr4=[]; // for click_letters
var ok=false;
var sz=0;

var store_event=window.localStorage;


window.setInterval(function(){ 

$_load=JSON.parse(store_event.getItem("load"));
var _unload=JSON.parse(store_event.getItem("unload"));
var _gen=JSON.parse(store_event.getItem("generate"));
var _click_letters=JSON.parse(store_event.getItem("letter_buttons"));

$.ajax({
	"type":"POST",
	"url":"php.php",
	"data":{"load":JSON.stringify($_load),"unload":JSON.stringify(_unload),"generate":JSON.stringify(_gen),"letter_buttons":JSON.stringify(_click_letters)},
	"success":function(response)
	{
		//console.log(response);
	}
});

$arr1=[];
$arr2=[];
$arr3=[];
$arr4=[];
	store_event.clear();
}, 5000);
function make_object(name,e){
	this.name=name;
	this.target=(e.target.value==null?name:e.target.value);
	this.type=e.type;
	this.date=new Date();
	
}
function add_to_localStorage(obj,num){
	var name=obj.name;
	var ok=(store_event.getItem(name)==null?1:0);
	if(num==1){
		if(ok){
			$arr1.push(obj);
			store_event.setItem(name,JSON.stringify($arr1));
		}
		else {
			$arr1=JSON.parse(store_event.getItem(name));
			$arr1.push(obj);
			store_event.setItem(name,JSON.stringify($arr1));
		}
	}
	else if(num==2){
		if(ok){
			$arr2.push(obj);
			store_event.setItem(name,JSON.stringify($arr2));
		}
		else {
			$arr2=JSON.parse(store_event.getItem(name));
			$arr2.push(obj);
			store_event.setItem(name,JSON.stringify($arr2));
		}
	}
	else if(num==3){
		if(ok){
			$arr3.push(obj);
			store_event.setItem(name,JSON.stringify($arr3));
		}
		else {
			$arr3=JSON.parse(store_event.getItem(name));
			$arr3.push(obj);
			store_event.setItem(name,JSON.stringify($arr3));
		}
	}
	else {
		if(ok){
			$arr4.push(obj);
			store_event.setItem(name,JSON.stringify($arr4));
		}
		else {
			$arr4=JSON.parse(store_event.getItem(name));
			$arr4.push(obj);
			store_event.setItem(name,JSON.stringify($arr4));
		}
	}
}

function rand(){ // min =0,mx=26
	return Math.floor(Math.random()*26);
}

function check(idx){
	
	for(var i=0;i<sz;i++){
		if(arr[i]==idx)
			return 0;
	}
	return 1;
}

function upd(){
	for(var i=0;i<31;i++){
		arr[i]=-1;
	}
	sz=0;
}

window.addEventListener("load",function(e){
	var obj=new make_object("load",e);
	add_to_localStorage(obj,1);
});

window.addEventListener("unload",function(e){
		var obj=new make_object("unload",e);
		add_to_localStorage(obj,2);

});


var but=document.getElementById("sub");
but.addEventListener("click",function(e){
		var obj=new make_object("generate",e);
		add_to_localStorage(obj,3);

	upd();
	var txt=document.getElementById("txt").value;
	var num=parseInt(txt);
	var divs=document.getElementsByClassName("nw");
	if(divs.length>0){
	var divv=document.getElementsByClassName("nw")[0];
		divv.parentNode.removeChild(divv);

	}
	var images=document.getElementsByTagName("IMG");
	if(images.length>0){
		var image=images[0];
	image.parentNode.removeChild(image);
	}
	if(num>0&&num<27){
	var new_div=document.createElement("DIV");
	new_div.setAttribute("class","nw");
	ok=true;
	while(sz<num){
		var idx=rand();
		if(check(idx)==1){
			arr[sz]=idx;
			sz=sz+1;
		var x=document.createElement("INPUT");
		x.setAttribute("type","submit");
		x.setAttribute("value",list[idx]);
		x.setAttribute("class","na");
		x.setAttribute("width","2000px");
		x.style.borderRadius="25px";
		new_div.appendChild(x);
		}
	}
	var xx=document.getElementById("Dvg").appendChild(new_div);

	 func();
	}
	else {
		alert("Enter number between 1 and 26");
	}
});

function creat_img(letter){
	c=1;
	var items=document.getElementsByTagName("IMG");
	if(items.length>0){
		var item=items[0];
	item.parentNode.removeChild(item);
	}

	var x=document.createElement("IMG");
	var num=parseInt(letter.charCodeAt(0));
	num=num-65;
	x.setAttribute("src",list_imgs[num]);
	x.setAttribute("height","400px");
	x.setAttribute("width","700px");
	document.getElementById("Dvg").appendChild(x);

}

function func(){
	var list_letters=document.getElementsByClassName("na");
 for(var i=0;i<list_letters.length;i++){
	 list_letters[i].addEventListener("click",function(e){
		 var s=e.target.value;
		var obj=new make_object("letter_buttons",e);
		add_to_localStorage(obj,4);

		 creat_img(s);
	 });
 }
}
var $btn=$("#btn2");
$btn.on("click",function(){
	$.ajax({
		"type":"GET",
		"url":"php.php",
		"data":{"events":""},
		"success":function(response){
			if(response){
			var ss=JSON.parse(response);			
						console.log(ss);
				$('#tb >tr').remove();		
				$("#tb").append("<tr><th id=b1>Event Name</th><th id=b2>Event type</th><th id=b3>Event Target</th><th id=b4>Event Full_Date</th></tr>");
           for(var i=0;i<ss.length;i++){
				$("#tb").append("<tr><td id=b1"+(i)+"></td><td id=b2"+(i)+"></td><td id=b3"+(i)+"></td><td id=b4"+(i)+"></td></tr>");
                $("#b1"+(i)).text(ss[i]["name_events"]);
                $("#b2"+(i)).text(ss[i]["type_event"]);
                $("#b3"+(i)).text(ss[i]["target"]);
                $("#b4"+(i)).text(ss[i]["date_time"]);
			}
		}
		else {
			alert("NO data to show !");
		}
		
	}
	});
	
});

var $hide=$("#btn3");
$hide.on("click",function(){
	$('#tb >tr').remove();
    $('#tb >th').remove();
});
