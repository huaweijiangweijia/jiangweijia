package com.tl.resource.business.selfOrder;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.common.util.GenerateSerial;
import com.tl.resource.business.dto.AccessoriesDto;
import com.tl.resource.business.dto.ContractDetailDto;
import com.tl.resource.business.dto.ContractInforDto;
import com.tl.resource.business.dto.ContractProductDetailDto;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;
import com.tl.resource.dao.TAccessoriesDAO;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TContractProductDetailDAO;
import com.tl.resource.dao.TContractProjectSortInforDAO;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TOrderPriceHistoryDAO;
import com.tl.resource.dao.TSalesPriceHistoryDAO;
import com.tl.resource.dao.TSuppliersInforDAO;
import com.tl.resource.dao.pojo.TContractProjectSortInfor;
import com.tl.resource.dao.pojo.TOrderDetail;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOrderPriceHistory;
import com.tl.resource.dao.pojo.TSalesPriceHistory;
import com.tl.resource.dao.pojo.TSuppliersInfor;

public class SelfOrderServiceImpl implements SelfOrderService {
	
	private TOrderInforDAO orderInforDao;
	private TOrderDetailDAO orderDetailDao;
	private TContractInforDAO contractInforDao;
	private TSuppliersInforDAO suppliersInforDao;
	private TContractProductDetailDAO contractProductDetailDao;
	private TContractProjectSortInforDAO contractProjectSortInforDao;
	private TOrderPriceHistoryDAO orderPriceHistoryDao;
	private TAccessoriesDAO accessoriesDAO;
	private TSalesPriceHistoryDAO tsalesPriceHistoryDAO;

	
	@Override
	public List<TOrderInfor> getContractOrderList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderInforDao.getOrderList(parmMap);
	}
	
	@Override
	public int getContractOrderListCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderInforDao.getOrderTotal(parmMap);
	}

	@Override
	public List<OrderDetialsDto> getOrderDetailsList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.getOrderDetailsList(parmMap);
	}


	
	@Override
	public int getOrderDetialTotalCountByOrderId(String orderId) {
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
		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("orderId", id);
		OrderInfoDto orderInfor = orderInforDao.getExcelOrderInfor(id);
		List<OrderDetialsDto> orderDetailList  = orderDetailDao.getROrderDetailsList(parmMap);
		if(orderDetailList!=null&&orderDetailList.iterator().hasNext())
		{
			for(int i = 0;i<orderDetailList.size();i++)
			{
				orderPriceHistoryDao.insertSelective(changeModel(orderDetailList.get(i),orderInfor));
			}
		}
		return null;
	}
	
	public TOrderPriceHistory changeModel(OrderDetialsDto orderDetail,OrderInfoDto orderInfor){
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
		orderPirceHistory.setHistoryPrice(orderDetail.getPrice());
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
		return contractInforDao.getPOrderContractList(parmMap);
	}
	
	@Override
	public int getContractListCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractInforDao.getPOrderContractListCount(parmMap);
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
		return contractProductDetailDao.getContractDetailList(parmMap);
	}

	

	@Override
	public Integer getContractDetailListCount(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractProductDetailDao.getContractDetailListCount(parmMap);
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
	public void addOrder(TOrderInfor order, JSONArray orderDetails) {
		// TODO Auto-generated method stub
		if(order != null) {
			 orderInforDao.insertOrder(order);
			
			Iterator<JSONObject> iterator = orderDetails.iterator();
			ArrayList<OrderDetialsDto> list = new ArrayList<OrderDetialsDto>();
			while (iterator.hasNext()) {
				JSONObject details = iterator.next();				
				OrderDetialsDto dto = null;
				try {
					//System.out.println(details);
					dto = (OrderDetialsDto) JSONObject.toBean(details,OrderDetialsDto.class);
				} catch (RuntimeException e) {
					e.printStackTrace();
				}
				dto.setId(GenerateSerial.getUUID());
				dto.setParentToolsId("root");
				dto.setStockOrderInforId(order.getId());
				dto.setProjectCode(dto.getProjectCode().equals("")?null:dto.getProjectCode());
				orderDetailDao.insertOrderDetail(dto);
				if(dto.getChildren()!=null&&dto.getChildren().iterator().hasNext())
				{
					addChildrenorderDe(details,dto,order.getId());
				}

				list.add(dto);
			}
		}
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
			if(po2.getDeliveryDate().equals(""))
			{
				po2.setDeliveryDate(null);
			}
			if(po2.getProjectCode().equals(""))
			{
				po2.setProjectCode(null);
			}
			if(po2.getSerialNumber().equals(""))
			{
				po2.setSerialNumber(null);
			}
			po2.setContractProductDetailId(po2.getContractProductDetailId().equals("")?GenerateSerial.getUUID():po2.getContractProductDetailId());
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
	public void updateOrder(TOrderInfor order, JSONArray orderDetails,String[] ids) {
		// TODO Auto-generated method stub
		if(order != null) {
			 orderInforDao.updateByPrimaryKeySelective(order);
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
				List<OrderDetialsDto> orderDetailList = orderDetailDao.getOrderDetailById(dto.getContractProductDetailId());
				if(orderDetailList.size()>0)
				{
					TOrderDetail orderDetailpo = new TOrderDetail();
					try {
						BeanUtils.copyProperties(orderDetailpo, dto);
						orderDetailpo.setId(orderDetailList.get(0).getId());
						orderDetailpo.setProjectCode(orderDetailpo.getProjectCode().equals("")?null:orderDetailpo.getProjectCode());
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						e.printStackTrace();
					}
					orderDetailpo.setStockOrderInforId(null);
					orderDetailDao.updateByPrimaryKeySelective(orderDetailpo);
				}
				else
				{
					dto.setId(GenerateSerial.getUUID());
					dto.setStockOrderInforId(order.getId());
					dto.setProjectCode(dto.getProjectCode().equals("")?null:dto.getProjectCode());
					orderDetailDao.insertOrderDetail(dto);
				}
				if(dto.getChildren()!=null&&dto.getChildren().iterator().hasNext())
				{
					updateChildrenorderDe(details,dto,order.getId());
				}

				list.add(dto);
			}
//			if(ids!=null)
//			{
//				for(int i=0;i<ids.length;i++)
//				{	
//					orderDetailDao.deleteOrderDetailById(ids[i]);
//				}
//			}
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
			po2.setDeliveryDate(null);
			po2.setProjectCode(null);
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
				orderDetailpo.setStockOrderInforId(null);
				orderDetailDao.updateByPrimaryKeySelective(orderDetailpo);
			}
			else
			{
				po2.setId(GenerateSerial.getUUID());
				po2.setContractProductDetailId(po2.getContractProductDetailId().equals("")?GenerateSerial.getUUID():po2.getContractProductDetailId());
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
	public OrderDetialsDto insertOrderDetail(OrderDetialsDto orderDetail) {
		// TODO Auto-generated method stub
		return orderDetailDao.insertOrderDetail(orderDetail);
	}

	@Override
	public void updateOrder(TOrderInfor order) {
		// TODO Auto-generated method stub
		orderInforDao.updateByPrimaryKeySelective(order);
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
		return orderInforDao.updateByPrimaryKeySelective(order);
	}

	
	@Override
	public boolean deleteOrderDetailById(String id,TOrderInfor orderInfor) {
		boolean isExit = false;
		List<OrderDetialsDto> list = orderDetailDao.getOrderDetailById(id);
		ArrayList idList = new ArrayList();
		if(list.size()>0)
		{
			idList.add(list.get(0).getId());
			cascade(list.get(0),idList);
			isExit = true;
			orderInforDao.updateByPrimaryKeySelective(orderInfor);
		}
		// TODO Auto-generated method stub
		if(idList.size()>0)
		{
			for(int i=0;i<idList.size();i++)
			{
				orderDetailDao.deleteByPrimaryKey(idList.get(i).toString());
			}
		}
		return isExit;
	}
	
	public void cascade(OrderDetialsDto node,ArrayList list)
	{
		if(node.getChildren().size()>0)
		{
			for(int i=0;i<node.getChildren().size();i++)
			{
				list.add(node.getChildren().get(i).getId());
				cascade(node.getChildren().get(i),list);
			}
		}
	}
	
	
	@Override
	public List<ContractProductDetailDto> getContractDetail(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractProductDetailDao.getContractDetail(parmMap);
	}



	@Override
	public int getContractDetailCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		Integer in = contractProductDetailDao.getContractDetailCount(parmMap);
		return in.intValue();
	}
	
	
	@Override
	public TSuppliersInfor getSupplierById(String id) {
		return suppliersInforDao.selectByPrimaryKey(id);
	}
	
	

	@Override
	public List<OrderDetialsDto> getExcelOrderDetail(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.getOrderDetailsLists(parmMap);
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
	public List<OrderDetialsDto> getPartContractDetail(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return contractProductDetailDao.getPartContractDetail(parmMap);
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
	
	
	
}
