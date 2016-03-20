	
/**
 * 合同订单
 */
Ext.namespace('Ext.ls.contractOrder');
/**详细列表url(添加)**/
Ext.ls.contractOrder.addUrl = PATH + "/contractOrder/contractDetailList.do";
/**详细列表url(修改)**/
Ext.ls.contractOrder.updateUrl = PATH + "/contractOrder/orderDetail.do";
/**详细列表url(查看明细)**/
Ext.ls.contractOrder.detailUrl = PATH + "/contractOrder/orderDetailsList.do"

/**
 * 产品储备订单
 */
Ext.namespace('Ext.ls.reserveOrder');
/**详细列表url(添加)**/
Ext.ls.reserveOrder.addUrl = PATH + "";
/**详细列表url(修改)**/
Ext.ls.reserveOrder.updateUrl = PATH + "/reserveOrder/orderDetail.do";
/**详细列表url(查看明细)**/
Ext.ls.reserveOrder.detailUrl = PATH + "/reserveOrder/orderDetailsList.do"

/**
 * 预定订单
 */
Ext.namespace('Ext.ls.scheduleOrder');
/**详细列表url(添加)**/
Ext.ls.scheduleOrder.addUrl = PATH + "/scheduleOrder/product.do?outStockType=5";
/**详细列表url(修改)**/
Ext.ls.scheduleOrder.updateUrl = PATH + "/scheduleOrder/OrderDetail.do?outStockType=5";
/**详细列表url(查看明细)**/
Ext.ls.scheduleOrder.detailUrl = PATH + "/scheduleOrder/OrderDetailList.do?outStockType=5"

/**
 * 试刀订单
 */
Ext.namespace('Ext.ls.tryOrder');
/**详细列表url(添加)**/
Ext.ls.tryOrder.addUrl = PATH + "/scheduleOrder/product.do?outStockType=6";
/**详细列表url(修改)**/
Ext.ls.tryOrder.updateUrl = PATH + "/scheduleOrder/OrderDetail.do?outStockType=6";
/**详细列表url(查看明细)**/
Ext.ls.tryOrder.detailUrl = PATH + "/scheduleOrder/OrderDetailList.do?outStockType=6"


/**
 * 加工订单
 */
Ext.namespace('Ext.ls.selfOrder');
/**详细列表url(添加)**/
Ext.ls.selfOrder.addUrl = PATH + "/selfOrder/partContractDetailList.do";
/**详细列表url(修改)**/
Ext.ls.selfOrder.updateUrl = PATH + "/selfOrder/orderDetail.do";
/**详细列表url(查看明细)**/
Ext.ls.selfOrder.detailUrl = PATH + "/selfOrder/OrderDetailList.do"

/**
 * 预定加工订单
 */
Ext.namespace('Ext.ls.scheduleSelfOrder');
/**详细列表url(添加)**/
Ext.ls.scheduleSelfOrder.addUrl = PATH + "/scheduleSelfOrder/product.do?outStockType=5";
/**详细列表url(修改)**/
Ext.ls.scheduleSelfOrder.updateUrl = PATH + "/scheduleSelfOrder/orderDetail.do?outStockType=5";
/**详细列表url(查看明细)**/
Ext.ls.scheduleSelfOrder.detailUrl = PATH + "/scheduleSelfOrder/orderDetail.do?outStockType=5"

/**
 * 试刀加工订单
 */
Ext.namespace('Ext.ls.trySelfOrder');
/**详细列表url(添加)**/
Ext.ls.trySelfOrder.addUrl = PATH + "/scheduleSelfOrder/product.do?outStockType=6";
/**详细列表url(修改)**/
Ext.ls.trySelfOrder.updateUrl = PATH + "/scheduleSelfOrder/orderDetail.do?outStockType=6";
/**详细列表url(查看明细)**/
Ext.ls.trySelfOrder.detailUrl = PATH + "/scheduleSelfOrder/orderDetail.do?outStockType=6"


	var contractOrderStore =  Ext.extend(Ext.data.JsonStore,{
		constructor : function(_cfg){
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		contractOrderStore.superclass.constructor.call(this, {
		url:PATH + "/contractOrder/contractOrder.do",
		root :'aa',
		fields: [
				{name: 'id', type: 'string',mapping:"id"},
				{name: 'orderCode', type: 'string',mapping:"orderCode"},
				{name: 'quotationCode', type: 'string',mapping:"quotationCode"},
				{name: 'quotationId', type: 'string',mapping:"quotationId"},
				{name: 'contractCode', type: 'string',mapping:"contractCode"},
				{name: 'currencyName' , type: 'string',mapping:"currencyName"},
				{name: 'orderDate', type: 'string',mapping:"orderDate"},
				{name: 'orderType', type: 'string',mapping:"orderType"},
				{name: 'status', type: 'string',mapping:"status"},
				{name: 'supplierName', type: 'string',mapping:"supplierName"},
				{name: 'supplierId', type: 'string',mapping:"supplierId"},
				{name: 'urgentLevel', type: 'string',mapping:"urgentLevel"},
				{name: 'contactPerson' , type: 'string',mapping:"contactPerson"},
				{name: 'totalMoney', type: 'string',mapping:"totalMoney"},
				{name: 'taxRate', type: 'string',mapping:"taxRate"},
				{name: 'productMoney', type: 'string',mapping:"productMoney"},
				{name: 'deliveryDate', type: 'string',mapping:"deliveryDate"},
				{name: 'mome', type: 'string',mapping:"mome"},
				{name: 'editDate', type: 'string',mapping:"editDate"},
				{name: 'userId', type: 'string',mapping:"userId"},
				{name: 'userName', type: 'string',mapping:"userName"},
				{name: 'currencyId', type: 'string',mapping:"currencyId"},
				{name: 'overallRebate', type: 'string',mapping:"overallRebate"},
				{name: 'finalMoney', type: 'string',mapping:"finalMoney"},
				{name: 'ownContactPerson' , type: 'string',mapping:"ownContactPerson"},
				{name: 'customerCode', type: 'string',mapping:"customerCode"},
				{name: 'customerName', type: 'string',mapping:"customerName"},
				{name: 'supplierOwnContactPerson', type: 'string',mapping:"supplierOwnContactPerson"},
				{name: 'companyName', type: 'string',mapping:"companyName"},
				{name: 'companyId', type: 'string',mapping:"companyId"},
				{name: 'supplierContactPerson', type: 'string',mapping:"supplierContactPerson"},
				{name: 'supplierPhone' , type: 'string',mapping:"supplierPhone"},
				{name: 'supplierFax', type: 'string',mapping:"supplierFax"},
				{name: 'qualityStandard', type: 'string',mapping:"qualityStandard"},
				{name: 'deliveryAddressType', type: 'string',mapping:"deliveryAddressType"},
				{name: 'trafficMode', type: 'string',mapping:"trafficMode"},
				{name: 'closingAccountModeId', type: 'string',mapping:"closingAccountModeId"},
				{name: 'closingAccountMode', type: 'string',mapping:"closingAccountMode"},
				{name: 'otherConvention', type: 'string',mapping:"otherConvention"},
				{name: 'defaultDuty', type: 'string',mapping:"defaultDuty"},
				{name: 'effectConditions', type: 'string',mapping:"effectConditions"},
				{name: 'deliveryAddress', type: 'string',mapping:"deliveryAddress"},
				{name: 'taxMoney', type: 'string',mapping:"taxMoney"}
			]
		})}
	});
	
	
	
	orderStatusCombox =	Ext.extend(Ext.form.ComboBox, {
		store : null,
		constructor : function(_cfg) {
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.store = new Ext.data.SimpleStore({
							fields : ['status', 'value'],
							data : [['编制',''],['编制', '0'],['编制', '1'],['编制', '2'],
							['编制', '3'],['提交订货', '6'], ['提交合同', '4'], ['已经生成合同', '5']]
						});
			StatusCombox.superclass.constructor.call(this, {
						fieldLabel : '状态',
						hiddenName : 'status',
						mode : 'local',
						displayField : 'status',
						valueField : 'value',
						//anchor:'90%',
						readOnly : true,
						frame : true,
						triggerAction : 'all',
						value : '0',
						store : this.store
			})
		}
	})


	orderUrgentLevelCombox =Ext.extend(Ext.form.ComboBox, {
		store : null,
		constructor : function() {
		this.store = new Ext.data.SimpleStore({
						fields : ['urgentLevel', 'abbr'],
						data : [['0', '一般'],['1', '紧急']]
					});
		orderUrgentLevelCombox.superclass.constructor.call(this, {
				fieldLabel: '紧急程度',
				hiddenName:'urgentLevel',
				mode : 'local',
				valueField:'urgentLevel',
				displayField:'abbr',
				typeAhead: true,
				mode: 'local',
				anchor:'100%',
				style: 'margin-top:1px;',
				readOnly:true,
				disabled:true
			})
		}
	});

	function checkOrderInfor(formV,form)
	{
		var bDate = Date.parseDate(formV.orderDate,'Y-m-d');
		var eDate = Date.parseDate(formV.deliveryDate,'Y-m-d');
		if(!form.form.isValid()){return;};
		if(formV.currencyId != undefined && formV.currencyId.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '请选择币别！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.urgentLevel != undefined && formV.urgentLevel.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '请选择紧急程度！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.orderDate != undefined && formV.orderDate.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '请选择订货日期！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.deliveryDate != undefined && formV.deliveryDate.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '请选择交货日期！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.taxRate != undefined && formV.taxRate.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '请选择税率！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.overallRebate != undefined && formV.overallRebate.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '请填写整体折扣！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.overallRebate != undefined && (formV.overallRebate<0||formV.overallRebate>=100))
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '整体折扣应大于等于0，小于100!',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.companyName != undefined && formV.companyName.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '请选择卖方名称！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.qualityStandard != undefined && formV.qualityStandard.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '质量标准不能为空！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.deliveryAddressType != undefined && formV.deliveryAddressType.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '交提货地点不能为空！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.trafficMode != undefined && formV.trafficMode.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '运输方式及费用不能为空！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.closingAccountMode != undefined && formV.closingAccountMode.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '结算方式不能为空！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.otherConvention != undefined && formV.otherConvention.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '其他约定事项不能为空！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.defaultDuty != undefined && formV.defaultDuty.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '合同违约责任不能为空！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		if(formV.effectConditions != undefined && formV.effectConditions.length<1)
		{
			Ext.Msg.show({
			   title: '系统提示',
			   msg: '合同生效条件不能为空！',
			   width: 300,
			   buttons: Ext.MessageBox.OK,
			   icon: Ext.MessageBox.INFO
			});
			return false;
		}
		return true;
	}

	function checkOrderDetail(childrenArray,form)
	{
		for(var i=0;i<childrenArray.length;i++)
		{

			var bDate = Date.parseDate(form.orderDate,'Y-m-d');
			var eDate = Date.parseDate(form.deliveryDate,'Y-m-d');
			var nDate = childrenArray[i].deliveryDate;
			if(childrenArray[i].deliveryDate == undefined)
			{
				Ext.Msg.show({
					   title: '系统提示',
					   msg: '产品交货日期不能为空!',
					   width: 300,
					   buttons: Ext.MessageBox.OK,
					   icon: Ext.MessageBox.INFO
					});
					return false;
			}
			else if(childrenArray[i].deliveryDate.length != undefined)
			{
				nDate = Date.parseDate(childrenArray[i].deliveryDate.substring(0,10),'Y-m-d');
			}
			else{
				childrenArray[i].deliveryDate = childrenArray[i].deliveryDate.format('Y-m-d');
			}
			if(nDate == null || nDate=='')
			{
				Ext.Msg.show({
				   title: '系统提示',
				   msg: '产品交货日期不能为空!',
				   width: 300,
				   buttons: Ext.MessageBox.OK,
				   icon: Ext.MessageBox.INFO
				});
				return false;
			}
		}
		return true;
	}


Ext.ffc.showOrderAccountInforWin = function(contractId,contractCode,customerName,customerCode,finalMoney,hidden){
		new Ext.ffc.ContractAccountWindow({contractType:1,contractId:contractId,contractCode:contractCode,customerName:customerName,customerCode:customerCode,finalMoney:finalMoney,hidden:hidden,titleDef:'付款'}).show();
}
Ext.ffc.showOrderInvoiceInforWin = function (contractInforId,contractCode,customerCode,hidden){
		Ext.Ajax.request({
			method: "post",
			params: null,
			url: PATH + "/contract/invoiceAction.do?ffc=getInvoiceInfor&contractInforId=" + contractInforId + "&customerCode=" + customerCode + "&invoiceType=1",
			success: function(response){

				eval(response.responseText);
				if(invoiceInfor == null){
					invoiceInfor = {memo:'',id:''};
				}
				new Ext.ffc.InvoiceEditWindow({
					invoiceMainInfor : {
						'contractId' : contractInforId,
						'contractCode'  : contractCode,
						'memo' : invoiceInfor.memo,
						'id' : invoiceInfor.id,
						'isHidden' : hidden,
						'invoiceType' : 1//0合同发票1订单发票
					},
					customerInfor : customerInfor
				}).show();	
			}
		});
}

function requestTotalDatas(params,form,callBackMethod){
		Ext.Ajax.request({
			url: PATH + '/contractOrder/OrderTotalMoneysAction.do?mydear=getOrderTotalMoneys',
			params: params,
			success : function(response) {
				 eval("var rt=" + response.responseText);
				 callBackMethod(rt);
			}
		});
}

//选择税率
function change_rate(form)
{
	var rat = form.getValues().taxRate;
	var overallRebate = form.getValues().overallRebate;
	if(rat == '' || rat == null || isNaN(rat))
	{
		rat = 0;
	}
	if(overallRebate == null)
	{
		overallRebate = 0;
	}
	if(form.getValues().productMoney.length<1)
	{
		form.setValues({productMoney:0}); 
	}
	var productMoney = form.getValues().productMoney;
	var totalMoney = productMoney*1+rat*productMoney*1;
	form.setValues({totalMoney:totalMoney.toFixed(2)});
	form.setValues({finalMoney:(totalMoney*1*(1- overallRebate/100)).toFixed(2)});
	var finalMoney = form.getValues().finalMoney;
	form.setValues({taxMoney:(totalMoney - productMoney).toFixed(2)});
}

//填写最终金额
function change_overallRebate(form,newValue)
{
	var overallRebate = newValue;
	if(overallRebate == null)
	{
	overallRebate = 0;
	}
	var totalMoney = form.getValues().totalMoney;
	form.setValues({finalMoney:(totalMoney*1*(1- overallRebate/100)).toFixed(2)});
	var productMoney = form.getValues().productMoney;
	form.setValues({taxMoney:(totalMoney - productMoney).toFixed(2)});
}

//删除详细
function delete_detail(form,store)
{
	var prom = 0;
	store.each(function(record){
		prom += (record.get('price')*1).toFixed(2)*record.get('orderAmount')*1;
//		prom += record.get('productMoney')*1;
	});
	var rat = form.getValues().taxRate;
	var overallRebate = form.getValues().overallRebate;
	if(rat == '' || rat == null || isNaN(rat))
	{
		rat = 0;
	}
	if(overallRebate == null)
	{
		overallRebate = 0;
	}
	var totalMoney = prom*rat*1 + prom*1;
	form.setValues({productMoney:prom.toFixed(2)});
	form.setValues({totalMoney:totalMoney.toFixed(2)});
	form.setValues({finalMoney:(totalMoney*1*(1- overallRebate/100)).toFixed(2)});
//	var productMoney = form.getValues().productMoney;
	form.setValues({taxMoney:(totalMoney - prom).toFixed(2)});
}


/**非标品查看附件窗口**/
onSlaveClick = function(_id) {
		var slaveWindow = new Slave.SlaveManageWindow({busId : _id, busType : 1});
		slaveWindow.show();
	}

Ext.ffc.orderCurrenyRateChangeCallBack = function(combox,rate) {
	var win = combox.ownerCt.ownerCt.ownerCt;
	var grid = win.grid;
	var store = grid.getStore();
	var sumPmoney = 0;
	store.each(function(record){
		var _price = record.get('price') * 1;
		var _productMoney = record.get('productMoney') * 1;
		var _orderAmount = record.get('orderAmount') * 1;
		if(!Ext.isNumber(_price)) {
			_price = 0;
		}
		if(!Ext.isNumber(_productMoney)) {
			_productMoney = 0;
		}
		if(!Ext.isNumber(_orderAmount)) {
			_orderAmount = 0;
		}
		_price = Math.round(_price * rate*100)/100;
		_productMoney = _price * _orderAmount;
		record.set('price',_price);
		record.set('productMoney',_productMoney.toFixed(2));
		sumPmoney += _productMoney;
	});
	var form = win.form.getForm();
	var fValues = form.getValues();
	sumPmoney = Math.round(sumPmoney * 100) / 100;
	form.setValues({"productMoney":sumPmoney});
	var _taxRate = fValues.taxRate;
	var _taxMoney = Math.round(_taxRate * sumPmoney*100)/100;
	form.setValues({"taxMoney":_taxMoney});
	form.setValues({"totalMoney":(_taxMoney + sumPmoney).toFixed(2)});
	var _overallRebate = fValues.overallRebate;
	var _finalMoney = (_taxMoney + sumPmoney) * ((100 -_overallRebate)/100) 
	form.setValues({"finalMoney":_finalMoney.toFixed(2)});
}