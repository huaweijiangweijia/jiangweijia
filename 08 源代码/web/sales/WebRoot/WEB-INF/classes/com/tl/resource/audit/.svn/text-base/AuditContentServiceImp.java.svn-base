package com.tl.resource.audit;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;

import com.tl.resource.audit.dto.TAuditContentDefDto;
import com.tl.resource.dao.TAuditContentDefDAO;
import com.tl.resource.dao.TAuditContentFlowDetailGxDAO;
import com.tl.resource.dao.pojo.TAuditContentDef;
import com.tl.resource.dao.pojo.TAuditContentDefExample;
import com.tl.resource.dao.pojo.TAuditContentFlowDetailGx;
import com.tl.resource.dao.pojo.TAuditContentFlowDetailGxExample;

public class AuditContentServiceImp implements IAuditContentService {
	private TAuditContentDefDAO auditContentDefDAO;
	private TAuditContentFlowDetailGxDAO auditContentFlowDetailGxDAO;
	@Override
	public List<TAuditContentDefDto> findAuditDetailAuditContentList(String auditDetailId) {
		List<TAuditContentDef> list = auditContentDefDAO.selectByAuditDetailId(auditDetailId);
		List<TAuditContentDefDto> acList = new ArrayList<TAuditContentDefDto>();
		try {
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				TAuditContentDef auditContentDef = (TAuditContentDef) iterator.next();
				TAuditContentDefDto dto = new TAuditContentDefDto();
				BeanUtils.copyProperties(dto, auditContentDef);
				acList.add(dto);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return acList;
	}
	@Override
	public List<TAuditContentDefDto> findAllAuditContentList() {
		TAuditContentDefExample example = new TAuditContentDefExample();
		List<TAuditContentDef> list = auditContentDefDAO.selectByExample(example);
		List<TAuditContentDefDto> acList = new ArrayList<TAuditContentDefDto>();
		try {
			for (Iterator iterator = list.iterator(); iterator.hasNext();) {
				TAuditContentDef auditContentDef = (TAuditContentDef) iterator.next();
				TAuditContentDefDto dto = new TAuditContentDefDto();
				BeanUtils.copyProperties(dto, auditContentDef);
				acList.add(dto);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return acList;
	}
	
	public TAuditContentDefDAO getAuditContentDefDAO() {
		return auditContentDefDAO;
	}
	public void setAuditContentDefDAO(TAuditContentDefDAO auditContentDefDAO) {
		this.auditContentDefDAO = auditContentDefDAO;
	}
	@Override
	public void saveAuditDetailAuditContent(String auditDetailId,
			List<String> ids) {
		TAuditContentFlowDetailGxExample example = new TAuditContentFlowDetailGxExample();
		example.createCriteria().andFlowDetailIdEqualTo(auditDetailId);
		auditContentFlowDetailGxDAO.deleteByExample(example);
		if(ids != null){
			for (Iterator iterator = ids.iterator(); iterator.hasNext();) {
				String id = (String) iterator.next();
				TAuditContentFlowDetailGx record = new TAuditContentFlowDetailGx();
				record.setContentId(id);
				record.setFlowDetailId(auditDetailId);
				auditContentFlowDetailGxDAO.insert(record );
			}
		}
	}
	public TAuditContentFlowDetailGxDAO getAuditContentFlowDetailGxDAO() {
		return auditContentFlowDetailGxDAO;
	}
	public void setAuditContentFlowDetailGxDAO(
			TAuditContentFlowDetailGxDAO auditContentFlowDetailGxDAO) {
		this.auditContentFlowDetailGxDAO = auditContentFlowDetailGxDAO;
	}

}
