<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<script>
var PAGESIZE = parseInt((Ext.getBody().getHeight()-250)/24);
</script>

<div id="productWorkOrderView"></div>

<script type="text/javascript" 	src="<%=path%>/js/product/produceTask.js?r=1423308686433"></script>





