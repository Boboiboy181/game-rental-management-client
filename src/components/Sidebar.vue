<template>
  <v-toolbar flat app color="black">
    <v-app-bar-nav-icon
      class="grey--text"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-tile class="text-uppercase grey--text">
      <span class="font-weight-bold">GameRental</span>
      <span>Management</span>
    </v-toolbar-tile>
  </v-toolbar>
  <nav>
    <v-navigation-drawer app v-model="drawer" class="indigo" location="left">
      <v-toolbar color="red" density="compact" title="F4 STORE">
        <v-btn icon="mdi-magnify"></v-btn>
      </v-toolbar>
      <v-list>
        <v-list-item
          v-for="item in links"
          :key="item.text"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-btn falt color="warning" block>
        <span>SIGN OUT </span>
        <v-icon left>mdi-export</v-icon>
      </v-btn>
    </v-navigation-drawer>
  </nav>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" bg-color="black">
        <v-tab value="one" append-icon="mdi-database-search-outline"
          >Tra cứu khách hàng</v-tab
        >
        <v-tab value="two" append-icon="mdi-plus">Thêm Khách hàng</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Email</th>
                  <th class="text-left">SDT</th>
                  <th class="text-left">DiaChi</th>
                  <th class="text-left">Point</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Doan Van Anh Hien</td>
                  <td>21520227@gm.uit.edu.vn</td>
                  <td>0123456789</td>
                  <td>KTX Khu A</td>
                  <td>100000</td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
          <v-window-item value="two">
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="firstname"
                      :counter="10"
                      label="Full name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="number"
                      label="SĐT"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="2" md="4">
                    <v-text-field
                      v-model="diachi"
                      :counter="10"
                      label="Dia chi"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-account", text: "Customer", route: "/customer" },
        { icon: "mdi-shopping", text: "Products", route: "/products" },
        { icon: "mdi-form-select", text: "Pre-order", route: "/pre-order" },
      ],
      tab: 1,
      valid: 1,
    };
  },
};
</script>

<style scoped>
/* CSS tùy chỉnh cho sidebar */
</style>
