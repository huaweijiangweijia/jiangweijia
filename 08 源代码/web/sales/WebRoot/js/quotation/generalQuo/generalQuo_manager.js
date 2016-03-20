//命名空间
Ext.namespace('Ext.ftl.generalQuo.manage');

//命名空间别名
Quomanager = Ext.ftl.generalQuo.manage;


//------------------------------------报价单编制--------------------------------------
Quomanager.NumberField = Ext.extend(Ext.form.NumberField, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		Quomanager.NumberField.superclass.constructor.call(this, {
			readOnly : true,x:860,y:3,width:170
		})
	},
	setValue : function(v){
		v = typeof v == 'number' ? v : parseFloat(String(v).replace(this.decimalSeparator, "."));
		v = isNaN(v) ? '' : v.toFixed(this.decimalPrecision).replace(".", this.decimalSeparator);
		return Ext.form.NumberField.superclass.setValue.call(this, v);
	}
})
Quomanager.QuotationForm = Ext.extend(Ext.FormPanel, {
	isReadOnly : false,
	currCombox : null,
	sallerCombox : null,
	taxRateCombox : null,
	paymentCombox : null,
	quoDateField : null,
	startDateField : null,
	endDateField : null,
	currIdField : null,
	willFormalDateField : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.currIdField = new Ext.form.TextField({
			xtype:'hidden',fieldLabel: 'currency',name: 'currency',hidden : true, hideLabel : true
		})
		this.currCombox = new CurrencyCombox({disabled : this.isReadOnly,x:600,y:93,width:170});
		this.taxRateCombox = new TaxrateCombox({disabled : this.isReadOnly,width:170,x:860,y:33, readOnly : true});
		this.sallerCombox = new SallerCombox({disabled : this.isReadOnly,x:600,y:3,width:170});
		this.paymentCombox = new Ext.zhj.PaymentConditionComboBox({width : 680,disabled : this.isReadOnly, x:90,y:153});
		this.quoDateField = new Ext.form.DateField({
			fieldLabel: '报价日期', format:'Y-m-d',name: 'quotationDate' ,x:90,y:33, width:170, format:'Y-m-d', 
			emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
		})
		this.startDateField = new Ext.form.DateField({
			fieldLabel: '报价有效期', format:'Y-m-d',name: 'validStartDate', format:'Y-m-d', x:90,y:123, width:170, 
			emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly,
			invalidText : '报价有效期开始日期不能晚于结束日期',value:new Date(),
			validator : function(_value) {
				var endDate = this.ownerCt.endDateField.getValue();
				if(!Ext.isEmpty(endDate)) {
					if(_value < endDate.format("Y-m-d")) {
						return true;
					} else { 
						return false;
					}
				} else {
					return true;
				}
			}
		})
		
		this.endDateField = new Ext.form.DateField({
			fieldLabel: '至', format:'Y-m-d',name: 'validEndDate', format:'Y-m-d', x:340,y:123, width:170, 
			emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly,
			invalidText : '报价有效期结束日期不能早于开始日期',
			validator : function(_value) {
				var startDate = this.ownerCt.startDateField.getValue();
				if(!Ext.isEmpty(startDate)) {
					if(_value > startDate.format("Y-m-d")) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		})
		
		//是否预订
		/*this.checkBox = new Ext.form.Checkbox({
			xtype:'textfield' ,name: 'willOrderExpected', inputValue : 1, 
			width : 170, readOnly : this.isReadOnly, allowBlank : false,x:790,y:183,
			disabled : this.isReadOnly,hidden : true, hideLabel : true
		})*/
		
		//预订转正日期
		this.willFormalDateField = new Ext.form.DateField({
			xtype:'datefield',name: 'willFormalDate', format:'Y-m-d',allowBlank : true,
			x:860,y:213, width:170,validationEvent : false,disabled : this.isReadOnly,
			hidden : true, hideLabel : true
		})
		
		this.currCombox.on({
			'change' : function() {
				this.currIdField.setValue(this.currCombox.curid);
			},scope : this
		})
		
		this.currCombox.store.on({
			'load' : function() {
				this.currIdField.setValue(this.currCombox.curid);
			},scope : this
		})
		
		this.startDateField.on({
			'change' : function(_filed, _newValue, _oldValue) {
				this.endDateField.validate();
			},scope : this
		})
		
		this.endDateField.on({
			'change' : function(_filed, _newValue, _oldValue) {
				this.startDateField.validate();
			},scope : this
		})
		
		this.lableStyle_ = "font-size:9pt;text-align:right;width:85px";
		var config = [
			//1
			{xtype:'label',text: '报价单号:',x:0,y:5,style:this.lableStyle_},
			{xtype:'textfield', readOnly : true, x:90,y:3, width:170,name: 'quotationCode'},
			{xtype:'label',text: '客户编号:',x:250,y:5,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerCode',readOnly : true,x:340,y:3,width:170},
			{xtype:'label',text: '卖方名称:',x:510,y:5,style:this.lableStyle_},
		    this.sallerCombox,
			{xtype:'label',text: '货品金额:',x:770,y:5,style:this.lableStyle_},
			//new Quomanager.NumberField({name: 'productMoney'}),
			{xtype:'numberfield',  name: 'productMoney',readOnly : true,x:860,y:3,width:170},
			//2
			{xtype:'label',text: '报价日期:',x:0,y:35,style:this.lableStyle_},
			this.quoDateField,
			{xtype:'label',text: '客户联系人:',x:250,y:35,style:this.lableStyle_},
			{xtype:'textfield',  name: 'cusContactPerson',x:340,y:33,width:170},
			{xtype:'label',text: '我方负责人:',x:510,y:35,style:this.lableStyle_},
		    {xtype:'textfield',  name: 'userName',readOnly : true,x:600,y:33,width:170},
			{xtype:'label',text: '税　　率:',x:770,y:35,style:this.lableStyle_},
			this.taxRateCombox,
			//3
			{xtype:'label',text: '紧急程度:',x:0,y:65,style:this.lableStyle_},
			new Ext.ffc.UrgentLevelCombox({x:90,y:63, width:170,disabled : this.isReadOnly}),
			{xtype:'label',text: '客户电话',x:250,y:65,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerPhone',x:340,y:63,width:170},
			{xtype:'label',text: '制 单 人:',x:510,y:65,style:this.lableStyle_},
			{xtype:'textfield', name: 'editorName',readOnly : true,x:600,y:63,width:170},
			{xtype:'label',text: '税　　金:',x:770,y:65,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'taxMoney',readOnly : true,x:860,y:63,width:170},
			//4
			{xtype:'label',text: '报价状态:',x:0,y:95,style:this.lableStyle_},
			{xtype:'textfield', readOnly : true, x:90,y:93, width:170,name: 'status'},
			//new Ext.ffc.ContractStatusComboBox({readOnly : true,disabled:true,x:90,y:93,width:170}),
			{xtype:'label',text: '客户传真:',x:250,y:95,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerFax',x:340,y:93,width:170},
			{xtype:'label',text: '币　别:',x:510,y:95,style:this.lableStyle_},
			this.currCombox,
			{xtype:'label',text: '税价合计:',x:770,y:95,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'totalMoney',readOnly : true,x:860,y:93,width:170},
			//5
			{xtype:'label',text: '报价有效期:始',x:0,y:125,style:this.lableStyle_},
			this.startDateField,
			{xtype:'label',text: '至:',x:250,y:125,style:this.lableStyle_},
			this.endDateField,
			{xtype:'label',text: '整单折扣(%):',x:770,y:125,style:this.lableStyle_},
			{xtype:'numberfield',name: 'overallRebate',emptyText : 0, readOnly : this.isReadOnly,
                   		allowDecimals : false,
                   		allowNegative : false,
                   		decimalPrecision : 0,
						minValue : 0,
						maxValue : 100,
						x:860,y:123,width:170,
                   		validator : function(_value) {
			           		if(_value >= 0 && _value <= 100) {
			           			return true;
			           		} else {
			           			return false;
			           		}
			           }
                   },
             //6
             {xtype:'label',text: '付款条件:',x:0,y:155,style:this.lableStyle_},
             this.paymentCombox,
             {xtype:'label',text: '最终金额:',x:770,y:155,style:this.lableStyle_},
             {xtype:'numberfield', name: 'finalMoney', allowBlank : false, x:860,y:153,width:170},
             //7
             {xtype:'label',text: '交货方式:',x:0,y:185,style:this.lableStyle_},
             {xtype:'textfield' ,name: 'deliveryType', width : 680, readOnly : this.isReadOnly, allowBlank : false,x:90,y:183},
            /* {xtype:'label',text: '是否预订:',x:770,y:185,style:this.lableStyle_,hidden : true, hideLabel : true},
             this.checkBox,*/
             //8
             {xtype:'label',text: '备注:',x:0,y:215,style:this.lableStyle_},
             {xtype:'textfield',name: 'memo', readOnly : this.isReadOnly,x:90,y:213, width : 680},
             {xtype:'label',text: '预计转正日期:',x:770,y:215,style:this.lableStyle_,hidden : true, hideLabel : true},
             this.willFormalDateField,
             //hidden
             {xtype:'hidden',fieldLabel: 'id',name: 'id',hidden : true, hideLabel : true},
             this.currIdField 
		];
		
		Quomanager.QuotationForm.superclass.constructor.call(this, {
			width : 1000,
            labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
            frame:true,labelWidth:75,monitorValid:false,
            layout : 'absolute',
            items : config
		})
	},
	
	changeStatus : function(value) {
		switch (value) {
			case 0 :
			return "编制";
			break;
			case 1 :
			return "待审批";
			break;
			case 2 :
			return "审批通过";
			break;
			case 3 :
			return "审批退回";
			break;
			case 4 :
			return "提交合同";
			break;
			case 5 :
			return "已经生成合同";
			break;
			default :
				return "编制";
		}
	},
	
	/**
	 * 设置表单的值
	 * @param {} _r
	 */
	setValues : function(_r) {
		Ext.Ajax.request({
			url: PATH + '/generalQuo/excelAction.do?method=getCurrencyByName',
			params: { currencyName: _r.data['currencyName'], currencyId : _r.data['currency']},
			success : function(response) {
				var record = Ext.decode(response.responseText);
				if(!Ext.isEmpty(record))
					this.currCombox.curRate = record.rate;							   	
			},scope : this
		});
		_r.set('status', this.changeStatus(_r.data['status']));
		this.getForm().loadRecord(_r);
	},
	
	/**
	 * 获取表单的值
	 * @return {}
	 */
	getValues : function() {
		return new Ext.data.Record(this.getForm().getValues());
	},
	
	/**
	 * 校验表单输入值是否合法
	 * @return {} 如果表单在客户端校验合法，返回true 
	 */
	validator : function() {
		var _overallRebate = this.getValues().data['overallRebate'];
		
		var startDate = this.startDateField.getValue();
		var endDate = this.endDateField.getValue();
		
		/*if(this.checkBox.getValue()) {
			if(this.willFormalDateField.getValue() == "") {
				Ext.Msg.show({
					title:'信息提示',
					msg: '预计转正日期不允许为空！',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.INFO
				});
				return false;
			}
		}*/
		
		if(!Ext.isEmpty(startDate) && !Ext.isEmpty(endDate)) {
			if(startDate.format("Y-m-d") > endDate.format("Y-m-d")) {
				return false;
			}
		}
		if(_overallRebate < 0 || _overallRebate > 100)
			return false;
		return this.getForm().isValid();
	}
})

//解决小数自动截最后0问题
/*Ext.override(Ext.form.NumberField, {
	setValue : function(v){
		v = typeof v == 'number' ? v : parseFloat(String(v).replace(this.decimalSeparator, "."));
		v = isNaN(v) ? '' : v.toFixed(this.decimalPrecision).replace(".", this.decimalSeparator);
		return Ext.form.NumberField.superclass.setValue.call(this, v);
	}
});
*/
Quomanager.ReserveQuotationForm = Ext.extend(Ext.FormPanel, {
	isReadOnly : false,
	currCombox : null,
	sallerCombox : null,
	taxRateCombox : null,
	paymentCombox : null,
	quoDateField : null,
	startDateField : null,
	endDateField : null,
	currIdField : null,
	willFormalDateField : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.currIdField = new Ext.form.TextField({
			xtype:'hidden',fieldLabel: 'currency',name: 'currency',hidden : true, hideLabel : true
		})
		this.currCombox = new CurrencyCombox({disabled : this.isReadOnly,x:600,y:93,width:170});
		this.taxRateCombox = new TaxrateCombox({disabled : this.isReadOnly,width:170,x:860,y:33});
		this.sallerCombox = new SallerCombox({disabled : this.isReadOnly,x:600,y:3,width:170});
		this.paymentCombox = new Ext.zhj.PaymentConditionComboBox({width : 680, allowBlank : false,disabled : this.isReadOnly, x:90,y:213,hidden : true, hideLabel : true});
		this.quoDateField = new Ext.form.DateField({
			fieldLabel: '报价日期', format:'Y-m-d',name: 'quotationDate' ,x:90,y:33, width:170, format:'Y-m-d', 
			emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
		})
		this.startDateField = new Ext.form.DateField({
			fieldLabel: '报价有效期', format:'Y-m-d',name: 'validStartDate', format:'Y-m-d', x:860,y:213, width:170, 
			emptyText:'', allowBlank : true, blankText:'该项为必填项!',disabled : this.isReadOnly,hidden : true, hideLabel : true,
			invalidText : '报价有效期开始日期不能晚于结束日期',value:new Date()
		})
		
		this.endDateField = new Ext.form.DateField({
			fieldLabel: '至', format:'Y-m-d',name: 'validEndDate', format:'Y-m-d', x:340,y:123, width:170, 
			emptyText:'', allowBlank : true, blankText:'该项为必填项!',disabled : this.isReadOnly,
			invalidText : '报价有效期结束日期不能早于开始日期',hidden : true, hideLabel : true
		})
		
		//是否预订
		/*this.checkBox = new Ext.form.Checkbox({
			xtype:'textfield' ,name: 'willOrderExpected', inputValue : 1, 
			width : 170, readOnly : this.isReadOnly, allowBlank : false,x:790,y:183,
			disabled : this.isReadOnly,hidden : true, hideLabel : true
		})*/
		
		//预订转正日期
		this.willFormalDateField = new Ext.form.DateField({
			xtype:'datefield',name: 'willFormalDate', format:'Y-m-d',allowBlank : true,
			x:90,y:123, width:170,validationEvent : false,disabled : this.isReadOnly
		})
		
		this.currCombox.on({
			'change' : function() {
				this.currIdField.setValue(this.currCombox.curid);
			},scope : this
		})
		
		this.currCombox.store.on({
			'load' : function() {
				this.currIdField.setValue(this.currCombox.curid);
			},scope : this
		})
		
		this.startDateField.on({
			'change' : function(_filed, _newValue, _oldValue) {
				this.endDateField.validate();
			},scope : this
		})
		
		this.endDateField.on({
			'change' : function(_filed, _newValue, _oldValue) {
				this.startDateField.validate();
			},scope : this
		})
		
		this.lableStyle_ = "font-size:9pt;text-align:right;width:85px";
		var config = [
			//1
			{xtype:'label',text: '报价单号:',x:0,y:5,style:this.lableStyle_},
			{xtype:'textfield', readOnly : true, x:90,y:3, width:170,name: 'quotationCode'},
			{xtype:'label',text: '客户编号:',x:250,y:5,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerCode',readOnly : true,x:340,y:3,width:170},
			{xtype:'label',text: '卖方名称:',x:510,y:5,style:this.lableStyle_},
		    this.sallerCombox,
			{xtype:'label',text: '货品金额:',x:770,y:5,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'productMoney',readOnly : true,x:860,y:3,width:170, 
				renderer : function(colValue, metadata, record){
					alert(colValue);
	        		return parseFloat(colValue).toFixed(2);
        	}},
			//2
			{xtype:'label',text: '预订日期:',x:0,y:35,style:this.lableStyle_},
			this.quoDateField,
			{xtype:'label',text: '客户联系人:',x:250,y:35,style:this.lableStyle_},
			{xtype:'textfield',  name: 'cusContactPerson',x:340,y:33,width:170},
			{xtype:'label',text: '我方负责人:',x:510,y:35,style:this.lableStyle_},
		    {xtype:'textfield',  name: 'userName',readOnly : true,x:600,y:33,width:170},
			{xtype:'label',text: '税　　率:',x:770,y:35,style:this.lableStyle_},
			this.taxRateCombox,
			//3
			{xtype:'label',text: '紧急程度:',x:0,y:65,style:this.lableStyle_},
			new Ext.ffc.UrgentLevelCombox({x:90,y:63, width:170,disabled : this.isReadOnly}),
			{xtype:'label',text: '客户电话',x:250,y:65,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerPhone',x:340,y:63,width:170},
			{xtype:'label',text: '制 单 人:',x:510,y:65,style:this.lableStyle_},
			{xtype:'textfield', name: 'editorName',readOnly : true,x:600,y:63,width:170},
			{xtype:'label',text: '税　　金:',x:770,y:65,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'taxMoney',readOnly : true,x:860,y:63,width:170},
			//4
			{xtype:'label',text: '报价状态:',x:0,y:95,style:this.lableStyle_},
			{xtype:'textfield', readOnly : true, x:90,y:93, width:170,name: 'status'},
			//new Ext.ffc.ContractStatusComboBox({readOnly : true,disabled:true,x:90,y:93,width:170}),
			{xtype:'label',text: '客户传真:',x:250,y:95,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerFax',x:340,y:93,width:170},
			{xtype:'label',text: '币　别:',x:510,y:95,style:this.lableStyle_},
			this.currCombox,
			{xtype:'label',text: '税价合计:',x:770,y:95,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'totalMoney',readOnly : true,x:860,y:93,width:170},
			//5
			{xtype:'label',text: '报价有效期:始',x:770,y:215,style:this.lableStyle_,hidden : true, hideLabel : true},
			this.startDateField,
			{xtype:'label',text: '至:',x:250,y:125,style:this.lableStyle_,hidden : true, hideLabel : true},
			this.endDateField,
			{xtype:'label',text: '整单折扣(%):',x:770,y:125,style:this.lableStyle_,hidden : true, hideLabel : true},
			{xtype:'numberfield',name: 'overallRebate',emptyText : 0, readOnly : this.isReadOnly,
                   		allowDecimals : false,
                   		allowNegative : false,
                   		decimalPrecision : 0,
						minValue : 0,
						maxValue : 100,hidden : true, hideLabel : true,
						x:860,y:123,width:170,
                   		validator : function(_value) {
			           		if(_value >= 0 && _value <= 100) {
			           			return true;
			           		} else {
			           			return false;
			           		}
			           }
                   },
             //6
             {xtype:'label',text: '付款条件:',x:0,y:215,style:this.lableStyle_,hidden : true, hideLabel : true},
             this.paymentCombox,
             {xtype:'label',text: '最终金额:',x:770,y:155,style:this.lableStyle_,hidden : true, hideLabel : true},
             {xtype:'numberfield', name: 'finalMoney', allowBlank : true, x:860,y:153,width:170,hidden : true, hideLabel : true},
             //7
             {xtype:'label',text: '交货方式:',x:0,y:185,style:this.lableStyle_,hidden : true, hideLabel : true},
             {xtype:'textfield' ,name: 'deliveryType', width : 680, readOnly : this.isReadOnly, allowBlank : true,x:90,y:183,hidden : true, hideLabel : true},
             /*{xtype:'label',text: '是否预订:',x:770,y:185,style:this.lableStyle_,hidden : true, hideLabel : true},
             this.checkBox,*/
             //8
             {xtype:'label',text: '备注:',x:0,y:125,style:this.lableStyle_},
             {xtype:'textfield',name: 'memo', readOnly : this.isReadOnly,x:90,y:123, width : 680},
             /*{xtype:'label',text: '预计转合同日期:',x:-10,y:125,style:"font-size:9pt;text-align:right;width:95px"},
             this.willFormalDateField,*/
             //hidden
             {xtype:'hidden',fieldLabel: 'id',name: 'id',hidden : true, hideLabel : true},
             this.currIdField
		];
		
		Quomanager.ReserveQuotationForm.superclass.constructor.call(this, {
			width : 1000,
            labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
            frame:true,labelWidth:75,monitorValid:false,
            layout : 'absolute',
            items : config
		})
	},
	
	changeStatus : function(value) {
		switch (value) {
			case 0 :
			return "编制";
			break;
			case 1 :
			return "待审批";
			break;
			case 2 :
			return "审批通过";
			break;
			case 3 :
			return "审批退回";
			break;
			case 4 :
			return "提交合同";
			break;
			case 5 :
			return "已经生成合同";
			break;
			default :
				return "编制";
		}
	},
	
	/**
	 * 设置表单的值
	 * @param {} _r
	 */
	setValues : function(_r) {
		Ext.Ajax.request({
			url: PATH + '/generalQuo/excelAction.do?method=getCurrencyByName',
			params: { currencyName: _r.data['currencyName'], currencyId : _r.data['currency']},
			success : function(response) {
				var record = Ext.decode(response.responseText);
				if(!Ext.isEmpty(record))
					this.currCombox.curRate = record.rate;							   	
			},scope : this
		});
		_r.set('status', this.changeStatus(_r.data['status']));
		this.getForm().loadRecord(_r);
	},
	
	/**
	 * 获取表单的值
	 * @return {}
	 */
	getValues : function() {
		return new Ext.data.Record(this.getForm().getValues());
	},
	
	/**
	 * 校验表单输入值是否合法
	 * @return {} 如果表单在客户端校验合法，返回true 
	 */
	validator : function() {
		//var _overallRebate = this.getValues().data['overallRebate'];
		
		/*var startDate = this.startDateField.getValue();
		var endDate = this.endDateField.getValue();*/
		/*if(this.willFormalDateField.getValue() == "") {
			Ext.Msg.show({
				title:'信息提示',
				msg: '预计转合同日期不允许为空！',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
			return false;
		}*/
		
		/*if(!Ext.isEmpty(startDate) && !Ext.isEmpty(endDate)) {
			if(startDate.format("Y-m-d") > endDate.format("Y-m-d")) {
				return false;
			}
		}*/
		/*if(_overallRebate < 0 || _overallRebate > 100)
			return false;*/
		return this.getForm().isValid();
	}
})

Quomanager.TestCutQuotationForm = Ext.extend(Ext.FormPanel, {
	isReadOnly : false,
	currCombox : null,
	sallerCombox : null,
	taxRateCombox : null,
	paymentCombox : null,
	quoDateField : null,
	startDateField : null,
	endDateField : null,
	currIdField : null,
	//checkBox : null,
	willFormalDateField : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.currIdField = new Ext.form.TextField({
			xtype:'hidden',fieldLabel: 'currency',name: 'currency',hidden : true, hideLabel : true
		})
		this.currCombox = new CurrencyCombox({disabled : this.isReadOnly,x:600,y:93,width:170});
		this.taxRateCombox = new TaxrateCombox({disabled : this.isReadOnly,width:170,x:860,y:33});
		this.sallerCombox = new SallerCombox({disabled : this.isReadOnly,x:600,y:3,width:170});
		this.paymentCombox = new Ext.zhj.PaymentConditionComboBox({width : 680,disabled : this.isReadOnly, x:90,y:213,hidden : true, hideLabel : true});
		this.quoDateField = new Ext.form.DateField({
			fieldLabel: '报价日期', format:'Y-m-d',name: 'quotationDate' ,x:90,y:33, width:170, format:'Y-m-d', 
			emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
		})
		this.startDateField = new Ext.form.DateField({
			fieldLabel: '报价有效期', format:'Y-m-d',name: 'validStartDate', format:'Y-m-d', x:90,y:123, width:170, 
			emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly,
			invalidText : '试刀开始日期不能晚于结束日期',value:new Date(),
			validator : function(_value) {
				var endDate = this.ownerCt.endDateField.getValue();
				if(!Ext.isEmpty(endDate)) {
					if(_value < endDate.format("Y-m-d")) {
						return true;
					} else { 
						return false;
					}
				} else {
					return true;
				}
			}
		})
		
		this.endDateField = new Ext.form.DateField({
			fieldLabel: '至', format:'Y-m-d',name: 'validEndDate', format:'Y-m-d', x:340,y:123, width:170, 
			emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly,
			invalidText : '试刀结束日期不能早于开始日期',
			validator : function(_value) {
				var startDate = this.ownerCt.startDateField.getValue();
				if(!Ext.isEmpty(startDate)) {
					if(_value > startDate.format("Y-m-d")) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
		})
		
		//是否预订
		/*this.checkBox = new Ext.form.Checkbox({
			xtype:'textfield' ,name: 'willOrderExpected', inputValue : 1, 
			width : 170, readOnly : this.isReadOnly, allowBlank : false,x:790,y:183,
			disabled : this.isReadOnly,hidden : true, hideLabel : true
		})*/
		
		//预订转正日期
		this.willFormalDateField = new Ext.form.DateField({
			xtype:'datefield',name: 'willFormalDate', format:'Y-m-d',allowBlank : true,
			x:860,y:213, width:170,validationEvent : false,disabled : this.isReadOnly,hidden : true, hideLabel : true
		})
		
		this.currCombox.on({
			'change' : function() {
				this.currIdField.setValue(this.currCombox.curid);
			},scope : this
		})
		
		this.currCombox.store.on({
			'load' : function() {
				this.currIdField.setValue(this.currCombox.curid);
			},scope : this
		})
		
		this.startDateField.on({
			'change' : function(_filed, _newValue, _oldValue) {
				this.endDateField.validate();
			},scope : this
		})
		
		this.endDateField.on({
			'change' : function(_filed, _newValue, _oldValue) {
				this.startDateField.validate();
			},scope : this
		})
		
		this.lableStyle_ = "font-size:9pt;text-align:right;width:85px";
		var config = [
			//1
			{xtype:'label',text: '申请单号:',x:0,y:5,style:this.lableStyle_},
			{xtype:'textfield', readOnly : true, x:90,y:3, width:170,name: 'quotationCode'},
			{xtype:'label',text: '客户编号:',x:250,y:5,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerCode',readOnly : true,x:340,y:3,width:170},
			{xtype:'label',text: '卖方名称:',x:510,y:5,style:this.lableStyle_},
		    this.sallerCombox,
			{xtype:'label',text: '货品金额:',x:770,y:5,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'productMoney',readOnly : true,x:860,y:3,width:170},
			//2
			{xtype:'label',text: '申请日期:',x:0,y:35,style:this.lableStyle_},
			this.quoDateField,
			{xtype:'label',text: '客户联系人:',x:250,y:35,style:this.lableStyle_},
			{xtype:'textfield',  name: 'cusContactPerson',x:340,y:33,width:170},
			{xtype:'label',text: '我方负责人:',x:510,y:35,style:this.lableStyle_},
		    {xtype:'textfield',  name: 'userName',readOnly : true,x:600,y:33,width:170},
			{xtype:'label',text: '税　　率:',x:770,y:35,style:this.lableStyle_},
			this.taxRateCombox,
			//3
			{xtype:'label',text: '紧急程度:',x:0,y:65,style:this.lableStyle_},
			new Ext.ffc.UrgentLevelCombox({x:90,y:63, width:170,disabled : this.isReadOnly}),
			{xtype:'label',text: '客户电话',x:250,y:65,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerPhone',x:340,y:63,width:170},
			{xtype:'label',text: '制 单 人:',x:510,y:65,style:this.lableStyle_},
			{xtype:'textfield', name: 'editorName',readOnly : true,x:600,y:63,width:170},
			{xtype:'label',text: '税　　金:',x:770,y:65,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'taxMoney',readOnly : true,x:860,y:63,width:170},
			//4
			{xtype:'label',text: '报价状态:',x:0,y:95,style:this.lableStyle_},
			{xtype:'textfield', readOnly : true, x:90,y:93, width:170,name: 'status'},
			//new Ext.ffc.ContractStatusComboBox({readOnly : true,disabled:true,x:90,y:93,width:170}),
			{xtype:'label',text: '客户传真:',x:250,y:95,style:this.lableStyle_},
			{xtype:'textfield',  name: 'customerFax',x:340,y:93,width:170},
			{xtype:'label',text: '币　别:',x:510,y:95,style:this.lableStyle_},
			this.currCombox,
			{xtype:'label',text: '税价合计:',x:770,y:95,style:this.lableStyle_},
			{xtype:'numberfield',  name: 'totalMoney',readOnly : true,x:860,y:93,width:170},
			//5
			{xtype:'label',text: '试刀开始日期:',x:-10,y:125,style:"font-size:9pt;text-align:right;width:95px"},
			this.startDateField,
			{xtype:'label',text: '试刀完成日期:',x:250,y:125,style:this.lableStyle_},
			this.endDateField,
			{xtype:'label',text: '整单折扣(%):',x:770,y:125,style:this.lableStyle_,hidden : true, hideLabel : true},
			{xtype:'numberfield',name: 'overallRebate',emptyText : 0, readOnly : this.isReadOnly,
                   		allowDecimals : false,
                   		allowNegative : false,
                   		decimalPrecision : 0,
						minValue : 0,
						maxValue : 100,hidden : true, hideLabel : true,
						x:860,y:123,width:170,
                   		validator : function(_value) {
			           		if(_value >= 0 && _value <= 100) {
			           			return true;
			           		} else {
			           			return false;
			           		}
			           }
                   },
             //6
             {xtype:'label',text: '付款条件:',x:0,y:215,style:this.lableStyle_,hidden : true, hideLabel : true},
             this.paymentCombox,
             {xtype:'label',text: '最终金额:',x:770,y:155,style:this.lableStyle_,hidden : true, hideLabel : true},
             {xtype:'numberfield', name: 'finalMoney', allowBlank : true, x:860,y:153,width:170,hidden : true, hideLabel : true},
             //7
             {xtype:'label',text: '交货方式:',x:0,y:185,style:this.lableStyle_,hidden : true, hideLabel : true},
             {xtype:'textfield' ,name: 'deliveryType', width : 680, readOnly : this.isReadOnly, allowBlank : true,x:90,y:183,hidden : true, hideLabel : true},
             /*{xtype:'label',text: '是否预订:',x:770,y:185,style:this.lableStyle_,hidden : true, hideLabel : true},
             this.checkBox,*/
             //8
             {xtype:'label',text: '备注:',x:0,y:155,style:this.lableStyle_},
             {xtype:'textfield',name: 'memo', readOnly : this.isReadOnly,x:90,y:153, width : 680},
             {xtype:'label',text: '转合同日期:',x:770,y:215,style:"font-size:9pt;text-align:right;width:95px",hidden : true, hideLabel : true},
             this.willFormalDateField,
             //hidden
             {xtype:'hidden',fieldLabel: 'id',name: 'id',hidden : true, hideLabel : true},
             this.currIdField
		];
		
		Quomanager.TestCutQuotationForm.superclass.constructor.call(this, {
			width : 1000,
            labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
            frame:true,labelWidth:75,monitorValid:false,
            layout : 'absolute',
            items : config
		})
	},
	
	changeStatus : function(value) {
		switch (value) {
			case 0 :
			return "编制";
			break;
			case 1 :
			return "待审批";
			break;
			case 2 :
			return "审批通过";
			break;
			case 3 :
			return "审批退回";
			break;
			case 4 :
			return "提交合同";
			break;
			case 5 :
			return "已经生成合同";
			break;
			default :
				return "编制";
		}
	},
	
	/**
	 * 设置表单的值
	 * @param {} _r
	 */
	setValues : function(_r) {
		Ext.Ajax.request({
			url: PATH + '/generalQuo/excelAction.do?method=getCurrencyByName',
			params: { currencyName: _r.data['currencyName'], currencyId : _r.data['currency']},
			success : function(response) {
				var record = Ext.decode(response.responseText);
				if(!Ext.isEmpty(record))
					this.currCombox.curRate = record.rate;							   	
			},scope : this
		});
		_r.set('status', this.changeStatus(_r.data['status']));
		this.getForm().loadRecord(_r);
	},
	
	/**
	 * 获取表单的值
	 * @return {}
	 */
	getValues : function() {
		return new Ext.data.Record(this.getForm().getValues());
	},
	
	/**
	 * 校验表单输入值是否合法
	 * @return {} 如果表单在客户端校验合法，返回true 
	 */
	validator : function() {
		//var _overallRebate = this.getValues().data['overallRebate'];
		
		var startDate = this.startDateField.getValue();
		var endDate = this.endDateField.getValue();
		
		/*if(this.checkBox.getValue()) {
			if(this.willFormalDateField.getValue() == "") {
				Ext.Msg.show({
					title:'信息提示',
					msg: '预计转正日期不允许为空！',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.INFO
				});
				return false;
			}
		}*/
		
		if(!Ext.isEmpty(startDate) && !Ext.isEmpty(endDate)) {
			if(startDate.format("Y-m-d") > endDate.format("Y-m-d")) {
				return false;
			}
		}
		/*if(_overallRebate < 0 || _overallRebate > 100)
			return false;*/
		return this.getForm().isValid();
	}
})

Quomanager.onSlaveClick = function(_id) {
	var slaveWindow = new Slave.SlaveManageWindow({busId : _id, busType : 1});
	slaveWindow.show();
}

Quomanager.NorthPanel = Ext.extend(Ext.Panel, {
	quotationForm : null,
	isReadOnly : false,
	quoType : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.quotationForm = this.buildFormPanel(this.quoType);
		var _height = 280;
		if(this.quoType == 3 || this.quoType == 4){
			_height = 220;
		}
			
		Quomanager.NorthPanel.superclass.constructor.call(this, {
			region: 'north',
            iconCls:'icon-grid',
            title: this.quoType == 4 ? '试刀申请信息' : '报价单信息',
            split: true,
            width: 200,
            layout : 'fit',
            height : _height,
            minSize: 175,
            maxSize: 575,
            collapsible: true,
            margins: '5 5 5 5',
            items : [this.quotationForm]
		})
	},
	
	buildFormPanel : function(_quoType) {
		switch (_quoType) {
			case 0 :
			return new Quomanager.QuotationForm({isReadOnly : this.isReadOnly});
			break;
			case 3 :
			return new Quomanager.ReserveQuotationForm({isReadOnly : this.isReadOnly});
			break;
			case 4 :
			return new Quomanager.TestCutQuotationForm({isReadOnly : this.isReadOnly});
		}
	}
})

/*Quomanager.CenterPanel = Ext.extend(Ext.Panel, {
	loaderUrl : null,
	productTree : null,
	customerRecord : null,
	constructor : function(_cfg) {
		if(_cfg  == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.productTree = new Quomanager.ProductsTree({
			loaderUrl : this.loaderUrl,
			customerRecord : this.customerRecord
		});
		Quomanager.CenterPanel.superclass.constructor.call(this, {
			region: 'center',
            //contentEl: 'grid',
            split: true,
            height: 100,
            minSize: 100,
            layout : 'fit',
            maxSize: 200,
            collapsible: true,
            //title: 'South',
            margins: '-5 5 5 5',
            items : [this.productTree]	
		})
	}
})*/

/**
 * 报价单编制窗口
 * @class Quomanager.MangerWindow
 * @extends Ext.Window
 */
Quomanager.MangerWindow = Ext.extend(Ext.Window, {
	isReadOnly : false,
	northPanel : null,
	centerPanel : null,
	loaderUrl : null,
	_treeEdit : null,
	customerRecord : null,
	insertDeletes : null,
	loadMarsk : null,
	quoType : null,
	_grid : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.northPanel = new Quomanager.NorthPanel({isReadOnly : this.isReadOnly, quoType : this.quoType});
		/*this.centerPanel = new Quomanager.CenterPanel({
			loaderUrl : this.loaderUrl,
			customerRecord : this.customerRecord
		});*/
		//报价产品Grid开始
		this._grid = new QuotationManager.productsGrid({
			loaderUrl : this.loaderUrl,
			customerRecord : this.customerRecord,
			quotationForm : this.northPanel.quotationForm
		})
		//报价产品Grid结束
		/*var sm = this.centerPanel.productTree.getSelectionModel()
		if(sm){
			sm.on('beforeselect',function(thisObj, bNode, aNode){
				var parentId = bNode.parentNode.id;
				if(parentId != 'root'){
				    return false;
				}
				return true;
			});
		}
		
		this._treeEdit = new Ext.tree.ColumnTreeEditor(this.centerPanel.productTree,{
			completeOnEnter: true,
			autosize: true,
			ignoreNoChange: true,
			listeners : {
				specialkey : Ext.ffc.gridTreeEditorkeyMove.moveCallBack
		    }
		});*/
		this.insertDeletes = [];
		Quomanager.MangerWindow.superclass.constructor.call(this, {
			title: this['title'],  
			width:Ext.getBody().getWidth()-100,  
			height:600,  
			plain:true,
			closable : true,
			//modal : true,
			maximizable : true,
			constrainHeader : true,
			closeAction:'hide',
			layout:"border",
			listeners : {
				'render' : function() {
					fn : this.handlerShow();
				},scope : this
			},
			items : [this.northPanel, this._grid]
		})
		this.addEvents('onsubmitsuccess');
	},
	
	ajaxPost : function(postUrl, parmStr1, parmStr2, _ids) {
		var isAdd = false;
		if(Ext.isEmpty(_ids)) {
			isAdd = true;
			_ids = Ext.encode({});
		}
		//alert(parmStr2);alert(this.quoType);return;
		Ext.Ajax.request({
			url: postUrl,
			params: { quoProduct: parmStr1, quoForm : parmStr2, ids : _ids, quoType : this.quoType },
			success : function(response) {
				var responseArray = Ext.util.JSON.decode(response.responseText); 
											   	
				if(responseArray.success == true){
					Ext.Msg.show({
						title:'成功提示',
						msg: responseArray.msg,
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.INFO
					});
					
					if(isAdd) {
						this.hide();
					} else {
						/*var rootNode = this.centerPanel.productTree.getRootNode();
						rootNode.reload();*/
						this._grid.reload();
					}
					this.fireEvent('onsubmitsuccess');
					this.loadMarsk.hide();
					this.insertDeletes = [];
				} else {
					this.loadMarsk.hide();
					Ext.Msg.show({
						title:'错误提示',
						msg: responseArray.msg,
						buttons: Ext.Msg.OK,
						icon: Ext.MessageBox.ERROR
					});
				} 
			},scope : this
		});
	},
	
	handlerShow : function() {
		//var _qTree = this.centerPanel.productTree;
		var _quotationForm = this.northPanel.quotationForm;
		var overallRebate = _quotationForm.findByType('numberfield')[3];
		
		//整单折扣处理
		overallRebate.on("change", function() {
			var _tMoney = _quotationForm.findByType('numberfield')[2].getValue();
			var _finRebat = this.getValue();
			if(_finRebat == "") {
				_finRebat = 0;
			}
			var finMoney = parseFloat(_tMoney * (100-_finRebat)/100).toFixed(2);
						
			_quotationForm.findByType('numberfield')[4].setValue(finMoney);
		})
					
		var _taxCombox = _quotationForm.taxRateCombox;//税率
		var _currCombox = _quotationForm.currCombox;//币别
		var _ed = null;
		var _value = null;
		var _oldValue = null;
		
		//税率处理
		_taxCombox.on("change", function() {
			/*var rootNode = _qTree.getRootNode();
			var editFiled = this._treeEdit.ffcFiled;
			rootNode.eachChild(function(curNode) {
				editFiled.editNode = curNode;
				this._treeEdit.fireEvent('fccAfterUpdateNodeEvent', this,editFiled,_value,_oldValue);
			},this)*/
			
			var _store = this._grid.store;
			_store.each(function(record) {
				this._grid.calculate(record);
			}, this)
			
		},this)
		
		//汇率处理
		_currCombox.on("change", function(_field, _newValue, oldValue) {
			/*var rootNode = _qTree.getRootNode();
			var editFiled = this._treeEdit.ffcFiled;
			rootNode.eachChild(function(curNode) {
				editFiled.editNode = curNode;
				this._treeEdit.fireEvent('fccAfterUpdateNodeEvent', this, editFiled, _value, _oldValue, _field.rate);
			},this)*/
			
			var _store = this._grid.store;
			_store.each(function(record) {
				this._grid.calculate(record,_field.rate);
			}, this)
		},this)
		
		//报价单Grid产品事件
		this._grid.on({
			'onaddnode' : function(_grid, _record) {
				//导出预订报价单产品添加到普通报价单后，重新计算报价单产品金额
				this._grid.calculate4quo();
			},
			'oninsertdelete' : function(grid, _node) {
				this.insertDeletes.push(_node);
			},scope : this
 		})
		
		/*//新结点加入处理
		_qTree.on('onaddnode', function(_tree, _node) {
			var editFiled = this._treeEdit.ffcFiled;
			editFiled.editNode = _qTree.getNodeById(_node.id);
			this._treeEdit.fireEvent('fccAfterUpdateNodeEvent', this,editFiled,_node.amount,_oldValue);
		},this)
		//报价产品删除
		_qTree.on('ondelete', function() {
			var _taxRate = _taxCombox.getValue();//税率
			var rootNode = _qTree.getRootNode();
			//_quForm = this.northPanel.quotationForm;
			calculateOnDelete(rootNode,_taxRate, _quotationForm);
		},this)
		
		_qTree.on('oninsertdelete', function(_tree, _node) {
			var _taxRate = _taxCombox.getValue();//税率
			var rootNode = _qTree.getRootNode();
			calculateOnDelete(rootNode,_taxRate, _quotationForm);
			this.insertDeletes.push(_node);
		},this)*/
		
		//复制报价单产品加载后触发事件
		if(this.isCopy) {
			/*_qTree.getLoader().on('load', function() {
				var _taxRate = _taxCombox.getValue();//税率
				var rootNode = _qTree.getRootNode();
				calculateOnDelete(rootNode,_taxRate, _quotationForm);
			})*/
			
			this._grid.store.on({
				'load' : function() {
					this._grid.calculate4quo();
				},scope : this
			})
		}
		
		/*this._treeEdit.addEvents("fccAfterUpdateNodeEvent");
						    
		this._treeEdit.on("fccAfterUpdateNodeEvent",function(obj,ed,value,oldValue,_rate){
			if(obj.editColIndex == 'projectCode') return;
			if(obj.editColIndex == 'memo') return;
			if(obj.editColIndex == 'workshop') return;
			if(obj.editColIndex == 'reportCode') return;
			_ed = ed; _value = value; _oldValue = oldValue;
			var _taxRate = _taxCombox.getValue();
			var rootNode = _qTree.getRootNode();
			_quForm = this.northPanel.quotationForm;
			calculate(rootNode, _taxRate, _quForm, obj,ed,value,oldValue,_rate);
		},this);*/
	}
})

/**
 * 报价单添加窗口
 * @class Quomanager.AddWindow
 * @extends Quomanager.MangerWindow
 */
Quomanager.AddWindow = Ext.extend(Quomanager.MangerWindow, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		
		Quomanager.AddWindow.superclass.constructor.call(this, {
			title : this.quoType == 4 ? '添加试刀申请' : '添加报价单',
			modal : true,
			buttons : [{
				text : "保存",
				handler : function() {
					fn : this.onAddSubmit();		 		
				},
				scope : this
			  },{
				text : "取消",
				handler : function() {
					this.hide();
				},
				scope : this
			}]
		})
	},
	
	onAddSubmit : function() {
		var _store = this._grid.store;
		/*var rootCode = this.centerPanel.productTree.getRootNode();*/
		try {
			//this.centerPanel.productTree.validator();
			this._grid.validator();
		} catch(_e) {
			Ext.Msg.show({
				title:'信息提示',
				msg: _e.message,
				buttons: Ext.Msg.OK,
				width : 200,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		
		if(!this.northPanel.quotationForm.validator())
			return;
		var record = new Ext.data.Record(this.northPanel.quotationForm.getForm().getValues());
		record.set('quotationType', this.quoType);
		var _tempArr = [];
	/*	rootCode.eachChild(function(curNode) {
			_tempArr.push(Ext.tree.toNewTreeNode(curNode.attributes,{},false))
		})*/
		_store.each(function(_record) {
			_tempArr.push(_record.data)
		}) 
		if(_tempArr.length == 0) {
			Ext.Msg.show({
				title:'信息提示',
				msg: this.quoType == 4 ? '请添加试刀产品' : '请添加报价产品！',
				buttons: Ext.Msg.OK,
				width : 200,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		this.loadMarsk = new Ext.LoadMask(this.getEl(), {
		     msg : '正在保存数据，请稍候。。。。。。',
		     removeMask : true// 完成后移除
		 });
		this.loadMarsk .show(); //显示
		var parmStr1 = Ext.encode(_tempArr);
		var parmStr2 = Ext.util.JSON.encode(record);
		//alert(Ext.encode(this.northPanel.quotationForm.getValues().data));return;
		//alert(parmStr1);return;
		this.ajaxPost(PATH + '/generalQuo/addGeneralQuoAction.do', parmStr1, parmStr2);
	}
})

/**
 * 报价单修改窗口
 * @class Quomanager.ModifyWindow
 * @extends Quomanager.MangerWindow
 */
Quomanager.ModifyWindow = Ext.extend(Quomanager.MangerWindow, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		Quomanager.ModifyWindow.superclass.constructor.call(this, {
			title : this.quoType == 4 ? '修改试刀申请' : '修改报价单',
			loaderUrl : Quomanager.ModifyWindow.LOADER_URL,
			buttons : [{
				text : "保存",
				handler : function() {
					fn : this.onAddSubmit();		 		
				},
				scope : this
			  },{
				text : "取消",
				handler : function() {
					this.hide();
				},
				scope : this
			}]
		})
	},
	
	onAddSubmit : function() {
		if(!this.northPanel.quotationForm.validator())
			return;
		var _store = this._grid.store;
		/*var rootCode = this.centerPanel.productTree.getRootNode();*/
		try {
			//this.centerPanel.productTree.validator();
			  this._grid.validator();
		} catch(_e) {
			Ext.Msg.show({
				title:'信息提示',
				msg: _e.message,
				buttons: Ext.Msg.OK,
				width : 200,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		this.loadMarsk = new Ext.LoadMask(this.getEl(), {
		     msg : '正在修改数据，请稍候。。。。。。',
		     removeMask : true// 完成后移除
		 });
		this.loadMarsk .show(); //显示
		var record = new Ext.data.Record(this.northPanel.quotationForm.getForm().getValues());
		var _tempArr = [];
		/*rootCode.eachChild(function(curNode) {
			_tempArr.push(Ext.tree.toNewTreeNode(curNode.attributes,{},true,['quotationProjectSortId']))
		})*/
			
		_store.each(function(_record) {
			_tempArr.push(_record.data)
		})
		
		var parmStr1 = Ext.encode(_tempArr);//alert(parmStr1);return;
		/*if(record.get('willOrderExpected') == undefined)
		{
			record.set('willOrderExpected',0);
		}*/
		
		var parmStr2 = Ext.util.JSON.encode(record);//alert(parmStr2);return;
		var _insertDeletes = this.insertDeletes;
		var _ids = Ext.encode(_insertDeletes)
		this.ajaxPost(PATH + '/generalQuo/updateQuoAction.do', parmStr1, parmStr2, _ids);
		
		
	}
})

/**
 * 报价单明细窗口
 * @class Quomanager.DetailWindow
 * @extends Quomanager.MangerWindow
 */
Quomanager.DetailWindow = Ext.extend(Quomanager.MangerWindow, {
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		Quomanager.DetailWindow.superclass.constructor.call(this, {
			loaderUrl : Quomanager.DetailWindow.LOADER_URL,
			isReadOnly : true,
			buttons : [{
				text : "关闭",
				handler : function() {
					this.hide();
				},
				scope : this
			}]
		})
	}
})

Quomanager.ModifyWindow.LOADER_URL = PATH + '/generalQuo/getQuoDetailAction.do';
Quomanager.DetailWindow.LOADER_URL = PATH + '/generalQuo/getQuoDetailAction.do';