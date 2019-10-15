<template>
  <v-container>
    <v-row class="mb-6" justify="center" no-gutters>
      <v-col sm="12" lg="8">
        <h1 class="display-1 mb-4">Add Client</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            label="Name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Last Name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Birthday date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="date"
              :max="new Date().toISOString().substr(0, 10)"
              min="1900-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>

          <v-btn class="mr-4 primary" @click="submit">Submit</v-btn>
          <v-btn class="mr-4 red lighten-1 white--text" @click="clearInputs"
            >Clear</v-btn
          >
          <v-btn class="secondary" to="/">Clients List</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../../AxiosHttpClient';

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [value => !!value || 'Name is required'],
    lastName: '',
    email: '',
    emailRules: [
      value => !!value || 'E-mail is required',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
    ],
    date: null,
    menu: false,
  }),
  watch: {
    menu(val) {
      if (val) setTimeout(() => { this.$refs.picker.activePicker = 'YEAR'; });
    },
  },
  methods: {
    async submit() {
      await api
        .post('/client/', {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          birthDate: this.date,
        });
      this.$router.push('/');
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    clearInputs() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style>
</style>
