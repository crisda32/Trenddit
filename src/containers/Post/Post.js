import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Post.css';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import PostInfo from './PostInfo/PostInfo';
import * as actions from '../../store/actions/index';

class Post extends Component {
    state = {
        isSaved: this.props.isSaved
    }

    getIdByPostId = (postId) => {
        for(let i = 0; i < this.props.savedPosts.length; i++){
            if(this.props.savedPosts[i].postId === postId){
                return this.props.savedPosts[i].id
            }
        }
    }

    togglePost = (postId) => {
        this.setState({isSaved: !this.state.isSaved});

        const postData = {
            postId: postId,
            userId: localStorage.getItem('userId')
        }        
        const token = localStorage.getItem('token');
        const id = this.getIdByPostId(postId);
        !this.state.isSaved ? this.props.onSavePost(postData,token) : this.props.onDeletePost(id, token);
    }

    render() {
        let content = null;
        let post = null;
        
        let saveClasses = [classes.SavePostButton];
        this.state.isSaved ? saveClasses.push(classes.Saved) : null;
        saveClasses = saveClasses.join(' ');

        const viewModeBig = () => {
            if (this.props.post.thumbnail !== 'self' && this.props.post.thumbnail !== 'default') {
                if (!this.props.post.media) {
                    if (this.props.post.preview) {
                        if (this.props.post.preview.images[0].variants) {
                            if (this.props.post.preview.images[0].variants.gif) {
                                content = (
                                    <section className={classes.Content}>
                                        <img src={this.props.post.preview.images[0].variants.gif.source.url}></img>
                                    </section>
                                );
                            } else {
                                content = (
                                    <section className={classes.Content}>
                                        <img src={this.props.post.preview.images[0].source.url} />
                                    </section>
                                );
                            }
                        }
                    }
                } else {
                    if (this.props.post.media.reddit_video) {
                        content = (
                            <section className={classes.Content}>
                                <iframe
                                    src={this.props.post.media.reddit_video.fallback_url}
                                    frameBorder="0">
                                </iframe>
                            </section>
                        );
                    }
                    if (this.props.post.media.oembed) {
                        if (this.props.post.url.includes("youtube")) {
                            const url = this.props.post.url.replace('watch?v=', 'embed/')
                            content = (
                                <section className={classes.Content}>
                                    <iframe
                                        src={url.split('&')[0]}
                                        frameBorder="0">
                                    </iframe>
                                </section>
                            );
                        } else {
                            content = (
                                <section className={classes.Content}>
                                    <img src={this.props.post.media.oembed.thumbnail_url}></img>
                                </section>
                            );
                        }
                    }
                }
            }
            const cssClasses = classes.Post + " " + classes.BigPost;
            post = (
                <article className={cssClasses}>
                    <p>
                        <span className={classes.Subreddit}>r/{this.props.post.subreddit}</span>
                        <span className={classes.Author}>&#x25CF; Posted by {this.props.post.author}</span>
                    </p>
                    <h1 className={classes.PostTitle}>{this.props.post.postTitle}</h1>
                    {content}
                    <div className={classes.SavePost}>
                        <p>Save</p>
                        <button id={"save-"+this.props.post.id} className={saveClasses} onClick={() => this.togglePost(this.props.post.id)}></button>
                    </div>
                    {this.props.post.selfText !== "none" ? <p className={classes.PostDescription}>{this.props.post.selfText}</p> : null}
                    <a href={this.props.post.url} target="_blank" className={classes.PostLink}>{this.props.post.url}</a>
                    <PostInfo
                        comments={this.props.post.score.numComments}
                        ups={this.props.post.score.ups}
                        postId={this.props.post.id}
                    />
                </article>
            );
        }

        const viewModeMedium = () => {
            if (this.props.post.thumbnail !== 'self' && this.props.post.thumbnail !== 'default') {
                content = (
                    <section className={classes.Content}>
                        <img src={this.props.post.thumbnail} className={classes.Thumbnail}></img>
                    </section>
                );
            }
            const cssClasses = classes.Post + " " + classes.MediumPost;
            post = (
                <article className={cssClasses}>
                    <p>
                        <span className={classes.Subreddit}>r/{this.props.post.subreddit}</span>
                        <span className={classes.Author}>&#x25CF; Posted by {this.props.post.author}</span>
                    </p>
                    <h1 className={classes.PostTitle}>{this.props.post.postTitle}</h1>
                    {content}
                    <div className={classes.SavePost}>
                        <p>Save</p>
                        <button id={"save-"+this.props.post.id} className={saveClasses} onClick={() => this.togglePost(this.props.post.id)}></button>
                    </div>
                    <a href={this.props.post.url} target="_blank" className={classes.PostLink}>{this.props.post.url}</a>
                    <PostInfo
                        comments={this.props.post.score.numComments}
                        ups={this.props.post.score.ups}
                        postId={this.props.post.id}
                    />
                </article>
            );
        }

        const viewModeSmall = () => {
            const cssClasses = classes.Post + " " + classes.SmallPost;
            post = (
                <article className={cssClasses}>
                    <p>
                        <span className={classes.Subreddit}>r/{this.props.post.subreddit}</span>
                        <span className={classes.Author}>&#x25CF; Posted by {this.props.post.author}</span>
                    </p>
                    <h1 className={classes.PostTitle}>{this.props.post.postTitle}</h1>
                    <div className={classes.SavePost}>
                        <p>Save</p>
                        <button id={"save-"+this.props.post.id} className={saveClasses} onClick={() => this.togglePost(this.props.post.id)}></button>
                    </div>
                    <PostInfo
                        comments={this.props.post.score.numComments}
                        ups={this.props.post.score.ups}
                        postId={this.props.post.id}
                    />
                </article>
            );
        }

        switch (this.props.viewMode) {
            case "view-2":
                viewModeBig();
                break;
            case "view-4":
                viewModeMedium();
                break;
            case "view-6":
                viewModeSmall();
                break;
            default:
                viewModeBig();
                break;
        }

        return (
            <Auxiliar>{post}</Auxiliar>
        );
    };
};

const mapStateToProps = state => {
    return{
        savedPosts: state.firebaseReducer.savedPosts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSavePost: (postData, token) => dispatch(actions.savePost(postData, token)),
        onDeletePost: (id, token) => dispatch(actions.deletePost(id, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);