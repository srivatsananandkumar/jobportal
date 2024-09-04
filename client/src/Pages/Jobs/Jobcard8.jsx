import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faHouse,faBookmark,faNewspaper,faCog,faBars,faSearch,faMapMarkerAlt,faCalendarDay,faHourglassHalf,faUsers,faClock,faTimes,
} from '@fortawesome/free-solid-svg-icons';
// import myimage from '../../Image/avatar-jessica.jpeg';
// import googleimage from '../Image/icons8-google.svg';
// import microsoftimage from '../Image/icons8-microsoft.svg';
// import youtubeimage from '../Image/icons8-youtube.svg';
// import appleimage from '../Image/icons8-apple.svg';
// import amazonimage from '../Image/icons8-amazon.svg';
import { useNavigate } from 'react-router-dom';
import './Jobcard1.css';
import axios from 'axios';

const Jobcard1 = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState('');
  const [optionalContact, setOptionalContact] = useState('');

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:3000/upload', formData)
      .then((res) => {
        console.log('File uploaded successfully');
      })
      .catch((er) => console.log(er));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !file || !contact) {
      alert('Please fill out all required fields.');
      return;
    }
    upload();
    alert('Job Applied Successfully!');
    console.log('Job Applied.');

    setModal(false);

    navigate('/jobs');
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className='new-container-43'>
        <div className='detail-43'>
          <button onClick={() => navigate('/jobs')} className='close-detail-43' style={{ background: 'none', border: 'none' }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className='detail-header-43'>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAC2CAMAAADAz+kkAAAAgVBMVEX///8AccUAbcQAa8MAb8QAZMEAaMIAacIAZsGIrtwAY8Bfl9OAqto1gstqndWjv+PA0+v1+f3T4PGWt9/q8fi4zunk7feNst7Z5fNHis7M3O9XktF4pdisxubJ2u7z9/xyodcfechCh82wyecAXr8qfckAWL0WdsekweMAVLxalNEXJwaAAAAQkklEQVR4nO2dibKqOBCGBQKJEQRFNsX9eHV8/wcccE1nYVFAPPf+VVNTM3ogfCbdnU4nDAY91yyee3vXH27G52TnbLdHLddxe3B2yXmcDv1TsIpnn25lN5qEq6W/WWwtSgixLGzoOrpIu+v6n7puYGwRQq3DInW9ePLphrek2PM3O2QSkpFgIJQqI5ThoXpiL6e/iU0cRKMjJRauRUMCh9Dj2J1/+nHeV7xMnYxH1jtexgHZ5Gicofe1nSbc2xkQ3BQPgMaih+j7+szUHRmtAHmSMQgZBd/TZab+wmyXyF06psn+C8CEp3PmY6oCubngzAlnwhjn/9KvnroqGITp2fv0UxfKszUT6+Uo8kgkC1ZMio9OFq9t7GEU+VdFQzsdL5KDRvJwBmO9QpfTCR6Gn352uWbLbNgUPsI17DCployH7n4VhyVdfxav9r59PhDzEuAUgjZo0r8OE7oOLRg2VxxaFqIGr0Tw6+k+Omsl3gyR47L5B3tdoX8wVUguPIizcb23u/hketpsKTGUZBDW3SaepwHNXBWSWyTqv8+D0WQV7ahyoCKMe8BlstzJBw7KgWxOLc1aVvZR1TkRRkEr96zeuJEMSd5FrIW/ajeKCF3F75HZFydu9daFzYoQEXxwRsTUNstuvOT65FCpkUF000kDBHmJ2KCMCNrsO00S5T+NjIthdO+m177Ot+UyJ+moj0Blv48kbETmqNtmTEd8N8kmI4do2m0rGIUbaohcdNRhiwLHBD8N0rNOsl931wCZ1rakvyDqd3R7Fw7jDImerjq6d6HWqYQLWXRw50kE5sIZEs3+3LjhNTubgt01tm134rVtMuYkQ4KG/UFy0fyIhVFktOoAYA/NZu5pz5BcFFG+uyCzvXYCJgjTUf8m7VeFB767INpScnfCWHhkUGfZ54ygzXeXlrD45BENIKu3Oa+HPCHApM1Pi5bGvU/2M90lanbkfDQiDc9CVkcLfU83uWvHGRekNXn1MLmHADo57Ju8css6c1j0XXPXfhgunY766IcLNLYgFmvY0IVXlnFzxMT+vhKSMddbaEPzEtu4mhO9qzlWs1rAaTQymrnsUM+tt9arxYQ6cqAn0pvJtwx1RLYfTgy/owm3JtvMGLJ/Dt8QnagV0xbcs//F/eSqEwFY+rBS1AclMGtIPt2efmjNdZbo0w3qh04wmPvXWa7aAj/0ey1L4DLyobed8/9jsAJjCKEOG9qpFgQ/ZdrMJ7E+Wi7HFIYTO9BZSK2YJRhGjHo9Ox6xfsVgJn1Tc+7tg8kEliTMQWepF+CmxHiKdLwWWU9KKnS2/0mOf+LBD1jtOIDOYtZJrtrsrfRxQw/QilRUgvFgSTMI0cAHDngP3JBVJzT9BVTsIKMSTslpECfgD14fQr+ASuoNlhb6ycxv6IA/2LB/gKwat/oFVNxosPwZOItsLG3AH0DnTGrk+9ugcvJZNbb4oKKypoPlf4P4v2Cw5bKpgEqdQK4NKgeLCSxoY0kJpQ+KFnFmZvd7mzcd4C9KDUv4/P3aoOKwLtFqn8rA1rzZbOWc+b9YsincsixL/PPLqAzizXY7FpdPQzCEaGHEsqLkt1FRCUQsheY2oNpfQyVhW4IL4rg9BdRsdpng11EBv7mhdkJLCvtSSq2nGqrJ7A+VE2tudVv1tT0tHWHvqz9UPNawINVICK5LAj/tlhj0h8qUdUIokX/Ju0KhLa9s9IcKcM3IkX5neoVC2l4+7g+VGaCylX0lvBZIGa1PAftDZW0yf6IdJd+4rb6iQ1OtVKqvVGQh/+Fy0cYrxSR6hco6DOOwuJz63REkozK6hmv8FDacsoqlH8VSqTffAiqGGz8uL/967I63pknyTc7ESQMlmretrWhX/OvnOOX+f5pvqL6LLpQfSUT1hSt18YCKZjz+4I+EY5yCIxXyoyEWit71tmcWfND86n6QYHBsdQoCfCQTQpjuJOssjrDX4Coxzb5yTHHPKSJHaejwdhTHxyuT244NsSr3HSqXW5mJ0OWrUgl34l6NGxfxoi9RcUGChZ/P3AoXsDgTeJdKvp2MR12RiitsSGAuKlnre4FKCp6Oe/qbUZEttr5PRUOUM6PVqCyI/Fv3i54aoAJWVQ0YvYa3gigiMWMNUMk6POzvlagcJBsGgQQsL1CB6WxorW5Li9LZURNU+ALoKlQO5Rfng4j6VOKCpQ//ZnKozI02QkUj4GeoQCWpcm0TNrg+FZBegXnb+/jR+VClQSowQCqnYlvybxRd9QUqC7B/FIS2d4tjSoPGZqhohE2wl1KZU/4jpGPJ6TMWsI/1qYBZEEi/BrexZcjzc5Wp6CCutThiwOtBKpYY22rw8RE2d7bv+psjf/wC+CVrUwExnIZZ640Ku0plKnq6nj0VemMYgIGgGc4O98+/un3uw/0H+PjYuBefobsGo742lTFgzBrbewvkVqU6FaEVUwtgoQz0sjkzfHK4Tz2Ag4u1kLWpgAEEahLuW/GoIoHwMpVBAJegGMNSQgV2Fb7IfgWwYAZZXSrQA7FmJTJkz9sIlQE4GYYNkUqogL0HpjARjMCMjnEcdanA2lKm1mly76xEtYf1DSrA77G2rJgKqCqRrcsBW0yes4maVFbcQH2OxXtnlSdy36QCjBlbHVJMBVQgyQY2KKs2nqVuNanAylKdKVi4W0R1RUv3VMAxFLKjLyaslWRSRfWozGHKlmnGo36DKtN+nVMBcxMsLfAFa+b0RSowaEL4+cnd3kh/Esmjd0EFeAYizXBG7HT6aVhqUQmgVWG+/shaFtQodE4FmBX5VoyABYcf2x9rUeFmD4z9ejSgoMqncyrsh4qiLJCD1h83rkPFhtkb1tbeL14wgLqnArLuR18mRZtqUJly008mX/0IPrGQ7PsclQkMww2Z4O64hxOqQeXITT+ZfNv5fhWzoDCjayphYbZWoue8szqVMZf9ZJc27r9K4Y6hrqnEtak8tq5XprKHoYqmMxbkkV3QNz2iMq1L5emnqlIJ+ZwWm5p9rIXgoq39XVOZt06F3/kOV8EeFqewCu73UTlwUJDOfDh79COq+vtPUGl9BAmrBybbgIdfVpSDfYhKbR9Ukwp/Vo/qmYpLi7umAutskFmuP3WoCFDA+GHSC7iwOLDz2JZ1EOgwmJSrBpWFcPAilwB9/CbF2xA7p2KUz4MUKqfiCGvX3KlOz55KCo+r6pwKSJ7UOr6gjIpwWpx4AtjTA8pzGHd1TgVctVbpfAmVuXiMNkJcsmD/GGHF25vTrqnsQfKkYN4qqJiKL9YIIWEC6D+GmFl4q86pVCkil6uIyiSReHzxPKfHI5UcDNY5FZglKzZ6UAVUAn7d+wJFTAqP7vcuOWOjfSq8C4R7r1WV4pK5m5LKRHJCdAZFsq7xMPUl3q8NKkXVaPzqlaSAMdfmR4w9leckmJKOokmPWXcqUmnDB51BMY3QG+CcVrYDZZJgDQtp1Y2iPamswk7WU5hF1pIR1AYVWPginDTFFWoQoVcElxwl5sv4huzTs6dHyGyKPHvCtKqQCmhiQ1SW8LGtxAvZ+pUJ5y50w2WDh/3hFngYXAgGLltIBak23DPYCqmAeouGqIRchhBZsNbJ54/mxTSJ9qv5ylsO2Zfg6HDwgeRmERUk1EWLVIqjOBA+NESFq5EQW6KJAZeBL2/hhYtb+ha0na0jKqCCD8r14+PjS8URPwgfmqLiykskH1T45Rql9CP7gKy/VFMxCzInz5+r5PQr9ppNURlI3+zD9Nqoau4JlH2zaWoVFWQWndj1jKQKk9nwVo1ROUmfmhnLQnZIIehgN08vpKBiOYVb5Z6FSGXr1MySUmNUBjtZYMVauKRKHTLi9xhrsqd6tlOXRylMk5/bs0peGjN5WpbmqAjLDzyVwah8EOkG70vCx9CUUEFmUran8vlIpedGx485eHNUBjNN7C3QG0qm/kCIJKL3DDVDQQVZx/J9n89MQuEy80XxfcbZIJVsjAgml4sR4oPcKN8uaMnN5u1tLBwVhPUqx3wzlTFF545ctb69k6BRKoNA4wrQhchprym4ZHGf0hqGG0IMBKgggqqlr5jVqMJ15ptWl5iSo2LpTxFxbjvG7OcyO+eN8hcKG/fv/Igjwkso/95YhLC5dQtDTy8LgZ+15umPU/XgB2bdhVsSUSh0E+sHGObTaPzUSPwxfPC5omFx4A/t9KqN7Avr/VijxLq8tDp/dbOJFfuBlQpqJH8ZE185Zzz70Ps2J9Pg5A+HQ98N5u1uzWdSP8a/U6PvYmzl7z0IuLbYFYZ6BwH/ZrEpAl04de+vFZuNUO0O+vvEpsRVO8n+PoENJertDX+ZQClhv8/z7VIge9rCm/++Uz67flJrnftb9IpZgNW4pE5RxHfI/VP+HVFw5535y7yzd7SKl7oUgjuOOzgorkNNHYJKFgBVgq+ut35P0BJf02SvUeGWLguXSr5I8eKW8n2NCr/OzR/A9JWaJo80+GtUYHFDnjb/lnfnKrViT1N7kQq/tIms78ay34IHepWKKxRFfC+WtW/A001epiIURaCWz8xuTdMxNfhlkpeprPiiCGUdUK+1PPCHG71FhTvG53Ktb0tuxynB0tW016nwe+MzkZL1+F5p7Uq7ybtUhDGkaTr6lsDFW1B5N3mXymAoloogqnyPQY80T4lVWLfwDhVpiQ0+qs406ommtq4cOY1QkZbYIDrqby53aiMi2sNmqTAlQqx0s5/OaJUaVZC8TUVmcXPh3r2Kdh2MSEUk71Phj+y7C2FhS8YHFfsOxWW2hNXPu3fcKwp/ESZ2H6ZG62BsKGI1lZC5K79uiVRY8npM1Qn4HWniDQ9CyVMpE+I04UUDdc1iZvCHnyro8YYOtWoSyVt8aOiXnBeUciLD3Db3FsuKmgX2gVrCTLhLJplCvciUIYNodleFLpO5O9LN+n0kl27KXhjxRluc4vJ5pBOycFvuMpP5abOlpK4deTCh58YbmJpld82ckrXwV3XefF1ZoeePtNeBXD1mG4t9geLVGvzN6XHsrhprwHoaROOtSSzxxPAa0smxrWXhmVPp1Pf81HNiWrvU9eLX+8069pbR2CEmkZygXk8I03ObVq9sWwHHxiIUH86pv/Sm6hcpsSTCeBWconS008ysd7zXPe7Siea3PJkNnaJtBVI4+Xn5Vv4yKHx0kvM4tYeR77s3+VFk25vxOXG2Brm8NepSpi6bqb+krJtIXqjbvJZW2btHCgBliHT9Ul5+l3Ep1c8/aQoEcz9Md1W2czShyW1DSc91CS67rDAJFzXMy0eUITlGnc9cp6oXYPVB+XaYzqcgV82Tfo4jHVOn5naYRhWPxHXKzyqbjpHR/tMp5dnQKl5e6FCZ/6fbYU+2YuydPnSYbJqBx/s+lTSGQ716DrkFIBmR9ifrr2ieWh8Bk8+3rHMfidy0SlHNhPKbQJBhUW2z7C+Rm2J/90IW9TUgBC9879POpqomnn2gpD3zm0/DTZxEQR8WXGppsoqSbOZrNDvbu6YlDmO/uXRW9wqDYWKZeT7xTTbZJNvA+SupN773dR1EqtnqZCcaJZdkWr2lvQuMPCmjJRs/mH6LBamhcLX0N4stzl/vbV2PPkCiLnmXS3oq6xmas9hEJ2/6xaOlsmbx3Nuf/MhOx6NFkuwcxzlk/+ySZDEab+yh7y4DbxrPWlkjeFf/A6uUCqXHDSULAAAAAElFTkSuQmCC" alt='Google Logo'></img>
            <h2>Intel</h2>
            <p>Electronics Engineer</p>
          </div>
          <hr className='divider-43' />
          <div className='detail-desc-43'>
            <div className='about-43'>
              <h4>About Company</h4>
              <p>Intel Corporation is a multinational technology company renowned for designing and manufacturing consumer electronics, software, and online services.</p>
              {/* <a href="#">Read more</a> */}
            </div>
            <hr className='divider-43' />
            <div className='qualification-43'>
              <h4>Qualification</h4>
              <ul>
                <li>
                  <span>UG:</span> BCA in Any Specialization, B.Sc in Any Specialization, B.Tech/B.E. in Any Specialization
                </li>
                <li>
                  <span>PG:</span> MS/M.Sc(Science) in Any Specialization, MCA in Any Specialization
                </li>
                <li>
                  <span>Doctorate:</span> Doctorate Not Required
                </li>
              </ul>
              <br></br>
              <br></br>
            </div>
          </div>
          <hr className='divider-43' />
          <div className='detail-btn-43'>
            <button className='btn-apply-43' onClick={toggleModal}>
              Apply Now
            </button>
            <button className='btn-save-43'>Save job</button>
          </div>
        </div>
        {modal && (
          <div className='modal-popup-43'>
            <div className='overlay-pop-up-43' onClick={toggleModal}></div>
            <div className='modal-content-popup-43'>
              <p>JOB APPLICATION
              <button onClick={toggleModal} className='close-detail-43-2' style={{ background: 'none', border: 'none' }}>
            <FontAwesomeIcon icon={faTimes} /></button></p>
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
                <input
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
                <label>Resume</label>
                <input
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                ></input>
                <input
                  type='text'
                  placeholder='Contact'
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                ></input>
                <input
                  type='text'
                  placeholder='Contact (opt)'
                  value={optionalContact}
                  onChange={(e) => setOptionalContact(e.target.value)}
                ></input>
                <button type='submit' className='btn-apply-43'>
                  Apply Now
                </button>
              </form>
            </div>
          </div>
        )}

        <div className='content-job-43'>
          <h1> Job description</h1>

          <p>
            Good knowledge in Java ,C,C++ is mandatory. Strong knowledge in OOPs concepts, J2EE, HTML, CSS, SQL. Logical and
            analytical thinking towards any programming language. Should have designed at least one project module using object
            oriented analysis and design techniques Sound knowledge of modern software architecture and
            <br></br> development techniques. Should be a self initiator and interested in learning new technologies. Good
            analytical and logical skills. Excelling problem solving skills with an out of the box approach.
          </p>
          <br></br>

          <p>
            <span>Location:</span> Delhi / NCR,Bangalore/Bengaluru,Hyderabad/
            <br></br>Secunderabad,
            <br></br>Chennai,Pune,Kolkata,Ahmedabad,Mumbai
          </p>
          <br></br>
          <br></br>
          <p className='new-contact-google-43'>Contact us</p>

          <p>
            <span>Mobile:</span> +91 8889888989
          </p>
          <p>
            <span>Email:</span> google@gmail.com
          </p>
          <p>
            <span>Lan:</span> 083 083 083
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobcard1;
