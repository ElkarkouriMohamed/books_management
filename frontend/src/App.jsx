import axios from "axios"

function App() {

  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
  })

  const register = async () => {

    try {
      const res = await api.post('api/register', {
        "name": "mariam",
        "email": "mariam@gmail.com",
        "password": "4444"
      });

      localStorage.setItem('token', res.data.token);
      console.log(res.data);
    } catch (err) {
      console.log(err)
    }

  }

  const login = async () => {

    try {
      const res = await api.post('api/login', {
        "email": "simo@gmail.com",
        "password": "4444"
      });
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div>
      <button className="bg-blue-500 cursor-pointer m-2 p-2 rounded-sm" onClick={register}>
          register
      </button>
      <button className="bg-green-500 cursor-pointer m-2 p-2 rounded-sm" onClick={login}>
          login
      </button>
    </div>
  )
}

export default App
