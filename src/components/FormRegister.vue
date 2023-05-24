<template>
    <div class="m-auto mt-5 container">
        <div class="row">
            <b-col class="header-login primary">
                <h1>Marketplace Invent</h1>
                <h3 class="text-primary">Selamat Datang</h3>
                <h4 class="text-primary"><span style="text-transform: uppercase;"> Marketplace</span> Invent</h4>
            </b-col>

            <b-col>
                <div class="form-login shadow  bg-white rounded">
                    <div class="header-form-login bg-info mb-3">
                        <h4>Register</h4>
                    </div>
                    <div class="body-form-login ps-3 pe-3">
                        <!-- <b-card border-variant="primary" header="Register" header-border-variant="primary"></b-card> -->

                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                            <b-form-group id="input-group-1" label="Username:" label-for="input-1" class="mb-3">
                                <b-form-input id="input-1" v-model="form.username" placeholder="Enter Username"
                                    required>
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-2" label="Profile Name:" label-for="input-2" class="mb-3">
                                <b-form-input id="input-2" v-model="form.profileName" placeholder="Enter Profile Name"
                                    required>
                                </b-form-input>
                            </b-form-group>

                            <b-form-group class="mb-3" id="input-group-4" label="Password:" label-for="input-4">
                                <b-form-input id="input-4" type="password" v-model="form.password"
                                    placeholder="Enter Password" required></b-form-input>
                            </b-form-group>

                            <div class="tes">
                                <b-button type="submit" variant="primary">Daftar</b-button>
                                <router-link to="/" class="navbar-brand">
                                    <p>Sudah Punya Akun</p>
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
                profileName: "",
            },
            show: true,
        };
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            try {
                const data = await axios.post(
                    `http://159.223.57.121:8090/auth/register`,
                    this.form
                );
                alert("data berhasil di buat");
                console.log("ini register", data);
                this.onReset(event);
            } catch (error) {
                console.log("ini register gagal", error);
                alert("data gagal di buat");
            }
        },
        onReset(event) {
            event.preventDefault();
            this.form.username = "";
            this.form.password = "";
            this.form.profileName = "";
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
    },
};
</script>
<style scoped>
.form-login {
    border-radius: 10px;
    border: 1px solid gray;
}

.header-form-login {
    border-radius: 10px 10px 0 0;
    padding-top: 5px;
    padding-bottom: 2px;
    text-align: center;
    color: rgb(13, 122, 185);
}

.tes {
    /* justify-content: center; */
    text-align: center;
}
</style>
  