import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Register = () => {
    const { error,  createUser} = useAuth();
    const [emassage, setEmassage] = useState('');
    const [check, setcheck] = useState(false);

    const [licencePic, setLicencePic] = useState(null);
    const [nidPic, setNidPic] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const history = useHistory();

    const handleRegister = e => {
        setcheck(e.target.checked);
    }


    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const formData = new FormData();
        const role = check ? 'Rider': 'Learner';
        const {displayName, email, age, phone, area, vehicleType, password, repassword} = data;

        formData.append('displayName', displayName);
        formData.append('email', email);
        formData.append('age', age);
        formData.append('phone', phone);
        formData.append('area', area);
        formData.append('vehicleType', vehicleType);
        formData.append('role', role);
        formData.append('carName', data?.vehicleType);
        formData.append('carModel', data?.carModel);
        formData.append('namePalate', data?.namePalate);
        
        formData.append('licencePic', licencePic);
        formData.append('nidPic', nidPic);
        formData.append('profilePic', profilePic);


        
        

        if (password !== repassword) {
            setEmassage('Password Does not match!');
        }else{
            setEmassage('');
            createUser(formData, displayName, email, password, history);
        }
    };

    return (
        <div>
            <section id='loginForm'>
                <Container>
                    <Row>
                        <Col className="offset-md-3 col-md-6">
                            <div className="loginform">
                                <div className="provider-login">
                                    <h3 className="text-center">Join as a {check?'Rider':'Driving Lesson Learner'}</h3>
                                    {error?
                                        <div className="error-massage">
                                        <p>{error}</p>
                                        </div>:
                                        ''
                                    }
                                    {emassage?
                                        <div className="error-massage">
                                        <p>{emassage}</p>
                                        </div>:
                                        ''
                                    }
                                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                        <input type="text" {...register("displayName", { required: true })} placeholder="Name*"/>
                                        <input type="email" {...register("email", { required: true })} placeholder="Email*"/>
                                        <input type="number" {...register("age", { required: true })} placeholder="Age*"/>
                                        <input type="text" {...register("address", { required: true })} placeholder="Address*"/>
                                        <input type="number" {...register("phone", { required: true })} placeholder="Phone Number*"/>
                                        <input type="text" {...register("area", { required: true })} placeholder="Area*"/>
                                        { check?
                                        <div>
                                            <label htmlFor="drivingLicence">Drivring Licence</label>
                                            <input type="file" onChange={e => setLicencePic(e.target.files[0])} required multiple />
                                        </div>:''
                                        }
                                        <div>
                                            <label htmlFor="nidPic">NID Picture</label>
                                            <input type="file" onChange={e => setNidPic(e.target.files[0])} required multiple />
                                        </div>
                                        <div>
                                            <label htmlFor="profilePic">Profile Picture</label>
                                            <input type="file" onChange={e => setProfilePic(e.target.files[0])} required multiple />
                                        </div>
                                        {
                                        check?
                                        <div>
                                            <label>Car information</label>
                                            <input type="text" {...register("carName", { required: true })} placeholder="Name*"/>
                                            <input type="text" {...register("carModel", { required: true })} placeholder="Model*"/>
                                            <input type="text" {...register("namePalate", { required: true })} placeholder="Name Palate*"/>
                                        </div>
                                        :''
                                        }
                                        
                                        <label>Vehicle Type</label>
                                        <div>
                                            <select {...register("vehicleType")}>
                                                <option value="car">Car</option>
                                                <option value="bike">Bike</option>
                                            </select>
                                        </div>

                                        <input type="password" {...register("password", { required: true })} placeholder="Password*" />
                                        <input type="password" {...register("repassword", { required: true })} placeholder="ReType Password*" />
                                        
                                        <div>
                                        <input type="checkbox" onChange={handleRegister} id='learner'/>
                                        <label htmlFor="learner">Join as a Rider.</label>
                                        </div>

                                        <input type="submit" value='Register'/>
                                    </form>
                                    <p className="text-center">Have An Account? <Link to="/login">Log In</Link></p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Register;