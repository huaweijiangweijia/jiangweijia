<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
	<script type="text/javascript" src="<%=path %>/js/common.js?r=1423308686433"></script>   
    <script type="text/javascript" src="<%=path %>/extjs/ext-lang-zh_CN.js?r=1423308686433"></script>   

      <script type="text/javascript" src="<%=path %>/js/contractFSumGetMoney/updateContractFSumGetMoney.js?r=1423308686433"></script>
	  <script type="text/javascript" src="<%=path %>/js/contractFSumGetMoney/addContractFSumGetMoney.js?r=1423308686433"></script>
	<script type="text/javascript" src="<%=path %>/js/contractFSumGetMoney/contract.js?r=1423308686433"></script>
 <script type="text/javascript" src="<%=path %>/js/contractFSumGetMoney/contractFSumGetMoney.js?r=1423308686433"></script>

<div id="contractFSumGetMoney"></div>
