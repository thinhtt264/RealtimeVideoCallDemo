import { Button, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { ScreenNames } from '@/navigation';
import { LAYOUTS, navigateScreen } from '@/utils';
import { Container } from '@/components';

const HomeScreen = () => {
  const [url, setUrl] = useState('https://afd5-14-169-26-252.ngrok-free.app');

  const onCalling = () => {
    if (!url) return;
    navigateScreen(ScreenNames.Call, { url });
  };

  return (
    <Container style={LAYOUTS.center}>
      <TextInput
        placeholder="server url"
        multiline
        onChangeText={value => setUrl(value)}
        style={{ borderWidth: 1 }}
      />
      <Button title="Go Call Screen" onPress={onCalling} />
    </Container>
  );
};

export default HomeScreen;
