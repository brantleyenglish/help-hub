import Cookies from 'universal-cookie';


export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const cookies = new Cookies();
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  cookies.set(cname, cvalue, { path: '/' });
};

export const getCookie = async (cname: string) => {
  const cookies = new Cookies();
  const cookie = await cookies.get(cname);
  return cookie;

};

export const deleteCookie = (cname: string) => {
  const cookies = new Cookies();
  cookies.remove(cname);
};

export default deleteCookie;
