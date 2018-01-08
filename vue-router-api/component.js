const Main = Vue.component('Main',{
    template:`
        <div class="template"> 
            <div class="con"> 
                <div class="left">
                    <router-view name="left"></router-view>
                </div>
                <div class="right">
                    <router-view name="right"></router-view>
                </div>
            </div>
        </div>
    `
})
const Left = Vue.component('Left',{
    data(){
        return{
            data:[]
        }
    },
    template:`
        <div> 
           <ul> 
           <div v-for="item in menu"> 
                <li>
                <router-link :to="'#'+item.id">{{item.title}}</router-link> 
                </li>
                    <ul> 
                        <li v-for="item1 in item.child">
                        <router-link :to="'#'+item1.id"> {{item1.title}}
                        </router-link>
                        </li>
                    </ul>
              
           </div>
           </ul>
        </div>
    `,
    computed:{
        menu(){
            var arr=[];
            for(let i in this.data){
                if(this.data[i].pid==0){
                    let obj =this.data[i]
                    arr.push(obj)
                }else{
                    for(let j in arr){
                        if(arr[j].id == this.data[i].pid){
                            if(arr[j].child){
                                arr[j].child.push(this.data[i])
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.data[i])
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },
    mounted(){
        fetch('./data.txt').then(function (e) {
            return e.json();
        }).then((e)=>{
            this.data=e;
        })
    },
    watch:{
        $route:function () {
            let hash = this.$route.hash.slice(1);
            let top = document.querySelector('#a'+hash).offsetTop-50
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector('.right').scrollTop })
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: top }, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.number.toFixed(0)
                })
                .start()

            animate()
        }
    }

})
const Right = Vue.component('Right',{
    data(){
        return{
            data:''
        }
    },
    mounted(){
        fetch('./doc.txt').then(function (e) {
            return e.text();
        }).then((e)=>{
            this.data=e;
        })
    },
    template:`
        <div class="markdown-body"> 
            <div v-html="data"></div>
        </div>
    `
})
const Team = Vue.component('Team',{
    template:`
    <div> 
        <div class="content">这是一个团队</div>
    </div>
    `
})