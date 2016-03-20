
/**添加预定订单多选框**/
Ext.ls.scheduleOrder.addChek = new Ext.grid.CheckboxSelectionModel();


/**添加产品**/
Ext.ls.scheduleOrder.add = function(btn,e){
	var grid = btn.ownerCt.ownerCt;
	var store = grid.store;
	var win = new qOProductWin({contractCode:grid.quotationCode,supplierId:grid.supplierId,
		callBackMethod:function(data,win){
//		alert(Ext.encode(data[0].data));
		var obj = [];
		var isRepet = false;
		for(var i=0;i<data.length;i++)
		{
			var flag = true;
			store.each(function(record){
				if(record.get('contractProductDetailId') == data[i].get('contractProductDetailId'))
				{
					//如果重复添加则数据变色
					var idx = win.nav2.detail_list.getStore().indexOf(data[i]);//获取行号
					var row = win.nav2.detail_list.getView().getRow(idx);//根据行号获取行对象
					var element = Ext.get(row);
					element.removeClass('x-grid3-row-selected');
					element.addClass('red-row');
					flag = false; //该条记录是否重复
					isRepet = true;//是否有记录重复
				}
			});
			if(flag)
			{
				obj.push(data[i])
			}
		}
		if(isRepet)
		{
			Ext.Msg.show({title:'系统提示',msg: '所选产品中有产品已经存在',buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
		}
		store.add(obj);
	}});
	win.show();
};

/**删除产品**/
Ext.ls.scheduleOrder.deleteProduct = function(btn,e){
	var grid = btn.ownerCt.ownerCt;
	var store = grid.getStore();
	var arr = Ext.ls.scheduleOrder.addChek.getSelections();
	var array = [];
	if(arr.length < 1) {
			Ext.Msg.show({title:'系统提示',msg: '请选择一条记录进行操作!',buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
		return;
	}
	var handleDelete = function (btn){
		if(btn == 'ok') {	
			if(grid.store.getCount()<=arr.length)
			{
				Ext.Msg.show({title:'系统提示',msg: '不能全部删除!',buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
				return
			}
			else
			{
				for(var i=0;i<arr.length;i++)
				{
					if(arr[i].get('id')!=null)
					{
						array.push(arr[i].get('id'));
					}
					store.remove(arr[i]);
				}
				delete_detail(grid.ownerCt.ownerCt.form.getForm(),store);
				Ext.Ajax.request({
					url: PATH + '/contractOrder/deleteOrderDetail.do',
					params: {ids:array,orderInfor: Ext.util.JSON.encode(new Ext.data.Record(grid.ownerCt.ownerCt.form.getForm().getValues()))},
					success : function(response) {
						
					},
					scope : this
				});
			}

		}
	}
	Ext.MessageBox.show({title:'系统提示',msg: '请确认要删除当前记录!',buttons: Ext.MessageBox.OKCANCEL,fn: handleDelete,scope:this});			
}

/**统一设置交货期限**/
Ext.ls.scheduleOrder.setupDate = function(btn,e)
{
	var grid = btn.ownerCt.ownerCt;
	var store = grid.getStore();
	var deliveryDate = null;
	/*
	if(store.getAt(0)!=undefined)
	{
		deliveryDate = store.getAt(0).get('deliveryDate');
	}
	if(deliveryDate!=null&&deliveryDate!=''){
		store.each(function(record){
			record.set('deliveryDate',deliveryDate);
		});
	}*/
	var dataf = new Ext.form.DateField({format:'Y-m-d'});
	var menu = new Ext.menu.DateMenu();
	menu["on"]("select", function(a,b){
		var bb = dataf.formatDate(dataf.parseDate(b));
		store.each(function(record){
			record.set('deliveryDate',bb);
		});
		menu.hide();
	});
	menu.show(btn.getEl());	
};

/**历史价格查询**/
Ext.ls.scheduleOrder.queryHistory = function(btn,e)
{
	var grid = btn.ownerCt.ownerCt;
	var store = grid.getStore();
	try
	{	
		var favlues = grid.ownerCt.ownerCt.form.getForm().getValues();
		var supplierId = favlues.supplierId;
		var supplierName = favlues.supplierName;
		var brandCode = favlues.supplierId;
		new Ext.ffc.OrderHisPriceSearchWin({
			supplierId:supplierId,
			supplierName:supplierName,
			brandCode:brandCode
		}).show();
	}
	catch (ex){alert(ex);}
};



/**预定订单详细grid**/
	Ext.ls.scheduleOrder.addGrid =  Ext.extend(Ext.grid.EditorGridPanel,{
		quotationCode:null,
		supplierId:null,
		store:null,
		quotationId:null,
		URL:null,//store的URL
		detailFlag:null,//是否明细页面
		bbarHidden:null,//分页信息的显示隐藏
		tbarHidden:null,//按钮的显示隐藏
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
		Ext.apply(this, _cfg);
		/**控制按钮和分页信息的显示和隐藏**/
		if(this.detailFlag)
		{
			this.bbarHidden = false;
			this.tbarHidden = true;
		}
		else
		{
			this.bbarHidden = true;
			this.tbarHidden = false;
		}
		this.store = new Ext.data.JsonStore({
		url:this.URL,
		remoteSort : true,
		totalProperty : 'totalProperty',
		root : 'root',
		fields : ['id','brandCode','productCode','productName','productUnit','contractAmount',
			'remainAmount','productBrand','price','parentToolsId','toolsId','leaf','contractProductDetailId'
		,'serialNumber','orderAmount','productMoney','deliveryDate','projectCode','priceChange']});
		/**给store传参**/
		this.store.baseParams.quotationCode = this.quotationCode;
		this.store.baseParams.supplierId = this.supplierId;
		this.store.baseParams.orderId = this.orderId;
		this.store.load();
		Ext.ls.scheduleOrder.addGrid.superclass.constructor.call(this, {
			layout: 'fit',
			clicksToEdit: 1,
			frame:true,
			sm:Ext.ls.scheduleOrder.addChek,
			store:this.store,
			columns:[
					 new Ext.grid.RowNumberer(),
					Ext.ls.scheduleOrder.addChek,
					{header:'预定订单详细ID',width:100,dataIndex:'id',hidden:true},
					{header:'项目编号',width:100,dataIndex:'projectCode',sortable:true},
					{header:'序号',width:50,dataIndex:'serialNumber',sortable:true},
					{header:'名称',width:125,dataIndex:'productName',sortable:true},
					{header:'工具牌号',width:230,dataIndex:'brandCode',sortable:true},
					{header:'计量单位',width:70,dataIndex:'productUnit',sortable:true},
					{header:'单价',width:70,dataIndex:'price',editor: new Ext.form.NumberField({
						   allowBlank: false,
						   allowNegative: false,
						   style: 'text-align:left',
						   gridObj:this,
						   listeners : {
								focus : function(f){
										f.selectText(0,f.getValue().length);
									}
								,'specialkey' : Ext.ftl.gridEditorkeyMove
							}
						})
					},
					{header:'品牌',width:100,dataIndex:'productBrand',sortable:true},
					{header:'报价单数量',width:100,dataIndex:'contractAmount',sortable:true},
					{header:'报价单剩余数量',width:120,dataIndex:'remainAmount',sortable:true},
					{header:'采购数量',width:70,dataIndex:'orderAmount',sortable:true,editor: new Ext.form.NumberField({
						   allowBlank: false,
						   allowNegative: false,
						   style: 'text-align:left',
						   gridObj:this,
						   listeners : {
								focus : function(f){
										f.selectText(0,f.getValue().length);
									}
								,'specialkey' : Ext.ftl.gridEditorkeyMove
							}
						}),
						renderer:function(value,metadata,record)
						{
							if(value == null || value == '')
							{
								record.set('orderAmount',0);
								return 0;
							}
							else
								return value;
						}
					},
					{header:'货品金额',width:100,dataIndex:'productMoney',sortable:true},
					{header:'交货日期',width:100,dataIndex:'deliveryDate'},
					{header:'货品工具主键',width:0,hidden : true,dataIndex:'toolsId',sortable:true},
					{header:'货品工具父节点id',width:0,hidden : true,dataIndex:'parentToolsId',sortable:true},
					{header:'货品工具叶子节点',width:0,hidden : true,dataIndex:'leaf',sortable:true},
					{header:'合同货主键',width:0,hidden : true,dataIndex:'contractProductDetailId',sortable:true},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true},
					{header:'价格变动',dataIndex:'priceChange',hidden : true}
			],
			tbar :	[{text : "添加",iconCls:'icon-add',handler :Ext.ls.scheduleOrder.add,scope : this,hidden:this.tbarHidden},
					{xtype:'tbseparator',hidden:this.tbarHidden},
					{text : "删除",iconCls : 'icon-delete',handler : Ext.ls.scheduleOrder.deleteProduct,scope:this,hidden:this.tbarHidden},
					{xtype:'tbseparator',hidden:this.tbarHidden},
					{text : '统一设置交货期限',iconCls : 'icon-date',handler :Ext.ls.scheduleOrder.setupDate,scope : this,hidden:this.tbarHidden},
					{xtype:'tbseparator',hidden:this.tbarHidden},
					{text : '历史价格查询',iconCls : 'icon-date',handler :Ext.ls.scheduleOrder.queryHistory,scope : this,hidden:this.tbarHidden}],
			/**分页信息，当页面显示明细信息时显示**/
			bbar: new Ext.PagingToolbar({
				hidden:this.bbarHidden,
				store: this.store,
				pageSize: 15,
				displayInfo: true,
				displayMsg: "当前显示第{0}条到第{1}条，共{2}条",
				emptyMsg: "<i>没有数据</i>"
			}),
			listeners : {
				'cellclick':function(grid,rowIndex,columnIndex,e){
					var record = grid.getStore().getAt(rowIndex);  // Get the Record
					var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
					if(fieldName == 'deliveryDate')
					{
						try{
							var obj = e.srcElement || e.target;
							var dataf = new Ext.form.DateField({format:'Y-m-d'});
							var menu = new (Ext.menu.DateMenu)({hideOnClick: false});
								menu["on"]("select", function(a,b){
									var bb = dataf.formatDate(dataf.parseDate(b));
									obj.innerHTML = bb;
									record.set('deliveryDate',bb);
									menu.hide();
								}, obj);
								menu.show(obj, "tl-bl");
						}catch(e){
							alert(e);
						}
					}
				},
				'afteredit' : function(e) {
					if(e.field == 'orderAmount'){
						if(e.record.get('orderAmount')>e.record.get('remainAmount')+e.originalValue) {
							Ext.MessageBox.alert('系统提示', '采购数量超出需采购数量!');
							e.record.set('orderAmount',e.originalValue);
							return
						}
					    e.record.set('remainAmount',e.record.get('remainAmount')-e.record.get('orderAmount')+e.originalValue);
					}
					if(e.field == 'price'){
						e.record.set('priceChange',1);
					}
					e.record.set('productMoney',(e.record.get('orderAmount')*e.record.get('price')*1).toFixed(2));
					delete_detail(this.ownerCt.ownerCt.form.getForm(),this.store);
				},scope:this
			}
		})
	},
	
	validator : function() {
		var flag = true;
		this.store.each(function(_record) {
			var orderAmount = _record.data['orderAmount'];
			if(orderAmount == 0) {
				flag = false;
				return false
			}
		
		})
		
		return flag;
	}
})

/**添加订单form**/
Ext.ls.scheduleOrder.addForm = Ext.extend(Ext.FormPanel,{
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.taxRateCombox = new TaxrateCombox({disabled : this.isReadOnly,x:900,y:33,width:170});
			this.taxRateCombox.on('select',function(combo, record,index){ 
				change_rate(this.getForm());
					 },this);	 
			this.companyCombox = new companyCombox({disabled : this.isReadOnly,x:630,y:63,width:170});
			this.orderDate = new Ext.form.DateField({
				fieldLabel: '订货日期', format:'Y-m-d',name: 'orderDate' ,value:new Date(),x:100,y:30, width:170, format:'Y-m-d', 
				emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
			});
			this.currCombox = new orderCurrencyCombox({disabled : this.isReadOnly,x:630,y:152,width:170,
			'changeCallBack' : Ext.ffc.orderCurrenyRateChangeCallBack
			});
			this.deliveryDate = new Ext.form.DateField({
				fieldLabel: '交货日期', format:'Y-m-d',name: 'deliveryDate' ,x:350,y:120, width:170, format:'Y-m-d', 
				emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
			});
			this.OrderClosingAccountModeComboBox = new Ext.ffc.OrderClosingAccountModeComboBox({disabled : this.isReadOnly,x:100,y:210,width:418});
			this.status = new orderStatusCombox({disabled : true,x:100,y:93,width:170});
			this.lableStyle_ = "font-size:9pt;text-align:right;width:100px";
			var config = [
				//
					{xtype:'label',text: '订单编号:',x:0,y:5,style:this.lableStyle_},
					{xtype:'textfield', readOnly : true, x:100,y:3, width:170,name: 'orderCode'},
					{xtype:'label',text: '供应商:',x:250,y:5,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierName',readOnly : true,x:350,y:3,width:170},
					{xtype:'label',text: '报价单编号:',x:530,y:5,style:this.lableStyle_},
					{xtype:'textfield',  name: 'quotationCode',readOnly : true,x:630,y:2,width:170},
					{xtype:'label',text: '货品金额:',x:800,y:5,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'productMoney',readOnly : true,x:900,y:3,width:170,value:0},
					//2
					{xtype:'label',text: '订货日期:',x:0,y:35,style:this.lableStyle_},
					this.orderDate,
					{xtype:'label',text: '供应商负责人:',x:250,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierContactPerson',readOnly : false,x:350,y:33,width:170},
					{xtype:'label',text: '客户我方负责人:',x:530,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'ownContactPerson',readOnly : true,x:630,y:33,width:170},
					{xtype:'label',text: '税  率:',x:800,y:35,style:this.lableStyle_},
					this.taxRateCombox,
					//3
					{xtype:'label',text: '紧急程度:',x:0,y:65,style:this.lableStyle_},
					new Ext.ffc.UrgentLevelCombox({x:100,y:62, width:170,disabled : this.isReadOnly}),
					{xtype:'label',text: '供应商电话:',x:250,y:65,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierPhone',readOnly : false,x:350,y:63,width:170},
					{xtype:'label',text: '卖方名称:',x:530,y:65,style:this.lableStyle_},
					this.companyCombox,
					{xtype:'label',text: '税　　金:',x:800,y:65,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'taxMoney',readOnly : true,x:900,y:63,width:170,value:0},
					//4
					{xtype:'label',text: '订单状态:',x:0,y:95,style:this.lableStyle_},
					this.status,
//					{xtype:'textfield',  name: 'status',value:'编制',readOnly : true,x:100,y:93,width:170},
					{xtype:'label',text: '供应商传真:',x:250,y:95,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierFax',readOnly : false,x:350,y:93,width:170},
					{xtype:'label',text: '供应商我方负责人:',x:530,y:95,style:this.lableStyle_},
					{xtype:'textfield', name: 'supplierOwnContactPerson',readOnly : false,x:630,y:95,width:170},
					{xtype:'label',text: '税价合计:',x:800,y:95,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'totalMoney',readOnly : true,x:900,y:93,width:170,value:0},
					//5
					{xtype:'label',text: '质量标准:',x:0,y:125,style:this.lableStyle_},
					{xtype:'textfield',  name: 'qualityStandard',value:'参照供方标准',readOnly : this.isReadOnly,x:100,y:122,width:170},
					//{xtype:'label',text: '交货日期:',x:250,y:125,style:this.lableStyle_},
					///this.deliveryDate,
					{xtype:'label',text: '制 单 人:',x:530,y:125,style:this.lableStyle_},
					{xtype:'textfield', name: 'userName',value:LoginInfor.user.userName,readOnly : true,x:630,y:125,width:170},
					{xtype:'label',text: '整单折扣(%):',x:800,y:125,style:this.lableStyle_},
					{xtype:'numberfield',name: 'overallRebate',value:0, readOnly : this.isReadOnly,
							allowDecimals : false,
							allowNegative : false,
							decimalPrecision : 0,
							minValue : 0,
							maxValue : 100,
							x:900,y:123,width:170,
							validator : function(_value) {
								if(_value >= 0 && _value <= 100) {
									return true;
								} else {
									return false;
								}
						   },
						   listeners:{
								'change':function(filed,newValue,oldValue ){ 
									change_overallRebate(this.getForm(),newValue);
									},scope:this
							}
					   },
					//6
					 {xtype:'label',text: '交提货地点:',x:0,y:155,style:this.lableStyle_},
					 {xtype:'textfield', name: 'deliveryAddressType', allowBlank : false, x:100,y:152,width:420},
					 {xtype:'label',text: '币　别:',x:530,y:155,style:this.lableStyle_},
					 this.currCombox,
					 {xtype:'label',text: '最终金额:',x:800,y:155,style:this.lableStyle_},
					 {xtype:'numberfield', name: 'finalMoney', allowBlank : false, x:900,y:152,width:170,value:0},
					 //7
					 {xtype:'label',text: '运输方式及费用:',x:0,y:185,style:this.lableStyle_},
					 new Ext.ffc.TrafficModeComboBox({x:100,y:182, width : 420,disabled : this.isReadOnly}),
					 {xtype:'label',text: '合同违约责任:',x:530,y:185,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'defaultDuty', readOnly : this.isReadOnly,value:'无。', allowBlank : false,x:630,y:182, width : 440},
					 //8
					 {xtype:'label',text: '结算方式及期限:',x:0,y:215,style:this.lableStyle_},
					 this.OrderClosingAccountModeComboBox,
					 {xtype:'label',text: '合同生效条件:',x:530,y:215,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'effectConditions',x:630,y:212 ,width : 440, readOnly : this.isReadOnly,value:'本合同一式 份，卖方 份，买方 份，双方签字盖章后生效。', allowBlank : false},
					 //8
					 {xtype:'label',text: '其他约定事项:',x:0,y:245,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'otherConvention', width : 420, readOnly : this.isReadOnly,value:'无。', allowBlank : false,x:100,y:240},
					 {xtype:'label',text: '备注:',x:530,y:245,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'mome', width : 440, readOnly : this.isReadOnly,x:630,y:242},
					//hidden
					 {xtype:'hidden',  name: 'supplierId'},
					 {xtype:'hidden',  name: 'customerCode'},
					 {xtype:'hidden',  name: 'customerName'},
					 {xtype:'hidden',  name: 'quotationId'},
					 {xtype:'hidden',  name: 'id'}
				//
				];
			Ext.ls.scheduleOrder.addForm.superclass.constructor.call(this, {
					width : 1000,
					labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
					frame:true,labelWidth:75,monitorValid:false,
					layout : 'absolute',
					items:config
			})
		}
 })
	 

	Ext.ls.scheduleOrder.addWin = Ext.extend(Ext.Window,{
		grid:null,
		form:null,
		quotationId:null,
		quotationCode:null,
		supplierId:null,
		orderId:null,//修改订单时订单的ID
		detailFlag:null,//是否显示的为详细页面
		updateFlag:null,//是否修改页面
		URL:null,//订单详细的url
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.grid = new Ext.ls.scheduleOrder.addGrid({quotationId:this.quotationId,quotationCode:this.quotationCode,supplierId:this.supplierId,detailFlag:this.detailFlag,URL:this.URL,orderId:this.orderId});
			this.form = new Ext.ls.scheduleOrder.addForm({detailFlag:this.detailFlag});
			if(this.updateFlag){this.updateFlag = false,this.detailFlag = true}
			else{this.updateFlag = true}//修改页面
			Ext.ls.scheduleOrder.addWin.superclass.constructor.call(this, {
				      	renderTo: Ext.getBody(),
						title:"",  
						width:1140,  
						height:610,  
						plain:true,
						draggable:true,
						resizable:false,
						maximizable: true,
						layout:"border",  
						buttons : [{
							text : "保存",
							hidden:this.detailFlag,
							handler : function() {
								var formV = this.form.getForm().getValues();
								if(!checkOrderInfor(formV,this.form)){return;}
								if(!this.grid.validator()) {
									Ext.Msg.show({ title: '系统提示',msg: '采购数量需大于0！',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});
									return;
								}
								var childrenArray = [];
								this.grid.store.each(function(record){childrenArray.push(record.data);});
								if(childrenArray.length<1){Ext.Msg.show({title: '系统提示',msg: '请添加产品！',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});return;}
								if(!checkOrderDetail(childrenArray,formV)){return;}
								var record = new Ext.data.Record(this.form.getForm().getValues());
									Ext.apply(record.data,{'currencyId':this.form.currCombox.curid});
								var orderDetail = {children:childrenArray};
								var order = Ext.util.JSON.encode(record);	
								Ext.Ajax.request({
								url: PATH + '/contractOrder/addOrder.do',
									params: { order: order, orderDetail : Ext.encode(orderDetail) ,orderType : 5},
									success : function(response) {
										var responseArray = Ext.util.JSON.decode(response.responseText); 
											 if(responseArray.success == true){

												Ext.Ajax.request({
													url: PATH + '/contractOrder/CmprStockPrice.do',
													params: { conType:"quotation", orderInforId : responseArray.orderInforId},
													success : function(_response) {
														var _responseArray = Ext.util.JSON.decode(_response.responseText); 
														 if(_responseArray.success == true){
															 Ext.Msg.show({title:'价格提示',msg:"序列号为:"+ _responseArray.numStr+"产品的采购价格高于合同中采购价格",buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO,width: 300});
														 }
												}})

												 Ext.Msg.show({title:'成功提示',msg: responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});

												this.updateFlag = true;//添加成功
												this.orderId = responseArray.orderInforId;//添加成功后返回的订单ID
												//添加成功后自动跳转到更新页面
												//更改页面标题
												this.setTitle('修改预定订单');
												var grid = this.grid;
												var store = new Ext.data.JsonStore({
													url:Ext.ls.scheduleOrder.updateUrl,
													remoteSort : true,
													totalProperty : 'totalProperty',
													root : 'root',
													fields : ['id','brandCode','productCode','productName','productUnit','contractAmount',
														'remainAmount','productBrand','price','parentToolsId','toolsId','leaf','contractProductDetailId',
														'contractProjectSortId','proSortName','projectCode','serialNumber','orderAmount','productMoney','deliveryDate'],
														listeners :{
															//'load':function(store,records,options){
															//	grid.store.removeAll();
															//	grid.store.add(store.getRange(0,store.getCount()));
															//}
													}});
													store.baseParams.orderId = this.orderId;
												grid.reconfigure(store,grid.getColumnModel() );
												store.load();
												//给form的Id赋值
												this.form.getForm().setValues({'id':this.orderId,'orderCode':responseArray.orderCode});
												//设置保存按钮隐藏
												this.buttons[0].setVisible(false);
												//设置修改按钮可见
												this.buttons[1].setVisible(true);

												var ffcStore = cut_tools.q_order.index_grid.getStore();
												 if(ffcStore){ffcStore.reload();}
											 } 
											 else {
												Ext.Msg.show({title:'错误提示',msg: responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
											 } 
									},scope : this
								});
							},
							scope : this
						 },{
							text : "保存",
							hidden: this.updateFlag,
							handler : function() {
								var record = new Ext.data.Record(this.form.getForm().getValues());
									Ext.apply(record.data,{'currencyId':this.form.currCombox.curid});
								var formV = this.form.getForm().getValues();
								
								if(!checkOrderInfor(formV,this.form)){return;}
								if(!this.grid.validator()) {
									Ext.Msg.show({ title: '系统提示',msg: '采购数量需大于0！',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});
									return;
								}
								
								var ss = [];
								this.grid.store.each(function(record){ss.push(record.data);});
								
								if(ss.length<1){Ext.Msg.show({title: '系统提示',msg: '请添加产品！',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});return;}
								if(!checkOrderDetail(ss,formV)){return;}
								var orderDetail = Ext.util.JSON.encode(ss);
								var order = Ext.util.JSON.encode(record);
								Ext.Ajax.request({
									url: PATH + '/contractOrder/updateOrder.do',
									params: { update_order: order, update_orderDetail : orderDetail},
									success : function(response) {
										var _this = this;
										var responseArray = Ext.util.JSON.decode(response.responseText); 
										 if(responseArray.success == true){
											 Ext.Ajax.request({
												url: PATH + '/contractOrder/CmprStockPrice.do',
												params: { conType:"quotation", orderInforId : record.data.id},
												success : function(_response) {
													var _responseArray = Ext.util.JSON.decode(_response.responseText); 
													 if(_responseArray.success == true){
														 Ext.MessageBox.show({  
														  title : "价格提示",  
														  msg:"序列号为:"+ _responseArray.numStr+"产品的采购价格高于预定报价中销售价格",  
														  width : 300,  
														  icon : Ext.MessageBox.INFO,  
														  buttons : Ext.MessageBox.OK,  
														  fn : function(_btn) {  
															 Ext.Msg.show({title:'成功提示',msg: responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
															 _this.grid.store.reload();
															 cut_tools.q_order.index_grid.getStore().reload();
														  }  
														});  
													 }else{
													     Ext.Msg.show({title:'成功提示',msg: responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
														 _this.grid.store.reload();
														 cut_tools.q_order.index_grid.getStore().reload();
													 }
											}})
										 } 
										 else {Ext.Msg.show({title:'错误提示',msg: responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});} 
									},scope:this
								});
							},scope : this
						},{
							text : "关闭",
							handler : function() {
								this.close();
							},
							scope : this
						 }],
					items : [{
								region: 'north',
								title: '预定订单编制界面',
								iconCls:'icon-grid',
								split: true,
								height : 305,
								minSize: 305,
								maxSize: 305,
								layout:"fit",
								collapsible: true,
								margins: '5 5 0 5',
								items : [this.form]
							}, {
								region: 'center',
								iconCls:'icon-grid',
								split: true,
								layout: 'fit',
								collapsible: true,
								margins: '0 5 5 5',
								items : [this.grid]
							}]
			})
		}
	})


var DetailWindow = function(id){
   this.method = null;
   this.id = null;
   this.on = function(paraString,fun){
		this.method = fun;
   };
   this.setId = function(tid){
		this.id = tid;
   };
   this.show = function(){
       if(this.method != null){
	       this.method();
			var store = new contractOrderStore();
			store.baseParams.orderId = this.id;
			store.load();
			/**订单修改页面**/
			var win = new Ext.ls.scheduleOrder.addWin({orderId:this.id,detailFlag:true,URL:Ext.ls.scheduleOrder.detailUrl});
			/**设置窗口的标题**/
			win.setTitle('查看预定订单明细');
			/**将store的数据加载到页面**/
			store.on('load',function(){
					win.form.getForm().loadRecord(store.getAt(0));
			},this);
			win.show();
	   }
   }
}