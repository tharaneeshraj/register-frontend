import { use, useState } from "react"

const Register=()=>{

    const userData={
        name:"",
        dob:"",
        age:"",
        pswd:"",
        cpswd:"",
        about:"",
    }

    const [user,setUser] =useState(userData)
    const [errors,setErrors] = useState({})

    const handleChange=(e)=>{
        const{name,value}=e.target
        setUser((prevUser)=>({...prevUser,[name]:value}))
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        const newErrors={}
        Object.keys(user).forEach((key)=>{
            const errorMsg=validField(key,user[key])
            if(errorMsg) newErrors[key] =errorMsg
        })
        setErrors(newErrors)

        if (Object.keys(newErrors).length===0) {
            console.log("Submitted Successfully",user)
        }
    }
    const validField =(name,value)=>{
        let errorMsg=""

        if(name==="name" && value.length <5) errorMsg="Enter Min 5 characters"
        if(name==="age"){
            if(!value) errorMsg="Age is required"
            else if(value<0 ||value>120 || NaN(value)) errorMsg="enter valid age(0-100)"
        }
        if(name === "dob" && !value) errorMsg="Date of birth is required"
        if(name==="password" && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{10,}$/.test(value)) errorMsg="Enter valid password"
        if(name==="cpswd")
            if(!value) errorMsg="Password is required"
        else if(value !== user.pswd) errorMsg="Must match with the password"
        if(name==="about")
            if(!value) errorMsg="Tell yourself"
        else if(value.length>200) errorMsg="Write less than 200 characters"
    }

    const handleBlur =(e)=>{
        const{name,value} =e.target
        setErrors((prevUser)=>({...prevUser,name:validField(name,value)}))

    }


    return(
        <div className="container">
            <center>
                <h1>User Registration</h1>
            <form>
                <div className="inside-container">
                    <input type="text" name="name" placeholder="Username" value={user.name} onChange={handleChange} onBlur={handleBlur}></input>
                </div>
                <div className="inside-container">
                    <input type="date" name="dob" value={user.dob} onChange={handleChange} onBlur={handleBlur}></input>
                </div>
                <div className="inside-container">
                    <input type="number" name="age" value={user.age} placeholder="Enter Age" onChange={handleChange} onBlur={handleBlur}></input>
                </div>
                <div className="inside-container">
                    <input type="password" name="pswd" value={user.pswd} placeholder="Enter Password" onChange={handleChange} onBlur={handleBlur}></input>
                </div>
                <div className="inside-container">
                    <input type="password" name="cpswd" value={user.cpswd} placeholder="Re-enter Password" onChange={handleChange} onBlur={handleBlur}></input>
                </div>
                <div className="inside-container">
                    <textarea name="about" placeholder="Tell me yourself about less than 200 characters" value={user.about} onChange={handleChange} onBlur={handleBlur}></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            </center>
        </div>
    )
}
export default Register;