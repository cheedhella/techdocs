package com.cmr.behavioural.visitor.eg1;

public interface CartItem {
	public int accept(CartVisitor visitor);
}
