<template>
	<div class="flex flex-col gap-4 px-4">
		<div class="font-bold text-lg">Review</div>
		<div class="flex justify-between w-100">
			<div class="font-bold">Meal</div>
			<div>{{ meal }}</div>
		</div>
		<div class="flex justify-between w-100">
			<div class="font-bold">No. of. People</div>
			<div>{{ numberPeople }}</div>
		</div>
		<div class="flex justify-between w-100">
			<div class="font-bold">Restaurant</div>
			<div>{{ selectedRestaurant }}</div>
		</div>
		<div class="flex justify-between w-100">
			<div class="font-bold">Dishes</div>
			<div class="p-2 border max-h-[90px] overflow-y-auto">
				<div v-for="(dish, idx) in listOrder" :key="idx">
					{{ dish.selectedDish }} - {{ dish.servings }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();

		const meal = computed(() => store.state.global.meal);
		const numberPeople = computed(
			() => store.state.global.numberPeople
		);
		const selectedRestaurant = computed(
			() => store.state.global.selectedRestaurant
		);
		const listOrder = computed(() => store.state.global.listOrder);

		return {
			meal,
			numberPeople,
			selectedRestaurant,
			listOrder,
		};
	},
};
</script>
