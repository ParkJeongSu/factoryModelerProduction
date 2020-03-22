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

const CHANGEID = 'LogInOut/CHANGEID';
const CHANGENAME = 'LogInOut/CHANGENAME';
const CHANGEHOST = 'LogInOut/CHANGEHOST';
const CHANGEDBID = 'LogInOut/CHANGEDBID';
const CHANGEDBPW = 'LogInOut/CHANGEDBPW';
const CHANGEUSERID = 'LogInOut/CHANGEUSERID';
const CHANGEUSERPW = 'LogInOut/CHANGEUSERPW';

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

export type LogInActionTypes = LogInAction;

function logIn (){
  return {
    type : LOGIN,
    payload : {
      isLogin : true
    }
  }
}

export const actionCreators = {
  logIn
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
        isLogined: !state.isLogined
      };
    default:
      return state;
  }
}

