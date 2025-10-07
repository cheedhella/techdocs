package com.cmr.behavioural.chainofresponsibility;

public class Dollar10Dispenser implements Dispenser {

	private Dispenser nextDispenser;

	@Override
	public void setNext(Dispenser next) {
		this.nextDispenser = next;
	}

	@Override
	public void dispense(Amount cur) {
		if (cur.getAmount() >= 10) {
			int num = cur.getAmount() / 10;
			int remainder = cur.getAmount() % 10;
			System.out.println("Dispensing " + num + " 10$ note");
			if (remainder != 0)
				this.nextDispenser.dispense(new Amount(remainder));
		} else {
			this.nextDispenser.dispense(cur);
		}
	}

}