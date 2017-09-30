<template>
  <el-row>
    <h1 class="form-title">角色查询</h1>
    <el-form :inline="true" :model="opts" class="demo-form-inline form-box">
      <el-form-item label="角色名称">
        <el-input v-model="opts.roleName" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="selectRole">查询</el-button>
        <el-button type="primary" @click="resetRoleName">重置</el-button>
      </el-form-item>
    </el-form>
    <h1 class="form-title">角色列表</h1>
    <div class="btn-box">
      <el-button type="text" @click="shwoDialog('add', $event)">
        <i class="iconfont">&#xe763;</i>  
        <span>添加</span>
      </el-button>
      <el-button type="text" @click="delRoles">
        <i class="iconfont">&#xe76c;</i>
        <span>删除</span>
      </el-button>
    </div>
    <el-table ref="multipleTable" class="table-box" v-loading="isShowLoading" element-loading-text="加载中..." :default-sort="{prop: 'date', order: 'descending'}" :data="roles" max-height="550" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" style="padding-right:0;">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <el-button type="text" size="small" @click="shwoDialog('edit', $event)">
            <i class="iconfont">&#xe7c3;</i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="ID" width="120" prop="id" sortable>
      </el-table-column>
      <el-table-column label="角色名称" width="120" prop="name" sortable>
      </el-table-column>
      <el-table-column prop="roleStatus" label="角色状态" sortable width="120">
      </el-table-column>
      <el-table-column prop="roleEx" label="角色描述" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.opts.currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="this.opts.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.opts.totalRows">
    </el-pagination>
  <RMPup :isShow="dialogFormVisible" @on-hide-dialog=""></RMPup>
  </el-row>
</template>
<script>
import bus from './../eventBus'
import store from './../store/index'
import { mapGetters } from 'vuex'
import _j from 'jquery'
import RMPup from './../components/RoleManagePup'
function fetchAllRoles(store, opts) {
  return store.dispatch('GET_ALL_ROLES', opts);
}
function fetchDelRoles(store, opts) {
  return store.dispatch('DELETE_ROLE_BY_ID', opts);
}

export default {
  components: {
    RMPup
  },
  store,
  data() {
    return {
      currentPage4: 4,
      dialogFormVisible: false,
      isShowLoading: false,
      opts: {
        token: localStorage.token,
        beginPage: 1,
        pageSize: 10,
        roleName: '',
        totalRows: 0,
        roleIds: ''
      },
      roles: [],
      pagins: {
        totalRows: 0,
        totalPages: 1,
        currentPage: 1,
        currentRow: 0,
        hasNextPage: true,
        beginPage: 1
      },
      multipleSelection: []
    }
  },
  created() {
     
  },
  computed: mapGetters({
    roleDatas: 'roleDatas'
  }),
  beforeMount() {
    fetchAllRoles(this.$store, this.opts).then(() => {
      let tempData = this.$store.getters.getAllRoles;
      this.decDatas(tempData);
    });
    
  },
  methods: {
    selectRole() {
      let self = this;
      this.isShowLoading = true;
      window.setTimeout(function () {
        fetchAllRoles(self.$store, self.opts).then(() => {
        let tempData = self.$store.getters.getAllRoles;
        self.decDatas(tempData);
      }, 600)
    })
    },
    delRoles(){
      if (!this.opts.roleIds) {
        this._showMessage('error', '请选择要删除的角色！');
        return;
      }
      fetchDelRoles(this.$store, this.opts).then(() => {
        let delData = this.$store.getters.delRoles;
        if (delData.resultCode === '1') {
          this._showMessage('success', '删除角色成功！');
        } else {
          this._showMessage('error', delData.resultMsg);
        }
      });
    },
    resetRoleName() {
      this.opts.roleName = '';
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.opts.roleIds = this.getRoleIds(this.multipleSelection);
    },
    handleSizeChange(val) {
      this.isShowLoading = true;
      this.opts.pageSize = val;
       fetchAllRoles(this.$store, this.opts).then(() => {
        let tempData = this.$store.getters.getAllRoles;
        this.decDatas(tempData);
      })
    },
    handleCurrentChange(val) {
      this.isShowLoading = true;
      this.pagins.beginPage = val;  
       this.opts.beginPage = val;
       fetchAllRoles(this.$store, this.opts).then(() => {
        let tempData = this.$store.getters.getAllRoles;
        this.decDatas(tempData);
      })
    },
    shwoDialog: function (type, e) {
      if (type === 'add') {
        bus.$emit('is-show-rm-pup', 'add');
      } else {
        let dom = _j(e.currentTarget);
        let id = dom.parents('td').next('td').find('.cell').text();
        bus.$emit('is-show-rm-pup', 'edit', id);
      }
     
    },
    decDatas(data, opts) {
      let tempData = data;
      if (tempData.resultCode === '1') {
          let beseObj = tempData.basePageObj;
          let tempItem = {}, datas = beseObj.dataList;
          let tempRoles = [];
          for (let i = 0, len = datas.length; i < len; i++){
            tempItem = datas[i];
            tempRoles.push({
              id:　tempItem.ids,
              name: tempItem.rolename,
              roleStatus: tempItem.rolestatus === '1' ?　'有效' : '无效',
              roleEx: tempItem.roledesc
            });
          }
          this.roles = tempRoles;
          this.opts.totalRows = beseObj.totalRows;
          this.pagins = {
            totalRows: beseObj.totalRows,
            totalPages: beseObj.totalPages,
            currentPage: beseObj.currentPage,
            currentRow: beseObj.currentRow,
            hasNextPage: beseObj.hasNextPage,
            beginPage: 1
          }
          this.isShowLoading = false;
      }
    },
    getRoleIds(roles) {
      if (roles && roles.length > 0) {
        let roleIds = '', tempRole = {};
        for (let i = 0, len = roles.length; i < len; i++) {
          tempRole = roles[i];
          if (i == len - 1) {
            roleIds += tempRole.id;
          } else {
            roleIds += tempRole.id + ','
          }
        }
        return roleIds;
      }
    },
    _showMessage(type, msg) {
      this.$message({
        type: type,
        message: msg,
        showClose: true
      })
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

