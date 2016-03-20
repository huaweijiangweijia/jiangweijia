package com.tl.resource.web.product;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.LoginInforUtil;
import com.tl.resource.business.ProduceTaskService;
import com.tl.resource.business.dto.LoginInforDto;
import com.tl.resource.dao.pojo.ProduceTask;

public class ProduceTaskAction extends DispatchAction {

	private ProduceTaskService produceTaskService;

	public ActionForward doProduceTask(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String resultStr = "{success : true, msg : '领工成功'}";

		JSONObject data = JSONObject.fromObject(request.getParameter("data"));

		try {
			LoginInforDto dto = (LoginInforDto) request.getSession()
					.getAttribute(LoginInforUtil.USER_SESSION_FLAG);
			ProduceTask task = new ProduceTask();
			task.setDoUserName(dto.getUser().getUserName());
			task.setDoUserId(dto.getUser().getId());
			task.setWorkOrderId(data.optInt("id"));
			task.setProductId(data.optString("productId"));
			SimpleDateFormat format = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			task.setUpdateTime(format.format(new Date()));
			JSONArray procedureIdArr = data.optJSONArray("procedureId");
			for (int i = 0; i < procedureIdArr.size(); i++) {
				task.setProcedureId(procedureIdArr.optInt(i));
				produceTaskService.doProduceTask(task);
			}
		} catch (Exception e) {
			resultStr = "{success : false, msg : '" + e.getMessage()
					+ ", 领工失败'}";
		}

		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}

	public ActionForward dailyWork(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String resultStr = "{success : true, msg : '报工成功'}";

		JSONObject data = JSONObject.fromObject(request.getParameter("data"));

		try {
			LoginInforDto dto = (LoginInforDto) request.getSession()
					.getAttribute(LoginInforUtil.USER_SESSION_FLAG);
			ProduceTask task = new ProduceTask();
			task.setDoUserName(dto.getUser().getUserName());
			task.setDoUserId(dto.getUser().getId());
			task.setWorkOrderId(data.optInt("id"));
			task.setProductId(data.optString("productId"));
			task.setWorkTime(data.optInt("workTime"));
			SimpleDateFormat format = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			task.setUpdateTime(format.format(new Date()));
			JSONArray procedureIdArr = data.optJSONArray("procedureId");
			for (int i = 0; i < procedureIdArr.size(); i++) {
				task.setProcedureId(procedureIdArr.optInt(i));

				produceTaskService.dailyWork(task);
			}
		} catch (Exception e) {
			resultStr = "{success : false, msg : '" + e.getMessage()
					+ ", 报工失败'}";
		}

		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();

		return null;
	}

	public ProduceTaskService getProduceTaskService() {
		return produceTaskService;
	}

	public void setProduceTaskService(ProduceTaskService produceTaskService) {
		this.produceTaskService = produceTaskService;
	}

}
