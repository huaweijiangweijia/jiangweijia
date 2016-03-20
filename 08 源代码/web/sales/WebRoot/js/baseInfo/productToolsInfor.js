Ext.onReady(function(){
var addNodeForm = new Ext.FormPanel({
        labelWidth: 100, 
        frame:true,
        title: '增加产品/零件',
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
                name: 'productName'
            },{
                fieldLabel: '单元',
                name: 'productUnit'
            },new Ext.form.TextArea({
                fieldLabel: '备注',
                name: 'memo',
				maxLength :50,
				width:100,
				height:100
            })
        ],

        buttons: [{
            text: '保存',
		    handler:function(){
			   addModuleFun(addNodeForm["parentId"],addNodeForm["cuNode"]);
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
							addNodeForm.findByType("textfield")[0].getEl().dom.value = '';
							addNodeForm.findByType("textfield")[1].getEl().dom.value = '';
							addNodeForm.findByType("textfield")[2].getEl().dom.value = '';
							addNodeForm.findByType("textfield")[3].getEl().dom.value = '';
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
				renderTo: 'productToolsInfor_tree',
				autoScroll:true,
				animate:true,
				height:500,
		
				enableDD:true,
				containerScroll: true,
				root: rootNode,
				dataUrl: PATH + '/proTools/listAction.do?method=getTree',
				listeners: {
					'click': function(tp){
						win.findByType("textfield")[0].getEl().dom.value = tp.id;
						win.findByType("textfield")[1].getEl().dom.value = tp.attributes.text;
						if (tp.attributes.productUnit){
							win.findByType("textfield")[2].getEl().dom.value = tp.attributes.productUnit;
						}
						if (tp.attributes.memo){
							win.findByType("textfield")[3].getEl().dom.value = tp.attributes.memo;
						}
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
	
		var simple = new Ext.FormPanel({
			header:false,
	        labelWidth: 75, 
	        buttonAlign:'left',
	        frame:true,
	        title: '模块详细信息',
			region: 'center',
	        bodyStyle:'padding:5px 5px 0',
	        width: 200,
	        defaults: {width: 100},
	        defaultType: 'textfield',
	        items: [{
	                fieldLabel: '编号',
	                name: 'id',
				    disabled :true,
					width:200,
	                allowBlank:false
	            },{
	                fieldLabel: '名称',
	                name: 'productName',
					width:200
	            },{
	                fieldLabel: '单元',
	                name: 'productUnit',
					width:200
	            },new Ext.form.TextArea({
	                fieldLabel: '备注',
	                name: 'memo',
					 anchor:'90%',
					height:100
	            })
	        ],

	        buttons: [{
	            text: '增加产品/零件',
				width:50,
			    handler:function(){
					var cuNode = tree.getSelectionModel().getSelectedNode();
					if(!cuNode){Ext.MessageBox.alert('系统提示', '请选择当前节点！.', function(){});}
					var parentId = '';
					if(cuNode.getDepth() == 0){
					    parentId = '';
					}else{
						parentId = cuNode.id;
					}
						
					addNodeForm["parentId"] = parentId;
					addNodeForm["cuNode"] = cuNode;
					addNodeWin.show();
				}
	        },{
	            text: '保存',
				width:50,
			    handler:function(){
					var cuNode = tree.getSelectionModel().getSelectedNode();
					if (cuNode == 'root'){return;}
					if(!cuNode){Ext.MessageBox.alert('系统提示', '请选择当前节点！.', function(){});}
					var productCode = win.findByType("textfield")[0].getEl().dom.value;
					if (productCode == '') {
						Ext.Msg.show({
							title : '提示',
							msg : '编号不能为空!',
							buttons : Ext.Msg.OK,
							width : 200,
							icon : Ext.MessageBox.INFO
						});
						return false;
					}
					var productName = win.findByType("textfield")[1].getEl().dom.value;
					if (productName == '') {
						Ext.Msg.show({
							title : '提示',
							msg : '名称不能为空!',
							buttons : Ext.Msg.OK,
							width : 200,
							icon : Ext.MessageBox.INFO
						});
						return false;
					}
					var content = {
							productCode:productCode,
							productName:productName,
							productUnit:win.findByType("textfield")[2].getEl().dom.value,
							memo:win.findByType("textfield")[3].getEl().dom.value,
							id: cuNode.id,
							brandCode:"",
							productBrand:"",
							sortCode:"",
							productSortId:"",
							brandCodeHistory:"",
							productSource:""
			 			 };
					Ext.Ajax.request({
						method: "post",
						params: {'content': Ext.encode(content)},
						url: PATH + '/proTools/updateProAction.do',
						success: function(response){
							cuNode.setText(productName);
							Ext.Msg.show({
								title : '保存成功',
								msg : obj,
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.INFO
							});
						},
						requestexception :function(obj){
							Ext.Msg.show({
								title : '保存失败',
								msg : obj,
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.ERROR
							});
						}
				});
					
				}
	        },{
	            text: '删除',
					width:30,
			    handler:function(){
					var cuNode = tree.getSelectionModel().getSelectedNode();
					if(!cuNode){Ext.MessageBox.alert('系统提示', '请选择当前节点！.', function(){});}
					if(cuNode.getDepth()  == 0){//
							Ext.MessageBox.alert('系统提示', '根节点不能删除！.', function(){});
					 }else{
						 Ext.MessageBox.confirm('系统提示', '请确认是否要删除当前节点!', function(btn){
								    if(btn == 'yes'){
									    deleteModuleFun(cuNode);
									}
							   });
						    
					 }
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
				title: '产品/零件信息',
				closable:true,
				width:750,
				height:450,
				plain:true,
                layout: 'border',
				modal : true,
				header:false,
				items: [nav2,simple]
			});

			
			win.show('productToolsInfor_div');
			
	
			function addModuleFun(parentId,cuNode){
				var productCode = addNodeWin.findByType("textfield")[0].getEl().dom.value;
				if (productCode == '') {
					Ext.Msg.show({
						title : '提示',
						msg : '编号不能为空!',
						buttons : Ext.Msg.OK,
						width : 200,
						icon : Ext.MessageBox.INFO
					});
					return false;
				}
				var productName = addNodeWin.findByType("textfield")[1].getEl().dom.value;
				if (productName == '') {
					Ext.Msg.show({
						title : '提示',
						msg : '名称不能为空!',
						buttons : Ext.Msg.OK,
						width : 200,
						icon : Ext.MessageBox.INFO
					});
					return false;
				}
				var content = {
								productCode:productCode,
								productName:productName,
								productUnit:addNodeWin.findByType("textfield")[2].getEl().dom.value,
								memo:addNodeWin.findByType("textfield")[3].getEl().dom.value,
								'parentId': parentId,
								leaf:1,
								brandCode:"",
								productBrand:"",
								sortCode:"",
								productSortId:"",
								brandCodeHistory:"",
								productSource:""
				 			 };
				content = Ext.encode(content);
						Ext.Ajax.request({
						method: "post",
						params: {
							content : content
						},
						url: PATH + '/proTools/addAction.do',
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
								var node = new Ext.tree.TreeNode({
									text: productName,
									draggable:false,
									id:responseArray.id
								});
								
								if(!cuNode){//没有选择结点
										tree.getRootNode().appendChild(node);
								 }else{
										cuNode.appendChild(node);
								 }
							} else {
								Ext.Msg.show({
											title : '错误提示',
											msg : responseArray.msg,
											buttons : Ext.Msg.OK,
											width : 200,
											icon : Ext.MessageBox.ERROR
										});
								return;
							}
							
							
						},
						requestexception :function(obj){
						    
						}
				});
			}

			function deleteModuleFun(node){
				Ext.Ajax.request({
						method: "post",
						params: {'id': node.id},
						url: PATH + '/proTools/deleteProAction.do',
						success: function(response){
								node.remove() ;
								win.findByType("textfield")[0].getEl().dom.value='';
								win.findByType("textfield")[1].getEl().dom.value='';
								win.findByType("textfield")[2].getEl().dom.value='';
								win.findByType("textfield")[3].getEl().dom.value='';
						},
						requestexception :function(obj){
							Ext.Msg.show({
								title : '错误提示',
								msg : obj,
								buttons : Ext.Msg.OK,
								width : 200,
								icon : Ext.MessageBox.ERROR
							});
						}
				});
			}


 });
