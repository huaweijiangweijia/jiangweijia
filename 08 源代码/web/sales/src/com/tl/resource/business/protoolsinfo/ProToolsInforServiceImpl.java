package com.tl.resource.business.protoolsinfo;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tl.common.util.PaginationSupport;
import com.tl.common.util.StringHelper;
import com.tl.resource.business.dto.SalesPriceHistoryProDto;
import com.tl.resource.business.dto.TreeDto;
import com.tl.resource.dao.TAccountsInforDAO;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TProductArrivalDetailDAO;
import com.tl.resource.dao.TProductBrandDAO;
import com.tl.resource.dao.TProductSortDAO;
import com.tl.resource.dao.TProductSourceDAO;
import com.tl.resource.dao.TProductToolsInforDAO;
import com.tl.resource.dao.TQuotationProductDetailDAO;
import com.tl.resource.dao.TReserveInforDAO;
import com.tl.resource.dao.TSalesPriceHistoryDAO;
import com.tl.resource.dao.pojo.TAccountsInforExample;
import com.tl.resource.dao.pojo.TOrderDetailExample;
import com.tl.resource.dao.pojo.TProductArrivalDetailExample;
import com.tl.resource.dao.pojo.TProductBrand;
import com.tl.resource.dao.pojo.TProductSort;
import com.tl.resource.dao.pojo.TProductSource;
import com.tl.resource.dao.pojo.TProductToolsInfor;
import com.tl.resource.dao.pojo.TProductToolsInforExample;
import com.tl.resource.dao.pojo.TReserveInfor;
import com.tl.resource.dao.pojo.TReserveInforExample;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class ProToolsInforServiceImpl implements ProToolsInforService {
	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	private TProductToolsInforDAO proToolsInforDAO;
	private TProductSortDAO proSortDao;
	private TProductBrandDAO proBrandDao;
	private TProductSourceDAO proSourceDao;
	private TSalesPriceHistoryDAO tsalesPriceHistoryDAO;
	private TQuotationProductDetailDAO quoDetailDAO;
	// 库存Dao
	private TReserveInforDAO reserveInfoDao;
	private TOrderDetailDAO orderDetailDao;
	private TAccountsInforDAO taccountsInforDAO;
	private TProductArrivalDetailDAO arrProductDao;

	public TProductSortDAO getProSortDao() {
		return proSortDao;
	}

	public void setProSortDao(TProductSortDAO proSortDao) {
		this.proSortDao = proSortDao;
	}

	public TProductBrandDAO getProBrandDao() {
		return proBrandDao;
	}

	public void setProBrandDao(TProductBrandDAO proBrandDao) {
		this.proBrandDao = proBrandDao;
	}

	public TProductSourceDAO getProSourceDao() {
		return proSourceDao;
	}

	public void setProSourceDao(TProductSourceDAO proSourceDao) {
		this.proSourceDao = proSourceDao;
	}

	@Override
	public void insertProTools(TProductToolsInfor proToolsInfo) {
		proToolsInforDAO.insertSelective(proToolsInfo);
	}

	public TProductToolsInforDAO getProToolsInforDAO() {
		return proToolsInforDAO;
	}

	public void setProToolsInforDAO(TProductToolsInforDAO proToolsInforDAO) {
		this.proToolsInforDAO = proToolsInforDAO;
	}

	@Override
	public List<TProductToolsInfor> getProToolsByPage(PaginationSupport pageInfo) {
		return proToolsInforDAO.getProToolsByPage(pageInfo);
	}

	@Override
	public List<TProductToolsInfor> getProToolsByParId(String parId) {
		return proToolsInforDAO.getProToolsByParId(parId);
	}

	@Override
	public List<TreeDto> getProTreeByPage(PaginationSupport pageInfo) {
		return proToolsInforDAO.getProTreeByPage(pageInfo);
	}

	@Override
	public int getProToolsTotal() {
		return proToolsInforDAO.getProToolsTotal();
	}

	@Override
	public String getId(String parId) {
		return proToolsInforDAO.getId(parId);
	}

	@Override
	public TreeDto getProTreeById(String id) {
		return proToolsInforDAO.getProTreeById(id);
	}

	@Override
	public void deleteProTools(String id) {
		proToolsInforDAO.deleteProTools(id);
	}

	@Override
	public void deleteProTools(List<TreeDto> list) {
		proToolsInforDAO.deleteProTools(list);
	}

	@Override
	public TProductToolsInfor getProToolsById(String id) {
		return proToolsInforDAO.getProToolsById(id);
	}

	@Override
	public void updateProToolsById(TProductToolsInfor proTools) throws Exception {
		// TQuotationProductDetailExample example = new
		// TQuotationProductDetailExample();
		// example.createCriteria().andToolsIdEqualTo(proTools.getId());
		// int cnt = quoDetailDAO.countByExample(example);
		// if (cnt == 0) {
		proToolsInforDAO.updateProToolsById(proTools);

		// TReserveInforExample exam = new TReserveInforExample();
		// exam.createCriteria().andToolsIdEqualTo(proTools.getId());
		//
		// TReserveInfor record = new TReserveInfor();
		// proTools.setAmount(BigDecimal.ZERO);
		// BeanUtils.copyProperties(record, proTools);
		// record.setId(null);
		// record.setAmount(null);
		// reserveInfoDao.updateByExampleSelective(record, exam);
		// } else {
		// throw new Exception("该工具信息已做报价");
		// }
	}

	@Override
	public List<TreeDto> getProToolsBySearch(Map<String, Object> parmMap) {
		return proToolsInforDAO.getProToolsBySearch(parmMap);
	}

	@Override
	public int getProToolsTotal(Map<String, Object> parmMap) {
		return proToolsInforDAO.getProToolsTotal(parmMap);
	}

	@Override
	public TreeDto getProductToolsInfoById(String id) {
		return proToolsInforDAO.getProductToolsInfoById(id);
	}

	@Override
	public List<TProductSort> getProSortBySortCode(String sortCode) {
		return proSortDao.getProSortBySortCode(sortCode);
	}

	@Override
	public List<TProductBrand> getProBrandByName(String name) {
		return proBrandDao.getProBrandByName(name);
	}

	@Override
	public List<TProductSource> getProSourceByName(String name) {
		return proSourceDao.getProSourceByName(name);
	}

	@Override
	public void updateNonStandPro(JSONArray jsonArray) throws Exception {
		Iterator<JSONObject> iterator = jsonArray.iterator();
		while (iterator.hasNext()) {
			JSONObject proTools = iterator.next();

			TProductToolsInfor proToolsDto = null;
			proToolsDto = (TProductToolsInfor) JSONObject.toBean(proTools, TProductToolsInfor.class);
			TreeDto treeDto = this.getProductToolsInfoById(proToolsDto.getId());
			Date createDate = treeDto.getStockPriceDate();
			this.deletePro(treeDto);

			proToolsDto.setProductCode(new StringBuffer(proToolsDto.getProductSortCode()).append("-")
					.append(proToolsDto.getId()).toString());
			proToolsDto.setStockPriceDate(createDate);

			this.updateProToolsById(proToolsDto);
			// this.insertProTools(proToolsDto);

			boolean hasChildes = true;
			try {
				proTools.getJSONArray("children");
			} catch (Exception e) {
				hasChildes = false;
			}
			if (hasChildes) {
				insertChildrenProtools(proTools, proToolsDto);
			}
			proToolsInforDAO.sycNotStandardToolsInfor(proToolsDto.getId());
		}
	}

	public List<TProductToolsInfor> addNonStandPro(JSONArray array) throws Exception {
		Iterator<JSONObject> iterator = array.iterator();
		String parentNodeId = "";
		ArrayList<TProductToolsInfor> list = new ArrayList<TProductToolsInfor>();
		while (iterator.hasNext()) {
			JSONObject proTools = iterator.next();
			String nodeId = this.getId(parentNodeId);// 得到最大ID

			TProductToolsInfor dto = null;
			dto = (TProductToolsInfor) JSONObject.toBean(proTools, TProductToolsInfor.class);

			dto.setId(nodeId);
			if (dto.getStockPriceDate() == null) {
				dto.setStockPriceDate(new Date());
			}
			dto.setProductCode(new StringBuffer(dto.getProductSortCode()).append("-").append(nodeId).toString());// 货品编号
			dto.setParentId(TProductToolsInfor.ROOT_PRARENT_ID);

			this.insertProTools(dto);

			if (proTools.has("children")) {
				insertChildrenProtools(proTools, dto);
			}
			list.add(dto);
		}
		return list;
	}

	private ArrayList<TProductToolsInfor> insertChildrenProtools(JSONObject proTools, TProductToolsInfor dto)
			throws Exception {
		// TODO Auto-generated method stub
		JSONArray arr = proTools.getJSONArray("children");
		ArrayList<TProductToolsInfor> list = new ArrayList<TProductToolsInfor>();
		for (Iterator iterator2 = arr.iterator(); iterator2.hasNext();) {
			JSONObject top = (JSONObject) iterator2.next();
			String nodeId = this.getId(dto.getId());
			TProductToolsInfor po2 = (TProductToolsInfor) JSONObject.toBean(top, TProductToolsInfor.class);
			po2.setParentId(dto.getId());
			po2.setId(nodeId);
			if (po2.getStockPriceDate() == null) {
				po2.setStockPriceDate(new Date());
			} else {
				Date date;
				String createDateStr = top.getString("createDateStr");
				if (!"".equals(createDateStr) && null != createDateStr) {
					date = df.parse(createDateStr);
					po2.setStockPriceDate(date);
				} else {
					po2.setStockPriceDate(null);
				}

			}
			// po2.setProductCode(new
			// StringBuffer(po2.getProductSortCode()).append("-").append(nodeId).toString());
			list.add(po2);
			JSONArray arr2 = null;
			try {
				arr2 = top.getJSONArray("children");

			} catch (Exception e) {
				po2.setLeaf(1);
			}

			if ("".equals(top.getString("toolsId")) && top.getBoolean("leaf")) {
				String parentNodeId = "";
				String id = this.getId(parentNodeId);// 得到最大ID
				TProductToolsInfor po3 = (TProductToolsInfor) JSONObject.toBean(top, TProductToolsInfor.class);
				po3.setParentId(TProductToolsInfor.ROOT_PRARENT_ID);
				po3.setProductCode(new StringBuffer(po3.getProductSortCode()).append("-").append(id).toString());// 货品编号
				po2.setProductCode(po3.getProductCode());// 货品编号
				po3.setLeaf(1);
				if (po3.getStockPriceDate() == null) {
					po3.setStockPriceDate(new Date());
				} else {
					Date date;
					String createDateStr = top.getString("createDateStr");
					if (!"".equals(createDateStr) && null != createDateStr) {
						date = df.parse(createDateStr);
						po3.setStockPriceDate(date);
					} else {
						po3.setStockPriceDate(null);
					}

				}
				po3.setId(id);
				this.insertProTools(po3);
			} else if ("".equals(top.getString("toolsId")) && !top.getBoolean("leaf")) {
				String parentNodeId = "";
				String id = this.getId(parentNodeId);// 得到最大ID
				TProductToolsInfor po3 = (TProductToolsInfor) JSONObject.toBean(top, TProductToolsInfor.class);
				po3.setId(id);
				po3.setParentId(TProductToolsInfor.ROOT_PRARENT_ID);
				po3.setProductCode(new StringBuffer(po3.getProductSortCode()).append("-").append(id).toString());// 货品编号
				if (po3.getStockPriceDate() == null) {
					po3.setStockPriceDate(new Date());
				} else {
					Date date;
					String createDateStr = top.getString("createDateStr");
					if (!"".equals(createDateStr) && null != createDateStr) {
						date = df.parse(createDateStr);
						po3.setStockPriceDate(date);
					} else {
						po3.setStockPriceDate(null);
					}

				}
				po2.setProductCode(po3.getProductCode());// 货品编号

				this.insertProTools(po3);

				if (arr2 != null && arr2.size() > 0) {
					po3.setChildren(insertChildrenProtools(top, po3));
				}
			}

			this.insertProTools(po2);
			if (arr2 != null && arr2.size() > 0) {
				po2.setChildren(insertChildrenProtools(top, po2));
			} else {

			}
		}
		dto.setChildren(list);
		return list;
	}

	// 删除工具信息子节点
	private void deletePro(TreeDto treeDto) {
		List<TreeDto> list = treeDto.getChildren();
		deleteChildren(list);
	}

	private void deleteChildren(List<TreeDto> list) {
		if (list != null && list.size() > 0) {
			for (TreeDto treeNode : list) {
				List<TreeDto> list1 = treeNode.getChildren();
				this.deleteProTools(treeNode.getId());
				deleteChildren(list1);
			}
		}
	}

	@Override
	public List<TreeDto> getTreeDto(TreeDto treeDto) {
		String proCode = treeDto.getBrandCode();
		String productName = treeDto.getProductName();
		if (proCode != null && !"".equals(proCode)) {
			treeDto.setBrandCode(StringHelper.replaceBlank(proCode));
		}

		if (productName != null && !"".equals(productName)) {
			treeDto.setProductName(StringHelper.replaceBlank(productName));
		}
		return proToolsInforDAO.getTreeDto(treeDto);
	}

	@Override
	public List<TProductBrand> getProBrandBySorce(String sourceName) {
		return proBrandDao.getProBrandBySorce(sourceName);
	}

	@Override
	public List<TProductSort> getProSortByBrand(String brand) {
		return proSortDao.getProSortByBrand(brand);
	}

	@Override
	public List<TreeDto> getToolsBySearch(Map<String, Object> parmMap) {
		return proToolsInforDAO.getToolsBySearch(parmMap);
	}

	@Override
	public List<TreeDto> getToolsByRootNode(Map<String, Object> parmMap) {
		return proToolsInforDAO.getToolsByRootNode(parmMap);
	}

	@Override
	public List<TreeDto> getToolsWithChildren(Map<String, Object> parmMap) {
		return proToolsInforDAO.getToolsWithChildren(parmMap);
	}

	@Override
	public List getHistoryYear(String productBrand) {
		return tsalesPriceHistoryDAO.getHistoryYear(productBrand);
	}

	public TSalesPriceHistoryDAO getTsalesPriceHistoryDAO() {
		return tsalesPriceHistoryDAO;
	}

	public void setTsalesPriceHistoryDAO(TSalesPriceHistoryDAO tsalesPriceHistoryDAO) {
		this.tsalesPriceHistoryDAO = tsalesPriceHistoryDAO;
	}

	@Override
	public List<TProductSource> getProSourceByAll() {
		return proSourceDao.getProSourceByAll();
	}

	@Override
	public PaginationSupport findSupToolsList(Map<String, Object> mparams, String startIndex, String pageSize) {

		PaginationSupport pageInfor = proToolsInforDAO.findSupToolsList(mparams, startIndex, pageSize);
		return pageInfor;
	}

	@Override
	public List<TProductBrand> getBrand4import(TreeDto treeDto) {
		return proBrandDao.getBrand4import(treeDto);
	}

	@Override
	public List<TProductSort> getProSort4Import(TreeDto treeDto) {
		return proSortDao.getProSort4Import(treeDto);
	}

	@Override
	public void deleteTools(TreeDto treeDto) throws Exception {

		TOrderDetailExample exam = new TOrderDetailExample();
		exam.createCriteria().andToolsIdEqualTo(treeDto.getId());
		int ordCnt = orderDetailDao.countByExample(exam);

		int cnt = proToolsInforDAO.getResCntByToolsId(treeDto.getId());

		TProductArrivalDetailExample arrExam = new TProductArrivalDetailExample();
		arrExam.createCriteria().andToolsIdEqualTo(treeDto.getId());
		int arrCnt = arrProductDao.countByExample(arrExam);

		if (ordCnt > 0) {
			throw new Exception("该工具信息已做订单");
		} else if (arrCnt > 0) {
			throw new Exception("该工具信息已做入库单");
		} else if (cnt > 0) {
			throw new Exception("该工具信息已入库或出库");
		} else {
			// 工具信息面价
			List<SalesPriceHistoryProDto> list = this.tsalesPriceHistoryDAO.getHistoryPriceByToolsId(treeDto.getId());
			if (list != null && list.size() > 0) {
				for (SalesPriceHistoryProDto dto : list) {
					this.tsalesPriceHistoryDAO.deleteByPrimaryKey(dto.getId());
				}
			}
			deletePro(treeDto);

			this.deleteProTools(treeDto.getId());

			TReserveInforExample resExam = new TReserveInforExample();
			resExam.createCriteria().andToolsIdEqualTo(treeDto.getId());

			List reList = reserveInfoDao.selectByExample(resExam);

			if (reList.size() > 0) {
				TReserveInfor res = (TReserveInfor) reList.get(0);
				TAccountsInforExample accExam = new TAccountsInforExample();
				accExam.createCriteria().andReserveInforIdEqualTo(res.getId());

				taccountsInforDAO.deleteByExample(accExam);
				reserveInfoDao.deleteByExample(resExam);
			}
		}
	}

	@Override
	public List<TreeDto> getTools4Export(HttpServletRequest request, HttpServletResponse response) {
		String customerId = request.getParameter("customerId");
		// 搜索字符串

		String searchStr = request.getParameter("searchStr");
		String productCode = "";
		String brandCode = "";
		String productName = "";
		String productBrand = "";
		if (searchStr != null && !"".equals(searchStr)) {

			JSONObject search = JSONObject.fromObject(searchStr);

			try {
				productCode = search.getString("productCode");
			} catch (Exception e) {

			}
			try {
				brandCode = search.getString("brandCode");
			} catch (Exception e) {

			}
			try {
				productName = search.getString("productName");
			} catch (Exception e) {

			}

			if (search.has("productBrand"))
				productBrand = search.getString("productBrand");
		}

		Map<String, Object> parmMap = new HashMap<String, Object>();
		parmMap.put("productCode", productCode);
		parmMap.put("brandCode", brandCode);
		parmMap.put("productName", productName);
		parmMap.put("customerId", customerId);
		parmMap.put("productBrand", productBrand);

		ArrayList list = new ArrayList();

		int total = this.getProToolsTotal(parmMap);

		PaginationSupport pageInfo = new PaginationSupport(list, total, total, 0);

		parmMap.put("pageInfo", pageInfo);
		List<TreeDto> proList = new ArrayList<TreeDto>();

		proList = this.getToolsByRootNode(parmMap);

		return proList;
	}

	@Override
	public void loadToolsDataFile(String fileName) throws Exception {
		proToolsInforDAO.loadToolsDataFile(fileName);

	}

	@Override
	public void insertTools() throws Exception {
		proToolsInforDAO.insertTools();
	}

	@Override
	public List<TreeDto> checkBrandIsExist(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return proToolsInforDAO.checkBrandIsExist(parmMap);
	}

	@Override
	public List<TreeDto> checkSortIsExist() {
		// TODO Auto-generated method stub
		return proToolsInforDAO.checkSortIsExist();
	}

	@Override
	public List<TreeDto> checkToolsIsExist(Map<String, Object> parmMap) {
		// TODO Auto-generated method stub
		return proToolsInforDAO.checkToolsIsExist(parmMap);
	}

	@Override
	public void deleteTempData() {
		proToolsInforDAO.deleteTempData();
	}

	@Override
	public Integer getCountCanInsert() {
		return proToolsInforDAO.getCountCanInsert();
	}

	@Override
	public void generImpTools() throws Exception {
		proToolsInforDAO.generImpTools();
	}

	@Override
	public void impOrderPrice() throws Exception {
		proToolsInforDAO.impOrderPrice();
	}

	@Override
	public List<TreeDto> getExistTools(Map<String, Object> parmMap) {
		return proToolsInforDAO.getExistTools(parmMap);
	}

	@Override
	public List<TreeDto> getRepeatData() {
		// TODO Auto-generated method stub
		return proToolsInforDAO.getRepeatData();
	}

	@Override
	public int getTreeDto4Update(TreeDto dto) {
		TProductToolsInforExample example = new TProductToolsInforExample();
		example.createCriteria().andBrandCodeEqualTo(dto.getBrandCode()).andProductBrandEqualTo(dto.getProductBrand())
				.andIdNotEqualTo(dto.getId());
		int cnt = proToolsInforDAO.countByExample(example);
		return cnt;
	}

	public TQuotationProductDetailDAO getQuoDetailDAO() {
		return quoDetailDAO;
	}

	public void setQuoDetailDAO(TQuotationProductDetailDAO quoDetailDAO) {
		this.quoDetailDAO = quoDetailDAO;
	}

	public TReserveInforDAO getReserveInfoDao() {
		return reserveInfoDao;
	}

	public void setReserveInfoDao(TReserveInforDAO reserveInfoDao) {
		this.reserveInfoDao = reserveInfoDao;
	}

	public TOrderDetailDAO getOrderDetailDao() {
		return orderDetailDao;
	}

	public void setOrderDetailDao(TOrderDetailDAO orderDetailDao) {
		this.orderDetailDao = orderDetailDao;
	}

	public TAccountsInforDAO getTaccountsInforDAO() {
		return taccountsInforDAO;
	}

	public void setTaccountsInforDAO(TAccountsInforDAO taccountsInforDAO) {
		this.taccountsInforDAO = taccountsInforDAO;
	}

	public TProductArrivalDetailDAO getArrProductDao() {
		return arrProductDao;
	}

	public void setArrProductDao(TProductArrivalDetailDAO arrProductDao) {
		this.arrProductDao = arrProductDao;
	}

	@Override
	public int deleteProductTools(String id) {
		return proToolsInforDAO.deleteByPrimaryKey(id);
	}
}
