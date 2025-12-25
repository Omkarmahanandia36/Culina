window.CulinaStorage=(()=>{
    const PREFIX ="culina_";

    const KEYS={
        USER:PREFIX+"user",
        PROFILE:PREFIX+"user_profile",
        recipes : PREFIX+"recipes_cache",
        reviews :PREFIX+"reviews"
    };

function read(key,fallback){
    try{
        const data=localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
        }
    catch(err){
        console.error("storage read error:",key,err)
        return fallback;
    }
}

function write(key,value){
    try{
        localStorage.setItem(key,JSON.stringify(value));
    }
    catch(err){
        console.error("storage write error:",key,err);
    }
}
/*initialize*/ 

function init(){
    if (localStorage.getItem(KEYS.USER) === null){
        write(KEYS.USER, null);
    }
    if (localStorage.getItem(KEYS.PROFILE) === null){
        write(KEYS.PROFILE, null);
    }
    if (localStorage.getItem(KEYS.recipes) === null){
        write(KEYS.recipes, { data: [], cached_at: null });
    }
    if (localStorage.getItem(KEYS.reviews) === null){
        write(KEYS.reviews, []);
    }
}



/*for_user*/ 

function createUser(user){
    write(KEYS.USER,user);
}
function getUser(){
    return read(KEYS.USER,null)
}
function clearUser(){
    write(KEYS.USER,null);
    write(KEYS.PROFILE,null);
}

/*---for user profile---*/
function saveProfile(profile){
    write(KEYS.PROFILE,profile);
}
function getProfile(){
    return read(KEYS.PROFILE,null);
}
/*recipes cache--*/
function saveRecipes(recipes){
    write(KEYS.recipes,{data:recipes,cached_at:Date.now()});
}

function getRecipes(){
    return read(KEYS.recipes,{data:[],cached_at:null});
}

function clearRecipes(){
    write(KEYS.recipes,{data:[],cached_at:null});
}

/* -REVIEWS ---- */
function getAllReviews(){
    return read(KEYS.reviews,[]);
}
function saveReview(review){
    const allReviews=getAllReviews()
    const index=allReviews.findIndex(
        r => r.user_id===review.user_id && r.recipe_id===review.recipe_id
    );
    if (index!==-1){
        allReviews[index]=review;
    }
    else{
        allReviews.push(review)
    }
    write(KEYS.reviews,allReviews);
}
function getReviewsByRecipe(recipeId) {
    return getAllReviews().filter(r => r.recipe_id === recipeId);
  }

  function getAverageRating(recipeId) {
    const reviews = getReviewsByRecipe(recipeId);
    if (reviews.length === 0) return null;

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }

  /* - Public API - */

  return {
    init,
    createUser,
    getUser,
    clearUser,
    saveProfile,
    getProfile,
    saveRecipes,
    getRecipes,
    clearRecipes,
    saveReview,
    getReviewsByRecipe,
    getAverageRating
  };
})();

