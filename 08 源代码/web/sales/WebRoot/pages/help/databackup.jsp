<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<SCRIPT LANGUAGE="JavaScript">
<!--
Ext.onReady(function(){
	window.open("<%=path%>/DataBackupImpAction.do?m=downloadDatabaseFile");
});
//-->
</SCRIPT>