import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"


function ProjectShow() {
    const navigate = useNavigate();
    const [id] = useState(useParams().id)
    const [employee, setEmployee] = useState({ name: '', description: '' })

    const axiosInstance = axios.create({
        baseURL: 'https://101236582-comp-3123-assignment1.vercel.app/api/v1',
    });

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        axiosInstance.get(`/emp/employees/${id}`)
            .then(function (response) {
                setEmployee(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Empoyee</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard"> View All Empoyees
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{employee.first_name + employee.last_name}</p>
                        <b className="text-muted">Email:</b>
                        <p>{employee.email}</p>
                        <b className="text-muted">Position:</b>
                        <p>{employee.position}</p>
                        <b className="text-muted">Salary:</b>
                        <p>{employee.Salary}</p>
                        <b className="text-muted">Department:</b>
                        <p>{employee.department}</p>
                        <b className="text-muted">Joined date:</b>
                        <p>{employee.date_of_joining}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectShow;