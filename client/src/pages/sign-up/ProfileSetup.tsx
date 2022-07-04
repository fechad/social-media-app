import { BsArrowLeft } from 'react-icons/bs'
import '../../styles/ProfileSetup.css'
import Text from '../../components/Text'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import {VscInfo } from 'react-icons/vsc'
import {FiUpload} from 'react-icons/fi'
import { environment } from '../../environments/environment';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfileSetup = () => {
    let navigate = useNavigate();
    function getAge(dateString:string) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      return age;
    }
    const sendInfo = async () => {
        const form = new FormData();
        form.append('image', (document.getElementById('download') as HTMLInputElement).files![0], (document.getElementById('download') as HTMLInputElement).files![0].name);
        const name: string = (document.getElementById('download') as HTMLInputElement).files![0].name;


        const profileSetupInfos = {
          "photo" : `./assets/profile-pics/${name}`,
          "handle" : (document.getElementsByClassName('inputContainer')[0].firstChild as HTMLInputElement).value,
          "birthday" : getAge((document.getElementsByClassName('DateInput')[0] as HTMLInputElement).value),
          "accountName" : (document.getElementsByClassName('inputContainer')[1].firstChild as HTMLInputElement).value,
          "bio" : (document.getElementsByTagName('textarea')[0]).value,

        }
        axios.post(`${environment.serverUrl}/database/image`, form);
        await fetch(`${environment.serverUrl}/database/users`, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            "handle" : `${profileSetupInfos.handle}`,
            "profile_pic" : `${profileSetupInfos.photo}`,
            "age" : `${profileSetupInfos.birthday}`,
            "account_name" : `${profileSetupInfos.accountName}`,
            "private_account" : 'false',
            "bio" : `${profileSetupInfos.bio}`,
            "news_options" : 'All',
            "local_news" : 'false',
            "french_language" : 'false',
          }),
        }).then(() =>{
          navigate("/User/newsOptions", { replace: true });
        })
    }

    const uploadFile = (event: any) => {
      const file = (document.getElementById('download') as HTMLInputElement).files![0];
      const reader = new FileReader();
      reader.addEventListener('load', ()=>{
        document.getElementById('photo')?.setAttribute('src', reader.result!.toString())
      })
      reader.readAsDataURL(file);
    }

  return (
    <div className='ProfileSetupPage'>
      <a className='ArrowBack' href='/Login'><BsArrowLeft size={40}/></a>
      <div className='ProfileSetupContainer'>
        <section className='ProfileSetupContainerTitle'>
          <Text type='H1' content="Let's start by setting up your profile !" />
        </section>
        <div className='Content'>
          <section className='PhotoInputSection'>
            <div className='PhotoPreview'> <img src="" alt="" id ='photo'/></div>
            {/* <Button text='Upload a photo' icon={<FiUpload color='white' size={24}/>}/> */}
            <input type = 'file' id = 'download' onChange={uploadFile}></input>
            <label htmlFor="download">
              <p className = 'upload'> upload a photo </p>
              <FiUpload color='white' size = {24}/>
            </label>
          </section>
          <section className='ProfileDetailsSection'>
            <section className='HandleSection'>
              <Text color='red' content='*' />
              <TextInput width='392px' label='Choose your account handle:'  placeHolder='ex: @handle'/>
              <VscInfo className='InfoIcon' size={30}/>
            </section>
            <section className='BirthDaySection'>
              <Text color='red' content='*' />
              <Text type='H3' content='Enter your birthday:' />
              <input type={'date'} className='DateInput body'/>
              <VscInfo className='InfoIcon' size={30}/>
            </section>
            <TextInput label='Choose your account name:' placeHolder='ex: accountName2022' />
            <section className='BioSection'>
              <Text content='Bio:' />
              <textarea placeholder='Write a short bio !' maxLength={512} />
            </section>
            <Button textType='H3' text='Create profile' fct = {sendInfo}/>
          </section>
        </div>
      </div>
    </div>
  )}
export default ProfileSetup