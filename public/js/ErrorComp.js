Vue.component('error', {
   data(){
       return {
           isActive: false,
           message: 'Невозможно отобразить страницу. Соединение потеряно'
       }
   },
    methods: {
       activate(url) {
           this.isActive = !this.isActive;
       }
    },
    template: `<div class="error" v-if="isActive">
                <div class="error-alert">{{ message }}</div>
</div>
    `
});