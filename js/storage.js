const CulinaStorage=(()=>{
    const PREFIX ="culina_";

    const KEYS={
        USER:prefix+"user",
        PROFILE:prefix+"user_profile",
        recipes : prefix+"recipes_cache",
        reviews :prefix+"reviews"
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
/*innitialize*/ 

function init(){
    if (!localStorage.getItem(KEYS.USER)){
        write(KEYS.USER,null);
    }
    if (!localStorage.getItem(KEYS.PROFILE)){
        write(KEYS.PROFILE,null);
    }
    if (!localStorage.getItem(KEYS.recipes)){
        write(KEYS.recipes,{data : [],cached_at:null});
    }
    if (!localStorage.getItem(KEYS.reviews)){
        write(KEYS.reviews,[]);
    }
}

/*for_user*/ 

function createUser(user){
    write(KEYS.USER,user);
}
function getUser(user){
    return read(KEYS.USER,null)
}
function clearUSer(){
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
/*recipies cache--*/
function saveRacipes(racipes){
    write(KEYS.recipes,{data:recipes,cached_at:Date.now()});
}

function getRecipies(){
    return read(KEYS.recipes,{data:[],cached_at:null});
}

function clearRecipes(){
    write(KEYS.recipes,{data:[],cached_at:null});
}

/* -REVIEWS ---- */
function getAllReviews(){
    return read(KEYS.reviews,[]);
}
function saveReviews(reviews){
    const reviews=getAllReviews()
    const index=reviews.findIndex(
        r >=r.user_id===reviews.user_id && r.recipe_id===review.recipe_id
    );
    if (index!==-1){
        reviews[index]=reviews;
    }
    else{
        reviews.push(reviews)
    }
    write(KEYS.reviews,reviews);
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

