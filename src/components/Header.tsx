import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Factory, Users, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import localStorageService from '../manageLocalStorage/localStorage';
import { authLogout } from '../store/authStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [adminStatus,setAdminStatus] = useState<boolean>(false);

  const isActive = (path: string) => location.pathname === path;

  const userLoginStatus = useAppSelector(state=>state.auth.userStatus);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.auth.user);
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/add-admin',label:"Add Admin"},
    { to: '/complaint', label: 'Complaints', icon: AlertTriangle },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogOut=()=>{
    localStorageService.logoutData();
    dispatch(authLogout());
    navigate("/");
  }

  useEffect(()=>{
     if(user){
       if(user.role == "admin") setAdminStatus(true);
       else setAdminStatus(false);
     }
  },[user])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Factory className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-bold text-gray-900">Vizag Steel Plant</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const to = link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={` ${ to == "/add-admin"?(adminStatus && user?"flex":"hidden"):"flex"} items-center space-x-1 px-3 py-2  rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`text-gray-600 hover:text-blue-600 font-medium transition-colors ${userLoginStatus?"hidden":"flex"} `}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors ${userLoginStatus?"hidden":"flex"}`}
            >
              Register
            </Link>
            <button
             onClick={handleLogOut}
              className={`bg-red-600 ${userLoginStatus?"flex":"hidden"} hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2`}
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                  const to = link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${ to == "/add-admin"?(adminStatus && user?"flex":"hidden"):"flex"} items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.to)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 ${userLoginStatus?"hidden":"flex"}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${userLoginStatus?"hidden":"flex"}`}
                >
                  Register
                </Link>
                 <button
             onClick={handleLogOut}
              className={`bg-red-600 ${userLoginStatus?"flex":"hidden"} hover:bg-red-700 active:bg-red-800 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2`}
            >
              Logout
            </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;