import iconSuccess from '../images/alert-yes.svg';
import iconNotSuccess from '../images/alert-no.svg';

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container popup__container_place_alert'>
      <img src={`${isSuccess ? iconSuccess : iconNotSuccess}`} alt={`${isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`} className='popup__img'/>
        <h3 className='popup__title_place_alert'>
          {/* {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} */}
          {message}
        </h3>
        <button
          className='popup__close main-link'
          onClick={onClose}
          type='button'
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
