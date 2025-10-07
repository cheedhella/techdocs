package com.cmr.decorator2.pizza;

public class Margherita implements Pizza {
    public String getDescription() {
        return "Margherita Pizza: ";
    }

    public int getCost() {
        return 300;
    }
}
