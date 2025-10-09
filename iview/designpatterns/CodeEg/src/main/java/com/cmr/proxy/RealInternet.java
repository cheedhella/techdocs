package com.cmr.proxy;

public class RealInternet implements Internet {
	public void connectTo(String serverhost) {
		System.out.println("Connected.");
	}
}