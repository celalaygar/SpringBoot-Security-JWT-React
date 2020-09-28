import defaultPicture from "../assets/profile.png"
import React, { useEffect, useState } from 'react'
import ProfileImage from "./ProfileImage";
import { BACKEND_IMAGE_URL } from "../Shared/config";

const UserCard = (props) => {
    const [user, setUser] = useState({});
    const {  username,  fullName, image, email, bornDate } = user;
    let imageSource = defaultPicture;
    // const { t } = useTranslation();

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    if (image) {
        imageSource = BACKEND_IMAGE_URL+image;
    }

    return (
        <div className="container">
            <div className="card " >
                <div className="card-header text-center">
                    <ProfileImage
                        width="200px"
                        height="200px"
                        imageSource={imageSource}
                        newimage={props.newImage}
                        username={username}
                    />
                </div>

                <ul className="list-group list-group-flush ">
                    <li className="list-group-item"><b>username :</b> {username}</li>
                    <li className="list-group-item"><b>Full Name :</b> {fullName}</li>
                    <li className="list-group-item"><b>email : </b>{email}</li>
                    <li className="list-group-item"><b>bornDate :</b> {bornDate}</li>
                </ul>
            </div>
            <hr />

        </div>
    )


};

export default UserCard;
