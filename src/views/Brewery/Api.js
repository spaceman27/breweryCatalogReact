import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.openbrewerydb.org',
});
  
export const getBrewerries = async ({pageNo=1, perPage, sort='asc', byState, byCity}) => {
    let str = `/breweries?per_page=${perPage}&sort=type,name:${sort}&page=${pageNo}`;
    if (byState) {
        str += `&by_state=${byState}`;
    }
    if (byCity) {
        str += `&by_city=${byCity}`;
    }
    return await apiClient.get(str);
}

export const getBrewerryDetail = async (id) => {
    return await apiClient.get(`/breweries/${id}`);
}

export const searchBrewerries = async ({searchTerm, perPage}) => {
    // search does not support sort and filter just yet
    let str = `breweries/search?per_page=${perPage}&query=${searchTerm}`;
    return await apiClient.get(str);
}