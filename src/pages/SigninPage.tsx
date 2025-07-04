import { EuiButton, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiLink, EuiText } from "@elastic/eui";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupService from "../services/signupService";

const SigninPage = ()=>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

const handleRegister = ()=>{
  if(!name || !email || !password || password !== confirmPassword) {
    alert ("please fill all fields and match passwords.");
    return; // stop if valid
  }
  
  const { success, message } = SignupService({ name, email,password });

  if (success){
    alert("Signup successful!");
    navigate("/home");
  } else {
    alert(message);
  }
};

  return(
    <div className="iphone-frame">
    <EuiFlexGroup className="task-container" direction="column" alignItems="center" justifyContent="center"> 
        <EuiText className="welcome">Welcome onboard!</EuiText> 
            <p style={{textAlign: 'center', marginBottom: '20px'}}>Let's help you meet your tasks </p>      
      <EuiFlexItem className="field-spacing">
       <EuiFieldText className="text" placeholder="Enter your full name" value={name} onChange={(e)=>setName(e.target.value)}/>
      </EuiFlexItem>
      
      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Enter your email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
      </EuiFlexItem>

      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Enter Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
      </EuiFlexItem>

      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
      </EuiFlexItem>

      <EuiFlexItem className="button-group" grow = {false}>
          <div className="div-button"><EuiButton className="button" onClick={handleRegister}>Register</EuiButton></div>
      </EuiFlexItem>     

      <EuiText className="link-text">Already have an account?
        <EuiLink className="link" onClick={()=>navigate('/login')}>Sign In</EuiLink>
      </EuiText>

    </EuiFlexGroup>
    </div>
  )
}
export default SigninPage;