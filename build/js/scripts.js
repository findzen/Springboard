function a(){return function(){}};var e=window.q={};window.log=a();e.info=a();e.status=a();e.i=a();e.warn=a();e.error=a();e.j=function(){var b=window.top.z;b=window.open("","logdump");b.document.writeln('<html><head><title>Log</title></head><body bgcolor=white onLoad="self.focus()"><pre>'+e.a()+"</pre></body></html>");b.document.close()};e.l=function(){e.h=true;e.info(e.b())};e.c=function(b){e.e=b?$(b):$("body")};e.k=function(){e.g(e.a())};e.f=[];e.h=false;e.u={p:"LOG",o:"INFO",r:"STATUS",m:"DEBUG",s:"WARNING",n:"ERROR"};e.w=a();
e.t=function(b,d){if(typeof window.console!="undefined"){var c=Object.prototype.hasOwnProperty;if(c.call(window.console,b))c=window.console[b];else if(c.call(window.console,"log"))c=window.console.log;else return;c.apply?c.apply(null,d):c(Array.prototype.join.call(d," "))}};e.g=function(b){$.ajax({url:"Log.php?msg="+encodeURIComponent(b)})};e.v=function(b){e.e.append(b+"<br>")};
e.b=function(){var b="-------------\n",d=window.navigator,c;for(c in d)if(typeof d[c]=="string"||typeof d[c]=="boolean")b+=c+": "+d[c]+"\n";return b};e.a=function(){var b=e.b(),d=e.f,c;for(c in d)b+=d[c]+"\n";return b};window.log=e.info=e.status=e.i=e.warn=e.error=e.j=e.l=e.c=e.k=a();function f(b){this.data=b||{};this.init()}f.prototype.init=function(){e.status("Model init")};function g(b){this.B=b;this.init()}g.prototype.init=function(){e.status("View init")};function h(b,d){this.d=b;this.view=d;this.init()}h.prototype.init=function(){e.status("Controller init")};function i(){this.init()}i.prototype.init=function(){e.status("App init");this.d=new f({});this.view=new g({});this.A=new h(this.d,this.view)};$(document).ready(function(){e.c($("#output"));e.status("document.ready");new i});
