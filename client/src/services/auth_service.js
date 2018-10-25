import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {

    tokenKey = 'auth_token';

    
    saveToken(token){
        return localStorage.setItem( this.tokenKey, token );
    }

    getToken(){
        return localStorage.getItem(this.tokenKey);
    }

    decode(token){
        return jwt.decode(token);
    }

    getUsername(){
        return this.decode(this.getToken()).username;
    }

  
    invalidateUser(){
        localStorage.removeItem(this.tokenKey) //logout
    }

    getExpiration(token){ // hết hạn đăng nhập
        const exp = this.decode(token) ;

        return moment.unix(exp);
    }

    isValid(token){
        return moment().isBefore( this.getExpiration(token) )
    }

    isAuthenticated(){ //được xác thực
        const token = this.getToken() ;
        
        return ( token && this.isValid(token) ) ? true : false; 
    }

}

export default new AuthService();