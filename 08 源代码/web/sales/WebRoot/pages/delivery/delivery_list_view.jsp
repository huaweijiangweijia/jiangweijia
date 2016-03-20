<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript" src="<%=path%>/js/quotation/generalQuo/statusCombox.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/delivery/consult_contract/delivery_edit_win.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/delivery/consult_contract/delivery_list_view.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/delivery/consult_contract/select_contract.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/delivery/consult_contract/select_contract_products.js?r=1423308686433"></script>
<div id="delivery_list_"></div>
<div id="delivery_quogrid"></div>
<div id="delivery_contractEditWinEl"></div>
<div id="delivery_quoProductTreeEl"></div>