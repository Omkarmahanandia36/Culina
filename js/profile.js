window.CulinaProfile=(()=>{
    function isProfileComplete(profile){
        return (
            profile && 
            profile.dite_type && 
            profile.cooking_skill
        );
    }

    function saveProfile(formData){
        const user = CulinaStorage.getUser();
        if (!user){
            throw new Error("user not logged in");
        }

        const profile = {
            user_id:user.user_id,
            dite_type:formData.diet_type,
            cooking_skill:formData.cooking_skill,
            allergies:formData.allergies || [],
            liked_ingredients: formData.liked_ingredients || [],
            avoided_ingredients:formData.avoided_ingredients || [],
            updated_at:Date.now()
        };

        CulinaStorage.saveProfile(profile);
        return profile;
    }

    function getProfile(){
        return CulinaStorage.getProfile();
    }

    function requireProfile(){
        const profile = getProfile();
        if (!isProfileComplete(profile)){
            window.location.href = "profile.html"
        }
    }

    return {
        saveProfile, getProfile, requireProfile, isProfileComplete
    };

})();