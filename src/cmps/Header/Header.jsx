import React, { useState, useEffect } from 'react';
import './Header.scss';


export function Header(props) {
    const { onEditCube } = props;
    const { changeLang } = props;
    const { lng } = props;
    const { lngBtn } = props;
    const { editBtn } = props;
   

    useEffect(() => {

    }, []);

    return (
        <header className="flex space-between align-center">
            <div className="cubeLogo">
                <h2><i className="fas fa-cube"></i>MoreCube</h2>
            </div>
            <div>
                <ul className="flex">
                    <li onClick={() => changeLang(lng)}>{lngBtn}</li>
                    <li onClick={() => onEditCube()}>{editBtn}</li>
                    </ul>
            </div>
        </header>


    )
}