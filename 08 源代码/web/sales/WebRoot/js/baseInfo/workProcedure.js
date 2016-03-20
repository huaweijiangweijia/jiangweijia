Ext.onReady(function(){
var addNodeForm = new Ext.FormPanel({
        labelWidth: 100, 
        frame:true,
        title: '增加工序',
		region: 'center',
        bodyStyle:'padding:5px 5px 0',
        width: 200,
        defaults: {width: 100},
        defaultType: 'textfield',

        items: [{
                fieldLabel: '编号',
                name: 'productCode'
			   
            },{
                fieldLabel: '名称',
                name: 'procedureName'
            },new Ext.form.TextArea({
                fieldLabel: '描述',
                name: 'procedureDesc',
				maxLength :50,
				width:100,
				height:100
            })
        ],

        buttons: [{
            text: '保存',
		    handler:function(){
			   var procedureIdx = addNodeForm.findByType("textfield")[0].getEl().dom.value;
				if (procedureIdx == '') {
					Ext.Msg.show({
						title : '提示',
						msg : '编号不能为空!',
						buttons : Ext.Msg.OK,
						width : 200,
						icon : Ext.MessageBox.INFO
					});
					return false;
				}
				var procedureName = addNodeForm.findByType("textfield")[1].getEl().dom.value;
				if (procedureName == '') {
					Ext.Msg.show({
						title : '提示',
						msg : '工序名称不能为空!',
						buttons : Ext.Msg.OK,
						width : 200,
						icon : Ext.MessageBox.INFO
					});
					return false;
				}
				var content = {
						productId:addNodeForm["cuNode"].id,
						procedureIdx:procedureIdx,
						procedureName:procedureName,
						procedureDesc:addNodeForm.findByType("textfield")[2].getEl().dom.value};
				
						data = Ext.encode(content);
						Ext.Ajax.request({
						method: "post",
						params: {
							data : data
						},
						url: PATH + '/baseInfo/workProcedureAction.do?m=add',
						success: function(response){
							var responseArray = Ext.util.JSON.decode(response.responseText);
							if (responseArray.success == true) {
								Ext.Msg.show({
									title : '成功提示',
									msg : responseArray.msg,
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								var path = PATH + '/baseInfo/workProcedureAction.do?m=get&productId='+ addNodeForm["cuNode"].id;
								rolesStore.proxy = new Ext.data.HttpProxy({url:path});
								rolesStore.load();
							} else {
								Ext.Msg.show({
											title : '错误提示',
											msg : responseArray.msg,
											buttons : Ext.Msg.OK,
											width : 200,
											icon : Ext.MessageBox.ERROR
										});
							}
							
							
						},
						requestexception :function(obj){
						    
						}
				});
			   addNodeWin.hide();
			}
        },{
            text: '关闭',
		    handler:function(){
			   addNodeWin.hide();
			}
        }]
    });

		var addNodeWin = new Ext.Window({
				header:false,
				closable:true,
				width:260,
				height:250,
				plain:true,
                layout: 'border',
				items: addNodeForm,
				listeners: {
					'show':function(win){
					}
				}
			});
			//建立根
			 var rootNode = new Ext.tree.AsyncTreeNode( {
				text: '产品/零件',
				draggable:false,
				id:'root'
			});
			var tree=new Ext.tree.TreePanel( {
				renderTo: 'workProcedure_tree',
				autoScroll:true,
				animate:true,
				height:500,
				enableDD:true,
				containerScroll: true,
				root: rootNode,
				dataUrl: PATH + '/proTools/listAction.do?method=getTree',
				listeners: {
					'click': function(tp){
						if (tp.id == 'root'){
							return;
						}
						var path = PATH + '/baseInfo/workProcedureAction.do?m=get&productId='+ tp.id;
						rolesStore.proxy = new Ext.data.HttpProxy({url:path});
						rolesStore.load();
						rolesStore.clearModified();
					},
					'beforemovenode' : function(  tree,  node,  oldParent,  newParent,  index ) {
						if(oldParent.attributes.id != newParent.attributes.id){
							return false;
						}
						return true;
					}
				}
			});

			

		var nav2 = new Ext.Panel({
			header:false,
            title: '功能模块树',
            region: 'west',
            split: true,
            width: 300,
            collapsible: true,
            margins:'3 0 3 3',
            cmargins:'3 3 3 3',
			layout:"fit",
			items:[tree]
        });
	
		
		
		 var rolesStore = new Ext.data.Store({
		       proxy: new Ext.data.HttpProxy(
		    		   {url:PATH + '/baseInfo/workProcedureAction.do?m=get'}),//调用的动作 
		       reader: new Ext.data.JsonReader({
		       root: 'results',  
		       successProperty :'total'
		     }, 
		     [ 
		      	{name: 'id',mapping:'id',type:'string'},
		        {name: 'procedureIdx',mapping:'procedureIdx',type:'string'},
		        {name: 'procedureName',mapping:'procedureName',type:'string'},
		        {name: 'procedureDesc',mapping:'procedureDesc',type:'string'}
		     ])
		    });
		 var gridCheckSele = new Ext.grid.CheckboxSelectionModel();
		    var procedureGrid = new Ext.grid.EditorGridPanel({
		        split: true,
		        ds : rolesStore,
		        store: rolesStore,
		        sm:gridCheckSele,
		        columns: [
		              gridCheckSele,
		              {header: "id",  dataIndex: 'id',hidden:true},
		              {header: "编号", width: 120, dataIndex: 'procedureIdx',editor:new Ext.form.TextField({
		    				allowBlank:false
		    			})},
		              {header: "工序名称", width: 120, dataIndex: 'procedureName',editor:new Ext.form.TextField({
		    				allowBlank:false
		    			})},
		              {header: "工序描述", width: 200, dataIndex: 'procedureDesc',editor:new Ext.form.TextField({
		    				allowBlank:false
		    			})}
		             
		     ],
		       width:360,
		       height:600,
		       region: 'center',
		       tbar: [{
		            text: '增加工序',
					width:50,
				    handler:function(){
						var cuNode = tree.getSelectionModel().getSelectedNode();
						if(!cuNode){Ext.MessageBox.alert('系统提示', '请选择当前节点！.', function(){});}
							
						addNodeForm["cuNode"] = cuNode;
						addNodeWin.show();
					}
		        },{
		            text: '保存',
					width:50,
				    handler:function(){
						var modifiedRecords = rolesStore.getModifiedRecords();
						var params = [];
						for(var i = 0; i < modifiedRecords.length;i++){
							var data = modifiedRecords[i].data;
							if (data.procedureIdx == ''){
								Ext.Msg.show({
									title : '提示',
									msg : '编号不能为空!',
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							if (data.procedureName == ''){
								Ext.Msg.show({
									title : '提示',
									msg : '工序名称不能为空!',
									buttons : Ext.Msg.OK,
									width : 200,
									icon : Ext.MessageBox.INFO
								});
								return false;
							}
							params.push(data);
							
						}
						if (params.length == 0){
							Ext.Msg.show({
								title : '提示',
								msg : '没有需要保存的工序!',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
							});
							return false;
						}
						Ext.Ajax.request({
							method: "post",
							params: {'data': Ext.encode(params)},
							url: PATH + '/baseInfo/workProcedureAction.do?m=update',
							success: function(response){
								var responseArray = Ext.util.JSON.decode(response.responseText);
								if (responseArray.success){
									rolesStore.clearModified();
									Ext.Msg.show({
										title : '保存成功',
										msg : responseArray.msg,
										buttons : Ext.Msg.OK,
										width : 200,
										icon : Ext.MessageBox.INFO
									});
								}else{
									Ext.Msg.show({
										title : '保存失败',
										msg : responseArray.msg,
										buttons : Ext.Msg.OK,
										width : 200,
										icon : Ext.MessageBox.ERROR
									});
								}
								
							},
							requestexception :function(obj){
							}
					});
						
					}
		        },{
		            text: '删除',
						width:30,
				    handler:function(){
				    	var arr = gridCheckSele.getSelections();
						var paraArr = [];
						for(var i = 0 ;i < arr.length;i++){
							console.log(arr[i])
						   paraArr.push(arr[i].id);
						}
						if (paraArr.length == 0){
							Ext.Msg.show({
								title : '提示',
								msg : '请选择要删除的工序!',
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
							});
							return false;
						}
						Ext.Ajax.request({
							method: "post",
							params: {'data': Ext.encode(paraArr)},
							url: PATH + '/baseInfo/workProcedureAction.do?m=delete',
							success: function(response){
								var responseArray = Ext.util.JSON.decode(response.responseText);
								if (responseArray.success){
									Ext.Msg.show({
										title : '提示信息',
										msg : responseArray.msg,
										buttons : Ext.Msg.OK,
										width : 200,
										icon : Ext.MessageBox.INFO
									});
									rolesStore.load();
								}else{
									Ext.Msg.show({
										title : '提示信息',
										msg : responseArray.msg,
										buttons : Ext.Msg.OK,
										width : 200,
										icon : Ext.MessageBox.ERROR
									});
								}
								
							},
							requestexception :function(obj){
							}
					});
					}
		        },{
		            text: '关闭',
						width:30,
				    handler:function(){
					   win.hide();
					}
		        }]
		    });
		    
			var win = new Ext.Window({
				title: '工艺信息',
				closable:true,
				width:800,
				height:400,
				plain:true,
                layout: 'border',
				modal : true,
				header:false,
				items: [nav2,procedureGrid]
			});

			
			win.show('workProcedure_div');
			



 });
