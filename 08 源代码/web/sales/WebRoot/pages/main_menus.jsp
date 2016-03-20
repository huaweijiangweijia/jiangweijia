<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Mym-NoMes管理系统</title>
<script type="text/javascript">

var PATH = '<%=path%>';
var os_isReged = <%=request.getAttribute("isReged")%>;
var os_isTryDateOver = <%=request.getAttribute("isTryDateOver")%>;
var os_cutToolsSysMsg = '<%=request.getAttribute("cutToolsSysMsg")%>';
var LoginInfor = <%=request.getAttribute("LoginInfor")%>;
//禁用按回退键时，网页返回上一页
function backspace(e){
	var ev = e || window.event;//获取event对象
	var obj = ev.target || ev.srcElement;//获取事件源
	var t = obj.type || obj.getAttribute('type');//获取事件源类型
	//获取作为判断条件的事件类型
	var vReadOnly = obj.getAttribute('readonly');
	var vEnabled = obj.getAttribute('enabled');
	//处理null值情况
	vReadOnly = (vReadOnly == null) ? false : vReadOnly;
	vEnabled = (vEnabled == null) ? true : vEnabled;

	//当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	//并且readonly属性为true或enabled属性为false的，则退格键失效
	var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")
	&& (vReadOnly==true || vEnabled!=true))?true:false;

	//当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")
	?true:false;

	//判断
	if(flag2){
		return false;
	}
	if(flag1){
		return false;
	}

}

document.onkeypress=backspace;
document.onkeydown=backspace; 

</script>
<script type='text/javascript' src="<%=path%>/dwr/engine.js?r=1423308686433"></script>
<script type='text/javascript' src="<%=path%>/dwr/util.js?r=1423308686433"></script>
<script type='text/javascript' src="<%=path%>/dwr/interface/NoticeMessageUtil.js?r=1423308686433"></script>

<link rel="stylesheet" type="text/css" href="<%=path%>/extjs/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=path %>/css/ext-patch.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/css/editable-column-tree.css" /> 
<link rel="stylesheet" type="text/css" href="<%=path%>/css/row-plugin.css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/css/grid-examples.css" />

<script type="text/javascript" src="<%=path%>/extjs/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=path%>/extjs/ext-all.js"></script>

<script type="text/javascript" src="<%=path%>/js/manage/states.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/manage/ComboTree.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/common.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/main/menus.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/proToolsInfor/ColumnNodeUI.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/proToolsInfor/treeSerializer.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/quotation/generalQuo/statusCombox.js?r=1423308686433"></script>
<script language="javascript" src="<%=path%>/js/manage/SessionProvider.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path%>/js/audit_infor/load_business_infor.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/audit_infor/audit_view.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/audit_infor/audit_his_infor_list.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/TabCloseMenu.js?r=1423308686433"></script>
<script type="text/javascript" 	src="<%=path%>/js/quotation/projectQuo/RowEditor.js?r=1423308686433"></script>
<script type="text/javascript" 	src="<%=path%>/js/baseInfo/toolscombox.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/contract_edit_win.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/quotation/generalQuo/generalQuo_index.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path %>/js/contractOrder/orderCommon.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/contractOrder/contract.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/contractOrder/addContractOrder.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/out_stock/contract_out_stock/out_stock_edit_win.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/delivery/consult_contract/select_contract_products.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/contractOrder/supplier.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/contractOrder/selectContractDetailWindow.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path %>/js/arrival/arrival_index.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/arrival/directArrival/direct_arrival_list.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path%>/extjs/plugins/SwfUploadPanel/SwfUpload.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/upload/ImageView.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/upload/SlaveManager.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/extjs/plugins/SwfUploadPanel/SwfUploadPanel.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path %>/extjs/src/locale/ext-lang-zh_CN.js?r=1423308686433" charset="utf-8"></script>

<script type="text/javascript" src="<%=path%>/extjs/RowExpander.js?r=1423308686433"></script>

 <script language="javascript" src="<%=path%>/js/manage/BillDocument.js?r=1423308686433"></script>
 <script type="text/javascript" src="<%=path%>/extjs/plugins/ux/FileUploadField.js?r=1423308686433"></script>
<style>
	
	.folder-icon {
		background-image: url("") !important;
		background-repeat:no-repeat;
	}
</style>
</head>
<body onload="DWREngine.setActiveReverseAjax(true);">

<div id="container">
    <div id="toolbar"></div>
</div>
<div id="win" class="x-hidden">
<div id="tabs"></div>
<div id = "treeDiv"></div>
</div>
<script type="text/javascript" src="<%=path%>/js/default.js?r=1423308686433"></script>
</body>
</html>