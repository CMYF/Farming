<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view name="Login"></router-view>
    <router-view name="Home"></router-view>

  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'app',
  components: {

  },
  mounted() {
    /* var docH = $(document).height();
    var headerH = $('.header').height();
    var h = docH - headerH;
    $('.left-nav-box').css({
      'height': h + 'px',
      'top': headerH
    });
 */

  }
}
</script>

<style>

* {
  margin: 0px;
  padding: 0px;
  border: none;
}
body{
  background-color: #f0f3fa;
}
li {
  list-style: none;
}

a {
  text-decoration: none;
  font-size: 14px;
}
/*
a:hover {
  color: #ccc;
  color: #48576a;
}*/

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@font-face {
  font-family: 'iconfont';
  src: url('./assets/fonts/iconfont.eot');
  src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/iconfont.woff') format('woff'),
  url('./assets/fonts/iconfont.ttf') format('truetype'),
  url('./assets/fonts/iconfont.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.left-nav-box {
  height: 100%;
  overflow: hidden;
  position: fixed;
   width: 12.5%; 
   min-width:180px;
  top: 0px;
  z-index: 10;
  left: 0;
}

.right-content-box {
  min-height: 600px;
  height: auto;
  overflow: hidden;
  margin-top: 60px;
  width: 86.5%;
  min-width: 1150px; 
  margin-left: 13.3%;
}

.hide {
  display: none;
}

@media (max-width: 1420px){
  .right-content-box{
    width: 85.3%;
    margin-left: 14.3%;
  }
}
</style>
