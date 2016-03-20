package com.tl.resource.business.contract;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface ContractDetailOutExcel {
	public void exportExcel(String conId,HttpServletResponse response, HttpServletRequest request)throws IOException;
}
