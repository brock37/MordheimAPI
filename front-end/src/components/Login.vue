<template>
    <div>
        <h2>Login</h2>
        <form v-on:submit="login">
            <input type="text" name="email" v-model="email"/><br>
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
        props:['username'],
        data (){
          return{
            email: "",
            password:""
          }
        },
        methods: {
            login(e){
                e.preventDefault()
                let email = this.email
                let password = this.password
                let login = () => {
                    let data = {
                        email: email,
                        password: password
                    }
                    axios.post("http://127.0.0.1:3000/login", data)
                        .then((response) => {
                            console.log("Logged in")
                            console.log(response.data[0]);
                            this.$emit('update:username', response.data[0])
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
