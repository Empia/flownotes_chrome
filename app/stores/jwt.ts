export const getJWT = () => {
  if (localStorage.getItem('reduxPersist:user') !== undefined) {
    let st = JSON.parse(localStorage.getItem('reduxPersist:user'))
    let jwt:string = (st !== null && st.data) ? st.data.token : '';
    console.log('jwt', jwt);
    return jwt; 
  } else {
    return ''
  }

}