<%@ page language="java" import="java.util.*,com.tl.common.util.LoginInforUtil,com.tl.resource.business.dto.LoginInforDto" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="Author" Content="" />
<meta name="Copyright" Content="" />
<title>Mym-NoMes管理系统</title>
<link href="<%=request.getContextPath() %>/css/index.css" rel="stylesheet" type="text/css" />

</head>

<body class="bodybg">

<div class="login_main">
	<div class="login_tit"></div>
	<div class="login_box">
	<form id="loginForm" name="loginForm" action="<%=request.getContextPath()%>/loginAction.do" method="post">
	 <input type="hidden" name="ffc" value="login">
		<p>用户名：<input type="text" name="userName" value="" /></p>
		<p>密　码：<input type="password" name="password" value="" /></p>
		<div class="login_lspace">
			<input type="submit" value="登 录" class="btn" />&nbsp;&nbsp;
			<input type="reset" value="取 消" class="btn" />
		</div>
	    </form>
	</div>
	<div class="login_bg02"></div>
	<div class="login_footer">
		版权所有 世通科技发展（香港）有限公司<br />
		联系电话：029-86698748  服务邮箱：service@86cut.com
	</div>
</div>
</body>

</html>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/extjs/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/extjs/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/extjs/ext-all.js"></script>
<script type="text/javascript">

var inputs = document.getElementsByTagName("INPUT");
for(var i=0;i < inputs.length;i++){
    if(inputs[i].name == 'userName'){
	    inputs[i].focus();
	}
}
var os_cutToolsSysMsg = '<%=request.getAttribute("cutToolsSysMsg")%>';
if(os_cutToolsSysMsg != '' && os_cutToolsSysMsg != 'null'){
    Ext.Msg.show({
		title:'信息提示',
		msg: os_cutToolsSysMsg,
		width : 300,
		buttons: Ext.Msg.OK,
		icon: Ext.MessageBox.Info
	});
}
</script>