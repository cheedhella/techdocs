package com.cmr.behavioural.command.eg1;

// Receiver - It knows what to do to carry out a request
public class Light {
	private boolean on;

	public void switchOn() {
		this.on = true;
		System.out.println("Light is switched " + (on ? "ON" : "OFF"));
	}

	public void switchOff() {
		this.on = false;
		System.out.println("Light is switched " + (on ? "ON" : "OFF"));
	}
}