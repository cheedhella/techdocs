package com.cmr.behavioural.visitor.eg1;

public class Book implements CartItem {

	private String isbn;
	private int price;

	public Book(String isbn, int cost) {
		this.price = cost;
		this.isbn = isbn;
	}

	public int getPrice() {
		return price;
	}

	public String getIsbn() {
		return isbn;
	}

	@Override
	public int accept(CartVisitor visitor) {
		return visitor.visit(this);
	}
}