package com.tl.resource.dao;

import java.util.List;
import java.util.Map;

import com.tl.resource.business.dto.ReservePlanDetailDto;
import com.tl.resource.dao.pojo.TReservePlanInfor;
import com.tl.resource.dao.pojo.TReservePlanInforExample;

public interface TReservePlanInforDAO {
    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    int countByExample(TReservePlanInforExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    int deleteByExample(TReservePlanInforExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    int deleteByPrimaryKey(String id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    void insert(TReservePlanInfor record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    void insertSelective(TReservePlanInfor record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    List selectByExample(TReservePlanInforExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    TReservePlanInfor selectByPrimaryKey(String id);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    int updateByExampleSelective(TReservePlanInfor record, TReservePlanInforExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    int updateByExample(TReservePlanInfor record, TReservePlanInforExample example);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    int updateByPrimaryKeySelective(TReservePlanInfor record);

    /**
     * This method was generated by Apache iBATIS ibator.
     * This method corresponds to the database table t_reserve_plan_infor
     *
     * @ibatorgenerated Mon Nov 23 20:26:45 CST 2009
     */
    int updateByPrimaryKey(TReservePlanInfor record);
    
    List<ReservePlanDetailDto> getReservePlanDetail(String orderId);
    
    /**
	 * 根据供应商ID得到储备计划
	 * @param supplierId
	 * @return
	 */
    List<ReservePlanDetailDto> getPlanList(Map<String, Object> parmMap);
    
    int getPlanListCount(Map<String, Object> parmMap);
    
    void updateReservePlanByOrderId(String id);
}