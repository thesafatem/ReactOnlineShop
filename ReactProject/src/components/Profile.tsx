  
import React, { ReactElement } from 'react';
import { User } from '../database/User';

interface Props {
    curUser: User | null;
}

function Profile({curUser}: Props): ReactElement {
    if (curUser) return (
        <section id="store" className="store py-5" style={{backgroundColor: "transparent"}}>
            <div className="container">
        <div>
            <h5>Name: {curUser.name}</h5>
            <h5>Password: {curUser.password}</h5>
            <h5>Функционал в стадии разработки. Ждите обновлений :)</h5>
        </div>
            </div>
        </section>
    )
    return <></>;
}

export default Profile;