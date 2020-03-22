export interface DbconfigList{
  id : number;
  name : string;
  host : string;
  dbid : string;
  dbpw : string;
  userid : string;
  userpw : string;
}
export interface LogInOutState {
  dbconfigList : DbconfigList[];
  dbConnectTest?: boolean;
  isLogined: boolean;
  id?: number;
  name?:string;
  host?:string;
  dbid? : string;
  dbpw? : string;
  userid? : string;
  userpw? : string;
}

// 액션 타입 정의
const LOGIN = 'LogInOut/LOGIN';
const LOGOUT = 'LogInOut/LOGOUT';
const CHANGEINPUTVALUE = 'LogInOut/CHANGEINPUTVALUE';

const SELECTEDDBCONFIG = 'LogInOut/SELECTEDDBCONFIG';
const SAVEDBCONFIG = 'LogInOut/SAVEDBCONFIG';
const DELETEDBCONFIG = 'LogInOut/DELETEDBCONFIG';

const CONNECTTEST = 'LogInOut/CONNECTTEST';

interface LogInAction {
  type : typeof LOGIN;
  payload : {
    isLogin : boolean;
  }
}
interface LogOutAction {
  type : typeof LOGOUT;
  payload : {
    isLogin : boolean;
  }
}
interface ChangeInputValue {
  type : typeof CHANGEINPUTVALUE;
  payload : {
    name : string;
    value :string;
  }
}


export type LogInActionTypes = LogInAction|LogOutAction|ChangeInputValue;

function changeInputValue (name:string,value:string){
  return {
    type : CHANGEINPUTVALUE,
    payload : {
      name : name,
      value : value
    }
  }
}

function logIn (){
  return {
    type : LOGIN,
    payload : {
      isLogin : true
    }
  }
}
function logOut (){
  return {
    type : LOGIN,
    payload : {
      isLogin : false
    }
  }
}

export const actionCreators = {
  logIn,logOut,changeInputValue
};

// **** 초기상태 정의
const initialState : LogInOutState = {
    dbconfigList : [],    
    isLogined: false,
    id: null,
    name:null,
    host:null,
    dbid:null,
    dbpw:null,
    userid:null,
    userpw:null,
    dbConnectTest: null,
  };

// **** 리듀서 작성
export default function LogInOut(state = initialState, action : LogInActionTypes) {
  switch (action.type) {
      case LOGIN:
        return {
          ...state,
          isLogined: action.payload.isLogin
        };
      case LOGOUT:
        return {
          ...state,
          isLogined: action.payload.isLogin
        };
      case CHANGEINPUTVALUE:
        return {
          ...state,
          [action.payload.name] : action.payload.value
        };
    default:
      return state;
  }
}

