import React, { Component } from 'react';

import classes from './Post.css';

class Post extends Component {
    render() {
        let content = null;
        if (this.props.post.thumbnail !== 'self') {
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
                        const url = this.props.post.url.replace('watch?v=','embed/')
                        content = (
                            <section className={classes.Content}>
                                <iframe 
                                    src={url} 
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
        return (
            <article className={classes.Post}>
                <p>
                    <span className={classes.Subreddit}>r/{this.props.post.subreddit}</span>
                    <span className={classes.Author}>&#x25CF;Posted by {this.props.post.author}</span>
                </p>
                <h1 className={classes.PostTitle}>{this.props.post.postTitle}</h1>
                {content}
                {this.props.post.selfText !== "none" ? <p className={classes.PostDescription}>{this.props.post.selfText}</p> : null}
                <a href={this.props.post.url} target="_blank" className={classes.PostLink}>{this.props.post.url}</a>
            </article>
        );
    };
};

export default Post;