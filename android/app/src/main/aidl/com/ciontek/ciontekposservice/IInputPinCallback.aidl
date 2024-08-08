package com.ciontek.ciontekposservice;

interface IInputPinCallback {

    void onInputResult(int result,in byte[] pinBlock);

    void onKeyPress(byte key);
}