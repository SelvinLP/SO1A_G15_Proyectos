import React from 'react';
import { Component } from 'react';
import { getTopDepartaments } from '../../services/api';
import GraphTop from './graph';


export default class TopDepartament extends Component{
    constructor(props){
        super(props);
        this.state = {list:[]}
    }

    UNSAFE_componentWillMount(){
        getTopDepartaments()
            .then((response)=>{
                this.setState({list: response.data})
            })
            .catch((error)=>{
                console.log("[T_T] Error en els servidor");
                console.log(error);
            });
    }

    render(){
        if(this.state.list.length > 0){
            return (
                <div>
                    <GraphTop dataDepartaments={this.state.list} />
                </div>
            )
        }else{
            return (
                <div>
                    Cargando datos....
                </div>
            )
        }
    }
}