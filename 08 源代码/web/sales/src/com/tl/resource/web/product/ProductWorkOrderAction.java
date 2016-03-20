package com.tl.resource.web.product;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.resource.business.product.ProductWorkOrderService;
import com.tl.resource.dao.pojo.TProductBrand;
import com.tl.resource.dao.pojo.TProductWorkOrder;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class ProductWorkOrderAction extends DispatchAction {
	private ProductWorkOrderService productWorkOrderService;

	public ProductWorkOrderService getProductWorkOrderService() {
		return productWorkOrderService;
	}

	public void setProductWorkOrderService(ProductWorkOrderService productWorkOrderService) {
		this.productWorkOrderService = productWorkOrderService;
	}

	public ActionForward get(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String start = request.getParameter("start");
		start = (start == null ? "0" : start);
		String limit = request.getParameter("limit");
		limit = (limit == null ? "20" : limit);

		Map<String, Object> parmMap = new HashMap<String, Object>();

		parmMap.put("start", Integer.parseInt(start));
		parmMap.put("limit", Integer.parseInt(limit));

		int total = productWorkOrderService.getProductWorkOrderCount(parmMap);

		List<TProductWorkOrder> list = productWorkOrderService.getProductWorkOrderList(parmMap);

		String jsonStr = JSONArray.fromObject(list).toString();
		String resultStr = "{totalProperty : " + total + ", productSortList : " + jsonStr + "}";

		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}

	// ɾ������
	public ActionForward delProductWorkOrder (ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		String id = request.getParameter("brand");
		String resultStr = "{success : true, msg : 'ɾ�������ɹ���'}";

		try {
			productWorkOrderService.deleteProductWorkOrder(id);
		} catch (Exception e) {
			e.printStackTrace();
			resultStr = "{success : true, msg : 'ɾ������ʧ�ܣ�'}";
		}

		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}

	// �޸Ĺ���
	public ActionForward modProductWorkOrder(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		String brandStr = request.getParameter("brand");
		String resultStr = "{success : true, msg : '�޸Ĺ����ɹ���'}";

		try {
			JSONObject jsonObject = JSONObject.fromObject(brandStr);

			TProductWorkOrder productWorkOrder = (TProductWorkOrder) JSONObject.toBean(jsonObject,
					TProductWorkOrder.class);
			productWorkOrderService.updateProductWorkOrder(productWorkOrder);
		} catch (Exception e) {
			// e.printStackTrace();
			resultStr = "{success : false, msg : '" + e.getMessage() + ", �޸Ĺ���ʧ�ܣ�'}";
		}

		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}

	// ��ӹ���
	public ActionForward addProductWorkOrder(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		String brandStr = request.getParameter("brand");
		String resultStr = "{success : true, msg : '��ӹ����ɹ���'}";

		try {
			JSONObject jsonObject = JSONObject.fromObject(brandStr);

			TProductWorkOrder productWorkOrder = (TProductWorkOrder) JSONObject.toBean(jsonObject,
					TProductWorkOrder.class);

			productWorkOrderService.saveProductWorkOrder(productWorkOrder);
		} catch (Exception e) {
			// e.printStackTrace();
			resultStr = "{success : false, msg : '" + e.getMessage() + ", ��ӹ���ʧ�ܣ�'}";
		}

		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}

}
