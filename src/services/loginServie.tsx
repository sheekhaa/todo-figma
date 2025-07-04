export interface Login {
  name: string, 
  password: string
}

const LoginService = (data: Login): {success: boolean; message: string} =>{
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const existing = users.find(
    (u: Login) => u.name===data.name && u.password===data.password);
    if(!existing) return {success: false, message: "invalid name or password"};
   
    localStorage.setItem('currentUser', JSON.stringify(existing));
    return{success:true, message:"user login successfully"};
};
export default LoginService;