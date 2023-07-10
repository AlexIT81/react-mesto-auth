import { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ userEmail, onSignOut }) {
  const [menu, setMenu] = useState();
  const currentUrl = useLocation().pathname;
  const [isBurgerclicked, setIsBurgerClicked] = useState(false);

  const handleBurgerMenuClick = () => {
    setIsBurgerClicked(!isBurgerclicked);
  };

  const handleExitClick = () => {
    onSignOut();
  };

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const updateSize = () => setWindowSize(window.innerWidth);
  useEffect(() => (window.onresize = updateSize), []);

  useEffect(() => {
    if (currentUrl.endsWith("/sign-in")) {
      setMenu(
        <li>
          <Link to='/sign-up' className='header__link main-link'>
            Регистрация
          </Link>
        </li>
      );
    } else if (currentUrl.endsWith("/sign-up")) {
      setMenu(
        <li>
          <Link to='/sign-in' className='header__link main-link'>
            Войти
          </Link>
        </li>
      );
    } else {
      windowSize > 618
        ? setMenu(
            <>
              <li>{userEmail}</li>
              <li>
                <button
                  type='button'
                  className='header__btn main-link'
                  onClick={handleExitClick}
                >
                  Выйти
                </button>
              </li>
            </>
          )
        : setMenu(
            <li>
              <button
                type='button'
                className={`header__burger-btn main-link ${
                  isBurgerclicked ? "header__burger-btn_active" : ""
                }`}
                onClick={handleBurgerMenuClick}
              ></button>
            </li>
          );
    }
  }, [currentUrl, windowSize, isBurgerclicked]);

  return (
    <>
      <nav className={`burger ${isBurgerclicked ? "burger_active" : ""}`}>
        <ul className='burger__menu'>
          <li>{userEmail}</li>
          <li>
            <button
              type='button'
              className='burger__btn main-link'
              onClick={() => {
                handleBurgerMenuClick();
                onSignOut();
              }}
            >
              Выйти
            </button>
          </li>
        </ul>
      </nav>
      <header className='header root__header'>
        <Link className='main-link' to='/' title='Проект - Место'>
          <img src={logo} alt='Проект - Место.' className='header__logo' />
        </Link>
        <nav>
          <ul className='header__menu'>{menu}</ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
