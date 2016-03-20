package com.tl.common.util;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;

public class ArrayUtil {

	public static List<Object> getFieldList(List<? extends Object> list,
			String name) {
		List tmpList = new ArrayList(list.size());
		if ((list == null) || (list.size() == 0)) {
			return tmpList;
		}
		for (int i = 0; i < list.size(); ++i) {
			Object val = null;
			try {
				val = BeanUtils.getProperty(list.get(i), name);
			} catch (Exception localException) {
				throw new RuntimeException(localException.getMessage());
			}
			tmpList.add(val);
		}
		return tmpList;
	}

	public static List<Object> getMapProperty(List<? extends Map> list,
			String property) {
		List tmpList = new ArrayList(list.size());
		if ((list == null) || (list.size() == 0)) {
			return tmpList;
		}
		for (int i = 0; i < list.size(); ++i) {
			Map m = (Map) list.get(i);
			tmpList.add(m.get(property));
		}
		return tmpList;
	}

	public static float getMaxofArray(float[] a) {
		int k = a.length;
		float max = a[0];
		for (int i = 0; i < k; ++i) {
			if (a[i] > max) {
				max = a[i];
			}
		}
		return max;
	}

	public static int getMaxofArray(int[] a) {
		int k = a.length;
		int max = a[0];
		for (int i = 0; i < k; ++i) {
			if (a[i] > max) {
				max = a[i];
			}
		}
		return max;
	}

	public static double getMaxofArray(double[] a) {
		int k = a.length;
		double max = a[0];
		for (int i = 0; i < k; ++i) {
			if (a[i] > max) {
				max = a[i];
			}
		}
		return max;
	}

	public static double getMinofArray(double[] a) {
		int k = a.length;
		double min = a[0];
		for (int i = 0; i < k; ++i) {
			if (a[i] < min) {
				min = a[i];
			}
		}
		return min;
	}

	public static Double getMaxofArray(List<Double> list) {
		int k = list.size();
		if (k == 0) {
			return null;
		}
		double max = ((Double) list.get(0)).doubleValue();
		for (int i = 0; i < k; ++i) {
			if (((Double) list.get(i)).doubleValue() > max) {
				max = ((Double) list.get(i)).doubleValue();
			}
		}
		return Double.valueOf(max);
	}

	public static Double getMinofArray(List<Double> list) {
		int k = list.size();
		if (k == 0) {
			return null;
		}
		double min = ((Double) list.get(0)).doubleValue();
		for (int i = 0; i < k; ++i) {
			if (((Double) list.get(i)).doubleValue() < min) {
				min = ((Double) list.get(i)).doubleValue();
			}
		}
		return Double.valueOf(min);
	}

}
