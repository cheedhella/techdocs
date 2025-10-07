package com.cmr.decorator2.topping;

import com.cmr.decorator2.pizza.*;

public class Capsicum extends Topping {
    private static final int CAPSICUM_COST = 20;
    public Capsicum(Pizza pizza) {
        super(pizza);
    }
    public String getDescription() {
        return getPizza().getDescription() + ", adding Capsicum";
    }
    public int getCost() {
        return getPizza().getCost() + CAPSICUM_COST;
    }
}