import { Fragment } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

export default function Friends() {
    return (
        <Fragment>
            <div className="container">
                <h1>Friends</h1>
                <Link to='/friendsList' className='btn btn-warning'>Your Friends</Link>
                <Link to='/closeFriendsList' className='btn btn-success'>Your Close Friends</Link>
                <Link to='/availableFriends' className='btn btn-primary'>Add Friends</Link>

            </div>
        </Fragment>

    )
}
