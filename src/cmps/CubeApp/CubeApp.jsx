import React, { useState, useEffect } from 'react';
import './CubeApp.scss';
import storageService from '../../services/storageService'
import Modal from '../Modal/Modal'
import useModal from '../../hooks/useModal';

export function CubeApp() {
  const [cubeSide, setCubeSide] = useState('diagnol');
  const [prevNum, setPrevNum] = useState(0)
  const [hidden, setHidden] = useState('')
  const [cube, setCube] = useState({
    front: 'front', back: 'back', right: 'right',
    left: 'left', top: 'top', bottom: 'bottom'
  });
  const [editBtnTxt, seteEditBtnTxt] = useState('Close Edit');
  const {isShowing, toggle} = useModal();
  const [modalTxt, setModalTxt] = useState('');

  useEffect(() => {
    const savedCube = storageService.load('cube')

    if (savedCube){
      setCube(savedCube)
    }
    console.log(savedCube);
  }, []);

  function rollCube() {
    let randomNum = getRandomInt(1, 7)

    while (randomNum === prevNum) {
      console.log('same');
      randomNum = getRandomInt(1, 7)
    }
    console.log(`prev: ${prevNum}, curr: ${randomNum}`);
    let randomSide = getRandomSide(randomNum)
    console.log(randomSide);
    setCubeSide('roll')

    setTimeout(function () { setCubeSide(randomSide) }, 2000);
    setPrevNum(randomNum)
  }

  function editCube() {
    setHidden('hidden')
    seteEditBtnTxt('Edit')
    if (hidden){
      setHidden('')
      seteEditBtnTxt('Close Edit')
    }
    console.log(hidden);
  }


  function toggleCube(side) {
    setCubeSide(side)
    console.log(`${side}`);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const num = Math.floor(Math.random() * (max - min) + min);
    return num
  }

  function handleChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    setCube({ ...cube, [field]: value })
  }

  function getRandomSide(num) {
    switch (num) {
      case 1:
        return 'front';
      case 2:
        return 'back';
      case 3:
        return 'right';
      case 4:
        return 'left';
      case 5:
        return 'top';
      case 6:
        return 'bottom';
      default:
        break;
    }
  }

  async function saveCube(cube) {
    await storageService.post(`cube`, cube);
    setModalTxt('The Cube Was Saved Successfully!')
    toggle()
  }

  function clearCube() {
    setCube({
      front: '', back: '', right: '',
      left: '', top: '', bottom: ''
    })
    setModalTxt('The Cube Was cleared')
    toggle()
  }

  return (
    <section className="cube-app">
      <div className={`CubeEdit ${hidden}`}>
        <label>Front</label>
        <div className="cube-input">
          <input name="front" type="text"  maxlength="36" onChange={handleChange} placeholder="Type..." />
          <button className="preview-btn" onClick={() => toggleCube('front')}>Preview</button>
        </div>
        <label>Back</label>
        <div className="cube-input">
          <input name="back" type="text" onChange={handleChange} placeholder="Type..." />
          <button className="preview-btn" onClick={() => toggleCube('back')}>Preview</button>
        </div>
        <label>Right</label>
        <div className="cube-input">
          <input name="right" type="text" onChange={handleChange} placeholder="Type..." />
          <button className="preview-btn" onClick={() => toggleCube('right')}>Preview</button>
        </div>
        <label>Left</label>
        <div className="cube-input">
          <input name="left" type="text" onChange={handleChange} placeholder="Type..." />
          <button className="preview-btn" onClick={() => toggleCube('left')}>Preview</button>
        </div>
        <label>Top</label>
        <div className="cube-input">
          <input name="top" type="text" onChange={handleChange} placeholder="Type..." />
          <button className="preview-btn" onClick={() => toggleCube('top')}>Preview</button>
        </div>
        <label>Bottom</label>
        <div className="cube-input">
          <input name="bottom" type="text" onChange={handleChange} placeholder="Type..." />
          <button className="preview-btn" onClick={() => toggleCube('bottom')}>Preview</button>
        </div>
        <div className="save-clear-btns">
        <button className="clear-btn" onClick={() => clearCube()}>Clear all</button>
        <button className="save-btn" onClick={() => saveCube(cube)}>Save</button>
        </div>
      </div>
      <div className="edit-cube-btn"> 
        <button className="edit-btn" onClick={() => editCube()}>{editBtnTxt}</button>
      </div>
      <div className="roll-cube-btn"> 
        <button className="roll-btn" onClick={() => rollCube()}>Roll</button>
      </div>
      <div className="scene">
        <div className={`cube show-${cubeSide}`}>
          <div className="cube__face cube__face--front"><p>{cube.front}</p> </div>
          <div className="cube__face cube__face--back"><p>{cube.back}</p></div>
          <div className="cube__face cube__face--right"><p>{cube.right}</p></div>
          <div className="cube__face cube__face--left"><p>{cube.left}</p></div>
          <div className="cube__face cube__face--top"><p>{cube.top}</p></div>
          <div className="cube__face cube__face--bottom"><p>{cube.bottom}</p></div>
        </div>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        txt = {modalTxt}
      />
    </section>
  );
}
