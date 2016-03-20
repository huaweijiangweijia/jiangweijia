 
	var cOContractGrid =  Ext.extend(Ext.grid.GridPanel,{
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/contractOrder/contractList.do?conType=orderOut&leaf=1"});
			var Bill = Ext.data.Record.create([
											{name: 'id', type: 'string',mapping:"id"},
											{name: 'contractCode', type: 'string',mapping:"contractCode"},
											{name: 'sellerName', type: 'string',mapping:"sellerName"},
										//  {name: 'currencyId', type: 'string',mapping:"currencyId"},
											{name: 'currencyName' , type: 'string',mapping:"currencyName"},
											{name: 'signDate', type: 'string',mapping:"signDate"},
											{name: 'urgentLevel', type: 'int',mapping:"urgentLevel"},
											{name: 'customerCode', type: 'string',mapping:"customerCode"},
											{name: 'contractType', type: 'int',mapping:"contractType"},
											{name: 'customerName' , type: 'string',mapping:"customerName"},
											{name: 'status', type: 'string',mapping:"status"},
											{name: 'signAddress', type: 'string',mapping:"signAddress"},
											{name: 'reference', type: 'string',mapping:"reference"},
											{name: 'trafficMode', type: 'string',mapping:"trafficMode"},
											{name: 'closingAccountModeId', type: 'string',mapping:"closingAccountModeId"},
											{name: 'closingAccountMode', type: 'string',mapping:"closingAccountMode"},
											{name: 'deliveryAddressType', type: 'string',mapping:"deliveryAddressType"},
											{name: 'otherConvention', type: 'string',mapping:"otherConvention"},
											{name: 'effectConditions', type: 'string',mapping:"effectConditions"},
											{name: 'productMoney', type: 'string',mapping:"productMoney"},
											{name: "taxRate", type: "string", mapping: "taxRate"},
											{name: 'taxMoney', type: 'string',mapping:"taxMoney"},
											{name: 'totalMoney', type: 'string',mapping:"totalMoney"},
											{name: 'overallRebate', type: 'string',mapping:"overallRebate"},
											{name: 'finalMoney', type: 'string',mapping:"finalMoney"},
											{name: 'memo', type: 'string',mapping:"memo"},
											{name: 'editDate', type: 'string',mapping:"editDateString"},
											{name: 'userId', type: 'string',mapping:"userId"},
											{name: 'userName', type: 'string',mapping:"userName"},
											{name: 'ownContactPerson', type: 'string',mapping:"ownContactPerson"},
											{name: 'cusLockStatus', type: 'string',mapping:"cusLockStatus"}
											   ]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				remoteSort : true,
				proxy: proxy,
				reader: reader,
				listeners : {
					load:function(){
						setRowLockStatus(this);
					},scope:this
				}
			});
			this.store.load({params: {start: 0, limit: 15}});
			cOContractGrid.superclass.constructor.call(this, {
				height:520,
				store:this.store,
				columns: [
					 new Ext.grid.RowNumberer(),
					{header: "id",dataIndex: "id",width: 40,hidden:true},
					{header: "合同编号",dataIndex:'contractCode' ,width: 230,sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header: "卖方",dataIndex:'sellerName',width: 100,hidden:true},
					{header: "币别id",dataIndex:'currencyId',width: 100,hidden:true},
					{header: "币别",dataIndex:'currencyName',width: 100,hidden:true},
					{header: "紧急度",dataIndex:'urgentLevel', width: 100,hidden:true},
					{header: "客户编号",dataIndex:'customerCode',width: 60,hidden:true},
					{header: "合同类型",dataIndex:'contractType' ,width: 100,hidden:true},
					{header: "客户名称",dataIndex:'customerName' ,width: 150,sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header: "状态",dataIndex:'status' ,width: 100,hidden:true},
					{header: "签订日期",dataIndex:'signDate',width: 100,sortable:true},
					{header: "签订地点",dataIndex:'signAddress' ,width: 100,hidden:true},
					{header: "参照标准",dataIndex:'reference' ,width: 100,sortable:true},
					{header: "运输方式",dataIndex:'trafficMode'  ,width: 60,hidden:true},
					{header: "结算方式id",dataIndex:'closingAccountModeId', width: 100,hidden:true},
					{header: "结算方式",dataIndex:'closingAccountMode' ,width: 100,sortable:true},
					{header: "交货地点和方式",dataIndex:'deliveryAddressType',width: 100,sortable:true},
					{header: "其他约定",dataIndex:'otherConvention',width: 100,sortable:true},	
					{header: "合同生效条件",dataIndex:'effectConditions',width: 100,sortable:true},
					{header: "货品金额", dataIndex:'productMoney',width: 100,sortable:true},
					{header: "税率", dataIndex:"taxRate",width: 60,sortable:true},
					{header: "税金", dataIndex:'taxMoney',width: 70,sortable:true} ,
					{header: "价税合计", dataIndex:'totalMoney',width: 100,sortable:true},
					{header: "整体折扣率", dataIndex:'overallRebate',width: 60,sortable:true},
					{header: "最终金额", dataIndex:'finalMoney',width: 100,sortable:true}, 
					{header: "备注", dataIndex:'memo',width: 60,hidden:true},
					{header: "编制时间", dataIndex:'editDate',width: 100,sortable:true},
					{header: "编制人Id", dataIndex:'userId',width: 60,hidden:true}, 
					{header: "编制人", dataIndex:'userName',width: 100,sortable:true},
					{header: "我方负责人", dataIndex:'ownContactPerson',width: 100,sortable:true}
				],
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize: 15,
					displayInfo: true,
					displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
					emptyMsg: "<i>没有数据</i>"
				}),
				listeners : {
					sortchange : function(grid, sortInfo ){
						setRowLockStatus(grid);
					}
				}
			})
		}
	})
function setRowLockStatus(grid){
	var s = grid.getStore();
	for(var rowIndex = 0,len = s.getCount();rowIndex < len ; rowIndex++){
		var r = s.getAt(rowIndex);
		if(r.data.cusLockStatus * 1 == 0){
			grid.getView().getRow(rowIndex).style.backgroundColor = '#FFCCFF';
			grid.getView().getRow(rowIndex).style.color = '#FF0000';
		}
	}
}
	var cOContractTree =  Ext.extend(Ext.grid.GridPanel,{
		contractId:null,
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/contractOrder/contractDetail.do"});
			var Bill = Ext.data.Record.create([
											{name: 'brandCode', type: 'string',mapping:"brandCode"},
											{name: 'productCode', type: 'string',mapping:"productCode"},
											{name: 'productName', type: 'string',mapping:"productName"},
											{name: 'productUnit' , type: 'string',mapping:"productUnit"},
											{name: 'amount', type: 'string',mapping:"amount"},
											{name: 'remainAmount', type: 'int',mapping:"remainAmount"},
											{name: 'productBrand', type: 'string',mapping:"productBrand"},
											{name: 'price', type: 'int',mapping:"price"},
											{name: 'parentToolsId' , type: 'string',mapping:"parentToolsId"},
											{name: 'toolsId', type: 'string',mapping:"toolsId"},
											{name: 'leaf', type: 'string',mapping:"leaf"},
											{name: 'id', type: 'string',mapping:"id"},
											{name: 'contractProjectSortId', type: 'string',mapping:"contractProjectSortId"},
											{name: 'proSortName', type: 'string',mapping:"proSortName"},
											{name: 'projectCode', type: 'string',mapping:"projectCode"},
											{name: 'serialNumber', type: 'string',mapping:"serialNumber"}
											]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader
			});
			this.store.baseParams.contractId = this.contractId;
			this.store.load({params: {start: 0, limit: 15}});
			cOContractTree.superclass.constructor.call(this, {
				height:520,
				store:this.store,
				columns: [
					 new Ext.grid.RowNumberer(),
					{header:'序号',width:70,dataIndex:'serialNumber',sortable:true},
					{header:'项目号',width:70,dataIndex:'projectCode',sortable:true},
					{header:'工具牌号',width:220,dataIndex:'brandCode',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true},
					{header:'名称',width:100,dataIndex:'productName',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'计量单位',width:70,dataIndex:'productUnit',sortable:true},
					{header:'合同数量',width:70,dataIndex:'amount',sortable:true},
					{header:'剩余采购数量',width:100,dataIndex:'remainAmount',sortable:true},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'采购价格',width:70,dataIndex:'price',sortable:true},
					{header:'父ID',width:0,hidden : true,dataIndex:'parentToolsId'},
					{header:'工具ID',width:0,hidden : true,dataIndex:'toolsId'},
					{header:'叶子节点',width:0,hidden : true,dataIndex:'leaf'},
					{header:'ID',width:0,dataIndex:'id',hidden : true},
					{header:'合同分_主键',width:0,dataIndex:'contractProjectSortId',hidden : true},
					{header:'合同分名称',width:200,dataIndex:'proSortName',sortable:true}
				],
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize: 15,
					displayInfo: true,
					displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
					emptyMsg: "<i>没有数据</i>"
				}),
				listeners : {
					sortchange : function(grid, sortInfo ){
						setRowLockStatus(grid);
					}
				}
			})
		}
	})

var  cOContractSelectForm = Ext.extend(Ext.FormPanel, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		cOContractSelectForm.superclass.constructor.call(this, {
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
	              {items: [{xtype:'textfield',fieldLabel: '合同编号',name: 'contractCode',anchor:'90%'}]},
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

	var cOContractWin = Ext.extend(Ext.Window,{
		contract_list:null,
		selectForm2:null,
		cOContractTree:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.cOContractTree = new cOContractTree();
			this.selectForm2 = new cOContractSelectForm();
			this.contract_list = new cOContractGrid();
			var record = null;
			this.contract_list.on('rowclick',function(grid,rowIndex,e) {
						var s = grid.getStore();
						record = s.getAt(rowIndex);
						this.cOContractTree.store.setBaseParam('contractId',record.id);
						this.cOContractTree.store.load({params:{start:0,limit:15,id:record.id}});
					},this);
			this.contract_list.on('rowdblclick',function(grid,rowIndex,e)
			{
				var s = grid.getStore();
				var record = s.getAt(rowIndex);
				var contractCode = record.get("contractCode");
				var customerName = record.get("customerName");
				var customerCode = record.get("customerCode");
				var contractInforId = record.get("id");
				var cusLockStatus = record.get("cusLockStatus");
				if(cusLockStatus * 1 == 0){
					Ext.Msg.alert("消息", "所选中合同,所属客户已经被锁定,不允许做订单!");
					return ;
				}
				try{
						Ext.Ajax.request({
							method: "post",
							params: { 'contractId' : contractInforId},
							url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockContractDetail',
							success: function(response){
									eval("var detail=" + response.responseText);
									if(detail.length == 0){
										//Ext.Msg.alert("消息", "所选合同明细中，没有产品可提取库存,确定后将编制采购订单!");
										var win = new cOSupplierWin({contractId:contractInforId,deliveryAddressType:record.get('deliveryAddressType'),
											contractId:record.get('id'),contract_code:record.get('contractCode'),ownContactPerson:record.get('ownContactPerson'),customerName:customerName,customerCode:customerCode});
										var store = win.supplier_grid.getStore();
										store.baseParams.contractId = record.get('id');                   
										store.load({params: {start: 0, limit: 15}}); 
										win.show();  
										return ;
									}
									var conEditWin = new Ext.ffc.ContractOutStockEditWindow(
									{
										outStockInfor:{contractId:contractInforId,outStockType:1,status:0,contractCode:contractCode,outStockDetails:detail},
										listeners :{
											close : function(p){
													Ext.Ajax.request({
														method: "post",
														params: { 'contractId' : contractInforId},
														url: PATH + '/contractOrder/contractDetail.do',//指向刚才给你的action
														success: function(response){
															eval('var temp='+response.responseText);
																if(temp.totalProperty > 0){
																	var win = new cOSupplierWin({contractId:contractInforId,deliveryAddressType:record.get('deliveryAddressType'),
																	contract_code:record.get('contractCode'),ownContactPerson:record.get('ownContactPerson'),customerName:customerName,customerCode:customerCode});
																	var store = win.supplier_grid.getStore();
																	store.baseParams.contractId = record.get('id');                   
																	store.load({params: {start: 0, limit: 15}}); 
																	win.show();  
																}
															
														}
													});
											}
										}	
									}
								);
								conEditWin.show();
							}
						});
				}catch(e){
					alert(e);
				}
				this.close();   
			},this);
			this.cOContractTree.on('rowdblclick',function(grid,rowIndex,e) {
				var s = grid.getStore();
				var r = s.getAt(rowIndex);
				var contractCode = record.get("contractCode");
				var customerName = record.get("customerName");
				var customerCode = record.get("customerCode");
				var contractInforId = record.get("id");
				var cusLockStatus = record.get("cusLockStatus");
				if(cusLockStatus * 1 == 0){
					Ext.Msg.alert("消息", "所选中合同,所属客户已经被锁定,不允许做订单!");
					return ;
				}
				try{
						Ext.Ajax.request({
							method: "post",
							params: { 'contractId' : contractInforId},
							url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockContractDetail',
							success: function(response){
									eval("var detail=" + response.responseText);
									if(detail.length == 0){
										//Ext.Msg.alert("消息", "所选合同明细中，没有产品可提取库存,确定后将编制采购订单!");
										var win = new cOSupplierWin({deliveryAddressType:record.get('deliveryAddressType'),contract_code:record.get('contractCode'),
											node:r,ownContactPerson:record.get('ownContactPerson'),customerName:customerName,customerCode:customerCode});
										var store = win.supplier_grid.getStore();
										store.baseParams.contractId = record.get('id');  
										store.baseParams.brand = r.get('productBrand');
										store.load({params: {start: 0, limit: 15}}); 
										win.show();  
										return ;
									}
									var conEditWin = new Ext.ffc.ContractOutStockEditWindow(
									{
										outStockInfor:{contractId:contractInforId,outStockType:1,status:0,contractCode:contractCode,customerName:customerName,customerCode:customerCode,outStockDetails:detail},
										nextStepButtonTitle: '直接采购',
										listeners :{
											close : function(p){
												Ext.Ajax.request({
														method: "post",
														params: { 'contractId' : contractInforId},
														url: PATH + '/contractOrder/contractDetail.do',//指向刚才给你的action
														success: function(response){
															eval('var temp='+response.responseText);
																if(temp.totalProperty > 0){
																	var win = new cOSupplierWin({contractId:contractInforId,deliveryAddressType:record.get('deliveryAddressType'),
																	contract_code:record.get('contractCode'),ownContactPerson:record.get('ownContactPerson'),customerName:customerName,customerCode:customerCode});
																	var store = win.supplier_grid.getStore();
																	store.baseParams.contractId = record.get('id');                   
																	store.load({params: {start: 0, limit: 15}}); 
																	win.show();  
																}
														}
													});
											}
										}	
									}
								);
								conEditWin.show();
							}
						});
				}catch(e){
					alert(e);
				}
				this.close();  
			},this);
			cOContractWin.superclass.constructor.call(this, {
				renderTo: Ext.getBody(),                                                        
				title:"选择合同",                                                               
				height:530,                                                                     
				width:800,                                                                                                                             
//				modal:true,                                                                     
				plain:true,    
				maximizable:true,
				draggable:true,    
				resizable:false,
				layout: 'border',  
				listeners : {
					'render' : function() {
						//监听搜索事件。
						this.selectForm2.on({
							'search' : function(_form, _values) {
								var _grid = this.contract_list.store;
								var searchStr = _values;
								_grid.baseParams.searchStr = Ext.encode(searchStr);
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
//					var _record  = this.cOContractTree.getSelectionModel().getSelected();      
						if (1!=selectedItem) {                                                  
							Ext.Msg.alert('系统提示', '请选择一条合同记录!');                       
							return;                                                             
						}else                                                                   
						{   
							var cusLockStatus = record.get("cusLockStatus");
							
							if(cusLockStatus * 1 == 0){
								Ext.Msg.alert("消息", "所选中合同,所属客户已经被锁定,不允许做订单!");
							    return ;
							}
							this.close();          
							var contractCode = record.get("contractCode");
							var customerName = record.get("customerName");
							var customerCode = record.get("customerCode");
							var contractInforId = record.get("id");
							try{
									Ext.Ajax.request({
										method: "post",
										params: { 'contractId' : contractInforId},
										url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockContractDetail',
										success: function(response){
												eval("var detail=" + response.responseText);
												if(detail.length == 0){
													//Ext.Msg.alert("消息", "所选合同明细中，没有产品可提取库存,确定后将编制采购订单!");
													var win = new cOSupplierWin({contractId:contractInforId,deliveryAddressType:record.get('deliveryAddressType'),
														contract_code:record.get('contractCode'),ownContactPerson:record.get('ownContactPerson'),customerName:customerName,customerCode:customerCode});
													var store = win.supplier_grid.getStore();
													store.baseParams.contractId = record.get('id');                   
													store.load({params: {start: 0, limit: 15}}); 
													win.show();  
													return ;
												}
												var conEditWin = new Ext.ffc.ContractOutStockEditWindow(
												{
													outStockInfor:{contractId:contractInforId,outStockType:1,status:0,contractCode:contractCode,customerName:customerName,customerCode:customerCode,outStockDetails:detail},
													nextStepButtonTitle: '直接采购',
													listeners :{
														close : function(p){
															Ext.Ajax.request({
																method: "post",
																params: { 'contractId' : contractInforId},
																url: PATH + '/contractOrder/contractDetail.do',
																success: function(response){
																	eval('var temp='+response.responseText);
																		if(temp.totalProperty > 0){
																			var win = new cOSupplierWin({contractId:contractInforId,deliveryAddressType:record.get('deliveryAddressType'),
																			contract_code:record.get('contractCode'),ownContactPerson:record.get('ownContactPerson'),customerName:customerName,customerCode:customerCode});
																			var store = win.supplier_grid.getStore();
																			store.baseParams.contractId = record.get('id');                   
																			store.load({params: {start: 0, limit: 15}}); 
																			win.show();  
																		}
																	
																}
															});
														}
													}	
												}
											);
											conEditWin.show();
										}
									});
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
						title: '合同查询',
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
						collapsible: true,
						layout: 'fit',
						margins: '-5 5 5 5',
						items : [this.contract_list]
					},{
						region: 'south',
						split: true,
						height : 150,
						collapsible: true,
						layout: 'fit',
						margins: '-5 5 5 5',
						items : [this.cOContractTree]
					}
				]                                                         
			})
		}
	})
