
<template>
    <div>
       <form>
           <h4>欢迎登陆TodoList</h4>
           <input type="text" v-model="msg" placeholder="请输入用户名">
           <button @click="login">登陆</button>
       </form>
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return{
            msg:''
        }
    },
    methods:{
        login(){
            if(!this.msg){
                alert('输入内容不能为空!')
                return false;
            }
            this.$router.replace('/list/'+this.msg);
        }
    }
}
</script>

<style>
    body{
        background: #CDCDCD;
       
    }
    h4{
        text-align: center
    }
    form{
        height: 200px;
        width: 500px;
        margin: 200px auto;
    }
    input{
        width: 80%;
        height: 25px;
        margin-left: 5%;
        padding-left: 20px;
        box-sizing: border-box;
        border: 1px solid;
         border-radius: 10px;
    }
    button{
        height: 25px;
        font-weight: bold;
        margin-left: 7px;
         border: 1px solid;
         border-radius: 10px;

    }
</style>
