Ext.zhj.process
 = Ext.extend(Ext.grid.GridPanel, {
	isAddHide : true,isModifyHide : true,isDelHide : true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		
		
		
		var ds = new Ext.data.JsonStore({
					url : PATH + '/product/productWorkOrderListAction.do',
					root : 'productSortList',
					totalProperty : 'totalProperty',
					autoLoad : true,
					remoteSort : true,
					fields : ['workname', 'workstatus', 'creator','createtime','id']
				});
		this.jsonStore = ds;
	
		Ext.zhj.process.superclass.constructor.call(this, {
			bodyStyle : 'width:100%',
			height : Ext.getBody().getHeight() - 70,
			border : false,
			stripeRows : true,
			el : "productWorkOrderGird",
			frame : true,
			ds : this.jsonStore,
			view : new Ext.grid.GridView({
						deferEmptyText : false,
						emptyText : '无组别信息！'
					}),
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : true
					}),
			tbar : [{
						text : "添加",
						iconCls : 'icon-add',
						hidden : this.isAddHide,
						handler : function() {
							var AddProductWorkOrderWindow = new Ext.zhj.AddProductWorkOrderWindow();
							AddProductWorkOrderWindow.on('addProductSortSuccess',function(){
								this.getStore().reload();
							},this);
							AddProductWorkOrderWindow.show();
						},
						scope : this

					}, {
						xtype:'tbseparator',
						hidden : this.isAddHide
					},{
						text : "修改",
						iconCls : 'icon-modify',
						hidden : this.isAddHide,
						handler : function() {
							try {
								var _record = this.getSelected();
								
								var modifyWindow = new Ext.ftl.ModifyProductWorkOrderWindow();
								modifyWindow.on('addProductSortSuccess',function(){
									this.getStore().reload();
								},this);
								modifyWindow.show();
								var _form = modifyWindow.items.items[0].getForm();
								_form.loadRecord(_record);
							} catch(_e) {
								Ext.Msg.show({
									title : '信息提示',
									msg : _e.message,
									width : 260,
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.INFO
								});
							}
						},
						scope : this

					}, {
						xtype:'tbseparator',
						hidden : this.isAddHide
					}, {
						text : "删除",
						iconCls : 'icon-delete',
						hidden : this.isDelHide,
						handler : function() {

							var _store = this.getStore();

							var selectionModel = this.getSelectionModel();
							var selectedCount = selectionModel.getCount();

							if (selectedCount == 0) {
								Ext.Msg.alert('提示', '请选择要删除的产品组别信息!');
								return;
							} else {
								record = selectionModel.getSelected();
								Ext.Ajax.request({
									url : PATH
											+ '/product/deleteProductWorkOrderAction.do',
									params : {
										productWorkOrderIdPar : record.get("id")
									},
									success : function(response) {
										var responseArray = Ext.util.JSON
												.decode(response.responseText);
										if (responseArray.success == true) {
											Ext.Msg.show({
														title : '成功提示',
														msg : responseArray.msg,
														buttons : Ext.Msg.OK,
														width : 200,
														icon : Ext.MessageBox.INFO
													});
											_store.remove(record);
											_store.reload();
										} else {
											Ext.Msg.show({
														title : '错误提示',
														msg : responseArray.msg,
														buttons : Ext.Msg.OK,
														width : 200,
														icon : Ext.MessageBox.ERROR
													});
											return;
										}
									}

								});
							}
						},
						scope : this
					}],
			cm : new Ext.grid.ColumnModel([
					new Ext.grid.CheckboxSelectionModel(),
					new Ext.grid.RowNumberer({
					    header : '序号',
					    width : 50
					}), 
					{
					    header : '生产工单',
					    dataIndex : 'workname',
					    sortable:true
					    
					}, {
					    header : '工单状态',
					    dataIndex : 'workstatus',
					    sortable:true,
					    renderer:function(value){
							if (value == 0){
								return '待加工';
							}else if (value == 1){
								return '加工中';
							}else if (value == 2){
								return '加工完成';
							}
					    }
					}, {
					    header : '创建者',
					    dataIndex : 'creator',
					    sortable:true
					}, {
					    header : '创建时间',
					    dataIndex : 'createtime',
					    sortable:true
					},{
					    header : 'ID',
					    hidden : true,
					    sortable:true,
					    dataIndex : 'id'
					}]),
			bbar : new Ext.PagingToolbar({
						pageSize : PAGESIZE,
						emptyMsg : "没有记录",
						displayInfo : true,
						displayMsg : '显示第 {0} - {1} 条 共 {2} 条',
						store : this.jsonStore
					})
		});

	},
	
	/**
	 * 获取所选取的记录。如果没有选择，抛出一个异常。
	 * @return {} Record
	 */
	getSelected : function() {
		var _sm = this.getSelectionModel();
		
		if(_sm.getCount() == 0) {
			throw Error('请选择组别后再进行操作！');
		} else {
			return _sm.getSelected();
		}
	}

});


/**
 * 产品组别信息
 */

Ext.onReady(function() {
	getConfig = function() {
		var modules = LoginInfor.modules
		var _configStr = "{";
		for(var i = 0; i < modules.length; i++) {
			var module = modules[i];
			if("002" == module.id) {
				var childModule = module.children;
				for(var j = 0; j < childModule.length; j++) {
					if("002001" == childModule[j].id) {
						var _configArr = childModule[j].children;
						if(_configArr.length > 0) {
							for(var k = 0; k < _configArr.length; k++) {
								if(k != _configArr.length-1)
									_configStr += _configArr[k].url + ",";
								else 
									_configStr += _configArr[k].url + "}"
							}
						} else {
							_configStr += "}";
						}
						break;
					}
				}
				break;
			}
		}
		return Ext.decode(_configStr);
	}
			var productSortGrid = new Ext.zhj.process(getConfig());
			productSortGrid.getStore().load({
						params : {
							start : 0,
							limit : PAGESIZE
						}
					});
			var productWorkOrderViewPort = new Ext.Panel({
						width : Ext.getBody().getWidth(),
						height : Ext.getBody().getHeight() - 55,
						layout: 'fit',
						items : [productSortGrid]
					});
			productWorkOrderViewPort.render("productWorkOrderViewPort");
		})



/**
 * 添加产品组别基本信息窗口
 */
Ext.zhj.AddProductWorkOrderWindow = Ext.extend(Ext.Window, {
	productBrankCombox : null,
	postUrl : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
	    this.productBrankCombox = new Ext.zhj.ProductBrankCombox();
	    var _window = this;
		Ext.zhj.AddProductWorkOrderWindow.superclass.constructor.call(this, {
					bodyStyle : 'width:100%',
					title : this['title'] == null ? "添加生产工单信息" : this['title'],
					height : 220,
					width : 400,
					plain : true,
					bodyStyle : 'padding:15px',
					constrain : true,
					closeAction : 'hide',
					modal : true,
					frame : true,
					items : {
						xtype : "form",
						labelWidth : 100,
						defaultType : "textfield",
						frame : true,
						labelAlign : 'right',
						buttonAlign : 'right',
						bodyStyle : 'padding:5px;',

						items : [
								 {
									fieldLabel : "生产工单",
									name : "workname",
									anchor : '70%'
								}]
					},
					buttons : [{
						text : '保存',
						handler : function() {

							// 当前窗口
							//var _AddProductWorkOrderWindow = this.ownerCt.ownerCt;
							/**
							 * 表单对象
							 */
							var addForm = this.findByType('form')[0]
									.getForm();
							
							var _formValues = addForm.getValues();
							var _workname = _formValues.workname;
						
							
							if (_workname == '') {
								Ext.Msg.show({
									title : '提示',
									msg : '生产工单不能为空!',
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							
									
							
							var record = new Ext.data.Record(addForm
									.getValues());
						
							var productWorkOrderFormInfoPar = Ext.util.JSON.encode(record);
						
							Ext.Ajax.request({
										url : this.postUrl == null ? PATH+ '/product/addProductWorkOrderAction.do' :  this.postUrl,
										params : {
											productWorkOrderFormInfoPar : productWorkOrderFormInfoPar
										},
										success : function(response) {
											var responseArray = Ext.util.JSON
													.decode(response.responseText);
											if (responseArray.success == true) {
												Ext.Msg.show({
															title : '成功提示',
															msg : responseArray.msg,
															buttons : Ext.Msg.OK,
															width : 200,
															icon : Ext.MessageBox.INFO
														});
												this.fireEvent("addProductSortSuccess");		
												this.hide();
											} else {
												Ext.Msg.show({
															title : '错误提示',
															msg : responseArray.msg,
															buttons : Ext.Msg.OK,
															width : 200,
															icon : Ext.MessageBox.ERROR
														});
												return;
											}
										},scope : this

									});
						},scope : this

					}, {
						text : '取消',
						handler : function() {
							this.hide();
						}, scope : this
					}]

				});
				
				this.addEvents("addProductSortSuccess");

	}

});

Ext.ftl.ModifyProductWorkOrderWindow = Ext.extend(Ext.Window, {
	productBrankCombox : null,
	postUrl : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
	    this.productBrankCombox = new Ext.zhj.ProductBrankCombox();
	    var _window = this;
		Ext.zhj.AddProductWorkOrderWindow.superclass.constructor.call(this, {
					bodyStyle : 'width:100%',
					title : this['title'] == null ? "修改生产工单信息" : this['title'],
					height : 220,
					width : 400,
					plain : true,
					bodyStyle : 'padding:15px',
					constrain : true,
					closeAction : 'hide',
					modal : true,
					frame : true,
					items : {
						xtype : "form",
						labelWidth : 100,
						defaultType : "textfield",
						frame : true,
						labelAlign : 'right',
						buttonAlign : 'right',
						bodyStyle : 'padding:5px;',

						items : [
								 {
									fieldLabel : "生产工单",
									name : "workname",
									anchor : '70%'
								},{
									fieldLabel : "工单状态",
									name : "workstatus",
									anchor : '70%'
								},{
									fieldLabel : "",
									name : "id",
									hidden : true,
									anchor : '70%'
								}]
					},
					buttons : [{
						text : '保存',
						handler : function() {

							
							/**
							 * 表单对象
							 */
							var addForm = this.findByType('form')[0]
									.getForm();
							
							var _formValues = addForm.getValues();
							var _workname = _formValues.workname;
						
							
							if (_workname == '') {
								Ext.Msg.show({
									title : '提示',
									msg : '生产工单不能为空!',
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							
									
							
							var record = new Ext.data.Record(addForm
									.getValues());
						
							var productWorkOrderFormInfoPar = Ext.util.JSON.encode(record);
						
							Ext.Ajax.request({
										url : this.postUrl == null ? PATH+ '/product/updateProductWorkOrderAction.do' :  this.postUrl,
										params : {
											productWorkOrderFormInfoPar : productWorkOrderFormInfoPar
										},
										success : function(response) {
											var responseArray = Ext.util.JSON
													.decode(response.responseText);
											if (responseArray.success == true) {
												Ext.Msg.show({
															title : '成功提示',
															msg : responseArray.msg,
															buttons : Ext.Msg.OK,
															width : 200,
															icon : Ext.MessageBox.INFO
														});
												this.fireEvent("addProductSortSuccess");		
												this.hide();
											} else {
												Ext.Msg.show({
															title : '错误提示',
															msg : responseArray.msg,
															buttons : Ext.Msg.OK,
															width : 200,
															icon : Ext.MessageBox.ERROR
														});
												return;
											}
										},scope : this

									});
						},scope : this

					}, {
						text : '取消',
						handler : function() {
							this.hide();
						}, scope : this
					}]

				});
				
				this.addEvents("addProductSortSuccess");

	}

});



















