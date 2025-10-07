package com.cmr.decorator;

public class MasalaDosa extends PlainDosa {
	private Dosa dosa;

	public MasalaDosa(Dosa dosa) {
		this.dosa = dosa;
	}

	@Override
	public String makeDosa() {
		return dosa.makeDosa() + addMasala();
	}

	private String addMasala() {
		return ", adding Masala";
	}
}