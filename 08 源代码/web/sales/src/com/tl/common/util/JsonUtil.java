package com.tl.common.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import net.sf.json.util.JSONUtils;

public class JsonUtil {
    private static void setDataFormat2JAVA(){  
        // 设定日期转换格式  
        JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[] { "yyyy-MM-dd",
        		"yyyy-MM-dd HH:mm",
        		"yyyy-MM-dd HH:mm:ss" }));
    }  
  
    /** 
     * 将数据对象转换成Json格式字符串 
     *  
     * @param object  POJO、Collection或Object[] 
     * @return String 
     */  
    public static String beanToJson(Object object){  
        String jsonString = null;  
        // 日期值处理器  
        JsonConfig jsonConfig = new JsonConfig();  
        jsonConfig.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor());  
        if(object != null){  
            if(object instanceof Collection || object instanceof Object[]){  
                jsonString = JSONArray.fromObject(object, jsonConfig).toString();  
            }else{  
                jsonString = JSONObject.fromObject(object, jsonConfig).toString();  
            }  
        }  
        return jsonString == null ? "{}" : jsonString;  
    }  
    
    /** 
     * 将数据对象转换成Json格式字符串 
     *  
     * @param object  POJO、Collection或Object[] 
     * @param pattern 格式化方式
     * @return String 
     */  
    public static String beanToJson(Object object,String pattern){  
        String jsonString = null;  
        // 日期值处理器  
        JsonConfig jsonConfig = new JsonConfig();  
        jsonConfig.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor(pattern));  
        if(object != null){  
            if(object instanceof Collection || object instanceof Object[]){  
                jsonString = JSONArray.fromObject(object, jsonConfig).toString();  
            }else{  
                jsonString = JSONObject.fromObject(object, jsonConfig).toString();  
            }  
        }  
        return jsonString == null ? "{}" : jsonString;  
    }  
  
    /** 
     * 将Map数据对象转换成Json格式字符串 
     *  
     * @param map 
     *            Map对象 
     * @return String 
     */  
    public static String mapToJson(Map map){  
        return beanToJson(map);  
    }  
  
    /** 
     * 将Collection数据对象转换成Json格式字符串 
     *  
     * @param coll 
     *            Collection对象 
     * @return String 
     */  
    public static String listToJson(Collection coll){  
        return beanToJson(coll);  
    }  
  
    /** 
     * 将Object数组数据对象转换成Json格式字符串 
     *  
     * @param objects 
     *            Object对象数组 
     * @return String 
     */  
    public static String arrayToJson(Object[] objects){  
        return beanToJson(objects);  
    }  
  
    /** 
     * 将Json格式字符串转换成Java对象 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @param beanClass 
     *            Java对象Class 
     * @return Object 
     */  
    public static Object jsonToBean(String jsonString,Class beanClass){  
        JSONObject jsonObject = null;  
        try{  
            setDataFormat2JAVA(); 
            jsonObject = JSONObject.fromObject(jsonString);  
        }  
        catch (Exception e){  
            e.printStackTrace();  
        }  
        return JSONObject.toBean(jsonObject, beanClass);  
    }  
  
    /** 
     * 将Json格式字符串转换成Java对象 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @param beanClass 
     *            Java对象Class 
     * @param classMap 
     *            包含的对象集合中的Java对象Class 
     * @return Object 
     */  
    public static Object jsonToBean(String jsonString,Class beanClass,Map classMap){  
        JSONObject jsonObject = null;  
        try{  
            setDataFormat2JAVA();  
            jsonObject = JSONObject.fromObject(jsonString);  
        }  
        catch (Exception e){  
            e.printStackTrace();  
        }  
        return JSONObject.toBean(jsonObject, beanClass, classMap);  
    }  
  
    /** 
     * 将Json格式字符串转换成Java对象数组 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @param beanClass 
     *            Java对象Class 
     * @return Object[] 
     */  
    public static Object[] jsonToArray(String jsonString,Class beanClass){  
        setDataFormat2JAVA();  
        JSONArray array = JSONArray.fromObject(jsonString);  
        Object[] obj = new Object[array.size()];  
        for(int i = 0;i < array.size();i++){  
            JSONObject jsonObject = array.getJSONObject(i);  
            obj[i] = JSONObject.toBean(jsonObject, beanClass);  
        }  
        return obj;  
    }  
  
    /** 
     * 将Json格式字符串转换成Java对象数组 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @param beanClass 
     *            Java对象Class 
     * @param classMap 
     *            包含的对象集合中的Java对象Class 
     * @return Object[] 
     */  
    public static Object[] jsonToArray(String jsonString,Class beanClass,Map classMap){  
        setDataFormat2JAVA();  
        JSONArray array = JSONArray.fromObject(jsonString);  
        Object[] obj = new Object[array.size()];  
        for(int i = 0;i < array.size();i++){  
            JSONObject jsonObject = array.getJSONObject(i);  
            obj[i] = JSONObject.toBean(jsonObject, beanClass, classMap);  
        }  
        return obj;  
    }  
  
    /** 
     * 将Json格式字符串转换成Java对象集合 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @param beanClass 
     *            Java对象Class 
     * @return List 
     */  
    public static List jsonToList(String jsonString,Class beanClass){  
        setDataFormat2JAVA();  
        JSONArray array = JSONArray.fromObject(jsonString);  
        List list = new ArrayList();  
        for(Iterator iter = array.iterator();iter.hasNext();){  
            JSONObject jsonObject = (JSONObject) iter.next();  
            list.add(JSONObject.toBean(jsonObject, beanClass));  
        }  
        return list;  
    }  
  
    /** 
     * 将Json格式字符串转换成Java对象集合 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @param beanClass 
     *            Java对象Class 
     * @param classMap 
     *            包含的对象集合中的Java对象Class 
     * @return 
     */  
    public static List jsonToList(String jsonString,Class beanClass,Map classMap){  
        setDataFormat2JAVA();  
        JSONArray array = JSONArray.fromObject(jsonString);  
        List list = new ArrayList();  
        for(Iterator iter = array.iterator();iter.hasNext();){  
            JSONObject jsonObject = (JSONObject) iter.next();  
            list.add(JSONObject.toBean(jsonObject, beanClass, classMap));  
        }  
        return list;  
    }  
  
    /** 
     * 将Json格式字符串转换成Map对象 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @return Map 
     */  
    public static Map jsonToMap(String jsonString){  
        setDataFormat2JAVA();  
        JSONObject jsonObject = JSONObject.fromObject(jsonString);  
        Map map = new HashMap();  
        for(Iterator iter = jsonObject.keys();iter.hasNext();){  
            String key = (String) iter.next();  
            map.put(key, jsonObject.get(key));  
        }  
        return map;  
    }  
  
    /** 
     * 将Json格式字符串转换成Object对象数组 
     *  
     * @param jsonString 
     *            Json格式字符串 
     * @return Object[] 
     */  
    public static Object[] jsonToArray(String jsonString){  
        JSONArray jsonArray = JSONArray.fromObject(jsonString);  
        return jsonArray.toArray();  
    }  
    
    public static class DateJsonValueProcessor implements JsonValueProcessor{  
 	   /** 
         * 字母 日期或时间元素 表示 示例 <br> 
         * G Era 标志符 Text AD <br> 
         * y 年 Year 1996; 96 <br> 
         * M 年中的月份 Month July; Jul; 07 <br> 
         * w 年中的周数 Number 27 <br> 
         * W 月份中的周数 Number 2 <br> 
         * D 年中的天数 Number 189 <br> 
         * d 月份中的天数 Number 10 <br> 
         * F 月份中的星期 Number 2 <br> 
         * E 星期中的天数 Text Tuesday; Tue<br> 
         * a Am/pm 标记 Text PM <br> 
         * H 一天中的小时数（0-23） Number 0 <br> 
         * k 一天中的小时数（1-24） Number 24<br> 
         * K am/pm 中的小时数（0-11） Number 0 <br> 
         * h am/pm 中的小时数（1-12） Number 12 <br> 
         * m 小时中的分钟数 Number 30 <br> 
         * s 分钟中的秒数 Number 55 <br> 
         * S 毫秒数 Number 978 <br> 
         * z 时区 General time zone Pacific Standard Time; PST; GMT-08:00 <br> 
         * Z 时区 RFC 822 time zone -0800 <br> 
         */  
        public static final String Default_DATE_PATTERN = "yyyy-MM-dd";  
        private DateFormat dateFormat;  
        public DateJsonValueProcessor(){
        	 dateFormat = new SimpleDateFormat(Default_DATE_PATTERN);   
        }
        /** 
         *  
         */  
        public DateJsonValueProcessor(String datePattern) {  
           
                dateFormat = new SimpleDateFormat(datePattern);  
             
        }  
      
        /* 
         * (non-Javadoc) 
         * @see 
         * net.sf.json.processors.JsonValueProcessor#processArrayValue(java.lang 
         * .Object, net.sf.json.JsonConfig) 
         */  
        @Override  
        public Object processArrayValue(Object value, JsonConfig jsonConfig) {  
            return process(value);  
        }  
      
        /* 
         * (non-Javadoc) 
         * @see 
         * net.sf.json.processors.JsonValueProcessor#processObjectValue(java.lang 
         * .String, java.lang.Object, net.sf.json.JsonConfig) 
         */  
        @Override  
        public Object processObjectValue(String key, Object value,JsonConfig jsonConfig) {  
            return process(value);  
        }  
      
        private Object process(Object value) {  
            if (value == null) {  
                return "";  
            } else {  
                return dateFormat.format((Date) value);  
            }  
        }  
    }
}
