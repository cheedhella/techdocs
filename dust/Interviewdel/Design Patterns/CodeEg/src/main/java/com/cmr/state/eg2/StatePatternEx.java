package com.cmr.state.eg2;

interface AlertState {
	public void alert(Mobile ctx);
}

class Silent implements AlertState {
	@Override
	public void alert(Mobile mobile) {
		System.out.println("silent...");
	}
}

class Vibration implements AlertState {
	@Override
	public void alert(Mobile mobile) {
		System.out.println("vibration...");
	}
}

class Mobile {
	private AlertState currentState;

	public Mobile() {
		currentState = new Vibration();
	}

	public void setState(AlertState state) {
		currentState = state;
	}

	public void alert() {
		currentState.alert(this);
	}
}

class StatePatternEx {
	public static void main(String[] args) {
		Mobile m = new Mobile();
		m.alert();
		m.alert();
		m.setState(new Silent());
		m.alert();
		m.alert();
		m.alert();
	}
}

// https://learning.oreilly.com/library/view/java-design-patterns/9781484218020/9781484218013_Ch14.xhtml