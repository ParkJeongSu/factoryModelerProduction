import produce from 'immer';

export interface SideBar{
    MENUID : number;
    MENUNAME :string;
    ISROOT   :string;
    POSITION :number;
    MENUTYPE :string;
    PARENTMENUID :number;
    FM_METADATA :string;
    FM_POLICYMETADATA :string;
    ADMINFLAG :string;
    CHILDRENLIST? :SideBar[];
    SHOW? :boolean;
  };
export interface MainState {
    menuList : SideBar[],
    adminMenuList : SideBar[],
    MENUTYPE : string,
    FM_METADATA? : string,
    columnList? : any[],
    dataList? : any[]
    
  };
  

const READSIDEBAR = 'MAIN/READSIDEBAR';
const CHECKEDSIDEBAR = 'MAIN/CHECKEDSIDEBAR';
const CLICKSIDEBAR = 'MAIN/CLICKSIDEBAR';

  interface ReadSideBarAction {
    type : typeof READSIDEBAR;
  }
  interface CheckedSideBarAction {
    type : typeof CHECKEDSIDEBAR;
    MENUID :  number;
  }
  interface ClickSideBarAction{
    type : typeof CLICKSIDEBAR;
    payload : {
      sidebar : SideBar;
    }
  }
  export type MainActionTypes = ReadSideBarAction|CheckedSideBarAction|ClickSideBarAction;

  function readSideBar (){
    return {
      type : READSIDEBAR
    }
  }
  function checkedSideBar ( MENUID : number ){
    return {
      type : CHECKEDSIDEBAR,
      MENUID : MENUID
    }
  }
  function clickSideBar ( sideBar : SideBar ){
    return {
      type : CLICKSIDEBAR,
      payload : sideBar
    }
  }


  export const actionCreators = {
    readSideBar,checkedSideBar,clickSideBar
  };

  const initialState : MainState = {
    menuList : [],
    adminMenuList : [],
    MENUTYPE: '',
    columnList : [],
    dataList : []
  };

  
// **** 리듀서 작성
export default function Main(state = initialState, action :MainActionTypes) {
    let menuList : SideBar[];
    let adminMenuList : SideBar[];
    switch (action.type) {
      case CLICKSIDEBAR:
        let parameter : any = Object.assign({},action.payload);
        let columnListResult = (window as any).getFM_METADATA(action.payload);
        parameter.columnList = columnListResult;
        let dataListResult = (window as any).getData(parameter);
        return produce(state ,draft =>{
          draft.columnList = columnListResult;
          draft.dataList = dataListResult;
        });
      case CHECKEDSIDEBAR:
        return produce( state, draft =>{
          for(let i=0;i<draft.menuList.length;i++){
            if(action.MENUID === draft.menuList[i].MENUID){
              draft.menuList[i].SHOW = !draft.menuList[i].SHOW;
            }
          }
          for(let i=0;i<draft.adminMenuList.length;i++){
            if(action.MENUID === draft.adminMenuList[i].MENUID){
              draft.adminMenuList[i].SHOW = !draft.adminMenuList[i].SHOW;
            }
          }
          });
      case READSIDEBAR:
        try {
          menuList = parseMenuList ((window as any).getFM_MENU('N') );
          adminMenuList = parseMenuList( (window as any).getFM_MENU('Y') );
        } catch (error) {
          console.log('error : ',error);
        }
        return produce( state, draft =>{ draft.menuList = menuList,draft.adminMenuList = adminMenuList });
      default:
        return state;
    }
  }



  const parseMenuList = (result : SideBar[] ) : SideBar[] =>{
    let map : any = {};
    let roots :SideBar[] = [];
    let node : any = [];
    for(let i=0;i<result.length;i++){
      result[i].SHOW=true;
      result[i].CHILDRENLIST = [];
    }

    for (let i = 0; i < result.length; i += 1) {
      map[result[i].MENUID] = i; // initialize the map
    }
    for (let i = 0; i < result.length; i += 1) {
      node = result[i];
      if (node.PARENTMENUID === null) {
        roots.push(node);
      } else {
        // if you have dangling branches check that map[node.parentId] exists
        result[map[node.PARENTMENUID]].CHILDRENLIST.push(node);
      }
    }
    return roots;
  }