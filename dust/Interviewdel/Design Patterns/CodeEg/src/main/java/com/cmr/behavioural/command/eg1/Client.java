package com.cmr.behavioural.command.eg1;

// Client
// It creates ConcreteCommands and sets a Receiver for each command. 
// It asks the Invoker to run a ConcreteCommand, which runs one or more 
// actions on the Receiver.
public class Client {
	public static void main(String[] args) {
		Light light = new Light();
		Command lightsOn = new LightOnCommand(light);
		Command lightsOff = new LightOffCommand(light);

		RemoteControl control = new RemoteControl();
		System.out.print("Running SwitchOn Command: ");
		control.setCommand(lightsOn); // switch on
		control.pressButton();
		System.out.print("Running SwitchOff Command: ");
		control.setCommand(lightsOff); // switch off
		control.pressButton();
	}
}