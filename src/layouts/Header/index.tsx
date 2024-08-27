import React, { ChangeEvent, useRef, useState,KeyboardEvent, useEffect } from 'react'
import './style.css';
import { useFetcher, useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH, SEARCH_PATH } from '../../constant';


//            component: 헤더 레이아웃         //
export default function Header() {

//            function:네비게이트 함수            //
const navigate = useNavigate();


//            event handler: 로고 클릭 이벤트 처리 함수  //
// 메인 페이지로 이동
const onLogoClickHandler = () =>{ 
  navigate(MAIN_PATH());
}


//            component: 검색 버튼 컴포넌트       //
const SearchButton = () =>{
  //          state:검색 버튼 요소 참조 상태               //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);
  //          state:검색 버튼 상태               //
  const [status, setStatus] = useState<boolean>(false);
  //          state:검색어 상태               //
  const [Word, setWord] = useState<string>('');
  //          state:검색어 path variable 상태               //
  // 이거는 app.tsx에서 작성한 {SEARCH_PATH(':searchWord')} 여기에 입력한 파라미터처럼 똑같이 작성해줘야 한다
  const { searchWord } = useParams();

  //          event handler: 검색어 변경 이벤트 처리 함수   //
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWord(value);
  };

  //          event handler: 검색어 키 이벤트 처리 함수   //
  const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    if(!searchButtonRef.current) return; //null일경우
    searchButtonRef.current.click();
  };

  //          event handler: 검색 버튼 클릭 이벤트 처리 함수   //
  const onSearchButtonClickHandler = () => {
    console.log("Search button clicked!");
    if(!status){
      setStatus(!status);
      return;
    }
    navigate(SEARCH_PATH(Word));
  }

  //         effect: 검색어 path variable 변경 될때 마다 실행될 함수  == 입력한 단어를 검새창에 그대로 유지      //
  useEffect(()=>{
    if(searchWord) {
      setWord(searchWord);
      setStatus(true);
    }
  },[searchWord]);

  if (!status)
  //          render: 검색 버튼 컴포넌트 렌더링(클릭 false상태 == 클릭 안된 상태)   //
  //onSearchButtonClickHandler 여기서는 버튼을 활성화 시켜서 인풋창이 보여진다
  return( 
    <div className='icon-button' onClick={onSearchButtonClickHandler}>
      <div className='icon search-light-icon'></div>
    </div>
    );

  //          render: 검색 버튼 컴포넌트 렌더링(클릭 true 상태)   //
  //onSearchButtonClickHandler 여기서는 버튼을 클릭하면 입력한 내용을 가지고 온다 주소창에그글이 붙어 있다
  return (
    <div className='header-search-input-box'>
      <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요' value={Word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
      <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='icon search-light-icon'></div>
      </div>
    </div>
  );
}
  
//            render: 헤더 레이아웃 렌더링        //
    return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'Hoons Board'}</div>
        </div>
        <div className='header-right-box'>
          <SearchButton />
        </div>
      </div>
    </div>
  )
}
