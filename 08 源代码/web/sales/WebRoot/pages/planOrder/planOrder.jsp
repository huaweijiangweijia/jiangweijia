<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<link rel="stylesheet" type="text/css" href="<%=path %>/css/editable-column-tree.css" />
<script type="text/javascript" src="<%=path %>/js/contractOrder/orderCommon.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/planOrder/selectQuoProductWindow.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/planOrder/addPlanOrder.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/planOrder/updatePlanOrder.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/planOrder/planOrderDetail.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/planOrder/supplier.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path %>/js/planOrder/planOrder.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contractOrder/SupHisPrice_win.js?r=1423308686433"></script>

<script type="text/javascript" src="<%=path%>/extjs/plugins/SwfUploadPanel/SwfUpload.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/upload/ImageView.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/upload/SlaveManager.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/extjs/plugins/SwfUploadPanel/SwfUploadPanel.js?r=1423308686433"></script>

<div id="paln_order"></div>




