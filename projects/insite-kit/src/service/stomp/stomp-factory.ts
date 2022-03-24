import { StompWebSocketService } from './stomp-websocket.service';
import { webSocketStompConfig } from './stomp.config';

export function StompServiceFactory() {
  const rxStomp = new StompWebSocketService();
  rxStomp.configure(webSocketStompConfig);
  rxStomp.activate();
  return rxStomp;
}
