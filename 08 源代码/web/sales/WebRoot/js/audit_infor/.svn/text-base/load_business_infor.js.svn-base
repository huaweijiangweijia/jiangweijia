var Load=new Object();//实例化对像
	Load.onLoadJs=function(jsName,callback){
		Ext.Ajax.request({
			url:jsName,
			success:callback,
			failure:function(d){
				alert("出错了:"+d.responseText);
			},
			jsonData:{},
			method:'GET'
		});
	}
function loadBusinessInfor(url,id){
	Load.onLoadJs(PATH + url,function(response){
		//try{
			eval(response.responseText);
			//alert(Ext.zhj.QuoInfoDetailWindow);
			var qdw = new DetailWindow();
			qdw.on("beforerender", function() {
				this.setId(id);
			})
			qdw.show();
		//}catch(e){
		//    alert(e);
		//}
		
	});
}
