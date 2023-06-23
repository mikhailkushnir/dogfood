import React, { useCallback, useEffect } from "react";
import cn from 'classnames'
import './index.scss'


export const Modal = ({ setModalActive, modalActive, children }) => {

    const closeOnEsc = useCallback((e) => {
        if (e.key === 'Escape') {
            document.removeEventListener('keydown', closeOnEsc);
            setModalActive(false);
        }
    }, [setModalActive])

    try{
        useEffect(() => {
            document.addEventListener('keydown', closeOnEsc);

            return () => document.removeEventListener('keydown', closeOnEsc);
        }, [closeOnEsc])
    } catch (error) {
        console.log(error);
    }

    return (
        <div id="modalId" className={cn("modal", { 'active': modalActive })}>
            <div className={cn("modal__content", { 'active': modalActive })}>
                <span className="modal__close" onClick={() => setModalActive(false)}>X</span>
                {children}
            </div>
        </div>
    )
}