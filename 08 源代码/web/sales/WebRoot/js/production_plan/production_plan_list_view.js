Ext.onReady(function(){
	var ProductionPlanListStore = new Ext.data.Store({
		remoteSort : true,
       proxy: new Ext.data.HttpProxy({url:PATH + '/productionPlan/ProductionPlanEditAction.do?ffc=getProductionPlanList&limit=14'}),//调用的动作 
	   reader: new Ext.data.JsonReader({
       root: 'items',  //从struts2里面传递过来的参数 
	   totalProperty :'totalCount'
     }, 
	 [ //JSON数据的映射
        {name: 'planCode',mapping:'planCode',type:'string'},
		{name: 'productCode',mapping:'productCode',type:'string'},
        {name: 'count',mapping:'count',type:'string'},
        {name: 'status',mapping:'status',type:'string'},
		{name: 'category',mapping:'category',type:'string'},
		{name: 'bacthNo',mapping:'bacthNo',type:'string'}
     ])
	});


var  selectForm3 = new Ext.FormPanel({
                        labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
                        frame:true,labelWidth:80,monitorValid:false,border:false,
                        items:[
                            {layout:'column',border:false,labelSeparator:':',
                            defaults:{layout: 'form',border:false,columnWidth:.2},
                            items:[
                            {items: [{xtype:'textfield',fieldLabel: '计划编号',name: 'planCode',anchor:'70%'}]},	
							{items: [{xtype:'textfield',fieldLabel: '产品编号',name: 'productCode',anchor:'70%'}]},
							{items: [{xtype:'textfield',fieldLabel: '生产批次号',name: 'bacthNo',anchor:'70%'}]},
                            {items: [new Ext.ffc.ProductionPlanStatusComboBox({anchor:'70%'})]},
                            {items: [new Ext.ffc.ProductionPlanCategoryComboBox({anchor:'70%'})]}],//items
						bbar : ['->',{
							text : "搜  索",
							iconCls:'icon-search',
							handler : function() {
								var seachParams = selectForm3.getForm().getValues();
									ProductionPlanListStore.load({params:seachParams});
							}
	           			},'-',{  
										text:'重置'  
										,iconCls:'icon-reset',
										listeners : {
											'click' : function(){
												var bform = selectForm3.getForm();
												bform.reset();
												bform.findField('planStatus').setValue('-1');
											},scope : this
										}
										
								}]
                            }
                        ]//items
                    });//FormPanel

var gridCheckSele = new Ext.grid.CheckboxSelectionModel();

    var grid = new Ext.grid.GridPanel({
        ds : ProductionPlanListStore,
        store: ProductionPlanListStore,
		sm:gridCheckSele,
		frame:true,
        columns: [new Ext.grid.RowNumberer(),//自动行号
			gridCheckSele,
            {header: "计划编号", width: 155, sortable: true,  dataIndex: 'planCode'},
			{header: "产品编号", width: 155, sortable: true,  dataIndex: 'productCode'},
			{header: "产品数量", width: 155, sortable: true,  dataIndex: 'count'},
			{
	            header:'生产批次号',
	            width:100,
	            resizable : true,
				sortable: true,
	            dataIndex:'bacthNo'
	        },{
	            header:'生产计划种类',
	            width:100,
	            resizable : true,
				sortable: true,
	            dataIndex:'category',
	            renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
							var arr = [[1,'<span style="color:#0033FF">自制生产计划</span>'],
							[2,'<span style="color:#2D61B5">外协生产计划</span>']];
							for(var i = 0;i < arr.length ;i++){
							    if(value == arr[i][0]){
								    return arr[i][1];
								}
							}
							return value;
				}
	        },{
	            header:'状态',
	            width:100,
				sortable: true,
	            dataIndex:'status',
	            renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
							var arr = [[1,'<span style="color:#0033FF">编制中</span>'],
							[2,'<span style="color:#2D61B5">已发布</span>']];
							for(var i = 0;i < arr.length ;i++){
							    if(value == arr[i][0]){
								    return arr[i][1];
								}
							}
							return value;
				}
	        }
        ],
        //stripeRows: true,
        height:580,
        width:1270,
		tbar:[{
        		text:'新增计划',
				tooltip: '新增计划',
				iconCls : 'icon-add',
				handler : function() {
							var addPlanWindow = new Ext.zhj.AddPlanWindow({
							    formUrl : '/productionPlan/ProductionPlanEditAction.do?ffc=addProductionPlan'
							});
							addPlanWindow.on('planAddSuccess',
									function() {
										ProductionPlanListStore.reload();
									}, this);
							addPlanWindow.show();
						},scope : this
        	},{
				xtype:'tbseparator'
			},{
        		text:'修改计划',
				tooltip: '修改计划',
				iconCls : 'icon-modify',
				hidden : this.isModifyHide,
				handler : function() {
					var arr = gridCheckSele.getSelections();
					if(arr.length <= 0){
						Ext.Msg.alert("消息", "请选择要修改的生产计划!");
						return;
					}
					if(arr.length > 1){
						Ext.Msg.alert("消息", "只能选择一条数据进行修改操作!");
						return;
					}
					var conId = arr[0].id;
					if(arr[0].get("status") != 1){
						Ext.Msg.alert("消息", "所选择生产计划不允许修改!");
					    return ;
					}
					
					var updateCompanyWindow = new Ext.zhj.EditPlanWindow({
					    planInfo:arr[0],
						formUrl : '/productionPlan/ProductionPlanEditAction.do?ffc=updatePlan'
					});
					var farr = updateCompanyWindow.findByType('form');
					if(farr.length == 0) return ;
					var f = farr[0];
					updateCompanyWindow.on('show',
						function() {
							f.getForm().setValues(arr[0]);
							f.getForm.productCode=arr[0].get("planCode");
						}, this);
					updateCompanyWindow.on('close',
						function() {
							ProductionPlanListStore.reload();
						}, this);
					updateCompanyWindow.show();
				},scope : this
        	},{
				xtype:'tbseparator'
			},{
        		text:'删除计划',
				tooltip: '删除计划',
				iconCls : 'icon-delete',
				listeners : {
					'click' : function() {
						var arr = gridCheckSele.getSelections();
						if(arr.length <= 0){
							Ext.Msg.alert("消息", "请选择要删除的储备计划!");
							return;
						}
						var planCodes = [];
						for(var i = 0 ;i < arr.length;i++){
						     planCodes.push(arr[i].get("planCode"));
							 if(arr[i].get("status") != 1){
								Ext.Msg.alert("消息", "所选择储备计划不允许删除!");
							    return ;
							 }
						}
						Ext.MessageBox.confirm('系统提示', '请确认是否要删除当前所选中生产计划!', function(btn){
							if(btn != 'yes'){return ;}
							    Ext.Ajax.request({
									method: "post",
									params: { 'ids' : planCodes},
									url: PATH + '/productionPlan/ProductionPlanEditAction.do?ffc=deletePlan',
									success: function(response){
											ProductionPlanListStore.reload();
									}
								});
						   });
					}
				}
        	},{
				xtype:'tbseparator'
			},{
        		text:'计划确认',
				tooltip: '计划确认',
				iconCls : 'icon-submit',
				listeners : {
					'click' : function() {
						var arr = gridCheckSele.getSelections();
							if(arr.length <= 0){
								Ext.Msg.alert("消息", "请选择要确认的计划!");
								return;
							}
							var planCodes = [];
							for(var i = 0 ;i < arr.length;i++){
								 planCodes.push(arr[i].get("planCode"));
								 if(arr[i].get("status") != 1 ){
									Ext.Msg.alert("消息", "只有[编制]状态，计划才需要确认!");
									return ;
								 }
							}
							Ext.MessageBox.confirm('系统提示', '是否要确认当前选中的生产计划!', function(btn){
								Ext.Ajax.request({
								method: "post",
								params: { 'ids' : planCodes},
								url: PATH + "/productionPlan/ProductionPlanEditAction.do?ffc=confirmPlan",
								success: function(response){
										if(response.responseText != ''){
											Ext.Msg.alert("消息", response.responseText);
										}else{
											Ext.Msg.alert("消息", "计划确认成功！");
											ProductionPlanListStore.load();
										}
								}
								});
							});
					}
				}
        	},{
				xtype:'tbseparator'
			},{
        		text:'查看计划',
				tooltip: '查看计划',
				iconCls : 'icon-detail',
				listeners : {
					'click' : function() {
							var arr = gridCheckSele.getSelections();
							if(arr.length <= 0){
								Ext.Msg.alert("消息", "请选择要修改的生产计划!");
								return;
							}
							if(arr.length > 1){
								Ext.Msg.alert("消息", "只能选择一条数据进行查看操作!");
								return;
							}

							var conId = arr[0].id;
							
							var dData = arr[0].data;
							var planId = dData.id;
							//Ext.apply(dData,arr[0].data);
							
							Ext.Ajax.request({
									method: "post",
									params: { 'orderId' : dData.orderInforId},
									url: PATH + '/reservePlan/ReservePlanViewAction.do?ffc=reservePlanViewById',
									success: function(response){
										try{
											//alert(response.responseText);
											eval("var ReservePlanMainInfor=" + response.responseText);
											var conEditWin = new Ext.ffc.ReservePlanEditWindow(
												{
													readOnly:true,
													'ReservePlanInfor':ReservePlanMainInfor,'defultSelectPlanId':planId,
													listeners : {
														'close' : function(){
															ProductionPlanListStore.reload();
														}
													}
												}
											);
									
											conEditWin.show();
										}catch(e){alert(e);}
									}
							});
					}
				}
        	}
		]
    });



    //grid.render('contract_list_');

	var select_quotations_win = new Ext.Panel({
            layout: 'border',
			//title: '参照报价单',
			width  : Ext.getBody().getWidth(),
			height : Ext.getBody().getHeight() - 50,
			buttonAlign:'right',
            listeners : {
            	'render' : function() {
            		
            		//grid.render();
            		//_store = grid.getStore();
            		//_store.on("beforeLoad", function() {
		           		//this.baseParams.searchStr = Ext.util.JSON.encode(_searchRecord);
		           //	})
            	}
            },
            items: [
            {
                region: 'north',
                iconCls:'icon-grid',
                //contentEl: 'south',
                split: true,
                //width: 200,
                height : 100,
                minSize: 140,
                maxSize: 300,
                collapsible: true,
                margins: '5 5 5 5',
                items : [selectForm3]
                
            }, {
                region: 'center',
                layout: 'fit',
                split: true,
                //height: 10000,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                //title: 'South',
                margins: '-5 5 5 5',
                items : [grid]
            }],
			bbar: new Ext.PagingToolbar({
            pageSize: 14,
            store: ProductionPlanListStore,
            displayInfo: true,
            displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            emptyMsg: "没有记录"//,
           /* items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            }]*/
        })
        });
	select_quotations_win.render('reserve_plan_list_');

	ProductionPlanListStore.load({params:{start:0}});

});

/**
 * 生产计划种类(1自制生产计划，2外购/外协生产计划)
 */
Ext.zhj.planCategoryComboBox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function(_cfg) {
				if (_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);

				this.store = new Ext.data.SimpleStore({
							fields : ['planType', 'planTypeText'],
							data : [[1, '自制生产计划'], [2, '外购/外协生产计划']]
						});
				Ext.zhj.planCategoryComboBox.superclass.constructor.call(
						this, {
							fieldLabel : '计划种类',
							valueField : 'planType',
							hiddenName : 'planType',
							id : '_planType',
							mode : 'local',
							displayField : 'planTypeText',
							readOnly : true,
							frame : true,
							triggerAction : 'all',
							store : this.store,
							renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
								var arr = [[1,'<span style="color:#0033FF">自制生产计划</span>'],
								[2,'<span style="color:#2D61B5">外协生产计划</span>']];
								for(var i = 0;i < arr.length ;i++){
								    if(value == arr[i][0]){
									    return arr[i][1];
									}
								}
								return value;
				            }
						})
			}
		});
/**
 * 生产计划状态(1编制中，2已发布)
 */
Ext.ffc.planStatusComboBox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function(_cfg) {
				if (_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);

				this.store = new Ext.data.SimpleStore({
							fields : ['planStatus', 'planStatusText'],
							data : [[1, '编制中'], [2, '已发布']]
						});
				Ext.ffc.planStatusComboBox.superclass.constructor.call(
						this, {
							fieldLabel : '计划状态',
							valueField : 'planStatus',
							hiddenName : 'planStatus',
							id : '_planStatus',
							mode : 'local',
							displayField : 'planStatusText',
							readOnly : true,
							frame : true,
							triggerAction : 'all',
							store : this.store,
							renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
								var arr = [[1,'<span style="color:#0033FF">编制中</span>'],
								[2,'<span style="color:#2D61B5">已发布</span>']];
								for(var i = 0;i < arr.length ;i++){
								    if(value == arr[i][0]){
									    return arr[i][1];
									}
								}
								return value;
				            }
						})
			}
		})
		
var productTree = productPanel;
/**
 * 添加计划
 */
Ext.zhj.AddPlanWindow = Ext.extend(Ext.Window, {
    planTypeCombo : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);

		this.planTypeCombo = new Ext.zhj.planCategoryComboBox();
		Ext.zhj.AddPlanWindow.superclass.constructor.call(this, {
			// bodyStyle : 'width:100%',
			title : "生产计划",
			height : 400,
			width : 400,
			plain : true,
			bodyStyle : 'padding:15px',
			closeAction : 'close',
			constrain : true,
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
				items : [{  fieldLabel : "生产数量",
							name : "productNum",
							anchor : '85%',
							xtype : 'numberfield'
						}, this.planTypeCombo,
						productTree
						]
			},
			buttons : [{
				text : '保存',
				handler : function() {

					// 当前窗口
					var _addPlanWindow = this.ownerCt.ownerCt;
					var _formUrl = _addPlanWindow.formUrl;
					/**
					 * 表单对象
					 */
					var addForm = _addPlanWindow.findByType('form')[0]
							.getForm();
							
				    var _formValues = addForm.getValues();
					var _productCode = _formValues.productCode;
					var _productNum = _formValues.productNum;
					var _planType = _formValues.planType
					
					if (_productCode == '') {
						Ext.Msg.show({
								title : '提示',
								msg : '产品不能为空',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
						});
						return false;
					}
					if (_productNum == '') {
						Ext.Msg.show({
								title : '提示',
								msg : '生产数量不能为空!',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
						});
						return false;
					}
					if (_planType == '') {
						Ext.Msg.show({
								title : '提示',
								msg : '计划种类不能为空!',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
						});
						return false;
					}
					var productCode = getSelectProductId();
					var addFormO = addForm.getValues();
					addFormO.productCode = productCode;
					var planFormInfo = Ext.util.JSON.encode(addFormO);
					
					Ext.Ajax.request({
								url : PATH + _formUrl,
								params : {
									planFormInfoPar : planFormInfo
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
										_addPlanWindow
												.fireEvent('planAddSuccess');
										_addPlanWindow.close();
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
		this.addEvents('planAddSuccess');
	}

});

/**
 * 添加计划
 */
Ext.zhj.EditPlanWindow = Ext.extend(Ext.Window, {
    planInfo : null,
    planTypeCombo : null,
    planStatusCombo : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		console.log(_cfg);
		Ext.apply(this, _cfg);

		this.planTypeCombo = new Ext.zhj.planCategoryComboBox();
		this.planStatusCombo = new Ext.ffc.planStatusComboBox();
		Ext.zhj.EditPlanWindow.superclass.constructor.call(this, {
		
			// bodyStyle : 'width:100%',
			title : "修改生产计划",
			height : 400,
			width : 400,
			plain : true,
			bodyStyle : 'padding:15px',
			closeAction : 'close',
			constrain : true,
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
							fieldLabel : "计划编码",
							name : "planCode",
							id : "planCode",
							anchor : '85%',
							readOnly :true
						},{
							fieldLabel : "产品名称",
							name : "productCode",
							id: "productCode",
							anchor : '85%',
							readOnly :true
						}, {
							fieldLabel : "生产数量",
							name : "count",
							id:"count",
							anchor : '85%',
							xtype : 'numberfield'
						}, this.planTypeCombo,
						{
							fieldLabel : "生产批次号",
							id: "bacthNo",
							name : "bacthNo",
							anchor : '85%',
							readOnly :true
						},
						this.planStatusCombo,
						this.planTypeCombo
						],
						listeners :{
						  'render':function(){
			                 Ext.getCmp("planCode").setValue(_cfg.planInfo.data.planCode);
			                 Ext.getCmp("bacthNo").setValue(_cfg.planInfo.data.bacthNo);
			                 Ext.getCmp("productCode").setValue(_cfg.planInfo.data.productCode);
			                 Ext.getCmp("count").setValue(_cfg.planInfo.data.count);
			                 Ext.getCmp("_planType").setValue(_cfg.planInfo.data.category);
			                 Ext.getCmp("_planStatus").setValue(_cfg.planInfo.data.status);
						  }
			            },
						store : this.planInfo
			},
			
			buttons : [{
				text : '保存',
				handler : function() {

					// 当前窗口
					var _editPlanWindow = this.ownerCt.ownerCt;
					var _formUrl = _editPlanWindow.formUrl;
					/**
					 * 表单对象
					 */
					var addForm = _editPlanWindow.findByType('form')[0]
							.getForm();
							
				    var _formValues = addForm.getValues();
					var _productCode = _formValues.productCode;
					var _productNum = _formValues.productNum;
					var _planType = _formValues.planType
					
					if (_productCode == '') {
						Ext.Msg.show({
								title : '提示',
								msg : '产品不能为空',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
						});
						return false;
					}
					if (_productNum == '') {
						Ext.Msg.show({
								title : '提示',
								msg : '生产数量不能为空!',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
						});
						return false;
					}
					if (_planType == '') {
						Ext.Msg.show({
								title : '提示',
								msg : '计划种类不能为空!',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
						});
						return false;
					}
					var planFormInfo = Ext.util.JSON.encode(addForm.getValues());
					planFormInfo.planCode=_cfg.planInfo.data.planCode;
					
					Ext.Ajax.request({
								url : PATH + _formUrl,
								params : {
									planFormInfoPar : planFormInfo
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
										_editPlanWindow
												.fireEvent('planAddSuccess');
										_editPlanWindow.close();
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
		this.addEvents('planAddSuccess');
	}
});