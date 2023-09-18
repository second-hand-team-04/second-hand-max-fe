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

##### V1

- Viewport을 고려하여 위치를 동적으로 변경해야할 수 있는 경우(Ex: `SelectInput`과 `Dropdown`)를 위해 viewport의 "left"/"right"과의 중첩 여부를 알려줌.
- IntersectionObserver API를 사용.

##### V2

- `useViewportIntersection` -> `useIntersection`
- Default로 viewport를 기준으로 intersection을 확인하지만 별도로 boundaryElement을 설정할 수 있도록 리팩토링함.

### `refetch` vs `invalidateQueries`

- `refetch`는 일단 실행되면 바로 query를 refetch 함.
- `invalidateQueries`는 해당 query를 `stale`로 마킹을 하고, 후에 해당 query를 observe하는 컴포넌트가 마운트 될 때 refetch 함.
  > invalidation is a more "smart" refetching. | TkDodo
- Reference: https://github.com/TanStack/query/discussions/2468

### Route Protection

- react-router-dom의 `Navigate`은 내부적으로 `useEffect`를 사용하고 있음.
- Route protection을 구현할 때 `Navigate`을 사용하지 않고 따로 `useEffect`로 직접해도 렌더링 횟수는 동일.

### Auth Token Flow

- Access Token 만료는 서버와 403으로 지정.
- Axios response interceptor를 활용하여 403을 받으면 refresh token으로 access token refresh 시도.

```ts
fetcher.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    // If the access token expired, attempt to refresh it.
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refreshAccessToken();
        localStorage.setItem("accessToken", res.data?.accessToken);
        return fetcher(originalRequest);
      } catch (refreshError) {
        // Refresh token expired.
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // TODO: navigate the user to `/signin` while displaying the toast
        window.location.href = Routes.SIGNIN;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

### Query Error Handling

#### V1

- `QueryCache`에서 일괄적으로 모든 query의 에러를 받아서 server에서 받은 에러 메시지를 toast에 담아서 보여줌.
- 문제
  - Route protection을 사용자 정보 (nickname, profile image)의 유무에 따라서 적용하고 있기 때문에 기본적으로 사이트 접속시 사용자 정보를 받기 위한 요청을 보냄.
    - 즉, 로그인이 안된 사용자(i.e. localStorage에 유효한 access token이 없음)가 처음 사이트 접속시 error toast 보여짐.
  - 예상치 못한 다른 에러 또한 보여짐.

#### V2

- 동일하게 `QueryCache`에서 일괄적으로 error를 핸들링하고, 특정 상황에서는 `query.meta.errorMessage`를 활용.
  - Ex: `useUserInfoQuery`의 "AccessToken이 유효하지 않습니다" -> "로그인을 먼저 해주세요".
- 
