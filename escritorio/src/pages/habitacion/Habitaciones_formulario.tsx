import { useState } from "react";
import Button from "../common/components/Button";
import FormField from "../common/components/FormField";
import Input from "../common/components/Input";
import "./Habitaciones_formulario.css"
const Habitaciones_formulario=()=>{
    const[userDate,setUserData]=useState({numeroHabitacion:"",tipo:"",precioPorNoche:"",estado:"",capacidad:"",descripcion:""})

    function postData(){
        let url="http://localhost:8080/api/rooms/"
        let cont={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                numeroHabitacion:userDate.numeroHabitacion,
                tipo:userDate.tipo,       
                precioPorNoche:userDate.precioPorNoche,
                estado:userDate.estado,
                capacidad:userDate.capacidad,
                descripcion:userDate.descripcion
            })
        };
    
        fetch(url,cont)
        .then((res)=>{
            if(res.status==200){
    
            }
            console.log("hola")
        })
        .catch((error)=>{
            console.log(error.toString())
        });
    }
    return(
        <div>
            <h1>Habitaciones</h1>
            <form>
                <div className="form">
                <div className="form__div">

                <FormField label="Numero Habitacion" errorMessage=" ">
                    <Input 
                    placeholder="Numero Habitacion"
                    type="text"
                    handleInput={(value:string)=>{
                        setUserData({...userDate,numeroHabitacion: value})
                    }}
                    />
                </FormField>
    
                <FormField label="Estado" errorMessage=" ">
                    <Input 
                    type="text" 
                    placeholder="Estado"
                    handleInput={(value:string)=>{
                        setUserData({...userDate,estado:value})
                    }}
                    />
                </FormField>
    
                <FormField label="Capacidad" errorMessage=" ">
                    <Input 
                    type="text" 
                    placeholder="Capacidad"
                    handleInput={(value:string)=>{
                        setUserData({...userDate,capacidad:value})
                    }}
                    />
                </FormField>
    
                <FormField label="Precio" errorMessage=" ">
                    <Input 
                    type="text" 
                    placeholder="Precio"
                    handleInput={(value:string)=>{
                        setUserData({...userDate,precioPorNoche:value})
                    }}
                    />
                </FormField>
    
                <FormField label="Descripcion" errorMessage=" ">
                    <Input 
                    type="text" 
                    placeholder="Descripcion"
                    handleInput={(value:string)=>{
                        setUserData({...userDate,descripcion:value})
                    }}
                    />
                </FormField>
                </div>
    
                <div className="form__div">
                <FormField label="Tipo" errorMessage=" ">
                    <Input 
                    type="text" 
                    placeholder="Tipo"
                    handleInput={(value:string)=>{
                        setUserData({...userDate,tipo:value})
                    }}
                    />
                </FormField>
                </div>
                </div>
                <Button disabled={false} handleClick={postData}>
                    guardar
                </Button>
            </form>
        </div>
    );
    
}

export default Habitaciones_formulario