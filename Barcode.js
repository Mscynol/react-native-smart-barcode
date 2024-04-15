/**
 * 二维码扫描组件
 */
import React, { Component } from 'react';
import { View, requireNativeComponent, NativeModules, AppState, Platform } from 'react-native';
import PropTypes from 'prop-types';
const BarcodeManager = Platform.OS == 'ios' ? NativeModules.RCTBarcode : NativeModules.CaptureModule;

export default class Barcode extends Component {
    static defaultProps = {
        barCodeTypes: Object.values(BarcodeManager.barCodeTypes),
        scannerRectWidth: 255,
        scannerRectHeight: 255,
        scannerRectTop: 0,
        scannerRectLeft: 0,
        scannerLineInterval: 1500,
        scannerRectCornerColor: '#357BFB'
    };

    static propTypes = {
        ...View.propTypes,
        onBarCodeRead: PropTypes.func.isRequired,
        barCodeTypes: PropTypes.array,
        scannerRectWidth: PropTypes.number,
        scannerRectHeight: PropTypes.number,
        scannerRectTop: PropTypes.number,
        scannerRectLeft: PropTypes.number,
        scannerLineInterval: PropTypes.number,
        scannerRectCornerColor: PropTypes.string
    };

    render() {
        return <NativeBarCode {...this.props} />;
    }

    componentDidMount() {
        this.changeListener = AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount() {
        this.changeListener && this.changeListener.remove();
    }

    startScan() {
        BarcodeManager.startSession();
    }

    stopScan() {
        BarcodeManager.stopSession();
    }

    _handleAppStateChange = currentAppState => {
        if (currentAppState !== 'active') {
            this.stopScan();
        } else {
            this.startScan();
        }
    };
}

const NativeBarCode = requireNativeComponent(Platform.OS === 'ios' ? 'RCTBarcode' : 'CaptureView', Barcode);
