import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth';

import { AiFillDashboard } from "react-icons/ai";
import { FaProductHunt, FaUserAlt } from "react-icons/fa";
import { MdLogout, MdPayment } from "react-icons/md";
import UserInfo from './UserInfo/UserInfo';
import User from './User/User';
import Course from './Course/Course';

//'Rider': 'Learner';

const Dashboard = () => {
    const {logOut, role} = useAuth();
    const { path, url } = useRouteMatch();
    return (
        <main className="section-p">
            <section>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3>Hero Rider</h3>
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
            <section className='dashboard'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-2">
                            <div className="left-menu">
                                <ul className="deshboard-menu">
                                    <li>
                                    <Link to={`${url}`}><span className="dash-icon" title="Dashboard"><AiFillDashboard/></span> <span className="desh-text">Dashborad</span></Link>
                                    </li>
                                    {
                                        (role === 'Learner') && <li>
                                        <Link to={`${url}/course`}><span className="dash-icon"><FaProductHunt/></span> <span className="desh-text">Course</span></Link>
                                        </li>
                                    }
                                    {
                                        (role === 'Admin') && <li>
                                        <Link to={`${url}/manageuser`}><span className="dash-icon"><FaUserAlt/></span> <span className="desh-text">Manage User</span></Link>
                                        </li>
                                    }
                                    {
                                        (role === 'Learner') && <li>
                                        <Link to={`${url}/pay`}><span className="dash-icon"><MdPayment/></span> <span className="desh-text">Payment</span></Link>
                                        </li>
                                    }
                                    <li>
                                    <Button className="logout-btn" onClick={logOut}><span className="dash-icon"><MdLogout/></span> <span className="desh-text">Logout</span></Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9 col-10">
                            <Switch>
                                <Route exact path={path}>
                                    <UserInfo></UserInfo>
                                </Route>
                                <Route path={`${path}/manageuser`}>
                                    <User></User>
                                </Route>
                                <Route path={`${path}/course`}>
                                    <Course></Course>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;