import React from 'react';
import './App.css';

function App() {
  return (
    <main className="container mx-auto mt-8">
      <h1 className="text-2xl mb-4">Users list</h1>
      <form className="mb-4">
        <label>
          <span className="text-sm">Search User</span>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Type the user name, age or cellphone number"
            className="
              block
              w-full
              max-w-md
              py-2
              px-3
              border-2
              border-gray-300
              text-sm
              text-gray-800
              shadow-sm
              focus:outline-none
              focus:ring
            "
          >
          </input>
        </label>
      </form>
      <table className="table-fixed w-full shadow-lg">
        <thead>
          <tr className="children:p-2 text-gray-500 text-left border-2 border-gray-200">
            <th className="">Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr className="children:p-2 border-2 border-gray-200 text-gray-800">
            <td>Malcolm Lockyer</td>
            <td>91</td>
            <td>123412345</td>
            <td>1961</td>
          </tr>
          <tr className="children:p-2 border-2 border-gray-200 text-gray-800">
            <td>Witchy Woman</td>
            <td>51</td>
            <td>123412345</td>
            <td>1961</td>
          </tr>
          <tr className="children:p-2 border-2 border-gray-200 text-gray-800">
            <td>Shining Star</td>
            <td>18</td>
            <td>123412345</td>
            <td>1961</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default App;
