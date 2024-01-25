# react 를 이용한 프론트엔드 개발 포트폴리오 입니다.


1. MUI 템플릿 이용
https://mui.com/


# react-router v6 부터 바뀐 문법 참고
- switch -> routes 네이밍 변경
- component -> element
- exact 옵션 삭제
- useHistory 훅 변경 -> useNavigate
- 중첩 라우팅 사용 가능

<Route path='user' element={<User />} >
  <Route path='detail' element={<UserDetail />} />   //=>user/detail해당
</Route>
