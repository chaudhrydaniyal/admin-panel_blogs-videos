import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useHistory, withRouter} from "react-router"


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
          errors: {},
        };
      }
      onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
      };
      onSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // make axios post request
          const response = await axios({
            method: "post",
            url: "http://localhost:3001/auth/login",
            data: {
              email: this.state.email,
              password: this.state.password,
            },
            headers: { "Content-Type": "application/json" },
          });
    
          console.log("response",response);
    
          if (response.data==="login successful")
          {
            console.log("redirect")
            this.props.history.push("/admin")
            localStorage.setItem("auth", true)
          }
    
        } catch (error) {
          console.log(error);
        }
      };
  render() {

    const { errors } = this.state;
    return (
      <section class="vh-100 shadow" style={{ backgroundColor: "#D9D9D9" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div class="left">
                  {/* <svg
                    enable-background="new 0 0 300 302.5"
                    version="1.1"
                    viewBox="0 0 300 302.5"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                  > */}
                    {/* <style type="text/css">
	.st01{fill:#fff;}
</style> */}
                    {/* <path
                      class="st01"
                      d="m126 302.2c-2.3 0.7-5.7 0.2-7.7-1.2l-105-71.6c-2-1.3-3.7-4.4-3.9-6.7l-9.4-126.7c-0.2-2.4 1.1-5.6 2.8-7.2l93.2-86.4c1.7-1.6 5.1-2.6 7.4-2.3l125.6 18.9c2.3 0.4 5.2 2.3 6.4 4.4l63.5 110.1c1.2 2 1.4 5.5 0.6 7.7l-46.4 118.3c-0.9 2.2-3.4 4.6-5.7 5.3l-121.4 37.4zm63.4-102.7c2.3-0.7 4.8-3.1 5.7-5.3l19.9-50.8c0.9-2.2 0.6-5.7-0.6-7.7l-27.3-47.3c-1.2-2-4.1-4-6.4-4.4l-53.9-8c-2.3-0.4-5.7 0.7-7.4 2.3l-40 37.1c-1.7 1.6-3 4.9-2.8 7.2l4.1 54.4c0.2 2.4 1.9 5.4 3.9 6.7l45.1 30.8c2 1.3 5.4 1.9 7.7 1.2l52-16.2z"
                    />
                  </svg> */}
                </div>
                <div class="card-body p-5 text-center ">
                  <h1 className="mb-3">
                    <i class="bi bi-card-text mr-3 "></i> User Blogs
                  </h1>
                  <h3 class="mb-5 text-info">Welcome, Please Sign in</h3>
                  <br />
                  <form  onSubmit={this.onSubmit}>

                  <div class="form-outline mb-4">
                  <label htmlFor="email" className="">
                  Email:
                </label>
                <br />
                  <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                  required
                />
                    {/* <label class="form-label" for="typeEmailX-2">
                      Email
                    </label> */}
                  </div>

                  <div class="form-outline mb-4">

                  <label htmlFor="password" className="">
                  Password:
                </label>
                <br />
                  <input
                  onChange={this.onChange}
                  value={this.state.password}
                  id="password"
                  type="password"
                  required

                />
                    {/* <label class="form-label" for="typePasswordX-2">
                      Password
                    </label> */}
                  </div>

                  <div class="form-check d-flex justify-content-start mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label class="form-check-label" for="form1Example3">
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>
                  <br />

                  <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-outline-primary"
                >
                  Login
                </button>

                </form>

                  <hr class="my-4" />

                  {/* <button
                    class="btn btn-lg btn-block btn-primary"
                    style={{backgroundColor: "#dd4b39"}}
                    type="submit"
                  >
                    <i class="fab fa-google me-2"></i> Sign in with google
                  </button>
                  <button
                    class="btn btn-lg btn-block btn-primary mb-2"
                    style={{backgroundColor: "#3b5998"}}
                    type="submit"
                  >
                    <i class="fab fa-facebook-f me-2"></i>Sign in with facebook
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Login);
