package com.cmr.flyweight;

import java.util.HashMap;
import java.util.Map;

public class StarFactory {
	private static Map<String, Star> cache = new HashMap<String, Star>();

	public static Star getStar(String size) {
		Star s = cache.get(size);
		if (s == null) {
			if (size.equals("small")) {
				s = new SmallStar();
				cache.put("small", s);
			} else if (size.equals("medium")) {
				s = new MediumStar();
				cache.put("medium", s);
			} else if (size.equals("large")) {
				s = new LargeStar();
				cache.put("large", s);
			}
		}
		return s;
	}
}