import React from 'react';

const Course = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Car driving lessons</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p className="card-text">Price: $200</p>
                            <a href="#h" className="btn btn-primary">Buy Now</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Bike driving lessons</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p className="card-text">Price: $100</p>
                            <a href="#h" className="btn btn-primary">Buy Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;