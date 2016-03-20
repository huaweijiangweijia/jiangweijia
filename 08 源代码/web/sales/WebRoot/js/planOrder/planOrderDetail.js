var pODetailTree =  Ext.extend(Ext.grid.GridPanel,{
		store:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			var proxy = new Ext.data.HttpProxy({url: PATH + "/planOrder/orderDetailsList.do"});
			var Bill = Ext.data.Record.create([
											{name: 'brandCode', type: 'string',mapping:"brandCode"},
											{name: 'productName', type: 'string',mapping:"productName"},
											{name: 'productBrand', type: 'string',mapping:"productBrand"},
											{name: 'productCode', type: 'string',mapping:"productCode"},
											{name: 'orderAmount', type: 'string',mapping:"orderAmount"},
											{name: 'productUnit' , type: 'string',mapping:"productUnit"},
											{name: 'price', type: 'string',mapping:"price"},
											{name: 'productMoney', type: 'int',mapping:"productMoney"},
											{name: 'deliveryDate', type: 'string',mapping:"deliveryDate"}
											]);
			var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
			this.store = new Ext.data.Store({
				proxy: proxy,
				reader: reader
			});
			pODetailTree.superclass.constructor.call(this, {
				height:345,
				width:850,
				store:this.store,
				columns:[
					 new Ext.grid.RowNumberer(),
					{
						header:'牌号',
						width:190,
						dataIndex:'brandCode'
					},{
						header:'名称',
						width:120,
						dataIndex:'productName'
					},{
						header:'品牌',
						width:80,
						dataIndex:'productBrand'
					},{
						header:'货品编号',
						width:120,
						dataIndex:'productCode'
					},{
						header:'采购数量',
						width:70,
						dataIndex:'orderAmount'
					},{
						header:'计量单位',
						width:60,
						dataIndex:'productUnit'
					},{
						header:'单价',
						width:80,
						dataIndex:'price'
					},{
						header:'货品金额',
						width:80,
						dataIndex:'productMoney'
					},{
						header:'交货日期',
						width:120,
						dataIndex:'deliveryDate',
						renderer: function(value){
							if(value.length == undefined)
							{
								return '<span>'+Ext.util.Format.date(value,'Y-m-d')+'<span>';
							}
							else if(value.length>10)
							{
								return '<span>'+value.substring(0,10)+'<span>';
							}
							else
								return '<span>'+value+'<span>';
						}
					}
				],    
				bbar: new Ext.PagingToolbar({
					store: this.store,
					pageSize:15,
					displayInfo: true,
					displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
					emptyMsg: "<i>没有数据</i>"
				})
			})
		}
	})


	 var pODetailGrid = Ext.extend(Ext.FormPanel,{
		orderId:null,
		isReadOnly:false,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.status = new StatusCombox({disabled:true,x:100,y:93,width:170});
			this.lableStyle_ = "font-size:9pt;text-align:right;width:100px";
				var config = [
				//
					{xtype:'label',text: '订单编号:',x:0,y:5,style:this.lableStyle_},
					{xtype:'textfield', readOnly : true, x:100,y:3, width:170,name: 'orderCode'},
					{xtype:'label',text: '供应商:',x:250,y:5,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierName',readOnly : true,x:350,y:3,width:170},
					{xtype:'label',text: '卖方名称:',x:530,y:5,style:this.lableStyle_},
					{xtype:'textfield',  name: 'companyName',readOnly : true,x:630,y:2,width:170},
					{xtype:'label',text: '货品金额:',x:800,y:5,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'productMoney',readOnly : true,x:900,y:3,width:170},
					//2
					{xtype:'label',text: '订货日期:',x:0,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'orderDate',x:100,y:30, width:170},
					{xtype:'label',text: '供应商负责人:',x:250,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierContactPerson',readOnly : true,x:350,y:33,width:170},
					{xtype:'label',text: '供应商我方负责人:',x:530,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierOwnContactPerson',readOnly : true,x:630,y:33,width:170},
					{xtype:'label',text: '税  率:',x:800,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'taxRate',readOnly : true,x:900,y:33,width:170},
					//3
					{xtype:'label',text: '紧急程度:',x:0,y:65,style:this.lableStyle_},
					new Ext.ffc.UrgentLevelCombox({x:100,y:62, width:170,disabled : true}),
					{xtype:'label',text: '供应商电话:',x:250,y:65,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierPhone',readOnly : true,x:350,y:63,width:170},
					{xtype:'label',text: '制 单 人:',x:530,y:65,style:this.lableStyle_},
					{xtype:'textfield', name: 'userName',value:LoginInfor.user.userName,readOnly : true,x:630,y:63,width:170},
					{xtype:'label',text: '税　　金:',x:800,y:65,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'taxMoney',readOnly : true,x:900,y:63,width:170},
					//4
					{xtype:'label',text: '订单状态:',x:0,y:95,style:this.lableStyle_},
					this.status,
					{xtype:'label',text: '供应商传真:',x:250,y:95,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierFax',readOnly : true,x:350,y:93,width:170},
					{xtype:'label',text: '币　别:',x:530,y:95,style:this.lableStyle_},
					{xtype:'textfield',  name: 'currencyName',readOnly : true,x:630,y:90,width:170},
					{xtype:'label',text: '税价合计:',x:800,y:95,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'totalMoney',readOnly : true,x:900,y:93,width:170},
					//5
					{xtype:'label',text: '质量标准:',x:0,y:125,style:this.lableStyle_},
					{xtype:'textfield',  name: 'qualityStandard',readOnly : true,x:100,y:122,width:170},
					{xtype:'label',text: '交货日期:',x:250,y:125,style:this.lableStyle_},
					{xtype:'textfield',  name: 'deliveryDate',readOnly : true,x:350,y:120, width:170},
					{xtype:'label',text: '整单折扣(%):',x:800,y:125,style:this.lableStyle_},
					{xtype:'numberfield',name: 'overallRebate',readOnly : true,x:900,y:123,width:170},
					//6
					 {xtype:'label',text: '交提货地点:',x:0,y:155,style:this.lableStyle_},
					 {xtype:'textfield', name: 'deliveryAddressType', x:100,y:152,width:420,readOnly : true},
					 {xtype:'label',text: '最终金额:',x:800,y:155,style:this.lableStyle_},
					 {xtype:'numberfield', name: 'finalMoney', x:900,y:152,width:170,readOnly : true},
					 //7
					 {xtype:'label',text: '运输方式及费用:',x:0,y:185,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'trafficMode', x:100,y:182, width : 420,readOnly : true},
					 {xtype:'label',text: '合同违约责任:',x:530,y:185,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'defaultDuty', readOnly : true,x:630,y:182, width : 440},
					 //8
					 {xtype:'label',text: '结算方式及期限:',x:0,y:215,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'closingAccountMode',x:100,y:210,width:418, readOnly : true},
					 {xtype:'label',text: '合同生效条件:',x:530,y:215,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'effectConditions',x:630,y:212 ,width : 440, readOnly : true},
					 //8
					 {xtype:'label',text: '其他约定事项:',x:0,y:245,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'otherConvention', width : 420, readOnly : true,x:100,y:240},
					 {xtype:'label',text: '备注:',x:530,y:245,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'mome', width : 440, readOnly : true,x:630,y:242}
					];
			pODetailGrid.superclass.constructor.call(this, {
				width : 1000,
				labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
				frame:true,labelWidth:75,monitorValid:false,
				layout : 'absolute',
				items:config
			})
		}
 })

	var pODetailPnaelo = Ext.extend(Ext.Panel,{
		updateGrid:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.updateGrid = new pODetailGrid();
			pODetailPnaelo.superclass.constructor.call(this, {
			region: 'north',
            width: 900,
        	height:280,  
			layout:'fit',
            items : [this.updateGrid]
			})
		}
	 })

	var pODetailPnaelt = Ext.extend(Ext.Panel,{
		updateTree:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.updateTree = new  pODetailTree();
			pODetailPnaelt.superclass.constructor.call(this, {
				region: 'center',
				split: true,
				draggable:false,
				collapsible: true,
				layout:'fit',
				items : [this.updateTree]
			})
		}
	 })

	var DetailWindow = Ext.extend(Ext.Window,{
		nav3:null,
		nav4:null,
		orderId:null,
		setId:function(id){
			this.orderId = id;
		},
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.nav3 = new  pODetailPnaelo();
			var store = new contractOrderStore();
			store.baseParams.orderId = this.orderId;
			store.load();
			store.on('load',function(){
				this.nav3.updateGrid.getForm().loadRecord(store.getAt(0));
			},this);
			this.nav4 = new pODetailPnaelt();
			DetailWindow.superclass.constructor.call(this, {
				title:"查看材料储备订单",  
				width:1140,  
				height:550,  
//				modal:true,
				plain:true,
				draggable:true,
				maximizable: true,
				layout:"border",  
				buttons : [{
					text : "关闭",
					handler : function() {
						this.close();
					},
					scope : this
				 }],
			items : [this.nav3, this.nav4],
			listeners:{
				'beforeshow':function(component){
					this.nav4.updateTree.store.baseParams.orderId = this.orderId;
					this.nav4.updateTree.store.load({params:{start:0,limit:15}});
				},scope:this
			}
			})
		}
	})

