package com.tl.resource.business.reservePlan;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.common.util.GenerateSerial;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.ReservePlanDetailDto;
import com.tl.resource.business.dto.ReservePlanMainInforDto;
import com.tl.resource.business.manage.BillsCodeDefService;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TReservePlanInforDAO;
import com.tl.resource.dao.pojo.TOrderDetail;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TReservePlanInfor;
import com.tl.resource.dao.pojo.TReservePlanInforExample;
import com.tl.resource.dao.pojo.TReservePlanInforExample.Criteria;

public class ReservePlanServiceImp implements ReservePlanService {
	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	private TOrderDetailDAO orderDetailDao;
	private TOrderInforDAO orderInforDao;
	private TReservePlanInforDAO reservePlanInforDAO;
	private BillsCodeDefService billsCodeDefService ;
	@Override
	public void addReservePlan(ReservePlanMainInforDto dto) {
		// TODO Auto-generated method stub
		List<ReservePlanDetailDto> list = dto.getReservePlanDetail();
		try {
			TOrderDetail orderDetailRecord = new TOrderDetail();
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				ReservePlanDetailDto reservePlanDetailDto = (ReservePlanDetailDto) iterator.next();
				TReservePlanInfor record = new TReservePlanInfor();
				BeanUtils.copyProperties(record, reservePlanDetailDto);
				record.setId(GenerateSerial.getUUID());
				record.setEditDate(dto.getEditDate());
				record.setUserId(dto.getUserId());
				record.setUserName(dto.getUserName());
				record.setContractCode(dto.getContractCode());
				record.setContractId(dto.getContractId());
				record.setOrderInforId(dto.getOrderInforId());
				record.setOrderCode(dto.getOrderCode());
				record.setStatus(0);
				
				record.setPlanCode(billsCodeDefService.getBillCode("07", null, null,null));
				reservePlanInforDAO.insert(record);
			}
			
			TOrderInfor orderInforRecord = new TOrderInfor();
			orderInforRecord.setId(dto.getOrderInforId());
			orderInforRecord.setStatus(6);
			orderInforDao.updateByPrimaryKeySelective(orderInforRecord );
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public ReservePlanMainInforDto consultReserveInfors(String orderId) {
		ReservePlanMainInforDto dto = new ReservePlanMainInforDto();
		TOrderInfor orderInfor = orderInforDao.selectByPrimaryKey(orderId);
		dto.setContractCode(orderInfor.getContractCode());
		//dto.setContractId(orderInfor)
		dto.setOrderCode(orderInfor.getOrderCode());
		dto.setOrderInforId(orderInfor.getId());
		List<ReservePlanDetailDto> reservePlanDetail = new ArrayList<ReservePlanDetailDto>();
		dto.setReservePlanDetail(reservePlanDetail );
		List<OrderDetialsDto> list = orderDetailDao.getOrderDetailsHasReserveInfor1(orderId);
		try {
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				OrderDetialsDto orderDetialsDto = (OrderDetialsDto) iterator.next();
				ReservePlanDetailDto dtod = new ReservePlanDetailDto();
				BeanUtils.copyProperties(dtod, orderDetialsDto);
				dtod.setStockOrderDetailId(dtod.getId());
				dtod.setId(null);
				if(dtod.getOrderAmount() == null) dtod.setOrderAmount(BigDecimal.ZERO);
				if(dtod.getReserveAmount() == null) dtod.setReserveAmount(BigDecimal.ZERO);
				
				reservePlanDetail.add(dtod);
				if(orderDetialsDto.getLeaf() == 0){
					dtod.setChildren(copyChildrenNodes(orderDetialsDto));
				}
			}
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return dto;
	}

	private List<ReservePlanDetailDto> copyChildrenNodes(
			OrderDetialsDto orderDetialsDto) {
		List<ReservePlanDetailDto> reservePlanDetail = new ArrayList<ReservePlanDetailDto>();
		List<OrderDetialsDto> list = orderDetialsDto.getChildren();
		if(list == null) return null;
		try {
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				OrderDetialsDto torderDetialsDto = (OrderDetialsDto) iterator.next();
				ReservePlanDetailDto dtod = new ReservePlanDetailDto();
				BeanUtils.copyProperties(dtod, torderDetialsDto);
				dtod.setStockOrderDetailId(dtod.getId());
				dtod.setId(null);
				reservePlanDetail.add(dtod);
				if(torderDetialsDto.getLeaf() == 0){
					dtod.setChildren(copyChildrenNodes(torderDetialsDto));
				}else{
					if(dtod.getOrderAmount().doubleValue() <= dtod.getRemainAmount().doubleValue()){
						dtod.setPlanAmount(BigDecimal.ZERO);
					}else{
						dtod.setPlanAmount(dtod.getOrderAmount().subtract(dtod.getRemainAmount()));
					}
				}
			}
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return reservePlanDetail;
	}

	@Override
	public void deleteReservePlanById(String id) {
		
		TReservePlanInfor plan = reservePlanInforDAO.selectByPrimaryKey(id);
		
		TReservePlanInfor record = new TReservePlanInfor();
		record .setId(id);
		record.setPlanAmount(BigDecimal.ZERO);
		reservePlanInforDAO.updateByPrimaryKeySelective(record);
		
		TReservePlanInforExample example = new TReservePlanInforExample();
		example.createCriteria().andOrderInforIdEqualTo(plan.getOrderInforId()).andPlanAmountGreaterThan(BigDecimal.ZERO);
		int c = reservePlanInforDAO.countByExample(example );
		if(c == 0){
			TOrderInfor orderInforRecord = new TOrderInfor();
			orderInforRecord.setId(plan.getOrderInforId());
			orderInforRecord.setStatus(2);
			orderInforDao.updateByPrimaryKeySelective(orderInforRecord );
			
			TReservePlanInforExample example2 = new TReservePlanInforExample();
			example2.createCriteria().andOrderInforIdEqualTo(plan.getOrderInforId());
			reservePlanInforDAO.deleteByExample(example2);
		}
	}

	@Override
	public ReservePlanMainInforDto getReservePlanMainInfor(String orderId) {
		ReservePlanMainInforDto dto = new ReservePlanMainInforDto();
		List<ReservePlanDetailDto> list = reservePlanInforDAO.getReservePlanDetail(orderId);
		if(list.size() > 0){
			TReservePlanInforExample example = new TReservePlanInforExample();
			example.createCriteria().andOrderInforIdEqualTo(orderId);
			List<TReservePlanInfor> l = reservePlanInforDAO.selectByExample(example );
			TReservePlanInfor p = l.get(0);
			try {
				BeanUtils.copyProperties(dto, p);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		dto.setReservePlanDetail(list);
		return dto;
	}

	@Override
	public void updateReservePlan(List<ReservePlanDetailDto> plans) {
		TReservePlanInfor record = new TReservePlanInfor();
		TOrderDetail orderDetailRecord = new TOrderDetail();
		for (Iterator iterator = plans.iterator(); iterator.hasNext();) {
			ReservePlanDetailDto reservePlanDetailDto = (ReservePlanDetailDto) iterator
					.next();
			record.setId(reservePlanDetailDto.getId());
			record.setPlanAmount(reservePlanDetailDto.getPlanAmount());
			reservePlanInforDAO.updateByPrimaryKeySelective(record);
			
			
			orderDetailRecord.setId(reservePlanDetailDto.getStockOrderDetailId());
			orderDetailRecord.setOrderAmount(reservePlanDetailDto.getOrderAmount());
			orderDetailDao.updateByPrimaryKeySelective(orderDetailRecord );
		}
	}

	public TOrderDetailDAO getOrderDetailDao() {
		return orderDetailDao;
	}

	public void setOrderDetailDao(TOrderDetailDAO orderDetailDao) {
		this.orderDetailDao = orderDetailDao;
	}

	public TReservePlanInforDAO getReservePlanInforDAO() {
		return reservePlanInforDAO;
	}

	public void setReservePlanInforDAO(TReservePlanInforDAO reservePlanInforDAO) {
		this.reservePlanInforDAO = reservePlanInforDAO;
	}

	public TOrderInforDAO getOrderInforDao() {
		return orderInforDao;
	}

	public void setOrderInforDao(TOrderInforDAO orderInforDao) {
		this.orderInforDao = orderInforDao;
	}

	@Override
	public PaginationSupport findReservePlans(Map params, int startIndex,
			int pageSize) {
		TReservePlanInforExample example = new TReservePlanInforExample();
		Criteria c = example.createCriteria();
		if(params.get("productCode") != null && !"".equals(params.get("productCode"))){
			c.andProductCodeLike("%" + params.get("productCode") + "%");
		}
		if(params.get("contractCode") != null && !"".equals(params.get("contractCode"))){
			c.andContractCodeLike("%" + params.get("contractCode") + "%");
		}
		if(params.get("planCode") != null && !"".equals(params.get("planCode"))){
			c.andPlanCodeLike("%" + params.get("planCode") + "%");
		}
		if(params.get("orderCode") != null && !"".equals(params.get("orderCode"))){
			c.andOrderCodeLike("%" + params.get("orderCode") + "%");
		}
		if(params.get("status") != null && !"".equals(params.get("status"))){
			c.andStatusEqualTo(Integer.valueOf(params.get("status").toString()));
		}
		
		try {
			if(params.get("startDate") != null && !"".equals(params.get("startDate"))){
				c.andEditDateGreaterThanOrEqualTo(df.parse(params.get("startDate").toString()));
			}
			if(params.get("endDate") != null && !"".equals(params.get("endDate"))){
				c.andEditDateLessThanOrEqualTo(df.parse(params.get("endDate").toString()));
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		c.andPlanAmountGreaterThan(BigDecimal.ZERO);
		if(params.get("sort") != null && params.get("dir") != null){
			example.setOrderByClause(params.get("sort") + " " + params.get("dir"));
		}else{
		    example.setOrderByClause("edit_date desc");
		}
		List<TReservePlanInfor> list = reservePlanInforDAO.selectByExample(example);
		int count = reservePlanInforDAO.countByExample(example);
		PaginationSupport page = new PaginationSupport(list, count, pageSize, startIndex);
		return page;
	}

	public BillsCodeDefService getBillsCodeDefService() {
		return billsCodeDefService;
	}

	public void setBillsCodeDefService(BillsCodeDefService billsCodeDefService) {
		this.billsCodeDefService = billsCodeDefService;
	}

	@Override
	public void confirmReservePlanById(String id) {
		TReservePlanInfor record = new TReservePlanInfor();
		record.setId(id);
		record.setStatus(2);
		reservePlanInforDAO.updateByPrimaryKeySelective(record);
		
		TReservePlanInfor repo = reservePlanInforDAO.selectByPrimaryKey(id);
		TOrderDetail orderDetailRecord = new TOrderDetail();
		orderDetailRecord.setId(repo.getStockOrderDetailId());
		orderDetailRecord.setOrderAmount(repo.getPlanAmount());
		orderDetailDao.updateByPrimaryKeySelective(orderDetailRecord );
	}

	

}
