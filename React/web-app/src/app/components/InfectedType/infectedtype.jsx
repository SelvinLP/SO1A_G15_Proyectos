import { useEffect } from "react";
import { useState } from "react";
import { getInfectedType } from "../../services/api";
import GraphDonut from "../PatientState/graph";


export default function InfectedType (){
    const [list, setList] = useState([]);

    useEffect(() =>{
        getInfectedType()
            .then((response)=>{
                setList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setList]);

    return(
        <div>
            <GraphDonut data={list} title={"Tipo de contagio"} />
        </div>
    );
}