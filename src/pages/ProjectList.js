import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"

function ProjectList() {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([])
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
        fetchEmployeeList()
    }, [])

    const axiosInstance = axios.create({
        baseURL: 'https://101236582-comp-3123-assignment1.vercel.app/api/v1',
    });


    const fetchProjectList = () => {
        axiosInstance.get('/api/projects')
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const fetchEmployeeList = () => {
        axiosInstance.get('/emp/employees')
            .then(function (response) {
                setEmployeeList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/emp/employees/?eid=${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchEmployeeList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Employee Management</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/create">Create New Employee </Link>
                        <button onClick={() => Logout()} className="btn btn-outline-danger float-end"> Logout </button>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th>Salary ($)</th>
                                    <th>Department</th>
                                    <th>Date Joined</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeList.map((employee, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{employee.first_name + " " + employee.last_name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.position}</td>
                                            <td>{employee.salary}</td>
                                            <td>{employee.department}</td>
                                            <td>{employee.date_of_joining}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${employee._id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${employee._id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(employee._id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectList;