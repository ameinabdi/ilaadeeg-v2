package com.ciontek.ciontekposservice;

interface IEmvProcessCallback {
    void onApplicationSelection(inout byte[] candidates);
    void onCardHolderInputPin(boolean isOnline, int numberAttemptsRemaining);
}