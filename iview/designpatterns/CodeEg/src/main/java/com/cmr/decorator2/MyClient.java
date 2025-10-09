package com.cmr.decorator2;

import com.cmr.decorator2.pizza.*;
import com.cmr.decorator2.topping.*;

public class MyClient {
	public static void main(String args[]) {
		// Double Cheese FormHouse Pizza
		Pizza p1 = new Cheese(new Cheese(new FormHouse()));
		System.out.println(p1.getDescription());
		System.out.println(p1.getCost());

		// Margherita Pizza with Tomato Cheese Capsicum
		Pizza p2 = new Tomato(new Cheese(new Capsicum(new Margherita())));
		System.out.println(p2.getDescription());
		System.out.println(p2.getCost());
	}
}