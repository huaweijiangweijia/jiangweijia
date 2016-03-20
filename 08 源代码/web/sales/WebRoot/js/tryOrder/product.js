
	var tOContractDetailTree_Check = new Ext.grid.CheckboxSelectionModel();
	var tOContractDetailTree =  Ext.extend(Ext.grid.GridPanel,{
		contractCode:null,
		supplierId:null,
		productBrand:null,
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/scheduleOrder/productList.do"});
			var Bill = Ext.data.Record.create([
												{name: 'serialNumber', type: 'string',mapping:"serialNumber"},
											{name: 'productName' , type: 'string',mapping:"productName"},
											{name: 'brandCode', type: 'string',mapping:"brandCode"},
											{name: 'productCode', type: 'string',mapping:"productCode"},
											{name: 'productUnit', type: 'string',mapping:"productUnit"},
											{name: 'contractAmount', type: 'float',mapping:"contractAmount"},
											{name: 'productBrand' , type: 'string',mapping:"productBrand"},
											{name: 'remainAmount', type: 'float',mapping:"remainAmount"},
											{name: 'orderAmount', type: 'float',mapping:"orderAmount"},
											{name: 'price', type: 'float',mapping:"price"},
											{name: 'parentToolsId', type: 'string',mapping:"parentToolsId"},
											{name: 'toolsId', type: 'string',mapping:"toolsId"},
											{name: 'leaf', type: 'string',mapping:"leaf"},
											{name: 'contractProductDetailId', type: 'string',mapping:"contractProductDetailId"},
											{name: 'id', type: 'string',mapping:"id"},
											{name: 'deliveryDate', type: 'string',mapping:"deliveryDate"},
											{name: 'productMoney', type: 'float',mapping:"productMoney"}
											]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader
			});
			this.store.baseParams.quotationCode = this.contractCode;
			this.store.baseParams.supplierId = this.supplierId;
//			this.store.baseParams.productBrand = this.productBrand;
			this.store.load({params:{start:0,limit:20}});	
			tOContractDetailTree.superclass.constructor.call(this, {
				height:520,
				sm:tOContractDetailTree_Check,
				store:this.store,
				columns:[
					 new Ext.grid.RowNumberer(),
					tOContractDetailTree_Check,
					{header:'序号',width:100,dataIndex:'serialNumber',sortable:true},
					{header:'名称',width:100,dataIndex:'productName',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'工具牌号',width:220,dataIndex:'brandCode',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true},
					{header:'计量单位',width:100,dataIndex:'productUnit',sortable:true},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'报价单数量',width:100,dataIndex:'contractAmount',sortable:true},
					{header:'剩余采购数量',width:100,dataIndex:'remainAmount',sortable:true},
					{header:'采购价格',width:100,dataIndex:'price',sortable:true},
					{header:'父ID',width:0,hidden : true,dataIndex:'parentToolsId',sortable:true},
					{header:'工具ID',width:0,hidden : true,dataIndex:'toolsId',sortable:true},
					{header:'叶子节点',width:0,hidden : true,dataIndex:'leaf',sortable:true},
					{header:'ID',width:0,dataIndex:'id',hidden : true},
					{header:'采购数量',width:0,dataIndex:'orderAmount',hidden : true},
					{header:'交货日期',width:0,dataIndex:'deliveryDate',hidden : true},
					{header:'货品金额',width:0,dataIndex:'productMoney',hidden : true}
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


var  tOProductSelectForm = Ext.extend(Ext.FormPanel, {
	contractCode:null,
	store:null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		var proxy = new Ext.data.HttpProxy({url: PATH + "/scheduleOrder/getSPSIList.do"});
		var Bill = Ext.data.Record.create([
										   {name: 'id', type: 'string',mapping:"id"},
										   {name: "proSortName", type: "string", mapping: "proSortName"}
		]);
		var reader = new Ext.data.JsonReader({ 
			totalProperty:'totalProperty',root:'root'
		}, Bill);
		this.store = new Ext.data.Store({
			proxy: proxy,
			reader: reader
		});
		this.store.baseParams.quotationCode = this.contractCode;
		this.store.load();
		tOProductSelectForm.superclass.constructor.call(this, {
	        labelAlign:'left',buttonAlign:'right',bodyStyle:'padding:5px;', border : false,
	        frame:true,labelWidth:70,monitorValid:false,
	        items:[
	           {layout:'column',border:false,labelSeparator:':',frame : true,
	           defaults:{layout: 'form',border:false,columnWidth:.3},
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
	              {items: [{xtype:'textfield',fieldLabel: '工具牌号',name: 'brandCode',anchor:'90%'}]},
				  {items: [{xtype:'textfield',fieldLabel: '名称',name: 'productName',anchor:'90%'}]}
				 /* {items: [
								new Ext.form.ComboBox({
								fieldLabel: '报价单分项',
								hiddenName:'id',
								store : this.store,
								valueField:'id',
								triggerAction: 'all',
								displayField: 'proSortName', 
								emptyText:'请选择合同分类',
								anchor:'90%',
								style: 'margin-top:1px;',
								selectOnFocus:true,
								readOnly:true
							})
						]}*/
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
	
        			
	var tOProductPanel = Ext.extend(Ext.Panel,{
		detail_list:null,
		contractCode:null,
		supplierId:null,
		selectForm2:null,
		productBrand:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.selectForm2 = new tOProductSelectForm({contractCode:this.contractCode});
			this.detail_list = new tOContractDetailTree({contractCode:this.contractCode,supplierId:this.supplierId,productBrand:this.productBrand});
			tOProductPanel.superclass.constructor.call(this, {
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
						items : [this.detail_list]
					}
				]
			})
		}
	});


	var tOProductWin = Ext.extend(Ext.Window,{
		nav2:null,
		contractCode:null,
		supplierId:null,
		productBrand:null,
		callBackMethod:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.nav2 = new tOProductPanel({contractCode:this.contractCode,supplierId:this.supplierId,productBrand:this.productBrand});
			this.nav2.detail_list.contractCode = this.contractCode;
			this.nav2.detail_list.supplierId = this.supplierId;
			this.nav2.detail_list.on('rowdblclick',function(grid,rowIndex,e){
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
			tOProductWin.superclass.constructor.call(this, {
				title:"添加产品",  
				width:800,  
				height:550,  
//				modal:true,
				plain:true,
				closable : true,
				resizable:false,
				draggable:true,
				maximizable: true,
//				autoScroll:true,
				layout:"fit",  
				listeners : {
						'render' : function() {
							//监听搜索事件。
							this.nav2.selectForm2.on({
								'search' : function(_form, _values) {
									var _grid = this.nav2.detail_list.store;
//									var searchStr = _values;
//									_grid.baseParams.searchStr = Ext.encode(searchStr);
									_grid.baseParams.brandCode = _values.brandCode
									_grid.baseParams.productName = _values.productName
									_grid.baseParams.proSortName = _values.proSortName
									_grid.reload();
								},
								scope : this
							})
						}
					},
				 buttons : [{
					text : "确定",
					handler : function() {
						var arr = tOContractDetailTree_Check.getSelections();
						if(arr.length < 1) {
							Ext.Msg.show({
								title:'系统提示',
								msg: '请选择一条记录进行操作!',
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
	})
