import { useState } from 'react';
import axios from 'axios';
import useQuery from './useQuery';

//URL used for Get and Post request
const url = "https://frontend-take-home.fetchrewards.com/form"


function App() {

  //setting up a template for all of the input values from the form
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: ""
  })


  //event handling for all inputs and select/option components
  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  //event handling for submitting Post request from form
  const handleSubmit = (event) => {
    axios.post((url), formValue).then(res => {
      console.log(res)
    })
    event.preventDefault();
  }

  const { occupations, states } = useQuery(axios.get(url))

  return (
    <div className="App">

      <form action="#" method="POST" onSubmit={handleSubmit}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formValue.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formValue.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formValue.password}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="occupations" className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <select
                  id="occupations"
                  name="occupation"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {occupations.map((value, i) => (
                    <option value={value} key={i}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <select
                  id="state"
                  name="state"
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {states.map(({ name, abbreviation }) => (
                    <option value={name} key={abbreviation}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
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
