import { RxStompConfig } from '@stomp/rx-stomp';
import { UrlService } from '../url-service/url.service';

const urlService: UrlService = new UrlService();

export const webSocketStompConfig: RxStompConfig = {
  // Which server?
  brokerURL: urlService.getSocketAPIUrl(),
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 500,
};
