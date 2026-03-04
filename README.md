# 배달어플 (React Native / Expo) 데모 코드

> 이 프로젝트는 제공된 기능명세/화면명세를 바탕으로 **React Native(Expo) 기준의 UI/네비게이션/상태관리 뼈대**를 구성한 예시입니다.  
> 서버(API), OAuth(카카오/애플 등), 푸시알림 등은 **연동 전 단계**이며 현재는 **로컬 Mock 데이터/로컬 상태(zustand)** 로 동작합니다.

## 포함된 주요 화면/기능

- 로그인(데모): 닉네임 입력으로 로컬 로그인 처리
- 하단 탭 3개
  - **미션**
    - 진행중인 미션 목록
    - 미션 템플릿 목록 / 상세
    - 미션 설정(알림 시간 저장, 커스터마이징 값 선택/입력)
    - 미션 인증(사진 선택, 태그 선택/입력, 메모 저장)
  - **정보**
    - 카테고리/서브카테고리 기반 리스트(예시 게시글)
    - 검색(데모)
  - **마이**
    - 로그인 정보(데모)
    - 인증 기록 리스트
    - 로그아웃

## 기술 스택

- Expo SDK 52
- React Navigation (Stack + Bottom Tabs)
- zustand (로컬 상태)
- expo-image-picker (사진 선택 데모)
- TypeScript

## 실행 방법

### 1) 설치
```bash
npm install
```

### 2) 실행
```bash
npm run start
# 또는
npm run android
npm run ios
npm run web
```

> iOS 시뮬레이터는 macOS 환경이 필요합니다.

## 폴더 구조

- `App.tsx` : NavigationContainer + RootNavigator
- `src/navigation/*` : AuthStack / Tab / MissionStack 구성
- `src/screens/*` : 화면 구현
- `src/store/useAppStore.ts` : zustand 전역 상태(로그인, 미션, 인증)
- `src/data/*` : 기능명세 기반 Mock 데이터(미션 템플릿, 정보 카테고리)
- `src/components/*` : 공용 UI 컴포넌트

## 다음 단계(실서비스 연동 시)

- 로그인/OAuth 연동 (카카오/애플 등)
- API 연동
  - 미션 템플릿/진행중 미션/인증 업로드
  - 정보 게시글/카테고리
- 푸시 알림 연동 (reminderTime 기반 스케줄링)
- 이미지 업로드(서버/스토리지) 및 인증 유효 시간(validWindow) 검증 로직
- 에러 핸들링/로딩/토스트 등 UX 고도화

## 주의 사항

- 앱 이름은 외부 노출을 고려하여 **"배달어플"** 로 통칭했습니다.
- `assets/` 이미지는 더미(placeholder)입니다.
