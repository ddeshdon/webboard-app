import React from "react";

const InputField = ({label, type, placeholder,name,value,onChange}) => {
    return (
        <div style = {{marginBottom: "1rem"}}>
            <label>{label}</label>
            <input 
            type = {type}
            placeholder ={placeholder}
            name = {name}
            value = {value}
            onChange = {onChange}
            style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius:"5px",
                marginTop:"5px",
                
            }} 
        />
        </div>
    );
};

export default InputField;