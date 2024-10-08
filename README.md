# GoTrip

> **AI 여행지 추천, AI 여행 플래너 웹** <br/> **개발기간: 2024.07** <br/> **1인 개발** <br/> **배포: Vercel** <br/> **사용 기술 <br/> - Next.Js (ver.14) <br/> - Typescript <br/> - TailWind CSS <br/> - react-query(v.5)**

## 배포 주소

> [https://gotrip-iota.vercel.app/](https://gotrip-iota.vercel.app/)

## 프로젝트 소개

GoTrip은 OpenAI의 GPT-4 API를 활용하여 사용자가 선호하는 여행지를 추천하고 맞춤형 여행 계획을 제공하는 웹 애플리케이션입니다.<br/>
메인 페이지에서는 3D 지구본 모델을 통해 직관적이고 즐거운 사용자 경험을 제공합니다 <br/>
또한, 날씨, 대기질 지수, 환율, 항공편 일정 API를 통해 여행지의 상세한 정보를 실시간으로 제공합니다.

## 아키텍처
![image](https://github.com/user-attachments/assets/063ecaae-eb7a-4f7a-8a26-dc2754447ceb)

## 주요 기능 📦

### ⭐️ 사용자 인터렉션 3D 지구본 모델

- 사용자 인터렉션에 따라 줌인,줌아웃,회전. 국가 포인트 클릭 시 줌인되며 간단한 국가 여행정보 라벨이 나옵니다.
  <br/>[코드 바로가기](https://velog.io/@reactmonster/GoTrip-3D-%EC%A7%80%EA%B5%AC%EB%B3%B8-%EB%AA%A8%EB%8D%B8)

<img src="https://github.com/user-attachments/assets/226bcfed-1dd0-4347-a3a8-273ee8de911b" width="70%" height="35%"/>

### ⭐️ AI 여행지 추천

- 사용자의 선호도 및 정보를 입력하여 OpenAI의 GPT-4 API를 이용해 여행지를 추천합니다. 텍스트 입력 뿐만 아니라 SpeechRecognition을 이용하여 음성으로도 입력이 가능합니다.
  <br/>[코드 바로가기](https://velog.io/@reactmonster/GoTrip-AI-%EC%97%AC%ED%96%89%EC%A7%80-%EC%B6%94%EC%B2%9C)

<img src="https://github.com/user-attachments/assets/c740dbde-361f-4883-9d6a-ebd7a6d5fed8" width="70%" height="35%"/>

### ⭐️ 여행지 실시간 정보 제공

- 날씨, 대기질 지수, 환율, 항공편 일정 API를 통해 여행지의 상세한 정보를 실시간으로 제공합니다.
- 데이터를 캐싱하고, 효율적으로 재사용하기 위해 react-query를 사용하였습니다.
  <br/>[코드 바로가기](https://velog.io/@reactmonster/GoTrip-%EC%97%AC%ED%96%89%EC%A7%80-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%A0%95%EB%B3%B4-%EC%A0%9C%EA%B3%B5)

<img src="https://github.com/user-attachments/assets/bed26682-4c35-40a6-b113-9a3b03fbd4bc" width="70%" height="35%"/>

### ⭐️ AI 여행 플래너

- 사용자에게 나이, 성별, 예산, 일정, 나라를 입력받아 GPT-4 API를 이용하여 여행 계획을 생성하여 제공합니다.
  <br/>[코드 바로가기](https://velog.io/@reactmonster/GoTrip-AI-%EC%97%AC%ED%96%89-%ED%94%8C%EB%9E%98%EB%84%88)

<img src="https://github.com/user-attachments/assets/718a50f4-1ba3-466a-877e-7b3d97e6de39" width="70%" height="35%"/>
<img src="https://github.com/user-attachments/assets/64840b41-738c-47c1-98c9-991b89388bfa" width="70%" height="35%"/>

---

## 트러블 슈팅 💡

## 3D 모델 로딩 시 사용자 경험 개선 ✔

### 문제 배경

3D 모델을 사용하는 메인 페이지에서 초기 렌더링 속도가 느려, 사용자가 오랜 시간 동안 흰 화면을 보게 되어 사용자 경험에 부정적인 영향을 미쳤습니다.

### 해결 방법

다이나믹 임포트(dynamic import)를 사용하여 3D 모델을 비동기적으로 로드하였습니다. 이로 인해 초기 로딩 시 필요한 리소스만 우선 로드되었으며, 로딩 UI를 제공하여 사용자에게 즉각적인 시각적 피드백을 제공할 수 있었습니다.<br/>
<img src="https://github.com/user-attachments/assets/57311fbf-36cd-4dfd-9ccc-0d122dc2cd66" width="70%" height="35%"/><br/>

### 결과
![image](https://github.com/user-attachments/assets/3ebf3eed-1b2a-4295-8105-a0e6c5a45a8a)

- FCP(First Contentful Paint) 를 약 57% 단축(201.59ms -> 85.26ms).

### 배우게 된 점

다이나믹 임포트를 활용하여 초기 로딩 시간을 효과적으로 단축하고, 대규모 리소스를 효율적으로 관리하는 방법을 배웠습니다. 이를 통해 사용자 경험을 크게 개선할 수 있었습니다.

## OpenAI API의 서버 측 호출 문제 ✔

### 문제 배경

OpenAI API는 보안상의 이유로 클라이언트 측에서 직접 호출할 수 없습니다. 이를 해결하기 위해 서버 측에서 API를 호출할 수 있도록 구현했습니다.

### 해결 방법

서버 측에서 OpenAI API를 호출하기 위해 Next.js에서 제공하는 API 라우트를 사용했습니다. 이 라우트는 클라이언트 요청을 받아 OpenAI API에 전달하고, 결과를 다시 클라이언트에게 전달하는 역할을 합니다.<br/>
[코드 바로가기](https://velog.io/@reactmonster/GoTrip-OpenAI-API%EC%9D%98-%EC%84%9C%EB%B2%84-%EC%B8%A1-%ED%98%B8%EC%B6%9C-%EB%AC%B8%EC%A0%9C)<br/>

### 이전 코드와 비교

이전에는 API를 클라이언트 측에서 호출하기 때문에 OpenAI API 정책 상 에러가 반환되었습니다. 서버 측 라우트를 도입한 후, API 키가 안전하게 보호되며 API 호출이 원활히 이루어졌습니다.

## 시작 가이드

### Requirements

For building and running the application you need:

- [Node.js]
- [npm]

### Installation

```bash
$ git clone https://github.com/mmm7k/GoTrip.git
$ npm install
$ npm run dev
```

## Stacks 🐈

### Environment

- [Visual Studio Code]
- [Git]
- [Github]

### Config

- [npm]

---
