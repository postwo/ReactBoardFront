import React, { ChangeEvent, Dispatch,forwardRef,SetStateAction,KeyboardEvent } from 'react'
import './style.css';

//         interface: Input Box 컴포넌트 Propperties          //
interface Props { //이거는 외부에서 받아오는것들
  label: string;
  type: 'text' | 'password';
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: boolean;

  // ?는 필수가 아니고 선택이다
  icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
  
  onButtonClick?: ()=> void;

  message?: string;

  onkeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}



//         component: Input Box 컴포넌트          //
const InputBox = forwardRef<HTMLInputElement,Props>((props: Props,ref) =>{

  //         state: properties          //
  const {label,type, placeholder, value ,error,icon,message} = props;
  const {setValue, onButtonClick, onkeyDown} = props;

  //         event handler: input 값 변경 이벤트 처리 함수   //
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    const {value} = event.target;
    setValue (value);
  }

  //         event handler: input 키 이벤트 처리 함수   //
  const onkeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(!onkeyDown) return;
    onkeyDown(event);
  }


  //         render: Input Box 컴포넌트          //
  //        ``을 쓰면 {}이걸로 감싸줘야 한다
  //        ref={ref}는 인풋창에서 enter를 치면 다음 input창으로 넘어가는걸 뜻한다
  return (
    <div className='inputbox'>
      <div className='inputbox-label'>{label}</div>
      <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
        <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHandler} onKeyDown={onkeyDownHandler}/>
        {onButtonClick !== undefined && (
          <div className='icon-button' onClick={onButtonClick}>
            {icon !== undefined && <div className={`icon ${icon}`}></div>}
        </div>
        )}
        
      </div>
      {message !== undefined && <div className='inputbox-message'>{message}</div>}
    </div>
  )

}); 

export default InputBox;