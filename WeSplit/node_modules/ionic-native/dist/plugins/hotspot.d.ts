import { Network } from './types/network.type';
import { NetworkConfig } from './types/network-config.type';
import { ConnectionInfo } from './types/connection-info.type';
import { HotspotDevice } from './types/hotspot-device.type';
/**
 * @name Hotspot
 * @description
 * @usage
 * ```js
 * import {Hotspot, Network} from 'ionic-native';
 *
 * ...
 *     Hotspot.scanWifi().then((networks: Array<Network>) => {
 *         console.log(networks);
 *     });
 * ...
 *
 * ```
 */
export declare class Hotspot {
    static isAvailable(): Promise<boolean>;
    static toggleWifi(): Promise<boolean>;
    /**
     * Configures and starts hotspot with SSID and Password
     *
     * @param {string}    SSID        - SSID of your new Access Point
     * @param {string}    mode        - encryption mode (Open, WEP, WPA, WPA_PSK)
     * @param {string}    password    - password for your new Access Point
     *
     * @return {Promise<void>}        - Promise to call once hotspot is started, or reject upon failure
     */
    static createHotspot(ssid: string, mode: string, password: string): Promise<void>;
    /**
     * Turns on Access Point
     *
     * @return {Promise<boolean>} - true if AP is started
     */
    static startHotspot(): Promise<boolean>;
    /**
     * Configures hotspot with SSID and Password
     *
     * @param {string}    SSID        - SSID of your new Access Point
     * @param {string}    mode        - encryption mode (Open, WEP, WPA, WPA_PSK)
     * @param {string}    password    - password for your new Access Point
     *
     * @return {Promise<void>}        - Promise to call when hotspot is configured, or reject upon failure
     */
    static configureHotspot(ssid: string, mode: string, password: string): Promise<void>;
    /**
     * Turns off Access Point
     *
     * @return {Promise<boolean>} - Promise to turn off the hotspot, true on success, false on failure
     */
    static stopHotspot(): Promise<boolean>;
    /**
     * Checks if hotspot is enabled
     *
     * @return {Promise<void>}    - Promise that hotspot is enabled, rejected if it is not enabled
     */
    static isHotspotEnabled(): Promise<void>;
    static getAllHotspotDevices(): Promise<Array<HotspotDevice>>;
    /**
     * Connect to a WiFi network
     *
     * @param {string}    ssid
     *      SSID to connect
     * @param {string}    password
     *      password to use
     *
     * @return {Promise<void>}
     *      Promise that connection to the WiFi network was successfull, rejected if unsuccessful
     */
    static connectToWifi(ssid: string, password: string): Promise<void>;
    /**
     * Connect to a WiFi network
     *
     * @param {string}   ssid
     *      SSID to connect
     * @param {string}   password
     *      Password to use
     * @param {string}   authentication
     *      Authentication modes to use (LEAP, SHARED, OPEN)
     * @param {string[]} encryption
     *      Encryption modes to use (CCMP, TKIP, WEP104, WEP40)
     *
     * @return {Promise<void>}
     *      Promise that connection to the WiFi network was successfull, rejected if unsuccessful
     */
    static connectToWifiAuthEncrypt(ssid: string, password: string, authentication: string, encryption: Array<string>): Promise<void>;
    /**
     * Add a WiFi network
     *
     * @param {string}    ssid
     *      SSID of network
     * @param {string}    mode
     *      Authentication mode of (Open, WEP, WPA, WPA_PSK)
     * @param {string}    password
     *      Password for network
     *
     * @return {Promise<void>}
     *      Promise that adding the WiFi network was successfull, rejected if unsuccessful
     */
    static addWifiNetwork(ssid: string, mode: string, password: string): Promise<void>;
    /**
     * Remove a WiFi network
     *
     * @param {string}    ssid
     *      SSID of network
     *
     * @return {Promise<void>}
     *      Promise that removing the WiFi network was successfull, rejected if unsuccessful
     */
    static removeWifiNetwork(ssid: string): Promise<void>;
    static isConnectedToInternet(): Promise<boolean>;
    static isConnectedToInternetViaWifi(): Promise<boolean>;
    static isWifiOn(): Promise<boolean>;
    static isWifiSupported(): Promise<boolean>;
    static isWifiDirectSupported(): Promise<boolean>;
    static scanWifi(): Promise<Array<Network>>;
    static scanWifiByLevel(): Promise<Array<Network>>;
    static startWifiPeriodicallyScan(interval: number, duration: number): Promise<any>;
    static stopWifiPeriodicallyScan(): Promise<any>;
    static getNetConfig(): Promise<NetworkConfig>;
    static getConnectionInfo(): Promise<ConnectionInfo>;
    static pingHost(ip: string): Promise<string>;
    /**
     * Gets MAC Address associated with IP Address from ARP File
     *
     * @param {string}        ip  - IP Address that you want the MAC Address of
     *
     * @return {Promise<string>}  - A Promise for the MAC Address
     */
    static getMacAddressOfHost(ip: string): Promise<string>;
    /**
     * Checks if IP is live using DNS
     *
     * @param {string}        ip  - IP Address you want to test
     *
     * @return {Promise<boolean>} - A Promise for whether the IP Address is reachable
     */
    static isDnsLive(ip: string): Promise<boolean>;
    /**
     * Checks if IP is live using socket And PORT
     *
     * @param {string}        ip  - IP Address you want to test
     *
     * @return {Promise<boolean>} - A Promise for whether the IP Address is reachable
     */
    static isPortLive(ip: string): Promise<boolean>;
    /**
     * Checks if device is rooted
     *
     * @return {Promise<boolean>} - A Promise for whether the device is rooted
     */
    static isRooted(): Promise<boolean>;
}
