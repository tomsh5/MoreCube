import React, { useState, useEffect } from 'react';
import '../CubeEdit/CubeEdit.scss'

export function CubeEdit(props) {

    const [cube, setCube] = useState (props.cube);


    function handleChange ({ target }){
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setCube( { [field]: value } )
    }

    return(
        <div className="CubeEdit">
        <label>Front</label>
        <input name="front" value={cube.front} type="text" onChange={handleChange} placeholder="Type..."/>
        <label>Back</label>
        <input name="back" value={cube.back} type="text" onChange={handleChange} placeholder="Type..."/>
        <label>Right</label>
        <input name="right" value={cube.right} type="text" onChange={handleChange} placeholder="Type..."/>
        <label>Left</label>
        <input name="left" value={cube.left} type="text" onChange={handleChange} placeholder="Type..."/>
        <label>Bottom</label>
        <input name="top" value={cube.top} type="text" onChange={handleChange} placeholder="Type..."/>
        <label>Top</label>
        <input name="bottom" value={cube.bottom} type="text" onChange={handleChange} placeholder="Type..."/>
        <button>Save</button>
        </div>
    )

}