import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'vue-toast-notification';

const LIMIT_DISH = 9;

export default {
	setup() {
		const store = useStore();
		const toast = useToast();

		const dishes = ref([]);
		const numberValue = ref(1);
		const selectedItem = ref(null);
		const dishSelected = ref([{ name: '' }]);
		const optionDish = ref([{ name: '' }]);
		let index = 1;

		const listDishes = computed(() => store.state.global.listDishes);
		const listOrder = computed(() => store.state.global.listOrder);
		const dishSelectedStore = computed(
			() => store.state.global.dishSelected
		);

		const SET_LIST_ORDER = (payload) => {
			store.commit('global/SET_LIST_ORDER', payload);
		};

		onMounted(() => {
			if (listOrder.value.length > 0) {
				dishes.value = listOrder.value;
			} else {
				dishes.value = [
					{
						id: 1,
						list: listDishes.value,
						selectedDish: null,
						servings: 1,
					},
				];

				SET_LIST_ORDER(dishes.value);
			}

			dishSelected.value = dishSelectedStore.value;

			// filter list not selected
			optionDish.value = listDishes.value.filter((item1) => {
					if (!dishSelected.value.find((value) => value.name === item1.name)) {
						return item1
					}
			})

		});

		const addDish = () => {
			if (!optionDish.value.length) {
				toast.error('Bạn đã chọn hết món của nhà hàng rồi', {
					position: 'top-right',
					duration: 2000,
				});
				return;
			}
			if (!dishes.value[dishes.value.length - 1].selectedDish) {
				toast.error('Hãy chọn món bên trên trước', {
					position: 'top-right',
					duration: 2000,
				});
				return;
			}
			if (dishes.value.length > LIMIT_DISH) {
				toast.error('không được chọn quá 10 món', {
					position: 'top-right',
					duration: 2000,
				});
				return;
			}
			index++;
			dishes.value.push({
				id: index,
				list: optionDish.value,
				selectedDish: null,
				servings: 1,
			});

			
			dishSelected.value = [...dishSelected.value, { name: '' }];
			store.commit('global/SET_DISH_SELECTED', dishSelected.value);
			SET_LIST_ORDER(dishes.value);
		};

		const getDataDish = (id, nameDish) => {

			if (nameDish !== dishSelected.value[id - 1].name) {
				dishSelected.value[id - 1].name = nameDish;
			}
			store.commit('global/SET_DISH_SELECTED', dishSelected.value);



			// update list option dishes
			dishes.value = dishes.value.map((value) => {
				value.list = value.list.filter((item1) => {
					if (
						!dishSelected.value.find(
							(value) => value.name === item1.name
						) ||
						value.selectedDish === item1.name
					) {
						return item1;
					}
				});

				return value;
			});

			optionDish.value = optionDish.value.filter(
				(option) => option.name != dishSelected.value[id - 1].name
			);

			SET_LIST_ORDER(dishes.value);
		};

		return {
			dishes,
			numberValue,
			selectedItem,
			listDishes,
			addDish,
			getDataDish,
		};
	},
};