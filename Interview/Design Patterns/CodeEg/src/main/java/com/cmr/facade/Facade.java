package com.cmr.facade;

public class Facade {
	public void on() {
		new Fan().on();
		new TV().on();
		new SetupBox().on();
		new SoundSystem().on();
	}
}