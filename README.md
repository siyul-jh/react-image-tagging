# react-image-tagging

이미지 위에 태그를 생성하고 드래그로 위치를 조정할 수 있는 React 컴포넌트입니다.

> 실무에서 이미지에 좌표 기반 어노테이션이 필요한 경우가 있었습니다.
> 클릭 위치를 퍼센트 좌표로 변환하고 드래그 이동을 처리하는 로직을 직접 구현해봤습니다.

---

## Features

- **위치 기반 태그 생성** — 이미지 위 원하는 위치를 클릭해 태그 추가
- **드래그 이동** — 생성된 태그를 드래그 & 드롭으로 자유롭게 이동
- **퍼센트 좌표 기반** — 이미지 크기에 관계없이 상대 좌표(%)로 위치 저장

---

## Tech Stack

| 목적 | 선택 |
|------|------|
| Framework | React (TypeScript) |
| 스타일 | Tailwind CSS |

---

## 구현 포인트

**퍼센트 좌표 변환**
`MouseEvent`의 `offsetX / offsetY`를 이미지의 `clientWidth / clientHeight`로 나눠 상대 좌표(0~1)로 저장합니다. 이미지 크기가 바뀌어도 태그 위치가 유지됩니다.

```ts
const x = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * 100
const y = (e.nativeEvent.offsetY / e.currentTarget.clientHeight) * 100
```

**드래그 처리**
`onMouseDown` → `onMouseMove` → `onMouseUp` 순서로 드래그 상태를 관리합니다. 드래그 중 태그의 위치를 실시간으로 업데이트하고, `onMouseUp`에서 최종 좌표를 확정합니다.

---

## Getting Started

```bash
yarn install
yarn start
```

---

## 디렉토리 구조

```
src/
├── components/     # 태그, 이미지 컨테이너 컴포넌트
├── core/function/  # 좌표 계산, 드래그 유틸 함수
└── App.tsx
```
