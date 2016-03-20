package com.tl.resource.business.delivery;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.common.util.GenerateSerial;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.ContractProductDetailDto;
import com.tl.resource.business.dto.DeliveryInforDto;
import com.tl.resource.business.dto.DeliveryProductDetailDto;
import com.tl.resource.business.dto.QuotationDetailOutStockDto;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TContractProductDetailDAO;
import com.tl.resource.dao.TContractProjectSortInforDAO;
import com.tl.resource.dao.TCustomersInforDAO;
import com.tl.resource.dao.TDeliveryDetailDAO;
import com.tl.resource.dao.TDeliveryInforDAO;
import com.tl.resource.dao.TQuotationInforDAO;
import com.tl.resource.dao.TQuotationProductDetailDAO;
import com.tl.resource.dao.pojo.TContractInfor;
import com.tl.resource.dao.pojo.TCustomersInfor;
import com.tl.resource.dao.pojo.TCustomersInforExample;
import com.tl.resource.dao.pojo.TDeliveryDetail;
import com.tl.resource.dao.pojo.TDeliveryDetailExample;
import com.tl.resource.dao.pojo.TDeliveryInfor;
import com.tl.resource.dao.pojo.TDeliveryInforExample;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOutStockInfor;
import com.tl.resource.dao.pojo.TQuotationInfor;

public class DeliveryEditServiceImp implements DeliveryEditService {
	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	private TContractInforDAO contractInforDAO;
	private TContractProductDetailDAO contractProductDetailDAO;
	private TContractProjectSortInforDAO contractProjectSortInforDAO;
	private TDeliveryInforDAO deliveryInforDAO;
	private TDeliveryDetailDAO deliveryDetailDAO;
	private TQuotationInforDAO quotationInforDAO;
	private TQuotationProductDetailDAO quotationProductDetailDAO;
	private TCustomersInforDAO customersInforDAO;
	@Override
	public void addDeliveryInfor(DeliveryInforDto dto) {
		TDeliveryInfor diPo = new TDeliveryInfor();
		
		try {
			BeanUtils.copyProperties(diPo, dto);
			diPo.setEditDate(new Date());
			diPo.setId(GenerateSerial.getUUID());
			deliveryInforDAO.insert(diPo);
				List<DeliveryProductDetailDto> detail = dto.getDeliveryProductDetailDto();
				for (Iterator iterator2 = detail.iterator(); iterator2
						.hasNext();) {
					DeliveryProductDetailDto deliveryProductDetailDto = (DeliveryProductDetailDto) iterator2.next();
					deliveryProductDetailDto.setDeliveryInforId(diPo.getId());
					TDeliveryDetail tdd = new TDeliveryDetail();
					BeanUtils.copyProperties(tdd, deliveryProductDetailDto);
					tdd.setId(GenerateSerial.getUUID());
					deliveryDetailDAO.insertSelective(tdd);
				}
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	public DeliveryInforDto consultContract(String id) {
		// TODO Auto-generated method stub 
		DeliveryInforDto dto = new DeliveryInforDto();
		TContractInfor po = contractInforDAO.selectByPrimaryKey(id);
			dto.setContractInforId(po.getId());
			dto.setContractCode(po.getContractCode());
			dto.setCustomerCode(po.getCustomerCode());
			dto.setCustomerName(po.getCustomerName());
			dto.setDeliveryDate(df.format(new Date()));
			dto.setDeliveryType(0);
			dto.setContactPerson(po.getOwnContactPerson());
			dto.setDeliveryAddressType(po.getDeliveryAddressType());
			//initCustomerProperty(dto, po.getCustomerCode());
			dto.setCustomerFax(po.getCustomerFax());
			dto.setCustomerPhone(po.getCustomerPhone());
			dto.setCusContactPerson(po.getCusContactPerson());
			Map<String,String> params = new HashMap<String,String>();
			params.put("contractId", id);
			params.put("outstatus", "1");
			PaginationSupport list = contractProductDetailDAO.findContractDetail( params ,  0, Integer.MAX_VALUE);
			List<ContractProductDetailDto> conDetail = list.getItems();
			List<DeliveryProductDetailDto> delDetail = new ArrayList<DeliveryProductDetailDto>();
			try {
				for (Iterator iterator = conDetail.iterator(); iterator.hasNext();) {
					ContractProductDetailDto contractProductDetailDto = (ContractProductDetailDto) iterator.next();
					DeliveryProductDetailDto d = new DeliveryProductDetailDto();
					BeanUtils.copyProperties(d, contractProductDetailDto);
					d.setAllArrivalAmount(contractProductDetailDto.getArrivalAmount());
					d.setAllDeliveryAmount(contractProductDetailDto.getDeliveryAmount());
					d.setNetPrice(contractProductDetailDto.getTaxNetPrice());//给交货中存入含税单价
					delDetail.add(d);
				}
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			for (Iterator iterator = delDetail.iterator(); iterator.hasNext();) {
				DeliveryProductDetailDto deliveryProductDetailDto = (DeliveryProductDetailDto) iterator
						.next();
				deliveryProductDetailDto.setContractAmount(deliveryProductDetailDto.getAmount());
				deliveryProductDetailDto.setAmount(BigDecimal.ZERO);
				deliveryProductDetailDto.setContractProductDetailId(deliveryProductDetailDto.getId());
				deliveryProductDetailDto.setId("");
				
			}
			dto.setDeliveryProductDetailDto(delDetail);
		return dto;
	}

	
	@Override
	public void deleteDeliveryInfor(String id) {
		TDeliveryDetailExample detailExp = new TDeliveryDetailExample();
		detailExp.createCriteria().andDeliveryInforIdEqualTo(id);
		deliveryDetailDAO.deleteByExample(detailExp);
		TDeliveryInforExample deInforExp = new TDeliveryInforExample();
		deInforExp.createCriteria().andIdEqualTo(id);
		deliveryInforDAO.deleteByExample(deInforExp);
	}

	@Override
	public DeliveryInforDto getDeliveryInforById(String id) {
		// TODO Auto-generated method stub
		DeliveryInforDto dto = new DeliveryInforDto();
		TDeliveryInfor inforPo = deliveryInforDAO.selectByPrimaryKey(id);
		if(inforPo == null){return dto;}
		try {
			BeanUtils.copyProperties(dto, inforPo);
			TDeliveryDetailExample detailExp = new TDeliveryDetailExample();
			detailExp.createCriteria().andDeliveryInforIdEqualTo(dto.getId());
			detailExp.setOrderByClause("serial_number");
			List<TDeliveryDetail> podetail = deliveryDetailDAO.selectByExample(detailExp);
			List<DeliveryProductDetailDto>  deList = new ArrayList<DeliveryProductDetailDto>();
			for (Iterator iterator = podetail.iterator(); iterator.hasNext();) {
				TDeliveryDetail deliveryProductDetailDto = (TDeliveryDetail) iterator.next();
				DeliveryProductDetailDto dpdd = new DeliveryProductDetailDto();
				BeanUtils.copyProperties(dpdd, deliveryProductDetailDto);
				deList.add(dpdd);
			}
		    dto.setDeliveryProductDetailDto(deList);
		    TContractInfor po = contractInforDAO.selectByPrimaryKey(dto.getContractInforId());
		    if(po != null){
		        dto.setDeliveryAddressType(po.getDeliveryAddressType());
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

	@Override
	public void updateDeliveryInfor(DeliveryInforDto dto) {
		// TODO Auto-generated method stub
		TDeliveryInfor inforPo = new TDeliveryInfor();
		try {
			BeanUtils.copyProperties(inforPo, dto);
			deliveryInforDAO.updateByPrimaryKeySelective(inforPo);
			List<DeliveryProductDetailDto> detail = dto.getDeliveryProductDetailDto();
			for (Iterator iterator2 = detail.iterator(); iterator2
					.hasNext();) {
				DeliveryProductDetailDto deliveryProductDetailDto = (DeliveryProductDetailDto) iterator2.next();
				TDeliveryDetail tdd = new TDeliveryDetail();
				BeanUtils.copyProperties(tdd, deliveryProductDetailDto);
				deliveryDetailDAO.updateByPrimaryKeySelective(tdd);
			}
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public TContractInforDAO getContractInforDAO() {
		return contractInforDAO;
	}

	public void setContractInforDAO(TContractInforDAO contractInforDAO) {
		this.contractInforDAO = contractInforDAO;
	}

	public TContractProductDetailDAO getContractProductDetailDAO() {
		return contractProductDetailDAO;
	}

	public void setContractProductDetailDAO(
			TContractProductDetailDAO contractProductDetailDAO) {
		this.contractProductDetailDAO = contractProductDetailDAO;
	}

	public TContractProjectSortInforDAO getContractProjectSortInforDAO() {
		return contractProjectSortInforDAO;
	}

	public void setContractProjectSortInforDAO(
			TContractProjectSortInforDAO contractProjectSortInforDAO) {
		this.contractProjectSortInforDAO = contractProjectSortInforDAO;
	}

	public TDeliveryInforDAO getDeliveryInforDAO() {
		return deliveryInforDAO;
	}

	public void setDeliveryInforDAO(TDeliveryInforDAO deliveryInforDAO) {
		this.deliveryInforDAO = deliveryInforDAO;
	}

	public TDeliveryDetailDAO getDeliveryDetailDAO() {
		return deliveryDetailDAO;
	}

	public void setDeliveryDetailDAO(TDeliveryDetailDAO deliveryDetailDAO) {
		this.deliveryDetailDAO = deliveryDetailDAO;
	}

	public TQuotationInforDAO getQuotationInforDAO() {
		return quotationInforDAO;
	}

	public void setQuotationInforDAO(TQuotationInforDAO quotationInforDAO) {
		this.quotationInforDAO = quotationInforDAO;
	}

	public TQuotationProductDetailDAO getQuotationProductDetailDAO() {
		return quotationProductDetailDAO;
	}

	public void setQuotationProductDetailDAO(
			TQuotationProductDetailDAO quotationProductDetailDAO) {
		this.quotationProductDetailDAO = quotationProductDetailDAO;
	}

	@Override
	public PaginationSupport findDeliveryInfors(Map params, int startIndex,
			int pageSize) {
		return deliveryInforDAO.findDeliveryInfors(params, startIndex,pageSize);
	}

	@Override
	public DeliveryInforDto consultQuotation(String id) {
		// TODO Auto-generated method stub
		DeliveryInforDto dto = new DeliveryInforDto();
		TQuotationInfor quoInfor = quotationInforDAO.selectByPrimaryKey(id);
		dto.setCustomerCode(quoInfor.getCustomerCode());
		dto.setCustomerName(quoInfor.getCustomerName());
		//dto.setContractInforId(quoInfor.getId());
		//dto.setContractCode(quoInfor.getQuotationCode());
		dto.setQuotationCode(quoInfor.getQuotationCode());
		dto.setQuotationId(quoInfor.getId());
		if(quoInfor.getQuotationType() == 3){//预定
			dto.setDeliveryType(1);
		}else if(quoInfor.getQuotationType() == 4){//试刀
			dto.setDeliveryType(2);
		}
		
		dto.setContactPerson(quoInfor.getUserName());
		dto.setCustomerFax(quoInfor.getCustomerFax());
		dto.setCustomerPhone(quoInfor.getCustomerPhone());
		dto.setCusContactPerson(quoInfor.getCusContactPerson());
		//initCustomerProperty(dto, quoInfor.getCustomerCode());
//		TQuotationProductDetailExample example = new TQuotationProductDetailExample();
//		example.createCriteria().andQuotationInforIdEqualTo(id);
//		List<TQuotationProductDetail> list = quotationProductDetailDAO.selectByExample(example );
		
		int startIndex = 0;
		Map<String,String> params = new HashMap<String,String>();
		params.put("quotationInforId", id);
		int pageSize = Integer.MAX_VALUE;
		PaginationSupport pageInfor = quotationProductDetailDAO.getProducts4OutStock(params, startIndex, pageSize);
		List list = pageInfor.getItems();
		List<DeliveryProductDetailDto>  deList = new ArrayList<DeliveryProductDetailDto>();
		try {
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				QuotationDetailOutStockDto quotationProductDetail = (QuotationDetailOutStockDto) iterator
						.next();
				DeliveryProductDetailDto d = new DeliveryProductDetailDto();
				BeanUtils.copyProperties(d, quotationProductDetail);
				d.setContractAmount(d.getAmount());
				d.setAmount(BigDecimal.ZERO);
				d.setAllDeliveryAmount(quotationProductDetail.getDeliveryAmount());
				d.setAllArrivalAmount(quotationProductDetail.getArrivalAmount());
				d.setContractProjectSortId(quoInfor.getId());
				d.setProSortName(quoInfor.getQuotationCode());
				//d.setContractProductDetailId(null);
				//d.setSourceId(d.getId());
				d.setContractProductDetailId(d.getId());
				d.setId(null);
				deList.add(d);
			}
			dto.setDeliveryProductDetailDto(deList);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return dto;
	}

	@Override
	public String cancelAudit(String businessId) {
		// TODO Auto-generated method stub
		
		TDeliveryInfor record = new TDeliveryInfor();
		record.setId(businessId);
		record.setStatus(3);
		deliveryInforDAO.updateByPrimaryKeySelective(record);
		return null;
	}

	@Override
	public String endAudit(String businessId) {
		// TODO Auto-generated method stub
		TDeliveryInfor record = new TDeliveryInfor();
		record.setId(businessId);
		record.setStatus(2);
		deliveryInforDAO.updateByPrimaryKeySelective(record);
		
		contractInforDAO.checkSetContractOver(businessId);
		return null;
	}

	@Override
	public String submitAudit(String businessId) {
		// TODO Auto-generated method stub
		TDeliveryInfor record = new TDeliveryInfor();
		record.setId(businessId);
		record.setStatus(1);
		deliveryInforDAO.updateByPrimaryKeySelective(record);
		return null;
	}

	public TCustomersInforDAO getCustomersInforDAO() {
		return customersInforDAO;
	}

	public void setCustomersInforDAO(TCustomersInforDAO customersInforDAO) {
		this.customersInforDAO = customersInforDAO;
	}

	@Override
	public void invoidDeliveryInfor(String businessId) {
		// TODO Auto-generated method stub
		TDeliveryInfor record = new TDeliveryInfor();
		record.setId(businessId);
		record.setStatus(4);
		deliveryInforDAO.updateByPrimaryKeySelective(record);
	}

}
