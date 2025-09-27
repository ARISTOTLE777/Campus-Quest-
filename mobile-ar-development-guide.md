# CampusQuest AR Mobile App Development Guide

## Overview
This guide outlines the development of a native mobile AR application for CampusQuest at Rishihood University Delhi NCR, building on the web prototype.

## Technical Architecture

### Platform Options
1. **React Native with AR.js/WebXR**
   - Cross-platform development
   - Web-based AR capabilities
   - Easier maintenance and updates
   - Good performance for marker-based AR

2. **Flutter with ARCore/ARKit**
   - Native performance
   - Advanced AR capabilities
   - Single codebase for both platforms
   - Better hardware integration

3. **Native Development**
   - **Android**: ARCore with Java/Kotlin
   - **iOS**: ARKit with Swift/Objective-C
   - Maximum performance and feature access
   - Platform-specific optimizations

## AR Implementation Strategy

### Marker-Based AR (Recommended for MVP)
```javascript
// QR Code/Marker detection for campus locations
const campusMarkers = {
  'library_marker': {
    location: 'B Block Library',
    qr_code: 'RISHIHOOD_LIBRARY_2024',
    unlock_questions: [1, 2, 3]
  },
  'auditorium_marker': {
    location: 'Main Auditorium',
    qr_code: 'RISHIHOOD_AUDITORIUM_2024',
    unlock_questions: [4, 5, 6]
  },
  'reception_marker': {
    location: 'C Block Reception',
    qr_code: 'RISHIHOOD_RECEPTION_2024',
    unlock_questions: [7, 8, 9]
  }
};
```

### Location-Based AR (Advanced Feature)
```javascript
// GPS coordinates for campus locations
const campusCoordinates = {
  library: { lat: 28.4595, lng: 77.0266, altitude: 220 },
  auditorium: { lat: 28.4596, lng: 77.0267, altitude: 218 },
  reception: { lat: 28.4594, lng: 77.0265, altitude: 219 }
};
```

## Mobile App Structure

### 1. React Native Implementation

#### Package.json Dependencies
```json
{
  "dependencies": {
    "react-native": "^0.72.0",
    "react-native-camera": "^4.2.1",
    "react-native-qr-scanner": "^1.6.1",
    "react-native-ar": "^2.3.0",
    "react-navigation": "^6.0.0",
    "react-native-vector-icons": "^9.2.0",
    "react-native-linear-gradient": "^2.8.1",
    "react-native-haptic-feedback": "^2.0.3",
    "react-native-sound": "^0.11.2",
    "@react-native-async-storage/async-storage": "^1.19.0"
  }
}
```

#### Main App Component
```jsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, StatusBar } from 'react-native';

import MapScreen from './screens/MapScreen';
import ARScanner from './screens/ARScanner';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#E68361" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#E68361',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen name="Campus" component={MapScreen} />
        <Tab.Screen name="AR Scan" component={ARScanner} />
        <Tab.Screen name="Progress" component={ProgressScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

#### AR Scanner Component
```jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qr-scanner';

export default function ARScanner({ navigation }) {
  const [scanning, setScanning] = useState(true);
  const [detectedLocation, setDetectedLocation] = useState(null);

  const onQRRead = (data) => {
    if (campusMarkers[data.data]) {
      setDetectedLocation(campusMarkers[data.data]);
      setScanning(false);
      
      // Haptic feedback
      HapticFeedback.impact(HapticFeedback.ImpactFeedbackStyle.Medium);
      
      // Navigate to quiz
      navigation.navigate('Quiz', { 
        location: campusMarkers[data.data] 
      });
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onQRRead}
        showMarker={true}
        markerStyle={styles.marker}
        cameraStyle={styles.camera}
      />
      
      {/* AR Overlay */}
      <View style={styles.overlay}>
        <View style={styles.crosshair} />
        <Text style={styles.instruction}>
          Point camera at campus locations to discover quests
        </Text>
      </View>
    </View>
  );
}
```

### 2. Flutter Implementation

#### Main App Structure
```dart
import 'package:flutter/material.dart';
import 'package:ar_flutter_plugin/ar_flutter_plugin.dart';

void main() {
  runApp(CampusQuestAR());
}

class CampusQuestAR extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CampusQuest AR',
      theme: ThemeData(
        primaryColor: Color(0xFFE68361),
        accentColor: Color(0xFFC0152F),
      ),
      home: ARCampusScreen(),
    );
  }
}

class ARCampusScreen extends StatefulWidget {
  @override
  _ARCampusScreenState createState() => _ARCampusScreenState();
}

class _ARCampusScreenState extends State<ARCampusScreen> {
  ARSessionManager? arSessionManager;
  ARObjectManager? arObjectManager;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ARView(
        onARViewCreated: onARViewCreated,
        planeDetectionConfig: PlaneDetectionConfig.horizontal,
      ),
    );
  }

  void onARViewCreated(ARSessionManager manager, ARObjectManager objectManager) {
    this.arSessionManager = manager;
    this.arObjectManager = objectManager;
    
    // Add campus location markers
    addCampusMarkers();
  }

  void addCampusMarkers() {
    // Add 3D markers for each campus location
    campusLocations.forEach((location) {
      final marker = ARNode(
        type: NodeType.localGLTF2,
        uri: "assets/models/campus_pin.gltf",
        scale: Vector3(0.1, 0.1, 0.1),
        position: location.position,
      );
      
      arObjectManager?.addNode(marker);
    });
  }
}
```

## AR Features Implementation

### 1. QR Code Campus Markers
```javascript
// Generate unique QR codes for each campus location
const generateCampusQR = (locationId, locationName) => {
  const qrData = {
    university: 'rishihood',
    location: locationId,
    name: locationName,
    timestamp: Date.now()
  };
  return JSON.stringify(qrData);
};

// QR codes to be placed at physical campus locations
const campusQRCodes = {
  library: generateCampusQR(1, 'library'),
  auditorium: generateCampusQR(2, 'auditorium'),
  reception: generateCampusQR(3, 'reception'),
  mess_a: generateCampusQR(4, 'a_block_mess'),
  pushpa_devi: generateCampusQR(5, 'pushpa_devi_mess'),
  r2_residence: generateCampusQR(6, 'r2_residence'),
  r1_residence: generateCampusQR(7, 'r1_residence')
};
```

### 2. 3D Campus Visualization
```javascript
// 3D model integration for campus buildings
const campus3DModels = {
  library: {
    model: 'assets/models/b_block_library.glb',
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    animation: 'floating'
  },
  auditorium: {
    model: 'assets/models/auditorium.glb',
    scale: [1.2, 1.2, 1.2],
    rotation: [0, 45, 0],
    animation: 'pulse'
  }
};
```

### 3. GPS-Based Location Tracking
```javascript
// Location-based AR for outdoor campus navigation
const getCampusDistance = (userLocation, targetLocation) => {
  const R = 6371; // Earth's radius in km
  const dLat = (targetLocation.lat - userLocation.lat) * Math.PI / 180;
  const dLng = (targetLocation.lng - userLocation.lng) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(userLocation.lat * Math.PI / 180) * 
    Math.cos(targetLocation.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c * 1000; // Distance in meters
  
  return distance;
};
```

## Enhanced Mobile Features

### 1. Haptic Feedback
```javascript
import { HapticFeedback } from 'react-native-haptic-feedback';

const triggerHaptic = (type) => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  switch (type) {
    case 'success':
      HapticFeedback.impact(HapticFeedback.ImpactFeedbackStyle.Heavy, options);
      break;
    case 'error':
      HapticFeedback.notificationAsync(HapticFeedback.NotificationFeedbackType.Error);
      break;
    case 'scan':
      HapticFeedback.impact(HapticFeedback.ImpactFeedbackStyle.Light, options);
      break;
  }
};
```

### 2. Push Notifications
```javascript
import PushNotification from 'react-native-push-notification';

const scheduleLocationNotification = (locationName, distance) => {
  PushNotification.localNotification({
    title: 'New Campus Location Discovered!',
    message: `You're near ${locationName}. Open CampusQuest to explore!`,
    playSound: true,
    soundName: 'default',
  });
};
```

### 3. Offline Capability
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveOfflineProgress = async (gameData) => {
  try {
    await AsyncStorage.setItem('campusquest_progress', JSON.stringify(gameData));
  } catch (error) {
    console.log('Error saving offline data:', error);
  }
};

const loadOfflineProgress = async () => {
  try {
    const data = await AsyncStorage.getItem('campusquest_progress');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Error loading offline data:', error);
    return null;
  }
};
```

## Deployment Strategy

### Android (Google Play Store)
```bash
# Build release APK
cd android
./gradlew assembleRelease

# Generate signed APK
./gradlew bundleRelease
```

### iOS (App Store)
```bash
# Build for iOS
npx react-native run-ios --configuration Release

# Archive for App Store
xcodebuild -workspace CampusQuestAR.xcworkspace -scheme CampusQuestAR archive
```

## Campus Integration Plan

### Phase 1: QR Code Deployment
- Print and place QR codes at each campus location
- Test AR scanning functionality
- Deploy basic trivia system

### Phase 2: Advanced AR Features
- Implement 3D campus models
- Add GPS-based location detection
- Include social sharing features

### Phase 3: Campus Events Integration
- Connect with university event calendar
- AR overlays for upcoming events
- Real-time campus announcements

This comprehensive mobile AR implementation will provide Rishihood University students with an immersive, engaging way to explore and learn about their campus while leveraging cutting-edge augmented reality technology.