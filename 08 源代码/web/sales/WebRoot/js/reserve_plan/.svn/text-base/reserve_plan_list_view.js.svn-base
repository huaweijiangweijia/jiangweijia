Ext.onReady(function(){
	var ReservePlanListStore = new Ext.data.Store({
		remoteSort : true,
       proxy: new Ext.data.HttpProxy({url:PATH + '/reservePlan/ReservePlanViewAction.do?ffc=reservePlanList&limit=14'}),//调用的动作 
	   reader: new Ext.data.JsonReader({
       root: 'items',  //从struts2里面传递过来的参数 
	   totalProperty :'totalCount'
     }, 
	 [ //JSON数据的映射
        {name: 'id',mapping:'id',type:'string'},
		{name: 'planCode',mapping:'planCode',type:'string'},
        {name: 'orderCode',mapping:'orderCode',type:'string'},
        {name: 'contractCode',mapping:'contractCode',type:'string'},
		{name: 'userName',mapping:'userName',type:'string'},
		{name: 'editDateString',mapping:'editDateString',type:'string'},
		{name: 'status',mapping:'status',type:'string'},

		{name: 'productCode',mapping:'productCode',type:'string'},
		{name: 'brandCode',mapping:'brandCode',type:'string'},
		{name: 'productName',mapping:'productName',type:'string'},
		{name: 'planAmount',mapping:'planAmount',type:'string'},
		{name: 'orderInforId',mapping:'orderInforId',type:'string'}
     ])
	});


var  selectForm3 = new Ext.FormPanel({
                        labelAlign:'right',buttonAlign:'right',bodyStyle:'padding:5px;',
                        frame:true,labelWidth:80,monitorValid:false,border:false,
                        items:[
                            {layout:'column',border:false,labelSeparator:':',
                            defaults:{layout: 'form',border:false,columnWidth:.3},
                            items:[
                            {items: [{xtype:'textfield',fieldLabel: '计划编号',name: 'planCode',anchor:'70%'}]},	
							{items: [{xtype:'textfield',fieldLabel: '加工订单编号',name: 'orderCode',anchor:'70%'}]},
							{items: [{xtype:'textfield',fieldLabel: '合同编号',name: 'contractCode',anchor:'70%'}]},
                            {items: [new Ext.ffc.ReservePlanStatusComboBox({anchor:'70%'})]},
							{items: [{xtype:'datefield',fieldLabel: '编制时间',name: 'startDate',anchor:'70%', format:'Y-m-d'}]},
							{items: [{xtype:'datefield',fieldLabel: '至',labelWidth:10,name: 'endDate',anchor:'70%', format:'Y-m-d'}]}
							
                                ],//items
						bbar : ['->',{
							text : "搜  索",
							iconCls:'icon-search',
							handler : function() {
								var seachParams = selectForm3.getForm().getValues();
									ReservePlanListStore.load({params:seachParams});
							}
	           			},'-',{  
										text:'重置'  
										,iconCls:'icon-reset',
										listeners : {
											'click' : function(){
												var bform = selectForm3.getForm();
												bform.reset();
												bform.findField('planStatus').setValue('-1');
											},scope : this
										}
										
								}]
                            }
                        ]//items
                    });//FormPanel

var gridCheckSele = new Ext.grid.CheckboxSelectionModel();

    var grid = new Ext.grid.GridPanel({
        ds : ReservePlanListStore,
        store: ReservePlanListStore,
		sm:gridCheckSele,
		frame:true,
        columns: [new Ext.grid.RowNumberer(),//自动行号
			gridCheckSele,
            {id:'id',header: "计划id", width: 160,  dataIndex: 'id',hidden:true},
            {header: "计划编号", width: 155, sortable: true,  dataIndex: 'planCode'},
			{header: "加工订单编号", width: 155, sortable: true,  dataIndex: 'orderCode'},
			{header: "合同编号", width: 155, sortable: true,  dataIndex: 'contractCode'},
			{
	            header:'货品编号',
	            width:100,
	            resizable : true,
				sortable: true,
	            dataIndex:'productCode'
	        },{
	            header:'工具牌号',
	            width:100,
	            resizable : true,
				sortable: true,
	            dataIndex:'brandCode'
	        },{
	            header:'名称',
	            width:100,
				sortable: true,
	            dataIndex:'productName'
	        },{
	            header:'计划数量',
	            width:100,
				sortable: true,
	            dataIndex:'planAmount'
	        },
			{header: "编制人", width: 75, sortable: true, dataIndex: 'userName'},
			{header: "编制时间", width: 150, sortable: true, dataIndex: 'editDateString'},
			{header: "状态", width: 75, sortable: true, dataIndex: 'status',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
							var arr = [[0,'编制'],
							[2,'<span style="color:#0033FF">已确认</span>'],
							[4,'<span style="color:#2D61B5">已做订单</span>']];
							for(var i = 0;i < arr.length ;i++){
							    if(value == arr[i][0]){
								    return arr[i][1];
								}
							}
							return value;
				}
			},
			/*{header: "审批信息", width: 75, sortable: true, dataIndex: 'auditInfor',
				renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
					var str = "<a href=\"javascript:onAuditInfor(this,\'" + record.get('id') + "\');\">查看</a>";
					return str;
				}
			},*/{
	            header:'orderInforId',
	            width:50,
				hidden:true,
	            dataIndex:'orderInforId'
	        }
        ],
        //stripeRows: true,
        height:580,
        width:1270,
		tbar:[{
        		text:'新增计划',
				tooltip: '新增计划',
				iconCls : 'icon-add',
				listeners : {
					'click' : function() {
						try{
						Ext.ffc.select_process_orders(function(arr,select_process_orders_win){
							if(!arr || arr.length == 0) return;
							var idsArr = [];
							var process_orderId = arr[0].get("id");
							var orderCode = arr[0].get("orderCode");
							var contractCode = arr[0].get("contractCode");
							//var contractId = arr[0].get("contractId"); 暂时没有
							
							select_process_orders_win.close();//关闭合同选择窗口
							
							Ext.Ajax.request({
									method: "post",
									params: { 'orderId' : process_orderId},
									url: PATH + '/outStock/materialOutStockViewAction.do?ffc=consultOrderProducts',
									success: function(response){
									try{
										eval("var materialOutStockInfor=" + response.responseText);
										var conEditWin = new Ext.ffc.MaterialOutStockEditWindow(
											{
												title: '新增出库单',
												'materialOutStockInfor' : materialOutStockInfor,
												listeners : {
													'close' : function(){
														Ext.Ajax.request({
																method: "post",
																params: { 'orderId' : process_orderId},
																url: PATH + '/reservePlan/ReservePlanEditAction.do?ffc=consultReserveInfors',
																success: function(response){
																	try{
																		eval("var ReservePlanMainInfor=" + response.responseText);
																		var conEditWin = new Ext.ffc.ReservePlanEditWindow(
																			{
																				ReservePlanInfor:ReservePlanMainInfor,isAddWin:true,
																				listeners : {
																					'close' : function(){
																						ReservePlanListStore.reload();
																					}
																				}
																			}
																		);
																		conEditWin.show();
																	}catch(e){alert(e);}
																}
														});
													}
												}
											}
										);
										conEditWin.show();
									}catch(e){alert(e);}
									}
							});
						},{orderType:3,status:4});
						}catch(e){alert(e);}

					}//---------------click
				}
        	},{
				xtype:'tbseparator'
			},{
        		text:'修改计划',
				tooltip: '修改计划',
				iconCls : 'icon-modify',
				listeners : {
					'click' : function() {
							var arr = gridCheckSele.getSelections();
							if(arr.length <= 0){
								Ext.Msg.alert("消息", "请选择要修改的储备计划!");
								return;
							}
							if(arr.length > 1){
								Ext.Msg.alert("消息", "只能选择一条数据进行修改操作!");
								return;
							}
							var conId = arr[0].id;
							if(arr[0].get("status") != 0 && arr[0].get("status") != 3){
								Ext.Msg.alert("消息", "所选择储备计划不允许修改!");
							    return ;
							}
							var dData = arr[0].data;
							var planId = dData.id;
							//Ext.apply(dData,arr[0].data);
							
							Ext.Ajax.request({
									method: "post",
									params: { 'orderId' : dData.orderInforId},
									url: PATH + '/reservePlan/ReservePlanViewAction.do?ffc=reservePlanViewById',
									success: function(response){
										try{
											//alert(response.responseText);
											eval("var ReservePlanMainInfor=" + response.responseText);
											var conEditWin = new Ext.ffc.ReservePlanEditWindow(
												{
													'ReservePlanInfor':ReservePlanMainInfor,'defultSelectPlanId':planId,
													listeners : {
														'close' : function(){
															ReservePlanListStore.reload();
														}
													}
												}
											);
									
											conEditWin.show();
										}catch(e){alert(e);}
									}
							});
					}
				}
        	},{
				xtype:'tbseparator'
			},{
        		text:'删除计划',
				tooltip: '删除计划',
				iconCls : 'icon-delete',
				listeners : {
					'click' : function() {
						var arr = gridCheckSele.getSelections();
						if(arr.length <= 0){
							Ext.Msg.alert("消息", "请选择要删除的储备计划!");
							return;
						}
						var ids = [];
						for(var i = 0 ;i < arr.length;i++){
						     ids.push(arr[i].id);
							 if(arr[i].get("status") != 0 && arr[i].get("status") != 3){
								Ext.Msg.alert("消息", "所选择储备计划不允许删除!");
							    return ;
							 }
						}
						Ext.MessageBox.confirm('系统提示', '请确认是否要删除当前所选中储备计划!', function(btn){
							if(btn != 'yes'){return ;}
							    Ext.Ajax.request({
									method: "post",
									params: { 'ids' : ids},
									url: PATH + '/reservePlan/ReservePlanEditAction.do?ffc=deleteReservePlan',
									success: function(response){
											ReservePlanListStore.reload();
									}
								});
						   });
					}
				}
        	},{
				xtype:'tbseparator'
			},{
        		text:'计划确认',
				tooltip: '计划确认',
				iconCls : 'icon-submit',
				listeners : {
					'click' : function() {
						var arr = gridCheckSele.getSelections();
							if(arr.length <= 0){
								Ext.Msg.alert("消息", "请选择要确认的计划!");
								return;
							}
							var ids = [];
							for(var i = 0 ;i < arr.length;i++){
								 ids.push(arr[i].id);
								 if(arr[i].get("status") != 0 ){
									Ext.Msg.alert("消息", "只有[编制]状态，计划才需要确认!");
									return ;
								 }
							}
							Ext.MessageBox.confirm('系统提示', '是否要确认当前选中的储备计划!', function(btn){
								Ext.Ajax.request({
								method: "post",
								params: { 'ids' : ids,'deliveryType' : 'contract'},
								url: PATH + "/reservePlan/ReservePlanEditAction.do?ffc=confirmReservePlan",
								success: function(response){
										if(response.responseText != ''){
											Ext.Msg.alert("消息", response.responseText);
										}else{
											Ext.Msg.alert("消息", "计划确认成功！");
											ReservePlanListStore.load();
										}
										
								}
								});
							});
					}
				}
        	},{
				xtype:'tbseparator'
			},{
        		text:'查看计划',
				tooltip: '查看计划',
				iconCls : 'icon-detail',
				listeners : {
					'click' : function() {
							var arr = gridCheckSele.getSelections();
							if(arr.length <= 0){
								Ext.Msg.alert("消息", "请选择要修改的储备计划!");
								return;
							}
							if(arr.length > 1){
								Ext.Msg.alert("消息", "只能选择一条数据进行查看操作!");
								return;
							}

							var conId = arr[0].id;
							
							var dData = arr[0].data;
							var planId = dData.id;
							//Ext.apply(dData,arr[0].data);
							
							Ext.Ajax.request({
									method: "post",
									params: { 'orderId' : dData.orderInforId},
									url: PATH + '/reservePlan/ReservePlanViewAction.do?ffc=reservePlanViewById',
									success: function(response){
										try{
											//alert(response.responseText);
											eval("var ReservePlanMainInfor=" + response.responseText);
											var conEditWin = new Ext.ffc.ReservePlanEditWindow(
												{
													readOnly:true,
													'ReservePlanInfor':ReservePlanMainInfor,'defultSelectPlanId':planId,
													listeners : {
														'close' : function(){
															ReservePlanListStore.reload();
														}
													}
												}
											);
									
											conEditWin.show();
										}catch(e){alert(e);}
									}
							});
					}
				}
        	}
		]
    });



    //grid.render('contract_list_');

	var select_quotations_win = new Ext.Panel({
            layout: 'border',
			//title: '参照报价单',
			width  : Ext.getBody().getWidth(),
			height : Ext.getBody().getHeight() - 50,
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
                //contentEl: 'south',
                split: true,
                //width: 200,
                height : 100,
                minSize: 140,
                maxSize: 300,
                collapsible: true,
                margins: '5 5 5 5',
                items : [selectForm3]
                
            }, {
                region: 'center',
                layout: 'fit',
                split: true,
                //height: 10000,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                //title: 'South',
                margins: '-5 5 5 5',
                items : [grid]
            }],
			bbar: new Ext.PagingToolbar({
            pageSize: 14,
            store: ReservePlanListStore,
            displayInfo: true,
            displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
            emptyMsg: "没有记录"//,
           /* items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            }]*/
        })
        });
	select_quotations_win.render('reserve_plan_list_');

	ReservePlanListStore.load({params:{start:0}});

});

