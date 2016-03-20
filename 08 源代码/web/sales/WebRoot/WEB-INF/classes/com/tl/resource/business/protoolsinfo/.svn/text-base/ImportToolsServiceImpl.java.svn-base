package com.tl.resource.business.protoolsinfo;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;

import com.tl.common.smartupload.Constant;
import com.tl.common.smartupload.File;
import com.tl.common.smartupload.SmartUpload;
import com.tl.common.util.GenerateSerial;
import com.tl.common.util.StringHelper;
import com.tl.resource.business.arrival.ArrivalService;
import com.tl.resource.business.dto.ImportSalesPriceDto;
import com.tl.resource.business.dto.QuotationDto;
import com.tl.resource.business.dto.TreeDto;
import com.tl.resource.dao.pojo.TAccountsInfor;
import com.tl.resource.dao.pojo.TProductBrand;
import com.tl.resource.dao.pojo.TProductSort;
import com.tl.resource.dao.pojo.TProductSource;
import com.tl.resource.dao.pojo.TProductToolsInfor;
import com.tl.resource.dao.pojo.TReserveInfor;

public class ImportToolsServiceImpl implements ImportToolsService {

	private ProToolsInforService proToolsInforService;
	private ArrivalService arrivalService;
	private String realPath;
	private java.io.File TempFile = null;
	private List<TreeDto> list = null;
	
	private boolean validatorData(java.io.File file) throws IOException {
		boolean flag = true;
		HSSFWorkbook wb = null;
		try{   
            FileInputStream is = new FileInputStream(file);   
            wb=new HSSFWorkbook(is);   
               
            int sheetNum=wb.getNumberOfSheets();   
            
            //数据错误时，单元格样式
    		CellStyle normalStyle = wb.createCellStyle();
    		Font valueFont = wb.createFont();
    		normalStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
    		// 垂直居中
    		normalStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
    		normalStyle.setWrapText(true);
    		//valueFont.setFontHeightInPoints((short) 12);
    		valueFont.setColor(Font.COLOR_RED);
    		normalStyle.setFont(valueFont);
    		list = new ArrayList<TreeDto>();
            for(int i=0;i<sheetNum;i++)   
            {   
                HSSFSheet childSheet = wb.getSheetAt(i);   
                int rowNum = childSheet.getPhysicalNumberOfRows();   
                   
                for(int j=2;j<rowNum;j++)   
                {   
                	StringBuffer error = new StringBuffer();
                	//Double amount = 0d;
                    HSSFRow row = childSheet.getRow(j); 
                    if(row == null)
                    	continue;
                    int cellNum=row.getPhysicalNumberOfCells();  
                    HSSFCell temp = row.getCell(0);
                    int cellType = temp.getCellType();
                    String s = "";
                    if(HSSFCell.CELL_TYPE_NUMERIC == cellType) {
                    	BigDecimal b = null;
                    	if(this.isInt(temp.toString())) {
                    		b = new BigDecimal(temp.getNumericCellValue());
                    	} else {
                    		b = BigDecimal.valueOf(temp.getNumericCellValue());
                    	}
                    	s = b.toString();
                    } else {
                    	s = temp.toString();
                    }
                    String brandCode = (temp == null ? "" : s);//牌号
                    if("".equals(brandCode))
                    	continue;
                    
                    temp = row.getCell(1);
                    cellType = temp.getCellType();
                    String str = "";
                    if(HSSFCell.CELL_TYPE_NUMERIC == cellType) {
                    	BigDecimal b = null;
                    	if(this.isInt(temp.toString())) {
                    		b = new BigDecimal(temp.getNumericCellValue());
                    	} else {
                    		b = BigDecimal.valueOf(temp.getNumericCellValue());
                    	}
                    	str = b.toString();
                    } else {
                    	str = temp.toString();
                    }
                    String productName = (temp == null ? "" : str);//名称
                    //String brandCode = row.getCell(0) == null ? "" : row.getCell(0).toString();//牌号
                    
                    //String productName = row.getCell(1) == null ? "" :  row.getCell(1).toString();//名称
                    /*try {
                    	amount = Double.valueOf(row.getCell(2) == null ? "" : row.getCell(2).toString());//数量
                    } catch(NumberFormatException e) {
                    	error.append("数量格式有误 ");
                    	row.getCell(2).setCellStyle(normalStyle);
                    	flag = false;
                    }*/
                    String unit = row.getCell(2) == null ? "" : row.getCell(2).toString();
                    String productBrand = row.getCell(3) == null ? "" : row.getCell(3).toString();//品牌
                    //String productSource = row.getCell(6) == null ? "" : row.getCell(6).toString();//来源
                    String memo = row.getCell(4) == null ? "" : row.getCell(4).toString();//备注
                    String productSortCode = row.getCell(5) == null ? "" : row.getCell(5).toString();//组别
                    TreeDto treeDto = new TreeDto();
                    treeDto.setBrandCode(brandCode);
                    treeDto.setProductName(productName);
                    treeDto.setProductBrand(productBrand);
                    //treeDto.setProductSource(productSource);
                    treeDto.setProductSortCode(productSortCode);
                    treeDto.setProductUnit(unit);
                    treeDto.setMemo(memo);
                    
                    /*List<TreeDto> dto = proToolsInforService.getTreeDto(treeDto);
                    List<TProductSort> sortList = proToolsInforService.getProSort4Import(treeDto);
                    List<TProductBrand> brandList = proToolsInforService.getBrand4import(treeDto);*/
                    //List<TProductSource> sourceList = proToolsInforService.getProSourceByName(productSource);
                    
                    
                    int errCount = 0;
                    
                    if("".equals(brandCode)) {
                    	errCount++;
                    	flag = false;
                    	error.append("牌号不能为空 ");
                    }
                    
                    if("".equals(productName)) {
                    	errCount++;
                    	flag = false;
                    	error.append("名称不能为空 ");
                    }
                    
                    if("".equals(unit)) {
                    	errCount++;
                    	flag = false;
                    	error.append("计量单位不能为空 ");
                    }
                    
                    if("".equals(productBrand)) {
                    	errCount++;
                    	flag = false;
                    	error.append("品牌不能为空 ");
                    }
                    
                    if("".equals(productSortCode)) {
                    	errCount++;
                    	flag = false;
                    	error.append("组别不能为空 ");
                    }
                    
                    /*if("".equals(productSource)) {
                    	errCount++;
                    	flag = false;
                    	error.append("来源不能为空 ");
                    }*/
                    
                    if(errCount == 5) {
                    	continue;
                    }
                    
                    HSSFCell cell = row.getCell(9);
                    if(cell != null) {
                    	cell.setCellValue(error.toString());
                    	
                    } else {
                    	row.createCell(9).setCellValue(error.toString());
                    	
                    }
                    
                    if(error.length() == 0) {
                    	list.add(treeDto);
                    }
                }   
                   
            }   
        }catch(Exception e)   
        {   
            e.printStackTrace();   
        }
        if(!flag) {
        	String filePath = new StringBuffer(this.getRealPath()).append(file.getName()).toString();
        	FileOutputStream fileOutd = new FileOutputStream(filePath);
    		wb.write(fileOutd);
    		fileOutd.close();
        }
		return flag;
	}
	
	private List<String> insertDataToDB(java.io.File file) {
		boolean flag = true;
		List<String> errorList = new ArrayList<String>();
		try{   
			
			flag = this.validatorData(file);
			if(flag) {
				String fileName = this.createToolsTempFile(list);
				//清空临时表
				proToolsInforService.deleteTempData();
				proToolsInforService.loadToolsDataFile(fileName);
				String id = proToolsInforService.getId("");
				//品牌不存在的数据
				Map<String, Object> parmMap = new HashMap<String, Object>();
				parmMap.put("type", 1);//1 产品导入 0 普通导入 
				List<TreeDto> brandList = proToolsInforService.checkBrandIsExist(parmMap);
				//组别不存在的数据
				List<TreeDto> sortList = proToolsInforService.checkSortIsExist();
				//已经存在的数据
				List<TreeDto> toolsList = proToolsInforService.checkToolsIsExist(parmMap);
				//文件中重复数据
				List<TreeDto> repeatList = proToolsInforService.getRepeatData();
					proToolsInforService.insertTools();
				
				
				HSSFWorkbook wb = new HSSFWorkbook();
				HSSFSheet sheet = wb.createSheet("sheet1");
				
				insertTitle4Import(wb, sheet);
				int startRow = 1;//开始行数
				boolean isReturnFile = false;
				for(int i = 0; i < brandList.size(); i++) {
					isReturnFile = true;
					HSSFRow targetRow = null;  
		        	targetRow = sheet.createRow(i+startRow);  
		        	TreeDto dto = brandList.get(i);
		        	createTableRow4Import(dto, targetRow, "品牌不存在");
				}
				
				for(int i = 0; i < sortList.size(); i++) {
					isReturnFile = true;
					HSSFRow targetRow = null;  
		        	targetRow = sheet.createRow(brandList.size() + i+startRow);  
		        	TreeDto dto = sortList.get(i);
		        	createTableRow4Import(dto, targetRow, "组别不存在");
				}
				
				for(int i = 0; i < repeatList.size(); i++) {
					isReturnFile = true;
					HSSFRow targetRow = null;  
		        	targetRow = sheet.createRow(brandList.size()+sortList.size()+i+startRow);  
		        	TreeDto dto = repeatList.get(i);
		        	createTableRow4Import(dto, targetRow, "文件中产品重复");
				}
				
				for(int i = 0; i < toolsList.size(); i++) {
					isReturnFile = true;
					HSSFRow targetRow = null;  
		        	targetRow = sheet.createRow(brandList.size()+sortList.size()+repeatList.size()+i+startRow);  
		        	TreeDto dto = toolsList.get(i);
		        	createTableRow4Import(dto, targetRow, "产品已存在");
				}
				
				String filePath = new StringBuffer(this.getRealPath()).append(file.getName()).toString();
	        	FileOutputStream fileOutd = new FileOutputStream(filePath);
	    		wb.write(fileOutd);
	    		fileOutd.close();
	    		if(isReturnFile) {
	    			errorList.add(Constant.TEMP_DIR + "/" + file.getName());
	    		}
	    		else
	    			errorList.add(new Integer(list.size()).toString());
			} else {
            	errorList.add(Constant.TEMP_DIR + "/" + file.getName());
            }
        }catch(Exception e){
            e.printStackTrace();   
        } finally {
        	//proToolsInforService.deleteTempData();
        }
        return errorList;
	}
	
	/**
	 * 生成导入数据的本地文件
	 * 
	 * @param insertSalePriHis
	 * @return
	 */
	private String createToolsTempFile(List<TreeDto> list) {

		//得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(7);
        //设置最小整数位数   
        nf.setMinimumIntegerDigits(7);
        
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		// System.out.println(time.format(nowTime));
		String filepath = "c:/toolsTemp.txt";
		boolean flag = false;//控制文本是否追加
		/* 查找文件，如果不存在，就创建 */
		java.io.File file = new java.io.File(filepath);
		/**
		 * 删除原有文件，创建新文件
		 */
		try {
			if (!file.exists()) {
				file.createNewFile();
			} else {
				file.delete();
				file.createNewFile();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		int i = 0;
		StringBuffer sb = new StringBuffer();
		String id = proToolsInforService.getId("");
		for (TreeDto obj : list) {
			String memo = "";
			if(!"".equals(obj.getMemo())) {
				memo = obj.getMemo();
			}
			sb.append("\"");
			sb.append(id + "\",\"");//id
			sb.append(obj.getProductSortId() + "\",\"");//组别ID
			sb.append("root\",\"");//父节点
			sb.append("1\",\"");//是否叶子节点
			sb.append(obj.getBrandCode() + "\",\"");//牌号
			sb.append(obj.getProductCode() + "\",\"");//货品编号
			sb.append(obj.getProductName() + "\",\"");//名称
			sb.append(obj.getProductUnit() + "\",\"");//单位
			sb.append(obj.getProductSortCode() + "\",\"");//组别
			sb.append(obj.getProductBrand() + "\",\"");//品牌
			sb.append(obj.getProductSource() + "\",\"");
			sb.append(obj.getSlaveFile() + "\",\"");
			sb.append(obj.getCurrencyName() + "\",\"");
			sb.append(memo + "\",\"").append(obj.getStockPrice()).append("\",\"").
			append(obj.getSalePrice()).append("\",\"").append(time.format(new Date())).append("\",\"")
			.append(obj.getSalePriceDate()).append("\",\"").append(obj.getAmount()).append("\",\"")
			.append("\",\"").append(StringHelper.replaceBlank(obj.getBrandCode())).append("\"");
			sb.append("\n");
			i++;
			Long idNum = new Long(id)+1;
			
			id = nf.format(idNum).toString();
			
			if (i == 500) {
				flag = true;
				this.method2(filepath, sb.toString(),flag);
				i = 0;
				sb = new StringBuffer();
			}
		}
		
		this.method2(filepath, sb.toString(),flag);

		return filepath.replace("/", "\\");
	}
	
	/**
	 * 追加文件：使用FileWriter
	 * 
	 * @param fileName
	 * @param content
	 */
	private void method2(String fileName, String content,boolean flag) {
		try {
			// 打开一个写文件器，构造函数中的第二个参数true表示以追加形式写文件
			 OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(fileName,flag),"UTF-8"); 
			 out.write(content);
			 out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private String importTools(SmartUpload su) throws Exception {
		File suFile = null;
		List<String> list = null;
	    int fileCount = 0;
	    try {
	        String fileExt = "";
	        int fileSize = 0;
	        String AllowedExtensions = Constant.ALLOWEDEXTENSIONS;//允许上传的文件类型
	        double maxFileSize = Constant.MAXFILESIZE;//单文件最大大小，单位KB
	        //校验文件类型和大小
	        for (int i=0; i<su.getFiles().getCount();i++) {
	            suFile = su.getFiles().getFile(i);
	            if (suFile.isMissing())
	                continue;
	            //校验文件大小
	            fileSize = suFile.getSize()/1024;//字节转换成KB
	            if(fileSize==0) fileSize=1;
	            if(maxFileSize<fileSize) throw new Exception("单个上传文件的容量不能超过["+maxFileSize+"KB]");
	
	            //校验文件类型
	            if (suFile.getFileExt() == null
	                    || "".equals(suFile.getFileExt())) {
	                fileExt = ",,";
	            } else {
	                fileExt = "," + suFile.getFileExt().toLowerCase() + ",";
	            }
	            if (!"".equals(AllowedExtensions)
	                    && AllowedExtensions.indexOf(fileExt) == -1) {
	                throw new Exception("您上传的文件[" + suFile.getFileName()
	                        + "]的类型为系统禁止上传的文件类型，不能上传！");
	            }
	            fileCount++;
	        }
	        if (fileCount==0) throw new Exception("请选择上传的文件");
	        
	        for (int i=0; i<su.getFiles().getCount();i++) {
	        	suFile = su.getFiles().getFile(i);
	        	String fileName = suFile.getFileName();
	        	fileName = fileName.substring(0, fileName.lastIndexOf('.'));
	        	java.io.File file = suFile.saveTempFile("tools", new StringBuffer(".").append(suFile.getFileExt()).toString(), this.getTempFile());
	        	list = this.insertDataToDB(file);
	        	if(list != null && list.size() == 0)
	        		file.delete();
	            
	        }
	        if(list != null && list.size() > 0) {
	        	if(isNumeric(list.get(0)))
	        		return list.get(0);
	        	else 
	        		return JSONArray.fromObject(list).toString();
	        } else {
		        //成功返回null
		        return null;
	        }
	    } finally {
	    	su = null;
	    }
	}
	private boolean isNumeric(String str) {
		for (int i = str.length(); --i >= 0;) {
			if (!Character.isDigit(str.charAt(i))) {
				return false;
			}
		}
		return true;
	} 
	@Override
	public String importTools(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String folderName = request.getSession().getServletContext().getRealPath(Constant.TEMP_DIR);
		java.io.File file = new java.io.File(folderName);
		if(!file.exists()) {
			file.mkdir();
		}
		String realPath = folderName + java.io.File.separator;
		this.setTempFile(file);
		this.setRealPath(realPath);
		SmartUpload su = null;
		HttpSession session = request.getSession();
		ServletContext application = session.getServletContext();
		
		su = new SmartUpload();
		su.initialize(application, session, request, response, null);
		su.upload();
		
		return this.importTools(su);
	}

	public ProToolsInforService getProToolsInforService() {
		return proToolsInforService;
	}

	public void setProToolsInforService(ProToolsInforService proToolsInforService) {
		this.proToolsInforService = proToolsInforService;
	}

	public ArrivalService getArrivalService() {
		return arrivalService;
	}

	public void setArrivalService(ArrivalService arrivalService) {
		this.arrivalService = arrivalService;
	}

	public String getRealPath() {
		return realPath;
	}

	public void setRealPath(String realPath) {
		this.realPath = realPath;
	}

	public java.io.File getTempFile() {
		return TempFile;
	}

	public void setTempFile(java.io.File tempFile) {
		TempFile = tempFile;
	}

	@Override
	public void exportTools(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("application/vnd.ms-excel;charset=UTF-8");
		List<TreeDto> list = proToolsInforService.getTools4Export(request, response);
		response.setHeader("Content-Disposition",
				"attachment; filename=tools-" + list.size() + ".xls");
		OutputStream os = response.getOutputStream();
		
		String realPath = request.getSession().getServletContext().getRealPath("");
		this.setRealPath(realPath);
		
		
		HSSFWorkbook wb = this.createWorkBook(Constant.TOOLS_LIST_FILE);
		
		int pageSize = 60000;//一个Excel sheet 显示的工具条数
		int count = list.size()/pageSize +1;
		int startIndex = 0;
		for(int i = 0; i < count; i++) {
			int toIndex = (i+1)*pageSize;
			if(i == count-1) {
				toIndex = list.size();
			}
			
			List<TreeDto> list2 = list.subList(startIndex, toIndex);
			HSSFSheet childSheet = null;
			if(i < wb.getNumberOfSheets())
				childSheet = wb.getSheetAt(i);
			else {
				childSheet = wb.createSheet("sheet"+(i+1));
				insertTitle(wb, childSheet);
			}
			this.insertRow(list2, wb, childSheet, 0);
			startIndex += pageSize;
		}
		
		wb.write(os);
        os.flush();
        os.close();
	}
	
	private HSSFWorkbook createWorkBook(String fileName) {
		HSSFWorkbook wb = null;
		FileInputStream is;
		try {
			java.io.File file = new java.io.File(this.getRealPath() + fileName);
			is = new FileInputStream(file);
			wb=new HSSFWorkbook(is);
		}  catch (IOException e) {
			e.printStackTrace();
		}
		return wb;
	}

	public void insertRow(List<TreeDto> list, HSSFWorkbook wb, HSSFSheet sheet, int startRow) {  
    	int rows = list.size();
        HSSFFont font = wb.createFont();
  	  	font.setFontHeightInPoints((short)10);
        for (int i = 0; i < rows; i++) {   
        	HSSFRow targetRow = null;  
        	targetRow = sheet.createRow(++startRow);  
        	TreeDto dto = list.get(i);
        	this.createTableRow(dto, targetRow);
        } 
        
    }
	
	private void insertTitle(HSSFWorkbook wb, HSSFSheet sheet) {
	  	HSSFRow row = sheet.createRow(0);
	  	setCellValue(row, 0, "牌号");
        setCellValue(row, 1, "历史牌号");
        setCellValue(row, 2, "货品编号");
        setCellValue(row, 3, "名称");
        setCellValue(row, 4, "计量单位");
        setCellValue(row, 5, "组别");
        setCellValue(row, 6, "品牌");
       // setCellValue(row, 7, "来源");
        setCellValue(row, 7, "创建日期");
        setCellValue(row, 8, "备注");
	}
	
	private void insertTitle4Import(HSSFWorkbook wb, HSSFSheet sheet) {
		CellStyle normalStyle = wb.createCellStyle();
		sheet.setColumnWidth(2, 3000);
		sheet.setColumnWidth(3, 3000);
		Font valueFont = wb.createFont();
		valueFont.setFontHeightInPoints((short) 11);
		normalStyle.setVerticalAlignment(HSSFCellStyle.ALIGN_LEFT);
		normalStyle.setWrapText(true);
		normalStyle.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		normalStyle.setFont(valueFont);
		
	  	HSSFRow row = sheet.createRow(0);
	  	setCellValue(row, 0, "牌号", normalStyle);
        setCellValue(row, 1, "名称", normalStyle);
        setCellValue(row, 2, "计量单位", normalStyle);
        setCellValue(row, 3, "品牌", normalStyle);
        setCellValue(row, 4, "备注", normalStyle);
        setCellValue(row, 5, "组别编号", normalStyle);
	}
	
	/**  
     * 创建行  
     * @param cells  
     * @param rowIndex  
     */  
    private void createTableRow(TreeDto treeDto,HSSFRow row)   
    {   
        setCellValue(row, 0, treeDto.getBrandCode());
        setCellValue(row, 1, treeDto.getBrandCodeHistory());
        setCellValue(row, 2, treeDto.getProductCode());
        setCellValue(row, 3, treeDto.getProductName());
        setCellValue(row, 4, treeDto.getProductUnit());
        setCellValue(row, 5, treeDto.getProductSortCode());
        setCellValue(row, 6, treeDto.getProductBrand());
        //setCellValue(row, 7, treeDto.getProductSource());
        setCellValue(row, 7, treeDto.getCreateDateStr());
        setCellValue(row, 8, treeDto.getMemo());
    }
    
    /**  
     * 创建行  
     * @param cells  
     * @param rowIndex  
     */  
    private void createTableRow4Import(TreeDto treeDto,HSSFRow row, String errorStr)   
    {   
        setCellValue(row, 0, treeDto.getBrandCode());
        setCellValue(row, 1, treeDto.getProductName());
        setCellValue(row, 2, treeDto.getProductUnit());
        setCellValue(row, 3, treeDto.getProductBrand());
        setCellValue(row, 4, treeDto.getMemo());
        setCellValue(row, 5, treeDto.getProductSortCode());
        setCellValue(row, 7, errorStr);
    }
    
    private HSSFCell setCellValue(HSSFRow row, int cellIndex, String Value) {
    	HSSFCell cell1 = row.createCell(cellIndex);
        cell1.setCellValue(Value);
        return cell1;
    }
    
    private HSSFCell setCellValue(HSSFRow row, int cellIndex, int Value) {
    	HSSFCell cell1 = row.createCell(cellIndex);
        cell1.setCellValue(Value);
        return cell1;
    }
    
    private HSSFCell setCellValue(HSSFRow row, int cellIndex, Double Value) {
    	HSSFCell cell1 = row.createCell(cellIndex);
        cell1.setCellValue(Value);
        return cell1;
    }
    
    private HSSFCell setCellValue(HSSFRow row, int cellIndex, String Value, CellStyle normalStyle) {
    	HSSFCell cell1 = row.createCell(cellIndex);
        cell1.setCellValue(Value);
        cell1.setCellStyle(normalStyle);
        return cell1;
    }
    
    private boolean isInt(String str) {
	    Pattern pattern = Pattern.compile(".0+$");
	    Matcher matcher = pattern.matcher(str);

	    if(matcher.find()) {
	    	return true;
	    } else {
	    	return   false;
	    }
    }
}
