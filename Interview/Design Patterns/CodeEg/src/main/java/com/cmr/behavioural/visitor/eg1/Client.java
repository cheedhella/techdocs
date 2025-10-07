package com.cmr.behavioural.visitor.eg1;

public class Client {

	public static void main(String[] args) {
		CartItem[] items = new CartItem[] { new Book("B101", 20), new Book("B102", 100), new Fruit("Banana", 100, 2),
				new Fruit("Apple", 220, 1) };

		int total = calculatePrice(items);
		System.out.println("Total Cost = " + total);
	}

	private static int calculatePrice(CartItem[] items) {
		CartVisitor visitor = new CartVisitorImpl();
		int sum = 0;
		for (CartItem item : items) {
			sum = sum + item.accept(visitor);
		}
		return sum;
	}
}