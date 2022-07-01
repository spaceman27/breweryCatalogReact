import { Link, useParams } from 'react-router-dom';

import { useEffect, useState } from "react";
import { getBrewerryDetail } from './Api';

export default function BreweryDetail() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(()=> {
    getBrewerryDetail(id).then(r => {
      setData(r.data);
    });
  }, []);

  return (
    <main>
      <h1>Brewery {id}</h1>
      <p>{data.city}, {data.state} {data.postal_code}</p>
      <p>{data.country}</p>
      <p>{data.phone}</p>
      <p>
        <a href={data.website_url}>View Website</a>
      </p>
      <Link to='/breweries'>Back to Breweries</Link>
    </main>
  );
}
