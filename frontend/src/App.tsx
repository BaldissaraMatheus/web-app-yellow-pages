import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDebouncedText } from './hooks/useDebouncedText'
import './App.css';
import usersService from './services/users.service';
import { IUserRender, IUserSearch } from './user';
import UserList from './components/UserList';

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
        .map((word, i) => ({
          curr: word,
          next: i < words.length - 1 ? words[i + 1] : null,
          index: i
        }))
        .filter(word => /\d/.test(word.curr)
          && word.curr.length <= 3
          // Prevents identifying the first 3 characters of a phone number as age
          && (word.next === null || !/[0-9-]{7,8}$/.test(word.next))
        )
        .map(word => word.curr)
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
            data-testid="search-input"
            value={searchValue}
            onChange={(ev) => setSearchValue(ev.target.value)}
          >
          </input>
        </label>
      </form>
      <UserList users={users} />
      {users.length === 0
        ? <h2 data-testid="no-results">No results, please review your search or try a different one</h2>
        : <></>
      }
    </main>
  );
}

export default App;
