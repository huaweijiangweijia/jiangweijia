

/**添加产品**/
Ext.ls.selfOrder.add = function(btn,e){
	var grid = btn.ownerCt.ownerCt;
//	var store = grid.store;
	var root = grid.getRootNode(); 
	var loader = grid.getLoader();
	var win = new sOProductWin({contractCode:grid.contractCode,supplierId:grid.supplierId,
		callBackMethod:function(data,node){
		var flag = true;
		root.eachChild(function(obj){
			if(data.contractProductDetailId == obj.cols['contractProductDetailId'])
			{
				node.ui.addClass('red-row');
				Ext.Msg.show({title:'信息提示',msg: '该产品在产品已经存在！',buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
				flag = false; 
			}
		});
		if(flag)
		{
			root.appendChild(loader.createNode(data));
		}
	}});
	win.show();
};

/**删除产品**/
Ext.ls.selfOrder.deleteProduct = function(btn,e){
	var grid = btn.ownerCt.ownerCt;
	var node = grid.getSelectionModel().getSelectedNode();
	if(!node) {
			Ext.Msg.show({title:'系统提示',msg: '请选择一条记录进行操作!',buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
		return;
	}
	var handleDelete = function (btn){
		if(btn == 'ok') {	
			grid.getRootNode().removeChild(node);
			var prom = 0;
			grid.getRootNode().eachChild(function(obj){
				prom += obj.cols['price']*obj.cols['orderAmount']*1;
			});
			var rat = grid.ownerCt.ownerCt.form.getForm().getValues().taxRate;
			var overallRebate = grid.ownerCt.ownerCt.form.getForm().getValues().overallRebate;
			if(rat == '' || rat == null || isNaN(rat)){rat = 0;}
			if(overallRebate == null){overallRebate = 0;}
			var totalMoney = prom*rat*1 + prom*1;
			grid.ownerCt.ownerCt.form.getForm().setValues({productMoney:prom.toFixed(2)});
			grid.ownerCt.ownerCt.form.getForm().setValues({totalMoney:totalMoney.toFixed(2)});
			grid.ownerCt.ownerCt.form.getForm().setValues({finalMoney:(totalMoney*1*(1- overallRebate/100)).toFixed(2)});
			grid.ownerCt.ownerCt.form.getForm().setValues({taxMoney:(totalMoney - prom*1).toFixed(2)});
			Ext.Ajax.request({
				url: PATH + '/selfOrder/deleteOrderDetail.do',
				params: {id:node.cols['contractProductDetailId'],orderInfor: Ext.util.JSON.encode(new Ext.data.Record(grid.ownerCt.ownerCt.form.getForm().getValues()))},
				success : function(response) {
					
				},
				scope : this
			});
		}
	}
	Ext.MessageBox.show({title:'系统提示',msg: '请确认要删除当前记录!',buttons: Ext.MessageBox.OKCANCEL,fn: handleDelete,scope:this});			
}

/**统一设置交货期限**/
Ext.ls.selfOrder.setupDate = function(btn,e)
{
	var grid = btn.ownerCt.ownerCt;
//	var store = grid.getStore();
//	var deliveryDate = null;
//	if(store.getAt(0)!=undefined)
//	{
//		deliveryDate = store.getAt(0).get('deliveryDate');
//	}
//	if(deliveryDate!=null&&deliveryDate!=''){
//		store.each(function(record){
//			record.set('deliveryDate',deliveryDate);
//		});
//	}		
	var deliveryDate = null;
	if(grid.getRootNode().item(0)!=undefined)
	{
		deliveryDate = grid.getRootNode().item(0).cols['deliveryDate'];
	}
	if(deliveryDate!=null&&deliveryDate!=''){
		grid.getRootNode().eachChild(function(node){
			node.cols['deliveryDate'] = deliveryDate;
			node.attributes['deliveryDate'] = deliveryDate;
			node.ui.setInnerHTMLValue('deliveryDate',deliveryDate);
		},this);
	}	
};

/**加工订单详细grid**/
	Ext.ls.selfOrder.addGrid = Ext.extend(Ext.tree.ColumnTree,{
		contractCode:null,
		supplierId:null,
		contractId:null,
		URL:null,//store的URL
		detailFlag:null,//是否明细页面
		tbarHidden:null,//按钮的显示隐藏
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			/**控制按钮和分页信息的显示和隐藏**/
			if(this.detailFlag)
			{
				this.tbarHidden = true;
			}
			else
			{
				this.tbarHiddsen = false;
			}
			Ext.ls.selfOrder.addGrid.superclass.constructor.call(this, {
					    width:900,
						height: 270,
						rootVisible:false,
						autoScroll:true,
						expandable:false,
						enableDD:false,	
					columns:[
						{header:'',width:100,dataIndex:''},
						{header:'加工订单ID',width:0,dataIndex:'id',hidden:true},
						{header:'合同详细ID',width:0,dataIndex:'contractProductDetailId',hidden:true},
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
						{header:'交货日期',width:100,dataIndex:'deliveryDate',disEnableEdit:true,
								listeners : {
									'click' : function() {
										try{
											var e = arguments[0] || window.event;
											var obj = e.srcElement || e.target;
											var dataf = new Ext.form.DateField({format:'Y-m-d'});
											var menu = new (Ext.menu.DateMenu)({hideOnClick: false});
												menu["on"]("select", function(a,b){
													var bb = dataf.formatDate(dataf.parseDate(b));
													obj.innerHTML = bb;
													obj.node.cols["deliveryDate"] = bb;
													obj.node.attributes["deliveryDate"] = bb;
													menu.hide();
												}, obj);
												menu.show(obj, "tl-bl");
										}catch(e){
											alert(e);
										}
									}
							}
						},
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
			tbar :	[{text : "添加",iconCls:'icon-add',handler :Ext.ls.selfOrder.add,scope : this,hidden:this.tbarHidden},
					{xtype:'tbseparator',hidden:this.tbarHidden},
					{text : "删除",iconCls : 'icon-delete',handler : Ext.ls.selfOrder.deleteProduct,scope:this,hidden:this.tbarHidden},
					{xtype:'tbseparator',hidden:this.tbarHidden},
					{text : '统一设置交货期限',iconCls : 'icon-date',handler :Ext.ls.selfOrder.setupDate,scope : this,hidden:this.tbarHidden}],
				loader: new Ext.tree.TreeLoader({
					dataUrl:PATH + this.URL,
					uiProviders:{
						'col': Ext.tree.ColumnNodeUI
					}
				}),
				root: new Ext.tree.AsyncTreeNode({
					id:"root",
					text:'Tasks'
				}),
				listeners : {
					'textchange' : function(){
						alert('textchange');
					}
				},
				scope:this
			})
		}
	 });


/**添加订单form**/
Ext.ls.selfOrder.addForm = Ext.extend(Ext.FormPanel,{
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.taxRateCombox = new TaxrateCombox({disabled : this.isReadOnly,x:630,y:33,width:170});
			this.taxRateCombox.on('select',function(combo, record,index){ 
				change_rate(this.getForm());
					 },this);	 
			this.orderDate = new Ext.form.DateField({
				fieldLabel: '订货日期', format:'Y-m-d',name: 'orderDate' ,value:new Date(),x:100,y:30, width:170, format:'Y-m-d', 
				emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
			});
			this.currCombox = new orderCurrencyCombox({disabled : this.isReadOnly,x:370,y:92,width:170});
			this.deliveryDate = new Ext.form.DateField({
				fieldLabel: '交货日期', format:'Y-m-d',name: 'deliveryDate' ,x:100,y:120, width:170, format:'Y-m-d', 
				emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
			});
			this.status = new orderStatusCombox({disabled : true,x:100,y:62,width:170});
			this.lableStyle_ = "font-size:9pt;text-align:right;width:100px";
			var config = [
				//
					{xtype:'label',text: '订单编号:',x:0,y:5,style:this.lableStyle_},
					{xtype:'textfield', readOnly : true, x:100,y:3, width:170,name: 'orderCode'},
					{xtype:'label',text: '合同编号:',x:270,y:5,style:this.lableStyle_},
					{xtype:'textfield',  name: 'contractCode',readOnly : true,x:370,y:2,width:170},
					{xtype:'label',text: '货品金额:',x:530,y:5,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'productMoney',readOnly : true,x:630,y:3,width:170,value:0},
					//2
					{xtype:'label',text: '订货日期:',x:0,y:35,style:this.lableStyle_},
					this.orderDate,
					{xtype:'label',text: '客户我方负责人:',x:270,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'ownContactPerson',readOnly : true,x:370,y:33,width:170},
					{xtype:'label',text: '税　　率:',x:530,y:35,style:this.lableStyle_},
					this.taxRateCombox,
					//3
					{xtype:'label',text: '订单状态:',x:0,y:65,style:this.lableStyle_},
//					{xtype:'textfield',  name: 'status',value:'编制',readOnly : true,x:100,y:62,width:170},
					this.status,
					{xtype:'label',text: '制 单 人:',x:270,y:65,style:this.lableStyle_},
					{xtype:'textfield', name: 'userName',value:LoginInfor.user.userName,readOnly : true,x:370,y:63,width:170},
					{xtype:'label',text: '税　　金:',x:530,y:65,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'taxMoney',readOnly : true,x:630,y:63,width:170,value:0},
					//4
					{xtype:'label',text: '紧急程度:',x:0,y:95,style:this.lableStyle_},
					new Ext.ffc.UrgentLevelCombox({x:100,y:92, width:170,disabled : this.isReadOnly}),
					{xtype:'label',text: '币　　别:',x:270,y:95,style:this.lableStyle_},
					 this.currCombox,
					{xtype:'label',text: '税价合计:',x:530,y:95,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'totalMoney',readOnly : true,x:630,y:93,width:170,value:0},
					//5
					{xtype:'label',text: '交货日期:',x:0,y:125,style:this.lableStyle_},
					this.deliveryDate,
					{xtype:'label',text: '最终金额:',x:530,y:125,style:this.lableStyle_},
					{xtype:'numberfield', name: 'finalMoney', allowBlank : false, x:630,y:122,width:170,value:0},
					//6
					 {xtype:'label',text: '备　　注:',x:0,y:155,style:this.lableStyle_},
					 {xtype:'textfield' ,name: 'mome', width : 440, readOnly : this.isReadOnly,x:100,y:152},
					 //hidden
					 {xtype:'hidden',  name: 'customerCode'},
					 {xtype:'hidden',  name: 'customerName'},
					 {xtype:'hidden',  name: 'supplierId'},
					 {xtype:'hidden',  name: 'id'}
				];
			Ext.ls.selfOrder.addForm.superclass.constructor.call(this, {
				width : 1000,
				labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
				frame:true,labelWidth:75,monitorValid:false,
				layout : 'absolute',
				items:config
			})
		}
 })
	 
/**加工订单window**/
	Ext.ls.selfOrder.addWin = Ext.extend(Ext.Window,{
		grid:null,
		form:null,
		contractId:null,
		contractCode:null,
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
			this.grid = new Ext.ls.selfOrder.addGrid({contractId:this.contractId,contractCode:this.contractCode,supplierId:this.supplierId,detailFlag:this.detailFlag,URL:this.URL,orderId:this.orderId});
			this.form = new Ext.ls.selfOrder.addForm();
			var sm = this.grid.getSelectionModel()
			if(sm){
				sm.on('beforeselect',function(thisObj, bNode, aNode){
					if(bNode.attributes.parentToolsId != 'root'){
						return false;
					}
					return true;
				});
			}
			this.editorTree = new Ext.tree.ColumnTreeEditor(this.grid,{
				   completeOnEnter: true,
				   autosize: true,
				   ignoreNoChange: true,
					listeners : {
					specialkey : Ext.ffc.gridTreeEditorkeyMove.moveCallBack
				   }
				});
				this.editorTree['corder_form'] = this.form ;  
				this.editorTree['corder_tree'] = this.grid; 
			this.editorTree.on("fccAfterUpdateNodeEvent",Ext.ffc.contractOrderDetailUpdate);
			/**控制按钮的显示和隐藏**/
			if(this.updateFlag){this.updateFlag = false,this.detailFlag = true}
			else{this.updateFlag = true}//修改页面
			Ext.ls.selfOrder.addWin.superclass.constructor.call(this, {
				      	renderTo: Ext.getBody(),
						title:"",  
						width:915,  
						height:585,  
						plain:true,
						draggable:true,
						resizable:false,
						maximizable:true,
						layout:"border",  
						buttons : [{
							text : "保存",
							hidden:this.detailFlag,
							handler : function() {
								var rootCode = this.grid.getRootNode();
								var formV = this.form.getForm().getValues();
								var bDate = Date.parseDate(formV.orderDate,'Y-m-d');
								var eDate = Date.parseDate(formV.deliveryDate,'Y-m-d');
								if(formV.deliveryDate != undefined && formV.deliveryDate.length<1)
								{
									Ext.Msg.show({title: '系统提示',msg: '请选择交货日期！',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});
									return false;
								}
								var childrenArray = [];
								rootCode.eachChild(function(node){
									var newNode = Ext.tree.toNewTreeNode(node.attributes,{},true);
									childrenArray.push(newNode);
								});
								if(childrenArray.length<1)
								{
									Ext.Msg.show({title: '系统提示',msg: '请添加产品！',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});
									return;
								}
								for(var i=0;i<childrenArray.length;i++)
								{
									var nDate = childrenArray[i].deliveryDate;
									if(nDate == null || nDate == '')
									{
										Ext.Msg.show({title: '系统提示',msg: '产品交货日期不能为空!',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});
										return;
									}
								}
								var record = new Ext.data.Record(this.form.getForm().getValues());
								var orderDetail = {children:childrenArray};
								Ext.apply(record.data,{'currencyId':this.form.currCombox.curid});
								var order = Ext.util.JSON.encode(record);	
								Ext.Ajax.request({
								url: PATH + '/selfOrder/addOrder.do?orderType=3',
									params: { order: order, orderDetail : Ext.encode(orderDetail) },
									success : function(response) {
										var responseArray = Ext.util.JSON.decode(response.responseText); 
											 if(responseArray.success == true){
												Ext.Ajax.request({
													url: PATH + '/contractOrder/CmprStockPrice.do',
													params: { conType:"contract", orderInforId : responseArray.orderInforId},
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
												this.setTitle('修改加工订单');
												//给form的Id赋值
												this.form.getForm().setValues({'id':responseArray.orderInforId,'orderCode':responseArray.orderCode});
												//设置保存按钮隐藏
												this.buttons[0].setVisible(false);
												//设置修改按钮可见
												this.buttons[1].setVisible(true);
//											 this.close();
											 cut_tools.self_order.index_grid.getStore().reload();
											 } else {
												Ext.Msg.show({title:'错误提示',msg: responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.ERROR});
											 } 
									},scope:this
								});
							},
							scope : this
						 },{
							text : "保存",
							hidden: this.updateFlag,
							handler : function() {
								var rootCode = this.grid.getRootNode();
								var record = new Ext.data.Record(this.form.getForm().getValues());
									Ext.apply(record.data,{'currencyId':this.form.currCombox.curid});
								var formV = this.form.getForm().getValues();
								if(!checkOrderInfor(formV,this.form)){return;}
								var ss = [];
								rootCode.eachChild(function(obj){
									var o = Ext.tree.toNewTreeNode(obj.attributes,null,true);
									ss.push(o);
								});
								if(ss.length<1){Ext.Msg.show({title: '系统提示',msg: '请添加产品！',width: 300,buttons: Ext.MessageBox.OK,icon: Ext.MessageBox.INFO});return;}
//								if(!checkOrderDetail(ss,formV)){return;}
								var orderDetail = Ext.util.JSON.encode(ss);
								var order = Ext.util.JSON.encode(record);
								Ext.Ajax.request({
									url: PATH + '/selfOrder/updateOrder.do',
									params: { update_order: order, update_orderDetail : orderDetail},
									success : function(response) {
										var responseArray = Ext.util.JSON.decode(response.responseText); 
										 if(responseArray.success == true){
											 Ext.Ajax.request({
												url: PATH + '/contractOrder/CmprStockPrice.do',
												params: { conType:"contract", orderInforId : record.data.id},
												success : function(_response) {
													var _responseArray = Ext.util.JSON.decode(_response.responseText); 
													 if(_responseArray.success == true){
														 Ext.Msg.show({title:'价格提示',msg:"序列号为:"+ _responseArray.numStr+"产品的采购价格高于合同中采购价格",buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO,width: 300});
													 }
											}})

											 Ext.Msg.show({title:'成功提示',msg: responseArray.msg,buttons: Ext.Msg.OK,icon: Ext.MessageBox.INFO});
//											 this.grid.store.reload();
											 cut_tools.contract_order.index_grid.getStore().reload();
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
					items : [ {
								region: 'north',
								title: '加工订单编制界面',
								iconCls:'icon-grid',
								split: true,
								height : 220,
								minSize: 220,
								maxSize: 220,
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

Ext.ffc.contractOrderDetailUpdate = function(obj,ed,value,oldValue){
	//校验单价
		 var price = ed.editNode.cols['price']*1;
		if(!Ext.isNumber(price)) {
  				Ext.MessageBox.alert('系统提示', '单价必须为整数！');
  				ed.editNode.cols['price'] = oldValue;
  				ed.editNode.attributes['price'] = oldValue;
				ed.editNode.ui.setInnerHTMLValue('price',oldValue);
  				return;
  		}
		//校验采购数量
		var orderAmount = ed.editNode.cols['orderAmount']*1;
		if(!Ext.isNumber(orderAmount)) {
  				Ext.MessageBox.alert('系统提示', '采购数量必须为整数！');
  				ed.editNode.cols['orderAmount'] = oldValue;
  				ed.editNode.attributes['orderAmount'] = oldValue;
				ed.editNode.ui.setInnerHTMLValue('orderAmount',oldValue);
  				return;
  		}
		var remian_amount = ed.editNode.cols['remainAmount']*1;
	if(orderAmount>remian_amount+oldValue) {
  				Ext.MessageBox.alert('系统提示', '采购数量超出需采购数量!');
  				ed.editNode.cols['orderAmount'] = oldValue;
  				ed.editNode.attributes['orderAmount'] = oldValue;
				ed.editNode.ui.setInnerHTMLValue('orderAmount',oldValue);
  				return;
  		}
		else
		{
				ed.editNode.cols['remainAmount'] = remian_amount+oldValue*1-orderAmount*1;
  				ed.editNode.attributes['remainAmount'] =  remian_amount+oldValue*1-orderAmount*1;
				ed.editNode.ui.setInnerHTMLValue('remainAmount', remian_amount+oldValue*1-orderAmount*1);
		}

//alert(ed.editNode.firstChild.cols['orderAmount']);
	/**修改子节点的采购数量**/
	 ed.editNode.cascade(function(obj){
		 if(obj.cols['parentToolsId']!='root')
		 {
			oldAmount =  obj.cols['contractAmount']*1;
			orderAmount = obj.parentNode.cols['orderAmount']*1;
			obj.cols['orderAmount'] = oldAmount*orderAmount;
			obj.attributes['orderAmount'] = oldAmount*orderAmount;
			obj.ui.setInnerHTMLValue('orderAmount',oldAmount*orderAmount);
		 }
	});

	var prom = 0;
	var rat = obj.corder_form.getForm().getValues().taxRate;
	var overallRebate = obj.corder_form.getForm().getValues().overallRebate;
	if(rat == '' || rat == null || isNaN(rat))
	{
		rat = 0;
	}
	if(overallRebate == null)
	{
		overallRebate = 0;
	}
		ed.editNode.cols['productMoney'] = ed.editNode.cols['price']*ed.editNode.cols['orderAmount']*1; 
	    ed.editNode.attributes['productMoney'] = ed.editNode.cols['price']*ed.editNode.cols['orderAmount']*1;
		ed.editNode.ui.setInnerHTMLValue('productMoney',ed.editNode.cols['price']*ed.editNode.cols['orderAmount']*1);

    	 obj.corder_tree.getRootNode().cascade(function(obj){
			if(obj.id != 'root'&&obj.cols['price'])
			{
				 prom += obj.cols['price']*obj.cols['orderAmount']*1;
			}
		});
		var totalMoney = prom*rat*1 + prom*1;
		obj.corder_form.getForm().setValues({productMoney:prom.toFixed(2),totalMoney:(prom*rat*1 + prom*1).toFixed(2),finalMoney:(totalMoney*1*(1- overallRebate/100)).toFixed(2)});
		obj.corder_form.getForm().setValues({taxMoney:(totalMoney - prom*1).toFixed(2)});
	}


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
			var win = new Ext.ls.selfOrder.addWin({orderId:this.id,detailFlag:true,URL:Ext.ls.selfOrder.detailUrl});
			/**设置窗口的标题**/
			win.setTitle('查看加工订单明细');
			/**将store的数据加载到页面**/
			store.on('load',function(){
					win.form.getForm().loadRecord(store.getAt(0));
			},this);
			win.show();
	   }
   }
}

