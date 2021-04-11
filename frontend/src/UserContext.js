import axios from "axios";
import React, {useState, createContext, useEffect} from "react";
import Cookies from "js-cookie";
var qs = require('qs');

let userInfo = {
  data: null,
  authed: false
}

export const UserContext = createContext();

export const UserProvider = props => {
  const [user, setUser] = useState(userInfo);

  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_SERVER_URI + "/users/me",
      withCredentials: true
    }).then(res => {
      Cookies.set("shouldBeLoggedIn", true)
      if (res.data.diseases && res.data.diseases.length > 0) {
        axios.all([
          axios.get(
            process.env.REACT_APP_SERVER_URI + "/diseases?" +
            qs.stringify({id: res.data.diseases}, { indices: false }),
            { withCredentials: true }
          ),
          axios.get(
            process.env.REACT_APP_SERVER_URI + "/genders?id=" + res.data.gender,
            { withCredentials: true }
          )
        ]).then(axios.spread((diseasesRes, genderRes) => {
          setUser({
            authed: true,
            data: {
              ...res.data,
              diseases: diseasesRes.data,
              gender: genderRes.data[0]
            },
          });
        })).catch(() => {
          setUser({
            authed: false,
            data: null
          });
        })
      } else {
        setUser({
          authed: true,
          data: {
            ...res.data
          }
        });
      }
    }).catch(() => {
      Cookies.remove("shouldBeLoggedIn");
      setUser({
        authed: false,
        data: null
      });
    })
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}