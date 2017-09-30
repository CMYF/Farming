<template>
  <el-row>
    <h1 class="form-title">角色查询</h1>
    <el-form :inline="true" :model="opts" class="demo-form-inline form-box">
      <el-form-item label="登录帐号">
        <el-input v-model="opts.acc" placeholder="请输入登录账号"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="opts.username" placeholder="请输入用户名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectUrser($event)">查询</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <h1 class="form-title">角色列表</h1>
    <el-table ref="multipleTable" v-loading="isShowLoading" element-loading-txt="加载中..." class="table-box" :default-sort="{prop: 'date', order: 'descending'}" :fit="true" :data="this.users.lists" border max-height="550" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column label="操作" width="80">
        <template scope="scope">
          <el-button type="text" size="small" @click="showEditDialog($event)">
            <i class="iconfont">&#xe7c3;</i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column  label="ID" width="120" prop="id" sortable>
      </el-table-column>
      <el-table-column label="登录账号" width="120" prop="acc" sortable>
      </el-table-column>
      <el-table-column prop="userName" label="用户名称" sortable width="120">
      </el-table-column>
      <el-table-column prop="gender" label="性别" sortable width="120">
      </el-table-column>
      <el-table-column prop="telphone" label="电话" width="140">
      </el-table-column>
      <el-table-column prop="roleStatus" label="状态" sortable width="120">
      </el-table-column>
      <el-table-column prop="roleName" label="角色" >
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" sortable show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-box" @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="this.opts.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="this.opts.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.users.totalRows">
    </el-pagination>
     <EditUserPup :isShowDialog="this.isShowDialog"></EditUserPup>
  </el-row>
</template>
<script>
import bus from './../eventBus'
import _j from 'jquery'
import EditUserPup from './../components/EditUserPup'
function fetchAllUserLists(store, opts) {
  return store.dispatch('GET_ALL_USERS', opts)
}
export default {
  components: {
    EditUserPup
  },
  data() {
    return {
      currentPage4: 4,
      dialogFormVisible: false,
      isShowDialog: false,
      isShowLoading: false,
      opts: {
        token: localStorage.token,
        acc: '',
        username: '',
        beginPage: 1,
        pageSize: 10
      },
      users: {
        lists: [],
        currentPage: 1,
        pageSize: 10,
        totalPage: 0,
        totalRows: 0,
        currentRow: 0,
        isHasNextPage:　true,
      },
      multipleSelection: []
    }
  },
  created() {
      
  },
  beforeMount() {
      fetchAllUserLists(this.$store, this.opts).then(()=> {
          this.decDatas(this.$store, this.opts);
      });
  },
  methods: {
    selectUrser(e) {
       fetchAllUserLists(this.$store, this.opts).then(() => {
         this.decDatas(this.$store, this.opts);
       })
    },
    // 对数据进行处理
    decDatas(store, opts) {
      var userData = this.$store.getters.getUserDatas;
      var tempData = [];
          if (userData.resultCode === '1') {
            var datas = userData.basePageObj;
            let tempItem = {};
                for (let i = 0, len = datas.dataList.length; i < len; i++) {
                  tempItem = datas.dataList[i];
                    tempData.push({
                      userName: tempItem.opername,
                      roleStatus: tempItem.operstatus,
                      acc: tempItem.opercode,
                      gender: tempItem.gender === '1' ? '男' : '女',
                      telphone: tempItem.operphone,
                      roleName: tempItem.roleNames,
                      createTime: tempItem.createtime,
                      id: tempItem.ids
                    })
                }
            }
            this.users.lists = tempData;
            this.users.currentPage = datas.currentPage;
            this.users.currentRow = datas.currentRow;
            this.users.totalPage = datas.totalPages;
            this.users.totalRows = datas.totalRows;
            this.isHasNextPage = datas.hasNextPage;
            this.isShowLoading = false;
    },
    reset(){
      this.opts.acc = '';
      this.opts.username = '';
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.isShowLoading = true;
      this.opts.pageSize = val;
      fetchAllUserLists(this.$store, this.opts).then(() => {
         this.decDatas(this.$store, this.opts);
      })
    },
    handleCurrentChange(val) {
      this.isShowLoading = true;
      this.opts.currentPage = val;
      this.opts.beginPage = val;
      fetchAllUserLists(this.$store, this.opts).then(() => {
         this.decDatas(this.$store, this.opts);
      })
    },
     showEditDialog: (e) => {
      let dom = _j(e.currentTarget);
      let ids = dom.parents('td').next('td').find('.cell').text();
      if (ids){
        bus.$emit('show-edit-dialog', ids);
      }
    },
    _showMessage(type, msg) {
      this.$message({
        type: type,
        message: msg,
        showClose: true
      });
    }
  }
}
</script>
<style lang="scss">
.form-box {
  text-align: left;
  padding-top: 20px;
  padding-left: 20px;
}
.form-title {
  font-size: 18px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  width: 97%;
  margin-left: 20px;
  padding-top: 20px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.hide{
  display: none;
}
.table-box {
  max-width: 97%;
  margin-left: 20px;
  .el-table-column--selection {
    .cell {

      padding-right: 20px !important;
    }
  }
}

.el-table .cell {
  text-align: left;
}

.pagination-box {
  width: 97%;
  margin-left: 20px;
  text-align: right;
  margin-top: 20px;
}
.btn-box{
  width:97%;
  text-align: left;
  margin-left: 20px;
}
</style>

