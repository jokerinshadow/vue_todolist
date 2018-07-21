<template>
    <div>
        <!-- <h1>todo_list</h1>  
        计算器：
        <input type="text" v-model="num1"/>
        <input type="text" v-model="symbol"/>
        <input type="text" v-model="num2"/>
        <Calculator :num1="num1" :symbol="symbol" :num2="num2"></Calculator> -->
        <h1 style="text-align:center">ToDoList from Vue  by joker</h1>
        <div class="contains">
    <div class="head">
       
      <div class="time">
        <span class="time_show">{{this.time_type}}&nbsp;&nbsp;<span style="font-weight:bold">{{this.$route.params.username}}</span>&nbsp;&nbsp;&nbsp;{{this.time}}</span>
      </div>
      <div class="theme_color">
        <h3>主题颜色选择：</h3>
        <p>
          <button class="btn_red" @click="red"> </button>
          <button class="btn_green" @click='green'></button>
          <button class="btn_blue" @click="blue"></button>
          <button class='btn_black' @click='black'></button>
        </p>
      </div>

    </div>
    <div class="search">
      <div>
        <input type="text" placeholder="添加ToDo" class="search_inp" v-model="value" style="padding-left:20px"/>
        <button class="search_btn" @click="submit" >发送</button>
      </div>
    </div>
    <div class="content">
      <span class="waits">代办事项：
        <strong>{{doing_item}}</strong>
      </span>
      <i class="fin" style="margin-left:20px"> 已办事项：
        <strong>{{finish_item}}</strong>
      </i>
       <h2 style="color:black;font-weight:bold;margin-top:20px">正在进行</h2>
      <template v-for="item in list" >
            <div class="content_con" :key='item.id'>
                <p class="content_con_con">{{item.title}}</p>
                <p class="content_con_time">{{now_time}}</p>
                <p class="content_con_chk">
                 <a href="#" @click='look(item.id,item.type)'>{{item.look}}</a>
                <a href="#" @click="cancel(item.id,item.type)">{{item.delete}}</a>
                <input type="checkbox" @click="change_value(item.id,item.type)" :checked='checked' /> </p>
            </div>
      </template>

    </div>

    <div class="footer">
      <h2 style="color:black;font-weight:bold;">已经完成</h2>
       <template v-for="item in list_history">
            <div class="content_con" :key='item.id'>
                <p class="content_con_con">{{item.title}}</p>
                <p class="content_con_time">{{now_time}}</p>
              
                <p class="content_con_chk">
                 <a href="#" @click='look(item.id,item.type)'>{{item.look}}</a>
                <a href="#" @click="cancel(item.id,item.type)">{{item.delete}}</a>
                <input type="checkbox" @click="change_value(item.id,item.type)" :checked='checked' /> </p>
            </div>
      </template>

      <!--<div class="content_con1">
<p>今天天气非常好，太阳也很暖和，我们去游泳吧！今天一起非常好，太阳也很暖和，我们去游泳吧！今天一起非常好，太阳也很暖和，我们去游泳吧！</p>
<p class="footer_time">完成时间：2018-05-28。 晚上好！</p>
</div>


<div class="content_con1">
<p>今天天气非常好，太阳也很暖和，我们去游泳吧！今天一起非常好，太阳也很暖和，我们去游泳吧！今天一起非常好，太阳也很暖和，我们去游泳吧！</p>
<p class="footer_time">完成时间：2018-05-28。 晚上好！</p>
</div>-->
    </div>


  </div>


  <!--查看模态框begin-->
  <div class="modal" v-if="show_modal" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">

          <button class="modal_close" @click="inside_modal">X</button>
          <h3>修改管理</h3>
        </div>
        <div class="modal-body">
          <div class="modal-body_con">
            <p>内容：</p>
          </div>
          <div class="modal-body_tex">
            <textarea cols="65" rows="10" v-model="change_info"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-footer_okbtn" @click='reset_info'>确定</button>
          <button class="modal-footer_nobtn" @click="inside_modal">取消</button>
        </div>
      </div>
    </div>
  </div>
  <div class="aa"></div>
  <!--查看模态框end-->


  <!--完成模态框begin-->
  <div class="modal1 "   v-show="show_modal1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">

          <button class="modal_close" @click="inside_modal">X</button>
          <h3>修改管理</h3>
        </div>
        <div class="modal-body">
          <h3>你确定要修改模式吗？</h3>
        </div>
        <div class="modal-footer">
          <button class="modal-footer_okbtn1" @click="change_model">确定</button>
          <button class="modal-footer_nobtn1" @click="inside_modal">取消</button>
        </div>
      </div>
    </div>
  </div>

    </div>
</template>


<script>
        import Calculator from './commons/Calculator.vue'
        let change_item_title = '';
        let change_item_type = '';
        export default {
            name:'todo_list',
            data(){
               return{
                    num1:1,
                    symbol:'+',
                    num2:2,
                    value:'',
                    show_modal:false,
                    change_info:'',
                    checked:false,
                    show_modal1:false,
                    finish_item:'',
                    doing_item:'',
                    time:'',
                    time_type:'',
                    list:[
                        {id:1,title:'等你睡觉觉！',look:'查看',delete:'删除',type:'doing_list'}
                    ],
                    list_history:[]
               }

            },
            components:{
                Calculator,
            },
            methods:{
                submit(){
                    if(!this.value) return false;
                    let length = this.list.length;
                    let object_value = {id:length+1,title:this.value,look:'查看',delete:'删除',type:'doing_list'}
                    this.list.push(object_value);
                    this.doingFinish();
                    this.value = '';
                },
                // 删除
                cancel(id,type){
                    if(type === 'doing_list'){
                        this.list =  this.list.filter((item)=>{
                            if(item.id !== id)
                            return item;
                        })
                    }else{
                        this.list_history =  this.list_history.filter((item)=>{
                            if(item.id !== id)
                            return item;
                        })
                    }
                    this.doingFinish();
                },
                look(id,type){//触发编辑
                    this.show_modal = true;
                    change_item_title = id;
                    change_item_type = type;
                },
                //取消/'x'
                inside_modal(){
                    this.show_modal = false;
                    this.show_modal1 = false;
                    this.checked  = false;
                },
                //编辑
                reset_info(){
                    if(change_item_type === 'doing_list'){
                         for(let i = 0;i<this.list.length;i++){
                        if(change_item_title === this.list[i].id){
                            if(!this.change_info) return false;
                            this.list[i].title  = this.change_info;
                            this.change_info = '';
                            this.show_modal  =  false;
                            break;
                        }
                        }
                    }else{
                         for(let i = 0;i<this.list_history.length;i++){
                        if(change_item_title === this.list_history[i].id){
                            if(!this.change_info) return false;
                            this.list_history[i].title  = this.change_info;
                            this.change_info = '';
                            this.show_modal  =  false;
                            break;
                        }
                    }
                    }
                   
                },
                //添加到已完成
                change_value(id,type){
                    this.checked = !this.checked;
                    if(!this.checked){
                        return false;
                    }
                    else{
                        this.show_modal1 = true;
                        change_item_title = id;
                        change_item_type = type
                    }
                    
                },
                //改变模式
                change_model(){
                    if(change_item_type === 'doing_list'){
                        console.log('doing')
                        for(let i = 0;i<this.list.length;i++){
                        if(change_item_title === this.list[i].id){
                            this.list[i].type = 'finish_item';
                            this.list_history.push(this.list[i]);
                            this.list.splice(i,1);
                            this.show_modal1  =  false;
                            this.doingFinish();
                            break;
                        }
                    }
                    }else{
                        console.log('finish')
                        for(let i = 0;i<this.list_history.length;i++){
                        if(change_item_title === this.list_history[i].id){
                            this.list_history[i].type = 'doing_list';
                            this.list.push(this.list_history[i]);
                            this.list_history.splice(i,1);
                            this.show_modal1  =  false;
                            this.doingFinish();
                            break;
                        }
                    }
                    }
                    
                },
                //改变主题
                red(){
                    document.querySelector('.content_con').style.color = 'red';
                    document.querySelector('.content_con a').style.color = 'red';
                },
                blue(){
                     document.querySelector('.content_con').style.color = 'blue';
                     document.querySelector('.content_con a').style.color = 'blue';
                },
                green(){
                     document.querySelector('.content_con').style.color = 'green';
                     document.querySelector('.content_con a').style.color = 'green';
                },
                black(){
                     document.querySelector('.content_con').style.color = 'black';
                     document.querySelector('.content_con a').style.color = 'black';
                },
                doingFinish(){  //代办事项
                    let doing_items = this.list.length;
                    let finish_items = this.list_history.length;
                    this.doing_item = doing_items;
                    this.finish_item = finish_items;
                },
                rendertimes(){
                     let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth()+1;
                        let day = date.getDate();
                        let hour = date.getHours();
                        let minute = date.getMinutes();
                        let seconds  = date.getSeconds();
                        return year+'年'+month+'月'+day+'日'+hour+'时'+minute+'分'+seconds+'秒';       
                },
                rendertime_type(){
                    let date = new Date();
                    let hour = Number(date.getHours());
                    if(hour>=6&&hour<=12){
                         return '上午好!'
                    }else if(hour>=19||hour<6){
                        return '晚上好!'
                    }else{
                        console.log(hour);
                        return '下午好'
                    }
                    // switch(hour){
                    //     case hour>=6&&hour<=12:
                    //     console.log('haha')
                    //    
                    //     case hour>=19&&hour<6:
                    //      console.log('haha')
                    //     return '晚上好!'
                    //     case hour>12&&hour<19:
                    //      console.log('haha')
                    //     return '下午好'
                    //     default:
                    //     break;
                    // }
                }
            },
            //计算属性
            computed:{
                now_time(){
                    let date = new Date();
                    let year = date.getFullYear();
                    let month = date.getMonth()+1;
                    let day = date.getDate();
                    return year+'-'+month+'-'+day;
                }
            },
          
            created(){
                this.doingFinish();
                this.time = this.rendertimes();
                setInterval(()=>{
                    this.time = this.rendertimes();
                },1000)
               this.time_type = this.rendertime_type();
                
            }
        }
</script>

<style>
      * {
      margin: 0px;
      padding: 0px;
    }

    ul li {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: #777;
    }

    i {
      font-style: normal;
    }
    .content_con{
        background: white;
    }
    .contains {
      width: 960px;
      margin: 20px auto;
      border: 2px solid #ddd;
      padding: 30px;
    }

    .theme_color>h3 {
      font-family: STXingkai;
      margin-bottom: 5px;
      color: #81D8E6;
    }

    .btn_red {
      width: 35px;
      height: 35px;
      background: #F52C2C;
      border: none;
      cursor: pointer;
    }

    .btn_green {
      width: 35px;
      height: 35px;
      background: #3AB93A;
      border: none;
      cursor: pointer;
    }

    .btn_blue {
      width: 35px;
      height: 35px;
      background: #81D8E6;
      border: none;
      cursor: pointer;
    }

    .btn_black {
      width: 35px;
      height: 35px;
      background: black;
      border: none;
      cursor: pointer;
    }

    .time {
      float: right;
    }

    .search {
      margin-top: 10px;
    }

    .search input {
      width: 666px;
      height: 35px;
      border-radius: 4px;
      outline: none;
      border: 1px solid #DDDDDD;
    }

    .search_btn {
      width: 60px;
      height: 38px;
      background: deepskyblue;
      outline: none;
      border: none;
      border-radius: 4px;
      margin-left: 5px;
      cursor: pointer;
    }

    .content {
      margin-top: 15px;
    }

    .content span {
      color: #D80707;
    }

    .content i {
      color: #1A8A1A;
    }

    .content_con {
      width: 930px;
      height: 100px;
      border: 1px solid #ddd;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
    }

    .content_con1 {
      width: 930px;
      height: 100px;
      border: 1px solid #ddd;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
    }

    .content_con_time {
      float: left;
      margin-top: 30px;
    }

    .content_con_chk {
      float: right;
      margin-top: 40px;
    }


    .footer {
      margin-top: 20px;
      color: #888;
    }

    .footer_time {
      margin-top: 35px;
    }


    .modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1050;
      overflow: hidden;
      /*  -webkit-overflow-scrolling: touch;*/
      outline: 0;
      width: 600px;
      margin: 0 auto;
      top: 200px;
    }

    .modal1 {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1050;
      overflow: hidden;
      /*  -webkit-overflow-scrolling: touch;*/
      outline: 0;
      width: 600px;
      margin: 0 auto;
      top: 200px;
    }

    .show {
      display: block !important;
    }

    .modal-dialog {
      position: relative;
      width: auto;
      margin: 10px;
    }

    .modal-content {
      position: relative;
      background-color: #fff;
      /* -webkit-background-clip: padding-box;*/
      background-clip: padding-box;
      /*border: 1px solid #999;*/
      border: 1px solid rgba(0, 0, 0, .2);
      border-radius: 6px;
      outline: 0;
      /*-webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);*/
      box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
    }

    .modal-header {
      padding: 15px;
      border-bottom: 1px solid #e5e5e5;
    }

    .modal-body {
      position: relative;
      padding: 15px;
    }

    .modal-footer {
      padding: 15px;
      text-align: right;
      border-top: 1px solid #e5e5e5;
    }

    .modal_close {
      background: none;
      border: none;
      color: rgba(153, 153, 153, 0.58);
      font-weight: bolder;
      float: right;
      font-size: 16px;
      cursor: pointer;
    }

    .modal-body_con {
      float: left;
    }

    .modal-body_tex {
      float: left;
      margin-bottom: 10px;
    }

    .modal-footer {
      clear: both;
    }

    textarea {
      resize: none;
      outline: none;
      border: 1px solid #DDDDDD;
      border-radius: 4px;
    }

    .modal-footer_okbtn {
      width: 58px;
      height: 35px;
      color: white;
      background: darkcyan;
      outline: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .modal-footer_nobtn {
      width: 58px;
      height: 35px;
      color: white;
      background: #626D28;
      outline: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .modal-footer_okbtn1 {
      width: 58px;
      height: 35px;
      color: white;
      background: darkcyan;
      outline: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .modal-footer_nobtn1 {
      width: 58px;
      height: 35px;
      color: white;
      background: #626D28;
      outline: none;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .modal-body>h3 {
      color: darkred;
    }

</style>
