package com.mobilesys.tms;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class PushMessageImpl implements IPushMessage{

	private static ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
	
	
	@Override
	public void sendMessage(String receiver, String message) {
		fixedThreadPool.execute(new task(receiver,message));
		
	}
	
	
	
	class task implements Runnable
	{
		private String receiver;
		private String message;
		
		
		public task(String receiver, String message) {
			this.receiver = receiver;
			this.message = message;
		}


		@Override
		public void run() {
			// TODO Auto-generated method stub
			MqttBroker3.getInstance().sendMessage(receiver, " content is:" + message);
		}
		
	}
	
	
	public static void main(String[] args) {
		for(int i = 0 ; i<100;i++)
		{
			new Task(i).start();
			
		}
//		for(int i = 0 ; i<10000;i++){
//		IPushMessage pushmsg = new PushMessageImpl();
//		pushmsg.sendMessage("#", "消息：" + i);
//		}
	}
	
	

}
