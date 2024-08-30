# react 생성 (타입스크립트 추가)
npx create-react-app [이름 추가] --template typescript

ex == npx create-react-app board-front --template typescript

# 이걸 다운 받으면 ==useNavigate를 사용 할 수 있다
install react-router-dom


# 폴더
apis = 백엔드와 연결
assets = 이미지나 미디어 
components = 공통 컴포넌트 작성
constants = 상수들 넣는다
hooks = hook 함수
layouts = header footer
mocks = 
stores = 상태 관리
types = 각종 타입들 저장
utils = 잡다한 유틸들
views = 뷰(페이지)들 모음


# 프리텐다드 눈누 == index.css에 적용
@font-face { 
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}


# <div className='icon eye-light-off-icon'> 이거는 클래스 이름이 두개인거다 == .icon  , .eye-light-off-icon  이렇게 두가지이다


# Better Comments를 다운받고나서  => 이걸 적용하면 주석처리한거에 색상이 부여된다

1. 톱니바퀴 아이콘 클릭해서 settings에서 들어간다
2. Extensions를 클릭
3. Better Comments cofiguration을 들어간다 
4. tegs -> edit setting in.json을 클릭
5. 밑에 있는 붙여넣고 vs를 재시작해주면 된다

"better-comments.tags": [
    
        {
            "tag": "!",
            "color": "#FF2D00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "?",
            "color": "#3498DB",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "//",
            "color": "#474747",
            "strikethrough": true,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "todo",
            "color": "#FF8C00",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "*",
            "color": "#98C379",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "transparent",
            "bold": false,
            "italic": false
        },
        {
            "tag": "#",
            "color": "#ffffff",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "#000000",
            "bold": false,
            "italic": false
        },
        {
            "tag": "description",
            "color": "rgba(0, 0, 0, 0.7)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(152, 152, 152, 0.5)",
            "bold": false,
            "italic": false
        },
        {
            "tag": "component",
            "color": "rgba(0, 0, 0, 0.7)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(0, 255, 152, 0.5)",
            "bold": true,
            "italic": false
        },
        {
            "tag": "interface",
            "color": "rgba(0, 0, 0, 0.7)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(0, 152, 255, 0.5)",
            "bold": true,
            "italic": false
        },
        {
            "tag": "function",
            "color": "rgba(255, 255, 255, 1)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(152, 0, 255, 0.5)",
            "bold": true,
            "italic": false
        },
        {
            "tag": "state",
            "color": "rgba(0, 0, 0, 0.7)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(152, 255, 255, 0.5)",
            "bold": true,
            "italic": false
        },
        {
            "tag": "event handler",
            "color": "rgba(0, 0, 0, 0.7)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(152, 152, 255, 0.5)",
            "bold": true,
            "italic": false
        },
        {
            "tag": "effect",
            "color": "rgba(255, 255, 255, 1)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(0, 0, 255, 0.5)",
            "bold": true,
            "italic": false
        },
        {
            "tag": "render",
            "color": "rgba(0, 0, 0, 0.7)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(255, 0, 0, 0.5)",
            "bold": true,
            "italic": false
        },
        {
            "tag": "variable",
            "color": "rgba(0, 0, 0, 0.7)",
            "strikethrough": false,
            "underline": false,
            "backgroundColor": "rgba(0, 255, 0, 0.5)",
            "bold": true,
            "italic": false
        },
    ],



# jwt를 사용하면 react쿠키를 주입해야한다
npm i react-cookie 를 사용해서 주입한다

# 저스탄드 == redux처럼 상태관리 해주는 라이브러리 이다
npm i zustand
