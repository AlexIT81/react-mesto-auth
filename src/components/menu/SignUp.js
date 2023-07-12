import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <li>
      <Link to='/sign-in' className='header__link main-link'>
        Войти
      </Link>
    </li>
  );
};

export default SignUp;
