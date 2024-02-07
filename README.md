# 🫧Final / React 프론트엔드 개발 프로젝트
<ol>
<strong><li>버전 node.js v20.10.0 / npm v10.2.5</li> </strong>
<strong><li>MUI 템플릿 https://mui.com/</li></strong>
<strong><li>공공데이터 Open API</li></strong>
- 기상청 단기예보 데이터 API <br/>
- 인천국제공항공사 입국장현황 데이터 API(미완)
</ol>

# 반응형 웹 기준(width)
<ol>
 xs: 0, <br/>
 mobile: ~480px, <br/>
 tablet: ~768px, <br/>
 laptop: ~1024px, <br/><br/>
<strong><li>터미널1 지도 이미지 기준</li></strong>
- mobile: 450 <br/>
- tablet: 720 <br/>
- laptop: 1080 <br/><br/>
<strong><li>터미널2 지도 이미지 기준</li></strong>
- mobile: 600 <br/>
- tablet: 1080 <br/>
- laptop: 1200 <br/><br/>
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
