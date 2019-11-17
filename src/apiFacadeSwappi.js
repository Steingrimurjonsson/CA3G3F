import { onlineURL as URL } from "./settings.js";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
  
}

class ApiFacadeSwappi {
  fetchData = () => {
    const options = this.makeOptions("GET", true); //True add's the token
    const swappi = this.data;
    
    return fetch(URL + "/api/info/"+swappi, options).then(handleHttpErrors);
  };
  getData = () => {
    return localStorage.getData("data");
  };
  makeOptions(method, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
}

const facadeSwappi = new ApiFacadeSwappi();
export default facadeSwappi;
