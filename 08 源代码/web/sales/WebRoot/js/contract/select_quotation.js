Ext.ffc.select_quotations = function (callBackMethod){

//搜索条件 start
var statusCombox = new StatusCombox();
	statusCombox.setValue("提交合同");
	statusCombox.disabled = true;
var	searchForm = new Ext.FormPanel({
		width : 1000,
        labelAlign:'left',buttonAlign:'right',bodyStyle:'padding:5px;', border : false,
        frame:true,labelWidth:70,monitorValid:false,
        items:[
           {layout:'column',border:false,labelSeparator:':',frame : true,
           defaults:{layout: 'form',border:false,columnWidth:.3},
           bbar : ['->',{
		           		text : "搜  索",
		           		iconCls:'icon-search',
		           		handler : function() {
							var obj2 = searchForm.getForm().getValues();
								obj2['status'] = 4;
								obj2['editorName'] = '';
								obj2['userName'] = '';
							var seachParams = {start : 0, limit : 10,searchStr:Ext.encode({data:obj2})};
							for(var i in seachParams){
									grid.getStore().setBaseParam(i, seachParams[i]);
							}
							grid.getStore().load();
		           		}
	           		},'-',
					{  
						text:'重置'  
						,iconCls:'icon-reset',
						listeners : {
							'click' : function(){
								searchForm.getForm().reset();
							},scope : this
						}					
					}],
           items:[
              {items: [{xtype:'textfield',fieldLabel: '报价单号',name: 'quotationCode',anchor:'90%'}]},
			  {items: [{xtype:'textfield',fieldLabel: '客户',name: 'customerName',anchor:'90%'}]},
              {items: [statusCombox]},
              {items: [{xtype : 'datefield', fieldLabel: '日期起',name: 'beginDate', format:'Y-m-d',emptyText:'',anchor:'90%'}]},
              {items: [{xtype : 'datefield',fieldLabel: '至',name: 'endDate', format:'Y-m-d',emptyText:'',labelSeparator:'',anchor:'90%'}]}
           ]//items
          }
        ],//items
		listeners : {
			'render': function(p) {
				p.getEl().on('keypress', function(){
					if(window.event.keyCode == 13){
						var bts = p.getBottomToolbar().items;
						for(var i = 0,len = bts.length; i < len;i++ ){
							var t = bts.get(i);
							if(t && t.text == '搜  索'){
								t.handler();
							}
						}
					}
				});
			}
		}
   })//FormPanel 
//搜索条件 end
Ext.BLANK_IMAGE_URL = PATH + '/extjs/resources/images/default/s.gif';
	var sm = new Ext.grid.CheckboxSelectionModel();//复选框
	// 定义一个ColumnModel
	var cm = new Ext.grid.ColumnModel([new Ext.grid.RowNumberer(), sm,{
		header : '报价单类型',
		width:80,
		dataIndex : 'quotationType',
		renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
				var arr = [[0,'普通报价'],
				[1,'项目报价'],
				[2,'零星报价']];
				for(var i = 0;i < arr.length ;i++){
					if(value == arr[i][0]){
						return arr[i][1];
					}
				}
				return value;
		}
	},{
		header : '报价单号',
		width:180,
		dataIndex : 'quotationCode'
	}, {
		header : '客户名称',
		width:150,
		dataIndex : 'customerName'
	},{
		header : '卖方',
		width:60,
		dataIndex : 'sellerName'
	},{
		header : '制单人',
	    width:60,
		dataIndex : 'editorName'
	},{
		header : '报价日期',
		width:80,
		dataIndex : 'quotationDate'
	},{
		header : '交货方式',
		width:100,
		dataIndex : 'deliveryType'
	},{
		header : '币别',
		width:60,
		dataIndex : 'currencyName'
	},{
		header : '货品金额',
		width:100,
		dataIndex : 'productMoney'
	},{
		header : '税率',
		width:50,
		dataIndex : 'taxRate'
	},{
		header : '税金',
		width:100,
		dataIndex : 'taxMoney'
	},{
		header : '税价合计',
		width:100,
		dataIndex : 'totalMoney'
	},{
		header : '付款条件',
		width:100,
		dataIndex : 'paymentCondition'
	},{
		header : '备注',
		width:100,
		dataIndex : 'memo'
	},{
		header : 'ID',
		hidden : true,
		dataIndex : 'id'
	},{
		header : '客户联系人',
		hidden : true,
		dataIndex : 'cusContactPerson'
	},{
		header : '客户编号',
		hidden : true,
		dataIndex : 'customerCode'
	}]);
	
	/**
	 * DS报价单数据源，使用HttpProxy从服务器取得数据，用JsonReader解析
	 */
	var ds = new Ext.data.JsonStore({
		url : PATH + '/generalQuo/listAction.do?quotationType=-1',
		root : 'quoList',
		totalProperty : 'totalProperty',
		//autoLoad : true,
		fields : ['quotationCode', 'customerName', 'editorName', 'quotationDate', 'deliveryType', 'currencyName', 'productMoney', 'taxRate',
				 	'taxMoney','totalMoney', 'paymentCondition', 'memo', 'id','cusContactPerson','customerCode','sellerName','quotationType']
	});

	var gv = new Ext.grid.GridView({
        	//forceFit:true,
            //autoFill :true,
            deferEmptyText : false,
            emptyText : '无报价信息！'
        });
var grid = new Ext.grid.GridPanel({
	    width : 1000,
		bodyStyle:'width:100%',
		height : 300,
		//autoHeight : true,
		enableHdMenu : false,
		border : false,
		stripeRows : true,
		//el : 'quogrid',
        view : gv,
		ds : ds,
		cm : cm,
		sm:sm,
		bbar : new Ext.PagingToolbar({
				pageSize : 10,
				emptyMsg: "没有记录",
				displayInfo: true,
        		displayMsg: '显示第 {0} - {1} 条 共 {2} 条',
				store : ds
			})
});

    var select_quotations_win = new Ext.Window({
            layout: 'border',
			title: '参照报价单',
			width : Ext.getBody().getWidth(),
			height:495,
			maximizable :true,
			modal : true,
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
				layout:'fit',
                //contentEl: 'south',
                split: true,
                width: 200,
                height : 120,
                minSize: 140,
                maxSize: 300,
                collapsible: true,
                margins: '5 5 5 5',
                items : [searchForm]
                
            }, {
                region: 'center',
				layout:'fit',
                //contentEl: 'quogrid',
                split: true,
                height: 100,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                //title: 'South',
                margins: '-5 5 5 5',
                items : [grid]
            }],
			buttons: [{
				text : "确  定",
				handler : function(obj) {
					//currencyName,customerCode,taxRate,sellerName
					var arr = sm.getSelections();
					if(arr.length == 0){
						Ext.Msg.alert("消息", "请选择报价单!");
						return ;
					}
					callBackMethod(arr,select_quotations_win);
					
				}
	         },{
				text : "取  消",
				handler : function() {
					
					select_quotations_win.close();
				}
	         }]
        });
		select_quotations_win.show(this);

		var obj2 = searchForm.getForm().getValues();
			obj2['status'] = 4;
			obj2['editorName'] = '';
			obj2['userName'] = '';
			
		var seachParams = {start : 0, limit : 10,searchStr:Ext.encode({data:obj2})};
		for(var i in seachParams){
				grid.getStore().setBaseParam(i, seachParams[i]);
		}
		grid.getStore().load();
}


