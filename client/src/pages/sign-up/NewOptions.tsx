import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { VscInfo } from 'react-icons/vsc'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import Switch from '../../components/Switch'
import Text from '../../components/Text'
import '../../styles/NewsOptions.css'
import { useNavigate } from 'react-router-dom'
import { environment } from '../../environments/environment';
import { useContext } from 'react'
import { AuthContext } from '../../Auth'

const NewOptions = () => {

  const {currentUser} = useContext(AuthContext);
  let navigate = useNavigate();
  let updatedInfos = {
    "news_options" : 'All',
    "local_news" : 'false',
  };

  const activateLocalNews = () =>{
    if (updatedInfos.local_news === 'false'){
      updatedInfos.local_news ='true';
    } else {
      updatedInfos.local_news ='false';
    }
  }

  const getAllSelectedNews = () => {
    let selectedNews = 'All';

    const checkboxes = document.getElementsByClassName('CheckboxContainer');
    for( let i = 0; i < checkboxes.length; i++){
      let firstChild = checkboxes[i].firstChild as HTMLElement;
      if(firstChild.classList.contains('Checked') && checkboxes[i].children[1].textContent !== 'All'){
        selectedNews += ' ' + checkboxes[i].children[1].textContent
      }
    }
    return selectedNews.length > 3 ? selectedNews.split('All')[1] : selectedNews;
  }

  const updateNewsINfos = async () => {

    updatedInfos.news_options = getAllSelectedNews();

    await fetch(`${environment.serverUrl}/database/users/${currentUser.email}`, {
      method: 'PATCH',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        "news_options" : updatedInfos.news_options,
        "local_news" : updatedInfos.local_news,
      }),
    }).then(() =>{
      navigate("/User/Discover", { replace: true });
    })
  }

  return (
    <div className='NewsOptionsPage'>
      <a className='ArrowBack' href='/Login'><BsArrowLeft size={40}/></a>
      <a className='SkipLink H2' href='/User/Discover'> Skip</a>
      <div className='NewsOptionsContainer'>
        <section className='NewsOptionsContainerTitle'>
          <Text type='H1' content="News options !" />
        </section>
        <section className='Description'>
          <Text type='H2' content='Get informed with the latest topics by selecting your news preferences !' />
        </section>
         <Text type='H3' content='News preferences'/>
        <section className='CheckboxesSection'>
          <Checkbox text='All'/>
          <Checkbox text='Finance'/>
          <Checkbox text='Technology'/>
          <Checkbox text='Arts'/>
          <Checkbox text='Cinema'/>
          <Checkbox text='Food'/>
          <Checkbox text='Sports'/>
          <Checkbox text='Politics'/>
          <Checkbox text='Game'/>
        </section>
        <section className='LocalNewsOptionSection'>
          <Text type='H3' content='Activate local news options:'/>
          <Switch resp='custom' role={activateLocalNews} text={'Local news'} />
          <VscInfo className='InfoIcon' size={30}/>
        </section>
        <Button textType='H3' text='Continue to App' fct={updateNewsINfos} />
         
      </div>
    </div>
  )
}

export default NewOptions