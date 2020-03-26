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
    FM_METADATALIST? : FM_METADATA[],
    columnList ? : any[],
    dataList? : any[],
    crudFlag? : string
    
  };
  export interface FM_METADATA{
    TABLENAME? : string,
    COLUMNNAME? : string,
    COLUMNORDER? : number,
    ISKEY? : string,
    DATATYPE? : string,
    ISREQUIRED? : string,
    INPUTTYPE?: string,
    SELECTQUERY? : string,
    PARIENTCOLUMNNAME?: string,
    VALUE? : any
  }
  

const READSIDEBAR = 'MAIN/READSIDEBAR';
const CHECKEDSIDEBAR = 'MAIN/CHECKEDSIDEBAR';
const CLICKSIDEBAR = 'MAIN/CLICKSIDEBAR';
const CLICKROWDATA = 'MAIN/CLICKROWDATA';
const CHANGEFM_METADATALIST = 'MAIN/CHANGEFM_METADATALIST';

const CREATE = 'MAIN/CREATE';

  interface CreateAction {
    type : typeof CREATE;
  }

  interface ChangeFm_MetaDataListAction {
    type : typeof CHANGEFM_METADATALIST;
    payload : {
      name : string,
      value :any
    }
  }
  interface ClickRowDataAction {
    type : typeof CLICKROWDATA;
    rowData : any;
  }
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
  export type MainActionTypes = ReadSideBarAction|CheckedSideBarAction|ClickSideBarAction|ClickRowDataAction|ChangeFm_MetaDataListAction|CreateAction;

  function create (){
    return{
      type : CREATE
    }
  }

  function changeFm_MetaDataList (name : string,value : any){
    return{
      type : CHANGEFM_METADATALIST,
      payload : {
        name : name,
        value :value
      }
    }
  }

  function clickRowData (rowData : any){
    return {
      type : CLICKROWDATA,
      rowData : rowData
    }
  }
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
    readSideBar,checkedSideBar,clickSideBar,clickRowData,changeFm_MetaDataList,create
  };

  const initialState : MainState = {
    menuList : [],
    adminMenuList : [],
    MENUTYPE: '',
    FM_METADATALIST : [],
    columnList : [],
    dataList : [],
    crudFlag : 'READ'
  };

  
// **** 리듀서 작성
export default function Main(state = initialState, action :MainActionTypes) {
    let menuList : SideBar[];
    let adminMenuList : SideBar[];
    let FM_METADATALIST : any[] =[];
    let dataListResult : any[] =[];
    let columnListResult : any[] = [];
    switch (action.type) {

      case CREATE:


        try {
          dataListResult = (window as any).createData(state.FM_METADATALIST);
          
        } catch (error) {
          
        }
        
        return produce(state ,draft =>{
          draft.dataList = dataListResult;
        });

      case CHANGEFM_METADATALIST:
        return produce( state, draft =>{
          for(let i=0;i<draft.FM_METADATALIST.length;i++){
            if(action.payload.name === draft.FM_METADATALIST[i].COLUMNNAME){
              draft.FM_METADATALIST[i].VALUE = action.payload.value;
              break;
            }
          }
      });

      case CLICKROWDATA:
        return produce( state, draft =>{
          for(let key in action.rowData){
            for(let i=0;i<draft.FM_METADATALIST.length;i++){
              if(key === draft.FM_METADATALIST[i].COLUMNNAME){
                draft.FM_METADATALIST[i].VALUE = action.rowData[key];
                break;
              }
            }
          }
          });

      case CLICKSIDEBAR:
        try {
          FM_METADATALIST = (window as any).getFM_METADATA(action.payload);
          dataListResult = (window as any).getData(FM_METADATALIST);
        } catch (error) {
          
        }

        for(let i=0 ; i < FM_METADATALIST.length;i++){
          columnListResult.push({ title : FM_METADATALIST[i].COLUMNNAME, field : FM_METADATALIST[i].COLUMNNAME });
        }
        
        return produce(state ,draft =>{
          draft.FM_METADATALIST = FM_METADATALIST;
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