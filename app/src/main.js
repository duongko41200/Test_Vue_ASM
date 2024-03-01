import { createApp } from 'vue';
import App from './App.vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';


import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import globalStyle from '@/assets/globalStyle.css';


/* import specific icons */
import { faPlus } from '@fortawesome/free-solid-svg-icons';



library.add(faPlus);

// import css
import './assets/css/app.css';

// import router
import router from './router';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(VueToast);
app.use(store);
app.use(globalStyle);
app.component('icon', FontAwesomeIcon);
// app.use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false })

app.mount('#app');
