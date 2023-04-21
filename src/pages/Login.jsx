import React, { useState,useReducer } from "react";
import { register } from "../redux/AuthReducer/action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF,faGoogle,faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { login } from "../redux/AuthReducer/action";
import { useToast,Button} from "@chakra-ui/react";
import styles from './Login.module.css';
import { ViewIcon } from "@chakra-ui/icons";
// import GoogleLogin from "react-google-login";
import jwt_decode from "jwt-decode";
import {GLogin} from "../components/Other/GLogin";


const Login= ({ chooseMessage })=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const reducer = (state, action) => {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload };
      case "email":
        return { ...state, email: action.payload };
      case "mobile":
        return { ...state, mobile: action.payload };
      case "password":
        return { ...state, password: action.payload };
      
      default:
        return state;
    }
  };

  const initialState = {
    name: "",
    email: "",
    mobile:"",
    password: "",
    
  };
  const [state, setState] = useReducer(reducer, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState();
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const pathRoute = location.state?.from || "/";
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye((prev) => !prev);
  };
  const loginHandler=(e)=>{
    e.preventDefault();
    if (email && password) {
      const params = {
        email,
        password,
      };
      dispatch(login(params, toast)).then((res) => {
        
        
        if(res.description==="admin"){
          navigate("/admin", { replace: true });
          window.location.reload();
        }
        else{
          // console.log('pathroute',res.data);
          if('data' in res){
            console.log('rs',res.data.token);
            localStorage.setItem('jwtToken', res.data.token);
            localStorage.setItem('username', res.data.username);
            var data = JSON.stringify(res.data);
            localStorage.setItem('all', data);

            chooseMessage(res.data);
            window.location.reload();
          }
          else{
            // console.log('response',res.)
            setErrors(res.response.data.errors)
            
          }
          
          
        }

      });
    }
  };

  const signupHandle = (e) => {
    const confirPassword=e.target.confirmPass.value;
    console.log('satat',state);
    e.preventDefault();
    if(confirPassword===state.password){
      dispatch(register(state, toast)).then((r) => {
        if('data' in r){
          localStorage.setItem('jwtToken', r.data.token);
          localStorage.setItem('username', r.data.username);
          var data = JSON.stringify(r.data);
          localStorage.setItem('all', data);
          // console.log('data',data)
          chooseMessage(r.data);
          window.location.reload();
        }
        else{
          console.log('r',r.response.data.errors);
          setErrors(r.response.data.errors);
          
        }
        
      });

    }
    else{
      setErrors({confirm:'The Password does not match'});
    }
    
  };
  const [isContainerActive, setIsContainerActive] = useState();
  
  const SignUpClick=()=>{
    setIsContainerActive(true);
    setErrors({});
  }
  const SignInClick=()=>{
    setIsContainerActive(false);
    setErrors({});
  }
  


  const setGLogin = (isLogin) => {
    setIsLogin(isLogin);
    console.log(isLogin,'isLogin');
    chooseMessage(isLogin);
    // if('user' in message && 'username' in message){
    //   console.log(message);
    //   // setLogin(true);
    // }
  };
 
  
  return(
    <>
        
    
   
    <div className={`${styles.container} ${isContainerActive ? `${styles.rightpanelactive}` : ""}`} id="container">
	<div className={`${styles.formcontainer} ${styles.signupcontainer}`}>
		<form className={styles.formLogin} onSubmit={signupHandle}>
			<h1 className={styles.h1Login}>Create Account</h1>
			<div className={styles.socialcontainer}>
				<a className={`${styles.aLogin} ${styles.social}`}><FontAwesomeIcon icon={faFacebookF} /></a>
				<a className={`${styles.aLogin} ${styles.social}`} href="#" ><FontAwesomeIcon icon={faGoogle} /></a>
				<a className={`${styles.aLogin} ${styles.social}`} href="#" ><FontAwesomeIcon icon={faLinkedinIn} /></a>
			</div>
			<span className={styles.spanLogin}>or use your email for registration</span>
			<input className={styles.inputLogin} onChange={(e) => setState({ type: "name", payload: e.target.value })} type="text" placeholder="Name" />
			<input className={styles.inputLogin} onChange={(e) => setState({ type: "email", payload: e.target.value })} type="email" placeholder="Email" />
      <div className="email error" style={{color:'#d93c34',fontSize:'1.2rem'}}>{errors?.email}</div>
      <input className={styles.inputLogin} onChange={(e) => setState({ type: "mobile", payload: e.target.value })} type="tel" placeholder="Mobile" />
			<input className={styles.inputLogin} onChange={(e) => setState({ type: "password", payload: e.target.value })} type="password" placeholder="Password" />
      <input className={styles.inputLogin} name="confirmPass" type="password" placeholder="Confirm Password" />
      <div className="email error" style={{color:'#d93c34',fontSize:'1.2rem'}}>{errors?.confirm}</div>
			<button className={styles.buttonLogin} >Sign Up</button>
		</form>
	</div>
	<div className={`${styles.formcontainer} ${styles.signincontainer}`}>
		<form className={styles.formLogin} >
			<h1 className={styles.h1Login}>Sign in</h1>
			<div className={styles.socialcontainer}>
      {/* <GoogleLogin
            clientId={'907385226953-mc9c2r4j8t9nmne9dch68s65tmkq2gqg.apps.googleusercontent.com'}
            buttonText="Log in with Google"
            onSuccess={(response) => console.log(response)}
            onFailure={(error) => console.log(error)}
            /> */}

{/* <GoogleOAuthProvider clientId="907385226953-mc9c2r4j8t9nmne9dch68s65tmkq2gqg.apps.googleusercontent.com">
<GoogleLogin
            
            buttonText="Log in with Google"
            onSuccess={GoogleLoginSucc}
            onFailure={(error) => console.log(error)}
            /></GoogleOAuthProvider>; */}

            <GLogin setGLogin={setGLogin}/>

				{/* <a className={`${styles.aLogin} ${styles.social}`} href="#" ><FontAwesomeIcon icon={faFacebookF} /></a>
				<a className={`${styles.aLogin} ${styles.social}`} ><FontAwesomeIcon icon={faGoogle} /></a>
				<a className={`${styles.aLogin} ${styles.social}`} href="#" ><FontAwesomeIcon icon={faLinkedinIn} /></a> */}
			</div>
			<span className={styles.spanLogin}>or use your account</span>
			<input  className={styles.inputLogin} type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      <div className="email error" style={{color:'#d93c34',fontSize:'1.2rem'}}>{errors?.email}</div>
			<input  className={styles.inputLogin} type={eye ? "text" : "password"} placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant={"ghost"} onClick={handleEye} style={{left: '5rem',top: '-3.9rem',backgroundColor:'rgb(250, 239, 218)',outline:'none', border : '0'}}>
            <ViewIcon />
      </Button>
      <div className="password error" style={{color:'#d93c34',fontSize:'1.2rem'}}>{errors?.password}</div>
      
			<a className={styles.aLogin} href="#">Forgot your password?</a>
			<button className={styles.buttonLogin} onClick={loginHandler} >Sign In</button>
		</form>
	</div>
	<div className={styles.overlaycontainer}>
		<div className={styles.overlay}>
			<div className={`${styles.overlaypanel} ${styles.overlayleft}`}>
				<h1 className={styles.h1Login}>Welcome Back!</h1>
				<p className={styles.pLogin}>To keep connected with us please login with your personal info</p>
				<button  onClick={()=>{SignInClick()}} className={`${styles.buttonLogin} ${styles.ghost}`} id="signIn">Sign In</button>
			</div>
			<div className={`${styles.overlaypanel} ${styles.overlayright}`}>
				<h1 className={styles.h1Login}>Hello, Friend!</h1>
				<p className={styles.pLogin}>Enter your personal details and start journey with us</p>
				<button onClick={()=>{SignUpClick()}} className={`${styles.buttonLogin} ${styles.ghost}`} id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>



    </>
  )
}

export default Login;


