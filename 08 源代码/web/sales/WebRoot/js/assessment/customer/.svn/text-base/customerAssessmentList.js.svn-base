Ext.zhj.SearchCustomerAssessment = Ext.extend(Ext.FormPanel, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		Ext.zhj.SearchCustomerAssessment.superclass.constructor.call(this, {
			labelAlign : 'right',
			buttonAlign : 'right',
			bodyStyle : 'padding:5px;',
			el : 'searchCustomerAssessment',
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
								this.ownerCt.fireEvent('searchCustomerAssessment', this.ownerCt, this.ownerCt.getValues());
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
						this.fireEvent('searchCustomerAssessment', this, this.getValues());
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
				        	 items : [new Ext.zhj.CustomerCombox({store:new Ext.data.JsonStore({
				        			url : PATH + '/baseInfo/customersListAction.do?&method=assessment&start=0&limit=100',
				        			fields : ['customerCode', 'customerName'],
				        			root : 'customersList'
				        		})})]
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


/**
 * 公司基本信息列表
 * 
 * @class Ext.zhj.CustomerAssessmentGrid
 * @extends Ext.grid.GridPanel
 */
Ext.zhj.CustomerAssessmentGrid = Ext.extend(Ext.grid.GridPanel, {
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
					url : PATH + '/assessment/customer.do?ffc=list',
					root : 'items',
					totalProperty : 'totalCount',
					autoLoad : false,
					remoteSort : true,
					fields : ['custormerName', 'custormerCode', 'empNumber', 'annualSale',
							'cooperationAmount', 'product', 'competitive',
							'createTimeString', 'salesProportion', 'createUserName',
							'growth', 'id', 'lastEditTimeString',
							'lastUserId', 'lastUserName', 'grossMargin',
							'payRisk', 'payPunctualityRate', 'payDelay',
							'willingness','score']
				});
		ds.on({'beforeload' : function() {
						if (this.searchRecord != null) {
							var _searchStr = Ext.util.JSON.encode(this.searchRecord.data);
							ds.baseParams.searchStr = _searchStr;
						}
					},
					scope : this
				});
		Ext.zhj.CustomerAssessmentGrid.superclass.constructor.call(this, {
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
							var addAssessmentWindow = new Ext.zhj.AddCustomerAssessmentWindow({
							    formUrl : '/assessment/customer.do?ffc=add',title:"新增评估信息"
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
								Ext.Msg.alert('提示', '请选择要修改的客户评估信息!');
								return;
							} else {
									var record = selectionModel.getSelected();
									var updateCompanyWindow = new Ext.zhj.AddCustomerAssessmentWindow({
										formUrl : '/assessment/customer.do?ffc=update',title:"修改评估信息"
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
									Ext.Ajax.request({url : PATH + '/assessment/customer.do?ffc=delete',
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
								var values = searchCustomerAssessmentForm.getForm().getValues();
								var para = [];
								for(var i in values){
									if(values[i] && values[i] != ''){
								       para.push(i + "=" + values[i]);
									}
								}
								window.open(PATH + '/assessment/customer.do?ffc=excel&' + para.join("&"));
							}
						}
		        	}],
			cm : new Ext.grid.ColumnModel([
					new Ext.grid.CheckboxSelectionModel(),
					new Ext.grid.RowNumberer({
								header : '序号',
								width : 35
							}), {
						header : '客户编号',
						dataIndex : 'custormerCode',
						hidden:true
					}, {
						header : '客户名称',
						dataIndex : 'custormerName',
					}, {
						header : '员工人数',
						dataIndex : 'empNumber'
					}, {
						header : '年营业额',
						dataIndex : 'annualSale'
					}, {
						header : '主要产品',
						dataIndex : 'product'
					},{
						header : '行业竞争力',
						dataIndex : 'competitive'
					}, {
						header : '上一年合作销售金额',
						dataIndex : 'cooperationAmount'
					}, {
						header : '销售份额',
						dataIndex : 'salesProportion'
					}, {
						header : '增长比例',
						dataIndex : 'growth'
					}, {
						header : '毛利率',
						dataIndex : 'grossMargin'
					}, {
						header : '付款风险',
						dataIndex : 'payRisk'
					}, {
						header : '付款准时率',
						dataIndex : 'payPunctualityRate'
					}, {
						header : '拖款时间',
						dataIndex : 'payDelay'
					}, {
						header : '合作意愿',
						dataIndex : 'willingness'
					}, {
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

var searchCustomerAssessmentForm;
Ext.onReady(function() {
	getConfig = function() {
		var modules = LoginInfor.modules
		var _configStr = "{";
		for(var i = 0; i < modules.length; i++) {
			var module = modules[i];
			if("013" == module.id) {
				var childModule = module.children;
				for(var j = 0; j < childModule.length; j++) {
					if("013002" == childModule[j].id) {
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
			searchCustomerAssessmentForm = new Ext.zhj.SearchCustomerAssessment();
			var companyGrid = new Ext.zhj.CustomerAssessmentGrid(getConfig());

			// 监听搜索事件
			searchCustomerAssessmentForm.on({
						'searchCustomerAssessment' : function(_form, _values) {
							companyGrid.setSearchStr(_values);
							// alert('DDDDDDD' + _values.get('companyName'));
							companyGrid.getStore().reload({params : {start : 0, limit : PAGESIZE}});
						},
						scope : this
					});

			
			var customerAssessmentViewPort = new Ext.Panel({
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
									items : [searchCustomerAssessmentForm]
								}, {

									region : "center",
									layout : 'fit',
									collapsible : true,
									margins : '5 5 5 5',
									items : [companyGrid]

								}]
					});
			customerAssessmentViewPort.render("customerAssessmentViewPort");
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
Ext.zhj.AddCustomerAssessmentWindow = Ext.extend(Ext.Window, {
	title:null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);

		Ext.zhj.AddCustomerAssessmentWindow.superclass.constructor.call(this, {
			// bodyStyle : 'width:100%',
			title : this.title,
			height : 350,
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
								                	new Ext.zhj.CustomerCombox()
								        
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
										fieldLabel : '行业竞争力',
										name : 'competitive',
										anchor : '90%'
									}]
						}, {
							items : [{
										xtype : this.title=='新增评估信息'?'hidden':'numberfield',
										fieldLabel : '上一年度销售金额',
										allowDecimals: true,
										name : 'cooperationAmount',
										anchor : '90%',
										readOnly:true
									}]
						}, {
							items : [{
								xtype : 'numberfield',
								allowDecimals: true,
								fieldLabel : '销售份额',
								name : 'salesProportion',
								anchor : '90%'
							}]
						},{
							items : [{
										xtype : 'numberfield',
										allowDecimals: true,
										fieldLabel : '增长比例',
										name : 'growth',
										anchor : '90%'
									}]
						},{
							items : [{
								xtype : 'textfield',
								allowDecimals: true,
								fieldLabel : '平均销售毛利率',
								name : 'grossMargin',
								width:400,
								anchor : '90%'
							}]
						},{
							items : [new Ext.zhj.PayRiskCombox()]
						}, {
							items : [new Ext.zhj.PayPunctualityRateCombox()]
						}, {
							items : [{
								xtype : 'numberfield',
								allowDecimals: false,
								fieldLabel : '拖款时间',
								name : 'payDelay',
								anchor : '90%'
							}]
										
						}, {
							items : [{
										xtype : 'textfield',
										fieldLabel : '合作意愿',
										name : 'willingness',
										anchor : '90%'
									}]
						}, {
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
