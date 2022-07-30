import React, { ReactNode, useEffect, useState } from 'react'
import Text from './Text';
import '../styles/Modal.scss';
import Button from './Button';
import { MdOutlineClose } from 'react-icons/md';

interface ModalProps {
    opened?: boolean;
    triggerElement: JSX.Element;
    title: string,
    modalWidth: string,
    modalHeight: string,
    primary?: string,
    secondary?: string,
    child?: ReactNode,
}

const Modal = ({opened, triggerElement, title, modalWidth, modalHeight, primary, secondary, child}:ModalProps) => {

    const [open, openModal] = useState(false);

    useEffect(()=>{
        console.log(open)
        if(open){
            document.getElementsByClassName('Modal')[0].classList.remove('ModalHidden');
        } else{
            document.getElementsByClassName('Modal')[0].classList.add('ModalHidden');
        }
    },[open, opened ]);

  return (
    <div className='ModalContainer'>
        <div className='ModalTrigger' onClick={() => openModal(true)}>
            {triggerElement}
        </div>
        <div className='Modal'>
            <div className='ModalOverlay' />
            <div className='ModalContent' style={{width: modalWidth, height: modalHeight}}>
                <div className='Header'>
                    <Text content={`${title}`} />
                    <div className='ModalCloseButton' onClick={() => openModal(false)}><MdOutlineClose  size={30}/></div>
                </div>
                <div className='Body'>
                    {child}
                </div>
            </div>
            <div className='ModalFooter' style={{width: modalWidth}}>
                {
                    secondary ? <Button text={secondary} textType='H3'/> : ''
                }
                {
                    primary ? <Button text={primary} textType='H3'/> : ''
                }
            </div>
        </div>
    </div>
  )
}

export default Modal