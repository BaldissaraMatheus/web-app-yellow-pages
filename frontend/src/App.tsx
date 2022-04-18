import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDebouncedText } from './hooks/useDebouncedText'
import './App.css';
import usersService from './services/users.service';
import { IUserRender, IUserSearch } from './user';
import UserItem from './components/UserItem';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState<IUserRender[]>([]);
  const debouncedText = useDebouncedText(searchValue, 500).trim();
  const pageLoad = useRef(false);

  function fetchUsers(searchParams: IUserSearch) {
    usersService.findAll(searchParams)
      .then(json => setUsers(json))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if (pageLoad.current && debouncedText !== '') {
      const words = debouncedText
        .split(' ')
        .filter(word => word !== '');

      const name = words
        .filter(word => /[a-zA-Z]/.test(word))
        .shift();

      const age = words
        .filter(word => /\d/.test(word) && word.length <= 3)
        .shift();

      // Ex: 0521264178, 052126-4178, (052)1264178, (052)126-4178
      const unbrokenPhones = words
        .filter(word => /^[0-9()-]{10,13}$/.test(word))
        .map(word => word.replace(/[-()/]/gi, ''))

      // Ex: (052) 1264178, (052) 126-4178, 052 1264178, 052 126-4178
      let brokenPhones = words
        .slice(0, words.length - 1)
        .map((word, i) => ({ curr: word, next: words[i + 1], index: i }))
        .filter(wordObj => /^[0-9()-]{3,5}$/.test(wordObj.curr)
          && /[0-9-]{7,8}$/.test(wordObj.next)
        )
        .map(word => `${word.curr}${word.next}`.replace(/[-()/]/gi, ''))

      const phone = [...unbrokenPhones, ...brokenPhones]
        .map(phone => `(${phone.substring(0, 3)}) ${phone.substring(3)}`)
        .shift();

      fetchUsers({ name, age, phone })

    }
    pageLoad.current = true;
  }, [debouncedText]);

  return (
    <main className="container mx-auto mt-8">
      <h1 className="text-2xl mb-4">Users list</h1>
      <form className="mb-4" onSubmit={e => e.preventDefault()}>
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
            value={searchValue}
            onChange={(ev) => setSearchValue(ev.target.value)}
          >
          </input>
        </label>
      </form>
      <table className="table-fixed w-full shadow-lg mb-4">
        <thead>
          <tr className="children:p-2 text-gray-800 text-left border-2 border-gray-200">
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => <UserItem
            name={user.name}
            address={user.address}
            age={user.age}
            phone={user.phone}
            picture={`data:image/png;base64, ${user.picture}`}
            key={`user-${i}`}
          />)}
        </tbody>
      </table>
      {users.length === 0 ? <h2>No results, please review your search or try a different one</h2> : <></>}
    </main>
  );
}

export default App;
