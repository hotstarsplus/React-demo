import React,{Component} from 'react';
import { useNavigate,HashRouter } from 'react-router-dom';
import './login.css';
import LoginInput from './LoginInput';
import { Route, Routes } from 'react-router';
import App from '../App';


function LoginCanvas() {
    
    const navigate = useNavigate();  //v6改版之后弃用history.push()，改用navigate

    function onlogin(){
        navigate('/index');
    }
        return(
            <div className='loginCanvasStyle'>
                <div className='loginPosition'>
                     <LoginInput onlogin={onlogin}></LoginInput>
                </div>                                                           
            </div>
        )

    
}

export  class RouterTest extends Component<any,any>{
    render(){
        return(
            <HashRouter>
            <Routes>
                <Route path='/' element={<LoginCanvas/>} />
                <Route path='/index' element={<App/>}/>
            </Routes>
            </HashRouter>
            
        );
    }
}

export default RouterTest;