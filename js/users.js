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
            this.$refs.name.focus();
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
            },
            deleteUser: function(id, event){
                const confirmation = confirm('Are you sure you want to delete this user?');
                if (confirmation) {
                    this.users= this.users.filter(user=>user.id!=id);
                    this.updateLocalStorage();
                }else{
                    event.preventDefault();
                }
            }
        },
    });

    app.mount('#app');
});