import {useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import useQuery from './useQuery';

//URL used for Get and Post request
const url ="https://frontend-take-home.fetchrewards.com/form"


function App() {

  //setting up a template for all of the input values from the form
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: ""
})


//event handling for text inputs which are name, email and password
const handleChange = (event) => {
  setFormValue({
    ...formValue,
    [event.target.name]: event.target.value
  });
}

//event handling for react-select dropdowns which are occupations and states
const handleSelectChange=(option, event) => {
  setFormValue({
    ...formValue,
    [event.name]: option.value
  });
}  

//event handling for submitting Post request from form
const handleSubmit = (event) => {
    axios.post((url),formValue).then(res=>{
    })
    event.preventDefault();
}

const {occupations,states} = useQuery(axios.get(url))

console.log(formValue)

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
        Full Name:
          <input required type="text" name="name" value={formValue.name} placeholder='enter a full name' onChange={handleChange}/>
        </label>

        <label>
        Email:
          <input required type="text" name="email" value={formValue.email} placeholder='enter a email' onChange={handleChange}/>
        </label>

        <label>
        Password:
          <input required type="password" name="password" value={formValue.password} placeholder='enter a password' onChange={handleChange}/>
        </label>

        <div>
          <label>
            Occupation:
            <Select
              name="occupation"
              options={occupations}
              value={formValue.occupation}
              onChange={handleSelectChange}
            />
          </label>
        </div>

        <div>
          <label>
            State:
            <Select
              name ="state"
              options={states}
              value={formValue.state}
              onChange={handleSelectChange}
            />
          </label>
        </div>
    
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
