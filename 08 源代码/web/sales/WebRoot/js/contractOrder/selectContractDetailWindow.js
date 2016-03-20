
	var cOContractDetailTree_Check = new Ext.grid.CheckboxSelectionModel();
	var cOContractDetailTree =  Ext.extend(Ext.grid.GridPanel,{
		contractCode:null,
		supplierId:null,
		productBrand:null,
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/contractOrder/contractDetailList.do"});
			var Bill = Ext.data.Record.create([
											{name: 'proSortName', type: 'string',mapping:"proSortName"},
											{name: 'projectCode', type: 'string',mapping:"projectCode"},
											{name: 'serialNumber', type: 'string',mapping:"serialNumber"},
											{name: 'productName' , type: 'string',mapping:"productName"},
											{name: 'brandCode', type: 'string',mapping:"brandCode"},
											{name: 'productCode', type: 'string',mapping:"productCode"},
											{name: 'productUnit', type: 'string',mapping:"productUnit"},
											{name: 'contractAmount', type: 'int',mapping:"contractAmount"},
											{name: 'productBrand' , type: 'string',mapping:"productBrand"},
											{name: 'remainAmount', type: 'string',mapping:"remainAmount"},
											{name: 'price', type: 'string',mapping:"price"},
											{name: 'parentToolsId', type: 'string',mapping:"parentToolsId"},
											{name: 'toolsId', type: 'string',mapping:"toolsId"},
											{name: 'leaf', type: 'string',mapping:"leaf"},
											{name: 'contractProductDetailId', type: 'string',mapping:"contractProductDetailId"},
											{name: 'contractProjectSortId', type: 'string',mapping:"contractProjectSortId"},
											{name: 'productMoney', type: 'string',mapping:"productMoney"},
											{name: 'id', type: 'string',mapping:"id"},
											{name: 'orderAmount', type: 'string',mapping:"orderAmount"},
											{name: 'deliveryDate', type: 'string',mapping:"deliveryDate"}
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
			cOContractDetailTree.superclass.constructor.call(this, {
				height:520,
				sm:cOContractDetailTree_Check,
				store:this.store,
				columns:[
					 new Ext.grid.RowNumberer(),
					cOContractDetailTree_Check,
					{header:'名称',width:100,dataIndex:'productName',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'工具牌号',width:220,dataIndex:'brandCode',sortable:true,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return '<span>' + value + "</span>";}},
					{header:'合同分项名称',width:100,dataIndex:'proSortName',sortable:true},
					{header:'项目号',width:100,dataIndex:'projectCode',sortable:true},
					{header:'序号',width:100,dataIndex:'serialNumber',sortable:true},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true},
					{header:'计量单位',width:100,dataIndex:'productUnit',sortable:true},
					{header:'合同数量',width:100,dataIndex:'contractAmount',sortable:true},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'剩余采购数量',width:0,dataIndex:'remainAmount',sortable:true},
					{header:'采购价格',width:100,dataIndex:'price',sortable:true},
					{header:'父ID',width:0,hidden : true,dataIndex:'parentToolsId'},
					{header:'工具ID',width:0,hidden : true,dataIndex:'toolsId'},
					{header:'叶子节点',width:0,hidden : true,dataIndex:'leaf'},
					{header:'ID',width:0,dataIndex:'contractProductDetailId',hidden : true},
					{header:'',width:0,dataIndex:'contractProjectSortId',hidden : true},
					{header:'',width:0,dataIndex:'id',hidden : true},
					{header:'',width:0,dataIndex:'orderAmount',hidden : true},
					{header:'',width:0,dataIndex:'deliveryDate',hidden : true},
					{header:'',width:0,dataIndex:'productMoney',hidden : true}
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


var  cOProductSelectForm = Ext.extend(Ext.FormPanel, {
	contractCode:null,
	store:null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		var proxy = new Ext.data.HttpProxy({url: PATH + "/contractOrder/cpsiList.do"});
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
		this.store.baseParams.contractCode = this.contractCode;
		this.store.load();
		cOProductSelectForm.superclass.constructor.call(this, {
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
				  {items: [{xtype:'textfield',fieldLabel: '名称',name: 'productName',anchor:'90%'}]},
				  {items: [
								new Ext.form.ComboBox({
								fieldLabel: '合同分项',
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
						]}
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
	
        			
	var cOProductPanel = Ext.extend(Ext.Panel,{
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
			this.selectForm2 = new cOProductSelectForm({contractCode:this.contractCode});
			this.detail_list = new cOContractDetailTree({contractCode:this.contractCode,supplierId:this.supplierId,productBrand:this.productBrand});
			cOProductPanel.superclass.constructor.call(this, {
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


	var cOProductWin = Ext.extend(Ext.Window,{
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
			this.nav2 = new cOProductPanel({contractCode:this.contractCode,supplierId:this.supplierId,productBrand:this.productBrand});
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
								msg : _err.message,
								width : 260,
								buttons : Ext.Msg.OK,
								icon : Ext.MessageBox.INFO
							});
						}
				},this);
			cOProductWin.superclass.constructor.call(this, {
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
						var arr = cOContractDetailTree_Check.getSelections();
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
									msg : _err.message,
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
