import { EuiButton, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiImage, EuiLink, EuiText } from "@elastic/eui";
import React from "react";
import login from "./login.png";
import { useNavigate } from "react-router-dom";
const LoginPage:React.FC = ()=>{
  const navigate = useNavigate();
  return(
    <>    
    <EuiFlexGroup className="task-container" direction="column" justifyContent="center" alignItems="center">
      <EuiText className="welcome">Welcome back!</EuiText> 
      <p style={{textAlign: 'center'}}>Let's help you meet your tasks </p> 
      <EuiImage className="cat-image" src={login} alt=""/>    
      <EuiFlexItem className="field-spacing">
       <EuiFieldText className="text" placeholder="Enter your name"/>
      </EuiFlexItem>      
     
      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Enter Password"/>
      </EuiFlexItem>
      
     
      <EuiFlexItem grow = {false}>
          <div className="div-button"><EuiButton className="button">Login</EuiButton></div>
      </EuiFlexItem>
     
      <EuiText className="link-text">Don't have an account?
        <EuiLink className="link" onClick={()=>navigate('/signup')}>Sign Up</EuiLink>
      </EuiText>

    </EuiFlexGroup>
    </>
  )
}
export default LoginPage;