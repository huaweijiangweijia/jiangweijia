<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<style>
	
	.folder-icon {
		background-image: url("") !important;
		background-repeat:no-repeat;
	}
</style>
<script type="text/javascript" src="<%=path%>/js/baseInfo/productToolsInfor.js?r=1423308686433"></script>
<div id="productToolsInfor_div">
<div id="productToolsInfor_tree">
</div>
</div>