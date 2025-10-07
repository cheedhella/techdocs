package com.cmr.behavioural.visitor.eg1;

public class CartVisitorImpl implements CartVisitor {

	@Override
	public int visit(Book book) {
		int cost = 0;
		// apply 5$ discount if book price is greater than 50
		if (book.getPrice() > 50) {
			cost = book.getPrice() - 5;
		} else {
			cost = book.getPrice();
		}
		System.out
				.println("Book ISBN: " + book.getIsbn() + ", Cost: " + book.getPrice() + ", Discounted Cost: " + cost);
		return cost;
	}

	@Override
	public int visit(Fruit fruit) {
		int cost = fruit.getPricePerKg() * fruit.getWeight();
		System.out.println("Fruit: " + fruit.getName() + ", Price per KG: " + fruit.getPricePerKg()
				+ ", Ordered weight: " + fruit.getWeight() + ", Cost = " + cost);
		return cost;
	}
}