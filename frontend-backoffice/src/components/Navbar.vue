<template>
	<div class="detail-navbar">
		<div class="foodstory"  @click="goTo('/')">
			<img src="../assets/logo.png" alt="" height="31px" width="31px">
			<img class="foodstory-title" src="../assets/FoodStory_title.png" alt="" height="24px" width="112px">
			<!-- <p class="logo-name">FoodStory</p> -->
		</div>
		<div class="button-all">
			<button :class="['each-button',{'active': pageName == 'StorePage'}] " @click="goTo('/')">Store</button>
			<button :class="['each-button',{'active': pageName == 'CategoryPage'}] " style="padding: 8px 8px; width: 90px" @click="goTo('/category')">Category</button>
			<button :class="['each-button',{'active': pageName == 'MenuPage'}] " @click="goTo('/menu')">Menu</button>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goTo (path) {
			this.$router.push({
				path: path.toString()
			}).catch(err => {
				console.log(err);
			})
		}
	},
	computed: {
		pageName() {
			return this.$route.name
		}
	}
}
</script>

<style>

.detail-navbar {
	background-color: #28B7FF;
	height: 60px;
	display: flex;
	align-items: center;
	padding: 0 32px;
}

.foodstory {
	display: flex;
	align-items: center;
}

.foodstory-title {
	margin-left: 6px;
}

.button-all {
	margin-left: 24.5px;
}

.each-button {
	color: white;
	margin-right: 16px;
	background-color: #28B7FF;
	border: 0;
	padding: 8px 16px;
	border-radius: 12px;
	width: 75px;
	height: 40px;
	text-align: center;
	font-size: 16px;
}

.each-button:hover {
	color: #28B7FF;
	background-color: white;
	border: 0;
	cursor: pointer;
}
.each-button.active {
	color: #28B7FF;
	background-color: white;
	border: 0;
	cursor: pointer;
}

</style>