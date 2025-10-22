# KakaApp - Real-time Video Call Application

<div align="center">
  
### 🎥 Demo

https://github.com/user-attachments/assets/244b5d4e-4fd6-4f2a-807c-6e84fd6edc43

*Ứng dụng gọi video realtime sử dụng WebRTC và Socket.io*

</div>

---

## 📋 Giới thiệu

**KakaApp** là một ứng dụng gọi video realtime được xây dựng với công nghệ **WebRTC** và **Socket.io**, cho phép người dùng thực hiện cuộc gọi video chất lượng cao với độ trễ thấp. 

### 📦 Cấu trúc dự án

```
kakaapp/
├── kakatalk/          # 📱 React Native Mobile App (iOS & Android)
│   ├── src/
│   │   ├── features/  # Các tính năng chính (auth, call, home)
│   │   ├── hooks/     # Custom hooks
│   │   ├── components/# UI components
│   │   ├── navigation/# React Navigation
│   │   ├── store/     # Redux state management
│   │   └── services/  # API services
│   ├── ios/           # iOS native code
│   └── android/       # Android native code
│
└── kaka-service/      # 🚀 NestJS Backend Service
    └── src/
        ├── socket/    # Socket.io gateway
        └── main.ts    # Entry point
```

## 🛠️ Tech Stack

### Frontend (kakatalk)
- **React Native** - Framework mobile đa nền tảng
- **TypeScript** - Type safety
- **WebRTC** - Real-time communication
- **Redux Toolkit** - State management
- **React Navigation** - Điều hướng
- **MMKV** - Local storage
- **Socket.io Client** - Real-time messaging

### Backend (kaka-service)
- **NestJS** - Progressive Node.js framework
- **Socket.io** - WebSocket server
- **TypeScript** - Type safety
- **Firebase** - Authentication & Database

## ✨ Tính năng

- ✅ Gọi video 1-1 realtime
- ✅ WebRTC peer-to-peer connection
- ✅ Signaling server với Socket.io
- ✅ Hỗ trợ cả iOS và Android
- ✅ Xác thực người dùng
- ✅ Quản lý cuộc gọi (call, answer, reject, end)
- ✅ Camera switching (front/back)
- ✅ Mute/Unmute audio
- ✅ Dark mode support

## 🔌 WebRTC Signaling Flow

```
User A                    Socket Server                    User B
  |                             |                              |
  |---- join room ------------->|                              |
  |                             |<---- join room --------------|
  |                             |                              |
  |---- offer ------------------>|---- offer ------------------>|
  |                             |                              |
  |<--- answer ------------------|<--- answer ------------------|
  |                             |                              |
  |---- ice candidate ---------->|---- ice candidate ---------->|
  |<--- ice candidate -----------|<--- ice candidate -----------|
  |                             |                              |
  |<===== WebRTC P2P Connection established =================>|
```

## 📝 License

[MIT License](LICENSE)

---

<div align="center">
Made with ❤️ by Thinh
</div>

