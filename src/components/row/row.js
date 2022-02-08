import React from 'react';
import ErrorBoundry from "../error-boundry";
import PropTypes from 'prop-types';

import './row.css';

const Row = ({left, right}) => {
    return (
        <ErrorBoundry>
            <div className="row mb2">
                <div className="col-md-6">
                    {left}
                </div>
                <div className="col-md-6">
                    {right}
                </div>
        </div>
        </ErrorBoundry>
    );
};

Row.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node
}

export default Row;