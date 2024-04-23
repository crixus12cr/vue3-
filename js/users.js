window.addEventListener('load', ()=>{
    const app=Vue.createApp({
        data(){
            return{
                users:[],
               
            }
        },
        created() {
            if(localStorage.getItem('vue3.users')){
                this.users=JSON.parse(localStorage.getItem('vue3.users'));
            } else {
                this.listUsers();
            }

            this.listUsers();
        },
        mounted() {
            this.$refs.userName.focus();
        },
        methods: {
            listUsers: async function(){
                const res= await fetch('https://jsonplaceholder.typicode.com/users');
                const data= await res.json();
                this.users=data;
                this.updateLocalStorage();
                console.log(data);
            },
            updateLocalStorage: function(){
                localStorage.setItem('vue3.users', JSON.stringify(this.users));
            }
        },
    });

    app.mount('#app');
});