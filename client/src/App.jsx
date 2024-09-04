

import './App.css'
import { Routes, Route } from 'react-router-dom'

import Dashboard from './Pages/Dashboard/Dashboard'
import Home from './Pages/Home/Home'
import Landing from './Pages/Landing/Landing'
import Profile from './Pages/Profile/profile'
import Settings from './Pages/Settings'
import SignInPage from './Pages/SignIn/SignInPage'
import Signup from './Pages/Signup/Signup'

import Jobs from './Pages/Jobs/Jobs'
import Jobcard1 from './Pages/Jobs/Jobcard1'
import Jobcard2 from './Pages/Jobs/Jobcard2'
import Jobcard3 from './Pages/Jobs/Jobcard3'
import Jobcard4 from './Pages/Jobs/Jobcard4'
import Jobcard5 from './Pages/Jobs/Jobcard5'
import Jobcard6 from './Pages/Jobs/Jobcard6'
import Jobcard7 from './Pages/Jobs/Jobcard7'
import Jobcard8 from './Pages/Jobs/Jobcard8'


import Internships from './Pages/Internship/Internships'
import Icard1 from './Pages/Internship/Icard1'
import Icard2 from './Pages/Internship/Icard2'
import Icard3 from './Pages/Internship/Icard3'
import Icard4 from './Pages/Internship/Icard4'
import Icard5 from './Pages/Internship/Icard5'
import Icard6 from './Pages/Internship/Icard6'

// import Resume from './Pages/Resume'
import SavedJobs from './Pages/SavedJobs'

import Template from './Pages/Template/Template'

import Resume1 from './Pages/Resume/Resume1'
import Resume2 from './Pages/Resume/Resume2'
import Resume3 from './Pages/Resume/Resume3'
import Resume4 from './Pages/Resume/Resume4'
import Resume5 from './Pages/Resume/Resume5'

import Template1 from './Pages/Resume/Template1'
import Template2 from './Pages/Resume/Template2'
import TemplateRenderer from './Pages/Resume/ResumeParent'
import ProfileView from './Pages/Profile/ProfileView'


function App() {
  

  return (
    <div>
    
    <Routes>
     <Route path="/home" element={<Home />} />
     <Route path="/dashboard" element={<Dashboard />} /> 
     <Route path="/jobs" element={<Jobs />} />
     <Route path="/jobcard1" element={<Jobcard1/>} />
     <Route path="/profile" element={<Profile/>} /> 
     <Route path="/setting" element={<Settings/>} />
     <Route path="/jobcard2" element={<Jobcard2/>} />
     <Route path="/jobcard3" element={<Jobcard3/>} />
     <Route path="/jobcard4" element={<Jobcard4/>} />
     <Route path="/jobcard5" element={<Jobcard5/>} />
     <Route path="/jobcard6" element={<Jobcard6/>} />
     <Route path="/jobcard7" element={<Jobcard7/>} />
     <Route path="/jobcard8" element={<Jobcard8/>} />
     <Route path="/login" element={<SignInPage/>} />
     <Route path="/signup" element={<Signup/>} />
     <Route path="/" element={<Landing/>} />
     <Route path="/Intern" element={<Internships/>} />
     <Route path="/icard1" element={<Icard1/>} />
     <Route path="/icard2" element={<Icard2/>} />
     <Route path="/icard3" element={<Icard3/>} />
     <Route path="/icard4" element={<Icard4/>} />
     <Route path="/icard5" element={<Icard5/>} />
     <Route path="/icard6" element={<Icard6/>} />
     <Route path="/profileview" element={<ProfileView/>} />
     {/* <Route path="/resume" element={<Resume/>} /> */}
     <Route path="/sj" element={<SavedJobs/>} />
     <Route path="/resume" element={<Template />} />

     <Route path="resume1" element={<Resume1 />} />
     <Route path="resume2" element={<Resume2 />} />
     <Route path="resume3" element={<Resume3 />} />
     <Route path="resume4" element={<Resume4 />} />
     <Route path="resume5" element={<Resume5 />} />
     <Route path="template1" element={<Template1 />} />
     <Route path="template2" element={<Template2 />} />
     <Route path="/template/:templateId" element={<TemplateRenderer />} />


    </Routes>

   
    
    </div>
  )
}

export default App
