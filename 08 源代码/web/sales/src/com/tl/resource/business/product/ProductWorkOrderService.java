package com.tl.resource.business.product;

import java.util.List;
import java.util.Map;

import com.tl.resource.dao.pojo.TProductWorkOrder;

public interface ProductWorkOrderService {
	public List<TProductWorkOrder> getProductWorkOrderList(
			Map<String, Object> parmMap);

	public int getProductWorkOrderCount(Map<String, Object> parmMap);

	public boolean saveProductWorkOrder(TProductWorkOrder productWorkOrder);

	public boolean updateProductWorkOrder(TProductWorkOrder productWorkOrder);

	public boolean deleteProductWorkOrder(String id);
}
