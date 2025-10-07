package com.cmr.behavioural.chainofresponsibility;

public class Dollar50Dispenser implements Dispenser {

	private Dispenser nextDispenser;

	@Override
	public void setNext(Dispenser next) {
		this.nextDispenser = next;
	}

	@Override
	public void dispense(Amount cur) {
		if (cur.getAmount() >= 50) {
			int num = cur.getAmount() / 50;
			int remainder = cur.getAmount() % 50;
			System.out.println("Dispensing " + num + " 50$ note");
			if (remainder != 0)
				this.nextDispenser.dispense(new Amount(remainder));
		} else {
			this.nextDispenser.dispense(cur);
		}
	}
}