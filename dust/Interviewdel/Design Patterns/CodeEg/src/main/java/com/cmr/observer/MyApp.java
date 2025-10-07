package com.cmr.observer;

public class MyApp {
	public static void main(String args[]) {
		System.out.println( "Hello World!" );
		Product gold = new Product("Gold", 32000);
		Person arun = new Person("Arun");
		Person gopal = new Person("Gopal");
		gold.addObserver(arun);
		gold.addObserver(gopal);
		gold.setPrice(31000);
		gold.setPrice(30000);
	}
}