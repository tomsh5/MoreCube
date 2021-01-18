import React, { useState, useEffect } from 'react';
import './Footer.scss';


export function Footer() {

    return (
        <footer className="flex justify-center">


           <label className="right-res">© All rights reserved 2021</label> 
           <span>UX/UI: <a href="https://www.linkedin.com/in/mor-gavni-496234198">Mor Gavni</a></span>
           <span>Developed By: <a href="https://www.linkedin.com/in/tom-shalem">Tom shalem</a> </span>


        </footer>
    )

}