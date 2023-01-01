export class LoginClass {
    private email:string;
    private password:string;
    private user_name!:string;
    constructor(email:string,user_name:string,password:string) {
        this.email = email;
        this.user_name=user_name;
        this.password = password;
    }
}
