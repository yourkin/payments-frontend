import React from 'react';

export const Loading = () => {
    return (
        <div className="container">
            <div className="row text-center">
                <div className="col-12">
                    <span className="fa fa-spinner fa-pulse fa-5x fa-fw text-primary"></span>
                    <p>Loading . . .</p>
                </div>
            </div>
        </div>
    );
};
