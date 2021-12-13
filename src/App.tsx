import React, {useState} from 'react';
import { ChangeEvent } from 'react';
import './App.css';



function Weather() {
  const key = "cde24c243c012a396950f571bcdd4836";
  const [input, setInput] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [temp, setTemp] = useState('');

  function handleSubmit(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=metric&appid=" + key)
    .then((response) => response.json())
    .then(data => {
      setCity("City:\t\t" + input);
      setTemp("Temperature:\t" + data['main']['temp']  + " °C");
      setDesc("Description:\t" + data['weather'][0]['description']);
    })

    .catch(err => alert("Invalid City Name"))
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.currentTarget.value);
  };

  return(
    <div>
      <input type="text" className="inputValue" placeholder="Search city" onChange={onChange} />
      <input type="submit" value="Submit" onClick={() => handleSubmit()} />
      <div className="display">
        <p id="name" />{city}<p/>
        <p className="desc" />{desc}<p/>
        <p className="temp" />{temp}<p/>
      </div>
    </div>
  );
}

export default Weather;
