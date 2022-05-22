import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL_NODE_API } from '../../Constant';
  

function Email(props) {

    let [email, setEmail] = useState('');
    const [text, setText] = useState('');
    let [empl, setEmpl] = useState([]);
    const [loading, setLoading] = useState(false);

useEffect(() => {
    axios
      .get(URL_NODE_API + `/empl/${props.match.params.idEmpl}`)
      .then((res) => {
      
        empl= setEmpl(res.data)
        email= setEmail(res.data.gmail)
      
      });
}, [])


    const sendText = async (e)=>{
        e.preventDefault();
        if(!email || !text){
            return alert('please fill email or message');
        }
        try {
            setLoading(true);
            const { data } = await axios.post(`https://node-server-construction.herokuapp.com/email`, {
              email,
              text
            });
            setLoading(false);
            alert(data.message);
        } catch (err) {
            setLoading(false);
            alert(
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message
            );
        }
    }
  return (
    
    <div className="container-fluid" style={{marginLeft:"30px"}}>
        <form>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              البريد الالكتروني
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="...@gmail.com"
              name="emailto"
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              الرسالة
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="text"
              placeholder="message text here..."
              onChange={(e)=> setText(e.target.value)}
            ></textarea>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
              onClick={sendText}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
  )
}

export default Email