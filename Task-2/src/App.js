import loader from './img/loader.gif'
import logo from './img/logo.png'
import './App.css';
import { useState } from "react";

function App() {

  const [spinner, setSpinner] = useState(false); 
  const [user_data, setdata] = useState([]);

  const showSpinner = () =>{
    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
    }, 200);
    
  }
  const handleClick = async () =>{
    showSpinner();
    let apiUrl = "https://reqres.in/api/users?page=1";
    let fetch_data = await fetch(apiUrl);
    let parsedData = await fetch_data.json();
    setdata(parsedData.data);
    
  }

  return (
    <>
    {/* Bar section with logo and name and button */}
    <div className="cust-bar">
        <a href="/" className="logoName">
          <img src={logo} alt="" />
          <h1>ApexCar</h1>
        </a>
        <div className="action">
            <button className="fetch-btn" onClick={handleClick}>Get Users</button>
        </div>
    </div>
    <div className="container">
      {spinner && <img src={loader} alt="" />}
      {!spinner && <h2>Our Users 😊😊</h2> }
        <div className="user-box">
          {/* One user card */}

          {user_data.map((elm)=>{
              return  <div className="user-card" key={elm.id}>
                          <img src={elm.avatar} alt="" />
                          <div className="data">
                            <h3>{elm.first_name + elm.last_name}</h3>
                            <i>{elm.email}</i>
                          </div>
                      </div>
          })}
          
        </div>
    </div>

    <div class="credit">Developed with ❤️ by Shwet Prakash</div>
    
    </>
      );
}

export default App;
