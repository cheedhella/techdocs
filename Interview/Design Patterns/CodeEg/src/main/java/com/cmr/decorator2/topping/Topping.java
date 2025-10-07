package com.cmr.decorator2.topping;

import com.cmr.decorator2.pizza.*;

// Pizza Decorator
public abstract class Topping implements Pizza {
    private Pizza pizza;

    public Topping(Pizza pizza) {
        this.pizza = pizza;
    }

    public Pizza getPizza() {
        return pizza;
    }
}