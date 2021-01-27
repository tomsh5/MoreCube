import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CubeApp.scss';
import '../../styles/imgs/front.png';
import storageService from '../../services/storageService'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SubShare } from '../SubShare/SubShare'
import { useSnackbar } from 'notistack';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';


export function CubeApp(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [lng, setLng] = useState('en')
  const [lngBtn, setLngBtn] = useState('HE')
  const { t, i18n } = useTranslation('common');
  const [cubeSide, setCubeSide] = useState('diagnol');
  const [prevNum, setPrevNum] = useState(0)
  const [hidden, setHidden] = useState('')
  const [cube, setCube] = useState({
    front: 'front', back: 'back', right: 'right',
    left: 'left', top: 'top', bottom: 'bottom'
  });
  const [editBtn, seteEditBtn] = useState(<i className="far fa-eye"></i>);
  const pageWidth = window.innerWidth;
  const [mobileMode, setMobileMode ] = useState(false);
  const refHook = useRef(false)
  const didMountRef = useRef(false)
  const [bgImg, setBgImg] = useState('')
  const img = 
  {front: 'https://i.imgur.com/dNTEeO0.png',
  back: 'https://i.imgur.com/L1TAoDO.png',
  right: 'https://i.imgur.com/AWxnRbc.png',
  left: 'https://i.imgur.com/TezWM59.png',
  top: 'https://i.imgur.com/XfdVmpG.png',
  bottom: 'https://i.imgur.com/40V7aTC.png'
}
  

  useEffect(() => {
    const savedCube = storageService.load('cube')
    if (savedCube){
    setCube(savedCube)
    }
  },[]);


  function rollCube() {
    let randomNum = getRandomInt(1, 7)

    while (randomNum === prevNum) {
      randomNum = getRandomInt(1, 7)
    }
    let randomSide = getRandomSide(randomNum)
    setCubeSide('roll')

    setTimeout(function () { setCubeSide(randomSide) }, 2000);
    setPrevNum(randomNum)
  }

  function onEditCube() {
    setHidden('hidden')
    seteEditBtn(<i className="far fa-edit"></i>)
    if (hidden) {
      setHidden('')
      seteEditBtn(<i className="far fa-eye"></i>)
    }
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
    enqueueSnackbar(t("msg.save"), {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
      variant: 'success',
    });
  }
  const clearCube = () => {
    setCube({
      front: '', back: '', right: '',
      left: '', top: '', bottom: ''
    })
    document.getElementById("edit-form").reset();
    enqueueSnackbar(t("msg.clear"), {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
      variant: 'success',
    });
  }

  function getSideImg (side){
    switch (side) {
      case 'front':
        return img.front;
      case 'back':
        return img.back;
      case 'right':
        return img.right;
      case 'left':
        return img.left;
      case 'top':
        return img.top;
      case 'bottom':
        return img.bottom;
      default:
        break;
    }
  }

  const handleSubmit = event => {
    event.preventDefault();
  };
  const onBgColorChange = ({target} ,side) => {
     console.log(target.id, side);
    // setBgImg('-remove-bgc-img')
    const cubeSide = document.querySelector(`.cube__face--${side}`)

    if (target.id === 'bg-color'){
      cubeSide.style.backgroundColor = target.value;
      cubeSide.style.backgroundImage = 'none';
    }
    else{
      cubeSide.style.color = target.value;
    }
  };

  function onDefaultBackground(side){
    
    const cubeCurrSide = document.querySelector(`.cube__face--${side}`)
    const currImg = getSideImg (side)
    cubeCurrSide.style.backgroundImage = `url(${currImg})`;
  }

  function onDefaultTxt(side) {
    const cubeCurrSide = document.querySelector(`.cube__face--${side}`)
    cubeCurrSide.style.color = 'white';
  }

  function changeLang(appLng) {
    if (appLng === 'he') {
      setLng('en')
      i18n.changeLanguage('en')
      setLngBtn('HE')
    }
    else {
      setLng('he')
      i18n.changeLanguage('he')
      setLngBtn('EN')
    }
  }

  function onPreview(side) {
    setCubeSide(side)
    scroll.scrollToTop();
  }

  return (
    <div className="moreCubeApp">
      <Header editBtn={editBtn} onEditCube={onEditCube} changeLang={changeLang} lng={lng} lngBtn={lngBtn} />
      {pageWidth > 850 && <SubShare/>}
      <div className="container">
        <section className={`cube-app ${lng}`}>
          <div className={`CubeEdit ${hidden}`}>
            <form className="edit-form" id="edit-form" onSubmit={handleSubmit} >
              <label>{t('sides.front')}</label>
              <div className="cube-input">
                <input name="front" type="text" maxLength="36" onChange={handleChange} placeholder={t('type.title')} />
                <button className="preview-btn" onClick={() => onPreview('front')}>{t('preview.title')}</button>
                <div className="color-pickers flex column">
                <div className="flex gap-1rem">
                <span>Background</span> <input className="bg-color" type="color" id="bg-color" onChange={(e) => onBgColorChange(e,'front')}/>
                <button onClick={() => onDefaultBackground('front')}>Default</button>
                </div>
                <div className="flex gap-1rem">
                <span>Text</span><input className="txt-color" type="color" id="txt-color" onChange={(e) => onBgColorChange(e,'front')}/>
                <button onClick={() => onDefaultTxt('front')}>Default</button>
                </div>
                </div>
              </div>
              <label>{t('sides.back')}</label>
              <div className="cube-input">
                <input name="back" type="text" onChange={handleChange} placeholder={t('type.title')} />
                <button className="preview-btn" onClick={() => onPreview('back')}>{t('preview.title')}</button>
              </div>
              <label>{t('sides.right')}</label>
              <div className="cube-input">
                <input name="right" type="text" onChange={handleChange} placeholder={t('type.title')} />
                <button className="preview-btn" onClick={() => onPreview('right')}>{t('preview.title')}</button>
              </div>
              <label>{t('sides.left')}</label>
              <div className="cube-input">
                <input name="left" type="text" onChange={handleChange} placeholder={t('type.title')} />
                <button className="preview-btn" onClick={() => onPreview('left')}>{t('preview.title')}</button>
              </div>
              <label>{t('sides.top')}</label>
              <div className="cube-input">
                <input name="top" type="text" onChange={handleChange} placeholder={t('type.title')} />
                <button className="preview-btn" onClick={() => onPreview('top')}>{t('preview.title')}</button>
              </div>
              <label>{t('sides.bottom')}</label>
              <div className="cube-input">
                <input name="bottom" type="text" onChange={handleChange} placeholder={t('type.title')} />
                <button className="preview-btn" onClick={() => onPreview('bottom')}>{t('preview.title')}</button>
              </div>
              <div className="save-clear-btns">
                <button className="clear-btn" onClick={() => clearCube()}><i className="far fa-trash-alt"></i></button>
                <button className="save-btn" onClick={() => saveCube(cube)}><i className="far fa-save"></i></button>
              </div>
            </form>
          </div>
          <div className="roll-cube-btn">
            <button className="roll-btn" onClick={() => rollCube()}>{t('roll.title')}</button>
          </div>
          <div className="cube-container">
            <div className="scene">
              <div className={`cube show-${cubeSide}`}>
                <div className={`cube__face cube__face--front`}><p>{cube.front}</p> </div>
                <div className="cube__face cube__face--back"><p>{cube.back}</p></div>
                <div className="cube__face cube__face--right"><p>{cube.right}</p></div>
                <div className="cube__face cube__face--left"><p>{cube.left}</p></div>
                <div className="cube__face cube__face--top"><p>{cube.top}</p></div>
                <div className="cube__face cube__face--bottom"><p>{cube.bottom}</p></div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {pageWidth < 850 && <SubShare/>}
      <Footer />
    </div>
  );
}
