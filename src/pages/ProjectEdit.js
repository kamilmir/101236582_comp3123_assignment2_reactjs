import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"

function ProjectEdit() {
    const [id] = useState(useParams().id)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [position, setPosition] = useState('')
    const [salary, setSalary] = useState('')
    const [department, setDepartment] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'https://101236582-comp-3123-assignment1.vercel.app/api/v1',
    });

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        axiosInstance.get(`/emp/employees/${id}`)
            .then(function (response) {
                let employee = response.data
                setFirstName(employee.first_name)
                setLastName(employee.last_name)
                setEmail(employee.email)
                setPosition(employee.position)
                setSalary(employee.salary)
                setDepartment(employee.department)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])


    const handleSave = () => {
        setIsSaving(true);
        axiosInstance.put(`/emp/employees/${id}`, {
            first_name: firstName,
            last_name: lastName,
            email: email,
            position: position,
            salary: Number(salary),
            department: department
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Project updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
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
                <h2 className="text-center mt-5 mb-3">Edit Employee</h2>
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
                                className="btn btn-outline-success mt-3">
                                Update Employee
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectEdit;