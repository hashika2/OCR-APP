import React from 'react';
import {connect} from 'react-redux';

const Alert = ({alert}) => {
    return (
        <div className={`ui container alert-${alert.type}`}>
                {alert.msg}
        </div>
    )
}

const mapStateToProp = (state) =>({
    alert: state.alert
})

export default connect(mapStateToProp)(Alert);
