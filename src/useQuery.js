import { useState, useEffect } from "react";
import axios from 'axios';

//URL used for Get and Post request
const url = "https://frontend-take-home.fetchrewards.com/form"

const useQuery = () => {
    const [data, setData] = useState({ occupations: [], states: [] });

    const fetchData = async () => {
        const { data } = await axios.get(url);
        setData({
            occupations: data.occupations,
            states: data.states,
        })
    }
    useEffect(() => {
        //calling Get request
        fetchData()

    }, [])
    return data;
}

export default useQuery;