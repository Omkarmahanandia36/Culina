window.CulinaAuth=(() => {
    function isloggedIn(){
        return CulinaStorage.getUser() !== null;
    }

    function register(name,email){
        if (!name || !email){
            if (!name || !email){
                throw new Error("Name and email are required");
            }

            const user={
                user_id: "u_"+Date.now(),
                name:name.trim(),
                email:email.trim(),
                created_at:Date.now()
            };
            CulinaStorage.createUser(user);
            return user;
        }

        function logout(){
            CulinaStorage.clearUser();
            window.Location.href="login.html";
        }

        function requireAuth(){
            if(!isloggedIn()){
                window.location.href="login.html";
            }
        }
        return {isloggedIn,register,logout,requireAuth}
    };
})();