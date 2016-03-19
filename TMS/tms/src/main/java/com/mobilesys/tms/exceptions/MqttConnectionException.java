package com.mobilesys.tms.exceptions;


public class MqttConnectionException extends RuntimeException {
  private static final long serialVersionUID = -2946266495682282677L;

  public MqttConnectionException(String message) {
    super(message);
  }

  public MqttConnectionException(Throwable e) {
    super(e);
  }

  public MqttConnectionException(String message, Throwable cause) {
    super(message, cause);
  }
}