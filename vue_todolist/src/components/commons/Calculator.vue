
<template>
<div>
    <form>
        <p>运算结果为：{{total}}</p>
    </form>
</div>
    
</template>

<script>
export default {
    name:'calculator',
    props:['num1','symbol','num2'],
    data(){
        return{
        }
    },
    computed:{
        total(){
            switch(this.symbol){
                case '+':
                return Number(this.num1)+Number(this.num2);
                 case '-':
                return Number(this.num1)-Number(this.num2);
                 case '*':
                return Number(this.num1)*Number(this.num2);
                 case '/':
                return Number(this.num1)/Number(this.num2);
            }           
        }
    }
}
</script>

<style>

</style>

