
	var productTree_Check = new Ext.grid.CheckboxSelectionModel();
	var productTree =  Ext.extend(Ext.grid.GridPanel,{
		supplierId:null,
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/reserveOrder/productList.do"});
			var Bill = Ext.data.Record.create([
											{name: 'productName' , type: 'string',mapping:"productName"},
											{name: 'brandCode', type: 'string',mapping:"brandCode"},
											{name: 'productCode', type: 'string',mapping:"productCode"},
											{name: 'productUnit', type: 'string',mapping:"productUnit"},
											{name: 'productBrand' , type: 'string',mapping:"productBrand"},
											{name: 'price', type: 'string',mapping:"stockPrice"},
											{name: 'parentToolsId', type: 'string',mapping:"parentId"},
											{name: 'toolsId', type: 'string',mapping:"toolsId"},
											{name: 'leaf', type: 'string',mapping:"leaf"},
											{name: 'productSortCode', type: 'string',mapping:"productSortCode"},
											{name: 'productSource', type: 'string',mapping:"productSource"},
											{name: 'memo', type: 'string',mapping:"memo"},
											{name: 'orderAmount', type: 'float',defaultValue:0},
											{name: 'productMoney', type: 'float',defaultValue:0.00},
//											{name: 'id', type: 'string'},
											{name: 'deliveryDate', type: 'string',defaultValue:''}
											]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader
			});
			this.store.baseParams.contractCode = this.contractCode;
			this.store.baseParams.supplierId = this.supplierId;
			this.store.baseParams.productBrand = this.productBrand;
			this.store.load({params:{start:0,limit:20}});	
			productTree.superclass.constructor.call(this, {
				height:520,
				sm:productTree_Check,
				store:this.store,
				columns:[
					 new Ext.grid.RowNumberer(),
					productTree_Check,
					{header:'名称',width:100,dataIndex:'productName',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'工具牌号',width:190,dataIndex:'brandCode',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true},
					{header:'计量单位',width:60,dataIndex:'productUnit',sortable:true},
					{header:'组别',width:100,dataIndex:'productSortCode',sortable:true},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'采购价格',width:80,dataIndex:'price',sortable:true},
					//{header:'来源',width:100,dataIndex:'productSource',sortable:true},
		        	{header:'备注',width:180,dataIndex:'memo',sortable:true},
					{header:'父ID',width:100,hidden : true,dataIndex:'parentToolsId'},
					{header:'工具ID',width:100,hidden : true,dataIndex:'toolsId'},
					{header:'叶子节点',width:100,hidden : true,dataIndex:'leaf'},
					{header:'ID',width:100,dataIndex:'id',hidden : true},
					{header:'采购数量',width:100,dataIndex:'orderAmount',hidden : true},
					{header:'货品金额',width:100,dataIndex:'productMoney',hidden : true},
					{header:'交货日期',width:100,dataIndex:'deliveryDate',hidden : true}
				],    
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize: 20,
					displayInfo: true,
					displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
					emptyMsg: "<i>没有数据</i>"
				})
			})
		}
	})

var  productSelectForm = Ext.extend(Ext.FormPanel, {
	supplierId:null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.yearCombo = new Ext.ftl.HistoryPriceYearCombox({fieldLabel: '价格执行期'});
		this.proBrand = new Ext.ftl.SuppliersBrand();//Ext.zhj.ProductBrankCombox({width : 50});
		this.proBrand.store.baseParams.supplierId = this.supplierId;
		this.yearCombo.on({
			'select' : function(_combo) {
				this.paramRecord.salePriceDate = _combo.getValue();
			},scope : this
		}),
		this.proBrand.on({
			'select' : function(_combo) {
				this.yearCombo.reset();
				this.yearCombo.store.reload({params:{productBrand:_combo.getValue()}});
			},scope : this
		});
		
		productSelectForm.superclass.constructor.call(this, {
	        labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;', border : false,
	        frame:true,labelWidth:65,monitorValid:false,
	        items:[
	           {layout:'column',border:false,labelSeparator:':',frame : true,
	           defaults:{layout: 'form',border:false,columnWidth:.25},
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
				  {items: [{xtype:'textfield',fieldLabel: '名称',name: 'productName',anchor:'90%'}]},
				  {items: [this.proBrand]},
				  {items: [this.yearCombo]}
				  
				  
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
        

	var productPanel = Ext.extend(Ext.Panel,{
		supplierId:null,
		productTree:null,
		selectForm2:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.selectForm2 = new productSelectForm({supplierId:this.supplierId});
			this.productTree = new productTree({supplierId:this.supplierId});
			productPanel.superclass.constructor.call(this, {
				iconCls:'icon-grid',
                split: true,
                width: 900,
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

	var selectRorderProductwindow = Ext.extend(Ext.Window,{
			supplierId:null,
			nav2:null,
			callBackMethod:null,
			constructor : function(_cfg){
				if(_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);
				this.nav2 = new productPanel({supplierId:this.supplierId});
				this.nav2.productTree.on('rowdblclick',function(grid,rowIndex,e){
					var s = grid.getStore();
					var record = s.getAt(rowIndex);
					var arr = [];
					try {
							arr.push(record);
							this.callBackMethod(arr,this);
						} catch(_err) {
							Ext.Msg.show({
								title : '系统提示',
								msg : _err.description,
								width : 260,
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
						}
				},this);
				selectRorderProductwindow.superclass.constructor.call(this, {
					title:"添加产品",  
					width:900,  
					height:544,  
//					modal:true,
					plain:true,
					closable : true,
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
						text : "确定",
						handler : function() {
							var arr = productTree_Check.getSelections();
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
								this.callBackMethod(arr,this);
							} catch(_err) {
								Ext.Msg.show({
									title : '系统提示',
									msg : _err.description,
									width : 260,
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.INFO
								});
							}
//							this.close();
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

//    });