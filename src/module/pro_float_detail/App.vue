<template>
  <div id="app"  class="showMask pt-relative" :class="{'showAll' : showAll}">
    <div class="top-header">
      <div class="name">
        <div v-text='product.name'></div>
        <div>
            <span v-if='!isOpEmpty(product.labelList)'>{{product.labelList.length>0 ? product.labelList[0].label : ''}}</span>
        </div>
      </div>
      <div class="income-date">
        净值日期  {{product.valueDate}}
      </div> 


      <div class="value">
          <div class="unit">
            <div class="title" >单位净值</div>
            <div class="num" v-text='product.yieldValue'></div>
          </div>        
          <div class="sum">
              <div class="title">日涨跌幅</div>
              <div class="num" v-text='product.totalUnitNav'></div>
          </div>
      </div>
    </div>

    <div class="center-table">
              <div class="sub-type">  
                  <div class="item " @click="changeValueType(0)" :class="{'active': valueType == 0 }"> 
                      净值走势
                  </div>
                  <div v-if='isShowSZ' class="item"  @click="changeValueType(1)" :class="{'active': valueType ==1 }">实时估值</div>
              </div>  


            <div class="table">
                <div class="top-info">
                  <div>净值日期：{{product.valueDate}}</div>
                  <div>单位净值：{{product.yieldValue}}</div>
                </div>
                <div class="charts" id="echart"></div> 
                <div class="footer-date">
                  <div v-text='startDate' v-if="valueType==0"></div>
                  <div v-text='endDate'  v-if="valueType==0"></div>
                  <div v-text='startTime' v-if="valueType==1"></div>
                  <div v-text='endTime'  v-if="valueType==1"></div>
                </div> 
                <div class="date-type" :class='{"hidden": valueType == 1}'>
                  <div class="date-item" @click='changeTimeType(1)' :class="{'active':timeType == 1}">
                    近一月
                  </div>
                     <div class="date-item "  @click='changeTimeType(2)' :class="{'active': timeType == 2}">
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
  import { basePath , jsPath } from 'src/common/js/config';
  import { getQueryString } from 'src/common/js/unit';
  import contact from 'src/components/common/Contact';
  import Doc from 'src/components/common/detailsDocument';
  import {isEmpty} from 'src/common/js/unit';
  import * as Global from 'src/common/js/global';
  import { Bunding } from 'src/common/js/config';

  const TIME_TYPE = 2; // 1个月 : 1 , 3个月 : 2 , 6个月: 3 ,  1年: 4 , 
  const NOW_TIME = -1; //实时估值
  export default {
    name: 'app',  
     data(){
        return{
          valueType: 0,  //  0:{净值走势} , 1:{实时估值}      
          showAll: false,
          code : getQueryString("prdtCode"),
          type :  getQueryString('type'),
          page:0,
          pageSize:0,
          timeType:TIME_TYPE,
          showMore: true,
          product: Object,
          dataJZList: [], //净值走势
          dateJZList:[],
          dataSZist:[],  // 实时估值
          dateSZList:[],
          isShowSZ:false,
          dateList:[],
          dateList:[],
          dataList:[],
          startDate: '',
          endDate:'',
          startTime:'',  //实时
          endTime: '' 
        }
    },mounted(){
      this.loadData();
       
    },
    watch:{
      product: function(val,oldVal){

        this.showAll = true;
        this.dataJZList  = [];
        this.dateJZList  = [];
        this.dateList = [];
        this.dataList = [];
        this.dataSZist = [];
        this.dateSZist = [];

        for (let i = val.valueList.length-1 ; i >=0 ; i --){
              let demo  = val.valueList[i];
              this.dataJZList.push(demo.value1);     
              this.dateJZList.push(demo.valueDate);
              if(i==0){
                this.endDate = demo.valueDate;
              }            
              if(i == val.valueList.length -1){
                 this.startDate = demo.valueDate;
              }
         }
           
         for (var i = val.realTimeList.length - 1; i >= 0; i--) {
             let realDemo =  val.realTimeList[i]
             this.dataSZist.push(realDemo.unitNav);
             this.dateSZList.push(realDemo.valueTime);
             if(i==0){
                this.endTime = realDemo.valueTime;
             }
              
             if(i == val.realTimeList.length -1){
                 this.startTime = realDemo.valueTime;
             }
         }
         
         this.dataList  =  this.valueType == 0 ? this.dataJZList : this.dataSZist; 
         this.dateList  =  this.valueType == 0 ? this.dateJZList : this.dateSZist; 
         this.isShowSZ =   this.dataSZist.length == 0 ?  false : true;  //实时无数据不显示
         this.dataList  = this.dataList ||  [0]
         this.dateList  = this.dateList ||  [0]
         
         this.initEcharts();
      },
      timeType: function(timeType, oldTimeType){
         this.loadData();
      }
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

        if(isEmpty(sessionStorage.token)){
              if(isEmpty(getQueryString('code'))){
                 Global.Access.init( function(data){       
                 sessionStorage.token = data.token;    
                 sessionStorage.bindStatus = data.bindStatus;
                    if(sessionStorage.bindStatus=='0'){
                      location.href= 'bunding.html#/bunding'; 
                    }else{
                      this.getInitData();             
                    }       
                })
              }else{
                this.axios.get(Bunding.getOpenId, {
                    params:{
                      code: getQueryString('code')
                    }
                }).then((response)=>{
                
                  if(response.data.flag.code==0 || response.data.flag.code=="0"){
                      sessionStorage.token = response.data.token;    
                      sessionStorage.bindStatus = response.data.bindStatus;
                      if(sessionStorage.bindStatus=="0"){
                          location.href= 'bunding.html#/bunding'; 
                      }else{
                          this.getInitData();            
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
                  if(response.data){
                    if(response.data.flag.code==0){
                       this.product = response.data.productInfo;   
                    }
                   
                  }
                })
      },
      initEcharts(type){

        var option = {
            animation:false,
            grid:{     // 定义表相对于canvas 上下左右的编剧
              left: 32,     
              right: 2,
              top: 10,
              bottom: 5
            } ,
            tooltip: {
              trigger: 'axis',
              formatter: function(params, ticket, callback){
                let b = params[0].name != undefined ? params[0].name : 0 
                let c = params[0].value != undefined ? params[0].value : 0 
                return b  +  " : " + c + '%' 
              }  , //'{b} : {c}%'
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
                axisTick:{show: false},
                axisLabel:{
                  textStyle: {
                    color: "#808080",
                    fontSize: 10  
                  },
                  formatter: function(val){
                      return val.toFixed(2)
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
        this.dataList  =  type == 0 ? this.dataJZList : this.dataSZist;  
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

<style  lang="scss" scoped>

@mixin box-sizing ($sizing) {
    -webkit-box-sizing:$sizing;     
       -moz-box-sizing:$sizing;
            box-sizing:$sizing;
}
@mixin row-height ($height){
  height: $height;
  line-height: $height;
}

$borderColor :  #efeff5;
.top-header{
    padding: 0 0.4rem 0.4267rem;
  
    border-bottom: 0.1333rem solid $borderColor;
    .name{
     display: flex;
     flex-flow: row wrap;
      line-height: .8rem;
     padding: .25rem 0;
      div{
        
      }
      div:first-child{
         font-size:0.48rem;
         color: #303030;
         margin-right: 0.2667rem;
       
          
      }
      div:last-child{
         span{
          border: 1px solid #FE9D83;
          border-radius: 0.0533rem;
          padding: 0.0267rem 0.0533rem;
          color: #FE9D83;
          vertical-align: middle;
          font-size: 0.32rem;


         }
      }



    }


    .income-date{
        @include row-height(0.6667rem);
        
        font-size: 0.3733rem;
        color: #AAB0C0;
    }

    .value{
      display: flex;
      flex-flow: row;

      >div{
        flex:1;

        .title{
          margin-top: 0.4rem;
             @include row-height(0.8rem);
              font-size: 0.3733rem;
            color: #808080;
        }

        .num{
           @include row-height(1.0133rem);
         
             font-size: 0.9067rem;
              color: #FD2601;

             
         }
         &.sum{
              .num{
                font-size: 0.64rem;
                color: #303030;
                line-height: 1.195rem;
              }
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
        font-family: PingFangSC-Regular;
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


.rule{

  display: flex;
  flex-flow: row;
  padding: 0 0.9867rem;
      .rule-item{
        flex: 1;

      }
             .title{
            @include row-height(0.9333rem);
            font-family: PingFangSC-Regular;
            font-size: 0.32rem;
            color: #808080;
            margin-top: 0.24rem;
            text-align: center;
          }
          .name{
            font-family: PingFangSC-Regular;
            font-size: 10px;
            color: #AAB0C0;
            @include row-height(0.9067rem);
             text-align: center;
          }

        .line-spoint{
            height: 0.2667rem;
            position: relative;
            width: 100%;

               .line{
                    height: 0.0533rem;
                    background:rgba(148,180,221,1);
                   
                    position: absolute;
                    top: 0.1067rem;
                    width: 100%;
          

          /*   padding: 0.1333rem 0;
       */
            
          }
        .spoint{
            background: #FFFFFF;
            border: 0.0533rem solid #94B4DD;
            height: 0.2667rem;
            width: 0.2667rem;
            border-radius:50%;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -0.1333rem;
            @include box-sizing(border-box);
        }


    }
}
 
</style>