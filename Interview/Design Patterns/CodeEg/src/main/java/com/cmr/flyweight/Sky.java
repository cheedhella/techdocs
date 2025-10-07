package com.cmr.flyweight;

public class Sky {
	public void displayStar(Star star, int x, int y) {
		System.out.println("Displaying " + star.getSize() + " Star at X: " + x + " Y: " + y);
	}
}
