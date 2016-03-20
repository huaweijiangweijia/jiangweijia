
cut_tools.plan_order.index_grid = null;    
Ext.onReady(function(){
	var PAGESIZE = parseInt((Ext.getBody().getHeight()-320)/24);
	var proxy = new Ext.data.HttpProxy({url: PATH + "/planOrder/listAction.do"});
	function insertTotalRow(){
		var arr = cut_tools.plan_order.index_grid.getView().getRows();
		if(arr.length){
			var seachParams = selectForm2.getForm().getValues();
			requestTotalDatas(seachParams,selectForm2,function(po){
				var ttt = new (Ext.Template)("<div class=\"x-grid3-row \"><table class=\"x-grid3-row-table\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">", "<tbody><tr ><td style='width:100px;font-height:bold;text-algin:right'>合计行: </td><td style='font-height:bold'>订单金额:</td><td style='width:100px;color:red;text-algin:right'>{final_money}</td><td style='font-height:bold'>发票金额:</td><td style='width:100px;color:red;text-algin:right'>{imoney}</td><td style='font-height:bold'>付款金额:</td><td style='width:100px;color:red;text-algin:right'>{money}</td>",
					"</tr></tbody></table></div>");
				
				Ext.DomHelper.insertHtml("afterEnd", arr[arr.length - 1], ttt.apply(po));
			});
		}
	}

	//权限
 getConfig = function() {
	var modules = LoginInfor.modules
	var _configStr = "{";
	for(var i = 0; i < modules.length; i++) {
		var module = modules[i];
		if("005" == module.id) {
			var childModule = module.children;
			for(var j = 0; j < childModule.length; j++) {
				if("005005" == childModule[j].id) {
					var _configArr = childModule[j].children;
					if(_configArr.length > 0) { 
						for(var k = 0; k < _configArr.length; k++) {
							if(k != _configArr.length-1)
								_configStr += _configArr[k].url + ",";
							else 
								_configStr += _configArr[k].url + "}"
						}
					} else {
						_configStr += "}"
					}
					break;
				}
			}
			
			break;
		}
	}
	//alert(_configStr);
	return Ext.decode(_configStr);
}

var _config = {isAddHide : true,isModifyHide : true,isDeleteHide : true,isSubmitHide : true,
	isConfirmHide : true,isDetailHide : true, isToExcelHide : true,isCancelHide:true}

Ext.apply(_config, getConfig());

	var Bill = Ext.data.Record.create([
									   {name: 'id', type: 'string',mapping:"id"},
	                                   {name: 'orderCode', type: 'string',mapping:"orderCode"},
	                                   {name: 'contractCode', type: 'string',mapping:"contractCode"},
	                                   {name: 'currencyId', type: 'string',mapping:"currencyId"},
	                                   {name: 'currencyName', type: 'string',mapping:"currencyName"},
	                                   {name: 'orderDate', type: 'string',mapping:"orderDate"},
	                                   {name: 'orderType', type: 'int',mapping:"orderType"},
	                                   {name: 'status', type: 'int',mapping:"status"},
	                                   {name: 'supplierName', type: 'string',mapping:"supplierName"},
	                                   {name: 'supplierId', type: 'string',mapping:"supplierId"},
	                                   {name: 'urgentLevel', type: 'int',mapping:"urgentLevel"},
	                                   {name: 'contactPerson', type: 'string',mapping:"contactPerson"},	                 
	                                   {name: 'totalMoney', type: 'string',mapping:"totalMoney"},
	                                   {name: 'taxRate', type: 'string',mapping:"taxRate"},
	                                   {name: 'productMoney', type: 'string',mapping:"productMoney"},
	                                   {name: 'deliveryDate', type: 'string',mapping:"deliveryDate"},
	                                   {name: 'mome', type: 'string',mapping:"mome"},
	                       			   {name: 'editDate', type: 'string',mapping:"editDateCopy"},
	                       			   {name: 'userId', type: 'string',mapping:"userId"},
	                                   {name: "userName", type: "string", mapping: "userName"},
									   {name: "supplierContactPerson", type: "string", mapping: "supplierContactPerson"},
									   {name: "supplierOwnContactPerson", type: "string", mapping: "supplierOwnContactPerson"},
									   {name: 'companyName', type: 'string',mapping:"companyName"},
									   {name: 'companyId', type: 'string',mapping:"companyId"},
									   {name: 'overallRebate', type: 'string',mapping:"overallRebate"},
									   {name: 'finalMoney', type: 'string',mapping:"finalMoney"},
									   {name: 'fileCount',mapping:'fileCount',type:'float'}
	]);
	var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
	var store = new Ext.data.Store({
		proxy: proxy,
		reader: reader,
		remoteSort : true,
		listeners : {
			'load' : function( store, records, ops ){
				insertTotalRow();
			}
		}
	});

	store.load({params: {start: 0, limit: PAGESIZE}});


	var gridCheckSele = new Ext.grid.CheckboxSelectionModel();
	
	cut_tools.plan_order.index_grid = new Ext.grid.GridPanel({
		frame:true,
		layout: 'fit',
		sm:gridCheckSele,
		store: store,
		columns: [
			 new Ext.grid.RowNumberer(),
				gridCheckSele,
			{header: "id",dataIndex: "id",width: 40,hidden:true},
			{header: "订单编号",dataIndex: "orderCode",width: 180,sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
			{header: "供应商id",dataIndex: 'supplierId',width: 60,sortable:true,hidden:true},
			{header: "供应商",dataIndex: 'supplierName',width: 210,sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
			{header: "联系人",dataIndex: 'supplierContactPerson',width: 80,sortable:true,hidden:true},	
			{header: "状态",dataIndex: 'status',width: 60,sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
						var arr = [[0,"<span style='color:#990000'>编制</span>"],
							[1,"<span style='color:#A1A09D;font-weight:bold;'>待审批</span>"],
							[2,"<span style='color:green;font-weight:bold;'>审批通过</span>"],
							[3,"<span style='color:red;font-weight:bold;'>审批退回</span>"],
							[4,"<span style='color:#4597E3;font-weight:bold;'>已下单</span>"],
							[5,"<span style='color:#DF7401;font-weight:bold;'>到货完毕</span>"],
							[6,"<span style='color:#088A85;font-weight:bold;'>已做计划</span>"],
							[-1,"<span style='color:#606E7F;font-weight:bold;'>已作废</span>"]];
						for(var i = 0;i < arr.length ;i++){
							if(value == arr[i][0]){
								return arr[i][1];
							}
						}
						return value;
				}
			},
			{header: "紧急程度",dataIndex: 'urgentLevel', width: 60,sortable:true,renderer:function orderUrgentLevle(value)
				{
				if(value == 0){return "<span style='color:#2D61B5;font-weight:bold;'>一般</span>";}
					else if(value == 1){return "<span style='color:red;font-weight:bold;'>紧急</span>";}
				}
			},
			{header: "订货日期",dataIndex: 'orderDate',width: 100,sortable:true},
			{header: "交货期",dataIndex: 'deliveryDate',width: 100,sortable:true},
			{header: "供应商我方负责人",dataIndex: 'supplierOwnContactPerson',width: 120,sortable:true},
			{header: "币别id",dataIndex: 'currencyId',width: 100,hidden:true},
			{header: "币别",dataIndex: 'currencyName',width: 60,sortable:true},
			{header: "最终金额",dataIndex: 'finalMoney', width: 100,sortable:true},
			{header: "税价合计",dataIndex: 'totalMoney',width: 100,sortable:true,hidden:true},
			{header: "税率",dataIndex: 'taxRate',width: 60,sortable:true,hidden:true},
			{header: "货品金额",dataIndex: 'productMoney', width: 100,sortable:true,hidden:true},
			{header: "整体折扣",dataIndex: 'overallRebate', width: 60,sortable:true,hidden:true},
			{header: "编制人Id",dataIndex: 'userId',width: 100,hidden:true},
			{header: "编制人", dataIndex: "userName",width: 60,sortable:true, id: "remark", 
			renderer: function(v){
				return Ext.util.Format.stripTags(v);
			}},
			{header: "订单类型",dataIndex: 'orderType',width: 100,hidden:true},
			{header: "编制时间",dataIndex: 'editDate',width: 120,sortable:true},	
			{header: "备注",dataIndex: 'mome',width: 100,hidden:true},
			{header: "公司ID", dataIndex:"companyId",width: 120,hidden:true},
			{header: "公司名称", dataIndex:"companyName",width: 120,sortable:true,hidden:true},
			{header: "发票信息", width: 75, sortable: true, dataIndex: '111',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				//contractInforId,contractCode,customerCode
				var str = "<a href=\"javascript:Ext.ffc.showOrderInvoiceInforWin(\'" + record.get('id') + "\',\'" + record.get('orderCode') + "\',\'" + record.get('supplierId') + "\',\'" + _config.isInvoiceHide + "\');\">查看</a>";
					return str;
				}
			},
			{header: "付款信息", width: 75, sortable: true, dataIndex: '222',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				//contractId,contractCode,customerName,customerCode,finalMoney
				var str = "<a href=\"javascript:Ext.ffc.showOrderAccountInforWin(\'" + record.get('id') + "\',\'" + record.get('orderCode') + "\',\'" + record.get('supplierName') + "\',\'" + record.get('supplierId') + "\',\'" + record.get('finalMoney') + "\',\'" + _config.isReturnMoneyHide + "\');\">查看</a>";
					return str;
				}
			},
//			{header: "审批信息", width: 75, sortable: true, dataIndex: 'auditInfor',
//				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
//				var str = "<a href=\"javascript:onAuditInfor(this,\'" + record.get('id') + "\');\">查看</a>";
//					return str;
//				}
//			},
			{header: "订单附件", width: 60,  dataIndex: 'fileCount',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
					var str = null;
					if(value <= 0){
					    str = '<a href="#">未上传</a>';
					}else{
					    str = '<a href="javascript:Ext.ffc.showSlaveFillWindow({id:\'' + record.data.id + '\'})">查看</a>';
					}
					return str;
				}	
			}
		],
		autoExpandColumn: "remark",
			 tbar : [{
				text:'添加订单',
				hidden : _config.isAddHide,
				iconCls:'icon-add',
				listeners: {
					'click' : function(){
						var win = new pOsupplierWin();
						win.supplier_grid.store.load({start:0,limit:15});	
						win.show();
					}
				}
			},{
				xtype:'tbseparator',
				hidden : _config.isModifyHide
			},{
				text:'修改订单',
				hidden : _config.isModifyHide,
				iconCls:'icon-modify',
				listeners: {
					'click' : function(){
							var record  = cut_tools.plan_order.index_grid.getSelectionModel().getSelected();
							var arr = gridCheckSele.getSelections();
							if(arr.length == 0){
								Ext.Msg.show({
								   title: '系统提示',
								   msg: '请选择一条要修改的订单记录',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
								});
								return;
							}
							if(arr.length > 1){
								Ext.Msg.show({
								   title: '系统提示',
								   msg: '只能选择一条订单记录进行修改',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
								});
								return;
							}
							var stu = arr[0].get("status");
							if(stu != 0 && stu != 3)
							{
								Ext.Msg.show({
								   title: '系统提示',
								   msg: '该状态下订单不能被修改！',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
								});
								return;
							}
							var win = new pOUpdateWin({orderId:record.get('id')});
							 win.show();
						
					}
				}
			},{
				xtype:'tbseparator',
				hidden : _config.isDeleteHide
			},{
				text:'删除订单',
				hidden : _config.isDeleteHide,
				iconCls:'icon-delete',
				listeners: {
					'click' : function(){
							var arr = gridCheckSele.getSelections();
							if (arr.length <= 0) {
								Ext.Msg.show({
								   title: '系统提示',
								   msg: '请选择要删除的订单！',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
								});
								return;
							}
							var ids = [];
							for(var i = 0 ;i < arr.length;i++){
								 ids.push(arr[i].id);
								 if(arr[i].get("status") != 0 && arr[i].get("status") != 3){
									Ext.Msg.show({
									   title: '系统提示',
									   msg: '所选择订单不允许删除',
									   width: 300,
									   buttons: Ext.MessageBox.OK,
									   icon: Ext.MessageBox.INFO
									});
									return ;
								 }
							}
							var handleDelete = function (btn){
								if(btn == 'ok') {	
									Ext.Ajax.request({
										method: "post",
										url: PATH + '/planOrder/deleteOrder.do',
										params: { ids: ids },
										success: function(response){
											store.reload();
										}
									});
								}
							}
							Ext.MessageBox.show({
								title:'系统提示',
								msg: '请确认要删除当前订单!',
								buttons: Ext.MessageBox.OKCANCEL,
								fn: handleDelete
							});													
					}
				}
			},
//				{
//				xtype:'tbseparator',
//				hidden : _config.isSubmitHide
//			},{
//				text:'提交审核',
//				hidden : _config.isSubmitHide,
//				iconCls:'icon-submit',
//				listeners: {
//					'click' : function(){
//			 
//							var arr = gridCheckSele.getSelections();
//							if (arr.length <= 0) {
//								Ext.Msg.show({
//								   title: '系统提示',
//								   msg: '请选择要提交的订单！',
//								   width: 300,
//								   buttons: Ext.MessageBox.OK,
//								   icon: Ext.MessageBox.INFO
//								});
//								return;
//							}
//							var ids = [];
//							for(var i = 0 ;i < arr.length;i++){
//								 ids.push(arr[i].id);
//								 if(arr[i].get("status") != 0 && arr[i].get("status") != 3){
//									Ext.Msg.show({
//									   title: '系统提示',
//									   msg: '所选择订单不允许提交审核',
//									   width: 300,
//									   buttons: Ext.MessageBox.OK,
//									   icon: Ext.MessageBox.INFO
//									});
//									return ;
//								 }
//							}
//							Ext.Ajax.request({
//								method: "post",
//								url: PATH + '/planOrder/submitAudit.do',
//								params: { ids: ids },
//								success: function(response){
//									if(response.responseText != ''){
//										Ext.Msg.alert("消息", response.responseText);
//									}else{
//										Ext.Msg.alert("消息", "提交成功!");
//										Ext.Msg.show({
//										   title: '消息',
//										   msg: '提交成功',
//										   width: 300,
//										   buttons: Ext.MessageBox.OK,
//										   icon: Ext.MessageBox.INFO
//										});
//										store.reload();
//										Ext.ffc.sendMsg2Server();//向服务器发送消息，进行广?
//									}
//								}
//						});
//					}
//		 		}
//			},
{
				xtype:'tbseparator',
				hidden : _config.isConfirmHide
			},{
				text:'确认下单',
				hidden : _config.isConfirmHide,
				iconCls:'icon-submit',
				listeners: {
					'click' : function(){
							 var arr = gridCheckSele.getSelections();
							if (arr.length <= 0) {
								Ext.Msg.show({
								   title: '系统提示',
								   msg: '请选择要下单的订单！',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
								});
								return;
							}
							var ids = [];
							for(var i = 0 ;i < arr.length;i++){
								 ids.push(arr[i].id);
								 if(arr[i].get("status") != 0){
									Ext.Msg.show({
									   title: '系统提示',
									   msg: '所选择订单不允许下单',
									   width: 300,
									   buttons: Ext.MessageBox.OK,
									   icon: Ext.MessageBox.INFO
									});
									return ;
								 }
							}
							Ext.Ajax.request({
								method: "post",
								url: PATH + '/planOrder/placeOrder.do',
								params: { ids: ids },
									success: function(response){
									Ext.Msg.show({
									   title: '系统提示',
									   msg: '提交下单成功',
									   width: 300,
									   buttons: Ext.MessageBox.OK,
									   icon: Ext.MessageBox.INFO
									});
									store.reload();
								}
						});
					}
		 		}
			},{
				xtype:'tbseparator',
				hidden : _config.isDetailHide
			},{
				text:'查看订单明细',
				hidden : _config.isDetailHide,
				iconCls:'icon-detail',
				listeners: {
					'click' : function(){
						var arr = gridCheckSele.getSelections();
						if(arr.length != 1){
							Ext.Msg.show({
								   title: '系统提示',
								   msg: '请选择要查看的一条订单',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
								});
							return;
						};
						 var win = new DetailWindow({orderId:arr[0].id});
						 win.show();

					}
		 		}
			},{
				xtype:'tbseparator',
				hidden : _config.isUploadHide
			},{
        		text:'上传附件',
				hidden : _config.isUploadHide,
				iconCls:'icon-add',
				listeners : {
					'click' : function(obj) {
						var arr = gridCheckSele.getSelections();
							if(arr.length <= 0){
								Ext.Msg.alert("消息", "请选择要上传附件的订单!");
								return;
							}
							if(arr.length > 1){
								Ext.Msg.alert("消息", "请选择一条订单，进行上传附件操作!");
								return ;
							}
						var data = arr[0].data;
						Ext.ffc.showSlaveFillWindow(data);
					}
				}
        	},{
				xtype:'tbseparator',
				hidden : _config.isToExcelHide
			},{
				text:'导出Excel',
				hidden : _config.isToExcelHide,
				iconCls:'icon-excel',
				listeners: {
					'click' : function(){
						var arr = gridCheckSele.getSelections();
						if(arr.length != 1){
							Ext.Msg.show({
								   title: '系统提示',
								   msg: '请选择要生成报表的一条订单',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
							});
							return;
						}
						if(arr[0].get("status") == 0 || arr[0].get("status") == 1 || arr[0].get("status") == 3 )
						{
							Ext.Msg.show({
								   title: '系统提示',
								   msg: '该状态下订单不能导出!',
								   width: 300,
								   buttons: Ext.MessageBox.OK,
								   icon: Ext.MessageBox.INFO
							});
							return;
						}
						window.open(PATH + '/contractOrder/orderExcel.do?orderId='+arr[0].id);
					}
		 		}
			},{
				xtype:'tbseparator',
				hidden : _config.isToExcelHide
			},{
				text:'导出订单列表',
				hidden : _config.isToExcelHide,
				iconCls:'icon-excel',
				listeners: {
					'click' : function(){	
						var record  =  new Ext.data.Record(selectForm2.getForm().getValues());;
							Ext.apply(record.data,{'userName':"",'ownContactPerson':"",'contractCode':"",'customerName':"",'quotationCode':""});
						window.open(PATH + '/contractOrder/orderListExcel.do?orderType=4&searchForm='+Ext.util.JSON.encode(record));
					}
		 		}
			},{
				xtype:'tbseparator',
				hidden : _config.isCancelHide
			},{
				text:'订单作废',
				hidden : _config.isCancelHide,
				iconCls:'icon-excel',
				listeners: {
					'click' : function(){	
						var arr = gridCheckSele.getSelections();
							if (arr.length <= 0) {
								Ext.Msg.show({ title: '系统提示',msg: '请选择要删除的订单！', width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});
								return;
							}
							var ids = [];
							for(var i = 0 ;i < arr.length;i++){
								 ids.push(arr[i].id);
							}
							var handleDelete = function (btn){
								var ds = store
								if(btn == 'ok') {	
									Ext.Ajax.request({method: "post",url: PATH + '/contractOrder/CancelOrder.do',params: { ids: ids },
											success: function(response){
													var _responseArray = Ext.util.JSON.decode(response.responseText); 
													 if(_responseArray.success == true){
														 Ext.Msg.show({title:'价格提示',msg:_responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO,width: 300});
														 ds.reload();
													 }
											}
									});
								}
							}
							Ext.MessageBox.show({title:'系统提示',msg: '请确认要作废当前订单!',buttons: Ext.MessageBox.OKCANCEL,fn: handleDelete,width: 300});													
					}
		 		}
			}]
//			listeners : {
//				'sortchange' : function( grid, sortInfo ){
//					insertTotalRow();
//				}
//			}
	});	

Ext.ffc.showSlaveFillWindow = function (data){
	try {
			var slaveWindow = new Slave.SlaveManageWindow({busId : data.id, busType : 2});
			var _slaveStore = slaveWindow.listPanel.listView.store;
			_slaveStore.baseParams.busId = data.id;
			slaveWindow.show();
			_slaveStore.load();
		} catch(_err) {
			Ext.Msg.show({
				title : '信息提示',
				msg : _err.message,
				width : 260,
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.INFO
			});
		}
	}


	var  selectForm2 = new Ext.FormPanel({
	        labelAlign:'left',buttonAlign:'right',bodyStyle:'padding:5px;', border : false,
	        frame:true,labelWidth:80,monitorValid:false,
	        items:[
	           {layout:'column',border:false,labelSeparator:':',frame : true,
	           defaults:{layout: 'form',border:false,columnWidth:.3},
	           bbar : ['->',{
			           		text : "搜  索",
			           		iconCls : 'icon-search',
			           		handler : function() {
								var store = cut_tools.plan_order.index_grid.store;
								var searchStr = Ext.encode(selectForm2.getForm().getValues());
								store.baseParams.searchStr = searchStr;
			           			store.reload();
			           		}
		           		},
		           		'-',{
			           		text : "重  置",
			           		iconCls : 'icon-reset',
			           		handler : function () {
			           			selectForm2.getForm().reset();
			           		}
	           		}],
	           items:[
					{items: [{xtype:'textfield',fieldLabel: '订单编号',name: 'orderCode',anchor:'90%'},{xtype:'hidden',fieldLabel: '订单类型',name: 'orderType',value:4}]},
					{items: [{xtype:'textfield',fieldLabel: '供应商',name: 'supplierName',anchor:'90%'}]},
					{items: [{xtype:'textfield',fieldLabel: '供应商负责人',name: 'supplierOwnContactPerson',anchor:'90%'}]},
					{items: [new Ext.ftl.StockOrderComboBox()]},
					{items: [{xtype:'datefield',fieldLabel: '编制时间',name: 'startTime',anchor:'90%', format:'Y-m-d'}]},
					{items: [{xtype:'datefield',fieldLabel: '至',name: 'endTime',anchor:'90%', format:'Y-m-d'}]}
	           ]//items
	          }
	        ],
			keys : {
				key:Ext.EventObject.ENTER,
				fn:function(btn,e){
					var store = cut_tools.plan_order.index_grid.store;
					var searchStr = Ext.encode(selectForm2.getForm().getValues());
					store.baseParams.searchStr = searchStr;
					store.reload();
				}
			}
	})
	
	cut_tools.plan_order.index_win = new Ext.Panel({
            layout: 'border',
			width  : Ext.getBody().getWidth(),
			height : Ext.getBody().getHeight() - 50,
			buttonAlign:'right',
            items: [
            {
                region: 'north',
                iconCls:'icon-grid',
                split: true,
                height : 120,
                minSize: 120,
                maxSize: 120,
                collapsible: true,
                margins: '5 5 5 5',
                items : [selectForm2]
                
            }, {
                region: 'center',
                split: true,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
				layout: 'fit',
                margins: '-5 5 5 5',
                items : [cut_tools.plan_order.index_grid]
            }],
			bbar: new Ext.PagingToolbar({
			store: store,
			pageSize: PAGESIZE,
			displayInfo: true,
			displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
			emptyMsg: "<i>没有数据</i>"
		})
       });

	cut_tools.plan_order.index_win.render('paln_order');

})









