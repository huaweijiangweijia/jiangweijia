

	
	var tsOContractGrid =  Ext.extend(Ext.grid.GridPanel,{
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/scheduleOrder/quotationList.do?quotationType=4&leaf=0&outStockType=6"});
			var Bill = Ext.data.Record.create([
											{name: 'id', type: 'string',mapping:"id"},
											{name: 'contractInforId', type: 'string',mapping:"contractInforId"},
											{name: 'quotationCode', type: 'string',mapping:"quotationCode"},
											{name: 'customerCode' , type: 'string',mapping:"customerCode"},
											{name: 'customerName', type: 'string',mapping:"customerName"},
											{name: 'quotationDate', type: 'string',mapping:"quotationDate"},
											{name: 'sellerName', type: 'string',mapping:"sellerName"},
											{name: 'currency', type: 'string',mapping:"currency"},
											{name: 'currencyName' , type: 'string',mapping:"currencyName"},
											{name: 'paymentCondition', type: 'string',mapping:"paymentCondition"},
											{name: 'taxRate', type: 'float',mapping:"taxRate"},
											{name: 'quotationType', type: 'int',mapping:"quotationType"},
											{name: 'cusContactPerson', type: 'string',mapping:"cusContactPerson"},
											{name: 'status', type: 'int',mapping:"status"},
											{name: 'deliveryType', type: 'string',mapping:"deliveryType"},
											{name: 'taxMoney', type: 'float',mapping:"taxMoney"},
											{name: 'productMoney', type: 'float',mapping:"productMoney"},
											{name: 'totalMoney', type: 'float',mapping:"totalMoney"},
											{name: 'editTime', type: 'string',mapping:"editTime"},
											{name: "editorId", type: "string", mapping: "editorId"},
											{name: 'editorName', type: 'string',mapping:"editorName"},
											{name: 'editDate', type: 'string',mapping:"editDate"},
											{name: 'userId', type: 'string',mapping:"userId"},
											{name: 'userName', type: 'string',mapping:"userName"},
											{name: 'memo', type: 'string',mapping:"memo"},
											{name: 'overallRebate', type: 'float',mapping:"overallRebate"},
											{name: 'finalMoney', type: 'float',mapping:"finalMoney"},
											{name: 'customerPhone', type: 'string',mapping:"customerPhone"},
											{name: 'customerFax', type: 'string',mapping:"customerFax"},
											{name: 'urgentLevel', type: 'int',mapping:"urgentLevel"},
											{name: 'validStartDate', type: 'string',mapping:"validStartDate"},
											{name: 'validEndDate', type: 'string',mapping:"validEndDate"},
											{name: 'willOrderExpected', type: 'int',mapping:"willOrderExpected"},
											{name: 'willFormalDate', type: 'string',mapping:"willFormalDate"}
											   ]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader
			});
			this.store.load({params: {start: 0, limit: 15}});
			tsOContractGrid.superclass.constructor.call(this, {
				height:500,
				store: this.store,
				columns: [
					 new Ext.grid.RowNumberer(),
					{header: "id",dataIndex: "id",width: 40,hidden:true},
					{header: "报价单编号",dataIndex: "quotationCode",width: 210},	
					{header: "客户编号",dataIndex:'customerCode',width: 100},
					{header: "客户名称",dataIndex:'customerName' ,width: 150,sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header: "报价日期",dataIndex:'quotationDate',width: 100,hidden:true},
					{header: "卖方",dataIndex:'sellerName',width: 100,hidden:true},
//					{header: "状态",dataIndex:'status' ,width: 100,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
//							var arr = [[0,'<span style="color:#990000">编制</span>'],
//							[1,'<span style="color:#99CC00">待审批</span>'],
//							[2,'<span style="color:#0033FF">审批通过</span>'],
//							[3,'<span style="color:#FF3300">审批退回</span>'],
//							[4,'<span style="color:#339933">已下单</span>'],
//							[5,'<span style="color:#330000">到货完毕</span>']];
//							for(var i = 0;i < arr.length ;i++){
//							    if(value == arr[i][0]){
//								    return arr[i][1];
//								}
//							}
//							return value;
//						}
//					},
					{header: "币别id",dataIndex:'currency',width: 100,hidden:true},
					{header: "币别",dataIndex:'currencyName',width: 100},
//					{header: "付款条件",dataIndex:'paymentCondition',width: 100},
					{header: "税率", dataIndex:"taxRate",width: 60,sortable:true},
					{header: "税金", dataIndex:'taxMoney',width: 100,sortable:true} ,
					{header: "货品金额", dataIndex:'productMoney',width: 100,sortable:true},
					{header: "价税合计", dataIndex:'totalMoney',width: 100,sortable:true},
					{header: "整体折扣率", dataIndex:'overallRebate',width: 100,sortable:true},
					{header: "最终金额", dataIndex:'finalMoney',width: 100,sortable:true}, 
//					{header: "报价单类型", dataIndex:"quotationType",width: 100,sortable:true},
					{header: "客户联系人", dataIndex:"cusContactPerson",width: 100,sortable:true},
//					{header: "交货方式",dataIndex:'deliveryType' ,width: 100,hidden:true},
					{header: "制单时间", dataIndex:'editTime',width: 100,sortable:true},
					{header: "制单人id", dataIndex:'editorId',width: 100,sortable:true,hidden:true},
					{header: "制单人名称", dataIndex:'editorName',width: 100,sortable:true,hidden:true},
					{header: "编制时间", dataIndex:'editDate',width: 100,sortable:true},
					{header: "编制人Id", dataIndex:'userId',width: 60,hidden:true,hidden:true}, 
					{header: "我方负责人", dataIndex:'userName',width: 100,sortable:true},
//					{header: "备注", dataIndex:'memo',width: 60,hidden:true},
					{header: "客户电话", dataIndex:'customerPhone',width: 100,sortable:true}, 
					{header: "客户传真", dataIndex:'customerFax',width: 100,sortable:true},
					{header: "紧急度",dataIndex:'urgentLevel', width: 70,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
							var arr = [[0,'<span style="color:#99CC00">一般</span>'],
							[1,'<span style="color:#0033FF">紧急</span>']];
							for(var i = 0;i < arr.length ;i++){
							    if(value == arr[i][0]){
								    return arr[i][1];
								}
							}
							return value;
						}
					},
					{header: "报价有效期开始",dataIndex:'validStartDate', width: 100},
					{header: "报价有效期结束",dataIndex:'validEndDate', width: 100},
//					{header: "是否预定",dataIndex:'willOrderExpected', width: 100,hidden:true},
					{header: "预计转正式日期",dataIndex:'willFormalDate', width: 100}
				],
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize: 15,
					displayInfo: true,
					displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
					emptyMsg: "<i>没有数据</i>"
				})
			})
		}
	})


	var tsOContractTree = Ext.extend(Ext.tree.ColumnTree,{
		qId:null,
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.store = new Ext.data.Store({
			   proxy: new Ext.data.HttpProxy({url:PATH + '/scheduleSelfOrder/quotationDetailList.do'}),
			   reader: new Ext.data.JsonReader(
					{
					   root: 'items',  //从struts2里面传递过来的参数 
					   totalProperty :'totalCount'
					}, 
					 [ //JSON数据的映射
						{name: 'id',mapping:'id',type:'string'}
					 ]
			  )
			});
		    this.store.baseParams.qId = this.qId;
			this.store.load({params:{start:0,limit:20}});
			tsOContractTree.superclass.constructor.call(this, {
				height: 470,
				bodyStyle:'width:100%',
				rootVisible:false,
				autoScroll:true,
				expandable:false,
				enableDD:false,
				columns:[
					{header:'',width:100,dataIndex:''},
					{header:'ID',width:0,dataIndex:'id',hidden:true},
					{header:'项目编号',width:100,dataIndex:'projectCode',sortable:true},
					{header:'序号',width:100,dataIndex:'serialNumber',sortable:true},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true},
					{header:'工具牌号',width:100,dataIndex:'brandCode',sortable:true},
					{header:'名称',width:100,dataIndex:'productName',sortable:true},
					{header:'单套刀具装配数量',width:100,dataIndex:'singleSetAssemblyAmount',sortable:true},
					{header:'单套刀具采购数量',width:100,dataIndex:'singleSetStockAmount',sortable:true},
					{header:'数量(n套采购数量)',width:100,dataIndex:'amount',sortable:true},
					{header:'单价',width:100,dataIndex:'price',sortable:true},
					{header:'计量单位',width:100,dataIndex:'productUnit',sortable:true},
					{header:'折扣率',width:100,dataIndex:'rebate',sortable:true},
					{header:'净价',width:100,dataIndex:'netPrice',sortable:true},
					{header:'金额',width:100,dataIndex:'money',sortable:true},
					{header:'含税净价',width:100,dataIndex:'taxNetPrice',sortable:true},
					{header:'含税金额',width:100,dataIndex:'taxMoney',sortable:true},
//					{header:'价格是否变动',width:100,dataIndex:'priceChange',sortable:true},
					{header:'交货期',width:100,dataIndex:'deliveryDate',sortable:true},
					{header:'使用车间(备注2)',width:100,dataIndex:'workshop',sortable:true},
					{header:'工序号',width:100,dataIndex:'processCode',sortable:true},
					{header:'报告号(备注3)',width:100,dataIndex:'reportCode',sortable:true},
					{header:'刀具代码',width:100,dataIndex:'toolCode',sortable:true},
					{header:'刀具描述',width:100,dataIndex:'toolDescription',sortable:true},
					{header:'附件',width:100,dataIndex:'fileCount', renderer : function(colValue, node, data) {
						if(data.parentToolsId != 'root')
								return;
							if(colValue > 0) {
								var toolsId = data.toolsId
								var str = "<a href=\"#\" onclick=onSlaveClick('" + toolsId + "');><span style='color:blue;font-weight:bold;'>查看</span></a>";
								return str;
						}
					}},
					{header:'父ID',width:0,hidden : true,dataIndex:'parentToolsId'},
					{header:'工具ID',width:0,hidden : true,dataIndex:'toolsId'},
					{header:'备注',width:100,dataIndex:'memo',sortable:true}
					
				],    
				bbar : new Ext.ffc.TreePagingToolbar({
								pageSize: 20,
								store: this.store,
								displayInfo: true,
								displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
								emptyMsg: "没有记录"
				}),
				loader: new Ext.tree.TreeLoader({
					uiProviders:{
						'col': Ext.tree.ColumnNodeUI
					}
				}),
				root: new Ext.tree.AsyncTreeNode({
					id:"root",
					text:'Tasks'
				})
			})
		}
	})


	var  tsOContractSelectForm = Ext.extend(Ext.FormPanel, {
		constructor : function(_cfg) {
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			tsOContractSelectForm.superclass.constructor.call(this, {
				labelAlign:'left',buttonAlign:'right',bodyStyle:'padding:5px;', border : false,
				frame:true,labelWidth:70,monitorValid:false,
				items:[
				   {layout:'column',border:false,labelSeparator:':',frame : true,
				   defaults:{layout: 'form',border:false,columnWidth:.5},
				   bbar : ['->',{
								text : "搜  索",
								iconCls : 'icon-search',
								handler : function() {
									this.fireEvent('search',this, this.getValues());
								},scope : this
							},
							'-',{
								text : "重  置",
								iconCls : 'icon-reset',
								handler : function () {
									this.getForm().reset();
								},scope : this
						}],
				   items:[
					  {items: [{xtype:'textfield',fieldLabel: '报价单编号',name: 'quotationCode',anchor:'90%'}]},
					  {items: [{xtype:'textfield',fieldLabel: '客户名称',name: 'customerName',anchor:'90%'}]},
					  {items: [{xtype:'datefield',fieldLabel: '编制日期',name: 'startTime',anchor:'90%',format:'Y-m-d'}]},
					  {items: [{xtype:'datefield',fieldLabel: '至',name: 'endTime',anchor:'90%',format:'Y-m-d'}]}
				   ]//items
				  }
				],
				keys : {
					key:Ext.EventObject.ENTER,
					fn:function(btn,e){
						this.fireEvent('search',this, this.getValues());
					},
					scope : this
				}
			})
			this.addEvents('search');
		},
		getValues : function() {
		var record = this.getForm().getValues();
		return record;
		}
	})

	var tsOContractWin = Ext.extend(Ext.Window,{
		tsOContractTree:null,
		contract_list:null,
		selectForm2:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.tsOContractTree = new tsOContractTree();
			this.selectForm2 = new tsOContractSelectForm();
			this.contract_list = new tsOContractGrid();
			var _record = null;
			this.contract_list.on('rowclick',function(grid,rowIndex,e) {
						var s = grid.getStore();
						var r = s.getAt(rowIndex);
						_record = r;
						this.tsOContractTree.store.setBaseParam('qId',r.id);
						this.tsOContractTree.store.load({params:{start:0,limit:15,id:r.id}});
				},this);
			this.contract_list.on('rowdblclick',function(grid,rowIndex,e)
			{
				var s = grid.getStore();
				var record = s.getAt(rowIndex);
				var quotationCode = record.get("quotationCode");
				var customerName = record.get("customerName");
				var customerCode = record.get("customerCode");
				var contractInforId = record.get("id");
				try{
					var conEditWin = new Ext.ffc.ContractOutStockEditWindow(
						{
							outStockInfor:{quotationId:contractInforId,outStockType:6,status:0,quotationCode:quotationCode,outStockDetails:[]},
							listeners :{
								close : function(p){
									var win = new tsOSupplierWin({quotationId:record.get('id'),contract_code:record.get('quotationCode'),ownContactPerson:record.get('ownContactPerson')});
									var store = win.supplier_grid.getStore();
									store.baseParams = {qId:record.get('id'),leaf:0};                   
									store.load({params: {start: 0, limit: 15}}); 
									win.show(); 
								}
							}	
						}
					);
					conEditWin.show();
				}catch(e){
					alert(e);
				}
				this.close();   
			},this);
//			this.tsOContractTree.on('dblclick',function(node,e){
//				var record = _record
//				var quotationCode = record.get("quotationCode");
//				var customerName = record.get("customerName");
//				var customerCode = record.get("customerCode");
//				var contractInforId = record.get("id");
//				try{
//					var conEditWin = new Ext.ffc.ContractOutStockEditWindow(
//						{
//							outStockInfor:{quotationId:contractInforId,outStockType:1,status:0,quotationCode:quotationCode,outStockDetails:[]},
//							listeners :{
//								close : function(p){
//									var win = new tsOSupplierWin({contract_code:record.get('quotationCode'),node:Ext.tree.toNewTreeNode(node.attributes,{},true),ownContactPerson:record.get('ownContactPerson')});
//									var store = win.supplier_grid.getStore();
//									store.baseParams = {brand:node.attributes.productBrand,quotationId:record.get('id')};          
//									store.load({params: {start: 0, limit: 15}}); 
//									win.show(); 
//								}
//							}	
//						}
//					);
//					conEditWin.show();
//				}catch(e){
//					alert(e);
//				}
//				node.on('expand',function(){
//					this.close();  
//				},this);
//			},this);
			tsOContractWin.superclass.constructor.call(this, {                                                
				title:"选择报价单",                                                               
				height:500,                                                                     
				width:800,                                                                                                                             
//				modal:true,                                                                     
				plain:true,                                                                     
				draggable:true,     
				resizable:false,
				maximizable:true,
				layout: 'border',  
				listeners : {
					'render' : function() {
						//监听搜索事件。
						this.selectForm2.on({
							'search' : function(_form, _values) {
								var _grid = this.contract_list.store;
								var searchStr = _values;
								_grid.baseParams.quotationCode = _values.quotationCode;
								_grid.baseParams.customerName = _values.customerName;
								_grid.baseParams.startTime = _values.startTime;
								_grid.baseParams.endTime = _values.endTime;
								_grid.reload();
							},
							scope : this
						})
					}
				},
				buttons : [{                                                                    
					text : "确定",                                                              
					handler : function() {                                                      
					var selectedItem = this.contract_list.getSelectionModel().getCount();            
					var record  = this.contract_list.getSelectionModel().getSelected();              
						if (1!=selectedItem) {                                                  
							Ext.Msg.alert('系统提示', '请选择一条记录!');                       
							return;                                                             
						}else                                                                   
						{                                                                       
							this.close();          
							var quotationCode = record.get("quotationCode");
							var customerName = record.get("customerName");
							var customerCode = record.get("customerCode");
							var contractInforId = record.get("id");
							var node = null;
//							var node = this.tsOContractTree.getSelectionModel().getSelectedNode();
							try{
								var conEditWin = new Ext.ffc.ContractOutStockEditWindow(
									{
									    outStockInfor:{quotationId:contractInforId,outStockType:6,status:0,quotationCode:quotationCode,outStockDetails:[]},
										listeners :{
											close : function(p){
												if(node == null)
												{
													var win = new tsOSupplierWin({contract_code:record.get('quotationCode'),ownContactPerson:record.get('ownContactPerson')});
												}
												else
												{
													var win = new tsOSupplierWin({quotationId:record.get('id'),contract_code:record.get('quotationCode'),node:Ext.tree.toNewTreeNode(node.attributes,{},true),ownContactPerson:record.get('ownContactPerson')});
												}
												var store = win.supplier_grid.getStore();
												store.baseParams = {qId:record.get('id'),leaf:0};                   
												store.load({params: {start: 0, limit: 15}}); 
												win.show(); 
											}
										}	
									}
								);
								conEditWin.show();
							}catch(e){
								alert(e);
							}
						}                                                                       
					},                                                                          
					scope : this                                                                
				 },{                                                                            
					text : "取消",                                                              
					handler : function() {                                                      
					 this.close();                            
					},                                                                          
					scope : this                                                                
				 }],                                                                            
				items : [
					{
						region: 'north',
						iconCls:'icon-grid',
						title: '报价单查询',
						split: true,
						height : 140,
						minSize: 140,
						maxSize: 140,
						collapsible: true,
						margins: '5 5 5 5',
						items : [this.selectForm2]
						
					},{
						region: 'center',
						split: true,
						height : 200,
						minSize: 200,
						maxSize: 200,
						collapsible: true,
						layout: 'fit',
						margins: '-5 5 5 5',
						items : [this.contract_list]
					},{
						region: 'south',
						split: true,
						height : 150,
						minSize: 150,
						maxSize: 200,
						collapsible: true,
						layout: 'fit',
						margins: '-5 5 5 5',
						items : [this.tsOContractTree]         
					}
				]
			
			})
		}
	})
