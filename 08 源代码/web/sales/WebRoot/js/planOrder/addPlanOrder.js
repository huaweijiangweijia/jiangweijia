
	var pOAddTree_Check = new Ext.grid.CheckboxSelectionModel();
	var pOAddTree =  Ext.extend(Ext.grid.EditorGridPanel,{
		contractCode:null,
		supplierId:null,
		productBrand:null,
		store:null,
		pIdArray:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
		Ext.apply(this, _cfg);
		var proxy = new Ext.data.HttpProxy({url: PATH + ""});
		var Bill = Ext.data.Record.create([
										{name: 'productName' , type: 'string',mapping:"productName"},
										{name: 'brandCode', type: 'string',mapping:"brandCode"},
										{name: 'productCode', type: 'int',mapping:"productCode"},
										{name: 'productUnit', type: 'string',mapping:"productUnit"},
										{name: 'orderAmount', type: 'float',mapping:"orderAmount"},
										{name: 'productBrand' , type: 'string',mapping:"productBrand"},
										{name: 'price', type: 'float',mapping:"price"},
										{name: 'parentToolsId', type: 'string',mapping:"parentToolsId"},
										{name: 'toolsId', type: 'string',mapping:"toolsId"},
										{name: 'leaf', type: 'string',mapping:"leaf"},
										{name: 'deliveryDate', type: 'string',mapping:"deliveryDate"},
										{name: 'id', type: 'string',mapping:"id"}
										]);
		var reader = new Ext.data.JsonReader({ totalProperty: "totalProperty",root: "root"}, Bill);
		this.store = new Ext.data.Store({
			proxy: proxy,
			reader: reader
		});
		pOAddTree.superclass.constructor.call(this, {
			clicksToEdit: 1,
			frame:true,
			sm:pOAddTree_Check,
			layout:'fit',
			store:this.store,
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
					if(e.record.get('orderAmount')>e.record.get('remainAmount'))
					{
						Ext.MessageBox.alert('系统提示', '采购数量必须小于剩余数量！');
						e.record.set('orderAmount',e.originalValue);
						return
					}
					e.record.set('productMoney',(e.record.get('orderAmount')*e.record.get('price')*1).toFixed(2));
					delete_detail(this.ownerCt.ownerCt.nav2.addGrid.getForm(),this.store);
				},scope:this
			},
			columns:[
					 new Ext.grid.RowNumberer(),
					pOAddTree_Check,
					{header:'名称',width:125,dataIndex:'productName',sortable:true},
					{header:'工具牌号',width:190,dataIndex:'brandCode',sortable:true},
					{header:'计量单位',width:60,dataIndex:'productUnit',sortable:true},
					{header:'单价',width:70,dataIndex:'price',editor: new Ext.form.NumberField({
						   allowBlank: false,
						   allowNegative: false,
						   style: 'text-align:left'
						}),
						listeners : {
							focus : function(f){
								f.selectText(0,f.getValue().length);
							}
						}
					},
					{header:'品牌',width:80,dataIndex:'productBrand',sortable:true},
					{header:'采购数量',width:70,dataIndex:'orderAmount',sortable:true},
					{header:'货品金额',width:80,dataIndex:'productMoney',sortable:true},
					{header:'交货日期',width:100,dataIndex:'deliveryDate'},
					{header:'货品工具主键',width:100,hidden : true,dataIndex:'toolsId',sortable:true},
					{header:'货品工具父节点id',width:100,hidden : true,dataIndex:'parentToolsId',sortable:true},
					{header:'货品工具叶子节点',width:100,hidden : true,dataIndex:'leaf',sortable:true},
					{header:'货品编号',width:100,dataIndex:'productCode',sortable:true}
			],
			tbar : [{
					text : "添加",
					iconCls:'icon-add',
					handler : function() {
						var store = this.store;
						var pIdArray = [];
						var array = [];
						var win = new pOProductWin({
						supplierId:this.ownerCt.ownerCt.nav2.addGrid.getForm().getValues().supplierId,
							callBackMethod:function(data){
								var array = new Array();
								var flag_color = false;
									//消除重复
									if(store.data.length>0)
									{
										var tem = store.data;
										for(var k=0;k<tem.length;k++)
										{
											for(var m=0;m<data.length;m++)
											{
												if(store.getAt(k).get('pid').length>1)
												{
													var te = store.getAt(k).get('pid');
													for(var n=0;n<te.length;n++)
													{
														if(data[m] != undefined && te[n] == data[m].get('rid'))
														{
															data[m].set('style',1);
															flag_color = true;
															data.splice(m,1);
														}
													}
												}
												else
												{
													if(store.getAt(k).get('pid')[0] == data[m].get('rid'))
													{
														data[m].set('style',1);
														flag_color = true;
														data.splice(m,1);
													}
												}
											}
										}
									}
									if(data.length>0)
									{
										for(var i=0;i<data.length;i++)
										{
											var array_l =  array.length;
											if(array_l<1)
											{
												var array_min = new Array();
												array_min.push(data[i].get('rid'));
												var reocrd = data[i].copy('');
												reocrd.set('pid',array_min);
												array.push(reocrd);
											}
											else
											{
												var array_length = array.length;
												var flag = true;
												for(var j=0;j<array_length;j++)
												{
													if(data[i].get('toolsId') == array[j].get('toolsId'))
													{
														array[j].get('pid').push(data[i].get('rid'));
														array[j].set('orderAmount',array[j].get('orderAmount')*1+data[i].get('orderAmount')*1);
														flag = false;
													}
												}
												if(flag)
												{
													var array_min = new Array();
													array_min.push(data[i].get('rid'));
													var reocrd = data[i].copy('');
													reocrd.set('pid',array_min);
													array.push(reocrd);
												}
											}
										}
									}
									//合并重复
									if(store.data.length>0 && array.length>0)
									{
										for(var p=0;p<store.data.length;p++)
										{
											var array_le = array.length;
											for(var q=0;q<array_le;q++)
											{
												if(store.getAt(p).get('toolsId') == array[q].get('toolsId'))
												{
													store.getAt(p).set('orderAmount',store.getAt(p).get('orderAmount')*1+array[q].get('orderAmount')*1);
													store.getAt(p).get('pid').push(array[q].get('rid'));
													array.splice(q,1);
												}
											}
										}
									}
									if(flag_color)
									{
										Ext.Msg.show({
											title:'系统提示',
											msg: '添加数据有重复!',
											buttons: Ext.Msg.OK,
											icon: Ext.MessageBox.INFO
										});
										flag_color = false;
									}
									store.add(array);
								
						}});
						win.show();
					},
					scope : this
				},{
					xtype:'tbseparator'
				},{
					text : "删除",
					iconCls : 'icon-delete',
					handler : function() {
						var arr = pOAddTree_Check.getSelections();
						if(arr.length < 1) {
							Ext.Msg.show({
								title:'系统提示',
								msg: '请选择一条记录进行操作!',
								buttons: Ext.Msg.OK,
								icon: Ext.MessageBox.INFO
							});
							return;
						}
						var handleDelete = function (btn){
							if(btn == 'ok') {	
								for(var i=0;i<arr.length;i++)
								{
									this.store.remove(arr[i]);
								}
								delete_detail(this.ownerCt.ownerCt.nav2.addGrid.getForm(),this.store);
							}
						}
						Ext.MessageBox.show({
							title:'系统提示',
							msg: '请确认要删除当前记录!',
							buttons: Ext.MessageBox.OKCANCEL,
							fn: handleDelete,
							scope:this
						});			
						
					},
					scope:this
				},{
					xtype:'tbseparator'
				},{
					text : '统一设置交货期限',
					iconCls : 'icon-date',
					listeners : {
						'click' : function(_btn, e) {
							var deliveryDate = null;
							if(this.store.getAt(0)!=undefined)
							{
								deliveryDate = this.store.getAt(0).get('deliveryDate');
							}
							if(deliveryDate!=null&&deliveryDate!=''){
								this.store.each(function(record){
									record.set('deliveryDate',deliveryDate);
								});
							}			
						},scope : this
					}
	        },{
					text : '历史价格查询',
					iconCls : 'icon-date',
					listeners : {
						'click' : function(_btn, e) {
						    try
						    {				  
						    	var favlues = this.ownerCt.ownerCt.nav2.addGrid.getForm().getValues();
								var supplierId = favlues.supplierId;
								var supplierName = favlues.supplierName;
								var brandCode = favlues.supplierId;
								new Ext.ffc.OrderHisPriceSearchWin({
									supplierId:supplierId,
									supplierName:supplierName,
									brandCode:brandCode
								}).show();
						    }
						    catch (ex)
						    {
								alert(ex);
						    }
							
						},scope : this
					}
	        }]
		})
	}
})

var pOAddGrid = Ext.extend(Ext.FormPanel,{
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.companyCombox = new companyCombox({disabled : this.isReadOnly,x:630,y:2,width:170});
			this.orderDate = new Ext.form.DateField({
				fieldLabel: '订货日期', format:'Y-m-d',name: 'orderDate' ,value:new Date(),x:100,y:30, width:170, format:'Y-m-d', 
				emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
			});
			this.currCombox = new orderCurrencyCombox({disabled : this.isReadOnly,x:630,y:90,width:170});
			this.deliveryDate = new Ext.form.DateField({
				fieldLabel: '交货日期', format:'Y-m-d',name: 'deliveryDate' ,x:350,y:120, width:170, format:'Y-m-d', 
				emptyText:'', allowBlank : false, blankText:'该项为必填项!',disabled : this.isReadOnly
			});
			this.OrderClosingAccountModeComboBox = new Ext.ffc.OrderClosingAccountModeComboBox({disabled : this.isReadOnly,x:100,y:210,width:418});
			this.taxRateCombox = new TaxrateCombox({disabled : this.isReadOnly,x:900,y:33,width:170});
			this.taxRateCombox.on('select',function(combo, record,index){ 
				change_rate(this.getForm());
					 },this);
			
			this.lableStyle_ = "font-size:9pt;text-align:right;width:100px";
			var config = [
				//
					{xtype:'label',text: '订单编号:',x:0,y:5,style:this.lableStyle_},
					{xtype:'textfield', readOnly : true, x:100,y:3, width:170,name: 'orderCode'},
					{xtype:'label',text: '供应商:',x:250,y:5,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierName',readOnly : true,x:350,y:3,width:170},
					{xtype:'label',text: '卖方名称:',x:530,y:5,style:this.lableStyle_},
					this.companyCombox,
					{xtype:'label',text: '货品金额:',x:800,y:5,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'productMoney',readOnly : true,x:900,y:3,width:170},
					//2
					{xtype:'label',text: '订货日期:',x:0,y:35,style:this.lableStyle_},
					this.orderDate,
					{xtype:'label',text: '供应商负责人:',x:250,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierContactPerson',readOnly : true,x:350,y:33,width:170},
					{xtype:'label',text: '供应商我方负责人:',x:530,y:35,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierOwnContactPerson',readOnly : true,x:630,y:33,width:170},
					{xtype:'label',text: '税  率:',x:800,y:35,style:this.lableStyle_},
					this.taxRateCombox,
					//3
					{xtype:'label',text: '紧急程度:',x:0,y:65,style:this.lableStyle_},
					new Ext.ffc.UrgentLevelCombox({x:100,y:62, width:170,disabled : this.isReadOnly}),
					{xtype:'label',text: '供应商电话:',x:250,y:65,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierPhone',readOnly : true,x:350,y:63,width:170},
					{xtype:'label',text: '制 单 人:',x:530,y:65,style:this.lableStyle_},
					{xtype:'textfield', name: 'userName',value:LoginInfor.user.userName,readOnly : true,x:630,y:63,width:170},
					{xtype:'label',text: '税　　金:',x:800,y:65,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'taxMoney',readOnly : true,x:900,y:63,width:170},
					//4
					{xtype:'label',text: '订单状态:',x:0,y:95,style:this.lableStyle_},
					{xtype:'textfield',  name: 'status',value:'编制',readOnly : true,x:100,y:93,width:170},
					{xtype:'label',text: '供应商传真:',x:250,y:95,style:this.lableStyle_},
					{xtype:'textfield',  name: 'supplierFax',readOnly : true,x:350,y:93,width:170},
					{xtype:'label',text: '币　别:',x:530,y:95,style:this.lableStyle_},
					this.currCombox,
					{xtype:'label',text: '税价合计:',x:800,y:95,style:this.lableStyle_},
					{xtype:'numberfield',  name: 'totalMoney',readOnly : true,x:900,y:93,width:170},
					//5
					{xtype:'label',text: '质量标准:',x:0,y:125,style:this.lableStyle_},
					{xtype:'textfield',  name: 'qualityStandard',readOnly : this.isReadOnly,value:'参照供方标准',x:100,y:122,width:170},
					{xtype:'label',text: '交货日期:',x:250,y:125,style:this.lableStyle_},
					this.deliveryDate,
					{xtype:'label',text: '整单折扣(%):',x:800,y:125,style:this.lableStyle_},
					{xtype:'numberfield',name: 'overallRebate',emptyText : 0, readOnly : this.isReadOnly,
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
					 {xtype:'label',text: '最终金额:',x:800,y:155,style:this.lableStyle_},
					 {xtype:'numberfield', name: 'finalMoney', allowBlank : false, x:900,y:152,width:170},
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
					 {xtype:'textfield' ,name: 'mome', width : 440, readOnly : this.isReadOnly, allowBlank : false,x:630,y:242},
					 //hidden
					 {xtype:'hidden',fieldLabel: '供应商ID',name: 'supplierId'}
				//
				];
			pOAddGrid.superclass.constructor.call(this, {
					width : 1000,
					labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
					frame:true,labelWidth:75,monitorValid:false,
					layout : 'absolute',
					items:config
			})
		}
 })

	var pOAddPanelo = Ext.extend(Ext.Panel,{
		addGrid:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.addGrid = new pOAddGrid();
			pOAddPanelo.superclass.constructor.call(this, {
				region: 'north',
				width: 900,
				height:280,  
				layout:"fit", 
				items : [this.addGrid]
			})
		}
	 })

	var pOAddPanelt = Ext.extend(Ext.Panel,{
		addTree:null,
		constructor : function(_cfg){
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.addTree = new pOAddTree();
			pOAddPanelt.superclass.constructor.call(this, {
				region: 'center',
				split: true,
				layout:"fit",  
				collapsible: true,
				items : [this.addTree]
			})
		}
	 })

		var pOAddWin = Ext.extend(Ext.Window,{
				nav1:null,
				nav2:null,
				constructor : function(_cfg){
					if(_cfg == null) {
						_cfg = {};
					}
					Ext.apply(this, _cfg);
					this.nav1 = new pOAddPanelt();
					this.nav2 = new pOAddPanelo();
					
					this.nav1.addTree.store.on('add',function(store,records,index ){
						var prom = 0;
						store.each(function(record){
							prom += record.get('price')*record.get('orderAmount')*1;
						});
						var rat = this.nav2.addGrid.getForm().getValues().taxRate;
						if(rat == '' || rat == null || isNaN(rat))
						{
							rat = 0;
						}
						this.nav2.addGrid.getForm().setValues({productMoney:prom});
						this.nav2.addGrid.getForm().setValues({totalMoney:prom*rat*1 + prom*1});
					},this);
					pOAddWin.superclass.constructor.call(this, {
						renderTo: Ext.getBody(),
						title:"创建材料储备订单",  
						width:1140,  
						height:550,  
//						modal:true,
						plain:true,
						draggable:true,
						resizable:false,
						maximizable: true,
						layout:"border",  
						buttons : [{
							text : "保存",
							handler : function() {
								var record = new Ext.data.Record(this.nav2.addGrid.getForm().getValues());
								var formV = this.nav2.addGrid.getForm().getValues();
								if(!checkOrderInfor(formV))
								{
									return;
								}
								var childrenArray = new Array();
								this.nav1.addTree.store.each(function(record){
									childrenArray.push(record.data);
								},this);
								if(childrenArray.length<1)
								{
									Ext.Msg.show({
									   title: '系统提示',
									   msg: '请添加产品！',
									   width: 300,
									   buttons: Ext.MessageBox.OK,
									   icon: Ext.MessageBox.INFO
									});
									return;
								}
								if(!checkOrderDetail(childrenArray,formV))
								{
									return;
								}
								var orderDetail = Ext.util.JSON.encode(childrenArray);
								var order = Ext.util.JSON.encode(record);	
								Ext.Ajax.request({
									url: PATH + '/planOrder/addOrder.do',
									params: { order: order, orderDetail : orderDetail},
									success : function(response) {
										var responseArray = Ext.util.JSON.decode(response.responseText); 
											 if(responseArray.success == true){
												Ext.Msg.show({
													title:'成功提示',
													msg: responseArray.msg,
													buttons: Ext.Msg.OK,
													icon: Ext.MessageBox.INFO
												});
												this.close();
												cut_tools.plan_order.index_grid.getStore().reload();
											 } else {
												Ext.Msg.show({
													title:'错误提示',
													msg: responseArray.msg,
													buttons: Ext.Msg.OK,
													icon: Ext.MessageBox.ERROR
												});
											 } 
									},scope:this
								});
								
							},
							scope : this
						 },{
							text : "取消",
							handler : function() {
								this.close();
							},
							scope : this
						 }],
					items : [this.nav1, this.nav2]
					})
				}
			 })

//		cut_tools.plan_order.cloneAll = function cloneAll(data,toObj,pId){   
//			
//			for(var i = 0;i<data.length;i++ )
//			{
//				var nm = toObj.length;
//				if(nm>0)
//				{
//					for(var j=0;j<nm;j++)
//					{
//						if(toObj[j].get('toolsId') == data[i].get('toolsId'))
//						{
//							toObj[j].set('orderAmount',toObj[j].get('orderAmount')*1+data[i].get('planAmount')*1);
//							 pId.push(data[i].get('id')+"-"+data[i].get('toolsId'));
//						}
//						else
//						{
//							 var toObject = new Ext.data.Record();
////							  toObject.set('pId', pid); 
//							  pId.push(data[i].get('id')+"-"+data[i].get('toolsId'));
//							  toObject.set('brandCode', data[i].get('brandCode')); 
//							  toObject.set('productName', data[i].get('productName')); 
//							  toObject.set('productUnit', data[i].get('productUnit')); 
//							  toObject.set('price', data[i].get('price')); 
//							  toObject.set('toolsId', data[i].get('toolsId'));
//							  toObject.set('parentToolsId', data[i].get('parentToolsId')); 
//							  toObject.set('leaf', data[i].get('leaf'));
//							  toObject.set('productMoney', data[i].get('productMoney'));
//							  toObject.set('orderAmount', data[i].get('planAmount'));
//							  toObject.set('productCode', data[i].get('productCode'));
//							  toObject.set('productBrand', data[i].get('productBrand'));
//							  toObject.set('deliveryDate','');
//							  toObj.push(toObject);
//						}
//					}
//				}
//				else
//				{
//				  var toObject = new Ext.data.Record();
////				  toObject.set('pId', pid); 
//				  pId.push(data[i].get('id')+"-"+data[i].get('toolsId'));
//				  toObject.set('brandCode', data[i].get('brandCode')); 
//				  toObject.set('productName', data[i].get('productName')); 
//				  toObject.set('productUnit', data[i].get('productUnit')); 
//				  toObject.set('price', data[i].get('price')); 
//				  toObject.set('toolsId', data[i].get('toolsId'));
//				  toObject.set('parentToolsId', data[i].get('parentToolsId')); 
//				  toObject.set('leaf', data[i].get('leaf'));
//				  toObject.set('productMoney', data[i].get('productMoney'));
//				  toObject.set('orderAmount', data[i].get('planAmount'));
//				  toObject.set('productCode', data[i].get('productCode'));
//				  toObject.set('productBrand', data[i].get('productBrand'));
//				  toObject.set('deliveryDate','');
//				   toObj.push(toObject);
//				}
//			}	  	  	
//			return toObj;
//		} 

	