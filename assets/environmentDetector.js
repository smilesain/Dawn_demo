class EnvironmentDetector {
    static detect() {
        if (window.shopifyAppEnv) {
            return window.shopifyAppEnv.platform;
        }
        const urlEnv = this.detectFromURL();
        if (urlEnv) return urlEnv;
        const bridgeEnv = this.detectFromBridge();
        if (bridgeEnv) return bridgeEnv;
        return 'shopify_website';
    }

    static detectFromURL() {
        const params = new URLSearchParams(location.search);
        if (params.get('embedded') === 'true' && params.get('source') === 'app') {
            return params.get('platform') + '_app';
        }
        return null;
    }

    static detectFromBridge() {
        if (window.flutter_inappwebview) return 'flutter_app';
        if (window.webkit?.messageHandlers?.messageChannel) return 'ios_rn_app';
        if (window.jsBridge?.messageChannel) return 'android_rn_app';
        return null;
    }
}
const currentEnv = EnvironmentDetector.detect();
if (currentEnv.includes('app')) {
    document.body.classList.add('app-embedded');
    localStorage.setItem('orderSource', currentEnv);
} else {
    document.body.classList.add('shopify-website');
}