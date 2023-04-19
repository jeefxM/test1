import { Modal, useModal } from "@geist-ui/core";

import React from 'react'

const ModalComponent = ({title, submit, cancel, submitFunction, content, state, changeState, closeHandler, error}) => {

  return (
    <div>
       <div>
      <Modal visible={state} onClose={closeHandler}>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Content>
          {content}
        </Modal.Content>
        <Modal.Action passive onClick={() => changeState(false)}>Cancel</Modal.Action>
        <Modal.Action passive onClick={() =>{ changeState(false),submitFunction()}}>Submit</Modal.Action>
      </Modal>
    </div>
    </div>
  )
}

export default ModalComponent
