import { useState } from 'react';
import axios from 'axios';
import useQuery from './useQuery';

//URL used for Get and Post request
const url = "https://frontend-take-home.fetchrewards.com/form"

const inputClassName = "mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"

const emptyForm = {
  name: '',
  email: '',
  password: '',
  occupation: '',
  state: '',
};

const makeInputLabel = (name) =>
  name[0].toUpperCase() + name.substring(1) + ': ';

const TextInput = ({ name, placeholder, password, value, onChange }) => (
  <>
    <label>
      {makeInputLabel(name)}
      <input
        required
        type={password ? 'password' : 'text'}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClassName}
      />
    </label>
  </>
);


function App() {

  //setting up a template for all of the input values from the form
  const [formValue, setFormValue] = useState(emptyForm)

  const { occupations, states } = useQuery();

  const statesOptions = states.map(({ name, abbreviation }) => (
    <option value={name} key={abbreviation}>
      {name}
    </option>
  ));

  const occupationsOptions = occupations.map((value, i) => (
    <option value={value} key={i}>
      {value}
    </option>
  ));

  // const SelectInput = ({ name, value, onChange }) => (
  //   <div>
  //     <label>
  //       {makeInputLabel(name)}
  //       <select
  //         name={name}
  //         value={value}
  //         onChange={onChange}
  //       />
  //     </label>
  //   </div>
  // );

  // event handling for text inputs which are name, email and password
  const handleChange = ({ target: { name, value } }) => {
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  //event handling for submitting Post request from form
  const handleSubmit = (event) => {
    axios.post((url), formValue).then(res => {
      if (res.status === 201) {
        setFormValue(emptyForm)
        alert("You have successfully created a user!");
      }
    })
    event.preventDefault();
  }

  return (
    <div className="App">

      <form action="#" method="POST" onSubmit={handleSubmit}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  type="text"
                  name="name"
                  value={formValue.name}
                  onChange={handleChange}
                  placeholder='John Smith'
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                  placeholder='example@email.com'
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  name="password"
                  value={formValue.password}
                  onChange={handleChange}
                  placeholder='•••••••'
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="occupation">
                  Occupation:
                </label>
                <select
                  name="occupation"
                  onChange={handleChange}
                  className={inputClassName}
                >
                  {occupationsOptions}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="state">
                  State:
                </label>
                <select
                  name="state"
                  onChange={handleChange}
                  className={inputClassName}
                >
                  {statesOptions}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-left sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
