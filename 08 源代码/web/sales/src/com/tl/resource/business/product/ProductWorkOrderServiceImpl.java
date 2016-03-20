package com.tl.resource.business.product;

import java.util.List;
import java.util.Map;

import com.tl.resource.dao.TProductWorkOrderDAO;
import com.tl.resource.dao.pojo.TProductWorkOrder;

public class ProductWorkOrderServiceImpl implements ProductWorkOrderService {

	private TProductWorkOrderDAO tProductWorkOrderDAO;

	public TProductWorkOrderDAO gettProductWorkOrderDAO() {
		return tProductWorkOrderDAO;
	}

	public void settProductWorkOrderDAO(
			TProductWorkOrderDAO tProductWorkOrderDAO) {
		this.tProductWorkOrderDAO = tProductWorkOrderDAO;
	}

	@Override
	public List<TProductWorkOrder> getProductWorkOrderList(
			Map<String, Object> parmMap) {
		return tProductWorkOrderDAO.getProductWorkOrderList(parmMap);
	}

	@Override
	public int getProductWorkOrderCount(Map<String, Object> parmMap) {
		return tProductWorkOrderDAO.getProductWorkOrderCount(parmMap);
	}

	@Override
	public boolean deleteProductWorkOrder(String id) {
		return tProductWorkOrderDAO.deleteProductWorkOrder(id);
	}

	@Override
	public boolean saveProductWorkOrder(TProductWorkOrder productWorkOrder) {
		return tProductWorkOrderDAO.saveProductWorkOrder(productWorkOrder);
	}

	@Override
	public boolean updateProductWorkOrder(TProductWorkOrder productWorkOrder) {
		return tProductWorkOrderDAO.updateProductWorkOrder(productWorkOrder);
	}

}
