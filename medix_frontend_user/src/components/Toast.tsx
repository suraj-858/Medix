// import { memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface messageTypes {
toastMessage: string
}
const Toast = ({toastMessage}: messageTypes) => {
     
  toast(toastMessage);

  return (
    <div className='z-20'>
        <ToastContainer  theme='dark' position='bottom-right'/>
    </div>
  )
}

export default Toast