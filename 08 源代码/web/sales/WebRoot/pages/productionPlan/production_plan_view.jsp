<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript" src="<%=path%>/js/out_stock/material_out_stock/out_stock_edit_win.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/production_plan/production_plan_list_view.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/production_plan/select_process_orders.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/production_plan/production_plan_edit_win.js?r=1423308686433"></script>
<div id="reserve_plan_list_"></div>