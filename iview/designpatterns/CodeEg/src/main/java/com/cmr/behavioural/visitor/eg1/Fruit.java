package com.cmr.behavioural.visitor.eg1;

public class Fruit implements CartItem {

	private String name;
	private int pricePerKg;
	private int weight;

	public Fruit(String name, int pricePerKg, int weight) {
		this.name = name;
		this.pricePerKg = pricePerKg;
		this.weight = weight;
	}

	public String getName() {
		return this.name;
	}

	public int getPricePerKg() {
		return pricePerKg;
	}

	public int getWeight() {
		return weight;
	}

	@Override
	public int accept(CartVisitor visitor) {
		return visitor.visit(this);
	}
}