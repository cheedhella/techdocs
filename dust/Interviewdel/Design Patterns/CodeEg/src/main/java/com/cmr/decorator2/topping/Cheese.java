package com.cmr.decorator2.topping;

import com.cmr.decorator2.pizza.*;

public class Cheese extends Topping {
    private static final int CHEESE_COST = 30;
    public Cheese(Pizza pizza) {
        super(pizza);
    }
    public String getDescription() {
        return getPizza().getDescription() + ", adding Cheese";
    }
    public int getCost() {
        return getPizza().getCost() + CHEESE_COST;
    }
}