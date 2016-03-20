package com.tl.resource.business.outStock;

import java.lang.reflect.InvocationTargetException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.resource.business.dto.OutStockDetailDto;
import com.tl.resource.business.dto.OutStockInforDto;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TOutStockDetailDAO;
import com.tl.resource.dao.TOutStockInforDAO;
import com.tl.resource.dao.pojo.TContractInfor;
import com.tl.resource.dao.pojo.TContractInforExample;
import com.tl.resource.dao.pojo.TOrderDetail;
import com.tl.resource.dao.pojo.TOrderDetailExample;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOutStockDetail;
import com.tl.resource.dao.pojo.TOutStockDetailExample;
import com.tl.resource.dao.pojo.TOutStockInfor;

public class MaterialOutStockServiceImp implements MaterialOutStockService {
	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	private TOrderInforDAO orderInforDao;
	private TOrderDetailDAO orderDetailDao;
	private TOutStockInforDAO outStockInforDAO;
	private TOutStockDetailDAO outStockDetailDAO;
	private TContractInforDAO contractInforDAO;
	@Override
	public OutStockInforDto consultOrderProducts(String orderId) {
		TOrderInfor orderInfor = orderInforDao.selectByPrimaryKey(orderId);
		OutStockInforDto osid = new OutStockInforDto();
		osid.setContractCode(orderInfor.getContractCode());
		TContractInforExample example = new TContractInforExample();
		example.createCriteria().andContractCodeEqualTo(orderInfor.getContractCode());
		List<TContractInfor> conList = contractInforDAO.selectByExample(example);
		if(conList != null && conList.size() > 0){
			TContractInfor t = conList.get(0);
			osid.setContractId(t.getId());
			osid.setContractCode(t.getContractCode());
			osid.setCustomerCode(t.getCustomerCode());
			osid.setCustomerName(t.getCustomerName());
		}
		osid.setOutStockType(3);
		osid.setOutStockDate(df.format(new Date()));
		List<OutStockDetailDto> outStockDetails = outStockDetailDAO.selectDetailHasOrderDetailInfor1(orderId);
		osid.setOutStockDetails(outStockDetails );
		return osid;
	}

	@Override
	public OutStockInforDto getOutStockInforById(String outStockInforId) {
		TOutStockDetailExample exp = new TOutStockDetailExample();
		exp.createCriteria().andOutStockInforIdEqualTo(outStockInforId);
		List<TOutStockDetail> list = outStockDetailDAO.selectByExample(exp);
		if(list != null && list.size() == 0) return null;
		TOutStockDetail det = list.get(0);
		TOrderDetailExample orderExp = new TOrderDetailExample();
		orderExp.createCriteria().andContractProductDetailIdEqualTo(det.getContractProductDetailId());
		List<TOrderDetail> l = orderDetailDao.selectByExample(orderExp);
		if(l != null && l.size() == 0) return null;
		String orderInforId = l.get(0).getStockOrderInforId();
		
		List<OutStockDetailDto> detail = outStockDetailDAO.selectMeterialOutStockDetail(orderInforId, outStockInforId);
		OutStockInforDto dto = new OutStockInforDto();
		TOutStockInfor sipo = outStockInforDAO.selectByPrimaryKey(outStockInforId);
		try {
			BeanUtils.copyProperties(dto, sipo);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		dto.setOutStockDetails(detail);
		return dto;
	}

	@Override
	public void updateOutStockInfor(OutStockInforDto dto) {
		// TODO Auto-generated method stub

	}

	public TOutStockInforDAO getOutStockInforDAO() {
		return outStockInforDAO;
	}

	public void setOutStockInforDAO(TOutStockInforDAO outStockInforDAO) {
		this.outStockInforDAO = outStockInforDAO;
	}

	public TOutStockDetailDAO getOutStockDetailDAO() {
		return outStockDetailDAO;
	}

	public void setOutStockDetailDAO(TOutStockDetailDAO outStockDetailDAO) {
		this.outStockDetailDAO = outStockDetailDAO;
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

	public TContractInforDAO getContractInforDAO() {
		return contractInforDAO;
	}

	public void setContractInforDAO(TContractInforDAO contractInforDAO) {
		this.contractInforDAO = contractInforDAO;
	}

}
