export interface Users {
  name: string,
  email: string,
  password: string
}

const SignupService = (newUser: Users): {success: boolean; message: string}=>{
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const existing = users.find((u: Users)=> u.email===newUser.email);
  if(existing) return {success: false, message: "User already exists."}  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  return {success:true, message: "User registered successfully"};
};

export default SignupService;