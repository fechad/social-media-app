import React, { useEffect, useRef, useState } from 'react'
import Text from './Text';
import '../styles/Modal.scss';
import Button from './Button';
import { MdOutlineClose } from 'react-icons/md';
import { screenRatio } from '../ScreenRatio';

interface ModalProps {
    opened?: boolean;
    triggerElement: JSX.Element;
    title: string,
    modalWidth: string,
    modalHeight: string,
    modalMinHeight?: string,
    destructive?: boolean,
    primary?: string,
    primaryFct?: Function,
    secondary?: string,
    secondaryFct?: Function,
    children?:JSX.Element,
}

const Modal = ({opened, triggerElement, title, modalWidth, modalHeight, modalMinHeight, destructive, primary, primaryFct, secondary, secondaryFct, children}:ModalProps) => {

    const [open, openModal] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(open){
            modalRef.current?.classList.remove('ModalHidden');
        } else {
            modalRef.current?.classList.add('ModalHidden');
        }
    },[open]);

  return (
    <div className='ModalContainer'>
        <div className='ModalTrigger' onClick={() => openModal(true)}>
            {triggerElement}
        </div>
        <div className='Modal' ref={modalRef}>
            <div className='ModalOverlay' />
            <div className='ModalContent' style={{width: `calc(Var(--adjustedRatio)*${modalWidth})`, height: `calc(Var(--adjustedRatio)*${modalHeight})`, minHeight: `calc(Var(--adjustedRatio)*${modalMinHeight})`}}>
                <div className='Header'>
                    <Text content={`${title}`} type='H1' />
                    <div className='ModalCloseButton' onClick={() => openModal(false)}><MdOutlineClose  size={30*(screenRatio.getRatio())}/></div>
                </div>
                <div className='Body'>
                    {children}
                </div>
                <div className='FooterContainer'>
                    <div className='Footer' style={{width: `calc(Var(--adjustedRatio)*${modalWidth})`}}>
                        {
                            secondary ? <Button text={secondary} textType='H3' color='darkgrey' fct={secondaryFct}/> : ''
                        }
                        {
                            primary ? <Button text={primary} textType='H3' fct={primaryFct} color={ destructive ? '#FF5555' : '#8773F0'}/> : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal