<template>
  <div class="container-fluid">
    <div class="row">
      <HeaderComp />
      
    </div>
    <div class="row">
      <b-col lg="2">
        <SideBarComp />
      </b-col>
      <b-col cols>
        <b-col></b-col>
        <div class="tab-content clearfix">
          <div class="tab-pane active" id="1a">
            
            <ListBarang />
          </div>
          
          <div class="tab-pane" id="2a">
            <ListSupplier />
          </div>
        </div>
      </b-col>
    </div>
    <div class="row">
      <FooterComp />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ListBarang from "@/components/ListBarang.vue";
import ListSupplier from "@/components/ListSupplier.vue";
import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import SideBarComp from "@/components/SideBarComp.vue";
export default {
  name: "DashBoard",
  components: {
    ListBarang,
    ListSupplier,
    FooterComp,
    HeaderComp,
    SideBarComp,

  },
};
</script>
