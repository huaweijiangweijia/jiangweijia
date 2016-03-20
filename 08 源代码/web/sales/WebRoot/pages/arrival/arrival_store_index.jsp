<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script>
var PATH = '<%=path%>';
var PAGESIZE = parseInt((Ext.getBody().getHeight()-270)/24);
</script>
	<link rel="stylesheet" type="text/css" href="<%=path %>/extjs/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/css/editable-column-tree.css" />
	<link rel="stylesheet" type="text/css" href="<%=path %>/css/ext-patch.css" />
	<script type="text/javascript" src="<%=path %>/extjs/src/locale/ext-lang-zh_CN.js?r=1423308686433" charset="utf-8"></script>

<div id="arrival_store_index"></div>
<script type="text/javascript" src="<%=path%>/js/quotation/generalQuo/statusCombox.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path %>/js/arrival/arrival_manage.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/arrival/order_search.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/arrival/store_arrival_index.js?r=1423308686433"></script>
