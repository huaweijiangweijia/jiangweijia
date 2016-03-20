package com.tl.resource.business.contractOrder;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Drawing;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.MoneyUtil;
import com.tl.common.util.WebUtils;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.dao.TAccessoriesDAO;
import com.tl.resource.dao.TCompanyInforDAO;
import com.tl.resource.dao.TExchangeRateDAO;
import com.tl.resource.dao.TOrderDetailDAO;
import com.tl.resource.dao.TOrderInforDAO;
import com.tl.resource.dao.TSuppliersInforDAO;
import com.tl.resource.dao.pojo.TCompanyInfor;
import com.tl.resource.dao.pojo.TCompanyInforExample;
import com.tl.resource.dao.pojo.TExchangeRate;
import com.tl.resource.dao.pojo.TOrderInfor;
import com.tl.resource.dao.pojo.TSuppliersInfor;

public class OrderExcelImp implements OrderExcel {
  private java.text.DecimalFormat df = new java.text.DecimalFormat("#.00");

  public static final String TempletePath = "\\upload\\templete\\order_templete.xls";

  public static final String OrderPath1 = "\\upload\\templete\\contract_order_list_templete.xls";

  public static final String OrderPath2 = "\\upload\\templete\\order_list_templete.xls";

  public static final String OrderPath3 = "\\upload\\templete\\qutation_order_list_templete.xls";

  private TCompanyInforDAO companyInforDAO;

  private TOrderInforDAO orderInforDao;

  private TOrderDetailDAO orderDetailDao;

  private TSuppliersInforDAO suppliersInforDao;

  private TAccessoriesDAO accessoriesDAO;

  private TExchangeRateDAO exchangeRateDAO;

  private Map<String, CellStyle> styles;

  private TCompanyInfor comInfor = new TCompanyInfor();

  private TSuppliersInfor supplier;

  private OrderInfoDto orderInfor;

  private String logoPath, footerPath, basePath;

  private HSSFSheet dataSheet;

  private HSSFWorkbook workbook;

  @Override
  public void exportExcel(String orderId, HttpServletResponse response, HttpServletRequest request) throws IOException {
    // 生成Excel文件.
    // conPo = contractInforDAO.selectByPrimaryKey(conId);
    orderInfor = orderInforDao.getExcelOrderInfor(orderId);
    basePath = request.getRealPath("/");
    FileInputStream fs = new FileInputStream(basePath + TempletePath);

    TCompanyInforExample comExp = new TCompanyInforExample();
    comExp.createCriteria().andCompanyNameEqualTo(orderInfor.getCompanyName() == null ? "" : orderInfor.getCompanyName());
    List<TCompanyInfor> companys = companyInforDAO.selectByExample(comExp);
    if (companys != null && companys.size() > 0) {
      comInfor = companys.get(0);
    }
    Map<String, Object> parmMap = new HashMap<String, Object>();
    parmMap.put("orderId", orderInfor.getId());
    List<OrderDetialsDto> orderDetail = orderDetailDao.getOrderDetailsLists(parmMap);

    supplier = suppliersInforDao.selectByPrimaryKey(orderInfor.getSupplierId());

    Map<String, Object> businessData = new HashMap<String, Object>();
    businessData.put("orderInfor", orderInfor);
    businessData.put("supplier", supplier);
    businessData.put("comInfor", comInfor);
    businessData.put("orderDetail", orderDetail);

    //exportExcelWorkbook();

    // 输出Excel文件.
    response.setContentType("application/vnd.ms-excel");
    WebUtils.setDownloadableHeader(response, orderInfor.getOrderCode() + ".xls");
    XLSTransformer tf = new XLSTransformer();
    try {
      Workbook workbook = tf.transformXLS(fs, businessData);
      workbook.write(response.getOutputStream());
    } catch (ParsePropertyException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    } catch (InvalidFormatException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    response.getOutputStream().flush();
  }

  private void exportExcelWorkbook() {
    Workbook wb = this.workbook;
    Sheet s = this.dataSheet;
    Cell c0;
    Cell c5;
    int rowIndex = 3;
    Drawing patriarch = s.createDrawingPatriarch();
    rowIndex = createSheetHeaderInfor(wb, s, rowIndex, "合  同  订  单", patriarch);
    rowIndex += 2;
    // rowIndex = createSheetTableHeader(wb, s,rowIndex);

    Map<String, Object> parmMap = new HashMap<String, Object>();
    parmMap.put("orderId", orderInfor.getId());
    List<OrderDetialsDto> orderDetail = orderDetailDao.getOrderDetailsLists(parmMap);
    int prodCount = orderDetail.size();
    if (prodCount > 6) {//			
      Row r8 = s.getRow(++rowIndex);
      c0 = this.getCell(r8, 2);
      c0.setCellValue("产品详见合同清单");

      c0 = this.getCell(r8, 4);
      c0.setCellValue("批");

      c0 = this.getCell(r8, 5);
      c0.setCellValue(1);

      c0 = this.getCell(r8, 6);
      c0.setCellValue(orderInfor.getProductMoney().toString());

      c0 = this.getCell(r8, 7);
      c0.setCellValue(orderInfor.getProductMoney().toString());

      c0 = this.getCell(r8, 8);
      c0.setCellValue("见清单");

      c0 = this.getCell(r8, 9);
      c0.setCellValue("见清单");

      Sheet sd = wb.getSheetAt(1);
      int rIndex = 3;
      Drawing patriarch2 = sd.createDrawingPatriarch();
      rIndex = createSheetHeaderInfor(wb, sd, rIndex, "合同清单", patriarch2);
      // rIndex = createSheetTableHeader(wb, sd,rIndex);
      rIndex += 1;
      rIndex = createSheetTableData(wb, sd, rIndex, Integer.MAX_VALUE);
      insertFooterImage(sd, (HSSFWorkbook) wb, (short) 0, ++rIndex, (short) 9, rIndex, patriarch2);
    } else {
      rowIndex = createSheetTableData(wb, s, rowIndex, 6);
    }
    rowIndex = 14;
    String[] totalRowsValue = { "货品总计：", "税 率： ", "税 金： ", "价税合计： ", "整单折扣： ", "最终金额： ", "大写金额： " };

    for (int i = 0; i < totalRowsValue.length; i++) {
      Row t = s.getRow(++rowIndex);
      switch (i) {
      case 0:
        c0 = this.getCell(t, 3);
        BigDecimal tmp = orderInfor.getProductMoney();
        tmp = tmp == null ? BigDecimal.ZERO : tmp;
        c0.setCellValue(df.format(tmp.doubleValue()));
        break;
      case 1:
        c0 = this.getCell(t, 3);
        tmp = orderInfor.getTaxRate();
        tmp = tmp == null ? BigDecimal.ZERO : tmp;
        c0.setCellValue("0" + df.format(tmp.doubleValue()));
        break;
      case 2:
        c0 = this.getCell(t, 3);
        tmp = orderInfor.getTaxMoney();
        tmp = tmp == null ? BigDecimal.ZERO : tmp;
        c0.setCellValue(df.format(tmp.doubleValue()));
        break;
      case 3:
        c0 = this.getCell(t, 3);
        tmp = orderInfor.getTotalMoney();
        tmp = tmp == null ? BigDecimal.ZERO : tmp;
        c0.setCellValue(df.format(tmp.doubleValue()));

        break;
      case 4:
        c0 = this.getCell(t, 3);
        if (orderInfor.getOverallRebate() == null || orderInfor.getOverallRebate().doubleValue() == 0) {
          t.getCell(0).setCellValue("");
          c0.setCellValue("");
          t.setHeight((short) 0);
        } else {
          tmp = orderInfor.getOverallRebate();
          tmp = tmp == null ? BigDecimal.ZERO : tmp;
          c0.setCellValue(df.format(tmp.doubleValue()));
        }
        break;
      case 5:
        c0 = this.getCell(t, 3);
        tmp = orderInfor.getFinalMoney();
        tmp = tmp == null ? BigDecimal.ZERO : tmp;
        c0.setCellValue(df.format(tmp.doubleValue()));
        if (orderInfor.getTotalMoney() == null || orderInfor.getTotalMoney().doubleValue() == tmp.doubleValue()) {
          t.getCell(0).setCellValue("");
          c0.setCellValue("");
          t.setHeight((short) 0);
        }
        break;
      case 6:
        c0 = this.getCell(t, 3);
        tmp = orderInfor.getFinalMoney();
        tmp = tmp == null ? BigDecimal.ZERO : tmp;
        c0.setCellValue(MoneyUtil.CNValueOf(df.format(tmp.doubleValue())));
        break;
      default:
        break;
      }
    }
    int colIndex = 0;
    Row t = s.getRow(++rowIndex);
    Cell c1 = this.getCell(t, colIndex);
    c1.setCellValue(c1.getStringCellValue() + orderInfor.getQualityStandard());

    t = s.getRow(++rowIndex);
    c1 = this.getCell(t, colIndex);
    c1.setCellValue(c1.getStringCellValue() + orderInfor.getDeliveryAddressType());

    t = s.getRow(++rowIndex);
    c1 = this.getCell(t, colIndex);
    c1.setCellValue(c1.getStringCellValue() + orderInfor.getTrafficMode());

    rowIndex += 2;

    t = s.getRow(++rowIndex);
    c1 = this.getCell(t, colIndex);
    c1.setCellValue(c1.getStringCellValue() + orderInfor.getClosingAccountMode());

    t = s.getRow(++rowIndex);
    c1 = this.getCell(t, colIndex);
    c1.setCellValue(c1.getStringCellValue() + orderInfor.getOtherConvention());

    t = s.getRow(++rowIndex);
    c1 = this.getCell(t, colIndex);
    c1.setCellValue(c1.getStringCellValue() + orderInfor.getDefaultDuty());

    ++rowIndex;

    t = s.getRow(++rowIndex);
    c1 = this.getCell(t, colIndex);
    c1.setCellValue("十一，合同生效：" + orderInfor.getEffectConditions() + "  传真件具有同等法律效力。");

    rowIndex = 33;
    String[] infors = { "单位名称（章）:", "注册地址: ", "法人代表： ", "委托代理人: ", "电      话: ", "开  户 行: ", "帐      号: ", "税      号: ", "邮寄地址： ", "邮政编码: " };
    String[] companyArr = { comInfor.getCompanyName(), comInfor.getRegAddress(), comInfor.getContactPerson(), "", comInfor.getPhone(),
      comInfor.getBank(), comInfor.getAccountNumber(), comInfor.getTaxCode(), comInfor.getCompanyAddress(), comInfor.getPostcode() };

    String[] customerArr = { supplier.getSupplierName(), supplier.getContractAddress(), "", "", supplier.getPhoneFirst(), supplier.getBank(),
      supplier.getAccountNumber(), supplier.getTaxCode(), supplier.getComAdress(), supplier.getPostcode() };
    int colIndex1 = 0, colIndex2 = 5;
    for (int i = 0; i < infors.length; i++) {
      Row tt = s.getRow(++rowIndex);
      c0 = getCell(tt, colIndex1);
      c0.setCellValue(c0.getStringCellValue() + companyArr[i]);

      c5 = getCell(tt, colIndex2);
      c5.setCellValue(c5.getStringCellValue() + customerArr[i]);
    }
    rowIndex += 3;
    insertFooterImage(s, (HSSFWorkbook) wb, (short) 0, rowIndex, (short) 9, rowIndex, patriarch);
  }

  private int createSheetTableData(Workbook wb, Sheet s, int rowIndex, int maxCount) {
    CellStyle tcs;
    Cell c0;
    Row r8;
    Map<String, Object> parmMap = new HashMap<String, Object>();
    parmMap.put("orderId", orderInfor.getId());
    List<OrderDetialsDto> list = orderDetailDao.getOrderDetailsLists(parmMap);
    int i = 0;

    for (Iterator iterator = list.iterator(); i < maxCount && iterator.hasNext();) {
      OrderDetialsDto orderDetail = (OrderDetialsDto) iterator.next();
      r8 = s.getRow(++rowIndex);
      if (r8 == null)
        r8 = s.createRow(rowIndex - 1);
      c0 = getCell(r8, 0);
      c0.setCellValue(orderDetail.getProjectCode());

      c0 = getCell(r8, 1);
      c0.setCellValue(i + 1);

      c0 = getCell(r8, 2);
      c0.setCellValue(orderDetail.getProductName());

      c0 = getCell(r8, 3);
      c0.setCellValue(orderDetail.getBrandCode());

      c0 = getCell(r8, 4);
      c0.setCellValue(orderDetail.getProductUnit());

      c0 = getCell(r8, 5);
      BigDecimal tmp = orderDetail.getOrderAmount();
      tmp = tmp == null ? BigDecimal.ZERO : tmp;
      c0.setCellValue(df.format(tmp.doubleValue()));

      c0 = getCell(r8, 6);
      tmp = orderDetail.getPrice();
      tmp = tmp == null ? BigDecimal.ZERO : tmp;
      c0.setCellValue(df.format(tmp.doubleValue()));

      c0 = getCell(r8, 7);
      tmp = orderDetail.getProductMoney();
      tmp = tmp == null ? BigDecimal.ZERO : tmp;
      c0.setCellValue(df.format(tmp.doubleValue()));

      c0 = getCell(r8, 8);
      c0.setCellValue(orderDetail.getDeliveryDate());

      c0 = getCell(r8, 9);
      c0.setCellValue(orderDetail.getProductBrand());
      i++;
    }
    return rowIndex;
  }

  private void insertFooterImage(Sheet s, HSSFWorkbook wb, short x1, int y1, short x2, int y2, Drawing patriarch) {
    if (this.footerPath != null) {
      HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 1023, 255, x1, y1, x2, y2);
      patriarch.createPicture(anchor, wb.addPicture(getImageByteArray(this.footerPath), HSSFWorkbook.PICTURE_TYPE_JPEG));
    }
  }

  private int createSheetHeaderInfor(Workbook wb, Sheet s, int rowIndex, String header, Drawing patriarch) {
    if (this.logoPath != null) {
      HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 1023, 255, (short) 0, 0, (short) (9), 0);
      patriarch.createPicture(anchor, wb.addPicture(getImageByteArray(this.logoPath), HSSFWorkbook.PICTURE_TYPE_JPEG));
    }
    int colIndex1 = 3;
    int colIndex2 = 7;
    Row r3 = s.getRow(rowIndex);
    Cell c0 = getCell(r3, colIndex1);
    if (orderInfor.getOrderType() == 3 || orderInfor.getOrderType() == 7 || orderInfor.getOrderType() == 8) {
      c0.setCellValue(orderInfor.getCustomerName());
    } else {
      c0.setCellValue(orderInfor.getCompanyName());
    }
    Cell c5 = getCell(r3, colIndex2);
    c5.setCellValue(orderInfor.getOrderCode());
    Row r4 = s.getRow(rowIndex);
    c5 = getCell(r4, colIndex2);
    // c5.setCellValue();

    Row r5 = s.getRow(++rowIndex);
    Cell c1 = getCell(r5, colIndex1);
    c1.setCellValue(orderInfor.getSupplierName());
    Cell c6 = getCell(r5, colIndex2);
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    String ed = dateFormat.format(orderInfor.getEditDate());

    if (ed != null && ed.split("-").length >= 3) {
      String[] date = ed.split("-");
      c6.setCellValue(date[0] + "年" + date[1] + " 月" + date[2] + "日");
    }

    Row r7 = s.getRow(++rowIndex);
    c5 = getCell(r7, colIndex2);
    c5.setCellValue("");

    TExchangeRate expo = exchangeRateDAO.selectByPrimaryKey(orderInfor.getCurrencyId());
    Row r6 = s.getRow(++rowIndex);
    c5 = getCell(r6, colIndex2);
    c5.setCellValue(expo.getCurrencyName());

    return rowIndex;
  }

  private Cell getCell(Row r3, int index) {
    Cell c0 = (r3.getCell(index) == null ? r3.createCell(index) : r3.getCell(index));
    return c0;
  }

  private byte[] getImageByteArray(String logoPath2) {
    ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();
    ;
    try {
      if (logoPath2 == null)
        return null;
      String[] temp = logoPath2.split("\\.");
      String extName = temp.length >= 2 ? temp[temp.length - 1] : "";
      BufferedImage bufferImg = ImageIO.read(new File(logoPath2));
      ImageIO.write(bufferImg, extName, byteArrayOut);
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    return byteArrayOut.toByteArray();
  }

  /**
   * 导出订单列表的Excel
   */
  @Override
  public void orderListExcel(Map<String, Object> parmMap, HttpServletResponse response, HttpServletRequest request) throws IOException {
    // TODO Auto-generated method stub
    UserDto userDto = null;
    if (LoginInforUtil.getLoginInfor(request) != null) {
      userDto = LoginInforUtil.getLoginInfor(request).getUser();
    }
    // Map<String, Object> parmMap = new HashMap<String, Object>();
    // parmMap.put("orderType", orderType);
    parmMap.put("userId", userDto.getId());
    List<TOrderInfor> orderList = orderInforDao.getOrderList(parmMap);
    String path = null;
    String title = "";

    basePath = request.getRealPath("/");
    FileInputStream fs = null;

    switch (Integer.parseInt(parmMap.get("orderType").toString())) {
    case 1:
      title = "合同订单";
      path = OrderPath1;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeContractOrder(dataSheet, orderList);
      break;
    case 2:
      title = "产品储备订单";
      path = OrderPath2;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeOrder(dataSheet, orderList);
      break;
    case 3:
      title = "合同加工订单";
      path = OrderPath1;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeContractOrder(dataSheet, orderList);
      break;
    case 4:
      title = "材料储备订单";
      path = OrderPath2;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeOrder(dataSheet, orderList);
      break;
    case 5:
      title = "预定订单";
      path = OrderPath3;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeQutationOrder(dataSheet, orderList);
      break;
    case 6:
      title = "试刀订单";
      path = OrderPath3;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeQutationOrder(dataSheet, orderList);
      break;
    case 7:
      title = "预定加工订单";
      path = OrderPath3;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeQutationOrder(dataSheet, orderList);
      break;
    case 8:
      title = "试刀加工订单";
      path = OrderPath3;
      fs = new FileInputStream(basePath + path);
      workbook = new HSSFWorkbook(fs);
      dataSheet = workbook.getSheetAt(0);
      writeQutationOrder(dataSheet, orderList);
      break;
    }
    //

    // 输出Excel文件.
    response.setContentType("text/html;charset=utf-8");
    response.setContentType("application/vnd.ms-excel");
    WebUtils.setDownloadableHeader(response, java.net.URLEncoder.encode(title + ".xls", "UTF-8"));
    workbook.write(response.getOutputStream());
    response.getOutputStream().flush();
  }

  /**
   * 写Excel文件(合同订单和加工订单)
   * 
   * @return
   */
  public void writeContractOrder(HSSFSheet sheet, List<TOrderInfor> list) {
    int index = 0;
    for (int j = 0; j < list.size(); j++, index = j) {
      TOrderInfor infor = list.get(j);
      HSSFRow detailRow = sheet.createRow((1 + j));
//      String[] inforHeader = { String.valueOf(index), infor.getOrderCode(), infor.getSupplierName(), infor.getOwnContactPerson(),
//        returnStatus(infor.getStatus()), infor.getContractCode(), returnUrgentLevel(infor.getUrgentLevel()), infor.getDeliveryDate(),
//        infor.getCurrencyName(), String.valueOf(infor.getTotalMoney()), infor.getUserName(), infor.getEditDateCopy(), infor.getOrderDate(),
//        String.valueOf(infor.getTaxRate()), String.valueOf(infor.getProductMoney()), String.valueOf(infor.getOverallRebate()),
//        String.valueOf(infor.getFinalMoney()), infor.getCustomerName(),
//        infor.getSupplierContactPerson() == null ? "" : infor.getSupplierContactPerson(), infor.getCompanyName(),
//        infor.getMome() == null ? "" : infor.getMome() };
      String[] inforHeader = {infor.getOrderCode(), infor.getSupplierName(), infor.getOwnContactPerson(),
    	        returnStatus(infor.getStatus()), infor.getContractCode(), returnUrgentLevel(infor.getUrgentLevel()), infor.getDeliveryDate(),
    	        infor.getCurrencyName(), String.valueOf(infor.getTotalMoney()), infor.getUserName(), infor.getEditDateCopy(), infor.getOrderDate(),
    	        String.valueOf(infor.getTaxRate()), String.valueOf(infor.getProductMoney()), String.valueOf(infor.getOverallRebate()),
    	        String.valueOf(infor.getFinalMoney()),String.valueOf(infor.getContractMoney()), infor.getCustomerName(),
    	        infor.getSupplierContactPerson() == null ? "" : infor.getSupplierContactPerson(), infor.getCompanyName(),
    	        infor.getMome() == null ? "" : infor.getMome() };
      for (int i = 0; i < inforHeader.length; i++) {
        HSSFCell headerCell = detailRow.createCell(i);
        headerCell.setCellValue(inforHeader[i]);
      }

    }
    // System.out.println(index);
  }

  /**
   * 写Excel文件(产品储备和材料储备)
   * 
   * @return
   */
  public void writeOrder(HSSFSheet sheet, List<TOrderInfor> list) {
    int index = 0;
    for (int j = 0; j < list.size(); j++, index = j) {
      TOrderInfor infor = list.get(j);
      HSSFRow detailRow = sheet.createRow((1 + j));
      String[] inforHeader = { String.valueOf(index), infor.getOrderCode(), infor.getSupplierName(),
        infor.getSupplierContactPerson() == null ? "" : infor.getSupplierContactPerson(), returnStatus(infor.getStatus()),
        returnUrgentLevel(infor.getUrgentLevel()), infor.getDeliveryDate(), infor.getCurrencyName(), String.valueOf(infor.getTotalMoney()),
        infor.getUserName(), infor.getEditDateCopy(), infor.getOrderDate(), String.valueOf(infor.getTaxRate()),
        String.valueOf(infor.getProductMoney()), String.valueOf(infor.getOverallRebate()), String.valueOf(infor.getFinalMoney()),
        infor.getCustomerName(), infor.getCompanyName(), infor.getMome() == null ? "" : infor.getMome() };
      for (int i = 0; i < inforHeader.length; i++) {
        HSSFCell headerCell = detailRow.createCell(i);
        headerCell.setCellValue(inforHeader[i]);
      }

    }
    // System.out.println(index);
  }

  /**
   * 写Excel文件(和报价单相关的订单)
   * 
   * @return
   */
  public void writeQutationOrder(HSSFSheet sheet, List<TOrderInfor> list) {
    int index = 0;
    for (int j = 0; j < list.size(); j++, index = j) {
      TOrderInfor infor = list.get(j);
      HSSFRow detailRow = sheet.createRow((1 + j));
      String[] inforHeader = { String.valueOf(index), infor.getOrderCode(), infor.getSupplierName(), infor.getOwnContactPerson(),
        returnStatus(infor.getStatus()), infor.getQuotationCode(), returnUrgentLevel(infor.getUrgentLevel()), infor.getDeliveryDate(),
        infor.getCurrencyName(), String.valueOf(infor.getTotalMoney()), infor.getUserName(), infor.getEditDateCopy(), infor.getOrderDate(),
        String.valueOf(infor.getTaxRate()), String.valueOf(infor.getProductMoney()), String.valueOf(infor.getOverallRebate()),
        String.valueOf(infor.getFinalMoney()), infor.getCustomerName(),
        infor.getSupplierContactPerson() == null ? "" : infor.getSupplierContactPerson(), infor.getCompanyName(),
        infor.getMome() == null ? "" : infor.getMome() };
      for (int i = 0; i < inforHeader.length; i++) {
        HSSFCell headerCell = detailRow.createCell(i);
        headerCell.setCellValue(inforHeader[i]);
      }

    }
    // System.out.println(index);
  }

  /**
   * 返回状态值的中文表示
   * 
   * @return
   */
  private String returnStatus(int status) {
    String strStatus = "编制";
    switch (status) {
    case 0:
      strStatus = "编制";
      break;
    case 1:
      strStatus = "待审批";
      break;
    case 2:
      strStatus = "审批通过";
      break;
    case 3:
      strStatus = "审批退回";
      break;
    case 4:
      strStatus = "已下单";
      break;
    case 5:
      strStatus = "到货完毕";
      break;
    case 6:
      strStatus = "已做计划";
      break;
    }
    return strStatus;
  }

  /**
   * 返回紧急程度值的中文表示
   * 
   * @return
   */
  private String returnUrgentLevel(int urgentLevel) {
    String strUrgentLevel = "不紧急";
    switch (urgentLevel) {
    case 0:
      strUrgentLevel = "不紧急";
      break;
    case 1:
      strUrgentLevel = "紧急";
      break;
    }
    return strUrgentLevel;
  }

  public Map<String, CellStyle> getStyles() {
    return styles;
  }

  public void setStyles(Map<String, CellStyle> styles) {
    this.styles = styles;
  }

  public TAccessoriesDAO getAccessoriesDAO() {
    return accessoriesDAO;
  }

  public void setAccessoriesDAO(TAccessoriesDAO accessoriesDAO) {
    this.accessoriesDAO = accessoriesDAO;
  }

  public java.text.DecimalFormat getDf() {
    return df;
  }

  public void setDf(java.text.DecimalFormat df) {
    this.df = df;
  }

  public TCompanyInforDAO getCompanyInforDAO() {
    return companyInforDAO;
  }

  public void setCompanyInforDAO(TCompanyInforDAO companyInforDAO) {
    this.companyInforDAO = companyInforDAO;
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

  public TSuppliersInforDAO getSuppliersInforDao() {
    return suppliersInforDao;
  }

  public void setSuppliersInforDao(TSuppliersInforDAO suppliersInforDao) {
    this.suppliersInforDao = suppliersInforDao;
  }

  public TCompanyInfor getComInfor() {
    return comInfor;
  }

  public void setComInfor(TCompanyInfor comInfor) {
    this.comInfor = comInfor;
  }

  public TSuppliersInfor getSupplier() {
    return supplier;
  }

  public void setSupplier(TSuppliersInfor supplier) {
    this.supplier = supplier;
  }

  public OrderInfoDto getOrderInfor() {
    return orderInfor;
  }

  public void setOrderInfor(OrderInfoDto orderInfor) {
    this.orderInfor = orderInfor;
  }

  public String getLogoPath() {
    return logoPath;
  }

  public void setLogoPath(String logoPath) {
    this.logoPath = logoPath;
  }

  public String getFooterPath() {
    return footerPath;
  }

  public void setFooterPath(String footerPath) {
    this.footerPath = footerPath;
  }

  public String getBasePath() {
    return basePath;
  }

  public void setBasePath(String basePath) {
    this.basePath = basePath;
  }

  public HSSFSheet getDataSheet() {
    return dataSheet;
  }

  public void setDataSheet(HSSFSheet dataSheet) {
    this.dataSheet = dataSheet;
  }

  public HSSFWorkbook getWorkbook() {
    return workbook;
  }

  public void setWorkbook(HSSFWorkbook workbook) {
    this.workbook = workbook;
  }

  public TExchangeRateDAO getExchangeRateDAO() {
    return exchangeRateDAO;
  }

  public void setExchangeRateDAO(TExchangeRateDAO exchangeRateDAO) {
    this.exchangeRateDAO = exchangeRateDAO;
  }

}
