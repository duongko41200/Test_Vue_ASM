<template>
	<div class="flex justify-center gap-4 min-h-[100px] items-center">
		<div>
			<label
				id="listbox-label"
				class="block text-sm font-medium leading-6 text-left mb-2"
				>Please Select a Restraurant</label
			>
			<select
				id="currency"
				name="currency"
				class="border flex-1 pl-4 w-[250px] h-[30px]"
				v-model="selectedItem"
				@change="getDataRestaurant"
			>
				<option v-for="(restaurant, idx) in restaurants" :key="idx">
					{{ restaurant }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const selectedItem = ref(null);


    onMounted(() => {
      selectedItem.value = store.state.global.selectedRestaurant;
    });

    const SET_SELECTED_RESTAURANT = (payload) => {
      store.commit('global/SET_SELECTED_RESTAURANT', payload);
    };

    const getDataRestaurant = () => {
      SET_SELECTED_RESTAURANT(selectedItem.value);
    };

    const restaurants = computed(() => store.state.global.restaurants);
    const selectedRestaurant = computed(() => store.state.global.selectedRestaurant);

    return {
      selectedItem,
      getDataRestaurant,
      restaurants,
      selectedRestaurant,
    };
  },
};

</script>
<style></style>
