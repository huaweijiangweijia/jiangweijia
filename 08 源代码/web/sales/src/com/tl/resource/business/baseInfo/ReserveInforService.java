package com.tl.resource.business.baseInfo;

import java.util.List;
import java.util.Map;

public interface ReserveInforService {
	List<Map<String,Object>> findDtReserveInforByProductCode(String productCode);
}
