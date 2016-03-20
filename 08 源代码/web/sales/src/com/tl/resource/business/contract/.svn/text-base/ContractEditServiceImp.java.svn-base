package com.tl.resource.business.contract;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.common.util.GenerateSerial;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.ContractInforDto;
import com.tl.resource.business.dto.ContractProductDetailDto;
import com.tl.resource.business.dto.ContractProductSortDto;
import com.tl.resource.business.dto.QuotationDetailDto;
import com.tl.resource.business.dto.QuotationDto;
import com.tl.resource.business.quotation.generalquo.GeneralQuoService;
import com.tl.resource.dao.TContractAccountsInforDAO;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TContractProductDetailDAO;
import com.tl.resource.dao.TContractProjectSortInforDAO;
import com.tl.resource.dao.TCustomersInforDAO;
import com.tl.resource.dao.TDeliveryInforDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TOutStockInforDAO;
import com.tl.resource.dao.TProductArrivalInforDAO;
import com.tl.resource.dao.TQuotationInforDAO;
import com.tl.resource.dao.TQuotationProductDetailDAO;
import com.tl.resource.dao.TQuotationProjectSortInforDAO;
import com.tl.resource.dao.pojo.TContractInfor;
import com.tl.resource.dao.pojo.TContractProductDetail;
import com.tl.resource.dao.pojo.TContractProductDetailExample;
import com.tl.resource.dao.pojo.TContractProjectSortInfor;
import com.tl.resource.dao.pojo.TContractProjectSortInforExample;
import com.tl.resource.dao.pojo.TCustomersInfor;
import com.tl.resource.dao.pojo.TCustomersInforExample;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOrderInforExample;
import com.tl.resource.dao.pojo.TQuotationInfor;
import com.tl.resource.dao.pojo.TQuotationInforExample;
import com.tl.resource.dao.pojo.TQuotationProjectSortInfor;
import com.tl.resource.dao.pojo.TQuotationProjectSortInforExample;

public class ContractEditServiceImp implements ContractEditService{

	private TContractInforDAO contractInforDAO;
	private TContractProductDetailDAO contractProductDetailDAO;
	private TContractProjectSortInforDAO contractProjectSortInforDAO;
	private TQuotationInforDAO quotationInforDAO;
	private TQuotationProductDetailDAO quotationProductDetailDAO;
	private TQuotationProjectSortInforDAO quotationProjectSortInforDAO;
	private TContractAccountsInforDAO contractAccountsInforDAO;
	private GeneralQuoService generalQuoService;
	private TCustomersInforDAO customersInforDAO;
	private TOrderInforDAO orderInforDAO;
	private TOutStockInforDAO outStockInforDAO;
	private TDeliveryInforDAO deliveryInforDAO;
	private TProductArrivalInforDAO productArrivalInforDAO;
	@Override
	public boolean addContract(ContractInforDto dto) {
		TContractInfor conInfor = new TContractInfor();
		try {
			BeanUtils.copyProperties(conInfor, dto);
			conInfor.setId(GenerateSerial.getUUID());
			conInfor.setEditDate(new Date());
			Map<String,String> mparams = new HashMap<String,String>();
			mparams.put("currUserId", dto.getUserId());
			PaginationSupport pageInfor = contractInforDAO.findContractViewPanelInfors(mparams, 0, 10);
			if(pageInfor.getTotalCount() >=10){
				//return false;
			}
			contractInforDAO.insert(conInfor);
			boolean exeFlag = true;
			List<ContractProductSortDto> sortList = dto.getContractProductSorts();
			for (Iterator iterator = sortList.iterator(); iterator.hasNext();) {
				ContractProductSortDto contractProductSortDto = (ContractProductSortDto) iterator.next();
				if(ContractInforDto.CONTRACT_TYPE_GENERAL.equals(dto.getContractType())){//如果是一般报价单生成合同
					TQuotationInfor quoInfor = new TQuotationInfor();
					quoInfor.setId(contractProductSortDto.getId());
					quoInfor.setContractInforId(conInfor.getId());
					quoInfor.setStatus(5);
					quoInfor.setBigDecimal2Null();
					quotationInforDAO.updateByPrimaryKeySelective(quoInfor);//设定报价单状态，报价单建立关联关系
				}else if(exeFlag){//如果是项目报价单生成合同,exeFlag用来控制只执行一次
					exeFlag = false;
					TQuotationProjectSortInfor qpsi = quotationProjectSortInforDAO.selectByPrimaryKey(contractProductSortDto.getId());
					if(qpsi != null){
						TQuotationInfor quoInfor = new TQuotationInfor();
						quoInfor.setId(qpsi.getQuotationInforId());
						quoInfor.setContractInforId(conInfor.getId());
						quoInfor.setStatus(5);
						quoInfor.setBigDecimal2Null();
						quotationInforDAO.updateByPrimaryKeySelective(quoInfor);
					}
				}
				TContractProjectSortInfor sortpo = new TContractProjectSortInfor();
				//sortpo.setId(GenerateSerial.getUUID());
				sortpo.setContractInforId(conInfor.getId());
				sortpo.setId(contractProductSortDto.getId());
				sortpo.setProSortName(contractProductSortDto.getName());
				contractProjectSortInforDAO.insert(sortpo);
				List<ContractProductDetailDto> deList = contractProductSortDto.getConProductDetail();
				for (Iterator iterator2 = deList.iterator(); iterator2
						.hasNext();) {
					ContractProductDetailDto contractProductDetailDto = (ContractProductDetailDto) iterator2
							.next();
					contractProductDetailDto.setContractInforId(conInfor.getId());
					contractProductDetailDto.setContractProjectSortId(sortpo.getId());
					TContractProductDetail detPo = new TContractProductDetail();
					BeanUtils.copyProperties(detPo, contractProductDetailDto);
					contractProductDetailDAO.insert(detPo );
					if(contractProductDetailDto.getLeaf() == 0){
						saveProductsChildren(conInfor.getId(),sortpo.getId(),contractProductDetailDto.getChildren());
					}
				}
			}
			return true;
			
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		
	}

	private void saveProductsChildren(String conid, String conSortid,
			List<ContractProductDetailDto> children) throws IllegalAccessException, InvocationTargetException {
		// TODO Auto-generated method stub
		if(children == null || children.size() == 0) return ;
		for (Iterator iterator2 = children.iterator(); iterator2
		.hasNext();) {
			ContractProductDetailDto contractProductDetailDto = (ContractProductDetailDto) iterator2
					.next();
			contractProductDetailDto.setContractInforId(conid);
			contractProductDetailDto.setContractProjectSortId(conSortid);
			TContractProductDetail detPo = new TContractProductDetail();
			BeanUtils.copyProperties(detPo, contractProductDetailDto);
			contractProductDetailDAO.insert(detPo );
			if(contractProductDetailDto.getLeaf() == 0){
				saveProductsChildren(conid,conSortid,contractProductDetailDto.getChildren());
			}
		}
	}

	@Override
	public ContractInforDto consultGeneralQuo(String[] ids) {
		List<String> idss = new ArrayList<String>();
		for (int i = 0; i < ids.length; i++) {
			idss.add(ids[i]);
		}
		TQuotationInfor qinfor = quotationInforDAO.getQuoInforGroupBy(idss);
		ContractInforDto conInfor = new ContractInforDto();
		conInfor.setTotalMoney(qinfor.getTotalMoney());
		conInfor.setTaxMoney(qinfor.getTaxMoney());
		conInfor.setCustomerCode(qinfor.getCustomerCode());
		conInfor.setCustomerName(qinfor.getCustomerName());
		conInfor.setCurrencyName(qinfor.getCurrencyName());
		
		conInfor.setSellerName(qinfor.getSellerName());
		conInfor.setSellerId(qinfor.getSellerId());
		conInfor.setTaxRate(qinfor.getTaxRate());
		conInfor.setProductMoney(qinfor.getProductMoney());
		conInfor.setContractType(ContractInforDto.CONTRACT_TYPE_GENERAL);
		conInfor.setClosingAccountMode(qinfor.getPaymentCondition());
		if(idss.size() > 0){
			TQuotationInfor tqinfor = quotationInforDAO.selectByPrimaryKey(idss.get(0));
			conInfor.setOwnContactPerson(tqinfor.getUserName());
			conInfor.setCustomerFax(tqinfor.getCustomerFax());
			conInfor.setCustomerPhone(tqinfor.getCustomerPhone());
			conInfor.setCusContactPerson(tqinfor.getCusContactPerson());
			conInfor.setCurrencyId(tqinfor.getCurrency());
			//conInfor.setMemo(tqinfor.getMemo());
		}
		TQuotationInforExample example = new TQuotationInforExample();
		example.createCriteria().andIdIn(idss);
		List<TQuotationInfor> list = quotationInforDAO.selectByExample(example );
		StringBuffer bz = new StringBuffer(100);
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			TQuotationInfor quo = (TQuotationInfor) iterator.next();
			bz.append(quo.getMemo()).append("   ");
		}
		conInfor.setMemo(bz.toString());
		conInfor.setEffectConditions("本合同一式   份，卖方   份，买方   份，经双方签字盖章后生效。");
		conInfor.setOtherConvention("无");
		conInfor.setSignAddress("无");
		
		TCustomersInforExample custExample = new TCustomersInforExample();
		custExample.createCriteria().andCustomerCodeEqualTo(qinfor.getCustomerCode());
		List<TCustomersInfor> cusList = customersInforDAO.selectByExample(custExample);
		if(cusList != null && cusList.size() > 0){
			TCustomersInfor cus = cusList.get(0);
			conInfor.setDeliveryAddressType(cus.getContractAddress());
		}
		List<ContractProductSortDto> contractProductSorts = new ArrayList<ContractProductSortDto>();
		BigDecimal finalMoney = BigDecimal.ZERO;
		for (int i = 0; i < ids.length; i++) {
			QuotationDto quodto = quotationInforDAO.getQuoInfoById(ids[i]);
			ContractProductSortDto e = new ContractProductSortDto();
			e.setId(quodto.getId());
			e.setName(quodto.getQuotationCode());
			List<QuotationDetailDto> qproDtos = quotationProductDetailDAO.getQuoDetail(quodto.getId());
			List<ContractProductDetailDto> conProductDetail = convertToContractProductDetailDtos(qproDtos);
			e.setConProductDetail(conProductDetail );
			contractProductSorts.add(e);
			finalMoney = finalMoney.add(new BigDecimal(quodto.getFinalMoney() == null ? "0" : quodto.getFinalMoney()));
		}
		conInfor.setContractProductSorts(contractProductSorts );
		conInfor.setFinalMoney(finalMoney);
		return conInfor;
	}

	private List<ContractProductDetailDto> convertToContractProductDetailDtos(
			List<QuotationDetailDto> qproDtos) {
		List<ContractProductDetailDto> cpddtos = new ArrayList<ContractProductDetailDto>();
		try {
			for (Iterator iterator = qproDtos.iterator(); iterator.hasNext();) {
				QuotationDetailDto quotationDetailDto = (QuotationDetailDto) iterator.next();
				ContractProductDetailDto cpdd = new ContractProductDetailDto();
				BeanUtils.copyProperties(cpdd, quotationDetailDto);
				if(quotationDetailDto.isLeaf()){
					cpdd.setLeaf(1);
				}
				cpddtos.add(cpdd);
				if(quotationDetailDto.getChildren() != null && quotationDetailDto.getChildren().size() > 0){
					cpdd.setChildren(convertToContractProductDetailDtos(quotationDetailDto.getChildren()));
				}
			}
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return cpddtos;
	}

	@Override
	public ContractInforDto consultProjectQuo(String id) {
		TQuotationInfor qinfor = quotationInforDAO.selectByPrimaryKey(id);
		ContractInforDto conInfor = new ContractInforDto();
		conInfor.setTotalMoney(qinfor.getTotalMoney());
		conInfor.setTaxMoney(qinfor.getTaxMoney());
		conInfor.setCustomerCode(qinfor.getCustomerCode());
		conInfor.setCustomerName(qinfor.getCustomerName());
		conInfor.setCurrencyId(qinfor.getCurrency());
		conInfor.setCurrencyName(qinfor.getCurrencyName());
		conInfor.setSellerName(qinfor.getSellerName());
		conInfor.setSellerId(qinfor.getSellerId());
		conInfor.setTaxRate(qinfor.getTaxRate());
		conInfor.setProductMoney(qinfor.getProductMoney());
		conInfor.setContractType(ContractInforDto.CONTRACT_TYPE_PROJECT);
		conInfor.setOwnContactPerson(qinfor.getUserName());
		conInfor.setCustomerFax(qinfor.getCustomerFax());
		conInfor.setCustomerPhone(qinfor.getCustomerPhone());
		conInfor.setCusContactPerson(qinfor.getCusContactPerson());
		conInfor.setEffectConditions("本合同一式   份，卖方   份，买方   份，经双方签字盖章后生效。");
		conInfor.setOtherConvention("无");
		conInfor.setSignAddress("无");
		conInfor.setMemo(qinfor.getMemo());
		
		TCustomersInforExample custExample = new TCustomersInforExample();
		custExample.createCriteria().andCustomerCodeEqualTo(qinfor.getCustomerCode());
		List<TCustomersInfor> cusList = customersInforDAO.selectByExample(custExample);
		if(cusList != null && cusList.size() > 0){
			TCustomersInfor cus = cusList.get(0);
			conInfor.setDeliveryAddressType(cus.getContractAddress());
		}
		
		List<ContractProductSortDto> contractProductSorts = new ArrayList<ContractProductSortDto>();
		TQuotationProjectSortInforExample proSortex = new TQuotationProjectSortInforExample();
		proSortex.createCriteria().andQuotationInforIdEqualTo(id);
		List<TQuotationProjectSortInfor> qproSortList = quotationProjectSortInforDAO.selectByExample(proSortex );
		for (Iterator iterator = qproSortList.iterator(); iterator.hasNext();) {
			TQuotationProjectSortInfor quotationProjectSortInfor = (TQuotationProjectSortInfor) iterator.next();
			ContractProductSortDto e = new ContractProductSortDto();
			e.setId(quotationProjectSortInfor.getId());
			e.setName(quotationProjectSortInfor.getProSortName());
			
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("quotation_project_sort_id", e.getId());
			List<QuotationDetailDto> qproDtos = quotationProductDetailDAO.getQuoDetailList(params);
			List<ContractProductDetailDto> conProductDetail = convertToContractProductDetailDtos(qproDtos);
			e.setConProductDetail(conProductDetail );
			contractProductSorts.add(e);
		}
		conInfor.setFinalMoney(qinfor.getFinalMoney());
		conInfor.setContractProductSorts(contractProductSorts );
		return conInfor;
	}

	@Override
	public void deleteContracts(String id) {
		TQuotationInforExample quoExp = new TQuotationInforExample();
		quoExp.createCriteria().andContractInforIdEqualTo(id);
		List<TQuotationInfor> list = quotationInforDAO.selectByExample(quoExp);
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			TQuotationInfor quotationInfor = (TQuotationInfor) iterator.next();
			quotationInfor.setContractInforId(null);
			quotationInfor.setStatus(4);
			quotationInforDAO.updateByPrimaryKey(quotationInfor);//作废合同后，将对应报价单状态置为 ’提交合同‘，将合同号设置为空
		}
		
		TContractProductDetailExample deleExe = new TContractProductDetailExample();
		deleExe.createCriteria().andContractInforIdEqualTo(id);
		//contractInforDAO;
		contractProductDetailDAO.deleteByExample(deleExe);
		
		TContractProjectSortInforExample delSortEx = new TContractProjectSortInforExample();
		delSortEx.createCriteria().andContractInforIdEqualTo(id);
		contractProjectSortInforDAO.deleteByExample(delSortEx );
		
		contractInforDAO.deleteByPrimaryKey(id);
		
		
	}

	@Override
	public PaginationSupport findContractInfors(Map params, int startIndex,
			int pageSize) {
		// TODO Auto-generated method stub
		return contractInforDAO.findContractInfors(params,startIndex,pageSize);
	}

	@Override
	public ContractInforDto getContractInforById(String id) {
		// TODO Auto-generated method stub
		ContractInforDto dto = new ContractInforDto();
		TContractInfor po = contractInforDAO.selectByPrimaryKey(id);
		try {
			BeanUtils.copyProperties(dto, po);
			TContractProjectSortInforExample detailEx = new TContractProjectSortInforExample();
			detailEx.createCriteria().andContractInforIdEqualTo(id);
			List<TContractProjectSortInfor> sortList = contractProjectSortInforDAO.selectByExample(detailEx);
			List<ContractProductSortDto> contractProductSorts = new ArrayList<ContractProductSortDto>();
			for (Iterator iterator = sortList.iterator(); iterator.hasNext();) {
				TContractProjectSortInfor sortpo = (TContractProjectSortInfor) iterator.next();
				ContractProductSortDto dto2 = new ContractProductSortDto();
				BeanUtils.copyProperties(dto2, sortpo);
				dto2.setName(sortpo.getProSortName());
				
				Map<String,String> params = new HashMap<String,String>();
				params.put("contractId", id);//
				params.put("contractSortId", dto2.getId());
				//List<ContractProductDetailDto> plist = contractProductDetailDAO.getProductDetail(dto.getId(),dto2.getId());
				PaginationSupport pageInfor = contractProductDetailDAO.findContractDetail( params ,  0, Integer.MAX_VALUE);//new PaginationSupport(plist);
				List<ContractProductDetailDto> conProductDetail = pageInfor.getItems();
				dto2.setConProductDetail(conProductDetail);
				contractProductSorts.add(dto2);
			}
			dto.setContractProductSorts(contractProductSorts);
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
	public void updateContract(ContractInforDto dto) {
		// TODO Auto-generated method stub
		TContractInfor po = new TContractInfor();
		try {
			BeanUtils.copyProperties(po, dto);
			po.setUserName(null);
			po.setUserId(null);
			contractInforDAO.updateByPrimaryKeySelective(po);
			
			List<ContractProductSortDto> sortList = dto.getContractProductSorts();
			TContractProjectSortInforExample sortEx = new TContractProjectSortInforExample();
			sortEx.createCriteria().andContractInforIdEqualTo(dto.getId());
			List<TContractProjectSortInfor> sortpoList = contractProjectSortInforDAO.selectByExample(sortEx );//得到当前合同，所有分类
			for (Iterator iterator = sortpoList.iterator(); iterator.hasNext();) {
				TContractProjectSortInfor contractProjectSortInfor = (TContractProjectSortInfor) iterator.next();
				boolean flag = false;
				for (Iterator iterator2 = sortList.iterator(); iterator2.hasNext();) {
					ContractProductSortDto contractProductSortDto = (ContractProductSortDto) iterator2.next();
					if(contractProjectSortInfor.getId().equals(contractProductSortDto.getId())){
						flag = true;
						break;
					}
				}
				if(!flag){//如果在当前提交数据中，找不到库中的分类，则表明将其删除
					TContractProductDetailExample sortExp = new TContractProductDetailExample();
					sortExp.createCriteria().andContractProjectSortIdEqualTo(contractProjectSortInfor.getId());
					contractProductDetailDAO.deleteByExample(sortExp );
					contractProjectSortInforDAO.deleteByPrimaryKey(contractProjectSortInfor.getId());
					TQuotationInfor qinfor = quotationInforDAO.selectByPrimaryKey(contractProjectSortInfor.getId());
					if(qinfor != null){
						qinfor.setContractInforId(null);
						qinfor.setStatus(4);
						quotationInforDAO.updateByPrimaryKey(qinfor);
					}
				}
			}
			
			for (Iterator iterator = sortList.iterator(); iterator.hasNext();) {
				ContractProductSortDto contractProductSortDto = (ContractProductSortDto) iterator
						.next();
				TContractProjectSortInforExample sortExp = new TContractProjectSortInforExample();
				sortExp.createCriteria().andIdEqualTo(contractProductSortDto.getId());
				int count = contractProjectSortInforDAO.countByExample(sortExp );
				if(count > 0){//如果原先就有，则修改
					List<ContractProductDetailDto> detailList = contractProductSortDto.getConProductDetail();
					for (Iterator iterator2 = detailList.iterator(); iterator2.hasNext();) {
						ContractProductDetailDto contractProductDetailDto = (ContractProductDetailDto) iterator2
								.next();
						TContractProductDetail record = new TContractProductDetail();
						BeanUtils.copyProperties(record, contractProductDetailDto);
						contractProductDetailDAO.updateByPrimaryKey(record );
					}
				}else{//如果原先没有，则新增
					TQuotationInfor quoInfor = new TQuotationInfor();
					quoInfor.setId(contractProductSortDto.getId());
					quoInfor.setContractInforId(dto.getId());
					quoInfor.setStatus(5);
					quoInfor.setBigDecimal2Null();
					quotationInforDAO.updateByPrimaryKeySelective(quoInfor);//设定报价单状态，报价单建立关联关系
					
					TContractProjectSortInfor sortpo = new TContractProjectSortInfor();
					//sortpo.setId(GenerateSerial.getUUID());
					sortpo.setContractInforId(dto.getId());
					sortpo.setId(contractProductSortDto.getId());
					sortpo.setProSortName(contractProductSortDto.getName());
					contractProjectSortInforDAO.insert(sortpo);
					List<ContractProductDetailDto> deList = contractProductSortDto.getConProductDetail();
					for (Iterator iterator2 = deList.iterator(); iterator2
							.hasNext();) {
						ContractProductDetailDto contractProductDetailDto = (ContractProductDetailDto) iterator2
								.next();
						contractProductDetailDto.setContractInforId(dto.getId());
						contractProductDetailDto.setContractProjectSortId(sortpo.getId());
						TContractProductDetail detPo = new TContractProductDetail();
						BeanUtils.copyProperties(detPo, contractProductDetailDto);
						contractProductDetailDAO.insert(detPo );
						if(contractProductDetailDto.getLeaf() == 0){
							saveProductsChildren(dto.getId(),sortpo.getId(),contractProductDetailDto.getChildren());
						}
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

	public TQuotationProjectSortInforDAO getQuotationProjectSortInforDAO() {
		return quotationProjectSortInforDAO;
	}

	public void setQuotationProjectSortInforDAO(
			TQuotationProjectSortInforDAO quotationProjectSortInforDAO) {
		this.quotationProjectSortInforDAO = quotationProjectSortInforDAO;
	}

	@Override
	public String cancelAudit(String businessId) {
		// TODO Auto-generated method stub
		TContractInfor record = new TContractInfor();
		record.setId(businessId);
		record.setStatus(3);
		contractInforDAO.updateByPrimaryKeySelective(record);
		return null;
	}

	@Override
	public String endAudit(String businessId) {
		// TODO Auto-generated method stub
		TContractInfor record = new TContractInfor();
		record.setId(businessId);
		record.setStatus(2);
		contractInforDAO.updateByPrimaryKeySelective(record);
		
		saveQuoProductsPrices(businessId);
		return null;
	}

	private void saveQuoProductsPrices(String businessId) {
		TQuotationInforExample quoexample = new TQuotationInforExample();
		quoexample.createCriteria().andContractInforIdEqualTo(businessId);
		List<TQuotationInfor> list = quotationInforDAO.selectByExample(quoexample);
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			TQuotationInfor object = (TQuotationInfor) iterator.next();
			generalQuoService.saveChangePriceProducts(object.getId());
		}
	}

	@Override
	public String submitAudit(String businessId) {
		// TODO Auto-generated method stub
		TContractInfor record = new TContractInfor();
		record.setId(businessId);
		record.setStatus(1);
		contractInforDAO.updateByPrimaryKeySelective(record);
		return null;
	}

	@Override
	public PaginationSupport findContractDetail(Map params, int startIndex,
			int pageSize) {
		
		return contractProductDetailDAO.findContractDetail( params,  startIndex,
				 pageSize);
	}

	@Override
	public void runContract(String conId) {
		// TODO Auto-generated method stub
		TContractInfor record = new TContractInfor();
		record.setId(conId);
		record.setStatus(4);
		contractInforDAO.updateByPrimaryKeySelective(record);
		
		contractInforDAO.relationScheduleInfor(conId);
		saveQuoProductsPrices(conId);
	}

	@Override
	public String endContract(String conId) {
		// TODO Auto-generated method stub
		BigDecimal needMoney = contractAccountsInforDAO.getContractNeedMoney(conId);
		if(needMoney.doubleValue() > 0){
			return "本合同还有[" + needMoney + "]余款未付，不能终结!";
		}
		BigDecimal needDa = contractInforDAO.getContractNeedDeliveryAmount(conId);
		if(needDa.doubleValue() > 0){
			return "本合同还有[" + needDa + "]个货品未交付，不能终结!";
		}
		TContractInfor record = new TContractInfor();
		record.setId(conId);
		record.setStatus(5);
		contractInforDAO.updateByPrimaryKeySelective(record);
		return null;
	}

	@Override
	public void voidContract(String conId) {
		// TODO Auto-generated method stub
		TContractInfor po = contractInforDAO.selectByPrimaryKey(conId);
		if(po == null) return ;
		Integer type = po.getContractType();
		if( type == 0 || type == 1 || type == 2 || type == 3){//-1作废，0编制，1待审批，2审批通过，3审批退回，4执行，5终结
			TContractInfor record = new TContractInfor();
			record.setId(conId);
			record.setStatus(-1);
			contractInforDAO.updateByPrimaryKeySelective(record);
		}else if(type == 4){
			TContractInfor record = new TContractInfor();
			record.setId(conId);
			record.setStatus(-1);
			contractInforDAO.updateByPrimaryKeySelective(record);
			
			TOrderInforExample orderExample = new TOrderInforExample();
			List<Integer> ids = new ArrayList<Integer>();
			ids.add(0);ids.add(1);ids.add(2);ids.add(3);ids.add(4);
			
			orderExample.createCriteria()
			.andContractCodeEqualTo(po.getContractCode())
			.andOrderTypeEqualTo(1).andStatusIn(ids);
			TOrderInfor orderRecord = new TOrderInfor();
			orderRecord.setOrderType(2);
			this.orderInforDAO.updateByExampleSelective(orderRecord, orderExample);
//			
//			TProductArrivalInforExample arriExample = new TProductArrivalInforExample();
//			arriExample.createCriteria().andContractCodeEqualTo(po.getContractCode());
//			TProductArrivalInfor arriRecord = new TProductArrivalInfor();
//			arriRecord.setStatus(2);
//			this.productArrivalInforDAO.updateByExampleSelective(arriRecord, arriExample);
//			
//			TDeliveryInfor deliRecord = new TDeliveryInfor();
//			deliRecord.setStatus(4);
//			TDeliveryInforExample deliExample = new TDeliveryInforExample();
//			deliExample.createCriteria().andContractCodeEqualTo(po.getContractCode());
//			this.deliveryInforDAO.updateByExampleSelective(deliRecord , deliExample);
//			
//			TOutStockInfor outRecord = new TOutStockInfor();
//			outRecord.setStatus(2);
//			TOutStockInforExample outExample = new TOutStockInforExample();
//			outExample.createCriteria().andContractCodeEqualTo(po.getContractCode());
//			this.outStockInforDAO.updateByExampleSelective(outRecord, outExample);
		}
//		TQuotationInforExample quoExp = new TQuotationInforExample();
//		quoExp.createCriteria().andContractInforIdEqualTo(conId);
//		List<TQuotationInfor> list = quotationInforDAO.selectByExample(quoExp);
//		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
//			TQuotationInfor quotationInfor = (TQuotationInfor) iterator.next();
//			quotationInfor.setContractInforId(null);
//			quotationInfor.setStatus(4);
//			quotationInforDAO.updateByPrimaryKey(quotationInfor);//作废合同后，将对应报价单状态置为 ’提交合同‘，将合同号设置为空
//		}
//		TContractProductDetailExample conExp = new TContractProductDetailExample();
//		conExp.createCriteria().andContractInforIdEqualTo(conId);
//		contractProductDetailDAO.selectByExample(conExp );
	}

	public TContractAccountsInforDAO getContractAccountsInforDAO() {
		return contractAccountsInforDAO;
	}

	public void setContractAccountsInforDAO(
			TContractAccountsInforDAO contractAccountsInforDAO) {
		this.contractAccountsInforDAO = contractAccountsInforDAO;
	}

	public GeneralQuoService getGeneralQuoService() {
		return generalQuoService;
	}

	public void setGeneralQuoService(GeneralQuoService generalQuoService) {
		this.generalQuoService = generalQuoService;
	}

	public TOrderInforDAO getOrderInforDAO() {
		return orderInforDAO;
	}

	public void setOrderInforDAO(TOrderInforDAO orderInforDAO) {
		this.orderInforDAO = orderInforDAO;
	}

	public TOutStockInforDAO getOutStockInforDAO() {
		return outStockInforDAO;
	}

	public void setOutStockInforDAO(TOutStockInforDAO outStockInforDAO) {
		this.outStockInforDAO = outStockInforDAO;
	}

	public TDeliveryInforDAO getDeliveryInforDAO() {
		return deliveryInforDAO;
	}

	public void setDeliveryInforDAO(TDeliveryInforDAO deliveryInforDAO) {
		this.deliveryInforDAO = deliveryInforDAO;
	}

	public TProductArrivalInforDAO getProductArrivalInforDAO() {
		return productArrivalInforDAO;
	}

	public void setProductArrivalInforDAO(
			TProductArrivalInforDAO productArrivalInforDAO) {
		this.productArrivalInforDAO = productArrivalInforDAO;
	}

	public TCustomersInforDAO getCustomersInforDAO() {
		return customersInforDAO;
	}

	public void setCustomersInforDAO(TCustomersInforDAO customersInforDAO) {
		this.customersInforDAO = customersInforDAO;
	}

	@Override
	public ContractInforDto getContInforById(String id) {
		ContractInforDto dto = new ContractInforDto();
		TContractInfor po = contractInforDAO.selectByPrimaryKey(id);
			TContractProjectSortInforExample detailEx = new TContractProjectSortInforExample();
			detailEx.createCriteria().andContractInforIdEqualTo(id);
			List<TContractProjectSortInfor> sortList = contractProjectSortInforDAO.selectByExample(detailEx);
			List<ContractProductSortDto> contractProductSorts = new ArrayList<ContractProductSortDto>();
			for (Iterator iterator = sortList.iterator(); iterator.hasNext();) {
				TContractProjectSortInfor sortpo = (TContractProjectSortInfor) iterator.next();
				ContractProductSortDto dto2 = new ContractProductSortDto();
				dto2.setName(sortpo.getProSortName());
				
				Map<String,String> params = new HashMap<String,String>();
				params.put("contractId", id);//
				params.put("contractSortId", dto2.getId());
				//List<ContractProductDetailDto> plist = contractProductDetailDAO.getProductDetail(dto.getId(),dto2.getId());
				PaginationSupport pageInfor = contractProductDetailDAO.findContractDetail( params ,  0, Integer.MAX_VALUE);//new PaginationSupport(plist);
				List<ContractProductDetailDto> conProductDetail = pageInfor.getItems();
				dto2.setConProductDetail(conProductDetail);
				contractProductSorts.add(dto2);
			}
			dto.setContractProductSorts(contractProductSorts);
		return dto;
	}
}
