/**
 * 产品类别基本信息列表
 * 
 * @class Ext.zhj.ProductSortGridGrid
 * @extends Ext.grid.GridPanel
 */
Ext.zhj.ProductSortGridGrid = Ext.extend(Ext.grid.GridPanel, {
	isAddHide : true,isModifyHide : true,isDelHide : true,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		var editor = new Ext.ux.grid.RowEditor({
					saveText : '提交',
					cancelText : '取消'
				});
		/**
		 * 产品类别信息更新
		 */
		editor.on('afteredit', function(editrow, changes, r, rowIndex) {
					// alert(r.get('companyName'));
					var updateProductSortInfo = Ext.util.JSON.encode(r.data);
					Ext.Ajax.request({
								url : PATH + '/baseInfo/updateProductSortAction.do',
								params : {
									updateProductSortInfoPar : updateProductSortInfo
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
										return true;
										// _addCompanyWindow.close();
									} else {
										Ext.Msg.show({
													title : '错误提示',
													msg : responseArray.msg,
													buttons : Ext.Msg.OK,
													width : 200,
													icon : Ext.MessageBox.ERROR
												});
										return false;
									}
								}

							});
				});
		var ds = new Ext.data.JsonStore({
					url : PATH + '/baseInfo/productSortListAction.do',
					root : 'productSortList',
					totalProperty : 'totalProperty',
					autoLoad : true,
					remoteSort : true,
					fields : ['productBrand', 'sortCode', 'sortName','memo','id']
				});
		this.jsonStore = ds;
		var _storeProB = new Ext.data.JsonStore({
					url : PATH + '/baseInfo/getProductBrankListAction.do',
					fields : ['id', 'name'],
					root : 'productBrank'
				});
		Ext.zhj.ProductSortGridGrid.superclass.constructor.call(this, {
			bodyStyle : 'width:100%',
			height : Ext.getBody().getHeight() - 70,
//			enableHdMenu : false,
			border : false,
			stripeRows : true,
			el : "productSortGird",
			frame : true,
			//plugins : this.isModifyHide ? [] : [editor],
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
							var addProductSortWindow = new Ext.zhj.AddProductSortWindow();
							addProductSortWindow.on('addProductSortSuccess',function(){
								this.getStore().reload();
							},this);
							addProductSortWindow.show();
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
								
								var modifyWindow = new Ext.ftl.ModifySortWindow();
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
											+ '/baseInfo/deleteProductSortAction.do',
									params : {
										productSortIdPar : record.get("id")
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
							}), {
						header : '品牌',
						dataIndex : 'productBrand',
						sortable:true,
						editor : {
							xtype : 'combo',
							hideLabel : true,
							hiddenName : 'productBrand',
							mode : 'remote',
							displayField : 'name',
							valueField : 'name',
							width : '20',
							readOnly : true,
							triggerAction : 'all',
							emptyText : '请选择...',
							store : _storeProB
						}
					}, {
						header : '组别编号',
						dataIndex : 'sortCode',
						sortable:true,
						editor : {
							xtype : 'textfield'
						}
					}, {
						header : '组别名称',
						dataIndex : 'sortName',
						sortable:true,
						editor : {
							xtype : 'textfield',
							allowBlank : false
						}
					}, {
						header : '备注',
						dataIndex : 'memo',
						sortable:true,
						editor : {
							xtype : 'textfield'
						}
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
			var productSortGrid = new Ext.zhj.ProductSortGridGrid(getConfig());
			productSortGrid.getStore().load({
						params : {
							start : 0,
							limit : PAGESIZE
						}
					});
			var productSortViewPort = new Ext.Panel({
						width : Ext.getBody().getWidth(),
						height : Ext.getBody().getHeight() - 55,
						layout: 'fit',
						items : [productSortGrid]
					});
			productSortViewPort.render("productSortViewPort");
		})



/**
 * 添加产品组别基本信息窗口
 */
Ext.zhj.AddProductSortWindow = Ext.extend(Ext.Window, {
	productBrankCombox : null,
	postUrl : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
	    this.productBrankCombox = new Ext.zhj.ProductBrankCombox();
	    var _window = this;
		Ext.zhj.AddProductSortWindow.superclass.constructor.call(this, {
					bodyStyle : 'width:100%',
					title : this['title'] == null ? "添加产品组别信息" : this['title'],
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
								this.productBrankCombox
								, {
									fieldLabel : "组别编号",
									name : "sortCode",
									anchor : '70%'
								}, {
									fieldLabel : "组别名称",
									name : "sortName",
									anchor : '70%'
								}, {
									fieldLabel : "备注",
									name : "memo",
									anchor : '70%'
								}, {
									xtype : 'hidden',
									name : "id",
									//hidden : true,
									anchor : '70%'
								}]
					},
					buttons : [{
						text : '保存',
						handler : function() {

							// 当前窗口
							//var _addProductSortWindow = this.ownerCt.ownerCt;
							/**
							 * 表单对象
							 */
							var addForm = this.findByType('form')[0]
									.getForm();
							
							var _formValues = addForm.getValues();
							var _productBrand = _formValues.productBrand;
							var _sortCode = _formValues.sortCode;
							var _sortName = _formValues.sortName;
							
							if (_productBrand == '') {
								Ext.Msg.show({
									title : '提示',
									msg : '品牌不能为空!',
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							if (_sortCode == '') {
								Ext.Msg.show({
									title : '提示',
									msg : '组别编号不能为空!',
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							if (_sortName == '') {
								Ext.Msg.show({
									title : '提示',
									msg : '组别名称不能为空!',
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								return false;
							}		
									
							
							var record = new Ext.data.Record(addForm
									.getValues());
							//alert(Ext.util.JSON.encode(record));return;
							var productSortFormInfo = Ext.util.JSON.encode(record);
							Ext.Ajax.request({
										url : this.postUrl == null ? PATH+ '/baseInfo/addProductSortAction.do' : PATH + this.postUrl,
										params : {
											productSortFormInfoPar : productSortFormInfo
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

Ext.ftl.ModifySortWindow = Ext.extend(Ext.zhj.AddProductSortWindow, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		
		Ext.ftl.ModifySortWindow.superclass.constructor.call(this, {
			title : '修改产品组别信息',
			postUrl : PATH + "/baseInfo/updateProductSortAction.do"
		})
	}
})



















