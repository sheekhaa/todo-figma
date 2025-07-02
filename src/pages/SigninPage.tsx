import { EuiButton, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiLink, EuiText } from "@elastic/eui";
import React from "react";
import { useNavigate } from "react-router-dom";

const SigninPage = ()=>{
  const navigate = useNavigate();
  return(
    <div className="iphone-frame">
    <EuiFlexGroup className="task-container" direction="column" alignItems="center" justifyContent="center"> 
        <EuiText className="welcome">Welcome onboard!</EuiText> 
            <p style={{textAlign: 'center', marginBottom: '20px'}}>Let's help you meet your tasks </p>      
      <EuiFlexItem className="field-spacing">
       <EuiFieldText className="text" placeholder="Enter your full name"/>
      </EuiFlexItem>
      
      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Enter your email"/>
      </EuiFlexItem>

      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Enter Password"/>
      </EuiFlexItem>

      <EuiFlexItem className="field-spacing">
        <EuiFieldText className="text" placeholder="Confirm Password"/>
      </EuiFlexItem>

      <EuiFlexItem className="button-group" grow = {false}>
          <div className="div-button"><EuiButton className="button">Register</EuiButton></div>
      </EuiFlexItem>     

      <EuiText className="link-text">Already have an account?
        <EuiLink className="link" onClick={()=>navigate('/login')}>Sign In</EuiLink>
      </EuiText>

    </EuiFlexGroup>
    </div>
  )
}
export default SigninPage;