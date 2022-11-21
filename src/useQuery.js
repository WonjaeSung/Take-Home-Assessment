import {useState, useEffect} from "react";
import axios from 'axios';

//URL used for Get and Post request
const url ="https://frontend-take-home.fetchrewards.com/form"

const useQuery = () => {
    const [occupations, setOccupations] = useState([])
    const [states, setStates] = useState([])

    useEffect(()=>{
        const fetchData = async() => {
            const {data} = await axios.get(url);
            setOccupations(data.occupations.map(job=>({value:job, label:job})))
            setStates(data.states.map(state=>({value:state.name, label:state.name+", "+state.abbreviation})))
        }
        //calling Get request
        fetchData()
        
    },[])
    return {occupations, states};
}
 
export default useQuery;