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
const CONNECTTEST = 'LogInOut/CONNECTTEST';


const SAVEDBCONFIG = 'LogInOut/SAVEDBCONFIG';
const DELETEDBCONFIG = 'LogInOut/DELETEDBCONFIG';



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

interface SelectedDbConfig {
  type : typeof SELECTEDDBCONFIG;
  payload : {
    id? : number;
  }
}
interface ConnectTest {
  type : typeof CONNECTTEST;
  payload : {
    dbConnectTest : boolean;
  }
}

export type LogInActionTypes = LogInAction|LogOutAction|ChangeInputValue|SelectedDbConfig|ConnectTest;

function connectTest (){
  return {
    type : CONNECTTEST
  }
}

function selectedDbConfig (id? : number){
  return {
    type : SELECTEDDBCONFIG,
    payload : {
      id : id
    }
  }
}


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
  logIn,logOut,changeInputValue,selectedDbConfig,connectTest
};

const initDbconifg= () : DbconfigList[] =>{
  let initDbconifgList : DbconfigList[] =[];
  try {
    initDbconifgList = (window as any).getDbConfig()
  } catch (error) {
    console.log('error : ',error );
  }
  return initDbconifgList;
}

// **** 초기상태 정의
const initialState : LogInOutState = {
    dbconfigList : initDbconifg(),    
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
  CONNECTTEST
  switch (action.type) {
    case CONNECTTEST:
      let connectResult=null;
      try {
        connectResult = (window as any).dbConnectTest()
      } catch (error) {
        connectResult=false;
        console.log(error);
      }
      return {
        ...state,
        dbConnectTest: connectResult
      };
      case SELECTEDDBCONFIG:
        if(action.payload.id===null){
          return {
            ...state,
            id : null,
            name : null,
            host : null,
            dbid : null,
            dbpw : null,
            userid : null,
            userpw : null,
            dbConnectTest : null
          };
        }else{
          return {
            ...state,
            id : state.dbconfigList[action.payload.id].id,
            name : state.dbconfigList[action.payload.id].name,
            host : state.dbconfigList[action.payload.id].host,
            dbid : state.dbconfigList[action.payload.id].dbid,
            dbpw : state.dbconfigList[action.payload.id].dbpw,
            userid : state.dbconfigList[action.payload.id].userid,
            userpw : state.dbconfigList[action.payload.id].userpw,
            dbConnectTest : null
          };
        }
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

