package com.cmr.observer;

import java.util.Observable;

public class Product extends Observable {

	private String name;
	private int price;

	public Product(String name, int price) {
		this.name = name;
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		if (this.price > price) { // Price DROP!
			this.setChanged(); // Observers are not notified, if this is not called
			this.notifyObservers();
		}
		this.price = price;
	}
}