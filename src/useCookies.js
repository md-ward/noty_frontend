import Cookies from "js-cookie";

export const getCookie = (name) => {

  return Cookies.get(name)




};

export const setCookie = (name, value) => {
  if (name == 'token') {
    Cookies.set(name, `Bearer ${value}`, { expires: 40 })
  }
  else { Cookies.set(name, value,{ expires: 40 }) }

};

export const removeCookie = (name) => {
  Cookies.remove('token')
  Cookies.remove('name')
  Cookies.remove('font')

};
