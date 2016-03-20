<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String _billType = request.getParameter("billType");
%>

<SCRIPT LANGUAGE="JavaScript">
<!--
Ext.onReady(function(){
	var billGrid = new BillDocGrid({billType : <%=_billType%>});
		
	var billDocWindow = new Ext.Window({
		constrainHeader : true,
		width : 600,
		height : 500,
		modal : true,
		title :  '单据列表',
		layout: 'fit',
		resizable :false,
		closeAction : 'hide',
		items: billGrid
	}).show();
	
	billGrid.getStore().load({
		params : {
			start : 0,
			limit : 15
		}	
	});
})
//-->
</SCRIPT>
   