import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layouts/Footer';
import Main from './views/Main';
import Authentication from './views/Authentication';
import Search from './views/Search';
import UserP from './views/User';
import BoardDetail from './views/Board/Detail';
import BoardWrite from './views/Board/Write';
import BoardUpdate from './views/Board/Update';
import Container from './layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from './constant';
import { useEffect } from 'react';
import { Cookies, useCookies } from 'react-cookie';
import { useLoginUserStore } from './stores';
import { GetSignInUserReuest } from './apis';
import { GetSignInUserResponseDto } from './apis/response/user';
import { ResponsDto } from './apis/response';
import { User } from './types/interface';


//           component: Application 컴포넌트          //
// return 에 <BoardListItem/> 이렇게 넣어야 내가 만든 div들이 출력된다
function App() {

  //          state: 로그인 유저 전역 상태           //
  const {setLoginUser, resetLoginUser } = useLoginUserStore();

  //          state: cookie 상태                    //
  const [cookies, setCookie] = useCookies();

  //         function: get sign in user response 처리 함수           //
  const GetSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponsDto | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === 'AF' || code === 'NU' || code === 'DBE') {
      resetLoginUser();
      return;
    }
    const loginUser: User = { ...responseBody as GetSignInUserResponseDto };
    setLoginUser(loginUser);
  }

  //          effect:  accessToken cookie 값이 변경될때 마다 실행될 함수           //
  useEffect(() => {
    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    GetSignInUserReuest(cookies.accessToken).then(GetSignInUserResponse);
  }, [cookies.accessToken]);

  //<Route path='*' element={<h1>404 not found</h1>} /> 이거는 경로가 잘모된 페이지를 띄워주는 역할이다

  //           render: Application 컴포넌트 렌더링         //
  // description: 메인 화면 : '/' - Main        //
  // description: 로그인 + 회원가입 : '/auth' - Authentication  //
  // description: 검색 화면 : '/search/:searchWord' - Serach //
  // description: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail //
  // description: 게시물 작성하기 : '/board/write' - BoardWrite  //
  // description: 게시물 수정하기 : '/board/update/:boardNumber' - BoardUpdate //
  // description: 유저 페이지 :'/user/:usereamil' -User   //
  return (
    <Routes>
      <Route element={<Container />}>

      <Route path={MAIN_PATH()} element={<Main />}/>
      <Route path={AUTH_PATH()} element={<Authentication />}/>
      <Route path={SEARCH_PATH(':searchWord')} element={<Search />}/>
      <Route path={USER_PATH(':userEmail')} element={<UserP />}/>
     
      <Route path= {BOARD_PATH()}>
        <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />}/>
        <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />}/>
        <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />}/>
      </Route>

      <Route path='*' element={<h1>404 not found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
