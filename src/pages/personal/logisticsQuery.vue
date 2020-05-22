<template>
  <div>
    <x-header title='物流查询' :right-options="{showMore: false}" @on-click-more="show = false"></x-header> 
    <!-- 物流信息 -->
     <div class="logisticsInfo">
          <timeline>
            <timeline-item v-for="(item , i) in logisticsData" :key="i">
                <h4 class="recent">{{item.arensData}}</h4>
                <p class="recent">{{item.timeData}}</p>
            </timeline-item>
        </timeline>
     </div>
  </div>
</template>



<style>
.logisticsInfo{
    background: #ffffff;
    /* padding-top: 1.25rem; */
}
.logisticsInfo p {
  color: #888;
  font-size: 0.8rem;
}
.logisticsInfo h4 {
  color: #666;
  font-weight: normal;
}
.logisticsInfo recent {
  color: rgb(4, 190, 2);
}
element.style {
    height: 10px!important;
}

</style>

<script>
import { XHeader, Timeline, TimelineItem } from 'vux'
import ShopCell from '../../components/toolComponent/shopCell.vue'
export default {
  components: {
    ShopCell,
    XHeader,
    Timeline,
    TimelineItem
  },
  data () {
    return {
      count: 3,
      logisticsData: [
        {
          arensData: '【广东】 广州市 已发出',
          timeData: '2016-04-17 14:00:00'
        },
        {
          arensData: '【广东】 广州市 已发出',
          timeData: '2016-04-17 12:00:00'
        },
        {
          arensData: '【广东】 广州市 已发出',
          timeData: '2016-04-17 12:00:00'
        },
        {
          arensData: '【广东】 广州市 已发出',
          timeData: '2016-04-17 12:00:00'
        }
      ],
      orderInfo: this.$route.params.orderInfo
    }
  },
  created () {
  }
}
</script>