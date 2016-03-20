package com.tl.resource.web.baseInfo;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.resource.business.WorkProcedureService;
import com.tl.resource.dao.pojo.WorkProcedure;

public class WorkProcedureAction extends DispatchAction {

	private WorkProcedureService workProcedureService;

	public ActionForward add(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String resultStr = "{success : true, msg : '添加工序信息成功'}";

		JSONObject data = JSONObject.fromObject(request.getParameter("data"));

		try {
			String productId = data.optString("productId");
			String procedureIdx = data.optString("procedureIdx");
			String procedureName = data.optString("procedureName");
			String procedureDesc = data.optString("procedureDesc");
			WorkProcedure wp = new WorkProcedure();
			wp.setProcedureDesc(procedureDesc);
			wp.setProcedureIdx(procedureIdx);
			wp.setProcedureName(procedureName);
			wp.setProductId(productId);
			workProcedureService.saveWorkProcedure(wp);
		} catch (Exception e) {
			resultStr = "{success : false, msg : '" + e.getMessage()
					+ ", 添加工序信息失败'}";
		}

		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}

	public ActionForward get(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		JSONObject resObj = new JSONObject();
		String productId = request.getParameter("productId");

		try {
			List<WorkProcedure> workProcedureList = workProcedureService
					.getWorkProcedureList(productId);
			resObj.put("results", workProcedureList);
			resObj.put("total", workProcedureList.size());
			resObj.put("success", true);
		} catch (Exception e) {
			resObj.put("success", false);
		}

		PrintWriter out = response.getWriter();
		out.write(resObj.toString());
		out.flush();
		out.close();

		return null;
	}

	public ActionForward update(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		JSONObject resObj = new JSONObject();
		JSONArray dataArr = JSONArray.fromObject(request.getParameter("data"));

		try {
			for (int i = 0; i < dataArr.size(); i++) {
				WorkProcedure wp = (WorkProcedure) JSONObject.toBean(
						dataArr.optJSONObject(i), WorkProcedure.class);
				workProcedureService.updateWorkProcedure(wp);
			}
			resObj.put("success", true);
			resObj.put("msg", "保存工序成功");
		} catch (Exception e) {
			resObj.put("success", false);
			resObj.put("msg", "保存工序失败");
		}

		PrintWriter out = response.getWriter();
		out.write(resObj.toString());
		out.flush();
		out.close();

		return null;
	}

	public ActionForward delete(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		JSONObject resObj = new JSONObject();
		JSONArray dataArr = JSONArray.fromObject(request.getParameter("data"));

		try {
			for (int i = 0; i < dataArr.size(); i++) {
				workProcedureService.deleteWorkProcedure(Integer
						.parseInt(dataArr.optString(i)));
			}
			resObj.put("success", true);
			resObj.put("msg", "删除工序成功");
		} catch (Exception e) {
			resObj.put("success", false);
			resObj.put("msg", "删除工序失败");
		}

		PrintWriter out = response.getWriter();
		out.write(resObj.toString());
		out.flush();
		out.close();

		return null;
	}

	public WorkProcedureService getWorkProcedureService() {
		return workProcedureService;
	}

	public void setWorkProcedureService(
			WorkProcedureService workProcedureService) {
		this.workProcedureService = workProcedureService;
	}

}
