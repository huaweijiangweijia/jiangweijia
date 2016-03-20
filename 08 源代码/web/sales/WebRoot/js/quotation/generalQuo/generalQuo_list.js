Ext.onReady(function() {
	Ext.form.Field.prototype.msgTarget = 'side';
	//报价单类型0 普通 1 项目 2 零兴 3 预订 4 试刀
	var generalQuo = new Ext.ftl.generalQuo.QuoIndexPanel({quoType : 0});
	generalQuo.render('index_ct');
	var _store = generalQuo.centerPanel.getStore();
	_store.load({params : {start : 0, limit : PAGESIZE}});
	Ext.ffc.ResizeManager.addResizeObject(generalQuo);
})