Ext.ffc.WaitOfficeChildPanel = Ext.extend(Ext.grid.GridPanel, {  
	auditType : null,
	pageInfoLabel : null,
	pageObject : {pageSize:10},
	gridCheckSele : null,
	storeDef :  null,
	view : null,
	loadData : function(pstartIndex,ppageSize){
			var gridPanel = this;
			Ext.Ajax.request({
				method: "post",
				params: { auditType: gridPanel.auditType.auditTypeId,flowInforId:gridPanel.auditType.auditFlowId,startIndex:pstartIndex,pageSize:ppageSize},
				url: PATH + "/manage/audit/auditInforMangeAction.do?ffc=findWaitAuditBusinessInfor",
				success: function(response){
					//Ext.Msg.alert("消息", response.responseText);
					//alert(response.responseText);
					eval("var pageInfor=" + response.responseText);
					var dataArray = [];
					var mappingArray = [];
					for(var i = 0 ;i < pageInfor.items.length;i++){
						if(i == 0){
							var num = 0;
							for(var j in pageInfor.items[0].properties){
								mappingArray.push({name: j,mapping:num++,type:'string'});
							}
						}
						var arr = [];
						for(var tt in pageInfor.items[i].properties){
							arr.push(pageInfor.items[i].properties[tt]);
						}
						dataArray.push(arr);
					}
					//alert(Ext.encode(dataArray));
					gridPanel.storeDef = new Ext.data.Store({
						proxy: new Ext.data.MemoryProxy(dataArray),
						//proxy: new Ext.data.HttpProxy({url:PATH + '/manage/audit/auditInforMangeAction.do?ffc=findWaitAuditBusinessInfor'}),//调用的动作 
						reader: new Ext.data.ArrayReader({}, mappingArray)
					});
					
					var pcolumns = [];
						//gridCheckSele = new Ext.grid.CheckboxSelectionModel();
						pcolumns.push(new Ext.grid.RowNumberer());
						pcolumns.push(gridPanel.gridCheckSele);
						pcolumns = pcolumns.concat(pageInfor.headers);
						pcolumns.push(
							{"dataIndex":"auditInfor","header":"查看详细","hidden":false,"sortable":false,"width":80,
								"renderer":function(value, cellmeta, record, rowIndex, columnIndex, store){
												var str = "<a href=\"javascript:loadBusinessInfor(\'" + record.get('url') + "\',\'" + record.get('id') + "\');\">查看</a>";
												return str;
											}
							}
						);
						pcolumns.push(
							{"dataIndex":"auditInfor","header":"审批信息","hidden":false,"sortable":false,"width":80,
								"renderer":function(value, cellmeta, record, rowIndex, columnIndex, store) {
												var str = "<a href=\"javascript:onAuditInfor(this,\'" + record.get('id') + "\');\">查看</a>";
												return str;
											}
							}
						);
						pcolumns.push(
							{"dataIndex":"auditInfor","header":"委托人","hidden":false,"sortable":false,"width":80,
								"renderer":function(value, cellmeta, record, rowIndex, columnIndex, store) {
												var v = record.get("trustPersonName");
												var n = (v == null ? "" : v);
												var str = "<span style=\"color:red\">" + n + "</a>";
												return str;
											}
							}
						);
					try{
						gridPanel.reconfigure(gridPanel.storeDef,new Ext.grid.ColumnModel(pcolumns));
						gridPanel.storeDef.load();
					}catch(e){
					    //alert("ssss:" + e);
					}
					gridPanel.pageObject = pageInfor;
					gridPanel.pageInfoLabel['setInfor'](gridPanel.pageObject);
				}
		   });	

	},
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.gridCheckSele = new Ext.grid.CheckboxSelectionModel();
		this.storeDef =  new Ext.data.Store();
		this.view = new Ext.grid.GridView();
		this.pageInfoLabel = new Ext.form.Label();
		this.pageInfoLabel['setInfor'] = function(pageObject){
			this.setText("共[" + pageObject.totalCount + "]条记录  当前页: " + pageObject.currentPage + "/" + pageObject.pageCount);
		}
		this.loadData(0,15);
		Ext.ffc.WaitOfficeChildPanel.superclass.constructor.call(this, {
			cm : new Ext.grid.ColumnModel([]),
			store : this.storeDef,
			ds : this.storeDef,
			view : this.view,
			sm:this.gridCheckSele,
			bbar: new Ext.Toolbar({
					items: [{
						text: '首页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(0,15);
							}
						}
					},{
						text: '上一页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(gridP.pageObject.previousIndex,gridP.pageObject.pageSize);
							}
						}
					},{
						text: '下一页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(gridP.pageObject.nextIndex,gridP.pageObject.pageSize);
							}
						}
					},{
						text: '末页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(gridP.pageObject.indexes[gridP.pageObject.indexes.length - 1],gridP.pageObject.pageSize);
							}
						}
					},'->',this.pageInfoLabel]
				})
		});
	}
});  

Ext.ffc.ShowEditContractWindow = function(record,contractListStore,gridObj){
	    var data = record.data;
		var quotationType = data.quotationType;
		var _url = null;
		var _params = {};
		var idsArr = [data.id];
		if(quotationType * 1 == 1){//项目报价
			if(idsArr.length > 1){
				Ext.Msg.alert("消息", "多个项目报价单，不能生成一个合同!");
				return ;
			}
			_url = PATH + "/contract/contractEditAction.do?ffc=consultProjectQuo";
			_params['id'] = idsArr[0];
		}else{
			_params['ids'] = idsArr;
			_url = PATH + "/contract/contractEditAction.do?ffc=consultGeneralQuo";
		}

		Ext.Ajax.request({
		method: "post",
		params: _params,
		url: _url,
		success: function(response){
				//alert(response.responseText);
				eval("var temp = " + response.responseText);
				
				var conEditWin = new Ext.ffc.ContractEditWindow(
					{
						conctractInfor:temp,
							listeners:{
								"close" : function(){
									gridObj.loadData(0,15);
								}
							}
					}
				);
				conEditWin.show();
		}
		});
}

Ext.ffc.ShowEditContractOrderWindow = function(record,contractListStore,gridObj){
	var data = record.data;
	var contractInforId = data.id;
	var contractCode = data.contract_code;
	Ext.Ajax.request({
			method: "post",
			params: { 'contractId' : contractInforId},
			url: PATH + '/outStock/outStockEditAction.do?ffc=getWillOutStockContractDetail',
			success: function(response){
					eval("var detail=" + response.responseText);
					if(detail.length == 0){
						var win = new cOSupplierWin({
												contract_code:contractCode,
												closeCallBackMethd:function(){
													gridObj.loadData(0,15);
												}
											});
						var store = win.supplier_grid.getStore();
						store.baseParams.contractId = contractInforId;                   
						store.load({params: {start: 0, limit: 15}}); 
						win.show();  
						gridObj.loadData(0,15);
					}else{
						var conEditWin = new Ext.ffc.ContractOutStockEditWindow(
							{   outStockInfor:{contractId:contractInforId,outStockType:1,status:0,contractCode:contractCode,outStockDetails:detail},
								listeners :{
									close : function(p){
										var win = new cOSupplierWin(
											{
												contract_code:contractCode,
												closeCallBackMethd:function(){
													gridObj.loadData(0,15);
												}
											}
										);
										var store = win.supplier_grid.getStore();
										store.baseParams.contractId = contractInforId;                   
										store.load({params: {start: 0, limit: 15}}); 
										win.show();  
										gridObj.loadData(0,15);
									}
								}	
							}
						);
						conEditWin.show();
					}
			}
	});
}

Ext.ffc.WorkFlowWaitOfficeChildPanel = Ext.extend(Ext.grid.GridPanel, {  
	auditType : null,
	pageInfoLabel : null,
	pageObject : {pageSize:10},
	gridCheckSele : null,
	storeDef :  null,
	view : null,
	requestUrl : null,
	cmDef : null,
	callBackMethod : function(){},
	loadData : function(pstartIndex,ppageSize){
			var gridPanel = this;
			Ext.Ajax.request({
				method: "post",
				params: { startIndex:pstartIndex,pageSize:ppageSize},
				url: gridPanel.requestUrl,
				success: function(response){
					eval("var pageInfor=" + response.responseText);
					var dataArray = [];
					var mappingArray = [];
					for(var i = 0 ;i < pageInfor.items.length;i++){
						if(i == 0){
							var num = 0;
							for(var j in pageInfor.items[0].properties){
								mappingArray.push({name: j,mapping:num++,type:'string'});
							}
						}
						var arr = [];
						for(var tt in pageInfor.items[i].properties){
							arr.push(pageInfor.items[i].properties[tt]);
						}
						dataArray.push(arr);
					}
					gridPanel.storeDef = new Ext.data.Store({
						proxy: new Ext.data.MemoryProxy(dataArray),
						reader: new Ext.data.ArrayReader({}, mappingArray)
					});
					
					var pcolumns = [];
						pcolumns.push(new Ext.grid.RowNumberer());
						//pcolumns.push(gridPanel.gridCheckSele);
						pcolumns = pcolumns.concat(pageInfor.headers);
						pcolumns.push(
							{"dataIndex":"auditInfor","header":"编制","hidden":false,"sortable":false,"width":100,
								"renderer":function(value, cellmeta, record, rowIndex, columnIndex, store){
												var name = "";
												if(gridPanel.workType == 'FFC001'){
												    name = "采购订单";
												}else if(gridPanel.workType == 'FFC002'){
													name = "合同";
												}else if(gridPanel.workType == 'FFC003'){
												    name = "加工订单";
												}
												
												var t = new Ext.Template('<a href=\"#\">编制{name}</a>');
												return t.apply({name: name});
											}
							}
						);
						try
						{
							gridPanel.reconfigure(gridPanel.storeDef,new Ext.grid.ColumnModel(pcolumns));
							//gridPanel.cmDef = new Ext.grid.ColumnModel(pcolumns);
							gridPanel.storeDef.load();
						}
						catch (E)
						{
						}
					
					gridPanel.pageObject = pageInfor;
					gridPanel.pageInfoLabel['setInfor'](gridPanel.pageObject);
				}
		   });	
	},
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.storeDef =  new Ext.data.Store();
		this.pageInfoLabel = new Ext.form.Label();
		this.pageInfoLabel['setInfor'] = function(pageObject){
			this.setText("共[" + pageObject.totalCount + "]条记录  当前页: " + pageObject.currentPage + "/" + pageObject.pageCount);
		}
		//this.gridCheckSele = new Ext.grid.CheckboxSelectionModel();
		this.view = new Ext.grid.GridView({
						forceFit : true,
						autoFill : true,
						deferEmptyText : false,
						emptyText : '无数据！'
					});
		this.loadData(0,15);
		Ext.ffc.WorkFlowWaitOfficeChildPanel.superclass.constructor.call(this, {
			cm : new Ext.grid.ColumnModel([{header : 'id', dataIndex : 'id',width : 80}]),
			store : this.storeDef,
			ds : this.storeDef,
			view : this.view,
			layout : 'fit',
			bbar: new Ext.Toolbar({
					items: [{
						text: '首页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(0,15);
							}
						}
					},{
						text: '上一页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(gridP.pageObject.previousIndex,gridP.pageObject.pageSize);
							}
						}
					},{
						text: '下一页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(gridP.pageObject.nextIndex,gridP.pageObject.pageSize);
							}
						}
					},{
						text: '末页',
						listeners : {
							'click' : function() {
								var gridP = this.ownerCt.ownerCt;
								gridP.loadData(gridP.pageObject.indexes[gridP.pageObject.indexes.length - 1],gridP.pageObject.pageSize);
							}
						}
					},'->',this.pageInfoLabel]
				}),
			listeners:{
				rowclick : function( grid, rowIndex, e ) {
					if(e.getTarget().tagName == 'A'){
						var store = grid.getStore();
						if(typeof(this.callBackMethod) == 'function'){
							this.callBackMethod(store.getAt(rowIndex),store,this);
						}
					};
				},scope:this
			}
		});
	}
});  

Ext.ffc.AuditOfficeForm = Ext.extend(Ext.FormPanel, {
        labelWidth: 75, 
        frame:true,
        bodyStyle:'padding:5px 5px 0',
        width: 850,
        defaults: {width: 740},
        defaultType: 'textfield',
        buttons: [{
            text: '审批通过',
		    handler:function(){
				var auditForm = this.ownerCt.ownerCt;
				var accordion = auditForm.accordion;
				var auditTypes = auditForm.auditTypes;
				var grid = accordion.layout.activeItem.items.first();
				var gridCheckSele = grid.gridCheckSele;

				var auditType = grid.auditType;
				var arr = gridCheckSele.getSelections();
				if(arr.length == 0){
					Ext.MessageBox.alert('系统提示', '请选择要审批的记录!', function(){});
				    return false;
				}
				var msg = auditForm.findByType("textfield")[0].getEl().dom.value;
				msg = "同意";
				var pbussinessIds = [];
				for(var i = 0 ;i < arr.length;i++){
				    pbussinessIds.push(arr[i].get("id"));
				}
				
			    Ext.MessageBox.confirm('系统提示', '请确认是否要要将所选记录,审批通过!', function(btn){
					if(btn != 'yes'){return ;}
					auditForm.executeAudit(grid,auditForm,pbussinessIds,auditType.auditTypeId,auditType.auditFlowId,msg,1);
				});
			}
        },{
            text: '审批退回',
		    handler:function(){
				var auditForm = this.ownerCt.ownerCt;
				var accordion = auditForm.accordion;
				var auditTypes = auditForm.auditTypes;
				var grid = accordion.layout.activeItem.items.first();
				var gridCheckSele = grid.gridCheckSele;

				var auditType = grid.auditType;
				var arr = gridCheckSele.getSelections();
				if(arr.length == 0){
					Ext.MessageBox.alert('系统提示', '请选择要审批的记录!', function(){});
				    return false;
				}
				var msg = auditForm.findByType("textfield")[0].getEl().dom.value;
				if(msg == ''){
					Ext.MessageBox.alert('系统提示', '请填写审批意见!', function(){});
				    return false;
				}
				var pbussinessIds = [];
				for(var i = 0 ;i < arr.length;i++){
				    pbussinessIds.push(arr[i].get("id"));
				}
				
				Ext.MessageBox.confirm('系统提示', '请确认是否要要将所选记录,审批退回!', function(btn){
					if(btn != 'yes'){return ;}
					auditForm.executeAudit(grid,auditForm,pbussinessIds,auditType.auditTypeId,auditType.auditFlowId,msg,0);
				});
			}
        }],
		accordion : null,
		auditTypes : null,
		executeAudit : function(grid,auditForm,pbussinessIds,auditTypeId,auditFlowId,pcomment,popType){
			Ext.Ajax.request({
					method: "post",
					params: { bussinessIds:pbussinessIds,auditType: auditTypeId,auditInforId:auditFlowId,comment:pcomment,opType:popType},
					url: PATH + "/manage/audit/auditInforMangeAction.do?ffc=executeAudit",
					success: function(response){
						Ext.MessageBox.alert('系统提示', '审批成功!', function(){
							grid.loadData(0,15);
							auditForm.findByType("textfield")[0].getEl().dom.value = '';
						});
						
					}
			});
		},
		constructor : function(_cfg) {
			if(_cfg == null) {
				_cfg = {};
			}
			Ext.apply(this, _cfg);
			this.items = new Ext.form.TextArea({
			   fieldLabel: '审批意见',
			   name:'auditMessage',
			   width: 800
			});
			Ext.ffc.AuditOfficeForm.superclass.constructor.call(this, {
				region: 'south',
                split: true,
                height: 100,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                margins: '-5 5 5 5',
                items : this.items
			})
		}
    });


Ext.ffc.WaitOfficeWindow = Ext.extend(Ext.Window, {  
	auditTypes : null,
	waitWorks : null,
	auditTypeItems : null,
	accordion :null,
	grids : [],
	itemsDef : [],
	auditOfficeForm : null,
	loadData : function(){
	    for(var i = 0;i < this.grids.length ; i++){
			this.grids[i].loadData(0,15);
	    }
	},
	constructor : function(_cfg) {
		if(_cfg == null) {
			_cfg = {};
		}
		Ext.apply(this, _cfg);
		this.auditTypeItems = [];
		if(this.waitWorks ){
			if(this.waitWorks.waitContractQuoCount > 0){
				var it = new Ext.ffc.WorkFlowWaitOfficeChildPanel({requestUrl:PATH + '/WaitWorksInforAction.do?ffc=findWaitQuotation2ContractInfors',workType:'FFC002',callBackMethod:Ext.ffc.ShowEditContractWindow});
				
				this.grids.push(it);
				this.auditTypeItems.push(
					{
						id : "FFC002",
						layout : 'fit',
						width: 100,
						height: 200,
						title : '现有 [' + this.waitWorks.waitContractQuoCount + '] 份报价单需编制合同',
						items : it
					}
				);
			}
			if(this.waitWorks.waitorderConCount > 0){
				var it = new Ext.ffc.WorkFlowWaitOfficeChildPanel({requestUrl:PATH + '/WaitWorksInforAction.do?ffc=findWaitContract2OrderInfors&orderType=1',workType:'FFC001',callBackMethod:Ext.ffc.ShowEditContractOrderWindow});
				this.grids.push(it);
				this.auditTypeItems.push(
					{
						id : "FFC001",
						layout : 'fit',
						width: 100,
						height: 200,
						title : '现有 [' + this.waitWorks.waitorderConCount + '] 份合同待采购',
						items : it
					}
				);
			}
			if(this.waitWorks.waitSelfOrderConCount > 0){
				var it = new Ext.ffc.WorkFlowWaitOfficeChildPanel({requestUrl:PATH + '/WaitWorksInforAction.do?ffc=findWaitContract2OrderInfors&orderType=0',workType:'FFC003',callBackMethod:Ext.ffc.ShowEditContractOrderWindow});
				this.grids.push(it);
				this.auditTypeItems.push(
					{
						id : "FFC003",
						layout : 'fit',
						width: 100,
						height: 200,
						title : '现有 [' + this.waitWorks.waitorderConCount + '] 份合同，待编制加工订单',
						items : it
					}
				);
			}
		}
		
		if(this.auditTypes && this.auditTypes.length > 0){
			for(var i = 0; i < this.auditTypes.length ; i++){
				var it = new Ext.ffc.WaitOfficeChildPanel({
									auditType : this.auditTypes[i]
								});
				this.grids.push(it);
				this.auditTypeItems.push(
					{
						id : this.auditTypes[i].auditFlowId,
						layout : 'fit',
						title : this.auditTypes[i].auditFlowName,
						items : it
					}
				);
			}
		}
		
		if(this.auditTypeItems.length == 0) {
			var template = new Ext.Template(
			      '<font size="3">&nbsp;您没有待办工作!</font>'
			)
			this.auditTypeItems.push(template);
		}
		
		this.accordion = new Ext.Panel({
					region:'center',
					layout:'accordion',
					defaults: {
							autoScroll: true
					},
					layoutConfig: {
							titleCollapse: true,
							animate: true
					},
					items : this.auditTypeItems
			});
		this.itemsDef.push(this.accordion);
		if(this.auditTypes && this.auditTypes.length > 0){
			this.auditOfficeForm =  new Ext.ffc.AuditOfficeForm({accordion:this.accordion,auditTypes:this.auditTypes});
			this.itemsDef.push(this.auditOfficeForm);
		}
		
		Ext.ffc.WaitOfficeWindow.superclass.constructor.call(this, {
			constrainHeader : true,
			maximizable :true,
			width : Ext.getBody().getWidth() - 100,
			height : 500,
			title :  '待办工作',
			layout :  'border',
			closeAction : 'hide',
			items : this.itemsDef
		});
	}
});  
