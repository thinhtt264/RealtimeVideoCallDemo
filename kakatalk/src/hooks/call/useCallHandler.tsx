/* eslint-disable @typescript-eslint/no-unused-vars */
// import WebRTC
import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import { useEffect, useRef, useCallback } from 'react';
import { useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Alert, Platform } from 'react-native';
import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';
import RTCTrackEvent from 'react-native-webrtc/lib/typescript/RTCTrackEvent';
import DeviceInfo from 'react-native-device-info';
interface CalleeEvent {
  calleeId: string;
  rtcMessage: RTCSessionDescriptionInit;
}

interface CallerEvent {
  callerId: string;
  rtcMessage: RTCSessionDescriptionInit;
}

interface ReturnType {
  sendCall: (calleeId: string) => void;
  acceptCall: (callerId: string) => void;
  cancelCall: () => void;
  localMediaStream: MediaStream | null;
  remoteStream: MediaStream | null;
}

interface CallHandlerProps {
  myId: string;
  url: string;
  onIncomingCall: (callerId: string) => void;
  onAnsweredCall: () => void;
}

const isVoiceOnly = false;

const mediaConstraints = {
  audio: true,
  video: true,
};

const sessionConstraints = {
  mandatory: {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true,
    VoiceActivityDetection: true,
  },
};

const getSocketHost = async () => {
  const isEmulator = await DeviceInfo.isEmulator();
  if (Platform.OS === 'android' && isEmulator) {
    return 'http://10.0.2.2:3000';
  }

  return 'https://afd5-14-169-26-252.ngrok-free.app';
};

const useCallHandler = ({
  myId,
  url,
  onIncomingCall,
  onAnsweredCall,
}: CallHandlerProps): ReturnType => {
  // Stream of local user
  const [localStream, setlocalStream] = useState(null);
  /* When a call is connected, the video stream from the receiver is appended to this state in the stream*/
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const remoteMediaStreamRef = useRef<MediaStream | null>(null);

  const targetUserId = useRef('');
  const [localMediaStream, setLocalMediaStream] = useState<MediaStream | null>(
    null,
  );

  // Determine the correct host based on platform
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize local media stream when component mounts
  useEffect(() => {
    getMediaStream();
  }, []);

  useEffect(() => {
    const initSocket = async () => {
      const SOCKET_HOST = url;
      const newSocket = io(SOCKET_HOST, {
        transports: ['websocket'],
        query: {
          callerId: myId,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });
      setSocket(newSocket);
    };
    initSocket();
  }, [myId]);

  /* This creates an WebRTC Peer Connection, which will be used to set local/remote descriptions and offers. */
  const peerConnection = useRef(
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
        {
          urls: 'stun:stun2.l.google.com:19302',
        },
      ],
    }),
  );

  async function sendCall(calleeId: string) {
    if (!socket) {
      console.error('Socket not initialized');
      return;
    }

    targetUserId.current = calleeId;

    // Add local tracks to peer connection
    if (localMediaStream) {
      localMediaStream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, localMediaStream);
      });
    }

    // 1. Alice runs the `createOffer` method for getting SDP.
    const sessionDescription =
      await peerConnection.current.createOffer(sessionConstraints);
    // 2. Alice sets the local description using `setLocalDescription`.
    await peerConnection.current.setLocalDescription(sessionDescription);
    // 3. Send this session description to Bob uisng socket
    const callData = {
      calleeId: calleeId,
      rtcMessage: sessionDescription,
    };
    socket.emit('call', callData);
  }

  const onReceivedCall = useCallback(
    async (data: CallerEvent) => {
      // try {
      console.log('Received new call request:', data);

      // 4. Bob sets the description, Alice sent him as the remote description using `setRemoteDescription()`
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.rtcMessage),
      );

      onIncomingCall(data.callerId);

      targetUserId.current = data.callerId;
      // } catch (error) {
      //   console.error('Error onReceivedCall:', error);
      // }
    },
    [onIncomingCall],
  );

  async function acceptCall(callerId: string) {
    if (!socket) {
      console.error('Socket not initialized');
      return;
    }

    // Add local tracks to peer connection
    if (localMediaStream) {
      localMediaStream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, localMediaStream);
      });
    }

    // 5. Bob runs the `createAnswer` method
    const sessionDescription = await peerConnection.current.createAnswer();
    // 6. Bob sets that as the local description and sends it to Alice
    await peerConnection.current.setLocalDescription(sessionDescription);

    const answerData = {
      callerId: callerId,
      rtcMessage: sessionDescription,
    };

    socket.emit('answerCall', answerData);
  }

  const onAcceptedCall = useCallback(
    (data: CalleeEvent) => {
      if (!socket) {
        console.error('Socket not initialized');
        return;
      }

      // 7. Alice sets the description from Bob as the remote description using `setRemoteDescription()`
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.rtcMessage),
      );

      onAnsweredCall();
    },
    [socket, onAnsweredCall],
  );

  const getAvailableMediaDevices = async () => {
    try {
      const devices = (await mediaDevices.enumerateDevices()) as any;

      devices.map((device: { kind: string }) => {
        if (device.kind !== 'videoinput') {
          return;
        }
      });
    } catch (err) {
      // Handle Error
    }
  };

  const getMediaStream = async () => {
    try {
      console.log('Getting media stream...');
      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);
      console.log('Media stream obtained successfully');
      console.log(
        'Stream tracks:',
        mediaStream.getTracks().map(track => ({
          kind: track.kind,
          enabled: track.enabled,
          readyState: track.readyState,
        })),
      );

      if (isVoiceOnly) {
        const videoTrack = await mediaStream.getVideoTracks()[0];
        videoTrack.enabled = false;
      }

      setLocalMediaStream(mediaStream);
    } catch (err) {
      console.error('Error getting media stream:', err);
      Alert.alert(
        'Lỗi',
        'Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera của ứng dụng.',
      );
    }
  };

  const getDisplayMedia = async () => {
    try {
      const mediaStream = await mediaDevices.getDisplayMedia();
      setLocalMediaStream(mediaStream);

      if (localMediaStream !== null) {
        localMediaStream.getTracks().forEach(track => {
          if (localMediaStream) {
            peerConnection.current.addTrack(track, localMediaStream);
          }
        });
      }
    } catch (err) {
      console.error('Error getting display media:', err);
      // Handle Error
    }
  };

  const cancelCall = useCallback(() => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect_error', (error: Error) => {
      console.log('Socket host ', socket);
      console.error(error);
    });

    socket.on('connect_timeout', (timeout: number) => {
      console.error('Socket connection timeout:', timeout);
    });

    socket.on('disconnect', (reason: string) => {
      console.log('Socket disconnected. Reason:', reason);
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully. Socket ID:', socket.id);
    });

    socket.on('newCall', (data: CallerEvent) => {
      console.log('Received new call request:', data);
      onReceivedCall(data);
    });

    socket.on('callAnswered', (data: CalleeEvent) => {
      console.log('Call was answered:', data);
      onAcceptedCall(data);
    });

    socket.on('ICEcandidate', data => {
      console.log('Received ICE candidate:', data);

      peerConnection?.current
        .addIceCandidate(new RTCIceCandidate(data.rtcMessage))
        .then(data => {
          console.log('SUCCESS');
        })
        .catch(err => {
          console.log('Error', err);
        });
    });

    peerConnection.current.addEventListener('connectionstatechange', data => {
      console.log('connectionstatechange:', data);
    });

    peerConnection.current.addEventListener('icecandidate', event => {
      if (!event.candidate) {
        return;
      }
      socket.emit('ICEcandidate', {
        calleeId: targetUserId.current,
        rtcMessage: event.candidate,
      });
    });
    peerConnection.current.addEventListener('icecandidateerror', event => {
      console.log('icecandidateerror:', event);
    });
    peerConnection.current.addEventListener(
      'iceconnectionstatechange',
      event => {
        console.log('iceconnectionstatechange:', event);
      },
    );
    peerConnection.current.addEventListener(
      'icegatheringstatechange',
      event => {
        console.log('icegatheringstatechange:', event);
      },
    );
    peerConnection.current.addEventListener('negotiationneeded', event => {});
    peerConnection.current.addEventListener(
      'signalingstatechange',
      event => {},
    );
    peerConnection.current.addEventListener(
      'track',
      (event: RTCTrackEvent<any>) => {
        if (!event.track) {
          console.log('No event');
          return;
        }

        const newStream = remoteStream ? remoteStream : new MediaStream();
        newStream.addTrack(event.track);
        setRemoteStream(newStream);
      },
    );

    return () => {
      socket.off('newCall');
      socket.off('callAnswered');
      socket.off('ICEcandidate');
      socket.off('connect');
      socket.off('connect_error');
      socket.off('connect_timeout');
      socket.off('disconnect');
      if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
      }
      if (localMediaStream) {
        localMediaStream.getTracks().forEach(track => track.stop());
      }
      setRemoteStream(null);
      setLocalMediaStream(null);
    };
  }, [socket]);
  return { sendCall, acceptCall, cancelCall, localMediaStream, remoteStream };
};

export default useCallHandler;
