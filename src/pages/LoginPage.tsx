import { EuiButton, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiImage, EuiLink, EuiText } from "@elastic/eui";
import React, { useState } from "react";
import login from "./login.png";
import LoginService from "../services/loginServie";
import { useNavigate } from "react-router-dom";

const LoginPage:React.FC = ()=>{
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = ()=>{
    if(!name||!password){
      alert("please fillup all fields");
      return;
    }
    const {success, message} = LoginService({name, password});

    if(success){
      alert("login successfull");
      navigate('/home');
    }else{
      alert(message);
    }
  }
  return(
    <>    
    <EuiFlexGroup className="task-container" direction="column" justifyContent="center" alignItems="center">
      <EuiText className="welcome">Welcome back!</EuiText> 
      <p style={{textAlign: 'center'}}>Let's help you meet your tasks </p> 
      <EuiImage className="cat-image" src={login} alt=""/>    
      <EuiFlexItem className="field-spacing">
       <EuiFieldText className="text" placeholder="Enter your name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </EuiFlexItem>      
     
      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </EuiFlexItem>
      
     
      <EuiFlexItem grow = {false}>
          <div className="div-button"><EuiButton className="button" onClick={handleLogin}>Login</EuiButton></div>
      </EuiFlexItem>
     
      <EuiText className="link-text">Don't have an account?
        <EuiLink className="link" onClick={()=>navigate('/signup')}>Sign Up</EuiLink>
      </EuiText>

    </EuiFlexGroup>
    </>
  )
}
export default LoginPage;