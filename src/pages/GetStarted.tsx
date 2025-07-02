import React from "react";
import cat from "./cat.png";
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiLink, EuiText } from "@elastic/eui";
import { useNavigate } from "react-router-dom";
const Getstarted: React.FC = ()=>{
  const navigate = useNavigate();
  return(
    <>
    <EuiFlexGroup className = " task-container" direction="column">
      <EuiFlexItem>     
    <EuiImage className='cat-image' src={cat} alt=""/>
    </EuiFlexItem>

    <EuiFlexItem grow = {false}>
    <EuiText>
      Get things done with TODo <br/>  
      <div style={{marginTop: '20px'}}>Welcome to todo mobile App....!!</div>
    </EuiText>
    </EuiFlexItem>

    
    <EuiFlexItem grow = {false}>
    <div className="div-button"><EuiButton className="button">Login</EuiButton></div>
    </EuiFlexItem>
   
    <EuiFlexItem grow = {false}>   
    <EuiText className="link-text"> Don't have an account?
      <EuiLink className="link" onClick={()=>navigate('/signup')}>SignUp</EuiLink>
      </EuiText> 
    </EuiFlexItem>    
    </EuiFlexGroup>    
    </>
  ) 
}
export default Getstarted;
