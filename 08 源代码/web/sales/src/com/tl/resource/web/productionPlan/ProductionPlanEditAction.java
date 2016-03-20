package com.tl.resource.web.productionPlan;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.LoginInforUtil;
import com.tl.common.util.PaginationSupport;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.business.dto.ProductionPlanMainInforDto;
import com.tl.resource.business.dto.ReservePlanDetailDto;
import com.tl.resource.business.dto.ReservePlanMainInforDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.productionPlan.ProductionPlanService;
import com.tl.resource.business.reservePlan.ReservePlanService;
import com.tl.resource.dao.pojo.TCompanyInfor;
import com.tl.resource.dao.pojo.TProductionPlanInfor;

public class ProductionPlanEditAction extends DispatchAction {
	private ProductionPlanService productionPlanService;
	
	public ActionForward addProductionPlan(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		String productionPlanJsonStr = request.getParameter("planFormInfoPar");
		System.out.println(productionPlanJsonStr);
		PrintWriter out = response.getWriter();
		String resultStr = null;
		try
		{
			JSONObject planJson = JSONObject.fromObject(productionPlanJsonStr);
			String productCode = planJson.getString("productCode");
			String productNum = planJson.getString("productNum");
			String planType = planJson.getString("planType");
			ProductionPlanMainInforDto dto = new ProductionPlanMainInforDto();
			dto.setCount(productNum);
			dto.setProductCode(productCode);
			dto.setCategory(planType);
			dto.setBacthNo(getBacthNo());
			dto.setStatus("1");//默认编制中
			productionPlanService.addProductionPlan(dto);
			resultStr = "{success : true, msg : '新增生产计划成功'}";
		}
		catch(Exception e)
		{
			e.printStackTrace();
			resultStr = "{success : false, msg : '新增生产计划失败'}";
			
		}
		out.println(resultStr);
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward getProductionPlanList(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		String planCode = request.getParameter("planCode");
		String productCode = request.getParameter("productCode");
		String bacthNo = request.getParameter("bacthNo");
		String planType = request.getParameter("planType");
		String planStatus = request.getParameter("planStatus");
		String startIndex = request.getParameter("start");
		String pageSize = request.getParameter("limit");
		if(startIndex == null){
			startIndex = "0";
		}
		if(pageSize == null){
			pageSize = "10";
		}
		System.out.println("planCode"+planCode);
		System.out.println("productCode"+productCode);
		System.out.println("bacthNo"+bacthNo);
		System.out.println("planType"+planType);
		System.out.println("planStatus"+planStatus);
		System.out.println("startIndex"+startIndex);
		System.out.println("pageSize"+pageSize);
		PrintWriter out = response.getWriter();
		try
		{
			ProductionPlanMainInforDto dto = new ProductionPlanMainInforDto();
			dto.setProductCode(productCode);
			if(!"-1".equals(planType))
			{
				dto.setCategory(planType);
			}
			if(!"-1".equals(planStatus))
			{
				dto.setStatus(planStatus);
			}
			
			dto.setBacthNo(bacthNo);
			
			dto.setPlanCode(planCode);
			List<ProductionPlanMainInforDto> planList = productionPlanService.getProductionPlanList(dto, Integer.valueOf(startIndex),Integer.valueOf(pageSize));
			System.out.println("planList.size()"+planList.size());
			int totalCount = 0;
			if(planList != null && planList.size() > 0)
			{
				totalCount = planList.size();
			}
			
			PaginationSupport page = new PaginationSupport(planList, totalCount, Integer.valueOf(pageSize),Integer.valueOf(startIndex));
			out.println(JSONObject.fromObject(page));
		}
		catch(Exception e)
		{
			e.printStackTrace();
			
		}
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward confirmPlan(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String [] ids = request.getParameterValues("ids");
		System.out.println("ids.length"+ids.length);
		PrintWriter out = response.getWriter();
		try {
			if(ids != null){
				for (int i = 0; i < ids.length; i++) {
					System.out.println(ids[i]);
					productionPlanService.confirmReservePlanById(ids[i]);
				}
			}
			out.print("");
		} catch (RuntimeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//System.out.println("ssss:" + e.getMessage());
			out.println(e.getMessage());
		}
		
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward deletePlan(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		String [] ids = request.getParameterValues("ids");
		System.out.println("ids.length"+ids.length);
		PrintWriter out = response.getWriter();
		try {
			if(ids != null){
				
				for (int i = 0; i < ids.length; i++) {
					System.out.println(ids[i]);
					productionPlanService.deleteProductionPlanById(ids[i]);
				}
			}
			out.print("");
		} catch (RuntimeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//System.out.println("ssss:" + e.getMessage());
			out.println(e.getMessage());
		}
		
		out.flush();
		out.close();
		return null;
	}
	
	public ActionForward updatePlan(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		response.setContentType("text/html;charset=utf-8");
		String resultStr = "{success : true, msg : '修改公司信息成功'}";

		String productionPlanJsonStr = request.getParameter("planFormInfoPar");
		try
		{
			System.out.println("productionPlanJsonStr"+productionPlanJsonStr);
			JSONObject planJson = JSONObject.fromObject(productionPlanJsonStr);
			String planCode = planJson.getString("planCode");
			String productCode = planJson.getString("productCode");
			String productNum = planJson.getString("count");
			String planType = planJson.getString("planType");
			String bacthNo = planJson.getString("bacthNo");
			String status = planJson.getString("planStatus");
			ProductionPlanMainInforDto dto = new ProductionPlanMainInforDto();
			dto.setCount(productNum);
			dto.setProductCode(productCode);
			dto.setCategory(planType);
			dto.setBacthNo(bacthNo);
			dto.setStatus(status);
			dto.setPlanCode(planCode);
			productionPlanService.updateProductionPlan(dto);
			resultStr = "{success : true, msg : '修改生产计划成功'}";
		}
		catch(Exception e)
		{
			e.printStackTrace();
			resultStr = "{success : false, msg : '修改生产计划失败'}";
		}
		PrintWriter out = response.getWriter();
		out.println(resultStr);
		out.flush();
		out.close();
		return null;
	}

	private static String getBacthNo()
	{
		java.text.DateFormat format = new java.text.SimpleDateFormat("yyyyMMddhhmmss");
        return format.format(new Date());
	}
	
	public ProductionPlanService getProductionPlanService() {
		return productionPlanService;
	}

	public void setProductionPlanService(ProductionPlanService productionPlanService) {
		this.productionPlanService = productionPlanService;
	}
	
}
