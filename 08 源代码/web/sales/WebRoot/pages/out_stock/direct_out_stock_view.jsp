<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript" src="<%=path%>/js/quotation/generalQuo/statusCombox.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/out_stock/direct_out_stock/out_stock_list_view.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/out_stock/direct_out_stock/out_stock_edit_win.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/out_stock/direct_out_stock/select_reserve_infor.js?r=1423308686433"></script>
<div id="direct_out_stock_list_"></div>
<div id="direct_out_stock_quogrid"></div>
<div id="direct_out_stock_contractEditWinEl"></div>
<div id="direct_out_stock_quoProductTreeEl"></div>