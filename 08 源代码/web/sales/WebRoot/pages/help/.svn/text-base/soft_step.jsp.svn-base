<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String notepadType = request.getParameter("notepadType");
%>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/file-upload.css" />
<div id="_soft_step_win"></div>
<SCRIPT LANGUAGE="JavaScript">
<!--
Ext.onReady(function(){
	Ext.ffc.SystemUpdateFileUploadForm = Ext.extend(Ext.FormPanel, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		};
		Ext.apply(this, _cfg);
		Ext.ffc.SystemUpdateFileUploadForm.superclass.constructor.call(this, {
			fileUpload : true,
			frame : true,
			autoHeight : true,
			style:"padding:5px",
			labelWidth : 50,
			margins:'3 0 3 3',
	        cmargins:'3 3 3 3',
	        baseCls : 'x-plain',
			defaults : {
				anchor : '90%',
				allowBlank : false,
				labelAlign : 'right',
				buttonAlign : 'right'
			},
			items: [{
				xtype : 'fileuploadfield',
				buttonText : '浏览',
				labelAlign : 'right',
				fieldLabel : '文件',
				//inputType : 'file',
				name : "filepath"
			}],
			buttons : [{
				text : '导入',
				handler : function() {
					var _filename = this.getForm().items.items[0].getValue();
					var index = _filename.lastIndexOf('.zip');
					if (index == -1) {
						Ext.Msg.show({
							title : '提示',
							msg : '文件格式错误,请选择zip格式文件！',
							buttons : Ext.Msg.OK,
							width : 200,
							icon : Ext.MessageBox.INFO
						});
						return false;
					}
					this.getForm().submit({
						url : PATH + '/SystemUpdateAction.do?m=updateSys',
						waitMsg : '正在导入数据...',
						success : function(_form, _action) {
							Ext.Msg.show({
								title : '提示',
								msg : "系统更新成功，请关闭浏览器，重新登录系统！",
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
							});
							this.ownerCt.close();
						},scope : this,
						failure : function(_form, _action) {
							Ext.Msg.show({
								title : '提示',
								msg : "系统更新失败",
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
							});
						},scope : this
					});
				},scope : this
			}, {
				text : '重置',
				handler : function() {
					this.getForm().reset();
				},scope : this
			}]

		});
		
		this.addEvents('importsuccess');
	}
});

Ext.ffc.SystemUpdateFileUploadWindow = Ext.extend(Ext.Window, {
	importDataForm : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		};
		Ext.apply(this, _cfg);
		this.importDataForm = new Ext.ffc.SystemUpdateFileUploadForm();
		Ext.ffc.SystemUpdateFileUploadWindow.superclass.constructor.call(this, {
			title : "系统升级",
			width : 400,
			height : 140,
			plain : true,
			constrain : true,
			modal : true,
			layout : 'fit',
			closeAction : 'close',
			items : [this.importDataForm]
		})
	}
});

	var sysUpdateWin = new Ext.ffc.SystemUpdateFileUploadWindow();
	sysUpdateWin.show();
});
//-->
</SCRIPT>