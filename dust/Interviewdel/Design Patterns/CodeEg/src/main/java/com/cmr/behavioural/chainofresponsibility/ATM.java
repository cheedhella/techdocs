package com.cmr.behavioural.chainofresponsibility;

import java.util.Scanner;

public class ATM {

	// Client knows only first handler in the chain.
	// It takes all the requests from Client.
	private Dispenser c1;

	public ATM() {
		// Each handler holds a reference to another handler, thus creating a chain of
		// handlers - make sure there are no loops in the chain.
		this.c1 = new Dollar50Dispenser();
		Dispenser c2 = new Dollar20Dispenser();
		Dispenser c3 = new Dollar10Dispenser();
		c1.setNext(c2);
		c2.setNext(c3);
	}

	public static void main(String[] args) {
		ATM atm = new ATM();
		while (true) {
			int amount = 0;
			System.out.println("Enter amount to dispense: ");
			Scanner input = new Scanner(System.in);
			amount = input.nextInt();
			if (amount < 10) {
				System.out.println("Amount should be more than 10.");
				break;
			} else if (amount % 10 != 0) {
				System.out.println("Amount should be in multiple of 10s.");
			} else {
				atm.c1.dispense(new Amount(amount));
			}
		}
	}
}
