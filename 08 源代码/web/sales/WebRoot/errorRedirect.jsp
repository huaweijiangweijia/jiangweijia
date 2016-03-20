<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=path%>/extjs/resources/css/ext-all.css" />

<script type="text/javascript" src="<%=path%>/extjs/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=path%>/extjs/ext-all.js"></script>
<title></title>
<script type="text/javascript">
window.onload=function(){
	if("${errorMsg}" != null && "${errorMsg}" != ""){
		Ext.Msg.show({
			title:'信息提示',
			msg: "${errorMsg}",
			width : 300,
			buttons: Ext.Msg.OK,
			icon: Ext.MessageBox.Info,
			fn:function(){
				var redUri = "<%=request.getContextPath()%>" + "/${errorUri}";
				window.location.href = redUri;
			}
		});
	}
};
</script>
</head>
<body>
</body>
</html>