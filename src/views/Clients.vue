<template>
  <v-container>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col sm="12" lg="8">
        <h1 class="display-1 mb-4">Clients</h1>
        <v-simple-table class="mb-6">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Last Name</th>
                <th class="text-left">Email</th>
                <th class="text-left">Birth Date</th>
                <th class="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" :key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ client.lastName }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.birthDate }}</td>
                <td>
                  <v-btn text icon color="green">
                    <v-icon>mdi-pen</v-icon>
                  </v-btn>
                  <v-btn text icon color="red">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn to="/add-client" color="primary">ADD CLIENT</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      clients: []
    };
  },
  mounted() {
    api.get("/client/").then(response => (this.clients = response.data));
  }
};
</script>

<style>
</style>