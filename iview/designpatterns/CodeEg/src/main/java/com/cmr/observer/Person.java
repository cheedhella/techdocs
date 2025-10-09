package com.cmr.observer;

import java.util.Observable;
import java.util.Observer;

public class Person implements Observer {

	private String name;

	public Person(String name) {
		this.name = name;
	}

	public void update(Observable o, Object arg) {
		Product p = (Product) o;
		System.out.println(
				"Notification to: " + this.name + ", Product Name: " + p.getName() + ", Price: " + p.getPrice());
	}
}