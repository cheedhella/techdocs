package com.cmr.behavioural.chainofresponsibility;

public interface Dispenser {

	void setNext(Dispenser next);

	/*
	 * In case, if a handler cannot process the request fully OR cannot process it
	 * at all, it passes the request next handler in the chain.
	 * 
	 */
	void dispense(Amount amount);
}