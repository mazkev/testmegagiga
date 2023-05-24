<template>
    <div>
        <div class="row">
            <b-col>
                <b-card footer-bg-variant="info" footer-text-variant="primary" footer-class="footer-card text-center"
                    class="shadow mb-2" footer-tag="footer">
                    <img src="https://image.pngaaa.com/378/2702378-middle.png"
                        alt="" class="w-100">
                    <template #footer>
                        <h6 class="mb-0 profile">{{profileName}}</h6>
                    </template>
                </b-card>
            </b-col>
        </div>

        <div class="row">
            <b-col>
                <b-card header="Menu" header-bg-variant="info" header-text-variant="primary"
                    header-class="header-card text-center" class="shadow mb-2 menu">

                    <ul class="nav nav-pills row">
                        <li class="active">
                            <a href="#1a" data-toggle="tab">Barang</a>
                        </li>
                        <li><a href="#2a" data-toggle="tab">Supplier</a>
                        </li>
                    </ul>
                </b-card>
            </b-col>
        </div>

        <div class="row">
            
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            profileName: "",
        };
    },
    created() {
        this.profileName = localStorage.getItem("profileName");
    }
}

</script>


<style scoped>
.nav-pills .active {
    background-color: #0d6efd;
    color: white;
}
a,
a:hover {
    color: inherit;
    text-decoration: inherit;
}
li {
    padding: 7px;
}

.profile {
    text-transform: uppercase;
}
</style>
