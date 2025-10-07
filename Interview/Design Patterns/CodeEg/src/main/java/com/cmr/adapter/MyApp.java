package com.cmr.adapter;

public class MyApp {
	public static void main(String args[]) {
		GooglePhone gphone = new GooglePhone();
		GooglePhoneEarPlug gphoneEarPlug = new GooglePhoneEarPlug();
		char[] gphoneMusic = gphone.getSountOutput();
		gphoneEarPlug.play(gphoneMusic);

		IPhone iphone = new IPhone();
		IPhoneEarPlug iphoneEarPlug = new IPhoneEarPlug();
		String iphoneMusic = iphone.getSountOutput();
		iphoneEarPlug.play(iphoneMusic);

		// What if you want to use google ear plug with iphone?
		// iphone phone outputs String, but google ear plug expects char[]
		GooglePhoneAdapter gphoneAdapter = new GooglePhoneAdapter();
		gphoneEarPlug.play(gphoneAdapter.convert(iphoneMusic));
	}
}