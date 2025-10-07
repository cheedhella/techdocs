package com.cmr.decorator;

public class MyClient {
	public static void main(String args[]) {
		// Plain Dosa
		PlainDosa plainDosa = new PlainDosa();
		System.out.println(plainDosa.makeDosa());

		// Onion Dosa with Butter
		Dosa d2 = new OnionDosa(plainDosa);
		Dosa d3 = new ButterDosa(d2);
		System.out.println("Onion Butter Dosa: " + d3.makeDosa());

		// Onion Dosa with Butter n Masala
		Dosa d4 = new MasalaDosa(d3);
		System.out.println("Onion Butter Masala Dosa: " + d4.makeDosa());
	}
}