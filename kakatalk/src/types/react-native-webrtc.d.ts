// declare module 'react-native-webrtc' {
//   export class RTCPeerConnection {
//     constructor(configuration: RTCConfiguration);
//     addEventListener(event: string, listener: (event: any) => void): void;
//     removeEventListener(event: string, listener: (event: any) => void): void;
//     addTrack(track: MediaStreamTrack, stream: MediaStream): void;
//     createOffer(): Promise<RTCSessionDescription>;
//     createAnswer(): Promise<RTCSessionDescription>;
//     setLocalDescription(description: RTCSessionDescription): Promise<void>;
//     setRemoteDescription(description: RTCSessionDescription): Promise<void>;
//     close(): void;
//     connectionState: string;
//   }

//   export class MediaStream {
//     getVideoTracks() {
//       throw new Error('Method not implemented.');
//     }
//     constructor();
//     getTracks(): MediaStreamTrack[];
//     toURL(): string;
//   }

//   export class MediaStreamTrack {
//     stop(): void;
//     enabled: boolean;
//   }

//   export const mediaDevices: {
//     getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
//   };

//   export interface RTCConfiguration {
//     iceServers: RTCIceServer[];
//   }

//   export interface RTCIceServer {
//     urls: string | string[];
//   }

//   export interface MediaStreamConstraints {
//     audio?: boolean;
//     video?: boolean | MediaTrackConstraints;
//   }

//   export interface MediaTrackConstraints {
//     width?: number;
//     height?: number;
//     facingMode?: string;
//   }

//   export class RTCSessionDescription {
//     constructor(descriptionInitDict: RTCSessionDescriptionInit);
//     type: RTCSdpType;
//     sdp: string;
//   }

//   export type RTCSdpType = 'offer' | 'answer' | 'pranswer' | 'rollback';
// }
