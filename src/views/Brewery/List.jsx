import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from "react";
import { nanoid } from 'nanoid'
import { getBrewerries, searchBrewerries } from './Api';
import Pagination from './Pagination';

export default function BreweryList() {
  const [result, setResult] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState('asc');
  const [pageNo, setPageNo] = useState(1);
  const [byState, setByState] = useState();
  const [byCity, setByCity] = useState();
  const perPage = 10;
  useEffect(() => {
    getBrewerries({pageNo, perPage, sort, byCity, byState}).then(r=> {
      setResult(r.data);
    });
  } ,[sort, pageNo, byCity, byState]);

  useMemo(() => {
    searchBrewerries({searchTerm, perPage}).then(r=> {
      setFilter(r.data);
    });
  } ,[searchTerm, perPage]);

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  }

  const handleSort = (event) => {
    const sort = event.target.value;
    setSort(sort);
  }

  const changePage = (num) => {
    setPageNo(num);
  }

  const handleChangeCity = (event) => {
    setByCity(event.target.value);
  };

  const handleChangeState = (event) => {
    setByState(event.target.value);
  };

  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form>
        <input type='text' name='search' placeholder='Find a brewery' onChange={handleChange} />
        <button type='submit'>Search</button>
        <button type='reset'>Reset</button>
        <div>
          Sort
          <select onChange={handleSort}>
            <option value="asc">ASC</option>
            <option value="desc">DECS</option>
          </select>
        </div>

        <div>
          filter
          city
          <input type='text' name='search' placeholder='filte by city' onChange={handleChangeCity} />
          state
          <input type='text' name='search' placeholder='filte by state' onChange={handleChangeState} />
        </div>

      </form>
      <ul>
        {
            searchTerm && filter.map(r => (
              <li key={nanoid()}>
                <Link to={`/breweries/${r.id}`}>${r.name}</Link> - {r.city}, {r.state}
              </li>
            ))
        }
        {
            !searchTerm && result.map(r => (
              <li key={nanoid()}>
                <Link to={`/breweries/${r.id}`}>${r.name}</Link> - {r.city}, {r.state}
              </li>
            ))
        }
      </ul>
      <Pagination 
        pageNo={pageNo}
        perPage={perPage} 
        onChangePage={v => changePage(v)}></Pagination>
    </main>
  );
}
