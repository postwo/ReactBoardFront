import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from '../../constant';

//            component: 레이아웃         //
export default function Container() {

  //             state:  현재 페이지 path name 상태    == authentication 화면은 Footer가 필요없기 때문에 여기서 처리  //
    const {pathname} = useLocation();
  
  //{pathname !== '/auth' && <Footer />}이렇게 하면 auth 로 이동하면 footer가 안나온다 
  //            render: 레이아웃 렌더링        //
      return (
        <>
          <Header />
            <Outlet />
          {pathname !== AUTH_PATH() && <Footer />}
        </>
    )
  }
