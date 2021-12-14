import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { ChangeEvent } from 'react';
import './App.css';



function Weather() {
  const key = "cde24c243c012a396950f571bcdd4836";
  var Labels:string[] = ["City: ", "Temperature: ", "Description: "];
  const [labels, setLabels] = useState({first: 'Select City', second: '', third: ''});
  const [input, setInput] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [temp, setTemp] = useState('');
  
  function handleSubmit(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=metric&appid=" + key)
    .then((response) => response.json())
    .then(data => {
      setLabels({... labels, first: Labels[0], second: Labels[1], third: Labels[2]});
      setCity(input);
      setTemp(data['main']['temp']  + " °C");
      setDesc(data['weather'][0]['description']);
    })

    .catch(err => alert("Invalid City Name"))
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };
  
  return(
    <div>
      <div className="card">
        <div className="display">
          <h1><span className='label'>{labels.first}</span><span id="name" >{city}</span></h1>
          <p><span className='label'>{labels.second}</span><span id="desc" >{temp}</span></p>
          <p><span className='label'>{labels.third}</span><span id="temp" >{desc}</span></p>
        </div>
        <div className='inputs'>
          <div className="inputsWrapper">
            <input type="text" className="inputValue" placeholder="Search city" onChange={onChange} />
            <input type="button" value="Submit" id="btn" onClick={() => handleSubmit()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
