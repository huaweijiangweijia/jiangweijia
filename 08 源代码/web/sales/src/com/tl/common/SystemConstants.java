package com.tl.common;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class SystemConstants {
	
	public static final String PAGE_SIZE_KEY = "pageSize";
	
	public static final String START_INDEX_KEY = "startIndex";
	
	public static final String ORDER_KEY = "order";

	// 定义每页显示的记录数（页长）
	public static final int PAGE_SIZE = 15;

	// 定义缓存分页一次读取数据的数量
	public static final int CACHE_RECORD_SIZE = 20;

	// 系统管理员的用户类型
	public static final int USER_ADMIN_TYPE = 1;
	
	public static final DateFormat dfYYYYMMDDHHMM = new SimpleDateFormat("yyyy-MM-dd HH:mm");
}
