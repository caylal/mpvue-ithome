<template>
  <div class="comment-item">
      <div class="comment-header">
          <div class="author">{{item.author}}</div>
          <div class="phone">{{item.phone}}</div>
          <div class="floor">{{item.floor}}</div>
      </div>
      <div class="comment-content">
          <div v-html="item.content"></div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        item:{
            type:Object,
             default() {
                return {}
            }
        }
    }
}
</script>

<style>
.comment-item {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px dashed #eee;
}
.comment-item:last-child {
  border: none;
}
.comment-header {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 8px;
  font-size: 15px;
}
.author {
  color: #4769b0;
  margin-right: 5px;
}
.floor {
  font-size: 12px;
  flex: 1;
  text-align: right;
}
.comment-content {
  line-height: 1.6;
  font-size: 16px;
}
</style>
