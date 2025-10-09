package com.cmr.decorator;

public class ButterDosa extends PlainDosa {
	private Dosa dosa;

	public ButterDosa(Dosa dosa) {
		this.dosa = dosa;
	}

	@Override
	public String makeDosa() {
		return dosa.makeDosa() + addButter();
	}

	private String addButter() {
		return ", adding Butter";
	}
}