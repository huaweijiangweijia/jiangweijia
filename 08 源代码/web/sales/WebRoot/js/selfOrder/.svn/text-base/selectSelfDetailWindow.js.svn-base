
var  sOProductSelectForm = Ext.extend(Ext.FormPanel, {
	store:null,
	contractCode:null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		var proxy = new Ext.data.HttpProxy({url: PATH + "/selfOrder/cpsiList.do"});
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
		sOProductSelectForm.superclass.constructor.call(this, {
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
								hiddenName:'contractProjectSortId',
								store: this.store,
								valueField:'id',
								displayField:'proSortName',
								typeAhead: true,
								mode: 'local',
								triggerAction: 'all',
								emptyText:'全部',
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
	

	//合同详细产品树

	var sOProductTree = Ext.extend(Ext.tree.ColumnTree,{
		contractCode:null,
		supplierId:null,
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.store = new Ext.data.Store({
			   proxy: new Ext.data.HttpProxy({url:PATH + '/selfOrder/contractDetailList.do'}),
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
		    this.store.baseParams.contractCode = this.contractCode;
			this.store.baseParams.supplierId = this.supplierId;
			this.store.load({params:{start:0,limit:20}});
			sOProductTree.superclass.constructor.call(this, {
				height: 470,
				bodyStyle:'width:100%',
				rootVisible:false,
				autoScroll:true,
				expandable:false,
				enableDD:false,
				columns:[
						{header:'合同详细ID',width:100,dataIndex:'contractProductDetailId',disEnableEdit:true},
						{header:'序号',width:100,dataIndex:'serialNumber',disEnableEdit:true},
						{header:'项目号',width:100,dataIndex:'projectCode',disEnableEdit:true},
						{header:'合同分名称',width:180,dataIndex:'proSortName',disEnableEdit:true},
						{header:'工具牌号',width:190,dataIndex:'brandCode',disEnableEdit:true},
						{header:'货品编号',width:100,dataIndex:'productCode',disEnableEdit:true},
						{header:'名称',width:100,dataIndex:'productName',disEnableEdit:true},
						{header:'价格',width:70,dataIndex:'price'},
						{header:'计量单位',width:60,dataIndex:'productUnit',disEnableEdit:true},
						{header:'合同数量',width:70,dataIndex:'contractAmount',disEnableEdit:true},
						{header:'剩余采购数量',width:80,dataIndex:'remainAmount',disEnableEdit:true},
						{header:'采购数量',width:70,dataIndex:'orderAmount'},
						{header:'货品金额',width:80,dataIndex:'productMoney',disEnableEdit:true},
						{header:'交货日期',width:100,dataIndex:'deliveryDate',disEnableEdit:true},
						{header:'货品编号',width:100,dataIndex:'productCode',disEnableEdit:true},
						{header:'品牌',width:100,dataIndex:'productBrand',disEnableEdit:true},
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
						{header:'叶子节点',width:0,hidden : true,dataIndex:'leaf'},
						{header:'合同分_主键',width:0,dataIndex:'contractProjectSortId',hidden : true}
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

	var sOProdcutPanel = Ext.extend(Ext.Panel,{
		selectForm2:null,
		detail_list:null,
		contractCode:null,
		supplierId:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.selectForm2 = new sOProductSelectForm({contractCode:this.contractCode});
			this.detail_list = new sOProductTree({contractCode:this.contractCode,supplierId:this.supplierId});
			sOProdcutPanel.superclass.constructor.call(this, {
			iconCls:'icon-grid',
            layout: 'border',
			width: 250,
			height : 500,
			buttonAlign:'right',
            items: [
            {
                region: 'north',
                iconCls:'icon-grid',
                split: true,
                height : 90,
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
            }]
       })
		}
	});


	var sOProductWin = Ext.extend(Ext.Window,{
		nav2:null,
		contractCode:null,
		supplierId:null,
		callBackMethod:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.nav2 = new sOProdcutPanel({contractCode:this.contractCode,supplierId:this.supplierId});
			this.nav2.detail_list.contractCode = this.contractCode;
			this.nav2.detail_list.supplierId = this.supplierId;
//			this.nav2.detail_list.on('dblclick',function(node,e ){
//					if(node.attributes.parentToolsId != 'root')
//					{
//						return;
//					}
//					else
//					{
//						try {
//								var t = Ext.tree.toNewTreeNode(node.attributes,{'uiProvider':'col'},true);
//								this.callBackMethod(t);
//						} catch(_err) {
//							Ext.Msg.show({
//								title : '信息提示',
//								msg : _err.description,
//								width : 260,
//								buttons : Ext.Msg.OK,
//								icon : Ext.MessageBox.INFO
//							});
//						}
//					}
//				},this);
			sOProductWin.superclass.constructor.call(this, {
				title:"添加产品",  
				width:850,  
				height:544,  
//				modal:true,
				plain:true,
				closable : true,
				resizable:false,
				draggable:true,
				maximizable:true,
				layout:"fit",  
				listeners : {
					'render' : function() {
						//监听搜索事件。
						this.nav2.selectForm2.on({
							'search' : function(_form, _values) {
								var _grid = this.nav2.detail_list.store;
								var searchStr = _values;
								_grid.reload({params:searchStr});
							},
							scope : this
						})
					}
				},
				 buttons : [{
					text : "确定",
					handler : function() {
						
						var selectedItem = this.nav2.detail_list.getSelectionModel().getSelectedNode();
						if(!selectedItem) {
							Ext.Msg.show({
								title:'信息提示',
								msg: '请选择一条记录进行操作！',
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.INFO
							});
							return;
						}
						if(selectedItem.attributes.parentToolsId != 'root') {
							Ext.Msg.show({
								title:'信息提示',
								msg: '请选择记录的根节点进行操作！',
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.INFO
							});
							return;
						}
						/**/
						try {
								var t = Ext.tree.toNewTreeNode(selectedItem.attributes,{'uiProvider':'col'},false);
								this.callBackMethod(t,selectedItem);
								
							} catch(_err) {
								Ext.Msg.show({
									title : '信息提示',
									msg : _err.message,
									width : 260,
									buttons : Ext.Msg.OK,
									icon : Ext.MessageBox.INFO
								});
							}
						/**/
//						this.close();
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

	
	//将节点添加到树
    addNodeToTree = function(newNode, tree) {
			treeSelectedItem = tree.getRootNode(); 
			treeSelectedItem.insertBefore(newNode, treeSelectedItem.firstChild);
		
	}    
