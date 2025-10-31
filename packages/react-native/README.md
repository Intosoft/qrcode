# @intosoft/qrcode-react-native

React Native helper for [@intosoft/qrcode](../README.md) with native SVG rendering, hooks, and mobile-optimized components.

## Installation

```bash
npm install @intosoft/qrcode @intosoft/qrcode-react-native react-native-svg
```

### Additional Setup

For React Native SVG support:

```bash
# iOS
cd ios && pod install

# Android - no additional setup required
```

## Features

- 📱 **Native SVG Rendering** - Optimized for mobile performance
- 🎣 **React Hooks** - `useQRCode`, `useQRCodeShare` for reactive QR codes
- 🖼️ **Logo Support** - Overlay images with automatic sizing
- 📤 **Share Integration** - Built-in sharing functionality
- ⚡ **Async Loading** - Non-blocking QR code generation
- 🎨 **Customizable Styling** - Full control over appearance
- 📱 **Cross-Platform** - Works on iOS and Android

## Quick Start

### Basic Component

```tsx
import React from 'react';
import { View } from 'react-native';
import { QRCode } from '@intosoft/qrcode-react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode
        text="Hello World!"
        width={200}
        height={200}
        eyeFrameShape="circle"
      />
    </View>
  );
}
```

### With Logo

```tsx
import { QRCode } from '@intosoft/qrcode-react-native';

<QRCode
  text="https://example.com"
  width={250}
  height={250}
  logoSource={require('./assets/logo.png')}
  logoSize={0.2}
  logoStyle={{ borderRadius: 10 }}
  eyeFrameShape="rounded"
  bodyShape="circle"
/>
```

### Using Hooks

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { SvgFromXml } from 'react-native-svg';
import { useQRCode, useQRCodeShare } from '@intosoft/qrcode-react-native';

function MyComponent() {
  const { svgString, isLoading, error, regenerate } = useQRCode('Hello World!', {
    width: 200,
    height: 200,
    eyeFrameShape: 'circle'
  });

  const { shareQRCode, isSharing } = useQRCodeShare('Hello World!', {
    width: 300,
    height: 300
  });

  if (isLoading) return <Text>Loading QR Code...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <SvgFromXml xml={svgString} />
      <Button 
        title={isSharing ? "Sharing..." : "Share QR Code"}
        onPress={() => shareQRCode({ title: 'My QR Code' })}
        disabled={isSharing}
      />
      <Button title="Regenerate" onPress={regenerate} />
    </View>
  );
}
```

## API Reference

### QRCode Component

A React Native component for displaying QR codes with SVG rendering.

**Props:**
```typescript
interface QRCodeProps extends ConfigInput {
  text: string;                          // Text content to encode
  style?: ViewStyle;                     // Container style
  svgStyle?: ViewStyle;                  // SVG style
  logoSource?: string | number;          // Logo image source
  logoSize?: number;                     // Logo size factor (0-1)
  logoStyle?: ViewStyle;                 // Logo style
  loadingComponent?: React.ReactNode;    // Custom loading component
  errorComponent?: React.ReactNode;      // Custom error component
  onError?: (error: Error) => void;      // Error callback
  onSuccess?: (svgString: string) => void; // Success callback
}
```

**Examples:**
```tsx
// Basic QR Code
<QRCode text="Hello World!" width={200} height={200} />

// With custom styling
<QRCode
  text="https://example.com"
  width={250}
  height={250}
  style={{
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10
  }}
  svgStyle={{
    transform: [{ rotate: '45deg' }]
  }}
/>

// With logo and callbacks
<QRCode
  text="Brand QR Code"
  width={300}
  height={300}
  logoSource={require('./logo.png')}
  logoSize={0.15}
  logoStyle={{
    borderRadius: 25,
    backgroundColor: 'white'
  }}
  onSuccess={(svg) => console.log('QR generated:', svg.length)}
  onError={(error) => console.error('QR error:', error)}
  loadingComponent={<ActivityIndicator size="large" />}
  errorComponent={<Text style={{color: 'red'}}>Failed to load QR</Text>}
/>
```

### useQRCode Hook

Hook for generating QR codes with reactive updates.

**Signature:**
```typescript
function useQRCode(text: string, options?: ConfigInput): {
  svgString: string;
  isLoading: boolean;
  error: Error | null;
  regenerate: () => Promise<void>;
}
```

**Example:**
```tsx
function QRDisplay({ url }) {
  const { svgString, isLoading, error } = useQRCode(url, {
    width: 200,
    height: 200,
    eyeFrameShape: 'circle',
    gradient: {
      type: 'linear',
      colors: ['#FF6B6B', '#4ECDC4']
    }
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return <SvgFromXml xml={svgString} />;
}
```

### useQRCodeShare Hook

Hook for sharing QR codes using React Native's Share API.

**Signature:**
```typescript
function useQRCodeShare(text: string, options?: ConfigInput): {
  shareQRCode: (shareOptions?: ShareOptions) => Promise<void>;
  isSharing: boolean;
  error: Error | null;
}

interface ShareOptions {
  title?: string;
  message?: string;
  subject?: string;
}
```

**Example:**
```tsx
function ShareableQR({ content }) {
  const { shareQRCode, isSharing, error } = useQRCodeShare(content, {
    width: 400,
    height: 400
  });

  const handleShare = () => {
    shareQRCode({
      title: 'Check out this QR code!',
      message: `Scan this QR code: ${content}`
    });
  };

  return (
    <View>
      <QRCode text={content} width={200} height={200} />
      <Button 
        title={isSharing ? "Sharing..." : "Share"}
        onPress={handleShare}
        disabled={isSharing}
      />
      {error && <Text>Share failed: {error.message}</Text>}
    </View>
  );
}
```

### Utility Functions

#### generateQRCodeForReactNative

Generate QR code SVG string optimized for React Native.

```typescript
async function generateQRCodeForReactNative(
  text: string,
  options?: ConfigInput
): Promise<string>
```

**Example:**
```tsx
const generateAndCache = async () => {
  const svg = await generateQRCodeForReactNative('Cache this!', {
    width: 300,
    height: 300
  });
  // Store in AsyncStorage or cache
  await AsyncStorage.setItem('qr_cache', svg);
};
```

#### saveQRCodeToFile

Save QR code to device storage (requires additional setup).

```typescript
async function saveQRCodeToFile(
  text: string,
  fileName: string,
  options?: ConfigInput
): Promise<string>
```

**Note:** This function requires additional setup with `react-native-fs` or similar file system library.

## Complete Examples

### QR Code Scanner & Generator App

```tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { QRCode, useQRCodeShare } from '@intosoft/qrcode-react-native';

export default function QRApp() {
  const [text, setText] = useState('');
  const [qrCodes, setQrCodes] = useState([]);

  const addQRCode = () => {
    if (text.trim()) {
      setQrCodes(prev => [...prev, { id: Date.now(), text: text.trim() }]);
      setText('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputSection}>
        <Text style={styles.title}>QR Code Generator</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter text for QR code"
          multiline
        />
        <Button title="Generate QR Code" onPress={addQRCode} />
      </View>

      <View style={styles.qrList}>
        {qrCodes.map(qr => (
          <QRCodeItem key={qr.id} qr={qr} />
        ))}
      </View>
    </ScrollView>
  );
}

function QRCodeItem({ qr }) {
  const { shareQRCode, isSharing } = useQRCodeShare(qr.text, {
    width: 200,
    height: 200
  });

  const handleShare = () => {
    shareQRCode({
      title: 'QR Code',
      message: `QR Code content: ${qr.text}`
    }).catch(error => {
      Alert.alert('Share Failed', error.message);
    });
  };

  return (
    <View style={styles.qrItem}>
      <Text style={styles.qrText}>{qr.text}</Text>
      <QRCode
        text={qr.text}
        width={150}
        height={150}
        style={styles.qrCode}
        eyeFrameShape="rounded"
        loadingComponent={<Text>Generating...</Text>}
        errorComponent={<Text style={styles.error}>Failed to generate</Text>}
      />
      <Button 
        title={isSharing ? "Sharing..." : "Share"}
        onPress={handleShare}
        disabled={isSharing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 40,
  },
  qrList: {
    padding: 10,
  },
  qrItem: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  qrText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  qrCode: {
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});
```

### Business Card QR Generator

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { QRCode } from '@intosoft/qrcode-react-native';

export default function BusinessCardQR() {
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    website: ''
  });

  // Generate vCard format
  const generateVCard = () => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:${contact.company}
TEL:${contact.phone}
EMAIL:${contact.email}
URL:${contact.website}
END:VCARD`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Card QR Generator</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={contact.name}
        onChangeText={(text) => setContact(prev => ({...prev, name: text}))}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={contact.phone}
        onChangeText={(text) => setContact(prev => ({...prev, phone: text}))}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={contact.email}
        onChangeText={(text) => setContact(prev => ({...prev, email: text}))}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={contact.company}
        onChangeText={(text) => setContact(prev => ({...prev, company: text}))}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Website"
        value={contact.website}
        onChangeText={(text) => setContact(prev => ({...prev, website: text}))}
      />

      {contact.name && (
        <View style={styles.qrContainer}>
          <QRCode
            text={generateVCard()}
            width={250}
            height={250}
            logoSource={require('./assets/business-logo.png')}
            logoSize={0.15}
            eyeFrameShape="rounded"
            bodyShape="circle"
            gradient={{
              type: 'linear',
              colors: ['#667eea', '#764ba2']
            }}
          />
          <Text style={styles.instruction}>
            Scan to add contact information
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
  },
  instruction: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
```

## Configuration

All QR code options from the core library are supported:

- **Dimensions**: `width`, `height`
- **Shapes**: `eyeFrameShape`, `eyeballShape`, `bodyShape`
- **Colors**: `gradient`, solid colors
- **Logo**: Image overlays with sizing and positioning
- **Error Correction**: Multiple levels supported

## Performance Tips

1. **Memoize static QR codes**: Use `useMemo` for QR codes that don't change
2. **Optimize images**: Use appropriately sized logo images
3. **Lazy loading**: Generate QR codes only when needed
4. **Cache results**: Store generated SVGs in AsyncStorage for reuse

## Platform Considerations

### iOS
- SVG rendering is fully supported
- Share functionality works with all apps
- File saving requires additional permissions

### Android
- SVG rendering requires Android 5.0+
- Share functionality integrated with Android Share Sheet
- File saving may require storage permissions

## Troubleshooting

### Common Issues

1. **SVG not rendering**: Ensure `react-native-svg` is properly installed and linked
2. **Share not working**: Check that Share API is available on the platform
3. **Performance issues**: Reduce QR code size or simplify design

### Error Handling

```tsx
<QRCode
  text="Hello World!"
  width={200}
  height={200}
  onError={(error) => {
    console.error('QR Code Error:', error);
    // Report to crash analytics
  }}
  errorComponent={
    <View style={styles.errorContainer}>
      <Text>Failed to generate QR code</Text>
      <Button title="Retry" onPress={regenerate} />
    </View>
  }
/>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { 
  QRCode, 
  useQRCode, 
  useQRCodeShare,
  type QRCodeProps 
} from '@intosoft/qrcode-react-native';
```

## License

MIT - See [LICENSE](../../LICENSE) file for details.
