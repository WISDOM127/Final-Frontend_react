# react 프론트엔드 개발 포트폴리오 입니다.
<ol>
<strong><li>버전 node.js v20.10.0 / npm v10.2.5</li> </strong>
<strong><li>MUI 템플릿 https://mui.com/</li></strong>
<strong><li>공공데이터 Open API</li></strong>
- 기상청 단기예보 데이터 API <br/>
- 인천국제공항공사 입국장현황 데이터 API(미완)
</ol>
  

# react-router v6 부터 바뀐 문법 참고
- switch -> routes 네이밍 변경
- component -> element
- exact 옵션 삭제
- useHistory 훅 변경 -> useNavigate
- 중첩 라우팅 사용 가능

<Route path='user' element={<User />} >
  <Route path='detail' element={<UserDetail />} />   //=>user/detail해당
</Route>
