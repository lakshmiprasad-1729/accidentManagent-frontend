export interface JsonResponse{
    status:boolean,
    userdata:string
}

class LocalStorage{
    jsonData:any;
    
    getData(){
        this.jsonData = localStorage.getItem("authData");
       return this.jsonData?JSON.parse(this.jsonData):{status:false,userdata:null}
    }
    setData(data:string){
        this.jsonData = JSON.stringify({status:true,userdata:data});
        localStorage.setItem('authData',this.jsonData);
    }
    removeData(){
        sessionStorage.removeItem('authData');
    }
    logoutData(){
        this.removeData();
        this.jsonData = JSON.stringify({status:false,userdata:null})
        localStorage.setItem('authData',this.jsonData);
    }
}

const localStorageService = new LocalStorage();

export default localStorageService;