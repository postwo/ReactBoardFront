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