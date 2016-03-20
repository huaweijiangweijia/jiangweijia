

//------------------保存用户更改信息------------------------------------
Ext.zhj.EditProRecord = Ext.data.Record.create([
    {name: 'row'},
    {name : 'field'},
    {name : 'originalValue'}
]);


//-----------------等级对应折扣信息-----------------------------------
Ext.zhj.DegreeRebateGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	isRebateSaveHide : true, isRebateCancelHide : true,
	editProRecords : null,
	flag : null,
	constructor : function(_cfg) {
		if (_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		//编辑记录级
		this.editProRecords = new Array();
		this.flag = 0;
		
		var fm = Ext.form;
		var ds = new Ext.data.JsonStore({
					url : PATH
							+ '/baseInfo/degreeRebateListAction.do',
					root : 'degreeRebateList',
					totalProperty : 'totalProperty',
					autoLoad : false,
					remoteSort : true,
					fields : ['degreeName', 'degreeCode', 'productBrand',
							'sortName', 'sortCode', 'rebate', 'productSortId',
							'customersDegreeId', 'id']
				});
		ds.on('beforeload', function() {
					var dd = this.getStore().getModifiedRecords();
					if (dd.length > 0) {
						return !window.confirm('折扣信息已经更改，是否需要保存！');
						/*
						 * Ext.Msg.show({ title:'是否保存?', msg:
						 * '客户折扣信息已经更改，你想要保存这些更改吗？', buttons:
						 * Ext.MessageBox.YESNOCANCEL, icon:
						 * Ext.MessageBox.QUESTION });
						 * 
						 * function showResult (btn){ if(btn == 'yes'){
						 * alert(btn); }else if(btn == 'no'){
						 * this.getStore().reload(); return true; }else{ return
						 * false; }
						 *  }
						 */
					}
				}, this);
		ds.on('load', function() {
					this.getStore().clearModified();
				}, this);
		Ext.zhj.DegreeRebateGrid.superclass.constructor.call(this, {
			width : Ext.getBody().getWidth()/3*2,
			height : Ext.getBody().getHeight()-70,
			enableHdMenu : false,
			border : false,
			stripeRows : true,
			el : "degreeRebateGrid",
			region: 'center',
			frame : true,
			clicksToEdit:1,//单击修改
			ds : ds,
			view : new Ext.grid.GridView({
						deferEmptyText : false,
						emptyText : '无此客户等级对应的折扣信息！'
					}),
			selModel : new Ext.grid.RowSelectionModel({
						singleSelect : true
					}),
			tbar : [{
				text : "保存修改",
				iconCls : 'icon-submit',
				hidden : this.isRebateSaveHide,
				
				listeners : {
	        		'click' : function() {
						var _store = this.getStore();
						var records = _store.getModifiedRecords();
						if (records.length < 1) {
							Ext.MessageBox.alert('提示', '折扣记录没有修改！');
						} else {
							var modifDegRebRecords = '';
							for (var i = 0; i < records.length; i++) {
								var rec = records[i];
								modifDegRebRecords += Ext.util.JSON
										.encode(rec.data);
								modifDegRebRecords += ',';
							}
							Ext.Ajax.request({
										url : PATH
												+ '/baseInfo/updateDegreeRebateAction.do',
										params : {
											modifDegRebRecordsPar : modifDegRebRecords
										},
										success : function(response) {
											var responseArray = Ext.util.JSON
													.decode(response.responseText);
											if (responseArray.success == true) {
												Ext.Msg.show({
															title : '成功提示',
															msg : responseArray.msg,
															buttons : Ext.Msg.OK,
															width : 200,
															icon : Ext.MessageBox.INFO
														});
												_store.commitChanges();
											} else {
												Ext.Msg.show({
															title : '错误提示',
															msg : responseArray.msg,
															buttons : Ext.Msg.OK,
															width : 200,
															icon : Ext.MessageBox.ERROR
														});
											}
										}
									});
						}
	        		},scope : this
	        	},
				scope : this
			}],
			cm : new Ext.grid.ColumnModel([
					new Ext.grid.CheckboxSelectionModel(),
					new Ext.grid.RowNumberer({
								header : '序号',
								width : 50
							}), {
						header : '客户等级名称',
						dataIndex : 'degreeName',
						hidden : true,
						width : 0
					}, {
						header : '客户等级编号',
						dataIndex : 'degreeCode',
						hidden : true,
						width : 0
					}, {
						header : '品牌',
						sortable : true,
						dataIndex : 'productBrand'
					}, {
						header : '组别名称',
						sortable : true,
						dataIndex : 'sortName'

					}, {
						header : '组别编号',
						sortable : true,
						dataIndex : 'sortCode'

					}, {
						header : '折扣',
						dataIndex : 'rebate',
						sortable : true,
						width : 170,
						editor : new fm.NumberField({
									allowBlank : false,
									minValue : 0,
									allowNegative : false,
									maxValue : 100
								})
					}, {
						header : 'ID',
						hidden : true,
						dataIndex : 'id'
					}]),
			bbar : new Ext.PagingToolbar({
						pageSize : 20,
						emptyMsg : "没有记录",
						displayInfo : true,
						displayMsg : '显示第 {0} - {1} 条 共 {2} 条',
						store : ds,
						listeners : {
							beforechange : function( pagingToolbar,params ) {
								
								var arr = pagingToolbar.store.getModifiedRecords();
								if(arr.length > 0){
									
									if(confirm("当前折扣有改动，是否要保存!")){
										this.getTopToolbar().items.item(0).fireEvent('click');
										pagingToolbar.store.commitChanges();
									    return false;
									}else{
										pagingToolbar.store.commitChanges();
									    return true;
									}
								}
								return true;
							},scope : this
						}
					}),
			listeners : {'afteredit' : function(e){
				var record = new Ext.zhj.EditProRecord({row : e.row, field : e.field ,originalValue : e.originalValue });
				this.editProRecords[this.flag] = record;
				this.flag++;
			},scope : this}
		});
	}
});


