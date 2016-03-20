<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script>
var PAGESIZE = parseInt((Ext.getBody().getHeight()-270)/24);
var _editerName = LoginInfor.user.trueName;
</script>
	<div id = "index_ct"></div>
    
    <script type="text/javascript" src="<%=path %>/js/quotation/generalQuo/calculate.js?r=1423308686433"></script>
	
	<script type="text/javascript" src="<%=path %>/js/quotation/generalQuo/generalQuo_manager.js?r=1423308686433"></script>
	<script type="text/javascript" src="<%=path %>/js/quotation/generalQuo/ProjectNumberWindow.js?r=1423308686433"></script>
	<script type="text/javascript" src="<%=path %>/js/baseInfo/toolscombox.js?r=1423308686433"></script>
	<script type="text/javascript" src="<%=path %>/js/quotation/generalQuo/generalQuo_list.js?r=1423308686433"></script>