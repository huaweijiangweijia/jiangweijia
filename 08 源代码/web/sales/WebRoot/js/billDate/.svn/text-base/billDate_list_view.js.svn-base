Ext.onReady(function(){
	var PAGESIZE = parseInt((Ext.getBody().getHeight()-220)/24);
	var billDateInforListStore = new Ext.data.Store({
	   remoteSort : true,
       proxy: new Ext.data.HttpProxy({url:PATH + '/billDate/billDateViewAction.do?ffc=billDateList&limit=' + PAGESIZE}),//调用的动作 
	   reader: new Ext.data.JsonReader({
       root: 'items',  //从struts2里面传递过来的参数 
	   totalProperty :'totalCount'
     }, 
	 [ //JSON数据的映射
        {name: 'id',mapping:'id',type:'string'},
		{name: 'outStockCode',mapping:'outStockCode',type:'string'},
        {name: 'memo',mapping:'memo',type:'string'},
        {name: 'outStockType',mapping:'outStockType',type:'string'},
		{name: 'outStockDate',mapping:'outStockDate',type:'string'},
		{name: 'userName',mapping:'userName',type:'string'},
		{name: 'editDateString',mapping:'editDateString',type:'string'},
		{name: 'status',mapping:'status',type:'string'},
		{name: 'fileCount',mapping:'fileCount',type:'int'}
     ])
	});
	
});