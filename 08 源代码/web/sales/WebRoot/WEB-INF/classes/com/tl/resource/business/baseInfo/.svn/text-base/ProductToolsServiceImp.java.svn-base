package com.tl.resource.business.baseInfo;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.TreeDto;
import com.tl.resource.dao.TProductToolsInforDAO;
import com.tl.resource.dao.pojo.TProductToolsInfor;
import com.tl.resource.dao.pojo.TProductToolsInforExample;
import com.tl.resource.dao.pojo.TProductToolsInforExample.Criteria;

public class ProductToolsServiceImp implements ProductToolsService {
	private TProductToolsInforDAO proToolsInforDAO;
	@Override
	public PaginationSupport getProductToolsList(Map<String, Object> parmMap,int startIndex,int pageSize) {
		TProductToolsInforExample example = new TProductToolsInforExample();
		Criteria c = example.createCriteria();
		if(parmMap.get("productName") != null && !"".equals(parmMap.get("productName"))){
			c.andProductNameLike("%" + parmMap.get("productName") + "%");
		}
		if(parmMap.get("productCode") != null && !"".equals(parmMap.get("productCode"))){
		    c.andProductCodeLike("%" + parmMap.get("productCode") + "%");			
		}
		if(parmMap.get("productSortCode") != null && !"".equals(parmMap.get("productSortCode"))){
			c.andProductSortCodeEqualTo(parmMap.get("productSortCode").toString());
		}
		if(parmMap.get("brandCode") != null && !"".equals(parmMap.get("brandCode"))){
			c.andBrandCodeLike("%" + parmMap.get("brandCode") + "%");
		}
		if(parmMap.get("productBrand") != null && !"".equals(parmMap.get("productBrand"))){
			c.andProductBrandLike("%" + parmMap.get("productBrand") + "%");
		}
		if(parmMap.get("productSource") != null && !"".equals(parmMap.get("productSource"))){
			c.andProductSourceEqualTo(parmMap.get("productSource").toString());
		}
		
		if(parmMap.get("sort") != null) {
			example.setOrderByClause(parmMap.get("sort").toString() + " " + parmMap.get("dir"));
		} else {
			example.setOrderByClause(" id desc");
		}
		
		c.andParentIdEqualTo("root");
		example.setStartIndex(startIndex);
		example.setPageSize(pageSize);
		List list = proToolsInforDAO.selectByExample(example);
		int count = proToolsInforDAO.countByExample(example);
		PaginationSupport ps = new PaginationSupport(list, count, pageSize, startIndex);
		return ps;
	}

	@Override
	public void updateProductOrderPriceInfor(List<TreeDto> toolsDto) {
		// TODO Auto-generated method stub
		for (Iterator iterator = toolsDto.iterator(); iterator.hasNext();) {
			TreeDto treeDto = (TreeDto) iterator.next();
			TProductToolsInfor po = proToolsInforDAO.selectByPrimaryKey(treeDto.getId());
			po.setStockPrice(treeDto.getStockPrice());
			proToolsInforDAO.updateByPrimaryKey(po);
		}
	}

	@Override
	public void updateProductSalesPriceInfor(List<TreeDto> toolsDto) {
		// TODO Auto-generated method stub
		for (Iterator iterator = toolsDto.iterator(); iterator.hasNext();) {
			TreeDto treeDto = (TreeDto) iterator.next();
			TProductToolsInfor po = proToolsInforDAO.selectByPrimaryKey(treeDto.getId());
			po.setSalePrice(treeDto.getSalePrice());
			proToolsInforDAO.updateByPrimaryKey(po);
		}
	}

	public TProductToolsInforDAO getProToolsInforDAO() {
		return proToolsInforDAO;
	}

	public void setProToolsInforDAO(TProductToolsInforDAO proToolsInforDAO) {
		this.proToolsInforDAO = proToolsInforDAO;
	}

}
