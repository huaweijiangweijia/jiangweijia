package com.mobilesys.tms;

import java.net.URISyntaxException;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.fusesource.hawtbuf.Buffer;
import org.fusesource.hawtbuf.UTF8Buffer;
import org.fusesource.mqtt.client.Callback;
import org.fusesource.mqtt.client.CallbackConnection;
import org.fusesource.mqtt.client.Listener;
import org.fusesource.mqtt.client.MQTT;
import org.fusesource.mqtt.client.QoS;

/**
 * Created by tiantao on 14-12-2.
 */
public class MQTTCallbackServer {
	private static final Logger LOG = Logger.getLogger(MQTTCallbackServer.class);
	private final static String CONNECTION_STRING = "tcp://localhost:1883";
	private final static boolean CLEAN_START = true;
	private final static short KEEP_ALIVE = 30;// 低耗网络，但是又需要及时获取数据，心跳30s
	public final static long RECONNECTION_ATTEMPT_MAX = 6;
	public final static long RECONNECTION_DELAY = 2000;

	public final static int SEND_BUFFER_SIZE = 2 * 1024 * 1024;// 发送最大缓冲为2M

	public static void main(String[] args) {
		// 创建MQTT对象
		MQTT mqtt = new MQTT();
		try {
			// 设置mqtt broker的ip和端口
			mqtt.setHost("tcp://182.92.155.208:21613");
			// 连接前清空会话信息
			mqtt.setCleanSession(CLEAN_START);
			// 设置重新连接的次数
			mqtt.setReconnectAttemptsMax(RECONNECTION_ATTEMPT_MAX);
			// 设置重连的间隔时间
			mqtt.setReconnectDelay(RECONNECTION_DELAY);
			// 设置心跳时间
			mqtt.setKeepAlive(KEEP_ALIVE);
			// 设置缓冲的大小
			mqtt.setSendBufferSize(SEND_BUFFER_SIZE);
			
			mqtt.setUserName("admin");
			mqtt.setPassword("password");

			// 获取mqtt的连接对象BlockingConnection
			final CallbackConnection connection = mqtt.callbackConnection();

			// 添加连接的监听事件
			connection.listener(new Listener() {

				public void onDisconnected() {
					System.out.println("111111111111111111111");
				}

				public void onConnected() {
					System.out.println("222222222222222222222");
				}

				public void onPublish(UTF8Buffer topic, Buffer payload, Runnable ack) {
					// You can now process a received message from a topic.
					// Once process execute the ack runnable.
					ack.run();
					System.out.println("topic" + topic.toString() + "=" + new String(payload.getData()));
				}

				public void onFailure(Throwable value) {
				}
			});
			// 添加连接事件
			connection.connect(new Callback<Void>() {
				/**
				 * 连接失败的操作
				 */
				public void onFailure(Throwable value) {
					// If we could not connect to the server.
					System.out.println("MQTTCallbackServer.CallbackConnection.connect.onFailure" + "连接失败......"
							+ value.getMessage());
					value.printStackTrace();
				}

				/**
				 * 连接成功的操作
				 * 
				 * @param v
				 */
				public void onSuccess(Void v) {

					int count = 1;

					// 用于发布消息，目前手机段不需要向服务端发送消息
					// 主题的内容
					final String message = "hello " + count + "chinese people !";
					final String topic = "huawei/#";
					System.out.println("MQTTCallbackServer  publish  topic=" + topic + " message :" + message);
					connection.publish(topic, message.getBytes(), QoS.AT_LEAST_ONCE, false, new Callback<Void>() {
						public void onSuccess(Void v) {
							System.out.println("connect success");
							// the pubish operation completed successfully.
						}

						public void onFailure(Throwable value) {
							value.printStackTrace();
						}
					});
					
					
					
				}
			});

			int count = 1;
			while (true) {
				count++;
				connection.publish("huawei/#", (count+"message").getBytes(), QoS.AT_LEAST_ONCE, false, new Callback<Void>() {
					public void onSuccess(Void v) {
						System.out.println("OK");
						// the pubish operation completed successfully.
					}

					public void onFailure(Throwable value) {
						value.printStackTrace();
					}
				});
				
				
				TimeUnit.MILLISECONDS.sleep(1000);
			}

		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

		}
	}
}
