 
	var tOContractGrid =  Ext.extend(Ext.grid.GridPanel,{
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/scheduleOrder/quotationList.do?quotationType=4&leaf=1&outStockType=6"});
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
											{name: 'editDate', type: 'string',mapping:"editDateCopy"},
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
											{name: 'willFormalDate', type: 'string',mapping:"willFormalDate"},
											{name: 'cusLockStatus', type: 'string',mapping:"cusLockStatus"}
											   ]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader,
				listeners : {
					load:function(){
						setRowLockStatus(this);
					},scope:this
				}
			});
			this.store.load({params: {start: 0, limit: 20}});
			tOContractGrid.superclass.constructor.call(this, {
				height:520,
				store:this.store,
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
					//{header: "整体折扣率", dataIndex:'overallRebate',width: 100,sortable:true},
					{header: "最终金额", dataIndex:'finalMoney',width: 100,sortable:true}, 
//					{header: "报价单类型", dataIndex:"quotationType",width: 100,sortable:true},
					{header: "客户联系人", dataIndex:"cusContactPerson",width: 100,sortable:true},
//					{header: "交货方式",dataIndex:'deliveryType' ,width: 100,hidden:true},
//					{header: "制单时间", dataIndex:'editTime',width: 100,sortable:true},
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
				//	{header: "报价有效期开始",dataIndex:'validStartDate', width: 100},
				//	{header: "报价有效期结束",dataIndex:'validEndDate', width: 100}
					{header: "锁定",dataIndex:'cusLockStatus', width: 100,hidden:true}
//					{header: "预计转正式日期",dataIndex:'willFormalDate', width: 100}
				],
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize: 20,
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
	var tOContractTree =  Ext.extend(Ext.grid.GridPanel,{
		qId:null,
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/scheduleOrder/quotationDetailList.do"});
			var Bill = Ext.data.Record.create([
											{name: 'id', type: 'string',mapping:"id"},
											{name: 'quotationProjectSortId', type: 'string',mapping:"quotationProjectSortId"},
											{name: 'quotationInforId', type: 'string',mapping:"quotationInforId"},
											{name: 'toolsId', type: 'string',mapping:"toolsId"},
											{name: 'parentToolsId', type: 'string',mapping:"parentToolsId"},
											{name: 'leaf', type: 'string',mapping:"leaf"},
											{name: 'projectCode', type: 'string',mapping:"projectCode"},
											{name: 'serialNumber', type: 'string',mapping:"serialNumber"},
											{name: 'productBrand', type: 'string',mapping:"productBrand"},
											{name: 'productCode', type: 'string',mapping:"productCode"},
											{name: 'brandCode', type: 'string',mapping:"brandCode"},
											{name: 'productName', type: 'string',mapping:"productName"},
											{name: 'singleSetAssemblyAmount', type: 'string',mapping:"singleSetAssemblyAmount"},
											{name: 'singleSetStockAmount', type: 'string',mapping:"singleSetStockAmount"},
											{name: 'amount', type: 'string',mapping:"amount"},
											{name: 'price', type: 'float',mapping:"price"},
											{name: 'productUnit', type: 'string',mapping:"productUnit"},
											{name: 'rebate', type: 'float',mapping:"rebate"},
											{name: 'netPrice', type: 'float',mapping:"netPrice"},
											{name: 'money', type: 'float',mapping:"money"},
											{name: 'taxNetPrice', type: 'float',mapping:"taxNetPrice"},
											{name: 'taxMoney', type: 'float',mapping:"taxMoney"},
											{name: 'priceChange', type: 'float',mapping:"priceChange"},
											{name: 'deliveryDate', type: 'string',mapping:"deliveryDate"},
											{name: 'workshop', type: 'string',mapping:"workshop"},
											{name: 'processCode', type: 'string',mapping:"processCode"},
											{name: 'reportCode', type: 'string',mapping:"reportCode"},
											{name: 'toolCode', type: 'string',mapping:"toolCode"},
											{name: 'toolDescription', type: 'string',mapping:"toolDescription"},
											{name: 'memo', type: 'string',mapping:"memo"}
											]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader
			});
			this.store.baseParams.qId = this.qId;
			this.store.load({params: {start: 0, limit: 15}});
			tOContractTree.superclass.constructor.call(this, {
				height:520,
				store:this.store,
				columns: [
					 new Ext.grid.RowNumberer(),
					{header:'ID',width:100,dataIndex:'id',sortable:true,hidden:true},
//					{header:'报价单分类项目_主键',width:100,dataIndex:'quotationProjectSortId',sortable:true},
//					{header:'报价单_主键',width:100,dataIndex:'quotationInforId',sortable:true},
//					{header:'货品工具主键',width:100,dataIndex:'toolsId',sortable:true},
//					{header:'货品工具父结点id',width:100,dataIndex:'parentToolsId',sortable:true},
//					{header:'货品工具叶子结点',width:100,dataIndex:'leaf',sortable:true},
					{header:'项目编号',width:100,dataIndex:'projectCode',sortable:true},
					{header:'序号',width:100,dataIndex:'serialNumber',sortable:true},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true},
					{header:'工具牌号',width:100,dataIndex:'brandCode',sortable:true},
					{header:'名称',width:100,dataIndex:'productName',sortable:true},
					//{header:'单套刀具装配数量',width:100,dataIndex:'singleSetAssemblyAmount',sortable:true},
					//{header:'单套刀具采购数量',width:100,dataIndex:'singleSetStockAmount',sortable:true},
					{header:'数量',width:100,dataIndex:'amount',sortable:true},
					{header:'单价',width:100,dataIndex:'price',sortable:true},
					{header:'计量单位',width:100,dataIndex:'productUnit',sortable:true},
					{header:'毛利率',width:100,dataIndex:'rebate',sortable:true},
					{header:'净价',width:100,dataIndex:'netPrice',sortable:true},
					{header:'金额',width:100,dataIndex:'money',sortable:true},
					{header:'含税净价',width:100,dataIndex:'taxNetPrice',sortable:true},
					{header:'含税金额',width:100,dataIndex:'taxMoney',sortable:true},
					//{header:'价格是否变动',width:100,dataIndex:'priceChange',sortable:true},
					{header:'交货期',width:100,dataIndex:'deliveryDate',sortable:true},
					{header:'备注1',width:100,dataIndex:'memo',sortable:true},
					{header:'备注2',width:100,dataIndex:'workshop',sortable:true},
					//{header:'工序号',width:100,dataIndex:'processCode',sortable:true},
					{header:'备注3',width:100,dataIndex:'reportCode',sortable:true}
					//{header:'刀具代码',width:100,dataIndex:'toolCode',sortable:true},
					//{header:'刀具描述',width:100,dataIndex:'toolDescription',sortable:true},
					
				],
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize: 20,
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

var  tOContractSelectForm = Ext.extend(Ext.FormPanel, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		tOContractSelectForm.superclass.constructor.call(this, {
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

	var tOContractWin = Ext.extend(Ext.Window,{
		contract_list:null,
		selectForm2:null,
		tOContractTree:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.tOContractTree = new tOContractTree();
			this.selectForm2 = new tOContractSelectForm();
			this.contract_list = new tOContractGrid();
			var record = null;
			this.contract_list.on('rowclick',function(grid,rowIndex,e) {
						var s = grid.getStore();
						record = s.getAt(rowIndex);
						this.tOContractTree.store.setBaseParam('qId',record.id);
						this.tOContractTree.store.load({params:{start:0,limit:20,id:record.id}});
					},this);
			this.contract_list.on('rowdblclick',function(grid,rowIndex,e)
			{
				var s = grid.getStore();
				var record = s.getAt(rowIndex);
				var quotationCode = record.get("quotationCode");
				var customerName = record.get("customerName");
				var customerCode = record.get("customerCode");
				var contractInforId = record.get("id");
				var cusLockStatus = record.get("cusLockStatus");
				if(cusLockStatus * 1 == 0){
					Ext.Msg.alert("消息", "所选中试刀申请,所属客户已经被锁定,不允许做订单!");
					return ;
				}
				try{
						Ext.Ajax.request({
							method: "post",
							params: { 'quotationInforId' : contractInforId},
							url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockQuotationDetail',
							success: function(response){
									eval("var detail=" + response.responseText);
									if(detail.length == 0){
										//Ext.Msg.alert("消息", "所选合同明细中，没有产品可提取库存,确定后将编制采购订单!");
										var win = new tOSupplierWin({quotationId:contractInforId,deliveryAddressType:record.get('deliveryType'),quotationId:record.get('id'),
											quotationCode:record.get('quotationCode'),ownContactPerson:record.get('userName'),customerName:customerName,customerCode:customerCode});
										var store = win.supplier_grid.getStore();
										store.baseParams.qId = record.get('id');    
										store.baseParams.leaf = 1;      
										store.load({params: {start: 0, limit: 20}}); 
										win.show();  
										return ;
									}
									var conEditWin = new Ext.ffc.QuotationOutStockEditWindow(
									{
										outStockInfor:{quotationId:contractInforId,userName:LoginInfor.user.trueName,customerCode:customerCode,customerName:customerName,outStockType:6,status:0,quotationCode:quotationCode,outStockDetails:detail},
										listeners :{
											close : function(p){
												Ext.Ajax.request({
													method: "post",
													params: { 'quotationInforId' : contractInforId},
													url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockQuotationDetail',
													success: function(response){
														eval('var temp='+response.responseText);
															if(temp.length > 0){
																var win = new tOSupplierWin({quotationId:contractInforId,deliveryAddressType:record.get('deliveryType'),
																quotationCode:record.get('quotationCode'),ownContactPerson:record.get('userName'),customerName:customerName,customerCode:customerCode});
																var store = win.supplier_grid.getStore();
																store.baseParams.qId = record.get('id');   
																store.baseParams.leaf = 1;      
																store.load({params: {start: 0, limit: 20}}); 
																win.show();  
															}
														}
												});
											}
										}	
									}
								);
//								var conEditWin = new Ext.ffc.QuotationOutStockEditWindow({			
//											title :  '新增出库单',
//											outStockInfor:{quotationId:quotationId,userName:LoginInfor.user.trueName,customerCode:customerCode,customerName:customerName,status:0,outStockType:2,quotationCode:quotationCode,outStockDetails:detail},
//											listeners :{
//												close : function(p){
//													OutStockInforListStore.reload();
//												}
//											}	
//										}
//									);		
								conEditWin.show();
							}
						});
				}catch(e){
					alert(e);
				}
				this.close();   
			},this);
//			this.tOContractTree.on('rowdblclick',function(grid,rowIndex,e) {
//				var s = grid.getStore();
//				var r = s.getAt(rowIndex);
//				var quotationCode = record.get("quotationCode");
//				var customerName = record.get("customerName");
//				var customerCode = record.get("customerCode");
//				var contractInforId = record.get("id");
//				try{
//						Ext.Ajax.request({
//							method: "post",
//							params: { 'quotationInforId' : contractInforId},
//							url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockQuotationDetail',
//							success: function(response){
//									eval("var detail=" + response.responseText);
//									if(detail.length == 0){
//										//Ext.Msg.alert("消息", "所选合同明细中，没有产品可提取库存,确定后将编制采购订单!");
//										var win = new tOSupplierWin({deliveryAddressType:record.get('deliveryType'),quotationCode:record.get('quotationCode'),node:r,ownContactPerson:record.get('userName')});
//										var store = win.supplier_grid.getStore();
//										store.baseParams.qId = record.get('id');  
//										store.baseParams.brand = r.get('productBrand');
//										store.load({params: {start: 0, limit: 20}}); 
//										win.show();  
//										return ;
//									}
//									var conEditWin = new Ext.ffc.QuotationOutStockEditWindow(
//									{
//										outStockInfor:{quotationId:contractInforId,userName:LoginInfor.user.trueName,customerCode:customerCode,outStockType:2,status:0,quotationCode:quotationCode,outStockDetails:detail},
//										nextStepButtonTitle: '直接采购',
//										listeners :{
//											close : function(p){
//												var win = new tOSupplierWin({deliveryAddressType:record.get('deliveryType'),quotationCode:record.get('quotationCode'),node:r,ownContactPerson:record.get('userName')});
//												var store = win.supplier_grid.getStore();
//												store.baseParams.qId = record.get('id');   
//												store.baseParams.brand = r.get('productBrand');
//												store.load({params: {start: 0, limit: 20}}); 
//												win.show();  
//											}
//										}	
//									}
//								);
//								conEditWin.show();
//							}
//						});
//				}catch(e){
//					alert(e);
//				}
//				this.close();  
//			},this);
			tOContractWin.superclass.constructor.call(this, {
				renderTo: Ext.getBody(),                                                        
				title:"选择报价单",                                                               
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
//								var searchStr = _values;
//								_grid.baseParams.searchStr = Ext.encode(searchStr);
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
//					var _record  = this.tOContractTree.getSelectionModel().getSelected();      
						if (1!=selectedItem) {                                                  
							Ext.Msg.alert('系统提示', '请选择一条合同记录!');                       
							return;                                                             
						}else                                                                   
						{   
							var cusLockStatus = record.get("cusLockStatus");
							if(cusLockStatus * 1 == 0){
								Ext.Msg.alert("消息", "所选中试刀申请,所属客户已经被锁定,不允许做订单!");
							    return ;
							}
							this.close();          
							var quotationCode = record.get("quotationCode");
							var customerName = record.get("customerName");
							var customerCode = record.get("customerCode");
							var contractInforId = record.get("id");
							try{
									Ext.Ajax.request({
										method: "post",
										params: { 'quotationInforId' : contractInforId},
										url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockQuotationDetail',
										success: function(response){
												eval("var detail=" + response.responseText);
												if(detail.length == 0){
													//Ext.Msg.alert("消息", "所选合同明细中，没有产品可提取库存,确定后将编制采购订单!");
													var win = new tOSupplierWin({quotationId:contractInforId,deliveryAddressType:record.get('deliveryType'),
													quotationCode:record.get('quotationCode'),ownContactPerson:record.get('userName'),customerName:customerName,customerCode:customerCode});
													var store = win.supplier_grid.getStore();
													store.baseParams.qId = record.get('id');       
													store.baseParams.leaf = 1;      
													store.load({params: {start: 0, limit: 20}}); 
													win.show();  
													return ;
												}
												var conEditWin = new Ext.ffc.QuotationOutStockEditWindow(
												{
													outStockInfor:{quotationId:contractInforId,userName:LoginInfor.user.trueName,customerCode:customerCode,customerName:customerName,outStockType:6,status:0,quotationCode:quotationCode,outStockDetails:detail},
													nextStepButtonTitle: '直接采购',
													title :  '试刀提取库存',
													formTitle: '试刀出库',
													isTryTools:true,
													listeners :{
														close : function(p){
															Ext.Ajax.request({
																method: "post",
																params: { 'quotationInforId' : contractInforId},
																url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockQuotationDetail',
																success: function(response){
																	eval('var temp='+response.responseText);
																		if(temp.length> 0){
																			var win = new tOSupplierWin({quotationId:contractInforId,deliveryAddressType:record.get('deliveryType'),
																			quotationCode:record.get('quotationCode'),ownContactPerson:record.get('userName'),customerName:customerName,customerCode:customerCode});
																			var store = win.supplier_grid.getStore();
																			store.baseParams.qId = record.get('id');   
																			store.baseParams.leaf = 1;      
																			store.load({params: {start: 0, limit: 20}}); 
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
						items : [this.tOContractTree]
					}
				]                                                         
			})
		}
	})
