package com.mobilesys.tms.exceptions;


public class MqttException extends RuntimeException {
  private static final long serialVersionUID = -2946266495682282677L;

  public MqttException(String message) {
    super(message);
  }

  public MqttException(Throwable e) {
    super(e);
  }

  public MqttException(String message, Throwable cause) {
    super(message, cause);
  }
}