Ext.zhj.SearchSupplierAssessment = Ext.extend(Ext.FormPanel, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		Ext.zhj.SearchSupplierAssessment.superclass.constructor.call(this, {
			labelAlign : 'right',
			buttonAlign : 'right',
			bodyStyle : 'padding:5px;',
			el : 'searchSupplierAssessment',
			border : false,
			frame : true,
			labelWidth : 70,
			monitorValid : false,
			enableKeyEvents: true,
			
			items : [{
				layout : 'column',
				border : false,
				labelSeparator : ':',
				frame : true,
				defaults : {
					layout : 'form',
					border : false,
					columnWidth : .3
				},
				listeners : {
					'render': function(p) {
						p.getEl().on('keypress', function(e){
							if(e.getKey() == e.ENTER){
								this.ownerCt.fireEvent('searchSupplierAssessment', this.ownerCt, this.ownerCt.getValues());
							}
						},this);
					}
				},
				bbar : ['->', {
					text : "搜  索",
					xtype:'button',
					iconCls : 'icon-search',
					handler : function() {
						// 发布search事件
						this.fireEvent('searchSupplierAssessment', this, this.getValues());
					},
					scope : this
				}, '-', {
					text : "重  置",
					iconCls : 'icon-reset',
					handler : function() {
						this.getForm().reset();
					},
					scope : this
				}],
				
				items : [
				         {
				        	 items : [
				        	          new Ext.zhj.SupplierCombox()
				        	         ]
				         }
				        ]
			}]
		});
		/**
		 * 当前对象添加searchAssessment方法
		 */
		this.addEvents("searchAssessment");
	},

	/**
	 * 获取搜索条件
	 * 
	 * @return {} 返回搜索条件:Record
	 */
	getValues : function() {
		var record = new Ext.data.Record(this.getForm().getValues());
		return record;
	}

});

Ext.zhj.onSlaveClick = function(_id) {
	window.event.cancelBubble = true;
	var slaveWindow = new Slave.SlaveManageWindow({busId : _id, busType : 3});
	slaveWindow.show();
}

Ext.zhj.onSlaveClickFooter = function(_id) {
	//alert("######");
	window.event.cancelBubble = true;
	var slaveWindowFooter = new Slave.SlaveManageWindow({busId : _id, busType : 4});
	slaveWindowFooter.show();
}

Ext.zhj.SupplierAssessmentGrid = Ext.extend(Ext.grid.GridPanel, {
	isAddHide : true,isModifyHide : true,isDelHide : true,isToExcelHide:true,
	searchRecord : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		var editor = new Ext.ux.grid.RowEditor({
					saveText : '提交',
					cancelText : '取消'
				});
		
		var ds = new Ext.data.JsonStore({
					url : PATH + '/assessment/supplier.do?ffc=list',
					root : 'items',
					totalProperty : 'totalCount',
					autoLoad : false,
					remoteSort : true,
					fields : ['supplierName', 'supplierId', 'amount', 'annualSale',
							'areas', 'brandPower', 'competitive',
							'createTimeString', 'createUserId', 'createUserName',
							'empNumber', 'id', 'lastEditTimeString',
							'lastUserId', 'lastUserName', 'marketShare',
							'payPeriod', 'priceDifference', 'product',
							'qualfiedRate', 'quality', 'ratio',
							'report', 'returnRate', 'score','support',
							'sole','deliveryGoodRate', 'deliveryPunctualityRate','annualSale']
				});
		ds.on({'beforeload' : function() {
						if (this.searchRecord != null) {
							var _searchStr = Ext.util.JSON.encode(this.searchRecord.data);
							ds.baseParams.searchStr = _searchStr;
						}
					},
					scope : this
				});
		Ext.zhj.SupplierAssessmentGrid.superclass.constructor.call(this, {
			// bodyStyle : 'width:100%',
			height : Ext.getBody().getHeight() - 175,
			enableHdMenu : false,
			border : false,
			stripeRows : true,
			frame : true,
			ds : ds,
			view : new Ext.grid.GridView({
						deferEmptyText : false,
					}),
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : true
					}),
			tbar : [{
						text : "新增评估信息",
						iconCls : 'icon-add',
						hidden : this.isAddHide,
						handler : function() {
							var addAssessmentWindow = new Ext.zhj.AddSupplierAssessmentWindow({
							    formUrl : '/assessment/supplier.do?ffc=add'
							});
							addAssessmentWindow.on('assessmentAddSuccess',
									function() {
										this.getStore().reload();
									}, this);
							addAssessmentWindow.show();
						},scope : this
					},{
						xtype:'tbseparator',
						hidden : this.isAddHide
					},{
						text : "修改评估信息",
						iconCls : 'icon-modify',
						hidden : this.isModifyHide,
						handler : function() {
							var selectionModel = this.getSelectionModel();
							var selectedCount = selectionModel.getCount();
							if (selectedCount == 0) {
								Ext.Msg.alert('提示', '请选择要修改的供应商评估信息!');
								return;
							} else {
									var record = selectionModel.getSelected();
									var updateCompanyWindow = new Ext.zhj.AddSupplierAssessmentWindow({
										formUrl : '/assessment/supplier.do?ffc=update'
									});
									var farr = updateCompanyWindow.findByType('form');
									if(farr.length == 0) return ;
									var f = farr[0];
									updateCompanyWindow.on('show',
										function() {
											f.getForm().setValues(record.data);
										}, this);
									updateCompanyWindow.on('close',
										function() {
											this.getStore().reload();
										}, this);
									updateCompanyWindow.show();
							}
						},scope : this
					}, {
						xtype:'tbseparator',
						hidden : this.isAddHide
					}, {
						text : "删除评估信息",
						iconCls : 'icon-delete',
						hidden : this.isDelHide,
						handler : function() {
							var _store = this.getStore();
							var selectionModel = this.getSelectionModel();
							var selectedCount = selectionModel.getCount();

							if (selectedCount == 0) {
								Ext.Msg.alert('提示', '请选择要删除的评估信息!');
								return;
							} else {
								Ext.MessageBox.confirm('系统提示', '请确认是否要删除当前所选中评估信息!', function(btn){
									if(btn != 'yes'){return ;}
									var record = selectionModel.getSelected();
									Ext.Ajax.request({url : PATH + '/assessment/supplier.do?ffc=delete',
										params : {
											id : record.get("id")
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
								});
							}
						},scope : this
					},{
		        		text:'导出合同列表',
						hidden : this.isToExcelHide,
						iconCls:'icon-excel',
						listeners : {
							'click' : function(obj) {
								var values = searchSupplierAssessmentForm.getForm().getValues();
								var para = [];
								for(var i in values){
									if(values[i] && values[i] != ''){
								       para.push(i + "=" + values[i]);
									}
								}
								window.open(PATH + '/assessment/supplier.do?ffc=excel&' + para.join("&"));
							}
						}
		        	}],
			cm : new Ext.grid.ColumnModel([
					new Ext.grid.CheckboxSelectionModel(),
					new Ext.grid.RowNumberer({
								header : '序号',
								width : 35
							}), {
						header : '供应商id',
						dataIndex : 'supplierName',
						hidden:true
					}, {
						header : '供应商名称',
						dataIndex : 'supplierName'
					}, {
						header : '主要产品',
						dataIndex : 'product'
					}, {
						header : '品牌影响力',
						dataIndex : 'brandPower'
					},{
						header : '年营业额',
						dataIndex : 'annualSale'
					},{
						header : '市场份额',
						dataIndex : 'marketShare'
					}, {
						header : '产品竞争力',
						dataIndex : 'competitive'
					}, {
						header : '市场均价价差',
						dataIndex : 'priceDifference'
					}, {
						header : '质量合格率',
						dataIndex : 'qualfiedRate'
					}, {
						header : '退货率',
						dataIndex : 'returnRate'
					}, {
						header : '交货准时率',
						dataIndex : 'deliveryPunctualityRate'
					}, {
						header : '准时交货良率',
						dataIndex : 'deliveryGoodRate'
					}, {
						header : '指定区域',
						dataIndex : 'areas'
					}, {
						header : '独家',
						dataIndex : 'sole'
					}, {
						header : '报备',
						dataIndex : 'support'
					}, {
						header : '备库金额',
						dataIndex : 'amount'
					}, {
						header : '备库金额占月销售额的比例',
						dataIndex : 'ratio'
					},  {
						header : '付款账期',
						dataIndex : 'payPeriod'
					},  {
						header : '评分',
						dataIndex : 'score'
					},  {
						header : '编制时间',
						dataIndex : 'createTimeString'
					},  {
						header : '编制人',
						dataIndex : 'createUserName'
					},{
						header : 'ID',
						hidden : true,
						dataIndex : 'id'
					}]),
			bbar : new Ext.PagingToolbar({
						pageSize : PAGESIZE,
						emptyMsg : "没有记录",
						displayInfo : true,
						displayMsg : '显示第 {0} - {1} 条 共 {2} 条',
						store : ds
					})
		});

	},
	// 附件管理
	onSlaveClick : function() {
		try {
			var _store = this.getStore();

			var selectionModel = this.getSelectionModel();
			var selectedCount = selectionModel.getCount();

			if (selectedCount == 0) {
				Ext.Msg.alert('提示', '请选择要查看的公司信息!');
				return;
			} else {
				var record = selectionModel.getSelected();
				// alert(record.get('id'));
				var slaveWindow = new Slave.SlaveManageWindow({
							busId : record.get('id'),
							busType : 1
						});
				slaveWindow.show();
			}

		} catch (_err) {
			Ext.Msg.show({
						title : '信息提示',
						msg : _err.message,
						width : 260,
						buttons : Ext.Msg.OK,
						icon : Ext.MessageBox.INFO
					});
		}
	},
	/**
	 * 为搜索条件设值
	 * 
	 * @param {}
	 *            _value
	 */
	setSearchStr : function(_value) {
		this.searchRecord = _value;
	}

});

var searchSupplierAssessmentForm;
Ext.onReady(function() {
	getConfig = function() {
		var modules = LoginInfor.modules
		var _configStr = "{";
		for(var i = 0; i < modules.length; i++) {
			var module = modules[i];
			if("013" == module.id) {
				var childModule = module.children;
				for(var j = 0; j < childModule.length; j++) {
					if("013001" == childModule[j].id) {
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
			searchSupplierAssessmentForm = new Ext.zhj.SearchSupplierAssessment();
			var companyGrid = new Ext.zhj.SupplierAssessmentGrid(getConfig());

			// 监听搜索事件
			searchSupplierAssessmentForm.on({
						'searchSupplierAssessment' : function(_form, _values) {
							companyGrid.setSearchStr(_values);
							// alert('DDDDDDD' + _values.get('companyName'));
							companyGrid.getStore().reload({params : {start : 0, limit : PAGESIZE}});
						},
						scope : this
					});

			
			var supplierAssessmentViewPort = new Ext.Panel({
						width : Ext.getBody().getWidth(),
						height : Ext.getBody().getHeight() - 55,
						layout: 'border',
						items : [{
									region : "north",
									layout : 'fit',
									height : 105,
									frame : true,
									collapsible : true,
									margins : '5 5 5 5',
									items : [searchSupplierAssessmentForm]
								}, {

									region : "center",
									layout : 'fit',
									collapsible : true,
									margins : '5 5 5 5',
									items : [companyGrid]

								}]
					});
			supplierAssessmentViewPort.render("supplierAssessmentViewPort");
			companyGrid.getStore().load({
				params : {
					start : 0,
					limit : PAGESIZE
				}
			});
		})

/**
 * 添加评估信息窗口
 */
Ext.zhj.AddSupplierAssessmentWindow = Ext.extend(Ext.Window, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);

		Ext.zhj.AddSupplierAssessmentWindow.superclass.constructor.call(this, {
			// bodyStyle : 'width:100%',
			title : "评估信息",
			height : 400,
			width : 600,
			plain : true,
			bodyStyle : 'padding:15px',
			closeAction : 'close',
			constrain : true,
			modal : true,
			frame : true,
			items : [{
				xtype : 'form',
				layout : 'column',
				border : false,
				labelSeparator : ':',
				frame : true,
				defaults : {
					layout : 'form',
					border : false,
					columnWidth : .5,
					labelAlign : 'right',
					labelWidth : '60'
				},
				items : [{
							items : [{
										xtype : 'hidden',
										fieldLabel : 'ID',
										name : 'id'
									}]
						}, {
							items : [ 
							        	new Ext.zhj.SupplierCombox()
								    ]
						 }, {
							items : [{
										xtype : 'numberfield',
										fieldLabel : '员工人数',
										name : 'empNumber',
										anchor : '90%'
									
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										fieldLabel : '年营业额',
										allowDecimals: true,
										name : 'annualSale',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'textfield',
										fieldLabel : '主要产品',
										name : 'product',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'textfield',
										fieldLabel : '品牌影响力',
										name : 'brandPower',
										emptyText : '',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										allowDecimals: true,
										fieldLabel : '市场份额',
										name : 'marketShare',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'textfield',
										fieldLabel : '产品竞争力',
										name : 'competitive',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										fieldLabel : '市场均价差价',
										allowDecimals: true,
										name : 'priceDifference',
										anchor : '90%',
										readOnly:true
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										allowDecimals: true,
										fieldLabel : '合格率',
										name : 'qualfiedRate',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										allowDecimals: true,
										fieldLabel : '退货率',
										name : 'returnRate',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										fieldLabel : '交货准时率',
										allowDecimals: true,
										name : 'deliveryPunctualityRate',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										fieldLabel : '准时交货良率',
										allowDecimals: true,
										name : 'deliveryGoodRate',
										anchor : '90%'
									}]
						}, {
							items : [new Ext.ffc.TrueFalseComboBox({fieldName : '指定区域',fieldValue:'areas'})]
						}, {
							items : [new Ext.ffc.TrueFalseComboBox({fieldName : '独家',fieldValue:'sole'})]
						}, {
							items : [new Ext.ffc.TrueFalseComboBox({fieldName : '报备',fieldValue:'report'})]
										
						}, {
							items : [{
										xtype : 'textfield',
										fieldLabel : '支持力度',
										name : 'support',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'textfield',
										fieldLabel : '服务、制造流程',
										name : 'quality',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : 'numberfield',
										fieldLabel : '备库金额',
										name : 'amount',
										anchor : '90%'
									}]
						}, {
							items : [new Ext.ffc.PayPeriodComboBox()]
						},  {
							items : [{
										xtype : 'numberfield',
										fieldLabel : '评分',
										name : 'score', 
										anchor : '90%'
									}]
						}]
			}],
			buttons : [{
				text : '保存',
				handler : function() {

					// 当前窗口
					var _addAssessmentWindow = this.ownerCt.ownerCt;
					var _formUrl = _addAssessmentWindow.formUrl;
					/**
					 * 表单对象
					 */
					var addForm = _addAssessmentWindow.findByType('form')[0]
							.getForm();
							
				    var _formValues = addForm.getValues();
					var assessmentFormInfo = Ext.util.JSON.encode(addForm.getValues());
					Ext.Ajax.request({
								url : PATH + _formUrl,
								params : {
									assessmentFormInfoPar : assessmentFormInfo
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
										_addAssessmentWindow
												.fireEvent('assessmentAddSuccess');
										_addAssessmentWindow.close();
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

							}, this);
				}

			}, {
				text : '取消',
				handler : function() {
					this.ownerCt.ownerCt.close();
				}
			}]

		});
		this.addEvents('assessmentAddSuccess');
	}

});
