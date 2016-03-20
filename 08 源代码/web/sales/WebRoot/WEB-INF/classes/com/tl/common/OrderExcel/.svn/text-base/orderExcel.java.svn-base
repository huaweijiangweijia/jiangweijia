package com.tl.common.OrderExcel;


import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import com.tl.common.util.ExcelUtil;
import com.tl.resource.business.dto.OrderDetialsDto;
import com.tl.resource.business.dto.OrderInfoDto;
import com.tl.resource.dao.TAccessoriesDAO;
import com.tl.resource.dao.pojo.TAccessories;
import com.tl.resource.dao.pojo.TAccessoriesExample;
public class orderExcel {
	private String logoPath;
	private String basePath;
	private TAccessoriesDAO accessoriesDAO;
	private String footerPath;
	@SuppressWarnings("deprecation")
	public void orderExcel(String title,String headerImg,String bottomImg,OrderInfoDto order ,List<OrderDetialsDto> DetailList,OutputStream os,String basePath){
		try{
	String path =  basePath+"upload\\templete\\order_templete.xls";
	path = path.replaceAll("\\/","\\\\");
	   POIFSFileSystem fs=new POIFSFileSystem(new FileInputStream(path));
	   HSSFWorkbook workbook = new HSSFWorkbook(fs);
		// 创建新的Excel 工作簿
		this.basePath = basePath;
		initImgPath(order.getCompanyId());
		HSSFSheet sheet = workbook.getSheet("Sheet1");
//页眉开始
	     //先把读进来的图片放到一个ByteArrayOutputStream中，以便产生ByteArray   
		String logo1 = basePath+headerImg;
		logo1 = logo1.replaceAll("\\/","\\\\");
        ByteArrayOutputStream byteArrayOut = new ByteArrayOutputStream();   
        BufferedImage bufferImg = ImageIO.read(new File(logo1));   
        ImageIO.write(bufferImg,"jpg",byteArrayOut);
	     HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
	     HSSFClientAnchor anchor = new HSSFClientAnchor(500, 20, 1023, 0, (short)0, 0, (short)7,1);       
	     patriarch.createPicture(anchor , workbook.addPicture(byteArrayOut.toByteArray(),HSSFWorkbook.PICTURE_TYPE_JPEG)); 
	     
	   //页眉开始
	     //先把读进来的图片放到一个ByteArrayOutputStream中，以便产生ByteArray   
		String logo2 = basePath+bottomImg;
		logo2 = logo2.replaceAll("\\/","\\\\");
     ByteArrayOutputStream byteArrayOut1 = new ByteArrayOutputStream();   
     BufferedImage bufferImg1 = ImageIO.read(new File(logo2));   
     ImageIO.write(bufferImg1,"jpg",byteArrayOut1);
     HSSFClientAnchor anchor1 = new HSSFClientAnchor(500, 20, 1023, 200, (short)0, 19+DetailList.size(), (short)7,21+DetailList.size());       
     patriarch.createPicture(anchor1 , workbook.addPicture(byteArrayOut1.toByteArray(),HSSFWorkbook.PICTURE_TYPE_JPEG)); 

//页眉结束

//页眉结束
//标题开始
     HSSFRow headRow = sheet.getRow(1);
     HSSFCell headCell = headRow.getCell(0);
     headCell.setCellValue(title);
//标题结束
//订货日期开始
        HSSFRow row1 = sheet.getRow(2);
        HSSFCell supplierNameCellValue = row1.createCell(2);
        supplierNameCellValue.setCellValue(order.getSupplierName());
        HSSFCell orderTimeCellValue = row1.getCell(6);
        orderTimeCellValue.setCellValue(order.getOrderDate());
//订货日期结束
//订单编号开始
        HSSFRow row2 = sheet.getRow(3);
        HSSFCell orderCodeCellValue = row2.getCell(6);
        orderCodeCellValue.setCellValue(order.getOrderCode());
//订单编号结束
//订单性质开始
        HSSFRow row3 = sheet.getRow(4);
        HSSFCell DCPersonCellValue = row3.createCell(2);
        DCPersonCellValue.setCellValue(order.getContactPerson());
        HSSFCell orderTypeCellValue = row3.getCell(6);
        switch(order.getOrderType())
        {
        case 1:orderTypeCellValue.setCellValue("合同订单");
        	break;
        case 2:orderTypeCellValue.setCellValue("储备订单");
    		break;
        case 3:orderTypeCellValue.setCellValue("加工品订单");
    		break;
        case 4:orderTypeCellValue.setCellValue("储备计划订单");
    		break;
        
        }
   
//订单性质结束
//来源单号开始
        HSSFRow row4 = sheet.getRow(5);
        HSSFCell phoneCellValue = row4.createCell(2);
        phoneCellValue.setCellValue(order.getPhone());
        HSSFCell sourceCodeCellValue = row4.getCell(6);
        sourceCodeCellValue.setCellValue(order.getContractCode());
//来源单号结束
//我方联系人开始
        HSSFRow row5 = sheet.getRow(6);
        HSSFCell faxesCellValue = row5.createCell(2);
        faxesCellValue.setCellValue(order.getFax());
        HSSFCell OCPersonCellValue = row5.getCell(6);
        OCPersonCellValue.setCellValue(order.getSupplierOwnContactPerson());
//我方联系人结束
//制单人开始
        HSSFRow row6 = sheet.getRow(7);
        HSSFCell currencyNameCellValue = row6.createCell(2);
        currencyNameCellValue.setCellValue(order.getCurrencyName());
        HSSFCell userNameCellValue = row6.getCell(6);
        userNameCellValue.setCellValue(order.getUserName());
//制单人结束
//拷贝开始
       
        	for(int i=8;i>=0;i--)
        	{
        	  	ExcelUtil.copyRow(sheet.getRow(9+i), sheet.createRow(9+i+DetailList.size()));
        	}
      
//拷贝结束
//订单详细开始
       String[] detailHeader = {"项目","序号","名称","牌号","数量","单价(未税)","金额(未税)","交货日期","备注"};   
       for(int j=0;j<DetailList.size();j++)
       {
    	   OrderDetialsDto detail = DetailList.get(j);
    	   String[] details = {detail.getProjectCode(),String.valueOf(j+1),detail.getProductName(),detail.getBrandCode(),
    			   String.valueOf(detail.getOrderAmount()),String.valueOf(detail.getPrice()),String.valueOf(detail.getProductMoney()),detail.getDeliveryDate(),""};
    	   HSSFRow detailRow = sheet.createRow((9+j));  
           for(int i = 0;i < detailHeader.length;i++)   
           {   
               HSSFCell headerCell = detailRow.createCell(i);  
               headerCell.setCellValue(details[i]);
           }   
       }
       
       
       HSSFCell productMoneyCellValue = sheet.getRow(10+DetailList.size()).createCell(6);
       productMoneyCellValue.setCellValue(String.valueOf(order.getProductMoney()));
       
       HSSFCell rabeCellValue = sheet.getRow(11+DetailList.size()).createCell(6);
       rabeCellValue.setCellValue(String.valueOf(order.getTaxRate()));
       
       HSSFCell rabeMoneyCellValue = sheet.getRow(12+DetailList.size()).createCell(6);
       Double d = Double.valueOf(String.valueOf(order.getTotalMoney())) - Double.valueOf(String.valueOf(order.getProductMoney()));
      rabeMoneyCellValue.setCellValue(String.valueOf(d));
      
      HSSFCell rabePriceCellValue = sheet.getRow(13+DetailList.size()).createCell(6);
      rabePriceCellValue.setCellValue(String.valueOf(order.getTotalMoney()));
       
      HSSFCell urgentLevelCellValue = sheet.getRow(16+DetailList.size()).createCell(2);
      switch(order.getUrgentLevel())
      {
      case 0:  urgentLevelCellValue.setCellValue("不紧急");
      			break;
      case 1:  urgentLevelCellValue.setCellValue("紧急");
      			break;
      }
      
      
    
       
        workbook.write(os);
        os.close();
    	//System.out.println("文件生成...");
		}catch(Exception e) {
			//System.out.println("已运行 xlCreate() : " + e );
			e.printStackTrace();
		}
	}
	
	public void initImgPath(String businessId){
		List<Integer> types = new ArrayList<Integer>();
		types.add(3);
		types.add(4);
		TAccessoriesExample accExp = new TAccessoriesExample();
		accExp.createCriteria().andBusinessIdEqualTo(businessId).andBusinessTypeIn(types);//logo
		List<TAccessories> logoList = accessoriesDAO.selectByExample(accExp);
		if(logoList != null && logoList.size() > 0){
			for (Iterator iterator = logoList.iterator(); iterator.hasNext();) {
				TAccessories accessories = (TAccessories) iterator.next();
				if(accessories.getBusinessType() == 3){
					logoPath = accessories.getPath();
					if(logoPath != null){
						logoPath = basePath + logoPath.replaceAll("\\/", "\\\\");
					}
				}else if(accessories.getBusinessType() == 4){
					footerPath = accessories.getPath();
					if(footerPath != null){
						footerPath = basePath + footerPath.replaceAll("\\/", "\\\\");
					}
				}
			}
		}
	}



	public TAccessoriesDAO getAccessoriesDAO() {
		return accessoriesDAO;
	}

	public void setAccessoriesDAO(TAccessoriesDAO accessoriesDAO) {
		this.accessoriesDAO = accessoriesDAO;
	}
	
}
