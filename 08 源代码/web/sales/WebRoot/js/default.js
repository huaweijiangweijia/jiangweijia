var loadProcedureStore = function(productId){
	var path = PATH + '/baseInfo/workProcedureAction.do?m=get&productId='+productId;
	procedureStore.proxy = new Ext.data.HttpProxy({url:path});
	procedureStore.load();
}

var procedureStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url: ''
    }),
    //调用的动作 
    reader: new Ext.data.JsonReader({
        root: 'results',
        successProperty: 'total'
    },
    [{
        name: 'id',
        mapping: 'id',
        type: 'string'
    },
    {
        name: 'procedureIdx',
        mapping: 'procedureIdx',
        type: 'string'
    },
    {
        name: 'procedureName',
        mapping: 'procedureName',
        type: 'string'
    },
    {
        name: 'procedureDesc',
        mapping: 'procedureDesc',
        type: 'string'
    }])
});
var procedureGridCheckSele = new Ext.grid.CheckboxSelectionModel({header:'',singleSelect:true});;
var procedureGrid = new Ext.grid.EditorGridPanel({
    split: true,
    ds: procedureStore,
    store: procedureStore,
    sm: procedureGridCheckSele,
    columns: [procedureGridCheckSele, {
        header: "id",
        dataIndex: 'id',
        hidden: true
    },
    {
        header: "编号",
        width: 120,
        dataIndex: 'procedureIdx',
        editor: new Ext.form.TextField({
            allowBlank: false
        })
    },
    {
        header: "工序名称",
        width: 120,
        dataIndex: 'procedureName',
        editor: new Ext.form.TextField({
            allowBlank: false
        })
    },
    {
        header: "工序描述",
        width: 200,
        dataIndex: 'procedureDesc',
        editor: new Ext.form.TextField({
            allowBlank: false
        })
    }

    ],
    width: 360,
    height: 600,
    region: 'center'
    
});



//建立根
var rootNode = new Ext.tree.AsyncTreeNode({
    text: '目录',
    draggable: false,
    id: 'root'
});

var selectProductId = '';
var productTree = new Ext.tree.TreePanel({
    renderTo: 'treeDiv',
    autoScroll: true,
    animate: true,
    height: 500,
    enableDD: true,
    containerScroll: true,
    root: rootNode,
    dataUrl: PATH + '/proTools/listAction.do?method=getTree',
    listeners: {
        'click': function(tp) {
            selectProductId = tp.id;
        },
        'beforemovenode': function(tree, node, oldParent, newParent, index) {
            if (oldParent.attributes.id != newParent.attributes.id) {
                return false;
            }
            return true;
        }
    }
});

var productPanel = new Ext.Panel({
    header: false,
    title: '功能模块树',
    region: 'west',
    split: true,
    width: 300,
    height : 200,
    collapsible: true,
    margins: '3 0 3 3',
    cmargins: '3 3 3 3',
    layout: "fit",
    items: [productTree]
});

var getSelectProductId = function(){
	return selectProductId;
}

var getProcedureIds = function(){
	var arr = procedureGridCheckSele.getSelections();
	var paraArr = [];
	for(var i = 0 ;i < arr.length;i++){
	   paraArr.push(arr[i].id);
	}
	return paraArr;
}