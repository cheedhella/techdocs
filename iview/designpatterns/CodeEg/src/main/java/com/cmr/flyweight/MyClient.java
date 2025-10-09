package com.cmr.flyweight;

public class MyClient {
	public static void main(String args[]) {
		// Say, if you want to create 1000 stars(some of them are large, some of them
		// are medium and some of them small), instead of creating 1000 star objects
		Sky sky = new Sky();
		sky.displayStar(StarFactory.getStar("small"), 1, 1);
		sky.displayStar(StarFactory.getStar("small"), 1, 2);
		sky.displayStar(StarFactory.getStar("large"), 2, 1);
	}
}