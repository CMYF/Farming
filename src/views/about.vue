<template>
  <el-row>
    <h1 class="form-title">活动查询</h1>
    <el-form :inline="true" :model="formInline" class="from-box ">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动日期">
        <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <h1 class="form-title">活动列表</h1>
    <el-table class="table-box" :data="tableData4" border style="width: 100%" max-height="550">
      <el-table-column fixed prop="date" label="活动日期" width="150">
      </el-table-column>
      <el-table-column prop="name" label="活动名称" width="120">
      </el-table-column>
      <el-table-column prop="province" label="活动省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="活动市区" width="120">
      </el-table-column>
      <el-table-column prop="address" label="活动地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="活动地址邮编" width="150">
      </el-table-column>
      <el-table-column prop="phone" label="负责人电话" width="150">
      </el-table-column>
      <el-table-column prop="peopleName" label="负责人姓名" width="150">
      </el-table-column>
      <el-table-column prop="test1" label="测试" width="150">
      </el-table-column>
      <el-table-column prop="test2" label="测试2" width="150">
      </el-table-column>
      <el-table-column prop="test3" label="测试3" width="150">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-box" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      currentPage4: 4,
      value6: '',
      tableData4: [
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          phone: '12345678912',
          peopleName: 'cc',
          test1: 'test1',
          test2: 'test2',
          test3: 'test3'
        }
      ],
    }
  },
  methods: {
    onSubmit() {
      alert('submit!');
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }

}
</script>
<style lang="scss" scoped>
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

.from-box {
  text-align: left;
  padding-top: 20px;
  padding-left: 20px;
}

.table-box {
  max-width: 97%;
  margin-left: 20px;
}
.pagination-box{
  width: 97%;
  margin-left: 20px;
  text-align: right;
  margin-top: 20px;
}
</style>