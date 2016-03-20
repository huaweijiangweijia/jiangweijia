
//	var pOProductTree_Check = new Ext.grid.CheckboxSelectionModel();
	var pOProductTree =  Ext.extend(Ext.grid.GridPanel,{
		supplierId:null,
		store:null,
		pOProductTree_Check:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/planOrder/planList.do"});
			var Bill = Ext.data.Record.create([
											{name: 'productName' , type: 'string',mapping:"productName"},
											{name: 'brandCode', type: 'string',mapping:"brandCode"},
											{name: 'productCode', type: 'string',mapping:"productCode"},
											{name: 'productUnit', type: 'string',mapping:"productUnit"},
											{name: 'productBrand' , type: 'string',mapping:"productBrand"},
											{name: 'parentToolsId', type: 'string',mapping:"parentToolsId"},
											{name: 'toolsId', type: 'string',mapping:"toolsId"},
											{name: 'leaf', type: 'string',mapping:"leaf"},
											{name: 'rid', type: 'string',mapping:"id"},
											{name: 'orderAmount', type: 'string',mapping:"planAmount"},
											{name: 'price', type: 'string',mapping:"price"},
											{name: 'productMoney', type: 'string',mapping:"productMoney"},
											{name: 'contractId', type: 'string',mapping:"contractId"},
											{name: 'stockPrice', type: 'string',mapping:"stockPrice"},
											{name: 'stockOrderDetailId', type: 'string',mapping:"stockOrderDetailId"}
											]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader,
				remoteSort : true
			});
			this.store.baseParams.contractCode = this.contractCode;
			this.store.baseParams.supplierId = this.supplierId;
			this.store.baseParams.productBrand = this.productBrand;
			this.store.load({params:{start:0,limit:20}});	
			this.pOProductTree_Check = new Ext.grid.CheckboxSelectionModel();
			pOProductTree.superclass.constructor.call(this, {
				height:520,
				sm:this.pOProductTree_Check,
				store:this.store,
				columns:[
					 new Ext.grid.RowNumberer(),
					this.pOProductTree_Check,
					{header:'工具牌号',width:190,dataIndex:'brandCode',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'货品编号',width:100,dataIndex:'productCode'},
					{header:'名称',width:100,dataIndex:'productName',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'计划数量',width:80,dataIndex:'orderAmount',sortable:true,readOnly:true},
					{header:'计量单位',width:60,dataIndex:'productUnit',sortable:true},
					{header:'单价',width:70,dataIndex:'price',sortable:true},
					{header:'货品金额',width:80,dataIndex:'productMoney',sortable:true},
					{header:'合同Id',width:50,hidden : true,dataIndex:'contractId',sortable:true},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'工具ID',width:100,hidden : true,dataIndex:'toolsId',sortable:true},
					{header:'工具父ID',width:100,hidden : true,dataIndex:'parentToolsId'},
					{header:'叶子节点',width:100,hidden : true,dataIndex:'leaf'},
					{header:'材料储备ID',width:100,hidden : true,dataIndex:'rid'},
					{header:'订单明细',width:100,hidden : true,dataIndex:'stockOrderDetailId'}
				],    
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize: 20,
					displayInfo: true,
					displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
					emptyMsg: "<i>没有数据</i>"
				}),
				viewConfig: { 
					forceFit:true, 
					enableRowBody:true, 
					showPreview:true, 
					getRowClass : function(record, rowIndex, p, store){ 
						if(record.data.style == 1){ 
//							p.body = '<p>'+record.data.excerpt+'</p>'; 
							return 'red-row'; 
						} 
						return 'x-grid3-row-collapsed'; 
					} 
				}
			})
		}
	})

	var  pOProductSectForm = Ext.extend(Ext.FormPanel, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		pOProductSectForm.superclass.constructor.call(this, {
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
	              {items: [{xtype:'textfield',fieldLabel: '牌号',name: 'brandCode',anchor:'90%'}]},
				  {items: [{xtype:'textfield',fieldLabel: '名称',name: 'productName',anchor:'90%'}]}
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

	var pOProductPanel = Ext.extend(Ext.Panel,{
		supplierId:null,
		productTree:null,
		selectForm2:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.selectForm2 = new pOProductSectForm();
			this.productTree = new pOProductTree({supplierId:this.supplierId});
			pOProductPanel.superclass.constructor.call(this, {
				iconCls:'icon-grid',
                split: true,
                width: 200,
                height : 500,
                minSize: 175,
                maxSize: 575,
                collapsible: true,
				layout: 'border',
				items : [
					{
						region: 'north',
						iconCls:'icon-grid',
						title: '产品查询',
						split: true,
						height : 110,
						minSize: 90,
						maxSize: 90,
						collapsible: true,
						margins: '5 5 5 5',
						items : [this.selectForm2]
						
					}, {
						region: 'center',
						split: true,
						minSize: 100,
						maxSize: 200,
						collapsible: true,
						layout: 'fit',
						margins: '-5 5 5 5',
						items : [this.productTree]
					}	
				]
			})
		}
	});

       
	var pOProductWin = Ext.extend(Ext.Window,{
			supplierId:null,
			nav2:null,
			callBackMethod:null,
			constructor : function(_cfg){
				if(_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);
				this.nav2 = new pOProductPanel({supplierId:this.supplierId});
				this.nav2.productTree.on('rowdblclick',function(grid,rowIndex,e){
					var s = grid.getStore();
					var record = s.getAt(rowIndex);
					var arr = [];
					try {
							arr.push(record);
							this.callBackMethod(arr);
						} catch(_err) {
							Ext.Msg.show({
								title : '系统提示',
								msg : _err.message,
								width : 260,
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
						}
				},this);
				pOProductWin.superclass.constructor.call(this, {
					title:"添加产品",  
					width:800,  
					height:544,  
//					modal:true,
					plain:true,
					resizable:false,
					draggable:true,
					maximizable: true,
					layout:"fit",  
					listeners : {
						'render' : function() {
							//监听搜索事件。
							this.nav2.selectForm2.on({
								'search' : function(_form, _values) {
									var _grid = this.nav2.productTree.store;
									var searchStr = _values;
									_grid.baseParams.searchStr = Ext.encode(searchStr);
									_grid.reload();
								},
								scope : this
							})
						}
					},
					 buttons : [{
						text : "保存",
						handler : function() {
							var arr = this.nav2.productTree.pOProductTree_Check.getSelections();
							if(arr.length < 1) {
								Ext.Msg.show({
									title:'系统提示',
									msg: '请选择一条记录进行操作！',
									buttons: Ext.Msg.OK,
									icon: Ext.MessageBox.INFO
								});
								return;
							}
							try {
								this.callBackMethod(arr);
							} catch(_err) {
								Ext.Msg.show({
									title : '系统提示',
									msg : _err.description,
									width : 260,
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.INFO
								});
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
				items : [this.nav2]
				})
			}
		});
