import { create } from "zustand";
import { User } from "../types/interface";

interface LoginUserStore{
    loginUser: User | null;
    setLoginUser: (loginUser: User) => void; 
    resetLoginUser: () => void;
};

// 상태 변경 set 함수 ==setLoginUser,resetLoginUser
const useLoginUserStore = create<LoginUserStore>(set =>({
    loginUser: null,
    setLoginUser: loginUser => set(state =>({...state, loginUser})),
    resetLoginUser: ()=> set(state => ({ ...state, loginUser:null }))
}));

export default useLoginUserStore;