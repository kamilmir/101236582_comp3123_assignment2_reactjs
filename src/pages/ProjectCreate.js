import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"


function ProjecCreate() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [position, setPosition] = useState('')
    const [salary, setSalary] = useState('')
    const [department, setDepartment] = useState('')

    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
    }, [])

    const axiosInstance = axios.create({
        baseURL: 'https://101236582-comp-3123-assignment1.vercel.app/api/v1',
    });

    const handleSave = () => {
        setIsSaving(true);
        axiosInstance.post('/emp/employees', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            position: position,
            salary: Number(salary),
            department: department,
            date_of_joining: new Date(),
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Emplyee saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setFirstName('')
                setLastName('')
                setEmail('')
                setPosition('')
                setSalary('')
                setDepartment('')
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Employee</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard">View All Employees
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input
                                    onChange={(event) => { setFirstName(event.target.value) }}
                                    value={firstName}
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    name="firstName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Last Name</label>
                                <input
                                    onChange={(event) => { setLastName(event.target.value) }}
                                    value={lastName}
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={(event) => { setEmail(event.target.value) }}
                                    value={email}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="position">Position</label>
                                <input
                                    onChange={(event) => { setPosition(event.target.value) }}
                                    value={position}
                                    type="text"
                                    className="form-control"
                                    id="position"
                                    name="position" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    onChange={(event) => { setSalary(event.target.value) }}
                                    value={salary}
                                    type="number"
                                    className="form-control"
                                    id="salary"
                                    name="salary" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Department</label>
                                <input
                                    onChange={(event) => { setDepartment(event.target.value) }}
                                    value={department}
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    name="department" />
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Employee
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjecCreate;