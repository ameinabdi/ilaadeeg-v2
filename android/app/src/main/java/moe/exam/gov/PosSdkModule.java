package com.ilaadeeg.app;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.ctk.sdk.PosApiHelper;
import java.nio.charset.StandardCharsets;
import android.util.Log;



public class PosSdkModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public PosSdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "PosSdkModule";
    }

    @ReactMethod
    public void getPosVersion(final Promise promise) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    PosApiHelper posApiHelper = PosApiHelper.getInstance();
    
                    // Define the buffer size
                    byte[] versionBuffer = new byte[64]; // Adjust size as needed
    
                    // Call SysGetVersion with the buffer
                    posApiHelper.SysGetVersion(versionBuffer);
    
                    // Convert the byte array to a string
                    String version = new String(versionBuffer, StandardCharsets.UTF_8).trim();
    
                    promise.resolve(version);
                } catch (Exception e) {
                    promise.reject("Error", e);
                }
            }
        }).start();
    }
    @ReactMethod
    public void readNfcCard(final Promise promise) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (this) {
                    PosApiHelper posApiHelper = PosApiHelper.getInstance();
    
                    int ret = posApiHelper.PiccOpen();
                    final byte PCardType[] = new byte[4];
                    final byte PMode = 'A';
                    final byte PserialNo[] = new byte[40];
    
                    if (ret == 0) {
                        long time = System.currentTimeMillis();
                        while (System.currentTimeMillis() < time + 10000) {
                            ret = posApiHelper.PiccCheck(PMode, PCardType, PserialNo);
                            if (ret == 0) {
                                String serialNoHex = bytesToHex(PserialNo, 4);
                                promise.resolve(serialNoHex);
                                posApiHelper.SysBeep();
                                return;  // Successfully read the NFC card
                            } 
                        }
                        // Timeout occurred without successful NFC read
                        promise.reject("Timeout", "NFC read timeout.");
                    } else {
                        promise.reject("PiccOpenFailed", "Read Card Failed...");
                    }
                }
            }
        }).start();
    }
    
    // Utility method to convert byte array to hex string
    private String bytesToHex(byte[] b, int leng) {
        StringBuffer strbuf = new StringBuffer();

        for (int i = 0; i < leng; i++) {
            strbuf.append("0123456789ABCDEF".charAt(((byte) ((b[i] & 0xf0) >> 4))));
            strbuf.append("0123456789ABCDEF".charAt((byte) (b[i] & 0x0f)));
            strbuf.append(" ");
        }
        return strbuf.toString();
    }
}