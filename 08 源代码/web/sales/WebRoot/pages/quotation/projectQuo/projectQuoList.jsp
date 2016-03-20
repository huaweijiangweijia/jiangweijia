<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script>
var PATH = '<%=path%>';
var PAGESIZE = parseInt((Ext.getBody().getHeight()-270)/24);
var _editerName = LoginInfor.user.trueName;
</script>
	
	 <!-- 新增报价单动态panel插件 -->
	
	
	 <!-- 新增报价单动态panel插件 -->
	<script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/RowEditor.js?r=1423308686433"></script>
	
	<style type="text/css">
		.align-center{   
		    margin:0 auto;      /* 居中 这个是必须的，，其它的属性非必须 */   
		   /*width:1000px;         给个宽度 顶到浏览器的两边就看不出居中效果了 */   
		}   
	</style>
	
	
	
	<div id='viewportProQuo'></div>
	
	<!-- 查看报价单详细信息 -->
    <script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/proQuoDetailWindow.js?r=1423308686433"></script>
    <script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/QuoDetailWindow4View.js?r=1423308686433"></script>
    
    <!-- 计算方法  -->
	<script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/calculateNew.js?r=1423308686433"></script>
    
    <!-- 选择产品 -->
	<script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/projectQuo_manager_selectProduct.js?r=1423308686433"></script>
	
    <!-- 项目报价单功能界面 -->
	<script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/projectQuo_manager.js?r=1423308686433"></script>
	
	<script type="text/javascript" src="<%=path %>/js/quotation/projectQuo/projectQuo_index.js?r=1423308686433"></script>
	
	
	

