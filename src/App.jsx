import React,{ useState,useEffect } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import { Footer, Header } from './components'
import Signup from './components/Signup'
import Login from './components/Login'
import RTE from './components/RTE'
import { Outlet } from 'react-router-dom'
import conf from './conf/conf'
function App() {
  // console.log(conf.appwriteProjectId);
  const [loading , setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData)=>{

        if(userData) dispatch(login({userData}));

        else dispatch(logout());

      })
      .finally(()=>setLoading(false))

  }, []);
  
  return !loading ?
  (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        
            <div className = 'w-full block'>
                <Header/>
                <main>
                   
                    {/* <div>hello</div> */}
                    <Outlet/>
                   
                </main>
                <Footer/>
            </div>
        </div>
  ):null;
}

export default App

