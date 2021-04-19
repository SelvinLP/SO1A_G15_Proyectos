import { useEffect } from "react";
import { useState } from "react";
import { getStatePatients } from "../../services/api";
import GraphDonut from "./graph";


export default function PatientState (){
    const [list, setList] = useState([]);

    useEffect(() =>{
        getStatePatients()
            .then((response)=>{
                setList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setList]);

    return(
        <div>
            <GraphDonut data={list} title={"Porcentaje de estado del paciente"} />
        </div>
    );
}