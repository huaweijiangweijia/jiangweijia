package com.tl.resource.business.arrival;

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

import net.sf.json.JSONArray;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.common.util.GenerateSerial;
import com.tl.resource.business.dto.ArrivalInforDto;
import com.tl.resource.business.dto.ArrivalOrderDetialsDto;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;
import com.tl.resource.business.dto.ProductArrivalDetailDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.manage.BillsCodeDefService;
import com.tl.resource.dao.TAccountsInforDAO;
import com.tl.resource.dao.TContractInforDAO;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TOutStockDetailDAO;
import com.tl.resource.dao.TOutStockInforDAO;
import com.tl.resource.dao.TProductArrivalDetailDAO;
import com.tl.resource.dao.TProductArrivalInforDAO;
import com.tl.resource.dao.TRebateDAO;
import com.tl.resource.dao.TReserveInforDAO;
import com.tl.resource.dao.TSuppliersInforDAO;
import com.tl.resource.dao.pojo.TAccountsInfor;
import com.tl.resource.dao.pojo.TAccountsInforExample;
import com.tl.resource.dao.pojo.TContractInfor;
import com.tl.resource.dao.pojo.TOrderDetail;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TOutStockDetail;
import com.tl.resource.dao.pojo.TOutStockDetailExample;
import com.tl.resource.dao.pojo.TOutStockInfor;
import com.tl.resource.dao.pojo.TProductArrivalDetail;
import com.tl.resource.dao.pojo.TProductArrivalInfor;
import com.tl.resource.dao.pojo.TReserveInfor;
import com.tl.resource.dao.pojo.TReserveInforExample;
import com.tl.resource.dao.pojo.TSuppliersInfor;

/**
 * 到货管理service
 * @author ftl
 *
 */
public class ArrivalServiceImpl implements ArrivalService {

	//订单信息Dao
	private TOrderInforDAO orderInfoDao;
	//订单信息详细Dao
	private TOrderDetailDAO orderDetailDao;
	//到货单Dao
	private TProductArrivalInforDAO arrInfoDao;
	//到货单详细Dao
	private TProductArrivalDetailDAO arrProductDao;
	//库存Dao
	private TReserveInforDAO reserveInfoDao;
	//帐页信息DAO
	private TAccountsInforDAO accountsInfoDao;
	//供应商信息Dao
	private TSuppliersInforDAO supplierDao;
	//生成编号Service
	private BillsCodeDefService billsCodeDefService;
	//出库单Dao
	private TOutStockInforDAO outStockInfoDao;
	//出库单详细Dao
	private TOutStockDetailDAO outStockDetailDao;
	//合同Dao
	private TContractInforDAO contractInforDAO;
	
	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	
	public TOutStockInforDAO getOutStockInfoDao() {
		return outStockInfoDao;
	}

	public void setOutStockInfoDao(TOutStockInforDAO outStockInfoDao) {
		this.outStockInfoDao = outStockInfoDao;
	}

	public TOutStockDetailDAO getOutStockDetailDao() {
		return outStockDetailDao;
	}

	public void setOutStockDetailDao(TOutStockDetailDAO outStockDetailDao) {
		this.outStockDetailDao = outStockDetailDao;
	}

	public BillsCodeDefService getBillsCodeDefService() {
		return billsCodeDefService;
	}

	public void setBillsCodeDefService(BillsCodeDefService billsCodeDefService) {
		this.billsCodeDefService = billsCodeDefService;
	}

	public TOrderInforDAO getOrderInfoDao() {
		return orderInfoDao;
	}

	public void setOrderInfoDao(TOrderInforDAO orderInfoDao) {
		this.orderInfoDao = orderInfoDao;
	}
	
	public TProductArrivalInforDAO getArrInfoDao() {
		return arrInfoDao;
	}

	public void setArrInfoDao(TProductArrivalInforDAO arrInfoDao) {
		this.arrInfoDao = arrInfoDao;
	}
	
	public TOrderDetailDAO getOrderDetailDao() {
		return orderDetailDao;
	}

	public void setOrderDetailDao(TOrderDetailDAO orderDetailDao) {
		this.orderDetailDao = orderDetailDao;
	}
	
	public TProductArrivalDetailDAO getArrProductDao() {
		return arrProductDao;
	}

	public void setArrProductDao(TProductArrivalDetailDAO arrProductDao) {
		this.arrProductDao = arrProductDao;
	}
	
	public TReserveInforDAO getReserveInfoDao() {
		return reserveInfoDao;
	}

	public void setReserveInfoDao(TReserveInforDAO reserveInfoDao) {
		this.reserveInfoDao = reserveInfoDao;
	}

	public TAccountsInforDAO getAccountsInfoDao() {
		return accountsInfoDao;
	}

	public void setAccountsInfoDao(TAccountsInforDAO accountsInfoDao) {
		this.accountsInfoDao = accountsInfoDao;
	}

	@Override
	public List<OrderInfoDto> getOrderInfoByType(Map<String, Object> paramMap) {
		return orderInfoDao.getOrderInfoByType(paramMap);
	}

	@Override
	public Integer getOrderInfoTotalByType(Map<String, Object> paramMap) {
		return orderInfoDao.getOrderInfoTotalByType(paramMap);
	}

	@Override
	public Integer getArrInfoTotalBySearch(Map<String, Object> paramMap) {
		return arrInfoDao.getArrInfoTotalBySearch(paramMap);
	}

	
	public TSuppliersInforDAO getSupplierDao() {
		return supplierDao;
	}

	public void setSupplierDao(TSuppliersInforDAO supplierDao) {
		this.supplierDao = supplierDao;
	}

	@Override
	public List<TProductArrivalInfor> getArrivalInfoBySearch(
			Map<String, Object> paramMap) {
		return arrInfoDao.getArrivalInfoBySearch(paramMap);
	}

	@Override
	public List<OrderDetialsDto> getOrderDetailsByOrderId(String orderId) {
		Map<String, Object> mp = new HashMap<String, Object>();
		mp.put("orderId", orderId);
		return orderDetailDao.getOrderDetailsList(mp);
	}

	@Override
	public int getOrderDetailsTotal(String orderId) {
		return orderDetailDao.getOrderDetailsTotal(orderId);
	}

	@Override
	public void insertArrivalInfo(TProductArrivalInfor arrInfo) {
		arrInfoDao.insertSelective(arrInfo);	
	}

	@Override
	public void insertArrProduct(TProductArrivalDetail arrProduct) {
		arrProductDao.insertSelective(arrProduct);
	}

	@Override
	public List<ProductArrivalDetailDto> getArrivalDetail(String arrivalId) {
		return arrProductDao.getArrivalDetail(arrivalId);
	}

	@Override
	public void updateArrivalInfo(TProductArrivalInfor arrivalInfo) {
		arrInfoDao.updateByPrimaryKeySelective(arrivalInfo);
	}

	@Override
	public TProductArrivalDetail getArrivalDetailById(
			TProductArrivalDetail arrivalDetail) {
		return arrProductDao.selectByPrimaryKey(arrivalDetail.getId());
	}

	@Override
	public void updateArrivalDetail(TProductArrivalDetail arrivalDetail) {
		arrProductDao.updateByPrimaryKeySelective(arrivalDetail);
	}

	@Override
	public void deleteArrivalDetail(String id) {
		arrProductDao.deleteByPrimaryKey(id);
	}

	@Override
	public TProductArrivalDetail getArrDetailWithChildren(String arrivalId) {
		return arrProductDao.getArrDetailWithChildren(arrivalId);
	}

	@Override
	public void deleteArrivalDetail(List<ProductArrivalDetailDto> list) {
		if(list != null && list.size() > 0) {
			for(ProductArrivalDetailDto arrDetail : list) {
				this.deleteArrivalDetail(arrDetail.getId());
			}
		}
	}

	@Override
	public int getOrderDetailsTotalByOrderId(String id) {
		return orderDetailDao.getOrderDetailsTotalByOrderId(id);
	}

	@Override
	public List<OrderInfoDto> getOrderInfoByCode(Map<String, Object> paramMap) {
		return orderInfoDao.getOrderInfoByCode(paramMap);
	}

	@Override
	public TProductArrivalInfor getArrivalInfoById(String id) {
		return arrInfoDao.selectByPrimaryKey(id);
	}

	@Override
	public void deleteArrivalInfo(String id) {
		arrInfoDao.deleteByPrimaryKey(id);	
	}

	@Override
	public TReserveInfor getReserveInfoByProCode(String id) {
		return reserveInfoDao.getReserveInfoByProCode(id);
	}

	@Override
	public void insertReserveInfo(TReserveInfor reserveInfo) {
		reserveInfoDao.insertSelective(reserveInfo);
	}

	@Override
	public void updateReserveInfo(TReserveInfor reserveInfo) {
		reserveInfoDao.updateByPrimaryKeySelective(reserveInfo);
	}

	@Override
	public void insertAccountsInfo(TAccountsInfor accountsInfo) {
		accountsInfoDao.insertSelective(accountsInfo);
	}

	@Override
	public void updateAccountsInfo(TAccountsInfor accountsInfo) {
		accountsInfoDao.updateByPrimaryKeySelective(accountsInfo);
	}

	@Override
	public TSuppliersInfor getSupplierById(String id) {
		return supplierDao.selectByPrimaryKey(id);
	}

	@Override
	public List<ArrivalOrderDetialsDto> getDetailWithHasArrivalByOrderId(
			String orderId) {
		return orderDetailDao.getDetailWithHasArrivalByOrderId(orderId);
	}

	@Override
	public OrderInfoDto getOrderInfoByCode(String orderCode) {
		// TODO Auto-generated method stub
		return orderInfoDao.getOrderInfoByCode(orderCode);
	}

	@Override
	public TProductArrivalInfor getArrInfoWithProById(String arrInfoId) {
		return arrInfoDao.getArrInfoWithProById(arrInfoId);
	}

	private String buildCodeType(Integer outType) {
		//0 直接出库 1 合同出库(提取库存) 2 预定报价单出库(采购)，3 材料出库,
		//4 合同出库(采购),5 预定报价单出库(提取库存), 6 试刀(提取库存) 7 试刀(采购)
		String codeType = "";
		switch (outType) {
			case 2 :
				codeType = "18";
				break;
			case 4 :
				codeType = "08";
				break;
			case 7 :
				codeType = "19";
				break;
		
		}
		return codeType;
	}
	
	@Override
	public void addReveiveInfo(UserDto userDto, TProductArrivalInfor arrInfo) throws Exception {
		List<TProductArrivalDetail> list = arrInfo.getArrivalProducts();//到货产品
		if(list == null || list.size() == 0) {
			return;
		}
		//根据订单编号获取订单
		OrderInfoDto orderInfo = this.getOrderInfoByCode(arrInfo.getOrderCode());
		TContractInfor contract = contractInforDAO.getContractByCode(orderInfo.getContractCode());
		//订单类型
		Integer orderType = orderInfo.getOrderType();
		
		//获取供应商编号
		TSuppliersInfor supp = supplierDao.selectByPrimaryKey(arrInfo.getSupplierId());
		String suppCode = "";
		if(supp != null)
			suppCode = supp.getSupplierCode();
		//客户编号
		String customerCode = "";
		if(arrInfo.getCustomerCode() != null)
			customerCode = arrInfo.getCustomerCode();
		
		TOutStockInfor outStockInfo = new TOutStockInfor();
		if((orderType == 1 || orderType == 3) && contract.getStatus() != -1) {
			//若为合同订单首先在出库单主表中添加出库单
			//如果合同没有作废，则作出库单
			if(outStockInfoDao.selectByPrimaryKey(arrInfo.getId()) == null) {
				BeanUtils.copyProperties(outStockInfo, arrInfo);
				outStockInfo.setId(arrInfo.getId());
				outStockInfo.setContractId(contract.getId());
				outStockInfo.setOutStockType(4);//1 合同出库(采购)
				outStockInfo.setEditDate(new Date());//编制日期
				outStockInfo.setUserId(userDto.getId());//编制人ID
				outStockInfo.setUserName(userDto.getUserName());//编制人名称
				outStockInfo.setOutStockCode(billsCodeDefService.getBillCode(buildCodeType(outStockInfo.getOutStockType()), suppCode, customerCode,null));//出库单编号
				outStockInfo.setOutStockDate(df.format(new Date()));//出库日期
				outStockInfoDao.insertSelective(outStockInfo);
			}
		} else if(orderType == 5 || orderType == 7) {
			//预订订单出库
			if(outStockInfoDao.selectByPrimaryKey(arrInfo.getId()) == null) {
				BeanUtils.copyProperties(outStockInfo, arrInfo);
				outStockInfo.setId(arrInfo.getId());
				//outStockInfo.setContractId(contract.getId());
				outStockInfo.setOutStockType(2);//1 预订报价单出库(采购)
				outStockInfo.setEditDate(new Date());//编制日期
				outStockInfo.setUserId(userDto.getId());//编制人ID
				outStockInfo.setUserName(userDto.getUserName());//编制人名称
				outStockInfo.setOutStockCode(billsCodeDefService.getBillCode(buildCodeType(outStockInfo.getOutStockType()), suppCode, customerCode,null));//出库单编号
				outStockInfo.setOutStockDate(df.format(new Date()));//出库日期
				outStockInfoDao.insertSelective(outStockInfo);
			}
		} else if(orderType == 6 || orderType == 8) {
			//试刀订单出库
			if(outStockInfoDao.selectByPrimaryKey(arrInfo.getId()) == null) {
				BeanUtils.copyProperties(outStockInfo, arrInfo);
				outStockInfo.setId(arrInfo.getId());
				//outStockInfo.setContractId(contract.getId());
				outStockInfo.setOutStockType(7);//1 试刀出库(采购)
				outStockInfo.setEditDate(new Date());//编制日期
				outStockInfo.setUserId(userDto.getId());//编制人ID
				outStockInfo.setUserName(userDto.getUserName());//编制人名称
				outStockInfo.setOutStockCode(billsCodeDefService.getBillCode(buildCodeType(outStockInfo.getOutStockType()), suppCode, customerCode,null));//出库单编号
				outStockInfo.setOutStockDate(df.format(new Date()));//出库日期
				outStockInfoDao.insertSelective(outStockInfo);
			}
		}
		
		for(TProductArrivalDetail arrDetail : list) {
			TOrderDetail orderDetail = this.orderDetailDao.selectByPrimaryKey(arrDetail.getOrderDetailId());
			//库存表
			TReserveInforExample example = new TReserveInforExample();
			example.createCriteria().andToolsIdEqualTo(arrDetail.getToolsId());
			List resList = reserveInfoDao.selectByExample(example);
			
			TReserveInfor reserveInfo = null;
			if(resList != null && resList.size() > 0) {
				reserveInfo = (TReserveInfor)resList.get(0);
			}
			//库存账页表
			TAccountsInfor accountsInfo = new TAccountsInfor();
			BeanUtils.copyProperties(accountsInfo, arrDetail);//属性copy
			
			accountsInfo.setId(GenerateSerial.getUUID());
			accountsInfo.setAmount(arrDetail.getArrivalAmount());//到货数量
			accountsInfo.setMoney(arrDetail.getProductMoney());//金额
			if(orderType == 2) {
				//储备订单入库业务流程
				//如果库存表中还未有该产品信息则在库存表中添加该产品信息库存信息，否则只对库存容量进行修改 此两种操作都需要同时操作 库存账页表
				if(reserveInfo == null) {
					//库存
					reserveInfo = new TReserveInfor();
					BeanUtils.copyProperties(reserveInfo, arrDetail);//属性copy
					reserveInfo.setId(GenerateSerial.getUUID());
					reserveInfo.setAmount(arrDetail.getArrivalAmount());//库存表中库存数量
					this.insertReserveInfo(reserveInfo);
					
					//库存帐页
					accountsInfo.setReserveInforId(reserveInfo.getId());
					accountsInfo.setInvoiceId(arrDetail.getId());
					accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
					accountsInfo.setCreateAccountTime(new Date());
					accountsInfo.setAccountType(1); //设置帐页类型 0为初始库存 1为入库
					this.insertAccountsInfo(accountsInfo);
				} else {
					reserveInfo.setAmount(reserveInfo.getAmount().add(arrDetail.getArrivalAmount()));
					this.updateReserveInfo(reserveInfo);
					accountsInfo.setAccountType(1);
					accountsInfo.setReserveInforId(reserveInfo.getId());
					accountsInfo.setInvoiceId(arrDetail.getId());
					accountsInfo.setCreateAccountTime(new Date());
					accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
					this.insertAccountsInfo(accountsInfo);
				}
			} else if(orderType == 4) {
				//材料入库 库存表中库存数量始终为0 每次入库只维护帐页表
				if(reserveInfo == null) {
					//库存
					reserveInfo = new TReserveInfor();
					BeanUtils.copyProperties(reserveInfo, arrDetail);//属性copy
					reserveInfo.setId(GenerateSerial.getUUID());
					reserveInfo.setAmount(BigDecimal.ZERO);//库存表中库存数量
					this.insertReserveInfo(reserveInfo);
					
					//库存帐页
					accountsInfo.setReserveInforId(reserveInfo.getId());
					accountsInfo.setInvoiceId(arrDetail.getId());
					accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
					accountsInfo.setCreateAccountTime(new Date());
					accountsInfo.setAccountType(4); //设置帐页类型 0为初始库存 1为入库 4 材料入库
					this.insertAccountsInfo(accountsInfo);
				} else {
					accountsInfo.setAccountType(4); //设置帐页类型 0为初始库存 1为入库 4 材料入库
					accountsInfo.setReserveInforId(reserveInfo.getId());
					accountsInfo.setInvoiceId(arrDetail.getId());
					accountsInfo.setCreateAccountTime(new Date());
					accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
					this.insertAccountsInfo(accountsInfo);
				}
			} else if(orderType == 1 || orderType == 3 || 
					orderType == 5 || orderType == 6 ||
					orderType == 7 || orderType == 8) {
				
				//合同订单 不入库存表直接入帐页表，同时直接出库
				//备注： 如果该订单对应的合同已作废，则只入库，不出库，同时添加库存
				if(contract == null || contract.getStatus() != -1) {
					if(reserveInfo == null) {
						reserveInfo = new TReserveInfor();
						BeanUtils.copyProperties(reserveInfo, arrDetail);//属性copy
						reserveInfo.setId(GenerateSerial.getUUID());
						reserveInfo.setAmount(BigDecimal.ZERO);//库存表中库存数量为0
						this.insertReserveInfo(reserveInfo);
					}
					//库存账页入库
					accountsInfo.setAccountType(1);//1 入库
					accountsInfo.setReserveInforId(reserveInfo.getId());
					accountsInfo.setInvoiceId(arrDetail.getId());
					accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
					accountsInfo.setCreateAccountTime(new Date());
					this.insertAccountsInfo(accountsInfo);
					
					//如果合同没有作废，走出库流程
					//出库单出库
					TOutStockDetail outStockDetail = new TOutStockDetail();
					BeanUtils.copyProperties(outStockDetail, arrDetail);
					
					outStockDetail.setId(GenerateSerial.getUUID());
					outStockDetail.setAmount(arrDetail.getArrivalAmount());//出库数量
					outStockDetail.setReserveInforId(reserveInfo.getId());//库存表
					outStockDetail.setOutStockInforId(outStockInfo.getId());//出库单ID
					outStockDetail.setMoney(arrDetail.getProductMoney());//金额
					
					outStockDetail.setContractProductDetailId(orderDetail.getContractProductDetailId());//合同明细Id
					outStockDetail.setContractProjectSortId(orderDetail.getContractProjectSortId());
					outStockDetail.setProSortName(orderDetail.getProSortName());
					outStockDetail.setProjectCode(orderDetail.getProjectCode());
					if(orderDetail.getSerialNumber() != null)
						outStockDetail.setSerialNumber(orderDetail.getSerialNumber().intValue());
					outStockDetail.setContractAmount(orderDetail.getContractAmount());//合同数量
					
					outStockDetailDao.insertSelective(outStockDetail);
					
					//库存账页出库
					accountsInfo.setId(GenerateSerial.getUUID());
					accountsInfo.setAccountType(2);//2 出库
					accountsInfo.setReserveInforId(reserveInfo.getId());
					accountsInfo.setInvoiceId(outStockDetail.getId());//存的是出库详细ID
					accountsInfo.setInvoiceCode(outStockInfo.getOutStockCode());
					accountsInfo.setCreateAccountTime(new Date());
					this.insertAccountsInfo(accountsInfo);
				} else {
					//合同作废 走增加库存流程
					if(reserveInfo == null) {
						//库存
						reserveInfo = new TReserveInfor();
						BeanUtils.copyProperties(reserveInfo, arrDetail);//属性copy
						reserveInfo.setId(GenerateSerial.getUUID());
						reserveInfo.setAmount(arrDetail.getArrivalAmount());//库存表中库存数量
						this.insertReserveInfo(reserveInfo);
						
						//库存帐页
						accountsInfo.setReserveInforId(reserveInfo.getId());
						accountsInfo.setInvoiceId(arrDetail.getId());
						accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
						accountsInfo.setCreateAccountTime(new Date());
						accountsInfo.setAccountType(1); //设置帐页类型 0为初始库存 1为入库
						this.insertAccountsInfo(accountsInfo);
					} else {
						reserveInfo.setAmount(reserveInfo.getAmount().add(arrDetail.getArrivalAmount()));
						this.updateReserveInfo(reserveInfo);
						accountsInfo.setAccountType(1);
						accountsInfo.setReserveInforId(reserveInfo.getId());
						accountsInfo.setInvoiceId(arrDetail.getId());
						accountsInfo.setCreateAccountTime(new Date());
						accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
						this.insertAccountsInfo(accountsInfo);
					}
				}
			}
		}
		TProductArrivalInfor i = new TProductArrivalInfor();
		i.setId(arrInfo.getId());
		i.setStatus(arrInfo.getStatus());
		this.updateArrivalInfo(i);
	}

	@Override
	public void insertOutStockDetail(TOutStockDetail outStockDetail) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertOutStockInfor(TOutStockInfor outStockInfo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateOrderByIdSelective(TOrderInfor orderInfo) {
		this.orderInfoDao.updateByPrimaryKeySelective(orderInfo);
	}

	@Override
	public ArrivalInforDto getArrInfoWithOrderType(String arrInfoId) {
		return arrInfoDao.getArrInfoWithOrderType(arrInfoId);
	}

	@Override
	public Integer getCanArrivalPro(String orderId) {
		return orderDetailDao.getCanArrivalPro(orderId);
	}

	@Override
	public List<ProductArrivalDetailDto> getArrivalDetailByView(String arrivalId) {
		return arrProductDao.getArrivalDetailByView(arrivalId);
	}

	@Override
	public String arrivalSubmit(JSONArray array, UserDto userDto) {
		String resultStr = "{success : true, msg : '确认入库提交成功！'}";
		Iterator<String> iterator = array.iterator();
		while(iterator.hasNext()) {
			String arrInfoId = iterator.next();
			TProductArrivalInfor arrInfo = this.getArrInfoWithProById(arrInfoId);
			
			if(arrInfo != null) {
				try {
					arrInfo.setStatus(1);
					this.addReveiveInfo(userDto, arrInfo);
					
					String orderId = arrInfo.getOrderInforId();
					Integer arrTotal = this.getCanArrivalPro(orderId);
					
					OrderInfoDto orderDto = this.getOrderInfoByCode(arrInfo.getOrderCode());
					//如果arrtotal= 0
					if(arrTotal == 0 && orderDto.getStatus() != 5) {
						TOrderInfor orderInfo = new TOrderInfor();
						orderInfo.setId(orderId);
						orderInfo.setStatus(5);
						try {
							this.updateOrderByIdSelective(orderInfo);
						} catch(Exception e) {
							e.printStackTrace();
							resultStr = "{success : false, msg : '确认入库：修改订单状态提交失败！'}";
						}
						/*if(!orderIdList.contains(orderId)) {
							orderIdList.add(orderId);
						}*/
					}
				} catch(Exception e) {
					e.printStackTrace();
					resultStr = "{success : false, msg : '确认入库提交失败！'}";
				}
				
			}
			
		}
		return resultStr;
	}

	public TContractInforDAO getContractInforDAO() {
		return contractInforDAO;
	}

	public void setContractInforDAO(TContractInforDAO contractInforDAO) {
		this.contractInforDAO = contractInforDAO;
	}

	@Override
	public Integer getDirectArrTotalBySearch(Map<String, Object> paramMap) {
		return this.arrInfoDao.getDirectArrTotalBySearch(paramMap);
	}

	@Override
	public List<TProductArrivalInfor> getDirectArrivalBySearch(
			Map<String, Object> paramMap) {
		return this.arrInfoDao.getDirectArrivalBySearch(paramMap);
	}

	@Override
	public List<TProductArrivalDetail> getDirectArrDetail(String arrivalId) {
		return this.arrProductDao.getDirectArrDetail(arrivalId);
	}

	@Override
	public TProductArrivalInfor getDirectArrInfoById(String id) {
		return arrInfoDao.getDirectArrInfoById(id);
	}

	@Override
	public String directArrivalAudit(JSONArray array, UserDto userDto) {
		//直接入库 确认入库
		String resultStr = "{success : true, msg : '确认入库提交成功！'}";
		Iterator<String> iterator = array.iterator();
		while(iterator.hasNext()) {
			String arrInfoId = iterator.next();
			TProductArrivalInfor arrInfo = this.getArrInfoWithProById(arrInfoId);
			
			if(arrInfo != null) {
				try {
					arrInfo.setStatus(1);
					this.addDirectReveive(userDto, arrInfo);
				} catch(Exception e) {
					e.printStackTrace();
					resultStr = "{success : false, msg : '确认入库提交失败！'}";
				}
				
			}
			
		}
		return resultStr;
	}
	
	//直接入库，库存业务流程
	private void addDirectReveive(UserDto userDto, TProductArrivalInfor arrInfo) throws Exception {
		List<TProductArrivalDetail> list = arrInfo.getArrivalProducts();//到货产品
		if(list == null || list.size() == 0) {
			return;
		}
		
		for(TProductArrivalDetail arrDetail : list) {
			//库存表
			//TReserveInfor reserveInfo = this.getReserveInfoByProCode(arrDetail.getProductCode());
			//库存表
			TReserveInforExample example = new TReserveInforExample();
			example.createCriteria().andToolsIdEqualTo(arrDetail.getToolsId());
			List resList = reserveInfoDao.selectByExample(example);
			
			TReserveInfor reserveInfo = null;
			if(resList != null && resList.size() > 0) {
				reserveInfo = (TReserveInfor)resList.get(0);
			}
			//库存账页表
			TAccountsInfor accountsInfo = new TAccountsInfor();
			BeanUtils.copyProperties(accountsInfo, arrDetail);//属性copy
			
			accountsInfo.setId(GenerateSerial.getUUID());
			accountsInfo.setAmount(arrDetail.getArrivalAmount());//到货数量
			accountsInfo.setMoney(arrDetail.getProductMoney());//金额
			//储备订单入库业务流程
			//如果库存表中还未有该产品信息则在库存表中添加该产品信息库存信息，否则只对库存容量进行修改 此两种操作都需要同时操作 库存账页表
			if(reserveInfo == null) {
				//库存
				reserveInfo = new TReserveInfor();
				BeanUtils.copyProperties(reserveInfo, arrDetail);//属性copy
				reserveInfo.setId(GenerateSerial.getUUID());
				reserveInfo.setAmount(arrDetail.getArrivalAmount());//库存表中库存数量
				this.insertReserveInfo(reserveInfo);
				
				//库存帐页
				accountsInfo.setReserveInforId(reserveInfo.getId());
				accountsInfo.setInvoiceId(arrDetail.getId());//单据ID存的是 单据详细ID
				accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
				accountsInfo.setCreateAccountTime(new Date());
				accountsInfo.setAccountType(1); //设置帐页类型 0为初始库存 1 入库
				this.insertAccountsInfo(accountsInfo);
			} else {
				reserveInfo.setAmount(reserveInfo.getAmount().add(arrDetail.getArrivalAmount()));
				this.updateReserveInfo(reserveInfo);
				accountsInfo.setAccountType(1);
				accountsInfo.setReserveInforId(reserveInfo.getId());
				accountsInfo.setInvoiceId(arrDetail.getId());//单据ID存的是 单据详细ID
				accountsInfo.setCreateAccountTime(new Date());
				accountsInfo.setInvoiceCode(arrInfo.getArrivalCode());
				this.insertAccountsInfo(accountsInfo);
			}
		}
		TProductArrivalInfor i = new TProductArrivalInfor();
		i.setId(arrInfo.getId());
		i.setStatus(arrInfo.getStatus());
		this.updateArrivalInfo(i);
	}

	@Override
	public List<ProductArrivalDetailDto> getDetail4Direct(String arrivalId) {
		return this.arrProductDao.getDetail4Direct(arrivalId);
	}

	@Override
	public List<String> modifyArrivalInfo(Iterator<String> iterator) {
		Integer num = 0;
		List<String> idList = new ArrayList<String>();
		while(iterator.hasNext()) {
			String arrId = iterator.next();
			//出库单
			TOutStockInfor outStock = this.outStockInfoDao.selectByPrimaryKey(arrId);
			//入库单
			TProductArrivalInfor arrival = this.arrInfoDao.getArrInfoWithProById(arrId);
			
			//订单ID
			String orderId = arrival.getOrderInforId();
			TOrderInfor orderInfo = this.orderInfoDao.selectByPrimaryKey(orderId);
			
			
			//实例化一个入库单
			TProductArrivalInfor arrInfo = new TProductArrivalInfor();
			arrInfo.setId(arrId);
			arrInfo.setStatus(2);// 2 作废
			
			//如果出库单不空，则删除出库单
			if(outStock != null) {			
				if(this.isCanInvalidArr(arrId) == 0) {
					//修改入库单状态为作废
					num += this.updateStatus(arrInfo);
					//删除对应出库单
					outStockInfoDao.deleteByPrimaryKey(arrId);
					//如果订单存在，且状态为到货完毕，修改订单状态为已下单
					//预订 试刀入库 没有对应订单故在修改订单状态之前需要帮判断。
					if(orderInfo != null && orderInfo.getStatus() == 5) {
						//实例化订单，设定状态为已下单
						TOrderInfor order = new TOrderInfor();
						order.setId(orderId);
						order.setStatus(4);// 4 已下单
						this.updateOrderByIdSelective(order);
					}
				} else {
					idList.add(arrId);
				}
			} else {
				//出库单为空，判断是否增加了库存
				if(this.isCanInvaStockArr(arrId) == 0) {
					//修改入库单状态为作废
					num += this.updateStatus(arrInfo);
					this.modifyReserve(arrId);
					
				} else {
					idList.add(arrId);
				}
			}
		}
		return idList;
	}

	//删除出库单
	private void deleteOutStock(TProductArrivalInfor arrival, TOutStockInfor outStock) {
		String id = outStock.getId();
		//出库单编号
		String outStockCode = outStock.getOutStockCode();
		//删除出库帐页
		TAccountsInforExample example = new TAccountsInforExample();
		example.createCriteria().andInvoiceCodeEqualTo(outStockCode);
		this.accountsInfoDao.deleteByExample(example);
		//删除入库帐页
		TAccountsInforExample arrExample = new TAccountsInforExample();
		arrExample.createCriteria().andInvoiceCodeEqualTo(arrival.getArrivalCode());
		this.accountsInfoDao.deleteByExample(arrExample);
		//删除出库详细
		TOutStockDetailExample outDetExample = new TOutStockDetailExample();
		outDetExample.createCriteria().andOutStockInforIdEqualTo(id);
		this.outStockDetailDao.deleteByExample(outDetExample);
		//删除出库单
		this.outStockInfoDao.deleteByPrimaryKey(id);
	}
	
	//根据入库单ID 修改库存，删除帐页
	private void modifyReserve(String arrId) {
		List<TProductArrivalDetail> list = arrProductDao.getCanInvaArrDetail(arrId);
		for(TProductArrivalDetail dto : list) {
			String reserveId = dto.getToolsId();//toosId 暂存的是库存ID
			BigDecimal resAmount = dto.getActualAmount();//库存数量
			BigDecimal arrAmount = dto.getArrivalAmount();//本次入库数量
			BigDecimal nowAmount = resAmount.subtract(arrAmount);
			
			//修改库存
			TReserveInfor reserve = new TReserveInfor();
			reserve.setId(reserveId);
			reserve.setAmount(nowAmount);
			reserveInfoDao.updateAmount(reserve);
			
			//删除库存对应帐页
			reserveInfoDao.deleteAccounts(dto.getId());
		}
		
	}
	
	@Override
	public Integer updateStatus(TProductArrivalInfor arrInfo) {
		return this.arrInfoDao.updateStatus(arrInfo);
	}

	@Override
	public Integer isCanInvalidArr(String arrId) {
		return arrInfoDao.isCanInvalidArr(arrId);
	}

	@Override
	public List<String> modifyStockArr(Iterator<String> iterator) {
		List<String> idList = new ArrayList<String>();
		while(iterator.hasNext()) {
			String arrId = iterator.next();
			
			//入库单
			TProductArrivalInfor arrival = this.arrInfoDao.selectByPrimaryKey(arrId);
			//订单ID
			String orderId = arrival.getOrderInforId();
			TOrderInfor orderInfo = this.orderInfoDao.selectByPrimaryKey(orderId);
			
			TProductArrivalInfor arrInfo = new TProductArrivalInfor();
			arrInfo.setId(arrId);
			arrInfo.setStatus(2);
			
			if(this.isCanInvaStockArr(arrId) == 0) {
				
				//修改入库单状态
				List<TProductArrivalDetail> list = arrProductDao.getCanInvaArrDetail(arrId);
				int result = this.updateStatus(arrInfo);
				this.modifyReserve(arrId);
				
				if(orderInfo != null && orderInfo.getStatus() == 5) {
					//实例化订单，设定状态为已下单
					TOrderInfor order = new TOrderInfor();
					order.setId(orderId);
					order.setStatus(4);// 4 已下单
					this.updateOrderByIdSelective(order);
				}
			} else {
				idList.add(arrId);
			}
		}
		return idList;
	}

	@Override
	public Integer isCanInvaStockArr(String arrId) {
		return arrInfoDao.isCanInvaStockArr(arrId);
	}
	
}
