package com.cmr.decorator;

public class OnionDosa extends PlainDosa {
	private Dosa dosa;

	public OnionDosa(Dosa dosa) {
		this.dosa = dosa;
	}

	@Override
	public String makeDosa() {
		return dosa.makeDosa() + addOnions();
	}

	private String addOnions() {
		return ", adding Onions";
	}
}