package com.tl.common.context;

import com.tl.common.util.DesUtils;

public class StDataSource extends org.apache.commons.dbcp.BasicDataSource {
  public void setPassword(String password) {
    try {
      DesUtils des = new DesUtils("qilianghaogeqiu");
      String dp = des.decrypt(password);
      super.setPassword(dp);
    } catch (Exception e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
      super.setPassword(password);
    }
  }
  
}
