package com.mobilesys.tms;

public interface IPushMessage {
	
	/**
	 * 推送消息接口，
	 * @param receiver: 接收者的Id
	 * @param message: 推送的消息内容
	 * @return void
	 */
	public void sendMessage(String receiver,String message);
	
	
}
