package com.tl.resource.business.planOrder;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
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
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;
import com.tl.resource.business.dto.ReservePlanDetailDto;
import com.tl.resource.business.dto.SuppliersInforDto;
import com.tl.resource.business.dto.ReserveOrderDto;
import com.tl.resource.business.dto.TreeDto;
import com.tl.resource.dao.TAccessoriesDAO;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TOrderPriceHistoryDAO;
import com.tl.resource.dao.TProductToolsInforDAO;
import com.tl.resource.dao.TQuotationInforDAO;
import com.tl.resource.dao.TReservePlanInforDAO;
import com.tl.resource.dao.TSalesPriceHistoryDAO;
import com.tl.resource.dao.TSuppliersInforDAO;
import com.tl.resource.dao.pojo.TOrderDetail;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOrderInforExample;
import com.tl.resource.dao.pojo.TOrderPriceHistory;
import com.tl.resource.dao.pojo.TQuotationInforExample;
import com.tl.resource.dao.pojo.TReservePlanInfor;
import com.tl.resource.dao.pojo.TSalesPriceHistory;
import com.tl.resource.dao.pojo.TSuppliersInfor;
import com.tl.resource.dao.pojo.TSuppliersInforExample;

public class PlanOrderServiceImpl implements PlanOrderService{
	
	private TOrderInforDAO orderInforDao;
	private TOrderDetailDAO orderDetailDao;
	private TSuppliersInforDAO suppliersInforDao;
	private TProductToolsInforDAO proToolsInforDao;
	private TReservePlanInforDAO reservePlanInforDao;
	private TOrderPriceHistoryDAO orderPriceHistoryDao;
	private TAccessoriesDAO accessoriesDAO;
	private TSalesPriceHistoryDAO tsalesPriceHistoryDAO;


	@SuppressWarnings("unchecked")
	@Override
	public List<TOrderInfor> getReserveOrderList(int status) {
		// TODO Auto-generated method stub
		TOrderInforExample order = new TOrderInforExample();
		order.or(order.createCriteria().andStatusEqualTo(status));
		return orderInforDao.selectByExample(order);
	}
	
	

	@Override
	public List<TOrderInfor> getOrderList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderInforDao.getOrderList(parmMap);
	}

	

	@Override
	public int getOrderListCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderInforDao.getOrderTotal(parmMap);
	}



	@Override
	public int getOrderTotal(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderInforDao.getOrderTotal(parmMap);
	}



	@Override
	public List<OrderDetialsDto> getOrderDetailsList(
			Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.getOrderDetailsLists(parmMap);
	}
	
	@Override
	public int getOrderDetailsTotal(String orderId) {
		// TODO Auto-generated method stub
		return orderDetailDao.getOrderDetailsTotal(orderId);
	}
	
	@Override
	public List<TSuppliersInfor> getSuppliersInforList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return suppliersInforDao.getSuppliersByPage(parmMap);
	}
	
	

	@Override
	public int getSuppliersInforListCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		Integer in = suppliersInforDao.getSuppliersTotal(parmMap);
		return in.intValue();
	}



	@Override
	public OrderDetialsDto  insertOrderDetail(OrderDetialsDto orderDetail) {
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
	public void deleteOrder(String[] orderId) {
		// TODO Auto-generated method stub
		if(orderId!=null&&orderId.length>=0)
		{
			for(int i=0;i<orderId.length;i++)
			{
				reservePlanInforDao.updateReservePlanByOrderId(orderId[i]);
				orderDetailDao.deleteByOrderId(orderId[i]);
				orderInforDao.deleteByPrimaryKey(orderId[i]);
			}
			
		}
		
	}

	
	@Override
	public TOrderInfor insertOrder(TOrderInfor order) {
		return orderInforDao.insertOrder(order);
	}
	
	@Override
	public void addOrder(TOrderInfor order,JSONArray orderDetails)
	{
		if(order != null) {
			 orderInforDao.insertOrder(order);
			
			Iterator<JSONObject> iterator = orderDetails.iterator();
			ArrayList<OrderDetialsDto> list = new ArrayList<OrderDetialsDto>();
			int f = 0;//序号
			while (iterator.hasNext()) {
				JSONObject details = iterator.next();	
				String id = GenerateSerial.getUUID();
				if(details.getJSONArray("pid").size() >0)
				{
					for(int i=0;i<details.getJSONArray("pid").size();i++)
					{
						TReservePlanInfor record = new TReservePlanInfor();
						record.setId(details.getJSONArray("pid").get(i).toString());
						record.setStatus(4);
						record.setMatStockOrderDetailId(id);
						reservePlanInforDao.updateByPrimaryKeySelective(record);
					}
				}
				details.remove("pid");
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
					dto.setSerialNumber(BigDecimal.valueOf(Double.valueOf(String.valueOf(f))));
				} catch (RuntimeException e) {
					e.printStackTrace();
				}
				dto.setId(id);
				dto.setParentToolsId("root");
				dto.setStockOrderInforId(order.getId());
				orderDetailDao.insertOrderDetail(dto);
			}
			f++;
		}
		
	}
	

	@Override
	public void updateOrder(TOrderInfor order, JSONArray orderDetails,String[] ids) {
		// TODO Auto-generated method stub
		if(order != null) {
			 orderInforDao.updateByPrimaryKeySelective(order);
			
			Iterator<JSONObject> iterator = orderDetails.iterator();
			ArrayList<OrderDetialsDto> list = new ArrayList<OrderDetialsDto>();
			int f = 0;//序号
			while (iterator.hasNext()) {
				JSONObject details = iterator.next();	
				String id = details.getString("id");
				if(details.getString("id")==null || ("").equals(details.getString("id")))
				{
					id = GenerateSerial.getUUID();
				}
				if(details.has("pid"))
				{
					if(details.getJSONArray("pid").size() >0)
					{
						for(int i=0;i<details.getJSONArray("pid").size();i++)
						{
							TReservePlanInfor record = new TReservePlanInfor();
							record.setId(details.getJSONArray("pid").get(i).toString());
							record.setStatus(4);
							record.setMatStockOrderDetailId(id);
							reservePlanInforDao.updateByPrimaryKeySelective(record);
						}
					}
					details.remove("pid");
				}
				
				OrderDetialsDto dto = null;
				try {
					dto = (OrderDetialsDto) JSONObject.toBean(details,OrderDetialsDto.class);
					dto.setLeaf(0);
					dto.setSerialNumber(BigDecimal.valueOf(Double.valueOf(String.valueOf(f))));
				} catch (Exception e) {
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
					orderDetailpo.setContractProductDetailId(null);
					orderDetailDao.updateByPrimaryKeySelective(orderDetailpo);
				}
				else
				{
					dto.setId(id);
					dto.setStockOrderInforId(order.getId());
					orderDetailDao.insertOrderDetail(dto);
				}
			if(ids!=null)
			{
				for(int i=0;i<ids.length;i++)
				{	
					orderDetailDao.deleteByPrimaryKey(ids[i]);
					TReservePlanInfor record = new TReservePlanInfor();
					record.setId(ids[i]);
					record.setStatus(2);
					record.setMatStockOrderDetailId("");
					reservePlanInforDao.updateByPrimaryKeySelective(record);
				}
			}
			f++;
		}
		
		}
	}



	@Override
	public void deleteOrderDetail(String orderId) {
		// TODO Auto-generated method stub
		orderDetailDao.deleteByOrderId(orderId);
	}

	@Override
	public void deleteOrderDetailById(String[] ids) {
		// TODO Auto-generated method stub
		for(int i=0;i<ids.length;i++)
		{
			orderDetailDao.deleteByPrimaryKey(ids[i]);
		}
		
	}

	@Override
	public List<TreeDto> getProToolsBySearch(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return proToolsInforDao.getOrderProToolsList(parmMap);
	}

	@Override
	public int getProToolsTotal(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return proToolsInforDao.getOrderProToolsTotal(parmMap);
	}

	@Override
	public List<ReservePlanDetailDto> getPlanList(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return reservePlanInforDao.getPlanList(parmMap);
	}


	@Override
	public int getPlanListCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return reservePlanInforDao.getPlanListCount(parmMap);
	}

	@Override
	public int PlaceOrder(TOrderInfor order) {
		// TODO Auto-generated method stub
		return orderInforDao.updateByPrimaryKeySelective(order);
	}
	
	
	@Override
	public List<OrderDetialsDto> getOrderDetailsLists(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.getROrderDetailsList(parmMap);
	}



	@Override
	public int getOrderDetailsListsCount(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return orderDetailDao.getROrderDetailsListCount(parmMap);
	}

	@Override
	public TSuppliersInfor getSupplierById(String id) {
		return suppliersInforDao.selectByPrimaryKey(id);
	}

	public TOrderDetailDAO getOrderDetailDao() {
		return orderDetailDao;
	}

	public void setOrderDetailDao(TOrderDetailDAO orderDetailDao) {
		this.orderDetailDao = orderDetailDao;
	}

	
	public TOrderInforDAO getOrderInforDao() {
		return orderInforDao;
	}
	public void setOrderInforDao(TOrderInforDAO orderInforDao) {
		this.orderInforDao = orderInforDao;
	}


	public TSuppliersInforDAO getSuppliersInforDao() {
		return suppliersInforDao;
	}

	public void setSuppliersInforDao(TSuppliersInforDAO suppliersInforDao) {
		this.suppliersInforDao = suppliersInforDao;
	}

	public TProductToolsInforDAO getProToolsInforDao() {
		return proToolsInforDao;
	}

	public void setProToolsInforDao(TProductToolsInforDAO proToolsInforDao) {
		this.proToolsInforDao = proToolsInforDao;
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
	public String submitAudit(String id) {
		// TODO Auto-generated method stub
		orderInforDao.submitAudit(id);
		return null;
	}

	@Override
	public TOrderInfor getOrderInforById(String id) {
		// TODO Auto-generated method stub
		return orderInforDao.selectByPrimaryKey(id);
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



	public TReservePlanInforDAO getReservePlanInforDao() {
		return reservePlanInforDao;
	}

	public void setReservePlanInforDao(TReservePlanInforDAO reservePlanInforDao) {
		this.reservePlanInforDao = reservePlanInforDao;
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
