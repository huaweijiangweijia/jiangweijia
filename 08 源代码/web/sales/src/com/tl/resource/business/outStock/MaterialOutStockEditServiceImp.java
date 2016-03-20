package com.tl.resource.business.outStock;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.common.util.GenerateSerial;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.OutStockDetailDto;
import com.tl.resource.business.dto.OutStockInforDto;
import com.tl.resource.dao.TAccountsInforDAO;
import com.tl.resource.dao.TOutStockDetailDAO;
import com.tl.resource.dao.TOutStockInforDAO;
import com.tl.resource.dao.TReserveInforDAO;
import com.tl.resource.dao.pojo.TAccountsInfor;
import com.tl.resource.dao.pojo.TAccountsInforExample;
import com.tl.resource.dao.pojo.TOutStockDetail;
import com.tl.resource.dao.pojo.TOutStockDetailExample;
import com.tl.resource.dao.pojo.TOutStockInfor;
import com.tl.resource.dao.pojo.TReserveInfor;

public class MaterialOutStockEditServiceImp implements OutStockService {
	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	private TOutStockInforDAO outStockInforDAO;
	private TOutStockDetailDAO outStockDetailDAO;
	private TAccountsInforDAO accountsInforDAO;
	private TReserveInforDAO reserveInforDAO;
	@Override
	public void addOutStockInfor(OutStockInforDto dto) throws Exception {
		TOutStockInfor record = new TOutStockInfor();
		try {
			BeanUtils.copyProperties(record, dto);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		record.setId(GenerateSerial.getUUID());
		outStockInforDAO.insert(record);
		
		List<OutStockDetailDto> list = dto.getOutStockDetails();
		try {
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				OutStockDetailDto outStockDetailDto = (OutStockDetailDto) iterator.next();
				if(outStockDetailDto.getReserveInforId() == null || "".equals(outStockDetailDto.getReserveInforId())){
					continue;
				}
				TReserveInfor reserveInRec = new TReserveInfor();
				reserveInRec.setId(outStockDetailDto.getReserveInforId());
				reserveInRec.setAmount(outStockDetailDto.getAmount());
				int rows = reserveInforDAO.updateAmountByPrimaryKey(reserveInRec);
				if(rows == 0){
					TReserveInfor tresult = reserveInforDAO.selectByPrimaryKey(outStockDetailDto.getReserveInforId());
					outStockDetailDto.setReserveAmount(tresult.getAmount());
					throw new RuntimeException(JSONObject.fromObject(outStockDetailDto).toString());//如果修改库存数量失败，则返回当前库存数量
				}
				TOutStockDetail po = new TOutStockDetail();
				outStockDetailDto.setId(GenerateSerial.getUUID());
				BeanUtils.copyProperties(po, outStockDetailDto);
				po.setOutStockInforId(record.getId());
				outStockDetailDAO.insert(po);
				
				TAccountsInfor accountRecord = new TAccountsInfor();
				BeanUtils.copyProperties(accountRecord, outStockDetailDto);
				accountRecord.setId(GenerateSerial.getUUID());
				accountRecord.setInvoiceId(po.getId());
				accountRecord.setAccountType(2);
				accountRecord.setInvoiceCode(record.getOutStockCode());
				accountRecord.setCreateAccountTime(new Date());
				accountsInforDAO.insert(accountRecord );
				
					accountRecord = new TAccountsInfor();
					BeanUtils.copyProperties(accountRecord, outStockDetailDto);
					accountRecord.setId(GenerateSerial.getUUID());
					accountRecord.setInvoiceId(po.getId());
					accountRecord.setAccountType(5);
					accountRecord.setInvoiceCode(record.getOutStockCode());
					accountRecord.setCreateAccountTime(new Date());
					accountRecord.setAmount(BigDecimal.ZERO);
					accountsInforDAO.insert(accountRecord );
					
					TAccountsInfor accountRecordt = new TAccountsInfor();
					accountRecordt.setAmount(outStockDetailDto.getMatOutAmount());
					accountRecordt.setProductCode(outStockDetailDto.getProductCode());
					accountRecordt.setInvoiceId(outStockDetailDto.getId());
					int rowcount = accountsInforDAO.updateMatAmountByInvoiceId(accountRecordt);
					if(rowcount == 0){
						BigDecimal tresult = accountsInforDAO.selectMatOutAmountByProductCode(outStockDetailDto.getProductCode());
						outStockDetailDto.setMatReserveAmount(tresult);
						throw new RuntimeException(JSONObject.fromObject(outStockDetailDto).toString());//如果修改材料账页数量失败，则返回当前材料库存数量
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

	@Override
	public void affirmOutStock(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public String cancelAudit(String businessId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PaginationSupport consultContractProducts(Map params,
			int startIndex, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PaginationSupport consultQuotationProducts(Map params,
			int startIndex, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PaginationSupport consultReserveInfors(Map params, int startIndex,
			int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteOutStockInforDto(String id) {
		TOutStockDetailExample example = new TOutStockDetailExample();
		example.createCriteria().andOutStockInforIdEqualTo(id);
		List<TOutStockDetail> allDeleOutStockDetails = outStockDetailDAO.selectByExample(example);
		List<String> allDeleIds = new ArrayList<String>();//已删除数据id
		for (Iterator iterator = allDeleOutStockDetails.iterator(); iterator.hasNext();) {
			TOutStockDetail outStockDetail = (TOutStockDetail) iterator
					.next();
			allDeleIds.add(outStockDetail.getId());
		}
		
		if(allDeleIds.size() > 0){
			TAccountsInforExample accontDeleEx = new TAccountsInforExample();
			accontDeleEx.createCriteria().andInvoiceIdIn(allDeleIds);
			accountsInforDAO.deleteByExample(accontDeleEx);//删除帐页
			
			TOutStockDetailExample example2 = new TOutStockDetailExample();
			example2.createCriteria().andIdIn(allDeleIds);//删除出库单
			outStockDetailDAO.deleteByExample(example2);
		}
		
		outStockInforDAO.deleteByPrimaryKey(id);
	}

	@Override
	public String endAudit(String businessId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PaginationSupport findOutStockInfors(Map params, int startIndex,
			int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public OutStockInforDto getOutStockInforDtoById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<OutStockDetailDto> getWillOutStockContractDetail(
			String contractId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<OutStockDetailDto> getWillOutStockQuotationDetail(
			String quotationInforId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String submitAudit(String businessId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateOutStockInfor(OutStockInforDto dto) {
		// TODO Auto-generated method stub
			TOutStockInfor record = new TOutStockInfor();
			try {
				BeanUtils.copyProperties(record, dto);
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			outStockInforDAO.updateByPrimaryKeySelective(record);
			
			//1：获取旧数据所有id
			List<OutStockDetailDto> list = dto.getOutStockDetails();
			//3.处理旧数据中，数量减少的情况，加库存，修改帐页，修改出库单
			try {
				for (Iterator iterator = list.iterator(); iterator.hasNext();) {
					OutStockDetailDto outStockDetailDto = (OutStockDetailDto) iterator.next();
						BigDecimal newValue = outStockDetailDto.getAmount();
						BigDecimal oldValue = outStockDetailDto.getOldAmount();
						BigDecimal matOutAmount = outStockDetailDto.getMatOutAmount();
						BigDecimal matOldAmount = outStockDetailDto.getMatOldAmount();
						if(outStockDetailDto.getReserveInforId() == null || "".equals(outStockDetailDto.getReserveInforId())){
							continue;
						}
							TReserveInfor reserveInRec = new TReserveInfor();
							reserveInRec.setId(outStockDetailDto.getReserveInforId());
							reserveInRec.setAmount(newValue.subtract(oldValue));
							int rows = reserveInforDAO.updateAmountByPrimaryKey(reserveInRec);//减少库存
							if(rows == 0){
								TReserveInfor tresult = reserveInforDAO.selectByPrimaryKey(outStockDetailDto.getReserveInforId());
								outStockDetailDto.setReserveAmount(tresult.getAmount());
								throw new RuntimeException(JSONObject.fromObject(outStockDetailDto).toString());//如果修改库存数量失败，则返回当前库存数量
							}
							if(outStockDetailDto.getId() != null && outStockDetailDto.getId().length() > 20){
								TAccountsInfor accountRecord = new TAccountsInfor();
								accountRecord.setAmount(newValue);
								TAccountsInforExample updateExAcc = new TAccountsInforExample();
								updateExAcc.createCriteria().andInvoiceIdEqualTo(outStockDetailDto.getId()).andAccountTypeEqualTo(2);
								accountsInforDAO.updateByExampleSelective(accountRecord, updateExAcc);//修改帐页
								
								TOutStockDetail po = new TOutStockDetail();
								BeanUtils.copyProperties(po, outStockDetailDto);
								outStockDetailDAO.updateByPrimaryKeySelective(po);//修改出库单
								
								TAccountsInfor accountRecordt = new TAccountsInfor();
								accountRecordt.setAmount(matOutAmount.subtract(matOldAmount));
								accountRecordt.setProductCode(outStockDetailDto.getProductCode());
								accountRecordt.setInvoiceId(outStockDetailDto.getId());
								int rowcount = accountsInforDAO.updateMatAmountByInvoiceId(accountRecordt);
								if(rowcount == 0){
									BigDecimal tresult = accountsInforDAO.selectMatOutAmountByProductCode(outStockDetailDto.getProductCode());
									outStockDetailDto.setMatReserveAmount(tresult);
									throw new RuntimeException(JSONObject.fromObject(outStockDetailDto).toString());//如果修改材料账页数量失败，则返回当前材料库存数量
								}
							}else{
								TOutStockDetail po = new TOutStockDetail();
								outStockDetailDto.setId(GenerateSerial.getUUID());
								BeanUtils.copyProperties(po, outStockDetailDto);
								po.setOutStockInforId(record.getId());
								outStockDetailDAO.insert(po);
								
								TAccountsInfor accountRecord = new TAccountsInfor();
								BeanUtils.copyProperties(accountRecord, outStockDetailDto);
								accountRecord.setId(GenerateSerial.getUUID());
								accountRecord.setInvoiceId(po.getId());
								accountRecord.setAccountType(2);
								accountRecord.setInvoiceCode(record.getOutStockCode());
								accountRecord.setCreateAccountTime(new Date());
								accountsInforDAO.insert(accountRecord );
								
									accountRecord = new TAccountsInfor();
									BeanUtils.copyProperties(accountRecord, outStockDetailDto);
									accountRecord.setId(GenerateSerial.getUUID());
									accountRecord.setInvoiceId(po.getId());
									accountRecord.setAccountType(5);
									accountRecord.setInvoiceCode(record.getOutStockCode());
									accountRecord.setCreateAccountTime(new Date());
									accountRecord.setAmount(BigDecimal.ZERO);
									accountsInforDAO.insert(accountRecord );
									
									TAccountsInfor accountRecordt = new TAccountsInfor();
									accountRecordt.setAmount(outStockDetailDto.getMatOutAmount());
									accountRecordt.setProductCode(outStockDetailDto.getProductCode());
									accountRecordt.setInvoiceId(outStockDetailDto.getId());
									int rowcount = accountsInforDAO.updateMatAmountByInvoiceId(accountRecordt);
									if(rowcount == 0){
										BigDecimal tresult = accountsInforDAO.selectMatOutAmountByProductCode(outStockDetailDto.getProductCode());
										outStockDetailDto.setMatReserveAmount(tresult);
										throw new RuntimeException(JSONObject.fromObject(outStockDetailDto).toString());//如果修改材料账页数量失败，则返回当前材料库存数量
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

	public TAccountsInforDAO getAccountsInforDAO() {
		return accountsInforDAO;
	}

	public void setAccountsInforDAO(TAccountsInforDAO accountsInforDAO) {
		this.accountsInforDAO = accountsInforDAO;
	}

	public TReserveInforDAO getReserveInforDAO() {
		return reserveInforDAO;
	}

	public void setReserveInforDAO(TReserveInforDAO reserveInforDAO) {
		this.reserveInforDAO = reserveInforDAO;
	}

}
