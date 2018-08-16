export {
    logInAuthentication,
    signUpAuthentication,
    logout,
    authenticationCheckState
} from './authenticateActions';

export{
    setViewMode,
    toggleMyProfile
}from './auxiliaryActions'

export{
    fetchPosts,
    deletePosts,
    setSubreddit,
    fetchPostsById
}from './redditActions'

export{
    savePost,
    deletePost,
    fetchSavedPosts,
    removeSavedPosts
}from './firebaseActions'