<template>
    <div>
        <h2>Login</h2>
        <form v-on:submit="login">
            <input type="text" name="username" v-model="username"/><br>
            <input type="password" name="password" v-model="password"/><br>
            <input type="submit" value="Login" />
        </form>
    </div>
</template>

<script>
    import router from "../router"
    import axios from "axios"
    export default {
        name: "Login",
        props:['usernameLog'],
        data (){
          return{
            username: "",
            password:""
          }
        },
        methods: {
            login(e){
                e.preventDefault()
                let username = this.username
                let password = this.password
                let login = () => {
                    let data = {
                        username: username,
                        password: password
                    }
                    axios.post("http://127.0.0.1:3000/user/login", data)
                        .then((response) => {
                            console.log("Logged in")
                            console.log(response.data[0]);
                            this.$emit('update:usernameLog', response.data[0])
                            router.push("/")
                        })
                        .catch((errors) => {
                            console.log(["Cannot log in", errors])
                        })
                }
                login()
            }
        },
    }
</script>
