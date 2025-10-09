package com.cmr.decorator2.pizza;

public class FormHouse implements Pizza {
	public String getDescription() {
        return "FormHouse Pizza: ";
    }
	public int getCost() {
        return 200;
    }
}
	