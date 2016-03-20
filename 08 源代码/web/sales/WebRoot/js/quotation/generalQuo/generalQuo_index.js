/**
 * 普通报价命名空间
 */
Ext.namespace('Ext.ftl.generalQuo');
Ext.namespace('Ext.ftl.customer');

Customer = Ext.ftl.customer;
//-------------------------------客户信息-----------------------------------------
Customer.QuoInfoFormRecord = Ext.data.Record.create([
    {name: 'customerCode'},
    {name : 'customerName'},
    {name : 'cusContactPerson'},
    {name : 'customerPhone'},
    {name : 'customerFax'},
    {name : 'id'},
    {name : 'customerId'},
    {name : 'overallRebate'},
    {name : 'editorName'},
    {name : 'userName'},
    {name : 'paymentConditionMode'}
]);
Customer.CustomerGrid = Ext.extend(Ext.grid.GridPanel, {
	/**
	 * 请求地址
	 * @type String
	 */
	storeUrl : '',
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		
		Customer.CustomerGrid.superclass.constructor.call(this, {
			title : this['title'] == null ? '客户信息列表' : this['title'],
			hideHeaders : false,//隐藏表头。
			store : new Ext.data.JsonStore({
				url : this.storeUrl,
				remoteSort : true,
				totalProperty : 'totalProperty',
				root : 'customer',
				fields : ['customerCode','customerName','contactPersonFirst','phoneFirst','faxFirst','contactPersonSec','phoneSec','faxSec',
				'ownContactPerson','degreeCode','email','contractAddress','postcode','comAdress','bank',
				'accountNumber','taxCode','homePage','memo', 'id','closingAccountMode']
			}),
			//sm : sm,
			columns : [//sm,
				{header : '客户编号',dataIndex : 'customerCode',sortable: true},
				{header : '客户名称' ,  dataIndex : 'customerName',sortable: true},
				{header : '联系人1', dataIndex : 'contactPersonFirst',sortable: true},
				{header : '电话1', dataIndex : 'phoneFirst',sortable: true},
				{header : '传真1', dataIndex : 'faxFirst',sortable: true},
				{header : '联系人2', dataIndex : 'contactPersonSec',sortable: true},
				{header : '电话2', dataIndex : 'phoneSec',sortable: true},
				{header : '传真2', dataIndex : 'faxSec',sortable: true},
				{header : '我方联系人', dataIndex : 'ownContactPerson',sortable: true},
				{header : '客户等级', dataIndex : 'degreeCode',sortable: true},
				{header : 'Email', dataIndex : 'email',sortable: true},
				{header : '合同地址', dataIndex : 'contractAddress',sortable: true},
				{header : '邮编', dataIndex : 'postcode',sortable: true},
				{header : '通讯地址', dataIndex : 'comAdress',sortable: true},
				{header : '开户银行', dataIndex : 'bank',sortable: true},
				{header : '账号', dataIndex : 'accountNumber',sortable: true},
				{header : '税号', dataIndex : 'taxCode',sortable: true},
				{header : '主页', dataIndex : 'homePage',sortable: true},
				{header : '备注', dataIndex : 'memo',sortable: true},
				{header : 'id', dataIndex : 'id', hidden : true}
			],
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : true,
				listeners : {
					'rowselect' : {
						fn : function(_sel, _index, _r) {
							this.fireEvent('rowselect', _r)//必须给此方法附加一个对象,否则将出错．this是CustomerGrid本身
						},
						scope : this
					}
				}
			}),
			width : 1250,
			height : 350,
			bodyStyle:'width:100%',
			iconCls:'icon-grid',
			//frame : true,
			stripeRows :true,
			viewConfig: {   
	            forceFit:true,
	            autoFill : true,
	            deferEmptyText : false,
	            //enableRowBody : false,
	            emptyText : '无客户信息！'
        	},
			enableHdMenu : false
		})
	},
	
	/**
	 * 获取所选取的记录。如果没有选择，抛出一个异常。
	 * @return {} Record
	 */
	getSelected : function() {
		var _sm = this.getSelectionModel();
		
		if(_sm.getCount() == 0) {
			throw Error('请选择客户后再进行操作！');
		} else {
			return _sm.getSelected();
		}
	}
})

Customer.CustomerWindow = Ext.extend(Ext.Window, {
	isCopy : false,
	quoRecord : null,
	grid : null,
	paramRecord : null,
	quoType : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.grid = new Customer.CustomerGrid({
			storeUrl : PATH + "/generalQuo/getCustomerAction.do"
		});
		
		this.paramRecord = new Customer.QuoInfoFormRecord();
		Customer.CustomerWindow.superclass.constructor.call(this, {
			title : '客户信息',
			width : Ext.getBody().getWidth()-100,
			height : 450,
			closable : true,
			draggable : true,
			resizable : true,
			constrainHeader : true,
			layout : 'fit',
			items : this.grid,
			closeAction : 'hide',
			listeners : {
            	'render' : function() {
            		this.grid.on({
            			'dblclick' : function() {
            				this.buttons[0].fireEvent('click');
            			},scope : this
            		})
            		var _customerStore = this.grid.getStore();
            		_customerStore.on({
            			"beforeLoad" : function() {
			           		_customerStore.baseParams.searchStr = Ext.util.JSON.encode(this.paramRecord);
			           	}, 
			           	scope:this
			        });
            	},scope : this
            },
			buttons : [{
				text : "确定",
				listeners : {
	        		'click' : function(_btn, e) {
	        			fn : this.onSubmitClick(_btn, e);
	        		},scope : this
	        	}
			},{
				text : "取消",
				handler : function () {
					this.hide();
				},scope : this
			}],
			//搜索栏
			tbar : [new Ext.form.Label({
            	html : "&nbsp;客户编号:&nbsp;"
            
            }), new Ext.form.TextField({
            	name : 'customerCode',
		      	id : 'customerCode',
		      	enableKeyEvents: true,
		      	listeners : {
	            	'specialkey' : function(field, e) {
	            		if(e.getKey() == e.ENTER) {
	            			this.fireEvent('change');
	            			this.ownerCt.ownerCt.grid.getStore().reload({params : {start : 0, limit : PAGESIZE}});
	            		}
	            	},
	            	
		      		'change' : function() {
		      			this.ownerCt.ownerCt.paramRecord.customerCode = this.getValue();
		      		}
		      	}
            
            }),'-', new Ext.form.Label({
            	html : "客户名称:&nbsp;"
            
            }), new Ext.form.TextField({
            	name : 'customerName',
		      	id : 'customerName',
		      	listeners : {
		      		'specialkey' : function(field, e) {
	            		if(e.getKey() == e.ENTER) {
	            			this.fireEvent('change');
	            			this.ownerCt.ownerCt.grid.getStore().reload({params : {start : 0, limit : PAGESIZE}});
	            		}
	            	},
		      		'change' : function() {
		      			this.ownerCt.ownerCt.paramRecord.customerName = this.getValue();
		      		}
		      	}
            
            }),'-',{  
					text:'搜索'  
					,iconCls:'icon-search',
					listeners : {
						'click' : function(){
							this.grid.getStore().load({params : {start : 0, limit : PAGESIZE}});
						},scope : this
					}
					
				},'-',{  
					text:'重置'  
					,iconCls:'icon-reset',
					listeners : {
						'click' : function(){
							var cusNameCMP = Ext.getCmp("customerName");
							var cusCodeCMP = Ext.getCmp("customerCode");
							cusNameCMP.reset();
							cusNameCMP.fireEvent("change");
							cusCodeCMP.reset();
							cusCodeCMP.fireEvent("change");
							
						},scope : this
					}
					
				}],
			//分页信息栏
			bbar : new Ext.PagingToolbar({
				pageSize : PAGESIZE,
				emptyMsg: "没有记录",
				displayInfo: true,
        		displayMsg: '显示第 {0} - {1} 条 共 {2} 条',
				store : this.grid.getStore()
			})
		})
		this.addEvents('onsubsuccess');
	},
	
	onSubmitClick : function() {
		try {
			var record = this.grid.getSelected();
			if(Ext.isEmpty(record.get('ownContactPerson'))) {
				Ext.Msg.show({
					title:'信息提示',
					msg: '请添加我方联系人！',
					buttons: Ext.Msg.OK,
					width : 200,
					icon: Ext.MessageBox.INFO
				});
				return;
			}
			var myRecord = new Customer.QuoInfoFormRecord({
			    customerCode: record.get("customerCode") + "-" + record.get("customerName"),
			    cusContactPerson : record.get("contactPersonFirst"),
			    customerPhone : record.get("phoneFirst"),
			    customerFax : record.get("faxFirst"),
			    id : record.get("id"),
			    customerId : record.get("id"),
			    overallRebate : 0,
			    editorName : _editerName,
			    userName : record.get("ownContactPerson"),
			    paymentConditionMode : record.get('closingAccountMode')
			});
		} catch(e) {
			Ext.Msg.show({
					title:'信息提示',
					msg: '请选择客户信息！',
					buttons: Ext.Msg.OK,
					width : 200,
					icon: Ext.MessageBox.INFO
				});
			return;
		}
		
		this.hide(); 
		
		if(this.isCopy) {
			var _quoRecord = this.quoRecord.copy();
			_quoRecord.data.status=0;
			Ext.apply(_quoRecord.data, myRecord.data);
			_quoRecord.data.quotationCode="";
			//alert(Ext.encode(_quoRecord.data));
			var addWindow = new Quomanager.AddWindow({
				customerRecord : myRecord, 
				loaderUrl : PATH + '/generalQuo/getQuoDetailAction.do',
				quoType : this.quoType
			});
			var _quoForm = addWindow.northPanel.quotationForm;
			//addWindow.centerPanel.productTree.getLoader().baseParams.quoId = this.quoRecord.get('id');
			//addWindow.centerPanel.productTree.getLoader().baseParams.cusId = myRecord.data['customerId'];
			addWindow._grid.store.baseParams.quoId = this.quoRecord.get('id');
			addWindow._grid.store.baseParams.cusId = myRecord.data['customerId'];
			
			addWindow.on('onsubmitsuccess', function() {
				this.fireEvent('onsubsuccess');
			},this)
			addWindow.isCopy=true;
			addWindow.show();
			_quoForm.setValues(_quoRecord);
		} else {
			var addWindow = new Quomanager.AddWindow({customerRecord : myRecord, quoType : this.quoType});
			var _quoForm = addWindow.northPanel.quotationForm;
			addWindow.on('onsubmitsuccess', function() {
				this.fireEvent('onsubsuccess');
			},this)
			addWindow.show();
			_quoForm.sallerCombox.store.load();//加载卖方
			_quoForm.currCombox.store.load();//加载币别
			_quoForm.taxRateCombox.store.load();//加载税率
			_quoForm.setValues(myRecord);
			_quoForm.quoDateField.setValue(new Date());
			if(!Ext.isEmpty(myRecord.get('paymentConditionMode')))
				_quoForm.paymentCombox.setValue(myRecord.get('paymentConditionMode'));
		}
	}
})
//-------------------------------普通报价-----------------------------------------
Ext.ftl.generalQuo.onDetailClick = function(_id, _quoType) {
		_quoDetailWindow = new Quomanager.DetailWindow({quoType : _quoType});
		
		//_quoDetailWindow.centerPanel.productTree.getLoader().baseParams.quoId = _id
		_quoDetailWindow._grid.store.baseParams.quoId = _id;
		/*var _form = _quoDetailWindow.northPanel.quotationForm.getForm();
		_form.load({
			url : PATH + '/generalQuo/getQuoAction.do',
			params : {
				quoId: _id
			}
		})*/
		Ext.Ajax.request({
			url: PATH + '/generalQuo/getQuoAction.do',
			params: { quoId: _id },
			success : function(response) {
				var responseArray = Ext.util.JSON.decode(response.responseText); 
				if(responseArray.success == true){
					_quoDetailWindow.show();
					_quoDetailWindow.northPanel.quotationForm.isReadOnly = true;
					_quoDetailWindow.northPanel.quotationForm.setValues(new Ext.data.Record(responseArray.data));
					//_quoDetailWindow.centerPanel.productTree.getTopToolbar().hide();
					_quoDetailWindow._grid.getTopToolbar().hide();
				}
			}
		});
}

/**
 * 普通报价搜索FormPanel
 * @class Ext.ftl.generalQuo.SearchFormPanel
 * @extends Ext.FormPanel
 */
Ext.ftl.generalQuo.SearchFormPanel = Ext.extend(Ext.FormPanel, {
	statusCombox : null,
	quoType : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		var codeLabel = "报价单号";
		if(this.quoType == '0') {
			this.statusCombox = new StatusCombox({x:90,y:33, width:170,
	            listeners : {
	            	'change' : function(field, newValue, oldValue) {
	            		this.fireEvent('search',this, this.getValues(), false);
	            	},scope : this
	        }});
		} else if(this.quoType == '4') {
			this.statusCombox = new QuotationManager.TestCutStatusCombox({x:90,y:33, width:170,
	            listeners : {
	            	'change' : function(field, newValue, oldValue) {
	            		this.fireEvent('search',this, this.getValues(), false);
	            	},scope : this
	        }});
	        codeLabel = "试刀申请单号";
		} else {
			this.statusCombox = new QuotationManager.StatusCombox({x:90,y:33, width:170,
	            listeners : {
	            	'change' : function(field, newValue, oldValue) {
	            		this.fireEvent('search',this, this.getValues(), false);
	            	},scope : this
	        }});
	        codeLabel = "预订报价单号";
		}
		this.lableStyle_ = "font-size:9pt;text-align:right;width:85px";
		var _config = [
			//1
            {xtype:'label',text: codeLabel,x:0,y:5,style:this.lableStyle_},
            {xtype:'textfield', name: 'quotationCode',x:90,y:3, width:170},
            {xtype:'label',text: '我方负责人:',x:250,y:5,style:this.lableStyle_},
            {xtype:'textfield',name: 'userName',x:340,y:3, width:170},
            {xtype:'label',text: '制单人:',x:510,y:5,style:this.lableStyle_},
            {xtype:'textfield',name: 'editorName',x:600,y:3, width:170},
            //2
            {xtype:'label',text: '客户:',x:760,y:5,style:this.lableStyle_},
            {xtype:'textfield', name: 'customerName',x:850,y:3, width:170},
            {xtype:'label',text: '编制日期:',x:250,y:35,style:this.lableStyle_},
            {xtype:'datefield',name: 'startTime', readOnly : true, format:'Y-m-d',emptyText:'',x:340,y:33, width:170},
            {xtype:'label',text: '至:',x:510,y:35,style:this.lableStyle_},
            {xtype:'datefield',name: 'endTime', readOnly : true, format:'Y-m-d',emptyText:'',x:600,y:33, width:170},
            //3
            {xtype:'label',text: '状态:',x:0,y:35,style:this.lableStyle_},
            this.statusCombox
		];
		
		Ext.ftl.generalQuo.SearchFormPanel.superclass.constructor.call(this, {
			//width : 1000,
	        labelAlign:'right',buttonAlign:'right', border : false,
	        bbar : ['->',{
	           		text : "搜  索",
	           		iconCls : 'icon-search',
	           		handler : function() {
	           			//发布search事件
	           			this.fireEvent('search',this, this.getValues(), true);
	           		},scope : this
           		},
           		'-',{
	           		text : "重  置",
	           		iconCls : 'icon-reset',
	           		handler : function () {
	           			this.getForm().reset();
	           		},scope : this
       		}],
	        frame:true,monitorValid:false,
	        layout: 'absolute',
	        height : 105,
	        items : _config,
	        keys : {
				key:Ext.EventObject.ENTER,
				fn:function(btn,e){
					this.fireEvent('search',this, this.getValues(), true);
				},
				scope : this
			}
	        
	    })
		
		/**
		 * 添加search事件，在点击搜索时将事件发布出去
		 */
		this.addEvents('search');
	},
	
	/**
	 * 获取搜索条件
	 * @return {} 返回搜索条件:Record
	 */
	getValues : function() {
		var record = new Ext.data.Record(this.getForm().getValues());
		return record;
	}
})

/**
 * 普通报价Store
 * @class Ext.ftl.generalQuo.QuoGridStore
 * @extends Ext.data.JsonStore
 */
Ext.ftl.generalQuo.QuoGridStore = Ext.extend(Ext.data.JsonStore, {
	quoType : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		
		Ext.ftl.generalQuo.QuoGridStore.superclass.constructor.call(this, {
			url : PATH + '/generalQuo/baseListAction.do?m=list&quotationType=' + this.quoType,
			root : 'root',
			totalProperty : 'totalProperty',
			remoteSort : true,
			fields : ['quotationCode', 'status', 'customerName', 'editorName', 'quotationDate', 'deliveryType', 'currencyName', 'productMoney', 'taxRate',
					 	'taxMoney','totalMoney', 'paymentCondition', 'memo', 'id','cusContactPerson','customerCode',
					 	'finalMoney','sellerName','editTimeStr','overallRebate','phoneFirst','customerPhone','customerFax','userName',
					 	'validStartDate','validEndDate','urgentLevel', 'currency','willOrderExpected','willFormalDate',
					 	'quotationType', 'slaveFile', 'contractCode', 'impToQuoCode', 'deliveryNum',
					 	'testRequest','testReport']
		})
	}
})

Ext.ftl.generalQuo.onSlaveClick = function(_id, _busType) {
	var slaveWindow = new Slave.SlaveManageWindow({busId : _id, busType : _busType});
	slaveWindow.show();
}

Ext.ftl.generalQuo.onViewImpQuo = function(_quoStr, _quoType) {
	var quoInfoViewWindow = new Ext.ftl.QuoInfoViewWindow({quoIdStr : _quoStr, quoType : _quoType});
	quoInfoViewWindow.show();
}

/**
 * 普通报价列模型
 * @class Ext.ftl.generalQuo.QuoGridColumn
 * @extends Ext.grid.ColumnModel
 */
Ext.ftl.generalQuo.QuoGridColumn = Ext.extend(Ext.grid.ColumnModel, {
	sm : null,
	quoType : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		
		var codeLabel  = "报价单编号";
		if(this.quoType == 3) {
			codeLabel = "预订报价单编号";
		} else if(this.quoType == 4) {
			codeLabel = "试刀申请单编号"
		}
		
		Ext.ftl.generalQuo.QuoGridColumn.superclass.constructor.call(this, [this.sm, 
			new Ext.grid.RowNumberer({
				renderer:function(value,metadata,record,rowIndex){
					var record_start = record.store.lastOptions.params.start
				    return record_start + 1 + rowIndex;
				}
			}),
			{header : codeLabel, width : 165,dataIndex : 'quotationCode',sortable: true},
			{header : '客户名称', width : 180,dataIndex : 'customerName',sortable: true},
			{header : '状态',dataIndex : 'status',renderer : this.changeStatus,sortable: true}, 
			{header : '紧急程度', width : 60, hidden : false,dataIndex : 'urgentLevel',sortable: true,renderer : this.changeLevel},
			{header : '合同编号', width : 180,dataIndex : 'contractCode',hidden : this.quoType != 0 ? true : false},
			{header : this.quoType == 4 ? '申请日期' : '报价日期', width : 75, dataIndex : 'quotationDate',sortable: true},
			{header : '预计转合同日期', dataIndex : 'willFormalDate', hidden : this.quoType == 3 ? false : true},
			{header : '试刀开始日期', hidden : this.quoType == 4 ? false : true,dataIndex : 'validStartDate',sortable: true},
			{header : '试刀完成日期', hidden : this.quoType == 4 ? false : true,dataIndex : 'validEndDate',sortable: true},
			{header : '我方负责人', width : 70, hidden : false,dataIndex : 'userName',sortable: true},
			{header : '币别',width : 70,dataIndex : 'currencyName',sortable: true},
			{header : '最终金额', width : 70, dataIndex : 'finalMoney',sortable: true},
			{header : '编制人', width : 50, dataIndex : 'editorName',sortable: true},
			{header : '编制时间',dataIndex : 'editTimeStr',sortable: true},
			{header : '备注',dataIndex : 'memo',sortable: true},
			{header:'附件',width:50,dataIndex:'slaveFile', hidden : this.quoType == 4 ? true : false, renderer : function(colValue, node, data) {
	        		if(colValue > 0) {
	        			var id = data.id
	        			var str = '<a href=\"#\" onclick=Ext.ftl.generalQuo.onSlaveClick("' + id + '",5)><span style="color:blue;font-weight:bold;">查看</span></a>';
						return str;
	        		}
	        	}},
	        {header:'试刀申请',width:60,dataIndex:'testRequest',hidden : this.quoType == 4 ? false : true, renderer : function(colValue, node, data) {
        		if(colValue > 0) {
        			var id = data.id
        			var _busType = 10;
        			var str = "<a href=\"#\" onclick=Ext.ftl.generalQuo.onSlaveClick(\'" + id + "\',\'" + _busType + "\');><span style=\'color:blue;font-weight:bold;\'>查看</span></a>";
					return str;
        		}
        	}},
        	{header:'试刀报告',width:60,dataIndex:'testReport',hidden : this.quoType == 4 ? false : true, renderer : function(colValue, node, data) {
        		if(colValue > 0) {
        			var id = data.id
        			var str = '<a href=\"#\" onclick=Ext.ftl.generalQuo.onSlaveClick("'+ id + '",11)><span style="color:blue;font-weight:bold;">查看</span></a>';
					return str;
        		}
        	}},
			/*{header: "审批信息", width: 75, dataIndex: 'auditInfor',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				var str = "<a href=\"javascript:onAuditInfor(this,\'" + record.get('id') + "\');\">查看</a>";
					return str;
				}
			},*/
			/*{header: this.quoType == 3 ? '正式报价单' : "预订报价单", width: 90, dataIndex: 'impToQuoCode', hidden : this.quoType == 4 ? true : false, 
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
					var _quoType = this.quoType;
					if(!Ext.isEmpty(value)) {
						var str = '<a href=\"#\" onclick=Ext.ftl.generalQuo.onViewImpQuo("'+ value + '",' + _quoType + ')><span style="color:blue;font-weight:bold;">查看</span></a>';
						return str;
					}
				},scope : this
			},*/
			{header: "交货单", width: 90, dataIndex: 'deliveryNum', hidden : this.quoType != 4 ? true : false, 
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
					var _quoType = this.quoType;
					if(value > 0) {
						var str = '<a href=\"#\" onclick=Ext.ftl.generalQuo.onViewImpQuo("'+ record.get('id') + '",' + _quoType + ')><span style="color:blue;font-weight:bold;">查看</span></a>';
						return str;
					}
				},scope : this
			},
			
			//{header : '是否预订', width : 60, dataIndex : 'willOrderExpected',renderer : this.changeOrderExpected, hidden : false,sortable: true},
			{header : '付款条件',dataIndex : 'paymentCondition',sortable: true,hidden : true},
			{header : '交货方式',dataIndex : 'deliveryType',sortable: true,hidden : true},
			{header : '货品金额',dataIndex : 'productMoney',sortable: true,hidden : true,
        		renderer : function(colValue, metadata, record){
	        		return parseFloat(colValue).toFixed(2);
        	}},
			{header : '税率',width : 40,dataIndex : 'taxRate',sortable: true, hidden : true},
			{header : '税金',width : 70,dataIndex : 'taxMoney',sortable: true, hidden : true,
        		renderer : function(colValue, metadata, record){
	        		return parseFloat(colValue).toFixed(2);
        	}},
			{header : '税价合计',dataIndex : 'totalMoney',sortable: true,hidden : true,
        		renderer : function(colValue, metadata, record){
	        		return parseFloat(colValue).toFixed(2);
        	}},
			{header : '查看详细',dataIndex : 'id',hidden : true},
			
			{header : '客户联系人',hidden : true,dataIndex : 'cusContactPerson',sortable: true},
			{header : '客户联系电话',hidden : true,dataIndex : 'customerPhone',sortable: true},
			{header : '传真',hidden : true,dataIndex : 'customerFax',sortable: true},
			{header : '整单折扣',hidden : true,dataIndex : 'overallRebate',sortable: true},
			{header : '客户编号',hidden : true,dataIndex : 'customerCode',sortable: true},
			{header : '卖方',hidden : true,dataIndex : 'sellerName',sortable: true},
			{header : '币别编号',hidden : true,dataIndex : 'currency',sortable: true},
			{header : '报价类型', dataIndex : 'quotationType', hidden : true}
		])
	},
	
	changeStatus : function(value) {
		switch (value) {
			case 0 :
			return "<span style='color:#606E7F;font-weight:bold;'>编制</span>";
			/*case 1 :
			return "<span style='color:#A1A09D;font-weight:bold;'>待审批</span>";
			case 2 :
			return "<span style='color:green;font-weight:bold;'>审批通过</span>";
			case 3 :
			return "<span style='color:red;font-weight:bold;'>审批退回</span>";*/
			case 4 :
			return "<span style='color:#4597E3;font-weight:bold;'>提交合同</span>";
			case 5 :
			return "<span style='color:#2D61B5;font-weight:bold;'>已经生成合同</span>";
			case 6 :
			return "<span style='color:#088A85;font-weight:bold;'>提交订货</span>";
			case 7 :
			return "<span style='color:#DF7401;font-weight:bold;'>已转正式报价</span>";
			default : 
			return ""
		}
	},
	
	changeLevel : function(value) {
		switch(value) {
			case 0 :
			return "<span style='color:#2D61B5;font-weight:bold;'>一般</span>";
			case 1 : 
			return "<span style='color:red;font-weight:bold;'>紧急</span>";
		}
	},
	changeOrderExpected : function(value) {
		switch(value) {
			case 0 : 
			return "<span style='color:#990000;font-weight:bold;'>否</span>";
			case 1 : 
			return "<span style='color:#339933;font-weight:bold;'>是</span>";
		}
	},
	
	renderDetail : function(quoId) {
		return '<a href=javascript:Ext.ftl.generalQuo.onDetailClick(\'' + quoId + '\')>查看</a>'
		
	}
})

Ext.ftl.generalQuo.QuoGridView = Ext.extend(Ext.grid.GridView, {
	constructor : function() {
		Ext.ftl.generalQuo.QuoGridView.superclass.constructor.call(this, {
			//forceFit:true,
            //autoFill :true,
            deferEmptyText : true,
            emptyText : '暂无数据！'
		})
	}
})

Ext.ftl.generalQuo.QuoGrid = Ext.extend(Ext.grid.GridPanel, {
	store : null,
	sm : null,
	cm : null,
	loadMask :true,
	quoType : null,
	isAddHide : true,isModifyHide : true,isDelHide : true,isSubmitHide : true,
	isContractHide : true, isDetailHide : true, isToExcelHide : true,isCopyHide : true,
	isWillOrderHide : true,isUploadHide : true,isExportQuoHide : true,
	isTestCutReviewHide : true,isTestCutReportHide : true, exportListHide : true,
	searchRecord : null,
	pageBar : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.store = new Ext.ftl.generalQuo.QuoGridStore({quoType : this.quoType});
		this.sm = new Ext.grid.CheckboxSelectionModel();//复选框
		this.cm = new Ext.ftl.generalQuo.QuoGridColumn({sm : this.sm, quoType : this.quoType});
		this.pageBar =  new Ext.PagingToolbar({
					pageSize : PAGESIZE,
					emptyMsg: "没有记录",
					displayInfo: true,
	        		displayMsg: '显示第 {0} - {1} 条 共 {2} 条',
					store : this.store
			});
		
		if(this.quoType == 3 || this.quoType == 4) {
			this.isContractHide = true;
		}
		
		var addButtonLabel  = "新增报价单";
		var modifyButtonLabel = "修改报价单";
		var copyButtonLabel = "复制报价单";
		var delButtonLabel = "删除报价单";
		var exportListLabel = "导出报价单列表";
		if(this.quoType == 3) {
			addButtonLabel = "新增预订";
			modifyButtonLabel = "修改预订";
			copyButtonLabel = "复制预订";
			delButtonLabel = "删除预订";
			exportListLabel = "导出预订报价单列表";
		} else if(this.quoType == 4) {
			addButtonLabel = "新增试刀申请"
			modifyButtonLabel = "修改试刀申请";
			copyButtonLabel = "复制试刀申请";
			delButtonLabel = "删除试刀申请";
			exportListLabel = "导出试刀申请列表";
		}
			
		Ext.ftl.generalQuo.QuoGrid.superclass.constructor.call(this, {
			store : this.store,
			sm : this.sm,
			cm : this.cm,
			bodyStyle:'width:100%',
			height : 400,
			//autoHeight : true,
			enableHdMenu : true,
			border : false,
			stripeRows : true,
	        view : new Ext.ftl.generalQuo.QuoGridView(),
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : false,
				listeners : {
					"rowselect" : function(_sm, _index, _r) {
						//selectinfo(_sm, _index, _r);
					}
				}
	
			}),
			bbar : this.pageBar,
			tbar : [{
				text : addButtonLabel,
				iconCls : 'icon-add',
				hidden : this.isAddHide,
				handler : function() {
					fn : this.onAddSubmit();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isDetailHide
			},{
				text : '查看详细',
				hidden : this.isDetailHide,
				iconCls : 'icon-detail',
				handler : function() {
					fn : this.onDetailClick();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isModifyHide
			},{
				text : modifyButtonLabel,
				hidden : this.isModifyHide,
				iconCls : 'icon-modify',
				handler : function() {
					fn : this.onModifySubmit();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isCopyHide
			},{
				text : copyButtonLabel,
				hidden : this.isCopyHide,
				iconCls : 'icon-add',
				handler : function() {
					fn : this.onCopySubmit();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isDelHide
			},{
				text : delButtonLabel,
				iconCls : 'icon-delete',
				hidden : this.isDelHide,
				handler : function() {
					fn : this.onDeleteSubmit();
				},
				scope : this
			},/*{
				xtype:'tbseparator',
				hidden : this.isSubmitHide
			},{
				text : '提交审批',
				hidden : this.isSubmitHide,
				iconCls : 'icon-submit',
				handler : function() {
					fn : this.onSubmitAudit();
				},
				scope : this
			},*/{
				xtype:'tbseparator',
				hidden : this.isWillOrderHide
			},{
				text : '提交订货',
				hidden : this.isWillOrderHide,
				iconCls : 'icon-submit',
				handler : function() {
					fn : this.onSubmitOrderExpected();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isContractHide
			},{
				text : '提交合同',
				hidden : this.isContractHide,
				iconCls : 'icon-submit',
				handler : function() {
					fn : this.onSubmitContract();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isToExcelHide
			}, {
				text : '导出Excel',
				hidden : this.isToExcelHide,
				iconCls : 'icon-excel',
				handler : function() {
					fn : this.onExcelClick();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isUploadHide
			}, {
				text : '附件上传',
				hidden : this.isUploadHide,
				iconCls : 'icon-submit',
				handler : function() {
					fn : this.onSlaveClick(5);
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isTestCutReviewHide
			}, {
				text : '试刀申请上传',
				hidden : this.isTestCutReviewHide,
				iconCls : 'icon-submit',
				handler : function() {
					fn : this.onSlaveClick(10);
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isTestCutReportHide
			}, {
				text : '试刀报告上传',
				hidden : this.isTestCutReportHide,
				iconCls : 'icon-submit',
				handler : function() {
					fn : this.onSlaveClick(11);
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.isExportQuoHide
			}, {
				text : '导出预订',
				hidden : this.isExportQuoHide,
				iconCls : 'icon-submit',
				handler : function() {
					fn : this.onExportClick();
				},
				scope : this
			},{
				xtype:'tbseparator',
				hidden : this.exportListHide
			},{
				text:exportListLabel,
				hidden : this.exportListHide,
				iconCls:'icon-excel',
				listeners: {
					'click' : function(){	
						var _searchStr = Ext.util.JSON.encode(this.searchRecord);
						window.open(PATH + '/generalQuo/excelAction.do?method=quoListToExcel&quotationType=' + this.quoType + '&searchStr=' + _searchStr);
					},scope : this
		 		}
			}],
			listeners : {
				'render' : function() {
					var _store = this.getStore();
					_store.on({
						'beforeload' : function() {
							if(this.searchRecord != null) {
								_store.baseParams = this.searchRecord.data;
							}
						},scope : this
					})
				}
			}
		})
	},
	
	onTriggerModify : function(_modal) {
		return this.onModifySubmit(_modal);
	},
	
	//导出预订报价单->普通(项目)报价单
	onExportClick : function() {
		try {
			var selNode = this.getSelected();
			if(selNode.data['status'] == 7) {
				Ext.Msg.show({
					title : '信息提示',
					msg : "已经转过正式报价！",
					width : 260,
					buttons : Ext.Msg.OK,
					icon : Ext.MessageBox.INFO
				});
			} /*else if (selNode.data['status'] == 0) {
				Ext.Msg.show({
					title : '信息提示',
					msg : "编制状态报价单不允许导出！",
					width : 260,
					buttons : Ext.Msg.OK,
					icon : Ext.MessageBox.INFO
				});
			
			} */else {
				var exportWindow = new Export.QuoListWindow({quoRecord : selNode});
				exportWindow.on({
					'onsubmitsuccess' : function() {
						this.reload();
					},scope : this
				})
				exportWindow.show();
			}
		} catch(_err) {
			Ext.Msg.show({
				title : '信息提示',
				msg : _err.message,
				width : 260,
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.INFO
			});
		}
	},
	
	//附件管理
	onSlaveClick : function(_busType) {
		try {
			if(this.getSelections().length > 1) {
				Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
				return;
			}
			var selNode = this.getSelected();
			var slaveWindow = new Slave.SlaveManageWindow({busId : selNode.id, busType : _busType});
			slaveWindow.listPanel.upWindow.swfUploadPanel.on('allUploadsComplete', function() { 
				this.reload();
			},this);
			slaveWindow.show();
		} catch(_err) {
			Ext.Msg.show({
				title : '信息提示',
				msg : _err.message,
				width : 260,
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.INFO
			});
		}
	},
	
	/**
	 * 获取所选取的记录。如果没有选择，抛出一个异常。
	 * @return {} Record
	 */
	getSelected : function() {
		var _sm = this.getSelectionModel();
		
		if(!_sm.hasSelection()) {
			throw Error('请选择一条记录进行操作！');
		} else {
			return _sm.getSelected();
		}
	},
	
	getSelections : function() {
		var _sm = this.getSelectionModel();
		
		if(_sm.getCount() == 0) {
			throw Error('请选择一条记录进行操作！');
		} else {
			return _sm.getSelections();
		}
	},
	
	remove : function() {
		try {
			var _record = this.getSelected();
			this.getStore().remove(_record);
		}catch(_err) {
			Ext.Msg.show({
				title : '信息提示',
				msg : _err.description,// == null ? '请选择到货单再进行操作！' : _err.description,
				width : 260,
				buttons : Ext.Msg.OK,
				icon : Ext.MessageBox.INFO
			});
		}
		
	},
	
	removeRecord : function(_record) {
		this.getStore().remove(_record);
	},
	
	removeRecords : function(_arr) {
		for(var i = 0; i < _arr.length; i++) {
			this.removeRecord(this.getStore().getById(_arr[i].get("id")));
		}
	},
	
	arry2Json : function(_arr) {
		var str = "[";
		for(var i = 0; i < _arr.length; i++) {
			str += "{ id : '" + _arr[i].get("id") + "', quotationType : '" + _arr[i].get("quotationType") + "'}";
					
			if(i == _arr.length-1) {
				break;
			} else {
				str += ","
			}
		}
		str += "]"
		return str;
	},
	
	/**
	 * 重新载入表单数据
	 */
	reload : function() {
		this.getStore().reload();
	},
	
	/**
	 * 为搜索条件设值
	 * @param {} _value
	 */
	setSearchStr : function(_value) {
		this.searchRecord = _value;
	},
	
	onAddSubmit : function() {
		this.handlerAdd();
	},
	
	onModifySubmit : function(_modal) {
		var _sm = this.getSelectionModel();
		if(!_sm.hasSelection() || _sm.getCount() > 1) {
			Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
		} else {
			var status = this.getSelected().get('status');
			if(status == 5 || status == 1) {
				Ext.Msg.show({
					title:'错误提示',
					msg: "该状态报价单，不允许修改!",
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.ERROR
				});
				return;
			}
			
			if(Ext.isEmpty(_modal))
				_modal = true;
			return this.handlerModify(_modal);
		}
	},
	
	onCopySubmit : function() {
		var _sm = this.getSelectionModel();
		if(!_sm.hasSelection() || _sm.getCount() > 1) {
			Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
		} else {
			this.handlerCopy();
		}
	},
	
	onDeleteSubmit : function() {
		var _sm = this.getSelectionModel();
		if(!_sm.hasSelection()) {
			Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
		} else {
			var delArray = this.getSelections();
			for(var i = 0; i < delArray.length; i++) {
				if(delArray[i].get('status') != 0) {
					Ext.Msg.show({
						title:'错误提示',
						msg: "请只选择编制状态的报价单信息进行删除!",
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.ERROR
					});
					return;
				}
			}
			Ext.MessageBox.confirm('信息提示', '确定删除此记录吗?' , this.handlerDelete, this);
		}
	},
	
	onSubmitAudit : function() {
		var _sm = this.getSelectionModel();
		if(!_sm.hasSelection()) {
			Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
		} else {
			
			var array = this.getSelections();
			if (array.length > 0) {
				for(var i = 0; i < array.length; i++) {
					var status = array[i].get('status');
					if(status != 0 && status != 3) {
						Ext.Msg.show({
							title:'错误提示',
							msg: "请只提交编制或退回状态的报价单信息进行评审!",
							width : 300,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.ERROR
						});
						return;
					}
				}
				Ext.Msg.confirm('信息提示', '确定提交审批吗?', this.handlerSubmitAudit, this);
			}
			
		}
	},
	
	onSubmitOrderExpected : function() {
		var _sm = this.getSelectionModel();
		if(!_sm.hasSelection() || _sm.getCount() > 1) {
			Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
		} else {
			var array = this.getSelections();
			if (array.length > 0) {
				for(var i = 0; i < array.length; i++) {
					var status = array[i].get('status');
					var willOrderExpected = array[i].get('willOrderExpected');
					if(status != 0) {
						Ext.Msg.show({
							title:'错误提示',
							msg: "请只选择状态为编制的报价单!",
							width : 300,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.ERROR
						});
						return;
					}
				}
				Ext.Msg.confirm('信息提示', '确定提交预订吗?', this.handlerSubmitOrderExpected, this);
			}
			
		}
	},
	
	onSubmitContract : function() {
		var _sm = this.getSelectionModel();
		if(_sm.getCount() == 0 || _sm.getCount() > 1) {
			Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
		} else {
			
			var array = this.getSelections();
			if (array.length > 0) {
				for(var i = 0; i < array.length; i++) {
					var status = array[i].get('status');
					if(status != 0) {
						Ext.Msg.show({
							title:'错误提示',
							msg: "请只提交编制状态的报价单信息!",
							width : 300,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.ERROR
						});
						return;
					}
				}
				Ext.Msg.confirm('信息提示', '确定提交合同吗?', this.handlerSubmitContract, this);
			}
			
		}
	},
	
	onDetailClick : function() {
		var _sm = this.getSelectionModel();
		if(!_sm.hasSelection() || _sm.getCount() > 1) {
			Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
		} else {
			var selRecord = this.getSelected();
			Ext.ftl.generalQuo.onDetailClick(selRecord.id, this.quoType);
		}
	},
	
	onExcelClick : function() {
		try {
			if(this.getSelections().length > 1) {
				Ext.MessageBox.alert('错误提示', '请选择一条记录进行操作！');
				return;
			}
			var quoId = this.getSelected().get('id');
			var status = this.getSelected().get('status');
			//alert(this.quoType);
			window.open(PATH + '/generalQuo/excelAction.do?method=toExcel&quoId=' + quoId);
		} catch(_e) {
			Ext.MessageBox.alert('错误提示', _e.message);
		}
	},
	
	handlerAdd : function() {
		var _window = new Customer.CustomerWindow({quoType : this.quoType});
		_window.grid.getStore().load({params : {start : 0, limit : PAGESIZE}});
		_window.show();
		_window.on('onsubsuccess', function() {
			this.reload();
		},this)
	},
	
	handlerModify : function(_modal) {
		var record = null;
		var _customerCode = "";
		var _copyRecord = null;
		try {
			record = this.getSelected();
			_copyRecord = record.copy();
			var _cusCode = record.get("customerCode");
			var _customerCode = record.get("customerCode") + "-" + record.get("customerName");
			_copyRecord.set("customerCode", _customerCode);
			
			//根据用户编号获取用户ID
			Ext.Ajax.request({
				url: PATH + '/generalQuo/getCusByCuscodeAction.do',
				params: { customerCode: _cusCode },
				success : function(response) {
					var responseArray = Ext.util.JSON.decode(response.responseText); 
					if(responseArray.success == true){
						Ext.apply(_copyRecord.data, {customerId : responseArray.customerId});
					} else {
								
					} 
				}
			});
			
		} catch(e) {
			Ext.Msg.show({
				title:'信息提示',
				msg: e.description,
				buttons: Ext.Msg.OK,
				width : 200,
				icon: Ext.MessageBox.INFO
			});
		}
		
		var modifyWindow = new Quomanager.ModifyWindow({
			customerRecord : _copyRecord,
			modal : _modal,
			quoType : this.quoType == -1 ? 0 : this.quoType// quoType为-1 表示为导出预订报价单到普通报价单，quoType为0.
		});
		//modifyWindow.centerPanel.productTree.getLoader().baseParams.quoId = record.get('id');
modifyWindow._grid.store.baseParams.quoId = record.get('id');
		modifyWindow.show();
		modifyWindow.on('onsubmitsuccess', function() {
			this.reload();
		},this);
		//alert(Ext.encode(_copyRecord.data));
		//modifyWindow.northPanel.quotationForm.setValues(_copyRecord);
		
		//加载报价单信息
		var _form = modifyWindow.northPanel.quotationForm;
		
		Ext.Ajax.request({
			url: PATH + '/generalQuo/getQuoAction.do',
			params: { quoId: record.get('id') },
			success : function(response) {
				var responseArray = Ext.util.JSON.decode(response.responseText);
				if(responseArray.success == true){
					_form.setValues(new Ext.data.Record(responseArray.data));
				}
			}
		});
		
		return modifyWindow;
	},
	
	handlerCopy : function() {
		var record = null;
		record = this.getSelected();
		_copyRecord = record.copy();
		var _cusCode = record.get("customerCode");
		var _customerCode = record.get("customerCode") + "-" + record.get("customerName");
		_copyRecord.set("customerCode", _customerCode);
		
		var _window = new Customer.CustomerWindow({isCopy : true, quoRecord : record, quoType : this.quoType});
		_window.grid.getStore().load({params : {start : 0, limit : PAGESIZE}});
		_window.show();
		_window.on('onsubsuccess', function() {
			this.reload();
		},this)
	},
	
	handlerDelete : function(_btn) {
		if(_btn == 'yes') {
			var arr = null;
			try {
				arr = this.getSelections();
				
				//copy数组，将非编制状态的数据从原数组中删除。
				var arrCopy = arr.concat();
				for(var i = 0; i < arrCopy.length; i++) {
					if(arrCopy[i].get('status') != 0 && arrCopy[i].get('status') != 3) {
						arr.remove(arrCopy[i]);
					}
				}
				
				var paramStr = "";
				if(arr.length > 0) {
					paramStr = this.arry2Json(arr);
				}
			} catch(_err) {
				Ext.MessageBox.alert('错误提示', _err.description);
			}
			//发送删除请求
			if(arr.length > 0) {
				Ext.Ajax.request({
					url: PATH + '/generalQuo/deleteQuoAction.do',
					params: { id: paramStr },
					success : function(response) {
						var responseArray = Ext.util.JSON.decode(response.responseText); 
												   	
						if(responseArray.success == true){
							Ext.Msg.show({
								title:'成功提示',
								msg: responseArray.msg,
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.INFO
							});
							this.removeRecords(arr);
						} else {
							Ext.Msg.show({
								title:'错误提示',
								msg: responseArray.msg,
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.ERROR
							});
						} 
					},scope : this
				});
			}
		}
	},
	
	handlerSubmitAudit : function(_btn) {
		if(_btn == "yes") {
			var array = null;
			try {
				array = this.getSelections();
				var paramStr = "";
				if(array.length > 0) {
					paramStr = this.arry2Json(array);
				}
				//alert(paramStr);return;
				Ext.Ajax.request({
					url: PATH + '/generalQuo/submitAuditAction.do',
					params: { quoId: paramStr },
					success : function(response) {
					if(response.responseText != "" && response.responseText != null){
						Ext.Msg.show({
							title:'错误提示',
							msg: response.responseText,
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.ERROR
						});
					} else {
						Ext.Msg.show({
							title:'成功提示',
							msg: '提交审批成功！',
							buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.INFO
							});
							this.getStore().reload();
							Ext.ffc.sendMsg2Server();//向服务器发送消息，进行广播
						} 
					},scope : this
				});
								
			} catch(e) {
				Ext.MessageBox.alert('错误提示', e.description);
			}
		}
	},
	
	handlerSubmitOrderExpected : function(_btn) {
		if(_btn == 'yes') {
			var array = null;
			try {
				array = this.getSelections();
				var paramStr = "";
				if(array.length > 0) {
					paramStr = this.arry2Json(array);
				}
				//alert(paramStr);
				
				Ext.Ajax.request({
					url: PATH + '/generalQuo/excelAction.do?method=getOrderPrice4Quo' ,
					params: { quoId: array[0].get("id") },
					success : function(response) {
						//var responseArray = Ext.util.JSON.decode(response.responseText);
						if(response.responseText.length == 0) {
							
							Ext.Ajax.request({
								url: PATH + '/generalQuo/submitOrderExpectedAction.do?method=updateQuotationStatus',
								params: { quoId: paramStr },
								success : function(response) {
								if(response.responseText != "" && response.responseText != null){
									Ext.Msg.show({
										title:'错误提示',
										msg: response.responseText,
										buttons: Ext.Msg.OK,
										icon: Ext.MessageBox.ERROR
									});
								} else {
									Ext.Msg.show({
										title:'成功提示',
										msg: '提交预订成功！',
										buttons: Ext.Msg.OK,
											icon: Ext.MessageBox.INFO
										});
										this.getStore().reload();
										Ext.ffc.sendMsg2Server();//向服务器发送消息，进行广播
									} 
								},scope : this
							});
						} else {
							Ext.Msg.show({
								title:'净价低于采购价格产品：',
								msg: response.responseText,
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.INFO,
								width : 500
							});
						}
					},scope : this
				});
								
			} catch(e) {
				Ext.MessageBox.alert('错误提示', e.message);
			}
		}
	},
	
	handlerSubmitContract : function(_btn) {
		if (_btn == "yes") {
			var array = null;
			try {
				array = this.getSelections();
				var paramStr = "";
				if (array.length > 0) {
					for(var i = 0; i < array.length; i++) {
						if(array[i].get('status') != 0) {
							Ext.MessageBox.alert('错误提示', '请只选择编制状态的记录！');
							return;
						}
						
					}
					paramStr = this.arry2Json(array);
				}
				
				Ext.Ajax.request({
					url: PATH + '/generalQuo/excelAction.do?method=getOrderPrice4Quo' ,
					params: { quoId: array[0].get("id") },
					success : function(response) {
						//var responseArray = Ext.util.JSON.decode(response.responseText);
						if(response.responseText.length == 0) {
							Ext.Ajax.request({
								url : PATH + '/generalQuo/submitContractAction.do',
								params : {
									quoId : paramStr
								},
								success : function(response) {
									if (response.responseText != ""
											&& response.responseText != null) {
										Ext.Msg.show({
											title : '错误提示',
											msg : response.responseText,
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.ERROR
										});
									} else {
										Ext.Msg.show({
											title : '成功提示',
											msg : '提交合同成功！',
											buttons : Ext.Msg.OK,
											icon : Ext.MessageBox.INFO
										});
										this.getStore().reload();
										Ext.ffc.sendMsg2Server();//向服务器发送消息，进行广播
									}
								},scope : this
							});
							
						} else {
							Ext.Msg.show({
								title:'净价低于采购价格产品：',
								msg: response.responseText,
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.INFO,
								width : 500
							});
						}
					},scope : this
				});

			} catch (e) {
				Ext.MessageBox.alert('错误提示', e.message);
			}
		}
	}
})

Ext.ftl.generalQuo.QuoIndexPanel = Ext.extend(Ext.Panel, {
	northPanel : null,
	centerPanel : null,
	quoType : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		//alert(this.getModule(LoginInfor.modules, '003001'));
		
		this.northPanel = new Ext.ftl.generalQuo.SearchFormPanel({quoType : this.quoType});
		var _config = this.getConfig();
		Ext.apply(_config, {quoType : this.quoType});
		this.centerPanel = new Ext.ftl.generalQuo.QuoGrid(_config);
		//this.centerPanel.quoType = this.quoType;
		
		Ext.ftl.generalQuo.QuoIndexPanel.superclass.constructor.call(this, {
			width : Ext.getBody().getWidth(),
        	height : Ext.getBody().getHeight()-50,
        	//bodyStyle:'width:100%',
            layout: 'border',
            listeners : {
            	'render' : function() {
            		var _grid = this.centerPanel;
            		//监听生成合同事件
            		EventMger.on("createdContractEvent",function(){
            			var _store = _grid.getStore();
						_store.load({params : {start : 0, limit : PAGESIZE}});
            		});
            		//监听搜索事件。
					this.northPanel.on({
						'search' : function(_form, _values, isPost) {
							_grid.setSearchStr(_values);
							if(isPost) {
								_grid.getStore().load({params : {start : 0, limit : PAGESIZE}});
							}
						},
						scope : this
					});
					
            	}
            },
            items: [
            {
                region: 'north',
                iconCls:'icon-grid',
                title: this.quoType == 4 ? '试刀搜索' : '报价搜索',
                split: true,
                width: 1000,
                height : 130,
                layout : 'fit',
                minSize: 165,
                maxSize: 130,
                collapsible: true,
                margins: '5 5 5 5',
                items : [this.northPanel]
                
            }, {
                region: 'center',
                split: true,
                height: 100,
                minSize: 100,
                layout : 'fit',
                maxSize: 200,
                collapsible: true,
                //title: 'South',
                margins: '-5 5 5 5',
                items : [this.centerPanel]
            }]
		})
	},
	
	getModule : function(modules, moduleId) {
		var _module = null;
		
		for(var i = 0; i < modules.length; i++) {
			var module = modules[i];
			if(moduleId != module.id) {
				this.getModule(module.children, moduleId);
			} else {
				var _configStr = "{";
				//alert("moduleName = " + module.moduleName)
				//alert("length = " + module.children.length);
				_module = module.children;
				
				for(var i = 0; i < _module.length; i++) {
					if(i != _module.length-1)
						_configStr += _module[i].url + ",";
					else 
						_configStr += _module[i].url + "}"
				}
				//alert(_configStr);
				return Ext.decode(_configStr);
			}
		}
		//alert(_configStr)
		//return _module;
	},
	
	getConfig : function() {
		var moduleId = "";
		if(this.quoType == 0) {
			moduleId = "003001";//普通报价
		} else if(this.quoType == 3) {
			moduleId = "003003";//预订报价
		} else if(this.quoType==4) {
			moduleId = "003004";//试刀报价
		}
		
		var modules = LoginInfor.modules
		var _configStr = "{";
		for(var i = 0; i < modules.length; i++) {
			var module = modules[i];
			if("003" == module.id) {
				var childModule = module.children;
				for(var j = 0; j < childModule.length; j++) {
					if(moduleId == childModule[j].id) {
						var _configArr = childModule[j].children;
						if(_configArr.length > 0) { 
							for(var k = 0; k < _configArr.length; k++) {
								if(k != _configArr.length-1)
									_configStr += _configArr[k].url + ",";
								else 
									_configStr += _configArr[k].url + "}"
							}
						} else {
							_configStr += "}"
						}
						break;
					}
				}
				
				break;
			}
		}
		//alert(_configStr);
		return Ext.decode(_configStr);
	}
})