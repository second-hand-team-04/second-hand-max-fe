# Second Hand Max FE

## Table of Contents

- [Tech Stack](#tech-stack)
- [Members](#members)
- [BE Repositories](#be-repositories)
- [Dev Log](#dev-log)

## Tech Stack

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Axios](https://img.shields.io/badge/axios-671DDF?style=for-the-badge&logo=axios&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

## Members

| <img src="https://avatars.githubusercontent.com/u/114852081?v=4" width=100 height=100 alt="Bakha"/> | <img src="https://avatars.githubusercontent.com/u/79886384?v=4" width=100 height=100 alt="Kakamotobi"/> |
| :-------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
|                               [Bakha](https://github.com/backhacode)                                |                               [Kakamotobi](https://github.com/Kakamotobi)                               |

## BE Repositories

- [second-hand-max-be-a](https://github.com/second-hand-team-04/second-hand-max-be-a)
- [second-hand-max-be-b](https://github.com/second-hand-team-04/second-hand-max-be-b)

## Dev Log

### 범용 컴포넌트

#### `SelectInput`

[SelectInput 컴포넌트 #2](https://github.com/second-hand-team-04/second-hand-max-fe/issues/2)

#### `Dropdown`

[Dropdown 컴포넌트 #6](https://github.com/second-hand-team-04/second-hand-max-fe/issues/6)

### Hooks

#### `useViewportIntersection`

- Viewport을 고려하여 위치를 동적으로 변경해야할 수 있는 경우(Ex: `SelectInput`과 `Dropdown`)를 위해 viewport의 "left"/"right"과의 중첩 여부를 알려줌.
- IntersectionObserver API를 사용.
