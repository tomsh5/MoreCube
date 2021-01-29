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
  const [cubeBgColors, setCubeBgColors] = useState(null)
  const [cubeTxtColors, setCubeTxtColors] = useState(null)
  const [editBtn, seteEditBtn] = useState(<i className="far fa-eye"></i>);
  const pageWidth = window.innerWidth;
  const [cubeTxtLoaded, setCubeTxtLoaded] = useState(false);
  const [cubeBgColorLoaded, setCubeBgColorLoaded] = useState(false);
  const [cubeTxtColorLoaded, setCubeTxtColorLoaded] = useState(false);
  const img =
  {
    front: 'https://i.imgur.com/dNTEeO0.png',
    back: 'https://i.imgur.com/L1TAoDO.png',
    right: 'https://i.imgur.com/AWxnRbc.png',
    left: 'https://i.imgur.com/TezWM59.png',
    top: 'https://i.imgur.com/XfdVmpG.png',
    bottom: 'https://i.imgur.com/40V7aTC.png'
  }


  useEffect(() => {


    if (!cubeTxtLoaded) {
      const savedCube = storageService.load('cube')
      if (savedCube) {
        setCube(savedCube)
      }
      setCubeTxtLoaded(true)
    }

    if (!cubeBgColorLoaded) {
      const savedBgColors = storageService.load('cubeBgColors');
      if (savedBgColors) {
        setCubeBgColors(savedBgColors)
        loadCubeBgColors()
      }
    }
    if (!cubeTxtColorLoaded) {
      const savedTxtColors = storageService.load('cubeTxtColors');
      if (savedTxtColors) {
        setCubeTxtColors(savedTxtColors)
        loadCubeTxtColors()
      }
    }

  });

  function loadCubeBgColors() {
    if (cubeBgColors) {
      Object.entries(cubeBgColors).forEach(([key, value]) => {
        const cubeSideEl = document.querySelector(`.cube__face--${key}`)
        if (value) {
          cubeSideEl.style.backgroundColor = value;
          cubeSideEl.style.backgroundImage = 'none';
          setCubeBgColorLoaded(true)
        }
      });
    }
  }


  function loadCubeTxtColors() {
    if (cubeTxtColors) {
      Object.entries(cubeTxtColors).forEach(([key, value]) => {
        const cubeSideEl = document.querySelector(`.cube__face--${key}`)
        if (value) {
          cubeSideEl.style.color = value;
          setCubeTxtColorLoaded(true)
        }
      });
    }
  }


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

  function onColorsEdit(side) {
    const cubeCurrSide = document.querySelector(`.color-edit-${side}`)
    cubeCurrSide.classList.toggle('show-color-edit')
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

  function handleColorChange({ target }) {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    console.log(target.id);

    if (target.id === 'bg-color') {
      setCubeBgColors({ ...cubeBgColors, [field]: value })
      console.log(cubeBgColors);
    }
    else {
      setCubeTxtColors({ ...cubeTxtColors, [field]: value })
      console.log(cubeTxtColors);
    }
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
    await storageService.post(`cubeBgColors`, cubeBgColors);
    await storageService.post(`cubeTxtColors`, cubeTxtColors);

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

  function getSideImg(side) {
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
  const onColorChange = ({ target }) => {
    const side = target.name;
    const cubeSide = document.querySelector(`.cube__face--${side}`)


    if (target.id === 'bg-color') {
      cubeSide.style.backgroundColor = target.value;
      cubeSide.style.backgroundImage = 'none';
      handleColorChange({ target })
      console.log(cubeBgColors);
    }
    else {
      cubeSide.style.color = target.value;
      handleColorChange({ target })
    }
  };

  function onDefaultBackground(side) {

    const cubeCurrSide = document.querySelector(`.cube__face--${side}`)
    const currImg = getSideImg(side)
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

    if (pageWidth < 850) {
      scroll.scrollToTop();
    }
  }

  return (
    <div className="moreCubeApp">
      <Header editBtn={editBtn} onEditCube={onEditCube} changeLang={changeLang} lng={lng} lngBtn={lngBtn} />
      {pageWidth > 850 && <SubShare />}
      <div className="container">
        <section className={`cube-app ${lng}`}>
          <div className={`CubeEdit ${hidden}`}>
            <form className="edit-form" id="edit-form" onSubmit={handleSubmit} >
              <label>{t('sides.front')}</label>
              <div className="edit-container">
                <div className="flex align-center">
                  <input className="text-input" name="front" type="text" maxLength="36" onChange={handleChange} placeholder={t('type.title')} />
                  <button className="color-btn" onClick={() => onColorsEdit('front')}><i className="fas fa-palette"></i></button>
                  <button className="preview-btn" onClick={() => onPreview('front')}>{t('preview.title')}</button>
                </div>
                <div className={`color-pickers flex gap-1-5rem`}>
                  <div className="color-edit-front">
                    <div className="flex gap-02-rem align-center">
                      <span>{t('background.title')}</span> <input name="front" className="bg-color" type="color" id="bg-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultBackground('front')}>{t('default.title')}</button>
                    </div>
                    <div className="flex gap-02-rem align-center">
                      <span>{t('text.title')}</span><input name="front" className="txt-color" type="color" id="txt-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultTxt('front')}>{t('default.title')}</button>
                    </div>
                  </div>
                </div>
              </div>
              <label>{t('sides.back')}</label>
              <div className="edit-container">
                <div className="edit-btns flex align-center">
                  <input className="text-input" name="back" type="text" onChange={handleChange} placeholder={t('type.title')} />
                  <button className="color-btn" onClick={() => onColorsEdit('back')}><i className="fas fa-palette"></i></button>
                  <button className="preview-btn" onClick={() => onPreview('back')}>{t('preview.title')}</button>
                </div>
                <div className={`color-pickers flex gap-1-5rem`}>
                  <div className="color-edit-back">
                    <div className="flex gap-02-rem align-center">
                      <span>{t('background.title')}</span> <input name="back" className="bg-color" type="color" id="bg-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultBackground('back')}>{t('default.title')}</button>
                    </div>
                    <div className="flex gap-02-rem align-center">
                      <span>{t('text.title')}</span><input name="back" className="txt-color" type="color" id="txt-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultTxt('back')}>{t('default.title')}</button>
                    </div>
                  </div>
                </div>
              </div>
              <label>{t('sides.right')}</label>
              <div className="edit-container">
                <div className="edit-btns flex align-center">
                  <input className="text-input" name="right" type="text" onChange={handleChange} placeholder={t('type.title')} />
                  <button className="color-btn" onClick={() => onColorsEdit('right')}><i className="fas fa-palette"></i></button>
                  <button className="preview-btn" onClick={() => onPreview('right')}>{t('preview.title')}</button>
                </div>
                <div className="color-pickers flex gap-1rem">
                  <div className="color-edit-right">
                    <div className="flex gap-02-rem align-center">
                      <span>{t('background.title')}</span> <input name="right" className="bg-color" type="color" id="bg-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultBackground('right')}>{t('default.title')}</button>
                    </div>
                    <div className="flex gap-02-rem align-center">
                      <span>{t('text.title')}</span><input name="right" className="txt-color" type="color" id="txt-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultTxt('right')}>{t('default.title')}</button>
                    </div>
                  </div>
                </div>
              </div>
              <label>{t('sides.left')}</label>
              <div className="edit-container">
                <div className="edit-btns flex align-center">
                  <input className="text-input" name="left" type="text" onChange={handleChange} placeholder={t('type.title')} />
                  <button className="color-btn" onClick={() => onColorsEdit('left')}><i className="fas fa-palette"></i></button>
                  <button className="preview-btn" onClick={() => onPreview('left')}>{t('preview.title')}</button>
                </div>
                <div className="color-pickers flex gap-1rem">
                  <div className="color-edit-left">
                    <div className="flex gap-02-rem align-center">
                      <span>{t('background.title')}</span> <input name="left" className="bg-color" type="color" id="bg-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultBackground('left')}>{t('default.title')}</button>
                    </div>
                    <div className="flex gap-02-rem align-center">
                      <span>{t('text.title')}</span><input name="left" className="txt-color" type="color" id="txt-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultTxt('left')}>{t('default.title')}</button>
                    </div>
                  </div>
                </div>

              </div>
              <label>{t('sides.top')}</label>
              <div className="edit-container">
                <div className="edit-btns flex align-center">
                  <input className="text-input" name="top" type="text" onChange={handleChange} placeholder={t('type.title')} />
                  <button className="color-btn" onClick={() => onColorsEdit('top')}><i className="fas fa-palette"></i></button>
                  <button className="preview-btn" onClick={() => onPreview('top')}>{t('preview.title')}</button>
                </div>
                <div className="color-pickers flex gap-1rem">
                  <div className="color-edit-top">
                    <div className="flex gap-02-rem align-center">
                      <span>{t('background.title')}</span> <input name="top" className="bg-color" type="color" id="bg-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultBackground('top')}>{t('default.title')}</button>
                    </div>
                    <div className="flex gap-02-rem align-center">
                      <span>{t('text.title')}</span><input name="top" className="txt-color" type="color" id="txt-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultTxt('top')}>{t('default.title')}</button>
                    </div>
                  </div>
                </div>
              </div>
              <label>{t('sides.bottom')}</label>
              <div className="edit-container">
                <div className="edit-btns flex align-center">
                  <input className="text-input" name="bottom" type="text" onChange={handleChange} placeholder={t('type.title')} />
                  <button className="color-btn" onClick={() => onColorsEdit('bottom')}><i className="fas fa-palette"></i></button>
                  <button className="preview-btn" onClick={() => onPreview('bottom')}>{t('preview.title')}</button>
                </div>
                <div className="color-pickers flex gap-1rem">
                  <div className="color-edit-bottom">
                    <div className="flex gap-02-rem align-center">
                      <span>{t('background.title')}</span> <input name="bottom" className="bg-color" type="color" id="bg-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultBackground('bottom')}>{t('default.title')}</button>
                    </div>
                    <div className="flex gap-02-rem align-center">
                      <span>{t('text.title')}</span><input name="bottom" className="txt-color" type="color" id="txt-color" onChange={onColorChange} />
                      <button onClick={() => onDefaultTxt('bottom')}>{t('default.title')}</button>
                    </div>
                  </div>
                </div>
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
      {pageWidth < 850 && <SubShare />}
      <Footer />
    </div>
  );
}
