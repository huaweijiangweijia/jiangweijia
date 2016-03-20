<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<style type="text/css">
/*body{font-family:Arial, Helvetica, sans-serif,"宋体";font-size:12px;font-weight:normal;color:#707070; background-color:#EBF1F9; padding:0;margin:0 auto;}*/
/*div,p,ul,ol,li,h1,h2,h3,h4,h5,h6,table,tr,td,tbody,iframe,form,input{font-family:"宋体";padding:0;margin:0;}*/
/*table{border-collapse:collapse;}*/
/*select,input{font-family:"宋体";vertical-align:top;}*/
img{border:0;padding:0;margin:0;}
ul,ol{list-style-type:none;}

/*main*/
.soft_main{width:892px;/*918*/ height:413px; font-size:0; background:url(<%=path%>/images/mainbg.gif) left top no-repeat; padding-left:26px; margin:77px auto 0;}
.clearit{clear:both; overflow:hidden;}
.fl{float:left;}
.fl02{width:580px; float:left;}
.img01{width:237px; padding:25px 0 0 50px;}
.img02{width:237px; padding:10px 0 0 50px; float:left;}
.img03{width:323px; padding:10px 0 0 50px; float:left;}
.img04{width:237px; padding:42px 0 0 50px; float:left;}
.img05{width:237px; padding:42px 0 0 50px; float:left;}
.img06{width:237px; padding:19px 0 0 56px;}
.img07{width:237px; padding:18px 0 0 56px;}
.img08{width:237px; padding:46px 0 0 50px; float:left;}
.img09{width:237px; padding:26px 0 0 50px; display:inline; float:left;}
.img10{width:237px; padding:26px 0 0 56px; display:inline; float:left;}
.img11{width:237px; padding:18px 0 0 50px;}
.img12{width:237px; padding:35px 0 0 50px;}
.img13{width:147px; padding:25px 0 0 20px;}
.a_class{height:31px; display:block;}
.txt{float:right;}
.img01 a:link,.img01 a:visited{background:url(<%=path%>/images/img01.jpg) left top no-repeat;}
.img01 a:hover,.img01 a:active{background:url(<%=path%>/images/img01_2.jpg) left top no-repeat;}
.img02 a:link,.img02 a:visited{background:url(<%=path%>/images/img02.jpg) left top no-repeat;}
.img02 a:hover,.img02 a:active{background:url(<%=path%>/images/img02_2.jpg) left top no-repeat;}
.img03 a:link,.img03 a:visited{background:url(<%=path%>/images/img03.jpg) left top no-repeat;}
.img03 a:hover,.img03 a:active{background:url(<%=path%>/images/img03_2.jpg) left top no-repeat;}
.img04 a:link,.img04 a:visited{background:url(<%=path%>/images/img04.jpg) left top no-repeat;}
.img04 a:hover,.img04 a:active{background:url(<%=path%>/images/img04_2.jpg) left top no-repeat;}
.img05 a:link,.img05 a:visited{background:url(<%=path%>/images/img05.jpg) left top no-repeat;}
.img05 a:hover,.img05 a:active{background:url(<%=path%>/images/img05_2.jpg) left top no-repeat;}
.img06 a:link,.img06 a:visited{background:url(<%=path%>/images/img06.jpg) left top no-repeat;}
.img06 a:hover,.img06 a:active{background:url(<%=path%>/images/img06_2.jpg) left top no-repeat;}
.img07 a:link,.img07 a:visited{background:url(<%=path%>/images/img07.jpg) left top no-repeat;}
.img07 a:hover,.img07 a:active{background:url(<%=path%>/images/img07_2.jpg) left top no-repeat;}
.img08 a:link,.img08 a:visited{background:url(<%=path%>/images/img08.jpg) left top no-repeat;}
.img08 a:hover,.img08 a:active{background:url(<%=path%>/images/img08_2.jpg) left top no-repeat;}
.img09 a:link,.img09 a:visited{background:url(<%=path%>/images/img09.jpg) left top no-repeat;}
.img09 a:hover,.img09 a:active{background:url(<%=path%>/images/img09_2.jpg) left top no-repeat;}
.img10 a:link,.img10 a:visited{background:url(<%=path%>/images/img10.jpg) left top no-repeat;}
.img10 a:hover,.img10 a:active{background:url(<%=path%>/images/img10_2.jpg) left top no-repeat;}
.img11 a:link,.img11 a:visited{background:url(<%=path%>/images/img11.jpg) left top no-repeat;}
.img11 a:hover,.img11 a:active{background:url(<%=path%>/images/img11_2.jpg) left top no-repeat;}
.img12 a:link,.img12 a:visited{background:url(<%=path%>/images/img12.jpg) left top no-repeat;}
.img12 a:hover,.img12 a:active{background:url(<%=path%>/images/img12_2.jpg) left top no-repeat;}
</style>

	<div class="soft_main">
		<div class="img01"><a href="#" class="a_class" onclick="runModule('001001')"></a></div>
		
		<div class="clearit">
			<div class="img02"><a href="#"  class="a_class" onclick="runModule('002005')"></a></div>
			<div class="img03"><a href="#" class="a_class" onclick="runModule('001003')"></a></div>
		</div>
		
		<div class="clearit">
			<div class="img04"><a href="#" class="a_class" onclick="runModule('002001')"></a></div>
			<div class="img05"><a href="#" class="a_class" onclick="runModule('001006')"></a></div>
			<div class="fl">
				<div class="img06"><a href="#" class="a_class" onclick="runModule('001006')"></a></div>
				<div class="img07"><a href="#" class="a_class" onclick="runModule('001002')"></a></div>
			</div>
		</div>
		
		<div class="clearit">
			<div class="img08"><a href="#" class="a_class" onclick="runModule('002002')"></a></div>
			<div class="fl02">
				<div class="clearit">
					<div class="img09"><a href="#" class="a_class" onclick="runModule('002004')"></a></div>
					<div class="img10"><a href="#" class="a_class" onclick="runModule('002003')"></a></div>
				</div>
				<div class="img11"><a href="#" class="a_class" onclick="runModule('002006')"></a></div>
			</div>
		</div>
		
		<div class="img12"><a href="#" class="a_class"  onclick="runModule('001005')"></a></div>
		<div class="img13"><input type="checkbox" id="hideInitPageCheckbox" onclick="sethideInitPage(this)"> <div class="txt">以后启动不显示此页面</div></div>
	</div>

<SCRIPT LANGUAGE="JavaScript">
<!--
function runModule(id){
	var btn = Ext.getCmp(id);
	btn.fireEvent("click");
}
function sethideInitPage(obj){
	if(obj.checked){
		Ext.util.Cookies.set('hideInitPage',1);
	}else{
		Ext.util.Cookies.set('hideInitPage',0);
	}
}
function _initClData(){
    var f = Ext.util.Cookies.get('hideInitPage');
    if(f == 1 || f == '1'){
		document.getElementById("hideInitPageCheckbox").checked = true;
	}else{
	    document.getElementById("hideInitPageCheckbox").checked = false;
	}
}
_initClData();
//-->
</SCRIPT>