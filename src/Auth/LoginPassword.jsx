
import { useState ,useEffect,useRef} from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";

const SignUpDemo = () => {
 const [ emailId, setEmailId] = useState("");
 const [ oldloginPassword, setOldPassword] = useState("");
 const [newloginPassword, setNewPassword] = useState("");
 const [confirmloginPassword, setConfirmPassword] = useState("");
 const navigate = useNavigate();
 const toast = useRef(null);
 const [formErrors, setFormErrors] = useState({});
 const [loading, setLoading] = useState(false);





  const IsValidate = () => {
    let isProceed = true;
    let errors = {};
    if (!emailId) {
      errors.emailId = "Please enter the email ID";
      isProceed = false;
    } else {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!emailRegex.test(emailId)) {
        errors.emailId = "Please enter a valid email ID";
        isProceed = false;
      } else {
        // Email ID is valid
        isProceed = true;
      }
    }
    

//     if (!oldPassword) {
//         errors.oldPassword = "Please enter the password";
//         isProceed = false;
  
// }



if (!oldloginPassword) {
  errors.oldloginPassword = "Please enter the old password";
  isProceed = false;
} else if (oldloginPassword.length < 8) {
  errors.oldloginPassword = <p>Password should be at least 8 characters long</p>;
  isProceed = false;
} else if (!/\d/.test(oldloginPassword)) {
  errors.oldloginPassword = "Password should contain at least one digit";
  isProceed = false;
} else if (!/[a-zA-Z]/.test(oldloginPassword)) {
  errors.oldloginPassword= "Password should contain at least one letter";
  isProceed = false;
} else {
  // Password is valid
  isProceed = true;
}



      if (!newloginPassword) {
        errors.newloginPassword = "Please enter the New password";
        isProceed = false;
      } else if (newloginPassword.length < 8) {
        errors.newloginPassword = "Password should be at least 8 characters long";
        isProceed = false;
      } else if (!/\d/.test(newloginPassword)) {
        errors.newloginPassword = "Password should contain at least one digit";
        isProceed = false;
      } else if (!/[a-zA-Z]/.test(newloginPassword)) {
        errors.newloginPassword = "Password should contain at least one letter";
        isProceed = false;
      } else {
        // Password is valid
        isProceed = true;
      }
     
      
      
      if (!confirmloginPassword) {
        errors.confirmloginPassword= "Please enter the confirm password";
        isProceed = false;
      } else if (confirmloginPassword.length < 8) {
        errors.confirmloginPassword= "Password should be at least 8 characters long";
        isProceed = false;
      } else if (!/\d/.test(confirmloginPassword)) {
        errors.confirmloginPassword = "Password should contain at least one digit";
        isProceed = false;
      } else if (!/[a-zA-Z]/.test(confirmloginPassword)) {
        errors.confirmloginPassword = "Password should contain at least one letter";
        isProceed = false;
      } else {
        // Password is valid
        isProceed = true;
      }
     

  
    setFormErrors(errors);

    if (!isProceed) {
      toast.warning("Please fill in all the required fields.");
    }

    return isProceed;
  };




  

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (IsValidate()) {
      setLoading(true);

      let data = {
        emailId,

        "oldPassword": btoa(oldloginPassword),
        "newPassword": btoa(newloginPassword),
        "confirmPassword": btoa(confirmloginPassword),

       
      };
   
      

  
      fetch(` ${process.env.REACT_APP_API_KEY}/dam/user/loginUser/resetPassword`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
       
      .then((result) => {
          if (result.status === 200) {
            result.json().then((resp) => {
              console.warn("resp", resp);
              setLoading(false);
              toast.current.show({
                severity: "success",
                summary: "Password Reset",
                detail: "Password Reset Successfully",
                life: 2000,
              });
      
              setTimeout(() => {
                if(sessionStorage.getItem('userrole')==='Admin'){
                  navigate('/dashboardMain')
                }
                else if(sessionStorage.getItem('userrole')==='Reviewer'){
                  navigate('/reviewermain')
                }
                else if(sessionStorage.getItem('userrole')==='Viewer'){
                  navigate('/bookmarkdoc')
                }
                else{
                  alert("something went wrong...!!")
                }
               
              }, 1000);
            });
          } else {
            result.json().then((resp) => {
              console.warn("resp", resp.message);
              setLoading(false);
      
              toast.current.show({
                severity: "warn",
                summary: "Password Not Reset",
                detail: resp.message || "Error while Resting Password",
                life: 2000,
              });
            });
          }
        },
        (error) => {
          setLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Password Not Reset",
            detail: "Error while Resting Password",
            life: 2000,
          });
        }
      );
      
    
       
    }

    
  };

  function onClickCancel(){
    if(sessionStorage.getItem('userrole')==='Admin'){
      navigate('/dashboardMain')
    }
    else if(sessionStorage.getItem('userrole')==='Reviewer'){
      navigate('/reviewermain')
    }
    else if(sessionStorage.getItem('userrole')==='Viewer'){
      navigate('/bookmarkdoc')
    }
    else{
      alert("something went wrong...!!")
    }
  }
  

  

  return (
    <div>

{loading ? (
        <span className="loading">
          <ProgressSpinner />
        </span>
      ) : null}

       <Toast ref={toast} />
      <Card className="register_module">
        <div className="offset-lg-3 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h3 style={{color:"black"}}>RESET PASSWORD</h3>
              </div>
              <div className="card-body">
                <div className="row">
                <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                        Email Id: <span className="errmsg">*</span>
                      </label>
                      <input
                     
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        className={`form-control ${
                          formErrors.emailId? "is-invalid" : ""
                        }`}
                      ></input>
                      {formErrors.emailId && (
                        <div className="invalid-feedback error-message">
                          {formErrors.emailId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                    Old Password: <span className="errmsg">*</span>
                      </label>
                  

          <div className="p-inputgroup">
           <Password style={{height: "40px" }} value={oldloginPassword} onChange={(e) =>setOldPassword(e.target.value)} toggleMask />
              </div>
                      {formErrors.oldloginPassword&& (
                        <div className="invalid-feedback error-message">
                          {formErrors.oldloginPassword}
                        </div>
                      )}
                    </div>
                  </div>
                 
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                     New Password: <span className="errmsg">*</span>
                      </label>
                  

<div className="p-inputgroup">
             {/* <Password
                  style={{ borderRadius: "2px", height: "40px" }}
                 value={newPassword}
                 onChange={(e) => setNewPassword(e.target.value)}
                toggleMask={!passwordVisible}
              //  onMouseDown={togglePasswordVisibility }
                feedback={false}
               
                
              /> */}
              <Password style={{height: "40px" }} value={newloginPassword} onChange={(e) =>setNewPassword(e.target.value)} toggleMask />
              </div>
                      {formErrors.newloginPassword && (
                        <div className="invalid-feedback error-message">
                          {formErrors.newloginPassword}
                        </div>
                      )}
                    </div>
                  </div>
                 
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>
                  Confirm New Password: <span className="errmsg">*</span>
                      </label>
                    

<div className="p-inputgroup">
             {/* <Password
                  style={{ borderRadius: "2px", height: "40px" }}
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                toggleMask={!passwordVisible}
              //  onMouseDown={togglePasswordVisibility }
                feedback={false}
               
                
              /> */}
              <Password style={{height: "40px" }} value={confirmloginPassword} onChange={(e) => setConfirmPassword(e.target.value)} toggleMask />
              </div>
                      {formErrors.confirmloginPassword&& (
                        <div className="invalid-feedback error-message">
                          {formErrors.confirmloginPassword}
                        </div>
                      )}
                    </div>
                  </div>
                 
                
             </div>
              </div>
              <div className="card-footer">
                <Button
                  type="submit"
                  style={{borderRadius:"2px"}}
                  label="Reset Password"
                
                  className="p-button-info p-button-sm"
                />
            &nbsp;    <Button
                  type="button"
                  label="Cancel"
                  style={{borderRadius:"2px"}}
                  className="p-button-danger p-button-sm"
                  // onClick={() => navigate("/login")}
                  onClick={() => onClickCancel()}
                />
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default SignUpDemo;
