package com.tl.resource.web.outStock;

import java.io.PrintWriter;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.LoginInforUtil;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.business.dto.OutStockInforDto;
import com.tl.resource.business.dto.UserDto;
import com.tl.resource.business.outStock.MaterialOutStockService;

public class MaterialOutStockViewAction extends DispatchAction {
	private MaterialOutStockService materialOutStockService;
	public ActionForward consultOrderProducts(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		  ServletInputStream in = request.getInputStream ();
		
		  String Sperator = null;
		  byte[] bt = new byte[4096];
		 int t = -1;
		  t = in.readLine (bt, 0, bt.length);
		  if (t != -1) {
		   Sperator = new String (bt, 0, t);
		   //System.out.println(Sperator);
		   t = -1;
		  } 
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String orderId = request.getParameter("orderId");
		LoginInforDto loginInfor = LoginInforUtil.getLoginInfor(request);
		UserDto user = loginInfor.getUser();
		OutStockInforDto osInfor = materialOutStockService.consultOrderProducts(orderId);
		osInfor.setUserName(user.getUserName());
		String rt = JSONObject.fromObject(osInfor).toString();
		//System.out.println(rt);
		out.println(rt);
		out.flush();
		out.close();
		return null;
	}
	public ActionForward outStockViewById(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String id = request.getParameter("id");
		
		OutStockInforDto osInfor = materialOutStockService.getOutStockInforById(id);
		String rt = JSONObject.fromObject(osInfor).toString();
		//System.out.println(rt);
		out.println(rt);
		out.flush();
		out.close();
		return null;
	}
	public MaterialOutStockService getMaterialOutStockService() {
		return materialOutStockService;
	}
	public void setMaterialOutStockService(
			MaterialOutStockService materialOutStockService) {
		this.materialOutStockService = materialOutStockService;
	}
	
	
}
