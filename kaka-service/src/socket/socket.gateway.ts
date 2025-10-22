import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface CustomSocket extends Socket {
  data: {
    user: string;
  };
}

interface CalleeMessage {
  callerId: string;
  rtcMessage: Record<string, unknown>;
}

interface CallerMessage {
  calleeId: string;
  rtcMessage: Record<string, unknown>;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: CustomSocket) {
    const callerId = client.handshake.query.callerId as string;
    if (callerId) {
      client.data.user = callerId;
      void client.join(callerId);
      console.log(callerId, 'Connected successfully');
    } else {
      console.log('Connection failed: No callerId provided');
    }
  }

  handleDisconnect(client: CustomSocket) {
    console.log(client.data.user, 'Disconnected');
  }

  @SubscribeMessage('call')
  handleCall(client: CustomSocket, data: CallerMessage) {
    const { calleeId, rtcMessage } = data;
    console.log('call data', data);
    client.to(calleeId).emit('newCall', {
      callerId: client.data.user,
      rtcMessage,
    });
  }

  @SubscribeMessage('answerCall')
  handleAnswerCall(client: CustomSocket, data: CalleeMessage) {
    const { callerId, rtcMessage } = data;
    client.to(callerId).emit('callAnswered', {
      calleeId: client.data.user,
      rtcMessage,
    });
  }

  @SubscribeMessage('ICEcandidate')
  handleICECandidate(client: CustomSocket, data: CallerMessage) {
    const { calleeId, rtcMessage } = data;
    console.log('ICEcandidate data.calleeId', calleeId);
    client.to(calleeId).emit('ICEcandidate', {
      callerId: client.data.user,
      rtcMessage,
    });
  }
}
