// h5与原生app通信
    public static messageChannel(event: string, data: any) {
        const win: any = window;
        if (win.flutter_inappwebview) {
            // flutter通信
            if (win.flutter_inappwebview.callHandler) {
                win.flutter_inappwebview.callHandler('messageChannel', JSON.stringify({ type: event, data }));
            } else {
                win.flutter_inappwebview._callHandler('messageChannel', null, JSON.stringify({ type: event, data }));
            }
        } else {
            // RN通信
            if (AppModule.platform === 'ios') {
                win.webkit &&
                    win.webkit.messageHandlers.messageChannel.postMessage(JSON.stringify({ type: event, data }));
                if (event === 'share') {
                    win.webkit &&
                        win.webkit.messageHandlers.messageChannel.postMessage(
                            JSON.stringify({ type: event, data: JSON.stringify(data) }),
                        );
                }
            } else {
                win.jsBridge && win.jsBridge.messageChannel(JSON.stringify({ type: event, data }));
            }
        }
    }