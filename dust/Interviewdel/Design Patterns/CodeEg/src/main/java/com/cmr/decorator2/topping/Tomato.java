package com.cmr.decorator2.topping;

import com.cmr.decorator2.pizza.*;

public class Tomato extends Topping {
    private static final int TOMATO_COST = 10;
    public Tomato(Pizza pizza) {
        super(pizza);
    }
    public String getDescription() {
        return getPizza().getDescription() + ", adding Tomato";
    }
    public int getCost() {
        return getPizza().getCost() + TOMATO_COST;
    }
}