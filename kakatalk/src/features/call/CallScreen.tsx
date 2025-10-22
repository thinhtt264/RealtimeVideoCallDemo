/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import TextInputContainer from './TextInputContainer';
import useCallHandler from '@/hooks/call/useCallHandler';
import { LAYOUTS, resWidth } from '@/utils';
import { RTCView } from 'react-native-webrtc';
import { useRoute, RouteProp } from '@react-navigation/native';
import { AppStackParamList, ScreenNames } from '@/navigation';

// type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

type CallType =
  | 'JOIN'
  | 'INCOMING_CALL'
  | 'OUTGOING_CALL'
  | 'CALL_ENDED'
  | 'CALL_ROOM';

const CallScreen: React.FC = () => {
  const route = useRoute<RouteProp<AppStackParamList, ScreenNames.Call>>();
  const { url } = route.params;

  const [type, setType] = useState<CallType>('JOIN');
  const [myId] = useState(
    Math.floor(100000 + Math.random() * 900000).toString(),
  );
  const otherUserId = useRef<string | null>(null);

  const onIncomingCall = useCallback((callerId: string) => {
    setType('INCOMING_CALL');

    otherUserId.current = callerId;
  }, []);

  const onAnsweredCall = useCallback(() => {
    setType('CALL_ROOM');
  }, []);

  const { sendCall, acceptCall, cancelCall, localMediaStream, remoteStream } =
    useCallHandler({
      myId,
      url,
      onIncomingCall,
      onAnsweredCall,
    });

  const onAnswerCall = useCallback(() => {
    if (!otherUserId?.current) {
      Alert.alert('Please enter a valid caller id');
      return;
    }

    acceptCall(otherUserId.current);
    setType('CALL_ROOM');
  }, [otherUserId, acceptCall]);

  const onOutgoingCall = useCallback(() => {
    if (!otherUserId?.current) {
      Alert.alert('Please enter a valid caller id');
      return;
    }

    sendCall(otherUserId.current);

    setType('OUTGOING_CALL');
  }, [otherUserId, sendCall]);

  const onCancelCall = useCallback(() => {
    cancelCall();
    setType('JOIN');
  }, [cancelCall]);

  const JoinScreen = useCallback(() => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          flex: 1,
          backgroundColor: '#050A0E',
          justifyContent: 'center',
          paddingHorizontal: 42,
        }}>
        <>
          <View
            style={{
              padding: 35,
              backgroundColor: '#1A1C22',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 14,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#D0D4DD',
              }}>
              Your Caller ID
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 32,
                  color: '#ffff',
                  letterSpacing: 6,
                }}>
                {myId}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#1A1C22',
              padding: 40,
              marginTop: 25,
              justifyContent: 'center',
              borderRadius: 14,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#D0D4DD',
              }}>
              Enter call id of another user
            </Text>
            <TextInputContainer
              placeholder={'Enter Caller ID'}
              value={otherUserId.current}
              setValue={(text: null) => {
                otherUserId.current = text;
              }}
              keyboardType={'number-pad'}
            />
            <TouchableOpacity
              onPress={onOutgoingCall}
              style={{
                height: 50,
                backgroundColor: '#5568FE',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 16,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                }}>
                Call Now
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    );
  }, [myId, onOutgoingCall]);

  const OutgoingCallScreen = useCallback(() => {
    return (
      <View
        style={[
          LAYOUTS.colBetween,
          LAYOUTS.fill,
          { paddingVertical: resWidth(50) },
        ]}>
        <Text style={{ textAlign: 'center' }}>
          Calling to {otherUserId.current}
        </Text>
        <Button title="Cancel" onPress={() => setType('JOIN')} />
      </View>
    );
  }, [otherUserId]);

  const IncomingCallScreen = useCallback(() => {
    const onRejectCall = () => {
      otherUserId.current = null;
      setType('JOIN');
    };

    return (
      <View
        style={[
          LAYOUTS.colBetween,
          LAYOUTS.fill,
          { paddingVertical: resWidth(50) },
        ]}>
        <Text style={{ textAlign: 'center' }}>
          Calling to {otherUserId.current}
        </Text>
        <Button title="Accept" onPress={onAnswerCall} />
        <Button title="Reject" onPress={onRejectCall} />
      </View>
    );
  }, [onAnswerCall]);

  const CallRoomScreen = useCallback(() => {
    if (!localMediaStream) {
      return (
        <View style={[LAYOUTS.fill, LAYOUTS.center]}>
          <Text style={{ color: '#FFFFFF' }}>Đang khởi tạo camera...</Text>
          <Button title="Quay lại" onPress={onCancelCall} />
        </View>
      );
    }

    console.log('remoteStream', remoteStream);

    console.log(remoteStream?.toURL());

    return (
      <View style={[LAYOUTS.fill, { backgroundColor: '#050A0E' }]}>
        {/* Local Media Stream */}
        <RTCView
          mirror={true}
          objectFit="cover"
          streamURL={localMediaStream.toURL()}
          zOrder={0}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#050A0E',
          }}
        />

        {/* Remote Media Stream - Will be shown when available */}
        {remoteStream && (
          <RTCView
            mirror={false}
            objectFit="cover"
            streamURL={remoteStream.toURL()}
            zOrder={1}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              backgroundColor: '#050A0E',
            }}
          />
        )}

        {/* Controls */}
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            width: '100%',
            alignItems: 'center',
          }}>
          <Button title="Cancel" onPress={onCancelCall} />
        </View>
      </View>
    );
  }, [onCancelCall, localMediaStream, remoteStream]);

  switch (type) {
    case 'JOIN':
      return JoinScreen();
    case 'INCOMING_CALL':
      return IncomingCallScreen();
    case 'OUTGOING_CALL':
      return OutgoingCallScreen();
    case 'CALL_ROOM':
      return CallRoomScreen();
    default:
      return null;
  }
};

export default CallScreen;
