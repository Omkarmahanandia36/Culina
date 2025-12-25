window.CulinaAuth = (() => {

  function isLoggedIn() {
    return CulinaStorage.getUser() !== null;
  }

  function register(name, email) {
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    const user = {
      user_id: "u_" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      created_at: Date.now()
    };

    CulinaStorage.createUser(user);
    return user;
  }

  function logout() {
    CulinaStorage.clearUser();
    window.location.href = "login.html";
  }

  function requireAuth() {
    if (!isLoggedIn()) {
      window.location.href = "login.html";
    }
  }

  return {
    isLoggedIn,
    register,
    logout,
    requireAuth
  };

})();
