import React, {useState} from "react";


const ReservationForm = () => {
    const [formData , setFormData] = useState({});

    const handleInputChange = (e) => {
        const {name,value } = e.target

        setFormData({
            ...formData, 
            [name] : value,
        })
    }

    const handleSubmit = async() => {
        try {
          const response = await fetch("https" , {
            method: "POST", 
            body : JSON.stringify(formData)
          })   
          const data = await response.json()
          console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="col-6">
            <form className="d-flex flex-column gap-4">
                <input
                name="formValue"
                type="text"
                onChange={handleInputChange}
                />
                <button 
                type="submit">
                    submit
                </button>

            </form>
        </div>
        
    )
}
export default ReservationForm;