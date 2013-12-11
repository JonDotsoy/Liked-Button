/*!
 * Liked v1.0.3 (http://git.io.liked.jonad.in/)
 * Copyright 2013 Jonathen Delgado Z.
 * Licensed under http://creativecommons.org/licenses/by/3.0/
 *
 */
(function(window, undefined){

	window.liked = function(obj){
		if (typeof obj == "object") {
			//console.log(obj);

			this.obj = obj;
			this.status = 0;
			this.text = "<i class=\"icon\"></i> Me gusta";
			this.classloading = "btn-loading";
			this.classsuccess = "btn-success";
			this.limp=function(){
				this.obj.classList.remove(this.classloading);
				this.obj.classList.remove(this.classsuccess);
			};
			this.disable = function(){
				this.obj.setAttribute("disabled","disabled");
			};
			this.loading = function(){
				this.limp();
				this.obj.classList.add(this.classloading);
			};
			this.success = function(){
				this.limp();
				this.obj.classList.add(this.classsuccess);
			};
			this.clicked = function(){
				this.status = 1;
				this.loading();
				var tat = this;
				var cot = tat.obj.href.split("&c=");
				var category;
				if (cot.length>1) {	
					cot = cot[cot.length-1];
					category = cot.split("&")[0];
				} else {
					category = "";
				}
				if (window.XMLHttpRequest) {
					xmlhttp = new XMLHttpRequest();
				} else {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				};
				xmlhttp.onreadystatechange = function(){
					try {
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
							xmlhttp.value = JSON.parse(xmlhttp.responseText);
							if (xmlhttp.value.pre_status == "launch") {
								tat.success();
							} else {
								tat.limp();
							}
						};
					} catch (ex) {
						console.log(ex);
						tat.limp();
					} finally {
						tat.status = 0;
					}
				}
				xmlhttp.open("GET","http://liked.jonad.in/btn?&c="+category,true);
				//xmlhttp.setRequestHeader("X_REQUESTED_WITH","XMLHttpRequest");
				xmlhttp.send();
			};
			this.upload = function(){
				this.status = 1;
				this.loading();
				var xmlhttp;
				if (window.XMLHttpRequest) {
					xmlhttp = new XMLHttpRequest();
				} else {
					xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				};
				var tat = this;
				xmlhttp.onreadystatechange = function(){
					try {
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
							xmlhttp.value = JSON.parse(xmlhttp.responseText);
							
							if (xmlhttp.value.pre_status == "launch") {
								tat.success();
							} else {
								tat.limp();
							}
						} else if (xmlhttp.readyState == 4 && xmlhttp.status != 200){
							tat.limp();
							tat.disable();
						}
					} catch (ex) {
						console.log(ex);
						tat.limp();
					} finally {
						tat.status = 0;
					}
				}
				var d = new Date();
				var n = d.getTime();
				var cot = tat.obj.href.split("&c=");
				var category;
				if (cot.length>1) {	
					cot = cot[cot.length-1];
					category = cot.split("&")[0];
				} else {
					category = "";
				}
				//if () {};
				xmlhttp.open("GET","http://liked.jonad.in/btn?status&c="+category,true);
				//xmlhttp.setRequestHeader("X_REQUESTED_WITH","XMLHttpRequest");
				xmlhttp.send();
			};
			var tat = this;
			this.obj.onclick = function(){
				tat.clicked();
				return false;
			}
			this.upload();
		};
	};
	var start = function(){
		/* Scan btn liked */
		var element = document.getElementsByClassName("btn-liked");
		for (var i = 0; i < element.length; i++) {
			new liked(element[i]);
		};
	};
	var inter = setInterval(function() {
		if (document.getElementsByTagName("body").length != 0) {
			start();
			clearInterval(inter);
		} else {
			console.log("mico");
		}
	}, 10);
})(window);
