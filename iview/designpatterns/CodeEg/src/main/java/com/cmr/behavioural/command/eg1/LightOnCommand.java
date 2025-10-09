package com.cmr.behavioural.command.eg1;

// Concrete Command 
// It holds a reference to the Receiver.
// It asks the Receiver to perform the actual operation.
public class LightOnCommand implements Command {
	private Light light;

	public LightOnCommand(Light light) {
		this.light = light;
	}

	public void execute() {
		light.switchOn();
	}
}