package com.tl.common.smartupload;

public class Constant {
	/**
	 * 上传路径
	 */
	public static final String UPLOAD_DIR="/upload";
	
	/**
	 * 模板路径
	 */
	public static final String TEMPLETE_DIR=UPLOAD_DIR + "/templete";
	
	/**
	 * 数据导入文件临时路径
	 */
	public static final String TEMP_DIR="/temp";
	
	/**
	 * 工具信息模板文件路径
	 */
	public static final String TOOLStEMPLETE_FILE=TEMPLETE_DIR + "/toolsTemplete.xls";
	
	/**
	 * 普通报价单模板路径
	 */
	public static final String GENERALQUO_FILE= TEMPLETE_DIR + "/generalQuo.xls";
	
	/**
	 * 入库单模板路径
	 */
	public static final String ARRIVAL_FILE= TEMPLETE_DIR + "/arrival_templete.xls";
	/**
	 * 单文件最大大小，单位KB
	 */
	public static final double MAXFILESIZE = 110*1024;
	
	/**
	 * 允许上传的文件类型
	 */
	public static final String ALLOWEDEXTENSIONS = ",jpg,jpeg,gif,png,chm,txt,pdf,doc,xls,rar,zip,";
	
	/**
	 * 报价单列表模板文件
	 */
	public static final String QUOLIST_FILE = TEMPLETE_DIR + "/quotation_list_templete.xls";
	
	/**
	 * 入库单列表模板文件
	 */
	public static final String ARRIVALLIST_FILE = TEMPLETE_DIR + "/arrival_list_templete.xls";
	
	/**
	 * 工具信息导出模板文件
	 */
	public static final String TOOLS_LIST_FILE = TEMPLETE_DIR + "/tools_list_Templete.xls";
	
	/**
	 * 工具普通导入模板
	 */
	public static final String GENER_TOOLS_TEMPLETE_FIEL = TEMPLETE_DIR + "/generTemplete.xls";
	
	/**
	 * 预订报价单列表模板文件
	 */
	public static final String RESERVE_QUOLIST_FILE = TEMPLETE_DIR + "/reserve_quotation_list_templete.xls";
	
	/**
	 * 试刀报价单列表模板文件
	 */
	public static final String TESTCUT_QUOLIST_FILE = TEMPLETE_DIR + "/testcut_quotation_list_templete.xls";
	/**
	 * 
	 */
	public static final String SYSTEM_STEP_FILE_DIR = UPLOAD_DIR + "/sysstep";
	
	/**
	 * 预订入库列表导出模板
	 */
	public static final String RESERVE_LIST_TEMPLETE_FILE = TEMPLETE_DIR + "/reserve_arrival_list_templete.xls";
	
	/**
	 * 直接入库列表导出模板
	 */
	public static final String DIRECT_LIST_TEMPLETE_FILE = TEMPLETE_DIR + "/direct_arrival_list_templete.xls";
	
	/**
	 * 储备入库列表导出模板
	 */
	public static final String STORE_LIST_TEMPLETE_FILE = TEMPLETE_DIR + "/store_arrival_list_templete.xls";
}
