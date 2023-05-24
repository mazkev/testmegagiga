<template>
    <div class="m-auto pt-5 mt-5 container">
        <div class="row pt-5 mt-4">
            <b-col class="header-login primary text-center m-auto">
                <img src="../assets/logos.png" alt="">
                
                <h3 class="text-primary mt-3">Selamat Datang</h3>
                <h4 class="text-primary"><span style="text-transform: uppercase;"> Marketplace</span> invent</h4>
            </b-col>
            <b-col>
                <div class="form-login shadow  bg-white rounded">
                    <div class="header-form-login bg-info mb-3">
                        <h4>Login</h4>
                    </div>
                    <div class="body-form-login ps-3 pe-3">
                        <b-form @submit="onSubmit" v-if="show" class="my-3">
                            <b-form-group id="input-group-1" label="Username:" label-for="input-1" class="mb-3">
                                <b-form-input id="input-1" v-model="form.username" placeholder="Enter Username"
                                    required>
                                </b-form-input>
                            </b-form-group>
                            <b-form-group class="mb-3" id="input-group-2" label="Password:" label-for="input-2">
                                <b-form-input id="input-2" type="password" v-model="form.password"
                                    placeholder="Enter Password" required></b-form-input>
                            </b-form-group>

                            <div class="daftar">
                                <b-button type="submit" variant="primary">Login</b-button>
                                <router-link to="/register" class="navbar-brand">
                                    <p style="margin-top: 5px;">Belum Punya Akun</p>
                                </router-link>
                            </div>
                        </b-form>
                    </div>
                </div>
            </b-col>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            show: true,
        };
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            try {
                const data = await axios.post(
                    "http://159.223.57.121:8090/auth/login",
                    this.form
                );
                if (data.data.message === "LOGIN SUCCESS") {
                    localStorage.setItem("token", data.data.data.token);
                    localStorage.setItem("profileName", data.data.data.profileName);
                    alert("login berhasil");
                    this.$router.push("/dashboard");
                }
            } catch (error) {
                alert("Username atau Password salah");
            }
        },
    },
};
</script>
<style scoped>
.form-login {
    border-radius: 10px;
}

.header-form-login {
    border-radius: 10px 10px 0 0;
    padding-top: 5px;
    padding-bottom: 2px;
    text-align: center;
    color: rgb(13, 122, 185);
}

.daftar {
    text-align: center;
}
img {
    width: 300px;
    height: 200px;
}
</style>