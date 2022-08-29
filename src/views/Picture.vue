<template>
	<div class="content">
		<router-link to="banneradd">
			<el-button type="primary" style="margin: 20px">添加轮播图</el-button>
		</router-link>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="id" label="Id" />
			<el-table-column prop="name" label="Name" />
			<el-table-column prop="img" label="img">
				<template v-slot="scope">
					<el-image v-if="scope.row.img" :src="scope.row.img" :preview-src-list="imgList" fit="cover"
						style="width: 180px" :preview-teleported="true" :hide-on-click-modal="true" />
				</template>
			</el-table-column>
			<el-table-column prop="address" label="操作" width="200" align="center">

      <template #default="scope">
        <router-link :to="'/banneredit/' + scope.row.id">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row.id)"
          >Edit</el-button
        >
					</router-link>
      
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row.id)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
		</el-table>
	</div>
</template>

<script setup>
	import {
		getBanner,
		deleBanner
	} from "@/api/banner";
	import {
		ElMessage
	} from "element-plus";
	import {
		ref
	} from "vue";

	const tableData = ref(null);
	const imgList = ref([]);
	async function getlist() {
		let res = await getBanner();
    console.log(res);
		tableData.value = res;
		res.forEach((item) => {
			imgList.value.push(item.img);
		});
		console.log(tableData.value);
		console.log(imgList.value);
	}
	getlist();
	// function handleEdit() {};
	function handleDelete(a,b){
    console.log(b);
		ElMessageBox.confirm("此操作将删除该图片, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
			.then(async () => {
				try {
					console.log(b);
					let res = await deleBanner(b);
					location.reload()
					if (res.code == 1) {
						ElMessage({
							showClose: true,
							message: res.msg,
							type: "success",
						});
					}
				} catch (error) {
					console.log(error);
				}
			})
			.catch(() => {
				ElMessage.info({
					message: "已取消删除",
				});
			});
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100vh;
	}

	a {
		text-decoration: none;
	}

	.delBtn {
		margin-left: 10px;
	}
</style>
