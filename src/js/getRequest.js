import axios, {isCancel, AxiosError} from 'axios';


const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY =  'key=33086348-7f53cf98727ae5d390ed7e65d' ;
const filterRequest = '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export const getPromisFoto = async (data, page) => {

    try{
        const response = await axios.get(`${BASE_URL}${API_KEY}&q=${data}${filterRequest}&page=${page}`);
        const fotoItems = await response.data;
          
        return fotoItems;
    }
    catch (errors) {
        console.error(errors);
    }


};

