import { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ userEmail, onExit }) {
  const [menu, setMenu] = useState();
  const currentUrl = useLocation().pathname;

  const handleExitClick = () => {
    onExit();
  };

  useEffect(() => {
    if (currentUrl === "/sign-in") {
      setMenu(
        <li>
          <Link to='/sign-up' className='header__link main-link'>
            Регистрация
          </Link>
        </li>
      );
    } else if (currentUrl === "/sign-up") {
      setMenu(
        <li>
          <Link to='/sign-in' className='header__link main-link'>
            Войти
          </Link>
        </li>
      );
    } else {
      setMenu(
        <>
          <li>{userEmail}</li>
          <li>
            <button type='button' className='header__btn main-link' onClick={handleExitClick}>
              Выйти
            </button>
            {/* <Link to='/' className='header__link main-link'>
            Выйти
          </Link> */}
          </li>
        </>
      );
    }
  }, [currentUrl]);

  return (
    <header className='header root__header'>
      <Link className='main-link' to='/' title='Проект - Место'>
        <img src={logo} alt='Проект - Место.' className='header__logo' />
      </Link>
      <nav>
        <ul className='header__menu'>{menu}</ul>
      </nav>
    </header>
  );
}

export default Header;
