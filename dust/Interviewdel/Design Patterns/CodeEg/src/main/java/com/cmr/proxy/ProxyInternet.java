package com.cmr.proxy;

import java.util.ArrayList;
import java.util.List;

public class ProxyInternet implements Internet {
	private Internet internet = new RealInternet();
	private static List<String> bannedSites;

	static {
		bannedSites = new ArrayList<String>();
		bannedSites.add("abc.com");
		bannedSites.add("def.com");
		bannedSites.add("ijk.com");
		bannedSites.add("lnm.com");
	}

	public void connectTo(String serverhost) throws Exception {
		System.out.print("Connecting to " + serverhost + "... ");
		if (bannedSites.contains(serverhost.toLowerCase())) {
			throw new Exception("Access Denied");
		}
		internet.connectTo(serverhost);
	}
}