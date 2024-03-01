<template>
	<div class="flex justify-between gap-4 min-h-[100px] items-center p-2">
		<div>
			<label
				id="listbox-label"
				class="block text-sm font-medium leading-6 text-left mb-2"
				>Please Select a meal</label
			>
			<select
				id="currency"
				name="currency"
				class="border flex-1 pl-4 w-[250px] h-[30px]"
				v-model="selectedItem"
				@change="getDataMeal"
			>
				<option v-for="(meal, idx) in meals" :key="idx">
					{{ meal.name }}
				</option>
			</select>
		</div>
		<div>
			<label
				id="listbox-label"
				class="block text-sm font-medium leading-6 text-left  mb-2"
				>Please Enter Number of people</label
			>
			<input
				type="number"
				min="0"
				max="10"
				class="border flex-1 w-[150px] h-[30px]"
				v-model="numberValue"
				@change="getDataMeal"
			/>
		</div>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const meals = ref([
      { id: 1, name: 'breakfast' },
      { id: 2, name: 'lunch' },
      { id: 3, name: 'dinner' },
    ]);
    const selectedItem = ref(null);
    const numberValue = ref(1);

    const meal = computed(() => store.state.global.meal);
    const numberPeople = computed(() => store.state.global.numberPeople);

    const SET_MEAL = (payload) => store.commit('global/SET_MEAL', payload);

    const getDataMeal = () => {
      SET_MEAL({ meal: selectedItem.value, numberPeople: numberValue.value });
    };

    // Gắn giá trị mặc định cho selectedItem và numberValue khi component được mounted
    selectedItem.value = meal.value; // Sửa từ meal thành meal.value
    numberValue.value = numberPeople.value;

    return {
      meals,
      selectedItem,
      numberValue,
      getDataMeal,
    };
  },
};

</script>

