import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CubeApp.scss';
import storageService from '../../services/storageService'
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useSnackbar } from 'notistack';


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

  useEffect(() => {
    const savedCube = storageService.load('cube')

    if (savedCube) {
      setCube(savedCube)
    }
  }, []);

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


  function toggleCube(side) {
    setCubeSide(side)
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
    enqueueSnackbar(t("msg.save"),{
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
    enqueueSnackbar(t("msg.clear"),{
      anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
      },
      autoHideDuration: 2000,
      variant: 'success',
  });
   
  }

  const handleSubmit = event => {
    event.preventDefault();
  };

  function changeLang(appLng) {
      if (appLng === 'he'){
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

  return (
    <div>
      <Header editBtn={editBtn} onEditCube={onEditCube} changeLang={changeLang} lng={lng} lngBtn={lngBtn}/>
      <div className="container">
        <section className={`cube-app ${lng}`}>
          <div className={`CubeEdit ${hidden}`}>
            <form id="edit-form" onSubmit={handleSubmit} >
            <label>{t('sides.front')}</label>
            <div className="cube-input">
              <input name="front" type="text" maxLength="36" onChange={handleChange} placeholder={t('type.title')} />
              <button className="preview-btn" onClick={() => toggleCube('front')}>{t('preview.title')}</button>
            </div>
            <label>{t('sides.back')}</label>
            <div className="cube-input">
              <input name="back" type="text" onChange={handleChange} placeholder={t('type.title')}/>
              <button className="preview-btn" onClick={() => toggleCube('back')}>{t('preview.title')}</button>
            </div>
            <label>{t('sides.right')}</label>
            <div className="cube-input">
              <input name="right" type="text" onChange={handleChange} placeholder={t('type.title')} />
              <button className="preview-btn" onClick={() => toggleCube('right')}>{t('preview.title')}</button>
            </div>
            <label>{t('sides.left')}</label>
            <div className="cube-input">
              <input name="left" type="text" onChange={handleChange} placeholder={t('type.title')} />
              <button className="preview-btn" onClick={() => toggleCube('left')}>{t('preview.title')}</button>
            </div>
            <label>{t('sides.top')}</label>
            <div className="cube-input">
              <input name="top" type="text" onChange={handleChange} placeholder={t('type.title')}/>
              <button className="preview-btn" onClick={() => toggleCube('top')}>{t('preview.title')}</button>
            </div>
            <label>{t('sides.bottom')}</label>
            <div className="cube-input">
              <input name="bottom" type="text" onChange={handleChange} placeholder={t('type.title')} />
              <button className="preview-btn" onClick={() => toggleCube('bottom')}>{t('preview.title')}</button>
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
                <div className="cube__face cube__face--front"><p>{cube.front}</p> </div>
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
      <Footer/>
    </div>
  );
}
