package com.tl.resource.dao;

import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.tl.resource.dao.pojo.TProductWorkOrder;

public class TProductWorkOrderDAOImpl extends SqlMapClientDaoSupport implements
		TProductWorkOrderDAO {
	public TProductWorkOrderDAOImpl() {
		super();
	}

	@Override
	public List<TProductWorkOrder> getProductWorkOrderList(
			Map<String, Object> parmMap) {
		return getSqlMapClientTemplate().queryForList(
				"t_product_work_order.getProductWorkOrderList", parmMap);
	}

	@Override
	public int getProductWorkOrderCount(Map<String, Object> parmMap) {
		return (Integer) getSqlMapClientTemplate().queryForObject(
				"t_product_work_order.getProductWorkOrderCount", parmMap);
	}

	@Override
	public boolean deleteProductWorkOrder(String id) {
		getSqlMapClientTemplate().delete(
				"t_product_work_order.deleteProductWorkOrder", id);
		return true;
	}

	@Override
	public boolean saveProductWorkOrder(TProductWorkOrder productWorkOrder) {
		getSqlMapClientTemplate()
				.insert("t_product_work_order.insertProductWorkOrder",
						productWorkOrder);
		return true;
	}

	@Override
	public boolean updateProductWorkOrder(TProductWorkOrder productWorkOrder) {
		getSqlMapClientTemplate()
				.update(
						"t_product_work_order.updateProductWorkOrder",
						productWorkOrder);
		return true;
	}

}
