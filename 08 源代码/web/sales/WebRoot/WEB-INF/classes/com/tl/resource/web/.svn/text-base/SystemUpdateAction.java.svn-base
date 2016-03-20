package com.tl.resource.web;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.tl.common.util.sys.SysUpdateUtil;

public class SystemUpdateAction extends DispatchAction {
	public ActionForward updateSys(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=utf-8");
		String agent = request.getHeader("USER-AGENT");
		SysUpdateUtil suu = new SysUpdateUtil();
		String error = suu.importSysFile(request, response);
		String resultStr = "{success : true, msg : '数据上传成功！'}";
		if(error != null) {
		    resultStr = "{success : false, msg : '" + error + "'}";
		}
		PrintWriter out = response.getWriter();
		out.write(resultStr);
		out.flush();
		out.close();
		return null;
	}
}
