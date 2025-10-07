package com.cmr.behavioural.chainofresponsibility;

public class Dollar20Dispenser implements Dispenser {

	private Dispenser nextDispenser;

	@Override
	public void setNext(Dispenser next) {
		this.nextDispenser = next;
	}

	@Override
	public void dispense(Amount cur) {
		if (cur.getAmount() >= 20) {
			int num = cur.getAmount() / 20;
			int remainder = cur.getAmount() % 20;
			System.out.println("Dispensing " + num + " 20$ note");
			if (remainder != 0)
				this.nextDispenser.dispense(new Amount(remainder));
		} else {
			this.nextDispenser.dispense(cur);
		}
	}
}