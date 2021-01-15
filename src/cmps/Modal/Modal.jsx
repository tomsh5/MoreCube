import React, { Component } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp(props) {

  const { enqueueSnackbar } = useSnackbar();
  const {msg } = props

  msg.length>0 && handleClickVariant("success")

  function handleClickVariant(variant) {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(`${msg}`, { variant })
  };


  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default class IntegrationNotistack extends Component {

  render() {

    return (
      <SnackbarProvider msg={this.props.msg} maxSnack={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MyApp msg={this.props.msg} ></MyApp>
      </SnackbarProvider>
    );
  }
}

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './Modal.scss'

// const Modal = ({ isShowing, hide, txt }) => isShowing ? ReactDOM.createPortal(
//   <React.Fragment>
//     <div className="modal-overlay"/>
//     <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
//       <div className="modal">
//         <div className="modal-header">
//           {/* <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
//             <span aria-hidden="true">&times;</span>
//           </button> */}
//         </div>
//         <p>
//           {txt}
//         </p>
//       </div>
//     </div>
//   </React.Fragment>, document.body
// ) : null;

// export default Modal;