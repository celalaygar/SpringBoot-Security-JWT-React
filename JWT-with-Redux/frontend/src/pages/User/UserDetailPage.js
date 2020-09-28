import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UpdateUserForm from '../../components/UpdateUserForm';
import UserCard from '../../components/UserCard'
import AlertifyService from '../../Services/AlertifyService';
import UserService from '../../Services/UserService';

const UserDetailPage = (props) => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [newImage, setNewImage] = useState();
    const [editable, setEditable] = useState(false);
    const [inEditMode, setInEditMode] = useState(false);
    const { username } = useParams(); // this.props.match.params.username
    const { t } = useTranslation();
    const reduxStore = useSelector((store) => {
        return {
            isLoggedIn: store.isLoggedIn,
            username: store.username,
            email: store.email,
            jwttoken: store.jwttoken,
            password: store.password,
            image: store.image
        };
    })
    //console.log(reduxStore)
    useEffect(() => {

        loadUser();
    }, [username,inEditMode,editable])

    const loadUser = async () => {
        setNotFound(false)
        setEditable(false);
        if (reduxStore.username === username) {
            setEditable(true);
        }
        try {
            const response = await UserService.getUserByUsername(username);
            setUser(response.data)

        } catch (error) {
            console.log(error)
            AlertifyService.alert("User not found !!");
            setNotFound(true);
        }
    }
    const showUpdateForm = (control) =>{
        setInEditMode(control);
        !control && setNewImage(undefined) 
    }
    const saveImage = async (e) =>{
        //data:image/jpeg;base64,/9j/4AAQSkZJRgA
        e.preventDefault();
        let body = { ...user};
        if(newImage){
            body ['image']= newImage.split(",")[1];
            try {
                const response = await UserService.update(username, body);
                console.log(response.data)
                showUpdateForm(false)
                AlertifyService.successMessage("User Image Updated..");
            } catch (error) {
                if (error.response) {
                    console.log(error.response)
                    if (error.response.data.validationErrors) {
                        console.log(error.response.data.validationErrors);
                        this.setState({ errors: error.response.data.validationErrors })
                    }
                }
                else if (error.request)
                    console.log(error.request);
                else
                    console.log(error.message);
            } 
        }else{
            AlertifyService.alert("User Image Not Updated..");
        }


    }
    const onChangeData = (type, event) =>{
        if(event.target.files.length <1){
            return ;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    };
    if (notFound) {
        return (
            <div className="container">
                <div className="alert alert-danger">User not found !!</div>
            </div>
        )
    } else if(!notFound) {
        return (
            <div className="col-lg-12">
                <h5>{t('User Detail')} </h5>
                <hr />
                <UserCard
                    user     = {user}
                    newImage = {newImage}
                    editable = {editable}
                    username = {username}
                />
                {
                    editable &&
                    <div className="card-body">
                        { !inEditMode ?
                            <button 
                                onClick={e => showUpdateForm(true)} 
                                className="btn btn-sm btn-success">{t('Edit')}</button> 
                                :
                            <button 
                                onClick={e => showUpdateForm(false)} 
                                className="btn btn-sm btn-danger">{t('Cancel')} </button>

                        }
                        
                    </div>
                }
                { inEditMode &&
                    <>
                        <ul className="list-group list-group-flush ">
                            <li className="list-group-item">
                                <b>Resim Değiştir : </b>
                                <input type="file" onChange={event=> onChangeData("image",event)}/>
                                <button 
                                onClick={saveImage} 
                                className="btn btn-sm btn-primary">{t('Save')} </button>
                                <button 
                                    onClick={e => showUpdateForm(false)} 
                                    className="btn btn-sm btn-danger">{t('Cancel')} </button>
                            </li>
                        </ul>
                        <UpdateUserForm 
                            user = {user}
                            inEditMode = {inEditMode}
                            newImage = {newImage}
                            showUpdateForm={showUpdateForm}
                        />
                    </>
                }
            </div>
        )
    }
};
// const mapStateToProps = (store) => {
//     return {
//         isLoggedIn: store.isLoggedIn,
//         username: store.username,
//         email: store.email,
//         jwttoken: store.jwttoken,
//         password: store.password,
//         image: store.image
//     };
// };
// export default connect(mapStateToProps)(withRouter(ProfileCard)) ;
//export default connect(mapStateToProps)(serDetailPage);
export default UserDetailPage;