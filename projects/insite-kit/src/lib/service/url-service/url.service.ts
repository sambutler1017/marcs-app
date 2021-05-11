import { Injectable } from '@angular/core';
import { Environment } from '../../assets/globals';

/**
 * URL Service
 *
 * @author Sam Butler
 * @since Dec 15, 2020
 */
 @Injectable({
    providedIn: 'root',
})
export class UrlService {
  private urlPath: string;

  constructor() {
    this.urlPath = window.location.href;
  }

  /**
   * Get's the host environment
   *
   * @returns string of the host path
   */
  getHost(): string {
    if (this.urlPath.includes(Environment.PRODUCTION_PATH)) {
      return Environment.PRODUCTION_HOST;
    } 
    return Environment.LOCAL_HOST;
  }

  /**
   * Get's the web path of the url
   *
   * @returns string of the web path
   */
  getPath(): string {
    if (this.urlPath.includes(Environment.PRODUCTION_PATH)) {
      return Environment.PRODUCTION_PATH;
    } 
    return Environment.LOCAL_PATH;
  }

  /**
   * Get's the full web URL
   *
   * @returns string of the full web url
   */
  getWebUrl(): string {
    if (this.isHttps()) {
      return `https://${this.getPath()}.${Environment.HEROKU_URI}`;
    } else if (this.isLocal()) {
      return `http://${this.getPath()}`;
    }
    return `http://${this.getPath()}.${Environment.HEROKU_URI}`;
  }

  /**
   * Get's the full API URL
   *
   * @returns string of the full API url
   */
  getAPIUrl(): string {
    if (this.isHttps()) {
      return `https://${this.getHost()}.${Environment.HEROKU_URI}`;
    } else if (this.isLocal()) {
      return `http://${this.getHost()}`;
    }
    return `http://${this.getHost()}.${Environment.HEROKU_URI}`;
  }

  /**
   * Get's the socket environment
   *
   * @returns string of the socket path
   */
  getSocketPath(): string {
    const socketType = this.isHttps() ? 'wss://' : 'ws://';
    if (this.isLocal()) {
      return `${socketType}${this.getHost()}${Environment.SOCKET_ENDPOINT}`;
    }
    return `${socketType}${this.getHost()}.${Environment.HEROKU_URI}${
      Environment.SOCKET_ENDPOINT
    }`;
  }

  /**
   * Determines if the url is https or http
   *
   * @returns boolean of logical comparison
   */
  isHttps(): boolean {
    return this.urlPath.includes('https');
  }

  /**
   * Determines if the url is local
   *
   * @returns boolean of logical comparison
   */
  isLocal(): boolean {
    return this.urlPath.includes('localhost');
  }
}