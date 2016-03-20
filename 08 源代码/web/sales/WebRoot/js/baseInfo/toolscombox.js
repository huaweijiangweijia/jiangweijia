Ext.namespace('Ext.zhj.protools');

// ---------------------产品组别信息，调用Ftl
// proTools_index内方法-------------------------------
Ext.zhj.protools.AutoCompleteCombo = Ext.extend(Ext.form.ComboBox, {
			store : null,
			flagName : null,
			constructor : function(_cfg) {
				if (_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);

				Ext.zhj.protools.AutoCompleteCombo.superclass.constructor.call(
						this, {
							store : this.store,
							// hiddenName : this.flagName,
							// valueField:this.flagName,
							allowBlank : false,
							hideTrigger : false,// 隐藏触发按钮
							displayField : this.flagName,
							typeAhead : true,// 当开始输入字符时，在指定的延迟之后会自动匹配剩下的内容，如果找到了匹配的内容则自动选中它
							forceSelection : true,// 限制选择的值必须是下拉列表中的值
							triggerAction : 'all',
							queryParam : this.flagName,// 发送至后台的查寻参数值
							selectOnFocus : true
							// 当获得焦点时立即选中输入栏中存在的所有文本
					})
			},

			/**
			 * 根据订单Id获取订单Record
			 * 
			 * @param {}
			 *            _id 订单Id
			 * @return {} 订单 Record
			 */
			getRecordById : function(_id) {
				if (Ext.isEmpty(_id)) {
					throw Error('');
				} else {
					return this.getStore().getById(_id);
				}
			}
		})

Ext.zhj.protools.ProSortStore = Ext.extend(Ext.data.JsonStore, {
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {}
		}
		Ext.apply(this, _cfg);

		Ext.zhj.protools.ProSortStore.superclass.constructor.call(this, {
					url : PATH
							+ '/baseInfo/getProSortCodeListAction.do',
					fields : ['id', 'sortCode'],
					root : 'proSort'
				})
	}
})

Ext.zhj.protools.ProSortCombo = Ext.extend(Ext.zhj.protools.AutoCompleteCombo,
		{
			constructor : function() {
				Ext.zhj.protools.ProSortCombo.superclass.constructor.call(this,
						{
							store : new Ext.zhj.protools.ProSortStore(),
							minChars : 2,
							hiddenName : 'sortCode',
							fieldLabel : '组别',
							valueField : 'sortCode',
							flagName : 'sortCode',
							emptyText : '请选择组别'
						})
			}
		})
// ---------------------------产品组别信息----------------------------------------
		
		


/**
 * 我方联系人
 * 
 * @class Ext.zhj.OwnContactPersonCombox
 * @extends Ext.form.ComboBox
 */
Ext.zhj.OwnContactPersonCombox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function(_cfg) {
				if(_cfg == null) {
					_cfg = {}
				}
				Ext.apply(this, _cfg);
				this.store = new Ext.data.JsonStore({
							url : PATH + '/baseInfo/getUserInforListAction.do',
							fields : ['id', 'userName', 'trueName'],
							root : 'userInfo'
						});
				this.store.on('load',function(){
					this.store.each(function(record){
						if(record.data.userName == "admin"||record.data.userName == "刘欣欣"||record.data.userName == "许丽霞"||record.data.userName == "黄培芬")
						{
							this.store.remove(record);
						}
					},this)
				},this);
				Ext.zhj.OwnContactPersonCombox.superclass.constructor.call(
						this, {
							fieldLabel : '我方联系人',
							hiddenName : 'ownContactPerson',
							mode : 'remote',
							displayField : 'trueName',
							valueField : 'trueName',
							width : this['width'] == null ? 128 : this['width'],
							readOnly : true,
							frame : true,
							allowBlank : false,
							triggerAction : 'all',
							emptyText : '请选择...',
							store : this.store

						});
			}
		});

/**
 * 客户信息
 */


customerStore = new Ext.data.JsonStore({
	url : PATH + '/baseInfo/customersListAction.do?method=assessment&start=0&limit=100',
	fields : ['customerCode', 'customerName'],
	root : 'customersList'
});
Ext.zhj.CustomerCombox = Ext.extend(Ext.form.ComboBox, {
	store : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {}
		}
		Ext.apply(this, _cfg);
		customerStore.load();
		Ext.zhj.OwnContactPersonCombox.superclass.constructor.call(
				this, {
					fieldLabel : '客户名称',
					hiddenName : 'custormerCode',
					mode : 'local',
					displayField : 'customerName',
					valueField : 'customerCode',
					width : this['width'] == null ? 250 : this['width'],
					frame : true,
					allowBlank : false,
					triggerAction : 'all',
					emptyText : '请选择...',
					store : customerStore,
			        allowBlank : false,
			        blankText : '请输入客户名称',
			        hideTrigger : true,//隐藏触发按钮
			        typeAhead: true,//当开始输入字符时，在指定的延迟之后会自动匹配剩下的内容，如果找到了匹配的内容则自动选中它
			        forceSelection: true,//限制选择的值必须是下拉列表中的值
			        triggerAction: 'all',
			        queryParam : 'customerName',//发送至后台的查寻参数值
			        emptyText:'请输入客户名称',
			        selectOnFocus:true,//当获得焦点时立即选中输入栏中存在的所有文本
			        listeners : {
			        	'keyup' : function(field,e) {
				        	if(field.getRawValue().length>0){
				        		this.store.load({params : { customerName : field.getRawValue() }});
				        	}
		        		}
		        	}
			       
				});
		}
})


/**
 * 供应商
 * 
 * @class StatusCombox
 * @extends Ext.form.ComboBox
 */

supplierStore = new Ext.data.JsonStore({
					url : PATH + '/baseInfo/supplierListAction.do?start=0&limit=100',
					fields : ['id', 'supplierName'],
					root : 'supplierList'
				});
Ext.zhj.SupplierCombox = Ext.extend(Ext.form.ComboBox, {
	store : null,
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {}
		}
		Ext.apply(this, _cfg);
		supplierStore.load();
		Ext.zhj.OwnContactPersonCombox.superclass.constructor.call(
				this, {
					fieldLabel : '供应商',
					hiddenName : 'supplierId',
					mode : 'local',
					displayField : 'supplierName',
					valueField : 'id',
					width : this['width'] == null ? 250 : this['width'],
					frame : true,
					allowBlank : false,
					triggerAction : 'all',
					emptyText : '请输入供应商名称',
					store : supplierStore,
					 hideTrigger : true,//隐藏触发按钮
			        typeAhead: true,//当开始输入字符时，在指定的延迟之后会自动匹配剩下的内容，如果找到了匹配的内容则自动选中它
			        forceSelection: true,//限制选择的值必须是下拉列表中的值
			        triggerAction: 'all',
			        queryParam : 'supplierName',//发送至后台的查寻参数值
			        emptyText:'请输入供应商名称',
			        selectOnFocus:true,//当获得焦点时立即选中输入栏中存在的所有文本
			        listeners : {
			        	'keyup' : function(field,e) {
				        	if(field.getRawValue().length>0){
				        		this.store.load({params : { supplierName : field.getRawValue() }});
				        	}
		        		}
		        	}

				});
		}
})


		
		/**
 * 供应商等级
 * 
 * @class StatusCombox
 * @extends Ext.form.ComboBox
 */
Ext.zhj.SupplierLevelCombox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function() {
				this.store = new Ext.data.SimpleStore({
							fields : ['level', 'value'],
							data : [['*', '1'], ['**', '2'], ['***', '3'],
									['****', '4'], ['*****', '5'],['', '0']]
						});
				Ext.zhj.SupplierLevelCombox.superclass.constructor.call(this, {
							fieldLabel : '供应商等级',
							hiddenName : 'level',
							mode : 'local',
							displayField : 'level',
							valueField : 'value',
							width : 128,
							readOnly : true,
							frame : true,
							triggerAction : 'all',
							emptyText : '请选择供应商等级',
							store : this.store
						})
			}
		})
		
		
/**
 * 库存中产品来源
 * 
 * @class ProductSourceCombox
 * @extends Ext.form.ComboBox
 */
Ext.zhj.ProductSourceCombox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function() {
				this.store = new Ext.data.SimpleStore({
							fields : ['id', 'value'],
							data : [['1', '采购'], ['2', '自制']]
						});
				Ext.zhj.ProductSourceCombox.superclass.constructor.call(this, {
							fieldLabel : '来源',
							hiddenName : 'productSource',
							mode : 'local',
							displayField : 'value',
							valueField : 'value',
							readOnly : true,
							frame : true,
							triggerAction : 'all',
							emptyText : '请选择产品来源',
							store : this.store
						})
			}
		})

/**
 * 客户信誉度标准
 * @class ReputationTypeCombox
 * @extends Ext.form.ComboBox
 */
Ext.zhj.ReputationTypeCombox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function(_cfg) {
				if(_cfg == null) {
					_cfg = {};
				}
				Ext.apply(this, _cfg);
				this.store = new Ext.data.SimpleStore({
							fields : ['id', 'value'],
							data : [['1', '合同金额'], ['2', '发票金额'],['3', '交货金额']]
						});
				Ext.zhj.ReputationTypeCombox.superclass.constructor.call(this, {
							fieldLabel : '客户信誉度标准',
							hiddenName : 'reputationType',
							mode : 'local',
							displayField : 'value',
							valueField : 'id',
							width : this['width'] == null ? 128 : this['width'],
							readOnly : true,
							frame : true,
							triggerAction : 'all',
							emptyText : '请选择标准',
							store : this.store
						})
			}
		})

/**
 * 历史面价时间
 * @class StatusCombox
 * @extends Ext.form.ComboBox
 */
Ext.zhj.SalesHistoryDateCombox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function() {
				this.store = new Ext.data.SimpleStore({
							fields : ['value'],
							data : [[ '2005'], [ '2006'], [ '2007'],
									[ '2008'], [ '2009'],['2010']]
						});
				Ext.zhj.SalesHistoryDateCombox.superclass.constructor.call(this, {
							fieldLabel : '面价时间',
							hiddenName : 'salesDate',
							mode : 'local',
							displayField : 'value',
							valueField : 'value',
							width : 128,
							readOnly : true,
							frame : true,
							triggerAction : 'all',
							emptyText : '请选择面价时间',
							store : this.store
						})
			}
		})


		
/**
 * 我方联系人
 * 
 * @class Ext.zhj.ProductBrankCombox
 * @extends Ext.form.ComboBox
 */
Ext.zhj.ProductBrankCombox = Ext.extend(Ext.form.ComboBox, {
			store : null,
			constructor : function() {
				this.store = new Ext.data.JsonStore({
							url : PATH + '/baseInfo/getProductBrankListAction.do',
							fields : ['id', 'name'],
							root : 'productBrank'
						});
				Ext.zhj.ProductBrankCombox.superclass.constructor.call(
						this, {
							fieldLabel : '品牌',
							hiddenName : 'productBrand',
							mode : 'remote',
							displayField : 'name',
							valueField : 'name',
							width : this['width'] == null ? 128 : this['width'],
							readOnly : true,
							frame : true,
							triggerAction : 'all',
							emptyText : '请选择...',
							store : this.store

						});
			}
		});




Ext.zhj.PayRiskCombox = Ext.extend(Ext.form.ComboBox, {
	store : null,
	constructor : function() {
		this.store = new Ext.data.SimpleStore({
					fields : ['staus', 'value'],
					data : [['高风险', '高风险'], ['中等', '中等'],['低风险', '低风险'],['无', '无']]
				});
		Ext.zhj.ProductSourceCombox.superclass.constructor.call(this, {
					fieldLabel : '付款风险',
					hiddenName : 'payRisk',
					mode : 'local',
					displayField : 'value',
					valueField : 'value',
					readOnly : true,
					frame : true,
					width:128,
					triggerAction : 'all',
					emptyText : '请选择...',
					store : this.store
				})
	}
})

Ext.zhj.PayPunctualityRateCombox = Ext.extend(Ext.form.ComboBox, {
	store : null,
	constructor : function() {
		this.store = new Ext.data.SimpleStore({
					fields : ['staus', 'value'],
					data : [['好', '好'], ['一般', '一般'],['差', '差']]
				});
		Ext.zhj.ProductSourceCombox.superclass.constructor.call(this, {
					fieldLabel : '付款准时几率',
					hiddenName : 'payPunctualityRate',
					mode : 'local',
					displayField : 'staus',
					valueField : 'value',
					readOnly : true,
					frame : true,
					width:128,
					triggerAction : 'all',
					emptyText : '请选择...',
					store : this.store
				})
	}
})

