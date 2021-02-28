class UserListingTool {
    constructor() {
        this.usersUnfiltered = new Array();
        this.users = new Array();
        this.captureTimer;
        this.classUserData = ".FPmhX";
        this.intervalTimer = 100;
    }
    startListing () {
        this.captureTimer = setInterval(()=>{
            this.usersUnfiltered = Array.from(document.querySelectorAll(this.classUserData)).map(e=>e.text);
            const usersToadd = this.usersUnfiltered.filter(e=>!this.users.includes(e));
            this.users = [...this.users, ...usersToadd];
            if(usersToadd.length > 0) {
                console.log(usersToadd, " foi adicionado a lista de usuários!");
            }
        }, this.intervalTimer);
        console.log(new Date().toTimeString(), "\nListagem iniciou...");
    }
    stopListing () {
        clearInterval(this.captureTimer);
        this.captureTimer = undefined;
        console.log(new Date().toTimeString(), "\nListagem parou...");
    }
    clearListing () {
        this.usersUnfiltered = [];
        this.users = [];
        console.log(new Date().toTimeString(), "\nListagem foi limpa!");
    }
    getUsers () {
        return this.users
    }
    filterUsers (list1, list2, rule = true) {
        return list1.filter(user=>list2.includes(user) === rule)
    }
    getUserStore (key) {
        return JSON.parse(localStorage.getItem("users_" + key))
    }
    setUserStore (key, users) {
        return localStorage.setItem("users_" + key, JSON.stringify(users))
    }
    getKeysFromUserStore () {
        return Object.keys(localStorage).filter(e=>e.indexOf("users_") === 0).map(e=>e.replace("users_", ""))
    }
}
