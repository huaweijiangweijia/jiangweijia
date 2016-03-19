package com.mobilesys.tms;

public class Task extends Thread {

	private int count;

	public Task(int count) {
			this.count = count;
		}

	@Override
	public void run() {
		IPushMessage pushmsg = new PushMessageImpl();
		pushmsg.sendMessage("bes/dsdp/jwj", "消息：" + count);
	}

}
