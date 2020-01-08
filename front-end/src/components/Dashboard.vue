
<template>
    <div>
        <h2>Dashboard</h2>
        <p>Name: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
    </div>
</template>
<script>
    import axios from "axios"
    import router from "../router"
    export default {
        name: "Dashboard",
        props:['usernameLog'],
        data() {
            return {
                user: {}
            }
        },
        methods: {
            getUserData: function() {
                
                axios.get("http://127.0.0.1:3000/user/data")
                    .then((response) => {
                      console.log("GetDataUser VUEJS");
                        console.log(response)
                        //self.$set(this, "user", response.data.user.username)
                        this.user= response.data.user
                    })
                    .catch((errors) => {
                        console.log(errors)
                        //router.push("/")
                    })
            }
        },
        mounted() {
            this.getUserData()
        }
    }
</script>
