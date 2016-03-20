<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<link rel="stylesheet" type="text/css" href="<%=path%>/extjs/plugins/SwfUploadPanel/SwfUploadPanel.css" />

<script type="text/javascript" src="<%=path%>/js/contract/charsDef.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/contract_account_edit.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/contract_accounts.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/quotation/generalQuo/statusCombox.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/contract_view_win.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/contract_edit_win.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/contract_list_view.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/select_quotation.js?r=1423308686433"></script>
<script type="text/javascript" src="<%=path%>/js/contract/invoiceEdit.js?r=1423308686433"></script>


<div id="contract_list_"></div>
<div id="quogrid"></div>
<div id="contractEditWinEl"></div>
<div id="quoProductTreeEl"></div>
