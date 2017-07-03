<template>
  <div id="app"  class="showMask pt-relative" :class="{'showAll' : showAll}">
        <header class="top-header">
              <div class="title">{{product.name}}     
                  <mark v-if='!isOpEmpty(product.labelList)'>{{product.labelList.length>0 ? product.labelList[0].label : ''}}</mark>

              </div>
              <div class="date">净值日期：{{product.valueDate ? product.valueDate : '--'}}</div>
               <div class="income">
                    <div class="left">
                      <div class="level-1">七日年化收益率</div>
                      <div class="level-2">{{product.yieldValue ? product.yieldValue : '--'}}</div>
                    </div>
                    <div class="right">
                      <div class="level-1">万份收益</div>
                      <div class="level-2">{{product.dayIncome ? product.dayIncome : '--'}}</div>
                    </div>
               </div>
        </header>
        <div class="center-table">
              <div class="sub-type">  
               <div class="item " @click="changeValueType(0)" :class="{'active': valueType == 0 }"> 
                      七日年化收益率
                  </div>
                  <div class="item"  @click="changeValueType(1)" :class="{'active': valueType ==1 }">万份收益</div>
              </div>  
              <div class="table">
                <div class="top-info">
                  <div>净值日期：{{product.valueDate ? product.valueDate : '--'}}</div>
                  <div>七日年化：{{product.yieldValue ? product.yieldValue : '--'}}</div>
                </div>
                <div class="charts" id="echart"></div> 
                <div class="footer-date">
                  <div v-text='startDate'></div>
                  <div v-text='endDate'></div>
                </div> 
                <div class="date-type">
                  <div class="date-item" @click='changeTimeType(1)' :class="{'active':timeType == 1}">
                    近一月
                  </div>
                     <div class="date-item"  @click='changeTimeType(2)' :class="{'active': timeType == 2}">
                    近三月
                   </div>                
                   <div class="date-item"  @click='changeTimeType(3)' :class="{'active': timeType == 3}">
                    近半年
                  </div>
                  <div class="date-item"  @click='changeTimeType(4)' :class="{'active': timeType == 4}">
                    近一年
                  </div>

                </div>
              </div>
              


        </div>

        <doc :product='product'/>
        <contact/>
 
  
     
  </div>
</template>

<script>
  import echarts from "echarts";
  import { basePath } from 'src/common/js/config';
  import { getQueryString } from 'src/common/js/unit';
  import contact from 'src/components/common/Contact';
  import Doc from 'src/components/common/detailsDocument';
  import {isEmpty} from 'src/common/js/unit';
  import * as Global from 'src/common/js/global';
  import { Bunding } from 'src/common/js/config';
   import  * as WeXin from 'src/common/js/WeXin';

  const PAGE = 1;
  const PAGE_SIZE = 6;
  const TIME_TYPE = 2; // 1个月 : 1 , 3个月 : 2 , 6个月: 3 ,  1年: 4
  export default {
    name: 'app',
    data(){
        return{
          valueType: 0,
          "isActive1" : true,
          "isActive2" : false,
          "isActive3" : false,
          showAll: false,
          timeType : TIME_TYPE,
          code : getQueryString('prdtCode'),
          type : getQueryString('type'),
          page: PAGE,
          pageSize: PAGE_SIZE,
          showMore: true,
          product: Object,
          dataWList: [], //万分收益率
          dataQList:[],  // 七日年化
          dateList:[],
          dataList:[],
          startDate: '',
          endDate:''
        }
    },
    watch:{
      pageSize: function(){
         this.loadData();
      },
      product: function(val,oldVal){
         
         this.showAll = true;
         this.dataWList  = [];
         this.dateList = [];
         this.dataQList = [];
        
         for (let i = val.valueList.length-1 ; i >=0 ; i --) {
              let demo  = val.valueList[i];
              this.dataWList.push(demo.value1);
              this.dataQList.push(demo.value2);
              this.dateList.push(demo.valueDate);
              if(i==0){
                this.endDate = demo.valueDate;
              }
          
              if(i == val.valueList.length -1){
                 this.startDate = demo.valueDate;
              }
         }
         
         this.dataList  =  this.valueType == 0 ? this.dataQList : this.dataWList; 
         
         this.initEcharts();
      },
      timeType: function(timeType, oldTimeType){
        this.loadData();
      }
    },  
    mounted(){  
        this.loadData();
      
       // this.getInitData()
    },
    methods:{
     isOpEmpty(arr){
        if(arr && arr.length > 0){
          return false
        }else{
          return true
        }
      },
      loadData(){
        
        let _this = this;
        if(isEmpty(sessionStorage.token)){
              if(isEmpty(getQueryString(Global.OpenIdParam))){
                 Global.Access.init( function(data){       
                 sessionStorage.token = data.token;    
                 sessionStorage.bindStatus = data.bindStatus;
                    if(sessionStorage.bindStatus=='0'){
                      location.href= 'bunding.html#/bunding'; 
                    }else{
                      _this.getInitData();             
                    }       
                })
              }else{

            this.axios.get(Bunding.getOpenId, {
                    params:{
                      code: getQueryString(Global.OpenIdParam)
                    }
                }).then((response)=>{
          
                  if(response.data.flag.code==0 || response.data.flag.code=="0"){
                      sessionStorage.token = response.data.token;    
                      sessionStorage.bindStatus = response.data.bindStatus;
                     
                      if(sessionStorage.bindStatus=="0"){
                          location.href= 'bunding.html#/bunding'; 
                      }else{
                          _this.getInitData();            
                      }
                  }else{
                    alert(response.data.flag.msg)
                  }
                }).catch(function (error) {
                    console.log(error);
                });
              }  
             
        }else{
                  this.getInitData();
        }

      },
      getInitData(){
             
                 this.axios.get(basePath +'/weixin/asset_management/product_details',{
                    params:{
                      prdtCode: this.code,
                      type : this.type,
                      timeType: this.timeType,
                      page: this.page,
                      pageSize :this.pageSize,
                      planBulletion: 6502,
                      legalBulletion: 11,
                      _dt: new Date().getTime()
                    }
                  }).then((response)=>{
                    if(response.data.flag.code==0){
                       this.product = response.data.productInfo;            
                    }else{

                    }
                  })

                     WeXin.init();
      },
      initEcharts(type){

        var option = {
            animation:false,
            grid:{     // 定义表相对于canvas 上下左右的编剧
              left: 48,      
              right: 2,
              top: 10,
              bottom: 5
            } ,
            tooltip: {
              trigger: 'axis',
              formatter: function(params, ticket, callback){
                let b = !isEmpty(params[0].name)  ? params[0].name : '--'
                let c = !isEmpty(params[0].value) ? params[0].value  :  '--' 
                return b  +  " : " + c  
              }  ,
              position: function (pt) {
                 return [pt[0], 10];
              },axisPointer:{
                lineStyle:{
                  color:"#0076FF"
                }
              },confine: true,
              backgroundColor: "rgba(50,50,50,0.65)"
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.dateList,
                axisLine:{
                show: false
              },
              axisTick:{
                show: false
              },
              axisLabel:{
                  textStyle: {
                    color: "#808080",
                     fontSize: 12 
                  }
              }
              
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
                axisLine:{
                  show : false
                },
                scale: true,
                splitNumber: 5,
                minInterval: 0.005,
                axisTick:{show: false},
                axisLabel:{
                  textStyle: {
                    color: "#808080",
                    fontSize: 10  
                  },
                  formatter: function(val){
                      return val.toFixed(4)
                  }
              },
              splitLine :{
                 lineStyle:{color: '#ebedf1'}
                
              }
            } ,
            series: [
                {
                     
                    type:'line',
                    smooth:false,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: '#097BF1 ',
                            width: 1
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: "rgba(9,123,241,.2)"
                        }
                    },
                    lineStyle:{
                      normal:{
                        width:1
                      }
                    },

                    data: this.dataList
                }
            ]
        };
          let myChart = echarts.init(document.getElementById('echart'));
          myChart.setOption(option);
      }, 
      changeValueType(type){
        this.valueType = type;
        this.dataList  =  type == 0 ? this.dataQList : this.dataWList; 
        this.initEcharts();
      },
      changeTimeType(type){
        this.timeType = type;

      }


    },
    components: {
      contact,Doc
    }
  }
</script>

<style lang="scss" scoped>


@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}
@mixin row-height ($height){
  height: $height;
  line-height: $height;
}

$borderColor: #efeff5;

    .top-header{
      padding: 0 0.4267rem;
      border-bottom: 0.1333rem solid $borderColor;

    }
    .title{
      
      font-size:0.48rem;
      color: #303030;
      line-height: .8rem;
      padding:.1rem 0;
      mark{
        background: none;
        border: 1px solid #FE9D83;
        border-radius: 0.0533rem;
        height: 0.48rem;
        color: #FE9D83;
        font-size: 12px;
        margin-left: 10px;
        vertical-align: middle;
        padding:.0267rem .0533rem; 
        



      }

    }

    .date{  
      font-size: 0.3733rem;
      color: #AAB0C0;
      @include row-height(0.5333rem);
    }
    .income{
      display: flex;
      flex-flow: row;
      margin-top: 0.56rem;

      >div{
        flex: 1;

        .level-1{
            font-size: 0.3733rem;
            color: #808080;
            @include row-height(0.5867rem);

        }
        .level-2{
           
            font-size: 0.9067rem;
            color: #FD2601;
            @include row-height(1.3333rem);

        }
        &.right{
          .level-2{
             
            font-size: 0.64rem;
            color: #303030;
            line-height: 1.42rem;
          }
        }
      }
    }

      
    .center-table{

      height: 8.7467rem;
      @include box-sizing(content-box) ;
      border-bottom: 0.1333rem solid $borderColor;
      .table{
        padding: 0 0.4rem;
      }

      .top-info{
        display: flex;
        flex-flow:row;
        
        font-size: 0.32rem;
        color: #AAB0C0;
        margin: 0.08rem 0;
        @include row-height(0.7467rem);

        >div{
          flex: 1;

          &:last-child{
            text-align: right;
          }
        }
      }
      .charts{

        height: 4.8rem;

      }
      .footer-date{
        font-family: PingFangSC-Regular;
        font-size: 0.32rem;
        color: #808080;
        display: flex;
        flex-flow: row;
        @include row-height(0.48rem);
        div{
          flex: 1;

          &:first-child{
            text-indent: 0.8rem;
          }
          &:last-child{
            text-align: right;
          }

        }
      }
      .date-type{
        display: flex;
        flex-flow: row;
        font-family: PingFangSC-Regular;
        font-size: 0.3733rem;
        color: #A9AEB9;
        text-align: center;
        margin-top: 0.2667rem;
        .date-item{
          flex:1;
          background: #FFFFFF;
          border: 0.0267rem solid #D9D9D9;
          border-right: 0;
         
           @include row-height(0.7467rem);
           @include box-sizing(border-box);

           &:first-child{
            border-top-left-radius: 0.0533rem;
            border-bottom-left-radius: 0.0533rem;
           }

           &:last-child{
            border-top-right-radius: 0.0533rem;
            border-bottom-right-radius: 0.0533rem;
            border-right: 0.0267rem solid #D9D9D9;;
           }

           &.active{
            background: #f3f3f3;
            font-family: PingFangSC-Regular;
            
            color: #404040;
           }
        }



      }
    }

    .sub-type{
      display: flex;
      flex-flow: row;

      .item{
        flex: 1;
        text-align: center;
        @include row-height(1.3333rem);
        font-size: 0.4267rem;
        color: #808080;
        border-bottom: 0.0267rem solid $borderColor;
        @include box-sizing(border-box) ;
        transition: all .5s easy-in;
       
      }
      .active{
        color: #367ded;
        border-bottom: 0.0533rem solid #367ded;
      }

    }


    .panel{

        .panel-header{
           @include row-height(1.3333rem);
           font-size: 0.4267rem;
           color: #303030;
           padding: 0  0.4267rem;
           display: flex;
           flex-flow: row;
           >div{
            flex: 1;

            &:last-child{
              text-align: right;
            }
           }

           img{
            width: 0.4rem;
            transition: all .3s ease; 
           }
           img.active{
            transform:rotate(-180deg);
            
           }

        }
        .panel-body{

          font-size: 0.3733rem;
          padding: 0  0.4267rem;
          transition: all 1s ease; 
          height: 0;
          overflow: hidden;

           
          &.active{
             height: auto;
          }

        }


        border-bottom: 0.0267rem solid $borderColor;

    }





  
</style>