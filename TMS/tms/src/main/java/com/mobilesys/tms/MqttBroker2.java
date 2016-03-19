package com.mobilesys.tms;

import java.net.URISyntaxException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.fusesource.hawtbuf.Buffer;
import org.fusesource.hawtbuf.UTF8Buffer;
import org.fusesource.mqtt.client.Callback;
import org.fusesource.mqtt.client.CallbackConnection;
import org.fusesource.mqtt.client.Listener;
import org.fusesource.mqtt.client.MQTT;
import org.fusesource.mqtt.client.QoS;

import com.mobilesys.tms.exceptions.MqttException;

public class MqttBroker2 {

	public static final Logger logger = Logger.getLogger(MqttBroker2.class);

	// 连接参数
	private final static String CONNECTION_STRING = "tcp://localhost:1883";
	private final static boolean CLEAN_START = true;
	private final static short KEEP_ALIVE = 30;// 低耗网络，但是又需要及时获取数据，心跳30s
	public final static long RECONNECTION_ATTEMPT_MAX = 6;
	public final static long RECONNECTION_DELAY = 2000;
	public final static int SEND_BUFFER_SIZE = 2 * 1024 * 1024;// 发送最大缓冲为2M

	private final static String CLIENT_ID = "master";// 客户端标识
	private final static int[] QOS_VALUES = { 0, 0, 2, 0 };// 对应主题的消息级别
	private final static String[] TOPICS = { "Test/TestTopics/Topic1", "Test/TestTopics/Topic2",
			"Test/TestTopics/Topic3", "client/keepalive" };
	private static MqttBroker2 instance = new MqttBroker2();
	
	
	

	private MQTT mqttClient;

	private CallbackConnection connection;

	boolean isConnected = false;

	/**
	 * 返回实例对象
	 * 
	 * @return
	 */
	public static MqttBroker2 getInstance() {
		return instance;
	}

	/**
	 * 重新连接服务
	 */
	private void connect() throws MqttException {

		mqttClient = new MQTT();
		try {
			// 设置mqtt broker的ip和端口
			mqttClient.setHost("tcp://182.92.155.208:21613");
			// 连接前清空会话信息
			mqttClient.setCleanSession(CLEAN_START);
			// 设置重新连接的次数
			mqttClient.setReconnectAttemptsMax(RECONNECTION_ATTEMPT_MAX);
			// 设置重连的间隔时间
			mqttClient.setReconnectDelay(RECONNECTION_DELAY);
			// 设置心跳时间
			mqttClient.setKeepAlive(KEEP_ALIVE);
			// 设置缓冲的大小
			mqttClient.setSendBufferSize(SEND_BUFFER_SIZE);

			mqttClient.setUserName("admin");
			mqttClient.setPassword("password");

			// 获取mqtt的连接对象BlockingConnection
			connection = mqttClient.callbackConnection();

			connection.listener(new Listener() {

				public void onDisconnected() {
					System.out.println("断开连接。。。。。。");
					isConnected = false;
				}

				public void onConnected() {
					System.out.println("重新连接。。。。。。");
					isConnected = true;
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

					isConnected = true;
					System.out.println("MQTTCallbackServer.CallbackConnection.connect.success" + "连接成功......");

				}
			});

		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

		}

	}

	/**
	 * 发送消息
	 * 
	 * @param clientId
	 * @param messageId
	 * @throws Exception 
	 */
	public void sendMessage(String clientId, String message)  {
		try {
			System.out.println(isConnected);
			boolean result = false;
			int count=0;
			while (!isConnected) {
				if(count >= 3)
				{
					logger.info("can not connect to server ");
					break;
				}
				try {
					TimeUnit.SECONDS.sleep(1);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				count++;
				connect();
			}

			logger.info("send message to " + clientId + ", message is " + message);

			// 查询client对应的topic,topic=部门/clientId
			String department = "huawei/";
			// 发布自己的消息
			connection.publish(department + clientId, message.getBytes(), QoS.AT_LEAST_ONCE, false,
					new Callback<Void>() {
						public void onSuccess(Void v) {
							logger.info("send message success !");
							// the pubish operation completed successfully.
						}

						public void onFailure(Throwable exception) {
							logger.error("send message failed !" + exception.getMessage(), exception);
						}
					});
			try {
				TimeUnit.MICROSECONDS.sleep(20000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (MqttException e) {
			logger.error("sendMessage failed !" + e.getMessage(), e);
		}
	}

	public static void main(String[] args) {
		int count = 1;
		while (true) {
			MqttBroker2.getInstance().sendMessage("bes/#", "message content" + count++);
			try {
				TimeUnit.SECONDS.sleep(5);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}
}
