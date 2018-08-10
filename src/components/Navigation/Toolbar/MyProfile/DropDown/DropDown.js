import React from 'react';

import classes from './DropDown.css';

const dropDown = (props) => {
    let dropDownClasses = [classes.DropDown];
    props.show ? dropDownClasses.push(classes.Show) : null;
    dropDownClasses = dropDownClasses.join(' ');
    const profilePicture = require('../../../../../assets/Pictures/profilePicture.png');
    const hideIcon = require('../../../../../assets/Icons/hide.png');
    const likeIcon = require('../../../../../assets/Icons/like.png');
    const loveIcon = require('../../../../../assets/Icons/love.png');
    const saveIcon = require('../../../../../assets/Icons/save.png')

    return (
        <div className={dropDownClasses}>
            <h2>My Profile</h2>
            <button className={classes.Logout} onClick={props.logout}>Logout</button>
            <hr />
            <img src={profilePicture} alt="profile" />
            <h3>{props.displayName}</h3>
            <p>{props.email}</p>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img src={loveIcon} alt="loved" />
                            <p>Loved</p>
                        </td>
                        <td>0</td>
                    </tr>
                    {/* <tr>
                        <td>
                            <img src={likeIcon} alt="liked" />
                            <p>Liked</p>
                        </td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={saveIcon} alt="saved" />
                            <p>Saved</p>
                        </td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>
                            <img src={hideIcon} alt="hided" />
                            <p>Hided</p>
                        </td>
                        <td>0</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default dropDown;