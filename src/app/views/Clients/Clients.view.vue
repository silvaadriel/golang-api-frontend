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
                <td>{{ client.birthDate.substr(0, 10) }}</td>
                <td>
                  <v-btn :to="`edit-client/${client.id}`" text icon color="green">
                    <v-icon>mdi-pen</v-icon>
                  </v-btn>
                  <v-btn @click="() => openDeleteClientDialog(client.id)" text icon color="red">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-dialog v-model="dialog" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">This action cannot be reversed.</v-card-title>
            <v-card-text>Are you sure you want to delete this client?</v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="green darken-1" text @click="deleteClient">Yes</v-btn>
              <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn to="/add-client" color="primary">ADD CLIENT</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../../AxiosHttpClient';

export default {
  data() {
    return {
      clients: [],
      clientId: null,
      dialog: false,
    };
  },
  mounted() {
    this.fetchClients();
  },
  methods: {
    openDeleteClientDialog(clientId) {
      this.clientId = clientId;
      this.dialog = true;
    },
    async deleteClient() {
      await api.delete(`/client/${this.clientId}`);
      this.clients = this.clients.filter(client => client.id !== this.clientId);
      this.clientId = null;
      this.dialog = false;
    },
    async fetchClients() {
      const response = await api.get('/client/');
      this.clients = response.data;
    },
  },
};
</script>

<style>
</style>
