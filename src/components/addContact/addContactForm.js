import React, { useState } from "react";
import "./addContact.css";

const AddContactForm = ({ addContact }) => {

    const [error, setError] = useState({ errorMessage: [] });
    const [successMessage, setSuccessMessage] = useState(null);
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        code: "",
        number: ""
    });

    const inputHandler = event => {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value,
            id: Math.random().toString(36).substring(7)
        })
    }

    const submitHandler = event => {
        event.preventDefault();
        if (formValid()) {

            addContact(inputs);
            setSuccessMessage("Phone contact added successfully");

            setInputs({
                firstname: "",
                lastname: "",
                code: "",
                number: "",
                id: ""
            });

            setTimeout(() => {
                setSuccessMessage(null)
            }, 2000);
        }
    }

    const formValid = () => {
        let err = "";
        let errors = [];

        if (inputsEmpty()) {

            err = "Fields should not be empty"
            setError({
                ...error,
                errorMessage: errors.concat(err)
            });

            return false;

        } else if (!checkFullName()) {

            err = "First and last name should contain at least 3 letters each"
            setError({
                ...error,
                errorMessage: errors.concat(err)
            });

            return false;

        } else if (!checkCode()) {

            err = "Country code should contain only 3 digits";
            setError({
                ...error,
                errorMessage: errors.concat(err)
            });

            return false;

        } else if (!checkNumber()) {

            err = "Phone number should contain at least 6 digits";
            setError({
                ...error,
                errorMessage: errors.concat(err)
            });

            return false;
        } else {

            setTimeout(() => {
                setError({ errorMessage: [] });
            }, 2000);

            return true;
        }
    }

    const inputsEmpty = () => {
        return !inputs.firstname.length || !inputs.lastname.length || !inputs.code.length || !inputs.number.length
    }

    const checkFullName = () => {
        return inputs.firstname.length >= 3 || inputs.lastname.length >= 3
    }

    const checkCode = () => {
        return inputs.code.length === 3
    }

    const checkNumber = () => {
        return inputs.number.length >= 6
    }

    const renderErrors = () => {
        return error.errorMessage && error.errorMessage.map((item, index) => {
            return (
                <p key={index}>{item}</p>
            )
        });
    }

    const renderSuccess = () => {
        return successMessage && <p>{successMessage}</p>
    }

    return (
        <React.Fragment>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>First name:</label><br />
                    <input
                        type="text"
                        name="firstname"
                        onChange={inputHandler}
                        value={inputs.firstname}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label>Last name: </label><br />
                    <input
                        type="text"
                        name="lastname"
                        onChange={inputHandler}
                        value={inputs.lastname}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label>Country Code:</label><br />
                    <input
                        type="number"
                        name="code"
                        onChange={inputHandler}
                        value={inputs.code}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label><br />
                    <input
                        type="number"
                        name="number"
                        onChange={inputHandler}
                        value={inputs.number}
                        autoComplete="off"
                    />
                </div>
                <div className="submit-button-container">
                    <button>Add Contact</button>
                </div>
            </form>

            {error.errorMessage.length !== 0 &&
                <div className="show-errors">
                    {renderErrors()}
                </div>
            }
            {
                successMessage &&
                <div className="show-success">
                    {renderSuccess()}
                </div>
            }
        </React.Fragment >
    )
}

export default AddContactForm;