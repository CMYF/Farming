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
    var docH = $(document).height();
    var headerH = $('.header').height();
    var h = docH - headerH;
    $('.left-nav-box').css({
      'height': h + 'px',
      'top': headerH
    });


  }
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  border: none;
}
li{
  list-style: none;
}
a{
  text-decoration: none;
  font-size: 14px;
  color: #48576a;
}
a:hover{
  color:#ccc;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {font-family: 'iconfont';
    src: url('./assets/fonts/iconfont.eot');
    src: url('./assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/iconfont.woff') format('woff'),
    url('./assets/fonts/iconfont.ttf') format('truetype'),
    url('./assets/fonts/iconfont.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}

.left-nav-box {
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 60px;
  left: 0;
}

.right-content-box {
  min-height: 600px;
  height: auto;
  overflow: hidden;
  margin-top: 60px;
}
.hide{
  display: none;
}
</style>
