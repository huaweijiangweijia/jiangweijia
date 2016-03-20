package com.tl.resource.business.contractOrder;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;

import com.tl.common.SystemConstants;
import com.tl.common.util.ArrayUtil;
import com.tl.common.util.GenerateSerial;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.baseInfo.BaseInfoService;
import com.tl.resource.business.contract.ContractViewService;
import com.tl.resource.business.dto.AccessoriesDto;
import com.tl.resource.business.dto.ContractInforDto;
import com.tl.resource.business.dto.ContractProductDetailDto;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;
import com.tl.resource.dao.TAccessoriesDAO;
import com.tl.resource.dao.TCompanyInforDAO;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TContractProductDetailDAO;
import com.tl.resource.dao.TContractProjectSortInforDAO;
import com.tl.resource.dao.TExchangeRateDAO;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TOrderPriceHistoryDAO;
import com.tl.resource.dao.TResourcePurviewDAO;
import com.tl.resource.dao.TSalesPriceHistoryDAO;
import com.tl.resource.dao.TSuppliersInforDAO;
import com.tl.resource.dao.constant.TOrderInforConstant;
import com.tl.resource.dao.constant.TResourcePurviewConstant;
import com.tl.resource.dao.pojo.TAccessories;
import com.tl.resource.dao.pojo.TAccessoriesExample;
import com.tl.resource.dao.pojo.TCompanyInfor;
import com.tl.resource.dao.pojo.TContractInfor;
import com.tl.resource.dao.pojo.TContractInforExample;
import com.tl.resource.dao.pojo.TContractProjectSortInfor;
import com.tl.resource.dao.pojo.TExchangeRate;
import com.tl.resource.dao.pojo.TOrderDetail;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOrderInforExample;
import com.tl.resource.dao.pojo.TOrderPriceHistory;
import com.tl.resource.dao.pojo.TResourcePurviewExample;
import com.tl.resource.dao.pojo.TSalesPriceHistory;
import com.tl.resource.dao.pojo.TSuppliersInfor;

public class ContractOrderServiceImpl implements ContractOrderService {
	
	private TOrderInforDAO orderInforDao;
	private TOrderDetailDAO orderDetailDao;
	private TContractInforDAO contractInforDao;
	private TSuppliersInforDAO suppliersInforDao;
	private TContractProductDetailDAO contractProductDetailDao;
	private TContractProjectSortInforDAO contractProjectSortInforDao;
	private TOrderPriceHistoryDAO orderPriceHistoryDao;
	private TAccessoriesDAO accessoriesDAO;
	private TSalesPriceHistoryDAO tsalesPriceHistoryDAO;
	private TCompanyInforDAO companyInforDAO;
	private TExchangeRateDAO exchangeRateDAO;
	private TResourcePurviewDAO resourcePurviewDAO;
	private BaseInfoService baseInfoService;
	@Override
	public List<TOrderInfor> getContractOrderList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderInforDao.getOrderList(parmMap);
	}
	
	
	
	@Override
	public int getOrderTotal(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		Integer in = orderInforDao.getOrderTotal(parmMap);
		return in.intValue();
	}



	@Override
	public List<OrderDetialsDto> getOrderDetailsList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.getCOrderDetail(parmMap);
	}

	
	@Override
	public int getOrderDetailsListCount(String orderId) {
		// TODO Auto-generated method stub
		return orderDetailDao.getOrderDetailsTotal(orderId);
	}	
	
	@Override
	public void deleteContractOrderById(String id) {
		// TODO Auto-generated method stub
		orderInforDao.deleteByPrimaryKey(id);
	}

	@Override
	public void deleteOrderDetailByOrderId(String orderId) {
		// TODO Auto-generated method stub
		orderDetailDao.deleteByOrderId(orderId);
	}

	

	@Override
	public void deleteOrder(String[] ids) {
		// TODO Auto-generated method stub
		if(ids!=null&&ids.length>0)
		{
			for(int i = 0 ; i < ids.length ; i++)
			{
				orderDetailDao.deleteByOrderId(ids[i]);
				orderInforDao.deleteByPrimaryKey(ids[i]);
			}
		}
	}

	@Override
	public String cancelAudit(String id) {
		// TODO Auto-generated method stub
		orderInforDao.cancelAudit(id);
		return null;
	}

	@Override
	public String endAudit(String id) {
		// TODO Auto-generated method stub
		orderInforDao.endAudit(id);
//		Map<String, Object> parmMap = new HashMap<String, Object>();
//		parmMap.put("orderId", id);
//		OrderInfoDto orderInfor = orderInforDao.getExcelOrderInfor(id);
//		List<OrderDetialsDto> orderDetailList  = orderDetailDao.getROrderDetailsList(parmMap);
//		if(orderDetailList!=null&&orderDetailList.iterator().hasNext())
//		{
//			for(int i = 0;i<orderDetailList.size();i++)
//			{
//				orderPriceHistoryDao.insertSelective(changeModel(orderDetailList.get(i),orderInfor));
//			}
//		}
		return null;
	}
	
	public TOrderPriceHistory changeModel(OrderDetialsDto orderDetail,OrderInfoDto orderInfor){
		TExchangeRate ratePo = exchangeRateDAO.selectByPrimaryKey(orderInfor.getCurrencyId());
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("toolsId", orderDetail.getToolsId());
		List<TSalesPriceHistory> list = tsalesPriceHistoryDAO.getHistoryMarketPrice(parmMap);
		
		TOrderPriceHistory  orderPirceHistory = new TOrderPriceHistory(); 
		orderPirceHistory.setId(GenerateSerial.getUUID());
		orderPirceHistory.setSuppliersInforId(orderInfor.getSupplierId());
		orderPirceHistory.setProductToolsInforId(orderDetail.getToolsId());
		orderPirceHistory.setLeaf(1);
		orderPirceHistory.setParentId("root");
		orderPirceHistory.setProductCode(orderDetail.getProductCode());
		orderPirceHistory.setHistoryPrice(orderDetail.getPrice().multiply(ratePo.getRate()));
		orderPirceHistory.setBrandCode(orderDetail.getBrandCode());
		orderPirceHistory.setEditDate(new Date());
		orderPirceHistory.setUserId(orderInfor.getUserId());
		orderPirceHistory.setUserName(orderInfor.getUserName());
		orderPirceHistory.setStockPriceDate(orderInfor.getEditDate());
		if(list.size()>0)
		{
			orderPirceHistory.setHistoryMarketPrice(list.get(0).getHistoryPrice());
		}
		return orderPirceHistory;
	}


	@Override
	public TOrderInfor getOrderInforById(String id) {
		// TODO Auto-generated method stub
		return orderInforDao.selectByPrimaryKey(id);
	}

	@Override
	public String submitAudit(String id) {
		// TODO Auto-generated method stub
		orderInforDao.submitAudit(id);
		return null;
	}


	@Override
	public List<ContractInforDto> getContractList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractInforDao.getContractList(parmMap);
	}
	
	
	
	@Override
	public int getContractListCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractInforDao.getContractListCount(parmMap);
	}



	@Override
	public List<TSuppliersInfor> getSupplierList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return suppliersInforDao.getSupplierList(parmMap);
	}

	

	@Override
	public int getSupplierListCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return suppliersInforDao.getSupplierListCount(parmMap);
	}



	@Override
	public List<OrderDetialsDto> getContractDetailList(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.selectOrderDetailFromContract(parmMap);
	}

	

	@Override
	public Integer getContractDetailListCount(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.selectOrderDetailCountFromContract(parmMap);
	}


	@Override
	public List<TContractProjectSortInfor> getCPSIList(String contractId) {
		// TODO Auto-generated method stub
		return contractProjectSortInforDao.getCPSIList(contractId);
	}
	
//	@Override
//	public TOrderInfor insertOrder(TOrderInfor order) {
//		// TODO Auto-generated method stub
//		return orderInforDao.insertOrder(order);
//	}
	
	@Override
	public boolean addOrder(TOrderInfor order, JSONArray orderDetails) {
		// TODO Auto-generated method stub
		if(order != null) {
			 orderInforDao.insertOrder(order);
			
			Iterator<JSONObject> iterator = orderDetails.iterator();
			ArrayList<OrderDetialsDto> list = new ArrayList<OrderDetialsDto>();
			while (iterator.hasNext()) {
				JSONObject details = iterator.next();				
				OrderDetialsDto dto = null;
				try {
					dto = (OrderDetialsDto) JSONObject.toBean(details,OrderDetialsDto.class);
				} catch (RuntimeException e) {
					e.printStackTrace();
				}
				dto.setId(GenerateSerial.getUUID());
				dto.setParentToolsId("root");
				dto.setStockOrderInforId(order.getId());
				orderDetailDao.insertOrderDetail(dto);
			}
		}
		return true;
	}
	
	private ArrayList<OrderDetialsDto> addChildrenorderDe(JSONObject orderDe, OrderDetialsDto dto,String orderId) {
		JSONArray arr = orderDe.getJSONArray("children");
		ArrayList<OrderDetialsDto> list = new ArrayList<OrderDetialsDto>();
		for (Iterator iterator2 = arr.iterator(); iterator2.hasNext();) {			
			JSONObject top = (JSONObject) iterator2.next();
			String nodeId = GenerateSerial.getUUID();
			OrderDetialsDto po2 = (OrderDetialsDto) JSONObject.toBean(top,OrderDetialsDto.class);
			po2.setParentToolsId(dto.getId());
			po2.setId(nodeId);
			po2.setStockOrderInforId(orderId);
			list.add(po2);
			JSONArray arr2 = null;
			try {
				arr2 = top.getJSONArray("children");
				
			} catch(Exception e) {
				po2.setLeaf(1);
			}
			orderDetailDao.insertOrderDetail(po2);
			if(arr2 != null && arr2.size() > 0){
				po2.setChildren(addChildrenorderDe(top,po2,orderId));
			}else{
				//System.out.println("ddd:");
			}
		}
		dto.setChildren(list);
		return list;
	}


	@Override
	public OrderDetialsDto insertOrderDetail(OrderDetialsDto orderDetail) {
		// TODO Auto-generated method stub
		return orderDetailDao.insertOrderDetail(orderDetail);
	}
	
	
	@Override
	public void updateOrder(TOrderInfor order,JSONArray orderDetails) {
		if(order != null) {
			 orderInforDao.updateByPrimaryKeySelective(order);
			
			 if(orderDetails!=null)
			 {
				Iterator<JSONObject> iterator = orderDetails.iterator();
				ArrayList<OrderDetialsDto> list = new ArrayList<OrderDetialsDto>();
				while (iterator.hasNext()) {
					JSONObject details = iterator.next();				
					OrderDetialsDto dto = null;
					try {
						dto = (OrderDetialsDto) JSONObject.toBean(details,OrderDetialsDto.class);
						if(details.getString("leaf").equals("true"))
						{
							dto.setLeaf(1);
						}
						else if(details.getString("leaf").equals("false"))
						{
							dto.setLeaf(0);
						}
					} catch (RuntimeException e) {
						e.printStackTrace();
					}
					if(dto.getId()!=null&&dto.getId().length() == 32)
					{
						TOrderDetail orderDetailpo = new TOrderDetail();
						try {
							BeanUtils.copyProperties(orderDetailpo, dto);
						} catch (IllegalAccessException e) {
							e.printStackTrace();
						} catch (InvocationTargetException e) {
							e.printStackTrace();
						}
						orderDetailDao.updateByPrimaryKeySelective(orderDetailpo);
					}
					else
					{
						dto.setId(GenerateSerial.getUUID());
						dto.setStockOrderInforId(order.getId());
						orderDetailDao.insertOrderDetail(dto);
					}
				}
			}
		}
	}
	
	private ArrayList<OrderDetialsDto> updateChildrenorderDe(JSONObject orderDe, OrderDetialsDto dto,String orderId) {
		JSONArray arr = orderDe.getJSONArray("children");
		ArrayList<OrderDetialsDto> list = new ArrayList<OrderDetialsDto>();
		for (Iterator iterator2 = arr.iterator(); iterator2.hasNext();) {			
			JSONObject top = (JSONObject) iterator2.next();
			OrderDetialsDto po2 = (OrderDetialsDto) JSONObject.toBean(top,OrderDetialsDto.class);
			po2.setParentToolsId(dto.getId());
			po2.setStockOrderInforId(orderId);
			list.add(po2);
			JSONArray arr2 = null;
			try {
				arr2 = top.getJSONArray("children");
				
			} catch(Exception e) {
				po2.setLeaf(1);
			}
			if(po2.getId()!=null&&dto.getId().length() == 32)
			{
				TOrderDetail orderDetailpo = new TOrderDetail();
				try {
					BeanUtils.copyProperties(orderDetailpo, po2);
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				orderDetailpo.setContractProductDetailId(null);
				orderDetailDao.updateByPrimaryKeySelective(orderDetailpo);
			}
			else
			{
				po2.setId(GenerateSerial.getUUID());
				orderDetailDao.insertOrderDetail(po2);
			}
			if(arr2 != null && arr2.size() > 0){
				po2.setChildren(addChildrenorderDe(top,po2,orderId));
			}else{
				//System.out.println("ddd:");
			}
		}
		dto.setChildren(list);
		return list;
	}

	@Override
	public void updateOrderDetail(OrderDetialsDto orderDetail) {
		// TODO Auto-generated method stub
		TOrderDetail orderDetailpo = new TOrderDetail();
		try {
			BeanUtils.copyProperties(orderDetailpo, orderDetail);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		orderDetailDao.updateByPrimaryKeySelective(orderDetailpo);
	}
	
	

	@Override
	public int PlaceOrder(TOrderInfor order) {
		// TODO Auto-generated method stub
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", order.getId());
		OrderInfoDto orderInfor = orderInforDao.getExcelOrderInfor(order.getId());
		List<OrderDetialsDto> orderDetailList  = orderDetailDao.getROrderDetailsList(parmMap);
		if(orderDetailList!=null&&orderDetailList.iterator().hasNext())
		{
			for(int i = 0;i<orderDetailList.size();i++)
			{
				orderPriceHistoryDao.insertSelective(changeModel(orderDetailList.get(i),orderInfor));
			}
		}
		return orderInforDao.updateByPrimaryKeySelective(order);
	}



	@Override
	public void deleteOrderDetail(String[] id,TOrderInfor orderInfor) {
		// TODO Auto-generated method stub
		for(int i=0;i<id.length;i++)
		{
			orderDetailDao.deleteByPrimaryKey(id[i]);
		}
		orderInforDao.updateByPrimaryKeySelective(orderInfor);
	}
	

	@Override
	public List<ContractProductDetailDto> getContractDetail(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractProductDetailDao.getCOrderContractDetail(parmMap);
	}



	@Override
	public int getContractDetailCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		Integer in = contractProductDetailDao.getCOrderContractDetailCount(parmMap);
		return in.intValue();
	}

	
	

	@Override
	public TSuppliersInfor getSupplierById(String id) {
		return suppliersInforDao.selectByPrimaryKey(id);
	}


	@Override
	public OrderInfoDto getExcelOrderInfor(String id) {
		// TODO Auto-generated method stub
		return orderInforDao.getExcelOrderInfor(id);
	}



	@Override
	public List<AccessoriesDto> getAccessoriesByBussinesId(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return accessoriesDAO.getAccessoriesByBusId(parmMap);
	}
	
	@Override
	public Map<String, Object> getOrderTotalMoneys(Map<String, Object> parmMap) {
		Map<String, Object> rt = orderInforDao.getOrderTotalMoneys(parmMap);
		return rt;
	}

	@Override
	public List<TOrderDetail> cmprStockPrice(Map<String, Object> parmMap){
		// TODO Auto-generated method stub
		return orderDetailDao.cmprStockPrice(parmMap);
	}

	@Override
	public TCompanyInfor getCompanyInfor(String id) {
		// TODO Auto-generated method stub
		return companyInforDAO.selectByPrimaryKey(id);
	}
	
	@Override
	public TSuppliersInfor getSuppliersInfor(String id) {
		// TODO Auto-generated method stub
		return suppliersInforDao.selectByPrimaryKey(id);
	}

	@Override
	public List<OrderDetialsDto> getOrderDetailForPrint(Map<String, Object> parmMap)
	{
		return orderDetailDao.getROrderDetailsList(parmMap);
	}




	@Override
	public PaginationSupport pageContractOrderWithPart(
			Map<String, Object> params) {
		TOrderInforExample orderInforExample =  whereContractWithPart(params);
		List<TOrderInfor> list = getContractWithPart(params,orderInforExample);
		int count = this.orderInforDao.countByExample(orderInforExample);
		return new PaginationSupport(list, count);
	}


	@Override
	public List<TOrderInfor> getContractOrderWithPart(Map<String, Object> params) {
		TOrderInforExample orderInforExample = whereContractWithPart(params);
		return getContractWithPart(params,orderInforExample);
	}

	private List<TOrderInfor> getContractWithPart(Map<String, Object> params,TOrderInforExample orderInforExample) {
		if(params.get(SystemConstants.ORDER_KEY) != null){
			String order = (String)params.get(SystemConstants.ORDER_KEY);
			orderInforExample.setOrderByClause(order);
		}
		List<TOrderInfor> rst = this.orderInforDao.selectByExample(orderInforExample,(Integer)params.get(SystemConstants.START_INDEX_KEY),(Integer)params.get(SystemConstants.PAGE_SIZE_KEY));
		if(params.get(ContractOrderService.LOAD_ACCESSORIES_GET_CONTRACT_ORDER_WITH_PART) != null &&
				(Boolean)params.get(ContractOrderService.LOAD_ACCESSORIES_GET_CONTRACT_ORDER_WITH_PART) ==  true){
			this.loadAccessories(rst);
		}
		return rst;
	}
	
	private TOrderInforExample whereContractWithPart(Map<String,Object> params){
		TOrderInforExample orderInforExample = new TOrderInforExample();
		TOrderInforExample.Criteria orderInforCriteria = orderInforExample.createCriteria();
		TResourcePurviewExample resourcePurviewExample = new TResourcePurviewExample();
		TResourcePurviewExample.Criteria resourcePurviewCriteria = resourcePurviewExample.createCriteria();
		List result = null;
		//查询此用户还可以查看其它哪些用户的数据的权限
		if(StringUtils.isNotBlank((String)params.get(TResourcePurviewConstant.USER_ID))){
			resourcePurviewCriteria.andUserIdEqualTo((String)params.get(TResourcePurviewConstant.USER_ID));
		}
		if(params.get(TResourcePurviewConstant.RESOURCE_TYPE) != null){
			resourcePurviewCriteria.andResourceTypeEqualTo((Integer)params.get(TResourcePurviewConstant.RESOURCE_TYPE));
		}
		if(resourcePurviewCriteria.isValid()){
			result = resourcePurviewDAO.selectByExample(resourcePurviewExample);
			List<Object> list = ArrayUtil.getFieldList(result, "targetUserId");
			if(list.size() != 0){
				orderInforCriteria.andUserIdIn(list);
			}
		}
		if(params.get(TOrderInforConstant.ORDER_TYPE) != null){
			orderInforCriteria.andOrderTypeEqualTo((Integer)params.get(TOrderInforConstant.ORDER_TYPE));
		}
		return orderInforExample;
	}


	@Override
	public int countContractOrderWithPart(Map<String, Object> params) {
		TOrderInforExample orderInforExample = whereContractWithPart(params);
		return this.orderInforDao.countByExample(orderInforExample);
	}
	
	@Override
	public void loadAccessories(List<TOrderInfor> list) {
		//查看设置附件信息
		List<Object> contractIds = ArrayUtil.getFieldList(list, "id");
		Map<String,List<TAccessories>> accessoriesMap = baseInfoService.getAccessoriesInfo(contractIds);
		for(TOrderInfor orderInfor : list){
			if(accessoriesMap.get(orderInfor.getId()) == null){
				orderInfor.setFileCount(0);
			}else{
				orderInfor.setFileCount(accessoriesMap.get(orderInfor.getId()).size());
			}
		}
	}
	
	public TOrderInforDAO getOrderInforDao() {
		return orderInforDao;
	}
	public void setOrderInforDao(TOrderInforDAO orderInforDao) {
		this.orderInforDao = orderInforDao;
	}
	
	public TOrderDetailDAO getOrderDetailDao() {
		return orderDetailDao;
	}

	public void setOrderDetailDao(TOrderDetailDAO orderDetailDao) {
		this.orderDetailDao = orderDetailDao;
	}

	public TContractInforDAO getContractInforDao() {
		return contractInforDao;
	}

	public void setContractInforDao(TContractInforDAO contractInforDao) {
		this.contractInforDao = contractInforDao;
	}

	public TSuppliersInforDAO getSuppliersInforDao() {
		return suppliersInforDao;
	}

	public void setSuppliersInforDao(TSuppliersInforDAO suppliersInforDao) {
		this.suppliersInforDao = suppliersInforDao;
	}

	public TContractProductDetailDAO getContractProductDetailDao() {
		return contractProductDetailDao;
	}

	public void setContractProductDetailDao(
			TContractProductDetailDAO contractProductDetailDao) {
		this.contractProductDetailDao = contractProductDetailDao;
	}

	public TContractProjectSortInforDAO getContractProjectSortInforDao() {
		return contractProjectSortInforDao;
	}

	public void setContractProjectSortInforDao(
			TContractProjectSortInforDAO contractProjectSortInforDao) {
		this.contractProjectSortInforDao = contractProjectSortInforDao;
	}

	public TOrderPriceHistoryDAO getOrderPriceHistoryDao() {
		return orderPriceHistoryDao;
	}

	public void setOrderPriceHistoryDao(TOrderPriceHistoryDAO orderPriceHistoryDao) {
		this.orderPriceHistoryDao = orderPriceHistoryDao;
	}

	public TAccessoriesDAO getAccessoriesDAO() {
		return accessoriesDAO;
	}

	public void setAccessoriesDAO(TAccessoriesDAO accessoriesDAO) {
		this.accessoriesDAO = accessoriesDAO;
	}

	public TSalesPriceHistoryDAO getTsalesPriceHistoryDAO() {
		return tsalesPriceHistoryDAO;
	}

	public void setTsalesPriceHistoryDAO(TSalesPriceHistoryDAO tsalesPriceHistoryDAO) {
		this.tsalesPriceHistoryDAO = tsalesPriceHistoryDAO;
	}

	public TCompanyInforDAO getCompanyInforDAO() {
		return companyInforDAO;
	}

	public void setCompanyInforDAO(TCompanyInforDAO companyInforDAO) {
		this.companyInforDAO = companyInforDAO;
	}



	public TExchangeRateDAO getExchangeRateDAO() {
		return exchangeRateDAO;
	}



	public void setExchangeRateDAO(TExchangeRateDAO exchangeRateDAO) {
		this.exchangeRateDAO = exchangeRateDAO;
	}

	public TResourcePurviewDAO getResourcePurviewDAO() {
		return resourcePurviewDAO;
	}
	public void setResourcePurviewDAO(TResourcePurviewDAO resourcePurviewDAO) {
		this.resourcePurviewDAO = resourcePurviewDAO;
	}
	public BaseInfoService getBaseInfoService() {
		return baseInfoService;
	}
	public void setBaseInfoService(BaseInfoService baseInfoService) {
		this.baseInfoService = baseInfoService;
	}
}
