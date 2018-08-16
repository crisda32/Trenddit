import React from 'react';

import classes from './PostInfo.css';

const PostInfo = (props) => {
    const commentsIcon = require('../../../assets/Icons/comments.png');
    const upIcon = require('../../../assets/Icons/up.png');

    let numComments = props.comments;
    numComments >= 1000
        ? numComments = (numComments / 1000).toFixed(1) + "k"
        : null;

    let numUps = props.ups;
    numUps >= 1000
        ? numUps = (numUps / 1000).toFixed(1) + "k"
        : null;

    return (
        <div className={classes.PostInfo}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <a href={"https://www.reddit.com/by_id/" + props.postId} target="_blank">
                                <img src={commentsIcon} alt="comments"/>
                            </a>
                        </td>
                        <td>
                            <p>{numComments}</p>
                        </td>
                        <td></td>
                        <td>
                            <img src={upIcon} alt="ups"/>
                        </td>
                        <td>
                            <p>{numUps}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
}

export default PostInfo;