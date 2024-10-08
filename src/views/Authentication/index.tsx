import React, { useState, KeyboardEvent, useRef, ChangeEvent, useEffect } from 'react'
import './style.css';
import InputBox from '../../components/InputBox';
import { SignInRequestDto, SignUpRequestDto } from '../../apis/request/auth';
import { signInRequest, signUpRequest } from '../../apis';
import { SignInResponseDto, SignUpResponseDto } from '../../apis/response/auth';
import { ResponsDto } from '../../apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from '../../constant';
import { useNavigate } from 'react-router-dom';
import { Address,useDaumPostcodePopup } from 'react-daum-postcode';
import { off } from 'process';


//          component: 인증 화면  컴포넌트         //
export default function Authentication() {

  //          state: 화면 상태          //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

  //         state: 쿠키 상태           //
  const [cookies, setCookie] = useCookies();

  //          function: 네비게이트 함수      //
  const navigator = useNavigate();


  //          component: sign in card  컴포넌트         // 
  const SignInCard = () => {

    //          state: 이메일 요소 참조 상태  == (null);이거는 초기 값 세팅 한거다            //
    const emailRef = useRef<HTMLInputElement | null> (null);

    //          state: 패스워드 요소 참조 상태             //
    const passwordRef = useRef<HTMLInputElement | null> (null);

    //          state: 이메일 상태             //
    const [email , setEmail] = useState<string>('');
    
    //          state: 이메일 상태             //
    const [password, setPassword] = useState<string>('');

    //          state: 이메일 상태             //
    const [passwordType, setPasswordType] = useState<'text'| 'password'> ('password');

    //          state: 패스워드 버튼 아이콘 상태    //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'> ('eye-light-off-icon');

    //          state: 에러 상태(이메일 ,패스워드 공통 에러)    //
    const [error, setError] = useState<boolean>(false);


    //          function: sign in response 처리 함수          //
    const signInResponse = (responseBody: SignInResponseDto | ResponsDto | null) => {
        if (!responseBody) {
          alert ('네트워크 이상입니다.');
          return;
        }

        const {code} = responseBody;
        if(code === 'DBE') alert ('데이터베이스 오류입니다.');
        if(code === 'SF' || code === 'VF') setError(true);
        if(code !== 'SU') return;

        const {token ,expirationTime}  = responseBody as SignInResponseDto;
        const now  = new Date().getTime();
        const expires = new Date(now + expirationTime * 1000);

        setCookie('accessToken', token, {expires, path:MAIN_PATH()});
        navigator(MAIN_PATH());

      }


    //          event handler: 이메일 변경 이벤트 처리                 //  
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setEmail(value);
    }

    //          event handler: 비밀번호 변경 이벤트 처리                 //  
      const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const {value} = event.target;
        setPassword(value);
    }

    //          event handler:  로그인 버튼 클릭 이벤트 처리       //
    const onSignInButtonClickHandler = () =>{
      const requestBody: SignInRequestDto = {email,password};
      signInRequest(requestBody).then(signInResponse);
    }

    //          event handler:  회원가비 링크 클릭 이벤트 처리       //
    const onSignUpLinkClickHandler = () => {
      setView('sign-up');
    }


    //          event handler:  패스워드 버튼 클릭 이벤트 처리       //
    const onPasswordButtonClickHandler = () =>{

      console.log(passwordType);// text 상태인지 password 상태인지 확인

      if(passwordType === 'text'){
        setPasswordType('password');
        setPasswordButtonIcon('eye-light-off-icon');
      }
      else{
        setPasswordType('text');
        setPasswordButtonIcon('eye-light-on-icon');
      }
    }


    //          event handler: 이메일 input 키 다운 이벤트 처리       //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.key !== 'Enter') return;
        if(!passwordRef.current) return;
        passwordRef.current.focus();
    }

    //          event handler: 패스워드 input 키 다운 이벤트 처리       //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
      if(event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    }

    //          render: sign in card  컴포넌트 렌더링         //
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요' error={error} value={email} onChange={onEmailChangeHandler} onkeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호르 입력해주세요' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onkeyDown={onPasswordKeyDownHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error &&  <div className='auth-sign-in-error-box'>
              <div className='auth-signin-error-message'>
                {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요'}
                </div>
            </div>}
            <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'신규 사용자이신가요?'}<span className='auth-description-link' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //          component: sign up card  컴포넌트         // 
  const SignUpCard = () => {

    //          state: 이메일 요소 참조 상태                //
    const emailRef = useRef<HTMLInputElement | null>(null);    
    //          state: 패스워드 요소 참조 상태                //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //          state: 패스워드 확인 요소 참조 상태                //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    //          state: 닉네임 요소 참조 상태                //
    const nicknameRef = useRef<HTMLInputElement | null>(null);   
    //          state: 휴대폰 요소 참조 상태                //
    const telNumberRef = useRef<HTMLInputElement | null>(null);     
    //          state: 주소 요소 참조 상태                //
    const addressRef = useRef<HTMLInputElement | null>(null);    
    //          state: 상세주소 요소 참조 상태                //
    const addressDetailRef = useRef<HTMLInputElement | null>(null);    

    
    //          state: 페이지 번호 상태                //
    const [page, setPage] = useState<1 | 2>(1);


    //          state: 이메일 상태                //
    const [email,setEmail] = useState<string>('');
    //          state: 패스워드 상태                //
    const [password, setPassword] = useState<string>('');
    //          state: 패스워드 확인 상태                //
    const [passwordCheck, setpasswordCheck] = useState<string>('');
    //          state: 닉네임 상태                //
    const [nickname,setNickname] = useState<string>('');
    //          state: 핸드폰 번호 상태                //
    const [telNumber,setTelNumber] = useState<string>('');
    //          state: 주소 상태                //
    const [address,setAddress] = useState<string>('');
    //          state: 상세 주소 상태                //
    const [addressDetail,setAddressDeatil] = useState<string>('');
    //          state: 개인 정보 동의 상태                //
    const [agreedPersonal,setAgreedPersonal] = useState<boolean>(false);


    //          state: 패스워드 타입 상태               //
    const [passwordType,setPasswordType] = useState<'text' | 'password'>('password');
    //          state: 패스워드 롹인 타입 상태               //
    const [passwordCheckType,setPasswordCheckType] = useState<'text' | 'password'>('password');
    

    //          state: 이메일 에러 상태               //
    const [isEmailError, setEmailError] = useState<boolean>(false);
    //          state: 비밀번호 에러 상태               //
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    //          state: 비밀번호 확인 에러 상태               //
    const [ispasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
    //          state: 닉네임 에러 상태               //
    const [isNicknameError,setNicknameError] = useState<boolean>(false);
    //          state: 핸드폰 번호 에러 상태               //
    const [isTelNumberError,setTelNumberError] = useState<boolean>(false);
    //          state: 주소 에러 상태               //
    const [isAddressError,setAddressError] = useState<boolean>(false);
    //          state: 개인 정보 동의 에러 상태               //
    const [isAgreedPersonalError,setAgreedPersonalError] = useState<boolean>(false);

    
    //          state: 이메일 에러 메시지 상태              //
    const [emailErrorMessage,setEmailErrorMessage] = useState<string>('');
    //          state: 비밀번호 에러 메시지  상태              //
    const [passwordErrorMessage,setPasswordErrorMessage] = useState<string>('');
    //          state: 비밀번호 확인 에러 메시지  상태              //
    const [passwordCheckErrorMessage,setPasswordCheckErrorMessage] = useState<string>('');
    //          state: 닉네임 에러 메시지 상태              //
    const [nicknameErrorMessage,setNicknameErrorMessage] = useState<string>('');
    //          state: 휴대폰 번호 에러 메시지 상태              //
    const [telNumberErrorMessage,setTelNumberErrorMessage] = useState<string>('');
    //          state: 주소 에러 메시지 상태              //
    const [addressErrorMessage,setAddressErrorMessage] = useState<string>('');


    //         state: 패스워드 버튼 아이콘 상태                  //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'> ('eye-light-off-icon');
    //         state: 패스워드 확인 버튼 아이콘 상태             //
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'> ('eye-light-off-icon');


    //         function: 다음 주소 검색 팜업 오픈 함수         //
    const open = useDaumPostcodePopup();

    //         function: sign up response 처리 함수         //
    const signUpResponse = (responseBody: SignUpResponseDto | ResponsDto | null) =>{
      if (!responseBody) {
        alert('네트워크 이상입니다.');
        return;
      }

      const { code } = responseBody;
      if (code === 'DE') {
        setEmailError(true);
        setEmailErrorMessage('중복되는 이메일 주소입니다.');
      }
      if (code === 'DN') {
        setNicknameError(true);
        setNicknameErrorMessage('중복되는 닉네임 입니다.');
      }
      if (code === 'DT') {
        setTelNumberError(true);
        setTelNumberErrorMessage('중복되는 핸드폰 번호입니다.');
      }
      if (code === 'VF') alert ('모든 값을 입력하세요.');
      if (code === 'DBE') alert ('데이터베이스 오류입니다.');

      if (code !== 'SU') return;

      setView('sign-in');
    }


    //          event handler: 이메일 변경 이벤트 처리        //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMessage('');
    }
    //          event handler: 패스워드 변경 이벤트 처리        //
    const onPasswordChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage('');
    } 
    //          event handler: 패스워드 확인 변경 이벤트 처리        //
    const onPasswordCheckChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setpasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
    }
    //          event handler: 닉네임 변경 이벤트 처리        //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage('');
    }
    //          event handler: 핸드폰 번호 변경 이벤트 처리        //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMessage('');
    }
    //          event handler: 주소 변경 이벤트 처리        //
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setAddress(value);
      setAddressError(false);
      setAddressErrorMessage('');
    }
    //          event handler: 상세 주소 변경 이벤트 처리        //
    const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
      const {value} = event.target;
      setAddressDeatil(value);
    }


    //          event handler: 개인 정보 동의 체크 박스 클릭 이벤트 처리        //
    const onAgreedPersonalClickHandler = ()=>{
      setAgreedPersonal(!agreedPersonal);
      setAgreedPersonalError(false);
    }
    //          event handler: 패스워드 버튼 클릭 이벤트 처리        //
    const onPasswordButtonClickHandler = () =>{
      if(passwordButtonIcon === 'eye-light-off-icon') {
        setPasswordButtonIcon('eye-light-on-icon');
        setPasswordType('text');
      }
      else{
        setPasswordButtonIcon('eye-light-off-icon');
        setPasswordType('password');
      }
    }  
    //          event handler: 패스워드 확인 버튼 클릭 이벤트 처리        //
    const onPasswordCheckButtonClickHandler = () =>{
      if(passwordCheckButtonIcon  === 'eye-light-off-icon') {
        setPasswordCheckButtonIcon('eye-light-on-icon');
        setPasswordCheckType('text');
      }
      else{
        setPasswordCheckButtonIcon('eye-light-off-icon');
        setPasswordCheckType('password');
      }
    }  

    //          event handler: 주소 버튼 클릭 이벤트 처리        //
    const onAddressButtonClickHandler = () => {
      open({ onComplete });
    }

    //          event handler: 다음 단계 버튼 클릭 이벤트 처리        //
    const onNextButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([~.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/; // 이메일 패턴이다
      const isEmaiilPattern = emailPattern.test(email);
      if(!email){
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
      }

      const isCheckdPassword = password.trim().length >= 8 
      if(!isCheckdPassword){
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요');
      }

      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지않습니다.');
      }

       // 이메일, 비밀번호, 비밀번호 확인이 모두 유효하지 않으면 return
      if (!isEmaiilPattern || !isCheckdPassword || !isEqualPassword) return;
    
      // 모든 조건이 맞으면 다음 페이지로 이동
      setPage(2);
    }

    //          event handler: 회원가입 버튼 클릭 이벤트 처리                 //
    const onSignUpButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([~.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/; // 이메일 패턴이다
      const isEmaiilPattern = emailPattern.test(email);
      if(!email){
        setEmailError(true);
        setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
      }

      const isCheckdPassword = password.trim().length >= 8 
      if(!isCheckdPassword){
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요');
      }

      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지않습니다.');
      }
        // 이메일, 비밀번호, 비밀번호 확인이 모두 유효하지 않으면 return
      if (!isEmaiilPattern || !isCheckdPassword || !isEqualPassword) {
        setPage(1);
        return;
      }

      const hasNickname = nickname.trim().length > 0;
      if(!hasNickname) {
        setNicknameError(true);
        setNicknameErrorMessage('닉네임을 입력해주세요');
      }

      const telNumberPattern = /^[0-9]{11,13}$/;
      const isTelNumberPattern = telNumberPattern.test(telNumber);
      if(!isTelNumberPattern) {
        setTelNumberError(true);
        setTelNumberErrorMessage('숫자만 입력해주세요');
      }

      const hasAddress = address.trim().length > 0;
      if (!hasAddress) {
        setAddressError(true);
        setAddressErrorMessage('주소를 입력해주세요');
      }
      if (!agreedPersonal) setAgreedPersonalError(true);

      if (!hasNickname || !isTelNumberPattern || !agreedPersonal) return;

      const requestBody: SignUpRequestDto = {
        email, password, nickname, telNumber, address, addressDetail, agreedPersonal
      };

      signUpRequest(requestBody).then(signUpResponse);
    }


    //          event handler: 로그인 링크 클릭 이벤트 처리                 //
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
    }

    //          event handler: 이메일 키 다운 이벤트 처리                 //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }
    //          event handler: 패스워드 키 다운 이벤트 처리                 //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    }
    //          event handler: 패스워드 확인 키 다운 이벤트 처리                 //
    const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onNextButtonClickHandler();
    }
    //          event handler: 닉네임 키 다운 이벤트 처리                 //
    const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!telNumberRef.current) return;
      telNumberRef.current.focus();
    }
    //          event handler: 핸드폰 번호 키 다운 이벤트 처리                 //
    const onTelNumberKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onAddressButtonClickHandler();
    }
    //          event handler: 주소 키 다운 이벤트 처리                 //
    const onAddressKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    }
    //          event handler: 상세 주소 키 다운 이벤트 처리                 //
    const onAddressDetailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignUpButtonClickHandler();
    }
    //          event handler: 다음 주소 검색 완료 이벤트 처리                 //
    const onComplete = (data: Address ) =>{
      const { address } = data; 
      setAddress(address);
      setAddressError(false);
      setAddressErrorMessage('');
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    }

    //              effect: 페이지가 변경될 때 마다 실행될 함수                //
    //이거는 비밀번호확인 인풋창에서 enter 버튼을 클릭하면 다음단계 버튼이 동작 되게 하는거다.
    useEffect(()=> {
      if (page === 2){
        if (!nicknameRef.current) return;
        nicknameRef.current.focus();
      }
    }, [page])


    //          render: sign up card  컴포넌트 렌더링         //
      return (
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
               <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'회원가입'}</div>
                <div className='auth-card-page'>{`${page}/2`}</div>
               </div>
               {page === 1 && (
                <>
                  <InputBox ref={emailRef} label='이메일 주소*' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onkeyDown={onEmailKeyDownHandler}/>
                  <InputBox ref={passwordRef} label='비밀번호*' type={passwordType} placeholder='비밀번호를 입력해주세요.' value={password} onChange={onPasswordChangeHanlder} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onkeyDown={onPasswordKeyDownHandler}/>
                  <InputBox ref={passwordCheckRef} label='비밀번호 확인*' type={passwordCheckType} placeholder='비밀번호를 다시 입력해주세요.' value={passwordCheck} onChange={onPasswordCheckChangeHanlder} error={ispasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onkeyDown={onPasswordCheckKeyDownHandler}/>
                </>
               )} 
               {page === 2 && (
                <>
                  <InputBox ref={nicknameRef} label='닉네임*' type='text' placeholder='닉네임을 입력해주세요' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onkeyDown={onNicknameKeyDownHandler}/>
                  <InputBox ref={telNumberRef} label='휴대 폰번호*' type='text' placeholder='핸드폰 번호를 입력해주세요' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onkeyDown={onTelNumberKeyDownHandler}/>
                  <InputBox ref={addressRef} label='주소*' type='text' placeholder='우편번호 찾기' value={address} onChange={onAddressChangeHandler} error={isAddressError} message={addressErrorMessage} icon='expand-right-light-icon' onButtonClick={onAddressButtonClickHandler} onkeyDown={onAddressKeyDownHandler}/>
                  <InputBox ref={addressDetailRef} label='상세 주소*' type='text' placeholder='상세주소를 입력해주세요' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onkeyDown={onAddressDetailKeyDownHandler}/>
                </>
               )}   
            </div>
            <div className='auth-card-bottom'>
              {page === 1 && (
                <div className='black-large-full-button'onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
              )}

              {page === 2 && (
                <>
                  <div className='auth-conset-box'>
                    <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                       <div className={`icon ${agreedPersonal ? `check-round-fill-icon` : `check-ring-light-icon`}`}></div>  
                    </div>
                    <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                    <div className='auth-consent-link'>{'더보기 >'}</div>
                  </div>
                  <div className='black-large-full-button'onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                </>
              )} 
              <div className='auth-description-box'>
                <div className='auth-description'>{'이미 계정이 있으신가요?'}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'로그인'}</span></div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  

  
  //          render: 인증 화면  컴포넌트 렌더링         //
  return (
    <div id='auth-wrapper'>
        <div className='auth-container'>
          <div className='auth-jumbotron-box'>
              <div className='auth-jumbotron-contents'>
                <div className='auth-logo-icon'></div>
                <div className='auth-jumbotron-text-box'>
                  <div className='auth-jumbotron-text'>{'환영합니다.'}</div> 
                  <div className='auth-jumbotron-text'>{'HOONS BOARD 입니다.'}</div> 
                </div>
              </div>
          </div>
          {view === 'sign-in' && <SignInCard />}
          {view === 'sign-up' && <SignUpCard />}
        </div>
    </div>
  )
}
