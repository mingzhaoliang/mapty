import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

export default function Modal({ children, open, onClose, classes }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        open && modal.showModal();

        return () => modal.close();
    }, [open]);

    return createPortal((
        <dialog
            ref={dialog}
            className={`z-10 bg-white rounded-md shadow-sm p-10 min-w-72 m-auto ${classes}`}
            onClose={onClose}
        >
            {children}
        </dialog>
    ), document.getElementById('modal'));
}